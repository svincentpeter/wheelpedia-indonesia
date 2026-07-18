# Catalog Omah Ban - Tire & Rim Learning Platform

> Platform pembelajaran interaktif tentang ban dan velg mobil di Indonesia. Katalog lengkap, data ukuran ban per merek mobil, dan AI Assistant untuk tanya jawab.

---

## Dokumen Proyek

| Dokumen | Deskripsi | Status |
|---------|-----------|--------|
| [PRD.md](./PRD.md) | Product Requirements Document - Lengkap | Done |
| [UI-UX.md](./UI-UX.md) | Spesifikasi UI/UX - Dashboard, Sidebar, Halaman | Done |
| [BACKEND.md](./BACKEND.md) | Arsitektur Backend, API, Data Model, AI | Done |
| [PUBLIC-SPEC.md](./PUBLIC-SPEC.md) | Public Spec - Katalog Data Ban & Velg Indonesia | Done |

---

## Ringkasan Cepat

**Masalah:** Susah cari info ukuran ban per merek mobil, velg cocok apa, dan belajar soal ban dari satu tempat.

**Solusi:** Web app dengan:
1. **Katalog Ban** - Database ban lengkap (ukuran, merk, harga, tipe)
2. **Katalog Velg** - Database velg (ukuran, PCD, offset, material)
3. **Referensi Mobil** - Merek mobil Indonesia + ukuran ban standar
4. **Learning Center** - Artikel & materi belajar tentang ban & velg
5. **AI Chat** - Tanya jawab langsung via API key user sendiri

**Stack:**
- Frontend: Next.js 14+ (App Router) + Tailwind CSS + shadcn/ui
- Backend: Next.js API Routes + Prisma + PostgreSQL
- AI: OpenAI API (BYOK - user provides own API key)
- Hosting: Vercel / self-hosted

---

## Quick Start (untuk developer)

```bash
# 1. Clone & install
cd C:\Projects\CatalogOmahBan
npm install

# 2. Setup env
cp .env.example .env.local
# Edit DATABASE_URL, NEXTAUTH_SECRET

# 3. Database
npx prisma db push
npx prisma db seed

# 4. Run
npm run dev
```

---

## Folder Structure (Target)

```
CatalogOmahBan/
├── docs/
│   ├── PRD.md
│   ├── UI-UX.md
│   ├── BACKEND.md
│   └── PUBLIC-SPEC.md
├── src/
│   ├── app/
│   │   ├── (dashboard)/
│   │   ├── (auth)/
│   │   ├── api/
│   │   └── layout.tsx
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   └── types/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
└── package.json
```

---

**Owner:** Omah Ban Team
**Last Updated:** 2026-07-18
