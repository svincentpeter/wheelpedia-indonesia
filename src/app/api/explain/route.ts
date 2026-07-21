import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ExplainBody = {
  vehicle?: {
    brand?: string;
    model?: string;
    oemTireSize?: string;
    pcd?: string;
    cb?: string;
    et?: string;
    notes?: string;
  };
  stockItem?: {
    brand?: string;
    productName?: string;
    size?: string;
    price?: number;
    tier?: string;
    description?: string;
  };
  tierInfo?: unknown;
  endpoint?: string;
  apiKey?: string;
  model?: string;
};

const DEFAULT_ENDPOINT = "http://127.0.0.1:20128/v1";
const DEFAULT_MODEL = "XM/mimo-v2.5-pro";

function str(v: unknown, max = 200): string {
  if (typeof v !== "string") return "";
  return v.slice(0, max);
}

export async function POST(request: Request) {
  let body: ExplainBody;
  try {
    body = (await request.json()) as ExplainBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const vehicle = body.vehicle;
  const stockItem = body.stockItem;
  if (!vehicle?.brand || !vehicle?.model || !stockItem?.brand) {
    return NextResponse.json(
      { error: "Missing vehicle or stockItem parameters." },
      { status: 400 },
    );
  }

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
          "AI API key belum dikonfigurasi. Set AI_API_KEY di .env.local atau isi di Settings.",
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

  const price =
    typeof stockItem.price === "number" && Number.isFinite(stockItem.price)
      ? stockItem.price
      : 0;
  const priceLabel = `Rp ${price.toLocaleString("id-ID")}`;

  const systemPrompt = `Anda adalah "Asisten Karyawan OmahBan". Buat draf naskah bicara (customer talk script) Bahasa Indonesia untuk karyawan di counter.
Ramah, meyakinkan, cocok dengan mobil pelanggan. JANGAN sebut modal/margin. JANGAN mengarang stok.

Mobil:
- ${str(vehicle.brand)} ${str(vehicle.model)}
- OEM ban: ${str(vehicle.oemTireSize)}
- PCD / CB / ET: ${str(vehicle.pcd)} / ${str(vehicle.cb)} / ${str(vehicle.et)}
- Catatan: ${str(vehicle.notes, 400) || "-"}

Ban ditawarkan:
- ${str(stockItem.brand)} ${str(stockItem.productName)}
- Ukuran: ${str(stockItem.size)}
- Harga jual: ${priceLabel}
- Tier: ${str(stockItem.tier)}
- Deskripsi: ${str(stockItem.description, 300) || "-"}

Karakteristik brand (jika ada):
${JSON.stringify(body.tierInfo ?? {})}

FORMAT WAJIB:
1. **Sapaan & Pembuka**
2. **Kelebihan Utama (Bahasa Awam)**
3. **Mengapa Nilainya Pas** (kaitkan ${priceLabel})
4. **Tips Tambahan Karyawan** (catatan internal singkat)

Ringkas, poin mudah dibaca sambil bicara.`;

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
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: "Buatkan skrip bicara berdasar konteks di atas.",
          },
        ],
        stream: false,
        temperature: 0.6,
        max_tokens: 1200,
      }),
      signal: request.signal,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Upstream unreachable";
    return NextResponse.json(
      { error: `Gagal menghubungi AI endpoint. ${msg}` },
      { status: 502 },
    );
  }

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => "");
    return NextResponse.json(
      {
        error: `Upstream AI error ${upstream.status}${text ? `: ${text.slice(0, 200)}` : ""}`,
      },
      { status: 502 },
    );
  }

  try {
    const data = (await upstream.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) {
      return NextResponse.json(
        { error: "AI tidak mengembalikan teks skrip." },
        { status: 502 },
      );
    }
    return NextResponse.json({ text });
  } catch {
    return NextResponse.json(
      { error: "Gagal parse respons AI." },
      { status: 502 },
    );
  }
}
