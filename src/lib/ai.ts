// Client AI helper — calls our server proxy only. Never embeds secrets.

export type ChatMessage = {
  readonly role: "system" | "user" | "assistant";
  readonly content: string;
};

export type AiClientOverrides = {
  readonly endpoint?: string;
  readonly apiKey?: string;
  readonly model?: string;
};

const STORAGE = {
  endpoint: "wheelpedia_ai_endpoint",
  apiKey: "wheelpedia_ai_api_key",
  model: "wheelpedia_ai_model",
} as const;

export function readAiOverridesFromStorage(): AiClientOverrides {
  if (typeof window === "undefined") return {};
  return {
    endpoint: localStorage.getItem(STORAGE.endpoint) || undefined,
    apiKey: localStorage.getItem(STORAGE.apiKey) || undefined,
    model: localStorage.getItem(STORAGE.model) || undefined,
  };
}

export function writeAiOverridesToStorage(overrides: AiClientOverrides): void {
  if (typeof window === "undefined") return;
  if (overrides.endpoint) localStorage.setItem(STORAGE.endpoint, overrides.endpoint);
  else localStorage.removeItem(STORAGE.endpoint);
  if (overrides.apiKey) localStorage.setItem(STORAGE.apiKey, overrides.apiKey);
  else localStorage.removeItem(STORAGE.apiKey);
  if (overrides.model) localStorage.setItem(STORAGE.model, overrides.model);
  else localStorage.removeItem(STORAGE.model);
}

export function clearAiOverridesFromStorage(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE.endpoint);
  localStorage.removeItem(STORAGE.apiKey);
  localStorage.removeItem(STORAGE.model);
}

export async function sendChatMessage(
  messages: readonly ChatMessage[],
  onChunk: (chunk: string) => void,
  signal?: AbortSignal,
): Promise<void> {
  const overrides = readAiOverridesFromStorage();

  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages,
      endpoint: overrides.endpoint,
      apiKey: overrides.apiKey,
      model: overrides.model,
    }),
    signal,
  });

  if (!response.ok) {
    let detail = `AI API error: ${response.status}`;
    try {
      const errBody = (await response.json()) as { error?: string };
      if (errBody.error) detail = errBody.error;
    } catch {
      // ignore parse failure
    }
    throw new Error(detail);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response body from /api/chat");

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (data === "[DONE]") return;
      try {
        const parsed = JSON.parse(data) as {
          choices?: Array<{ delta?: { content?: string } }>;
        };
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onChunk(content);
      } catch {
        // skip malformed SSE chunks
      }
    }
  }
}

export const SYSTEM_PROMPT = `Kamu adalah asisten karyawan toko OmahBan (jual beli ban & velg) lewat Wheelpedia.

PERAN:
- Bantu staf awam jawab customer di counter (HP/laptop).
- Bahasa awam, singkat, jujur. Gaya toko, bukan brosur pabrik.
- Bukan kasir: jangan buat nota, checkout, atau ubah stok.

KEMAMPUAN:
- Ukuran ban/velg OEM per mobil Indonesia
- Cocokkan ukuran dengan stok snapshot OmahBan (qty + harga jual)
- Ranking merk budget / mid / premium sederhana
- Istilah: PCD, ET, center bore, load index, speed rating, DOT
- Script singkat "cara jelasin ke customer"

ATURAN STOK:
1. Stok HANYA dari data "Stok OmahBan (snapshot)" di konteks. Jangan mengarang qty.
2. Jika qty 0 atau tidak ada di snapshot → bilang kosong / belum di snapshot, sarankan cek rak fisik.
3. JANGAN sebut modal, HPP, cost, atau margin.
4. Harga jual di snapshot boleh disebut; ingat bisa berubah — tawarkan cek ulang di rak/POS.

ATURAN UMUM:
1. Jawab Bahasa Indonesia
2. Jika tidak yakin, bilang tidak yakin + sarankan cek rak / spesifikasi
3. Utamakan data katalog + snapshot di system message
4. Di luar ban/velg/mobil → arahkan kembali ke topik counter
5. Format rapi: bullet singkat, 1–2 paragraf max per jawaban kecuali diminta detail`;
