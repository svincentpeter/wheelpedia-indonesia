# Product Requirements Document (PRD)
# Catalog Omah Ban - Platform Pembelajaran Ban & Velg Mobil Indonesia

---

## 1. Executive Summary

**Nama Produk:** Catalog Omah Ban
**Tagline:** "Belajar Ban & Velg, Dari Rumah"
**Versi:** 1.0 (MVP)
**Tanggal:** 2026-07-18

Catalog Omah Ban adalah platform web pembelajaran interaktif yang membantu pengguna memahami dunia ban dan velg mobil di Indonesia. Platform ini menggabungkan katalog produk terstruktur, referensi ukuran ban per merek mobil, materi edukasi, dan AI assistant untuk tanya jawab real-time.

---

## 2. Problem Statement

Pengguna awam di Indonesia kesulitan:
- **Tidak tahu ukuran ban standar** mobil mereka (merek X pakai ban ukuran berapa?)
- **Bingung memilih ban** karena banyak merek, tipe, dan ukuran
- **Tidak paham istilah teknis** seperti PCD, offset, aspect ratio, load index
- **Sulit mencari velg** yang cocok dengan ban dan mobil mereka
- **Tidak ada sumber belajar terpadu** dalam bahasa Indonesia yang mudah dipahami

---

## 3. Goals & Success Metrics

### Goals
| # | Goal | Metric |
|---|------|--------|
| G1 | Menjadi referensi utama ukuran ban per mobil di Indonesia | 10K monthly active users dalam 6 bulan |
| G2 | Membantu user memahami ban & velg dari nol | Avg. session duration > 5 menit |
| G3 | Menggunakan AI untuk menjawab pertanyaan spesifik | 80% pertanyaan AI terjawab memuaskan |
| G4 | Menyediakan katalog ban & velg yang searchable | 500+ produk terkatalog |

### Non-Goals (v1.0)
- E-commerce / transaksi jual beli
- Booking bengkel / toko
- Mobile app native (fokus web dulu)
- Forum komunitas

---

## 4. Target Users / Personas

### Persona 1: "Pemilik Mobil Awam" - Budi (35 tahun)
- **Siapa:** Pemilik mobil Toyota Avanza, tidak paham ban
- **Masalah:** Ban sudah tipis, tidak tahu ukuran berapa yang harus dibeli
- **Tujuan:** Cari tahu ukuran ban standar Avanza, pilih ban yang cocok
- **Behavior:** Browsing via HP, cari yang cepat dan jelas

### Persona 2: "Penggemar Modifikasi" - Rizky (25 tahun)
- **Siapa:** Anak muda yang suka modifikasi velg mobil
- **Masalah:** Tidak tahu PCD dan offset yang cocok untuk mobilnya
- **Tujuan:** Cari velg yang cocok, belajar soal fitment
- **Behavior:** Sering browsing malam, suka eksplorasi katalog

### Persona 3: "Pemilik Toko Ban" - Pak Darto (45 tahun)
- **Siapa:** Pemilik toko ban kecil, butuh referensi cepat
- **Masalah:** Pelanggan sering tanya "ban ukuran X untuk mobil apa?"
- **Tujuan:** Punya referensi cepat untuk menjawab pertanyaan pelanggan
- **Behavior:** Butuh data yang akurat dan cepat diakses

### Persona 4: "Siswa SMK Otomotif" - Andi (17 tahun)
- **Siapa:** Siswa SMK jurusan otomotif, sedang belajar
- **Masalah:** Materi di buku kurang lengkap, tidak ada simulasi
- **Tujuan:** Belajar tentang ban dan velg untuk ujian dan praktik
- **Behavior:** Belajar dari HP, suka fitur AI chat

---

## 5. Features (MVP v1.0)

### 5.1 Dashboard Utama
| Feature | Deskripsi | Priority |
|---------|-----------|----------|
| Statistik Katalog | Jumlah ban, velg, mobil terkatalog | P0 |
| Quick Search | Cari ban/velg/mobil dari dashboard | P0 |
| Recent Learning | Materi terakhir dibaca | P1 |
| AI Chat Quick Access | Tombol langsung ke AI chat | P0 |

### 5.2 Katalog Ban
| Feature | Deskripsi | Priority |
|---------|-----------|----------|
| List Ban | Filter: ukuran, merek, tipe, harga | P0 |
| Detail Ban | Spesifikasi lengkap, gambar, harga range | P0 |
| Ban per Mobil | "Mobil apa yang pakai ban ini?" | P0 |
| Kalkulator Ban | Konversi ukuran, hitung speedometer error | P1 |
| Perbandingan Ban | Bandingkan 2-3 ban side by side | P2 |

### 5.3 Katalog Velg
| Feature | Deskripsi | Priority |
|---------|-----------|----------|
| List Velg | Filter: ukuran, PCD, offset, material | P0 |
| Detail Velg | Spesifikasi, gambar, kompatibilitas mobil | P0 |
| PCD Finder | Cari velg berdasarkan PCD mobil | P0 |
| Offset Calculator | Hitung apakah velg akan poke/fender rub | P1 |

### 5.4 Referensi Mobil Indonesia
| Feature | Deskripsi | Priority |
|---------|-----------|----------|
| List Merek Mobil | Semua merek populer di Indonesia | P0 |
| Detail Mobil | Ukuran ban standar, PCD, rekomendasi ban/velg | P0 |
| Mobil by Ukuran Ban | "Ban 185/65 R15 dipakai mobil apa saja?" | P0 |
| Generasi Mobil | Bedakan generasi (Avanza gen 1 vs gen 2) | P1 |

### 5.5 Learning Center
| Feature | Deskripsi | Priority |
|---------|-----------|----------|
| Artikel Ban 101 | Dasar-dasar ban: ukuran, tipe, bahan | P0 |
| Artikel Velg 101 | Dasar-dasar velg: PCD, offset, material | P0 |
| Video Embed | Video edukasi (YouTube embed) | P1 |
| Quiz | Kuis setelah baca materi | P2 |
| Glossary | Kamus istilah ban & velg | P0 |

### 5.6 AI Chat Assistant
| Feature | Deskripsi | Priority |
|---------|-----------|----------|
| Chat Interface | Chat UI real-time dengan streaming | P0 |
| BYOK API Key | User masukkan API key sendiri (OpenAI) | P0 |
| Context Awareness | AI tahu data katalog saat menjawab | P0 |
| Quick Prompts | Template pertanyaan siap pakai | P1 |
| Chat History | Simpan riwayat percakapan | P1 |
| Export Chat | Download percakapan sebagai text/PDF | P2 |

### 5.7 User System
| Feature | Deskripsi | Priority |
|---------|-----------|----------|
| Register/Login | Email + password, Google OAuth | P0 |
| Profile | Simpan mobil milik user | P1 |
| Favorites | Simpan ban/velg favorit | P1 |
| Settings | Simpan API key, preferensi | P0 |

---

## 6. Data Model (High-Level)

### Core Entities
```
Brand (Merek Ban/Velg)
├── id, name, logo, country, website

Tire (Ban)
├── id, brand_id, model, size (width/profile/rim)
├── type (touring/sport/off-road/all-terrain)
├── load_index, speed_rating, price_range
├── description, image_url

Rim (Velg)
├── id, brand_id, model, size (diameter/width)
├── pcd, offset (et), center_bore, material
├── color_options, price_range, image_url

Car (Mobil)
├── id, brand, model, year_start, year_end
├── generation, body_type
├── tire_size_stock, tire_size_optional[]
├── pcd, center_bore, bolt_count

Article (Artikel)
├── id, title, slug, content, category
├── difficulty (beginner/intermediate/advanced)
├── related_tires[], related_rims[]

User
├── id, email, name, avatar, api_key_encrypted
├── cars[] (garage), favorites[]

ChatSession
├── id, user_id, messages[], created_at
```

---

## 7. Technical Constraints

| Constraint | Detail |
|------------|--------|
| Database | PostgreSQL (Supabase / Railway / self-hosted) |
| AI Provider | OpenAI API (user's own key, BYOK model) |
| Auth | NextAuth.js (credentials + Google) |
| File Storage | Local / S3-compatible for images |
| Browser | Modern browsers (Chrome, Firefox, Safari, Edge) |
| Responsive | Mobile-first, works on 320px+ |

---

## 8. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Data akurasi ban per mobil | High | Cross-reference dari sumber resmi + community verification |
| API key user disalahgunakan | Medium | Encrypt at rest, never log keys, client-side only |
| Konten learning kurang berkualitas | Medium | Expert review, sumber terpercaya |
| Performa AI lambat | Low | Streaming response, timeout handling |

---

## 9. Milestones

| Milestone | Target | Deliverables |
|-----------|--------|--------------|
| M1: Foundation | Week 1-2 | Project setup, DB schema, auth |
| M2: Katalog | Week 3-4 | Tire & rim CRUD, car reference data |
| M3: Learning | Week 5-6 | Articles, glossary, quiz |
| M4: AI Chat | Week 7-8 | Chat UI, OpenAI integration, BYOK |
| M5: Polish | Week 9-10 | Responsive, testing, deployment |

---

## 10. Out of Scope (Future)

- Marketplace / e-commerce integration
- Mobile app (React Native)
- User-generated content (reviews, ratings)
- Workshop / bengkel finder with maps
- Tire pressure monitoring integration
- AR tire preview on car

---

**PRD Owner:** Product Team
**Last Updated:** 2026-07-18
**Status:** Approved for Development
