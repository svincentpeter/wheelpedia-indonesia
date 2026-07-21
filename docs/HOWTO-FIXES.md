# HOWTO — Security & Quality Fixes (Wheelpedia Indonesia)

Panduan singkat: apa yang diubah, kenapa, cara pakai.

## 1. AI key tidak boleh di client

### Masalah
`src/lib/ai.ts` dulu hardcode `apiKey` + `endpoint`. Key ikut ke browser bundle → bocor.

### Pola yang benar
```
Browser  →  POST /api/chat (Next.js server)
                ↓
         AI_ENDPOINT + AI_API_KEY (env server)
                ↓
         9router / OpenAI-compatible API
```

### File
| File | Peran |
|------|--------|
| `src/app/api/chat/route.ts` | Server proxy + validasi + inject katalog |
| `src/lib/ai.ts` | Client hanya `fetch("/api/chat")` |
| `src/lib/catalog-context.ts` | Ringkas data mobil/ban ke system prompt |
| `.env.example` | Template env |

### Setup
```powershell
cd C:\Projects\wheelpedia-indonesia
Copy-Item .env.example .env.local
# Edit .env.local — isi AI_API_KEY
npm run dev
```

`.env.local` contoh:
```env
AI_ENDPOINT=http://127.0.0.1:20128/v1
AI_API_KEY=ganti-dengan-key-kamu
AI_MODEL=XM/mimo-v2.5-pro
```

**Rotate key lama** yang sempat ter-commit di repo GitHub.

### BYOK (Settings)
Halaman Settings simpan endpoint/key/model di `localStorage` browser.
Nilai dikirim ke `/api/chat` saat chat — **tidak** di-hardcode di source.

---

## 2. Admin load data real

### Masalah
`data={[]}` → tabel kosong.

### Fix
Admin load dari `src/data/*`. Edit di UI = salinan `localStorage` saja.
Source of truth tetap file TypeScript. **Tidak ada auth** — dev tool only.

---

## 3. Catalog upload jujur

### Masalah
Progress OCR/embedding palsu.

### Fix
Upload = metadata file di browser. Label: "Metadata only (no OCR)".
OCR/RAG = roadmap, belum ada.

---

## 4. Lint React 19 (`set-state-in-effect`)

### Masalah
`useEffect(() => setX(fromUrl/localStorage))` dilarang (cascading render).

### Fix
- **URL tab:** derive langsung `const tab = searchParams.get("tab") === "wheel" ? "wheel" : "tire"`
- **localStorage:** `useState(() => readFromStorage())` (lazy init)
- **Theme:** lazy init + `classList.toggle` di effect terpisah (DOM sync OK)

---

## 5. Middleware / Prisma

- Middleware: pass-through (Supabase session belum dipakai).
- Prisma seed: `prisma.$disconnect()` benar; app **masih** baca static TS, bukan DB.
- DB optional — demo jalan tanpa `DATABASE_URL`.

---

## 6. Verifikasi

```powershell
npm run lint   # 0 errors (warnings <img> OK untuk sekarang)
npx tsc --noEmit
npm run dev
# Buka http://localhost:3000
# AI: butuh AI_API_KEY + endpoint hidup
```

---

## Checklist production (belum dikerjakan)

- [ ] Supabase Auth + protect `/admin`
- [ ] Wire Prisma ke pages (ganti static TS) **atau** hapus dead code
- [ ] Real OCR/RAG upload
- [ ] Rate limit `/api/chat`
- [ ] Ganti `<img>` → `next/image`
