# Wheelpedia Indonesia 🚗

Platform pembelajaran ban dan velg mobil Indonesia berbasis AI. Database lengkap 40+ mobil Indonesia, katalog ban, velg, dan AI assistant untuk tanya jawab.

## OmahBan Counter Kit

Wheelpedia = **asisten counter + belajar** untuk staf toko OmahBan.  
**POS / stok live / kasir** = [ProjectOmahBan](https://github.com/svincentpeter/ProjectOmahBan) (Laravel) — jangan digandakan di sini.

| Fitur | Route |
|-------|--------|
| Counter (mobil → stok → merk → AI) | `/counter` |
| Browse snapshot stok | `/stok` |
| Refresh stok dari Excel | `python scripts/import_shop_stock.py "…STOCK….xlsx"` |

Detail: [`docs/OMAHBAN-INTEGRATION.md`](docs/OMAHBAN-INTEGRATION.md)  
Spec: `docs/superpowers/specs/2026-07-21-omahban-counter-kit-design.md`

## Live Demo

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/svincentpeter/wheelpedia-indonesia)

## Features

### Database Otomotif
- **40+ Mobil Indonesia** — Toyota, Honda, Suzuki, Mitsubishi, Daihatsu, Hyundai, Kia, Wuling, Mazda, Nissan, BMW, Mercedes
- **Data Lengkap per Mobil** — PCD, Center Bore, Offset, Nut Size, Ban OEM, Velg OEM, Tekanan Angin
- **Rekomendasi Ban & Velg** — Compatible tires & wheels untuk setiap mobil
- **Tips Upgrade** — Rekomendasi upgrade ban/velg per model

### Database Ban & Velg
- **14 Ukuran Ban** — Dari 175/65 R14 (LCGC) sampai 265/65 R17 (Fortuner)
- **20+ Produk Ban** — Bridgestone, Dunlop, GT Radial, Yokohama, Michelin, Falken, dll
- **Upgrade Path** — Plus 1, Plus 2, Minus 1 sizing
- **Speed & Load Rating** — Lengkap dengan tabel referensi

### Brand Library
- **12 Brand Ban** — Profil lengkap: asal, kategori, kelebihan, kekurangan, harga
- **10 Brand Velg** — Enkei, OZ Racing, Rays, Work, SSR, BBS, Sparco, dll

### Learning Center
- **7 Modul Pembelajaran** — Dasar Ban, Jenis Ban, PCD, Offset, Material Velg, dll
- **Quiz Interaktif** — Multiple choice dengan penjelasan
- **Glossary** — 55+ istilah teknis (Ban, Velg, Fitment, Umum)

### AI Assistant
- **Streaming Chat** — Jawaban real-time via 9router API
- **Context-Aware** — AI tahu data katalog saat menjawab
- **Quick Prompts** — Template pertanyaan siap pakai
- **BYOK** — Bawa API key sendiri

### Tools
- **Tire Calculator** — Hitung diameter, speed error, clearance change
- **Wheel Calculator** — Hitung inner/outer clearance, poke
- **Perbandingan** — Bandingkan 2 ukuran ban side-by-side
- **Upload Katalog** — Upload PDF/Excel/Gambar (UI ready)

### UI/UX
- **Dark Sidebar** — Navigasi lengkap dengan active states
- **Breadcrumbs** — Navigasi header yang jelas
- **Responsive** — Mobile + Desktop
- **Dark Mode** — Toggle dark/light

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Database | Supabase (PostgreSQL) |
| ORM | Prisma |
| AI | OpenAI-compatible API (9router) |
| Hosting | Vercel |

## Project Structure

```
src/
├── app/                          # 19 halaman
│   ├── dashboard/page.tsx        # Dashboard + stats + progress rings
│   ├── vehicles/page.tsx         # Database 40+ mobil Indonesia
│   ├── vehicles/[id]/page.tsx    # Detail mobil + specs
│   ├── tires/page.tsx            # Database ban
│   ├── wheels/page.tsx           # Database velg
│   ├── brands/page.tsx           # Brand library
│   ├── brands/[slug]/page.tsx    # Detail brand
│   ├── ai-assistant/page.tsx     # AI Chat streaming
│   ├── calculators/page.tsx      # Kalkulator ban + velg
│   ├── learning/page.tsx         # Learning hub
│   ├── glossary/page.tsx         # 55+ istilah
│   ├── comparison/page.tsx       # Perbandingan ukuran
│   ├── catalog/page.tsx          # Upload katalog
│   ├── admin/page.tsx            # Admin panel
│   └── settings/page.tsx         # Settings + API key
├── components/
│   ├── AppShell.tsx              # Layout wrapper
│   └── layout/                   # Sidebar + Header
├── data/                         # 5 file data lengkap
│   ├── vehicles.ts               # 40+ mobil Indonesia
│   ├── tires.ts                  # 14 ukuran + 20 produk
│   ├── brands.ts                 # 22 brand dengan profil
│   ├── glossary.ts               # 55+ istilah
│   └── learning.ts               # 7 modul + quiz
└── lib/
    ├── ai.ts                     # 9router API config
    └── calculators.ts            # Rumus ban + velg
```

## Quick Start

### Prerequisites
- Node.js 18+
- npm/yarn/pnpm

### Installation

```bash
# Clone repository
git clone https://github.com/svincentpeter/wheelpedia-indonesia.git
cd wheelpedia-indonesia

# Install dependencies
npm install

# Optional: refresh vehicle images from free sources
node scripts/list-vehicle-images.mjs
node scripts/download-vehicle-images.mjs

# AI (server-side) — copy env template
# cp .env.example .env.local  (PowerShell: Copy-Item .env.example .env.local)
# Edit AI_API_KEY, AI_ENDPOINT, AI_MODEL

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Key routes

| Route | Fitur |
|-------|--------|
| `/counter` | **OmahBan counter** — mobil → stok → merk → AI |
| `/stok` | Browse snapshot stok OmahBan |
| `/dashboard` | Ringkasan |
| `/vehicles` | 50 mobil + gambar lokal + strip stok |
| `/quiz` | Quiz acak 10 soal + skor localStorage |
| `/ai-assistant` | Chat AI via `/api/chat` (prompt OmahBan) |
| `/calculators` | Tire / wheel calculator |
| `/bookmarks` | Mobil tersimpan (browser) |
| `/history` | Riwayat chat (browser) |

Full implementation plan: `docs/superpowers/plans/2026-07-21-full-product-completion.md`

### With Database (Optional)

```bash
# Setup Supabase
# 1. Create project at supabase.com
# 2. Copy connection string
# 3. Create .env file:
echo 'DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres"' > .env

# Setup Prisma
npx prisma init --datasource-provider postgresql
npx prisma db push
npx prisma db seed
```

## AI Configuration

Chat goes through a **server proxy** at `POST /api/chat` (no API keys in the client bundle).

1. Copy env template:
```bash
cp .env.example .env.local
```

2. Fill server defaults:
```env
AI_ENDPOINT=http://127.0.0.1:20128/v1
AI_API_KEY=your-key-here
AI_MODEL=XM/mimo-v2.5-pro
```

3. Optional **BYOK**: Settings page stores endpoint/key/model in browser `localStorage` and sends them only to `/api/chat`.

Default local stack: [9router](https://github.com/) (or any OpenAI-compatible server) on port `20128`.

## Data Editing

All data lives in `src/data/` files. Edit directly:

- `vehicles.ts` — Add/modify vehicles
- `tires.ts` — Add/modify tire sizes and products
- `brands.ts` — Add/modify brand profiles
- `glossary.ts` — Add/modify glossary terms
- `learning.ts` — Add/modify learning modules

Hot reload: changes appear immediately in development.

## Deploy to Vercel

### Option 1: GitHub Integration (Recommended)
1. Push to GitHub
2. Go to vercel.com → New Project → Import GitHub repo
3. Click Deploy
4. Done! Auto-deploys on every push

### Option 2: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```

## Roadmap

- [ ] Supabase Auth (login/register)
- [ ] User garage (simpan mobil milik)
- [ ] Bookmark & notes persistence
- [ ] OCR for catalog upload
- [ ] RAG search with pgvector
- [ ] Quiz scoring & progress tracking
- [ ] Mobile app (React Native)

## License

MIT

## Contributing

Contributions welcome! Open an issue or submit a PR.

---

Built with ❤️ for Indonesian automotive community
