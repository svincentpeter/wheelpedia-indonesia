// 9router API configuration for AI chat
// Uses OpenAI-compatible API via 9router local endpoint

export const AI_CONFIG = {
  endpoint: "http://localhost:20128/v1",
  apiKey: "sk-9b8d4b6235e4de02-v6h7ot-0c527a32",
  model: "XM/mimo-v2.5-pro",
};

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function sendChatMessage(
  messages: ChatMessage[],
  onChunk: (chunk: string) => void,
  signal?: AbortSignal
) {
  const response = await fetch(`${AI_CONFIG.endpoint}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${AI_CONFIG.apiKey}`,
    },
    body: JSON.stringify({
      model: AI_CONFIG.model,
      messages,
      stream: true,
      temperature: 0.7,
      max_tokens: 2000,
    }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`AI API error: ${response.status}`);
  }

  const reader = response.body?.getReader();
  if (!reader) throw new Error("No response body");

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6).trim();
        if (data === "[DONE]") return;
        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onChunk(content);
        } catch {
          // skip malformed chunks
        }
      }
    }
  }
}

export const SYSTEM_PROMPT = `Kamu adalah AI assistant untuk Wheelpedia Indonesia, platform pembelajaran ban dan velg mobil di Indonesia.

KEMAMPUAN:
- Menjawab pertanyaan tentang ukuran ban per mobil Indonesia
- Memberikan rekomendasi ban dan velg
- Menjelaskan istilah teknis (PCD, offset, ET, load index, speed rating, center bore, dll)
- Membantu perbandingan produk ban/velg
- Tips perawatan ban dan velg
- Pengetahuan umum otomotif Indonesia

ATURAN:
1. Selalu jawab dalam Bahasa Indonesia
2. Jika tidak yakin, katakan "Saya tidak yakin, silakan cek ke toko ban terdekat"
3. Jangan memberikan harga pasti (harga berubah-ubah), berikan range
4. Selalu sebutkan sumber data jika ada
5. Untuk pertanyaan di luar ban/velg/mobil, arahkan kembali ke topik
6. Gunakan format yang rapi: bullet points, tabel untuk perbandingan
7. Sebutkan spesifikasi lengkap: ukuran, PCD, offset, center bore jika relevan`;
