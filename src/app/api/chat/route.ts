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

const DEFAULT_ENDPOINT = "https://api.xiaomimimo.com/v1";
const DEFAULT_MODEL = "XM/mimo-v2.5-pro";
const MAX_MESSAGES = 40;
const MAX_CONTENT_LEN = 8000;

function getApiKeys(clientKey?: string): string[] {
  if (clientKey?.trim()) return [clientKey.trim()];
  
  const keysEnv = process.env.AI_API_KEYS;
  if (keysEnv) {
    const keys = keysEnv.split(",").map(k => k.trim()).filter(Boolean);
    if (keys.length > 0) return keys;
  }
  
  const single = process.env.AI_API_KEY;
  return single?.trim() ? [single.trim()] : [];
}

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

  const userThread = raw.filter((m) => m.role !== "system");

  const endpoint =
    (typeof body.endpoint === "string" && body.endpoint.trim()) ||
    process.env.AI_ENDPOINT ||
    DEFAULT_ENDPOINT;
  const model =
    (typeof body.model === "string" && body.model.trim()) ||
    process.env.AI_MODEL ||
    DEFAULT_MODEL;

  const apiKeys = getApiKeys(body.apiKey);
  if (apiKeys.length === 0) {
    return NextResponse.json(
      {
        error:
          "AI API key belum dikonfigurasi. Set AI_API_KEYS atau AI_API_KEY di .env.local, atau isi API key di Settings (BYOK).",
      },
      { status: 503 },
    );
  }

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

  const upstreamUrl = `${endpoint.replace(/\/$/, "")}/chat/completions`;
  const requestBody = JSON.stringify({
    model,
    messages,
    stream: true,
    temperature: 0.7,
    max_tokens: 2000,
  });

  let lastError = "";
  for (const apiKey of apiKeys) {
    let upstream: Response;
    try {
      upstream = await fetch(upstreamUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: requestBody,
        signal: request.signal,
      });
    } catch (err) {
      lastError = err instanceof Error ? err.message : "Upstream unreachable";
      continue;
    }

    if (upstream.ok && upstream.body) {
      return new Response(upstream.body, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
        },
      });
    }

    const text = await upstream.text().catch(() => "");
    const status = upstream.status;

    if (status === 429 || status === 401 || status === 403) {
      lastError = `Key habis/blocked (${status})`;
      continue;
    }

    return NextResponse.json(
      { error: `AI error ${status}${text ? `: ${text.slice(0, 200)}` : ""}` },
      { status: 502 },
    );
  }

  return NextResponse.json(
    { error: `Semua API key habis. Terakhir: ${lastError}` },
    { status: 429 },
  );
}
