import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/ai";
import { buildCatalogContextAsync } from "@/lib/catalog-context";

export const runtime = "nodejs";

type IncomingMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type ChatBody = {
  messages?: IncomingMessage[];
  endpoint?: string;
  apiKey?: string;
  model?: string;
};

const DEFAULT_ENDPOINT = "http://127.0.0.1:20128/v1";
const DEFAULT_MODEL = "XM/mimo-v2.5-pro";
const MAX_MESSAGES = 40;
const MAX_CONTENT_LEN = 8000;

function isMessage(value: unknown): value is IncomingMessage {
  if (!value || typeof value !== "object") return false;
  const m = value as IncomingMessage;
  return (
    (m.role === "system" || m.role === "user" || m.role === "assistant") &&
    typeof m.content === "string" &&
    m.content.length <= MAX_CONTENT_LEN
  );
}

export async function POST(request: Request) {
  let body: ChatBody;
  try {
    body = (await request.json()) as ChatBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const raw = body.messages;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_MESSAGES) {
    return NextResponse.json(
      { error: "messages must be a non-empty array (max 40)" },
      { status: 400 },
    );
  }
  if (!raw.every(isMessage)) {
    return NextResponse.json({ error: "Invalid message shape" }, { status: 400 });
  }

  // Drop client system messages; we inject our own + catalog
  const userThread = raw.filter((m) => m.role !== "system");

  const endpoint =
    (typeof body.endpoint === "string" && body.endpoint.trim()) ||
    process.env.AI_ENDPOINT ||
    DEFAULT_ENDPOINT;
  const apiKey =
    (typeof body.apiKey === "string" && body.apiKey.trim()) ||
    process.env.AI_API_KEY ||
    "";
  const model =
    (typeof body.model === "string" && body.model.trim()) ||
    process.env.AI_MODEL ||
    DEFAULT_MODEL;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "AI API key belum dikonfigurasi. Set AI_API_KEY di .env.local atau isi API key di Settings (BYOK).",
      },
      { status: 503 },
    );
  }

  // Basic SSRF guard: only allow http(s) localhost / private lab endpoints or https
  try {
    const url = new URL(endpoint);
    const isLocal =
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1" ||
      url.hostname.endsWith(".local");
    if (url.protocol !== "https:" && !isLocal) {
      return NextResponse.json(
        { error: "Endpoint harus https:// atau localhost" },
        { status: 400 },
      );
    }
  } catch {
    return NextResponse.json({ error: "Endpoint URL tidak valid" }, { status: 400 });
  }

  const catalog = await buildCatalogContextAsync(request.signal);
  const messages = [
    { role: "system" as const, content: `${SYSTEM_PROMPT}\n\n${catalog}` },
    ...userThread,
  ];

  let upstream: Response;
  try {
    upstream = await fetch(`${endpoint.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        stream: true,
        temperature: 0.7,
        max_tokens: 2000,
      }),
      signal: request.signal,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Upstream unreachable";
    return NextResponse.json(
      {
        error: `Gagal menghubungi AI endpoint (${endpoint}). Pastikan 9router/proxy jalan. Detail: ${msg}`,
      },
      { status: 502 },
    );
  }

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => "");
    return NextResponse.json(
      {
        error: `Upstream AI error ${upstream.status}${text ? `: ${text.slice(0, 200)}` : ""}`,
      },
      { status: 502 },
    );
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
