# UI/UX Specification
# Catalog Omah Ban

---

## 1. Design System

### 1.1 Color Palette
```
Primary:       #1E40AF (Biru Tua - Trust, Professional)
Primary Light: #3B82F6 (Biru Terang - Hover, Active)
Secondary:     #F59E0B (Kuning/Emas - Aksen, CTA)
Accent:        #10B981 (Hijau - Success, Available)
Danger:        #EF4444 (Merah - Error, Warning)
Background:    #F8FAFC (Abu sangat terang)
Surface:       #FFFFFF (Putih - Card, Panel)
Text Primary:  #1E293B (Hampir hitam)
Text Secondary:#64748B (Abu sedang)
Text Muted:    #94A3B8 (Abu terang)
Border:        #E2E8F0 (Abu border)
```

### 1.2 Typography
```
Font Family:   Inter (Google Fonts)
Heading:       font-bold, tracking-tight
Body:          font-normal, leading-relaxed
Code/Data:     JetBrains Mono (untuk angka ukuran ban)

Hierarchy:
- H1: 32px / 2rem   - Page title
- H2: 24px / 1.5rem - Section title
- H3: 20px / 1.25rem - Card title
- H4: 16px / 1rem   - Subsection
- Body: 14px / 0.875rem
- Small: 12px / 0.75rem
```

### 1.3 Spacing & Layout
```
Max Width:     1280px (container)
Sidebar:       280px (desktop collapsed: 64px)
Content:       fluid (remaining space)
Grid:          12 columns
Gap:           16px (md), 24px (lg)
Card Radius:   12px
Button Radius: 8px
```

### 1.4 Components (shadcn/ui based)
```
Button         - primary, secondary, ghost, outline, destructive
Card           - with header, content, footer sections
Input          - text, search, number, select
Badge          - size, brand, type indicators
Table          - sortable, filterable data tables
Dialog         - modals for details, confirmations
Tabs           - content switching
Sidebar        - collapsible navigation
Sheet          - mobile sidebar drawer
Avatar         - user profile
Dropdown       - menus, selects
Tooltip        - hover info
Skeleton       - loading states
Toast          - notifications
```

---

## 2. Layout Structure

### 2.1 Main Layout (Desktop)
```
┌─────────────────────────────────────────────────────────┐
│  HEADER (fixed top)                                      │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ [Logo] Omah Ban    [🔍 Search...]    [🔔] [👤]     │ │
│  └─────────────────────────────────────────────────────┘ │
├────────┬────────────────────────────────────────────────┤
│        │                                                 │
│ SIDEBAR│  MAIN CONTENT AREA                              │
│ (fixed │                                                 │
│  left) │  ┌─────────────────────────────────────────┐   │
│        │  │  Page Title / Breadcrumb                 │   │
│ [🏠]   │  ├─────────────────────────────────────────┤   │
│ [📊]   │  │                                         │   │
│ [🔧]   │  │  Page Content (scrollable)              │   │
│ [⭕]   │  │                                         │   │
│ [🚗]   │  │                                         │   │
│ [📖]   │  │                                         │   │
│ [🤖]   │  │                                         │   │
│ [⚙️]   │  └─────────────────────────────────────────┘   │
│        │                                                 │
├────────┴────────────────────────────────────────────────┤
│  FOOTER (optional, minimal)                              │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Mobile Layout (< 768px)
```
┌───────────────────────┐
│ [≡] Omah Ban    [👤] │  ← Header with hamburger
├───────────────────────┤
│                       │
│  Content Area         │
│  (full width)         │
│                       │
│  Bottom Tab Bar:      │
│  [🏠][🔧][⭕][📖][🤖]│
└───────────────────────┘
```

---

## 3. Sidebar Navigation

### 3.1 Sidebar Structure
```
┌─────────────────────────┐
│  🏠  Dashboard           │
│                          │
│  📖 LEARNING             │ ← Section header (muted, uppercase)
│  ├─ 📊 Dashboard Belajar │
│  ├─ 📝 Artikel           │
│  ├─ 📚 Glossary          │
│  └─ ❓ Quiz              │
│                          │
│  🔧 KATALOG              │
│  ├─ ⭕ Ban               │
│  ├─ 🔘 Velg              │
│  └─ 🚗 Mobil             │
│                          │
│  🤖 AI ASSISTANT         │
│  └─ 💬 Chat              │
│                          │
│  ⚙️ SETTINGS             │
│  ├─ 👤 Profil            │
│  ├─ 🔑 API Key           │
│  └─ 🎨 Preferensi        │
│                          │
│  ─────────────────────   │
│  📌 Favorites (3)        │
│  🕐 Riwayat (12)         │
└─────────────────────────┘
```

### 3.2 Sidebar Behavior
- **Desktop:** Expanded by default (280px), collapsible to icon-only (64px)
- **Tablet:** Icon-only by default, expand on hover
- **Mobile:** Hidden, slide-in sheet from left on hamburger tap
- **Active state:** Background highlight + left border accent
- **Hover:** Subtle background change

---

## 4. Page-by-Page Specification

---

### 4.1 Dashboard (/dashboard)

**Purpose:** Halaman utama, ringkasan semua fitur

```
┌─────────────────────────────────────────────────────┐
│  Selamat Datang, Budi! 👋                            │
│  Mau belajar apa hari ini?                           │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │ ⭕ 120   │ │ 🔘 85    │ │ 🚗 45    │ │ 📝 30  │ │
│  │ Ban      │ │ Velg     │ │ Mobil    │ │ Artikel│ │
│  │ Terkatalog│ │ Terkatalog│ │ Referensi│ │ Edukasi│ │
│  └──────────┘ └──────────┘ └──────────┘ └────────┘ │
│                                                      │
│  ┌─── Quick Search ─────────────────────────────┐   │
│  │ 🔍 Cari ban, velg, atau mobil...             │   │
│  │ [Ban] [Velg] [Mobil] filter chips            │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌─── Mobil Saya ────┐  ┌─── Belajar Terakhir ──┐  │
│  │ 🚗 Toyota Avanza  │  │ 📖 Cara Baca Ukuran  │  │
│  │ Ban: 185/65 R15   │  │    Ban (75% selesai)  │  │
│  │ [Edit Mobil]      │  │ 📖 Apa itu PCD?       │  │
│  └───────────────────┘  │    (50% selesai)      │  │
│                          └──────────────────────┘  │
│                                                      │
│  ┌─── Populer Minggu Ini ───────────────────────┐   │
│  │ ⭕ Bridgestone Ecopia EP150 185/65 R15       │   │
│  │ ⭕ GT Radial Champiro HPY 205/55 R16        │   │
│  │ 🔘 Enkei RPF1 15x7 +35 4x100                │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌─── AI Quick Ask ─────────────────────────────┐   │
│  │ 🤖 "Tanya AI tentang ban dan velg..."        │   │
│  │ [Buka Chat] [Tanya: Ban terbaik untuk Avanza?]│  │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

**Components:**
- StatCards (4x): Animated counter, icon, label
- SearchBar: Global search with type filter chips
- MyGarage Card: User's saved cars (editable)
- RecentLearning Card: Continue learning progress
- PopularItems Card: Top viewed items this week
- AIQuickAsk Card: Shortcut to AI chat with templates

---

### 4.2 Katalog Ban (/katalog/ban)

**Purpose:** Browse, filter, search semua ban

```
┌─────────────────────────────────────────────────────┐
│  ⭕ Katalog Ban                           [🔍 Cari] │
├─────────────────────────────────────────────────────┤
│                                                      │
│  FILTERS (sidebar / top on mobile):                  │
│  ┌─────────────┐                                     │
│  │ Ukuran RIM  │ [13] [14] [15] [16] [17] [18] [19+]│
│  │ Lebar       │ [165] [175] [185] [195] [205] [215+]│
│  │ Profil      │ [35] [40] [45] [50] [55] [60] [65]  │
│  │ Merek       │ [✓] Bridgestone [✓] Dunlop [✓] GT   │
│  │ Tipe        │ [✓] Touring [✓] Sport [✓] Off-road   │
│  │ Harga       │ [━━━━━━●━━━━━━] 300rb - 2jt          │
│  │ Speed Rating│ [S] [T] [H] [V] [W] [Y]              │
│  └─────────────┘                                     │
│                                                      │
│  SORT: [Harga ↑] [Harga ↓] [Populer] [Terbaru]      │
│                                                      │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐       │
│  │  [IMAGE]   │ │  [IMAGE]   │ │  [IMAGE]   │       │
│  │            │ │            │ │            │       │
│  │Bridgestone │ │Dunlop      │ │GT Radial   │       │
│  │Ecopia EP150│ │SP Sport    │ │Champiro HPY│       │
│  │            │ │LM705       │ │            │       │
│  │185/65 R15  │ │195/55 R16  │ │205/55 R16  │       │
│  │            │ │            │ │            │       │
│  │Touring     │ │Touring     │ │Sport       │       │
│  │H: 600-750k │ │H: 700-900k │ │H: 500-650k │       │
│  │            │ │            │ │            │       │
│  │⭐ 4.5 (120)│ │⭐ 4.3 (89) │ │⭐ 4.6 (201)│       │
│  │            │ │            │ │            │       │
│  │[❤️] [Detail]│ │[❤️] [Detail]│ │[❤️] [Detail]│       │
│  └────────────┘ └────────────┘ └────────────┘       │
│                                                      │
│  Pagination: [< 1 2 3 ... 12 >]                      │
└─────────────────────────────────────────────────────┘
```

---

### 4.3 Detail Ban (/katalog/ban/[id])

```
┌─────────────────────────────────────────────────────┐
│  ← Kembali ke Katalog                                │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────┐  Bridgestone Ecopia EP150          │
│  │              │  185/65 R15 88H                    │
│  │   [IMAGE]    │                                     │
│  │              │  ⭐ 4.5 (120 reviews)              │
│  │              │  💰 Rp 600.000 - 750.000           │
│  │              │                                     │
│  │              │  Tipe: Touring                      │
│  │              │  Speed Rating: H (210 km/h)        │
│  │              │  Load Index: 88 (560 kg)           │
│  └──────────────┘                                     │
│                                                      │
│  TABS: [Spesifikasi] [Kompatibilitas] [Review] [Tips]│
│                                                      │
│  ── Spesifikasi ──                                   │
│  ┌──────────────────────────────────────┐            │
│  │ Parameter          │ Nilai           │            │
│  │────────────────────│─────────────────│            │
│  │ Lebar              │ 185 mm          │            │
│  │ Profil             │ 65%             │            │
│  │ Diameter Rim       │ 15 inch         │            │
│  │ Diameter Luar      │ 621.5 mm        │            │
│  │ Load Index         │ 88 (560 kg)     │            │
│  │ Speed Rating       │ H (210 km/h)    │            │
│  │ Tekanan Udara      │ 32 PSI (recom.) │            │
│  │ Kedalaman Tapak    │ 7 mm (baru)     │            │
│  │ Tipe Tapak         │ Symmetrical     │            │
│  │ Runflat            │ Tidak           │            │
│  └──────────────────────────────────────┘            │
│                                                      │
│  ── Mobil Kompatibel ──                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │ Avanza   │ │ Jazz     │ │ Yaris    │            │
│  │ Gen 1-2  │ │ GE/GK    │ │ XP150    │            │
│  │ (Standar)│ │ (Standar)│ │ (Upgrade)│            │
│  └──────────┘ └──────────┘ └──────────┘            │
│                                                      │
│  ── Alternatif Sejenis ──                            │
│  [Dunlop SP Sport LM705] [Yokohama BluEarth]        │
└─────────────────────────────────────────────────────┘
```

---

### 4.4 Katalog Velg (/katalog/velg)

```
┌─────────────────────────────────────────────────────┐
│  🔘 Katalog Velg                          [🔍 Cari] │
├─────────────────────────────────────────────────────┤
│                                                      │
│  FILTERS:                                            │
│  ┌─────────────┐                                     │
│  │ Diameter    │ [14] [15] [16] [17] [18] [19] [20+]│
│  │ PCD         │ [4x100] [4x114.3] [5x100] [5x114.3]│
│  │ Offset (ET) │ [+20] [+25] [+30] [+35] [+40] [+45]│
│  │ Material    │ [✓] Alloy [✓] Steel [✓] Forged      │
│  │ Merek       │ [✓] Enkei [✓] OZ Racing [✓] Work    │
│  │ Harga       │ [━━━━━━●━━━━━━] 1jt - 15jt          │
│  └─────────────┘                                     │
│                                                      │
│  PCD Quick Finder:                                   │
│  ┌──────────────────────────────────────────────┐   │
│  │ Pilih mobil Anda → lihat velg yang cocok     │   │
│  │ [Dropdown: Merek ▼] [Dropdown: Model ▼]      │   │
│  │ [Cari Velg Cocok]                             │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐       │
│  │  [IMAGE]   │ │  [IMAGE]   │ │  [IMAGE]   │       │
│  │            │ │            │ │            │       │
│  │Enkei RPF1  │ │OZ Racing   │ │Work Emotion│       │
│  │            │ │Ultraleggera│ │CR Kiwami   │       │
│  │15x7        │ │17x8        │ │18x8.5      │       │
│  │PCD: 4x100  │ │PCD: 5x114.3│ │PCD: 5x114.3│       │
│  │ET: +35     │ │ET: +40     │ │ET: +38     │       │
│  │            │ │            │ │            │       │
│  │Forged      │ │Alloy       │ │Alloy       │       │
│  │Rp 4.5jt/pc │ │Rp 8jt/pc   │ │Rp 6jt/pc   │       │
│  │            │ │            │ │            │       │
│  │[❤️] [Detail]│ │[❤️] [Detail]│ │[❤️] [Detail]│       │
│  └────────────┘ └────────────┘ └────────────┘       │
└─────────────────────────────────────────────────────┘
```

---

### 4.5 Referensi Mobil (/mobil)

```
┌─────────────────────────────────────────────────────┐
│  🚗 Referensi Mobil Indonesia             [🔍 Cari] │
├─────────────────────────────────────────────────────┤
│                                                      │
│  QUICK FILTER: [Jepang] [Korea] [Eropa] [China]     │
│  BODY TYPE:    [MPV] [SUV] [Sedan] [Hatchback]      │
│                                                      │
│  ── Populer di Indonesia ──                          │
│                                                      │
│  ┌─────────────────────────────────────────────┐    │
│  │  TOYOTA                                      │    │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌──────┐ │    │
│  │  │ Avanza │ │ Innova │ │ Yaris  │ │ Raize│ │    │
│  │  │185/65  │ │205/65  │ │185/60  │ │195/60│ │    │
│  │  │ R15    │ │ R16    │ │ R15    │ │ R16  │ │    │
│  │  │4x100   │ │5x114.3 │ │4x100   │ │4x100 │ │    │
│  │  └────────┘ └────────┘ └────────┘ └──────┘ │    │
│  └─────────────────────────────────────────────┘    │
│                                                      │
│  ┌─────────────────────────────────────────────┐    │
│  │  HONDA                                       │    │
│  │  ┌────────┐ ┌────────┐ ┌────────┐ ┌──────┐ │    │
│  │  │ Jazz   │ │ Brio   │ │ HR-V   │ │CR-V  │ │    │
│  │  │185/55  │ │175/65  │ │215/55  │ │235/60│ │    │
│  │  │ R16    │ │ R14    │ │ R17    │ │ R18  │ │    │
│  │  │4x100   │ │4x100   │ │5x114.3 │ │5x114.│ │    │
│  │  └────────┘ └────────┘ └────────┘ └──────┘ │    │
│  └─────────────────────────────────────────────┘    │
│                                                      │
│  ── Cari by Ukuran Ban ──                            │
│  "Ban ukuran 185/65 R15 dipakai oleh:"              │
│  [Toyota Avanza] [Honda Jazz] [Suzuki Ertiga] ...   │
└─────────────────────────────────────────────────────┘
```

---

### 4.6 Detail Mobil (/mobil/[id])

```
┌─────────────────────────────────────────────────────┐
│  ← Kembali                                           │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────┐  Toyota Avanza                     │
│  │              │  Generasi 2 (2015-2022)            │
│  │   [IMAGE]    │  Body: MPV                         │
│  │              │                                     │
│  │              │  ── Spesifikasi Standar ──          │
│  │              │  Ban Standar: 185/65 R15            │
│  │              │  PCD: 4x100                         │
│  │              │  Center Bore: 60.1mm                │
│  │              │  Offset Standar: +40                │
│  │              │  Lebar Velg Standar: 5.5J           │
│  └──────────────┘                                     │
│                                                      │
│  TABS: [Ban Cocok] [Velg Cocok] [Upgrade Guide]      │
│                                                      │
│  ── Ban yang Cocok ──                                │
│  ┌──────────────────────────────────────────────┐   │
│  │ Standar (185/65 R15):                        │   │
│  │ • Bridgestone Ecopia EP150      ★ Rekomendasi│   │
│  │ • Dunlop Enasave EC300+                      │   │
│  │ • Yokohama BluEarth-GT AE50                  │   │
│  │ • GT Radial Champiro Eco                     │   │
│  │                                              │   │
│  │ Upgrade (195/60 R15) - lebih lebar:          │   │
│  │ • Bridgestone Turanza T005A                  │   │
│  │ • Michelin Primacy 4                         │   │
│  │                                              │   │
│  │ Upgrade (205/55 R16) - sport look:           │   │
│  │ • Bridgestone Potenza RE003                  │   │
│  │ • Falken Azenis FK510                        │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ── Velg yang Cocok (PCD 4x100) ──                  │
│  ┌────────┐ ┌────────┐ ┌────────┐                   │
│  │Enkei   │ │Sprint  │ │ART     │                   │
│  │RPF1    │ │Form    │ │Berlin  │                   │
│  │15x7    │ │15x7    │ │16x7   │                   │
│  │ET+35   │ │ET+38   │ │ET+40  │                   │
│  │Forged  │ │Alloy   │ │Alloy  │                   │
│  └────────┘ └────────┘ └────────┘                   │
└─────────────────────────────────────────────────────┘
```

---

### 4.7 Learning Center (/learning)

```
┌─────────────────────────────────────────────────────┐
│  📖 Learning Center                                   │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ── Progress Saya ──                                 │
│  ┌──────────────────────────────────────────────┐   │
│  │ ████████░░░░░░░░░░░░  40% Complete           │   │
│  │ 8 dari 20 materi selesai                      │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  TABS: [Semua] [Ban 101] [Velg 101] [Tips] [Video]  │
│                                                      │
│  ── 🟢 Beginner ──                                   │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐      │
│  │ Cara Membaca│ │ Apa itu    │ │ Jenis-Jenis│      │
│  │ Ukuran Ban  │ │ Velg/      │ │ Ban:       │      │
│  │             │ │ Rim?       │ │ Touring,   │      │
│  │ [Selesai ✓] │ │ [Selesai ✓]│ │ Sport, AT  │      │
│  └────────────┘ └────────────┘ └────────────┘      │
│                                                      │
│  ── 🟡 Intermediate ──                               │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐      │
│  │ Memahami   │ │ PCD &      │ │ Offset &   │      │
│  │ Load Index │ │ Bolt       │ │ Clearance  │      │
│  │ & Speed    │ │ Pattern    │ │            │      │
│  │ Rating     │ │            │ │            │      │
│  │ [Progres..]│ │ [Baru]     │ │ [Baru]     │      │
│  └────────────┘ └────────────┘ └────────────┘      │
│                                                      │
│  ── 🔴 Advanced ──                                   │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐      │
│  │ Calculating│ │ Tire       │ │ Forged vs  │      │
│  │ Speedometer│ │ Compound & │ │ Cast vs    │      │
│  │ Error      │ │ Tread      │ │ Flow Formed│      │
│  │ Design     │ │            │ │            │      │
│  │ [Locked 🔒]│ │ [Locked 🔒]│ │ [Locked 🔒]│      │
│  └────────────┘ └────────────┘ └────────────┘      │
└─────────────────────────────────────────────────────┘
```

---

### 4.8 AI Chat (/ai-chat)

```
┌─────────────────────────────────────────────────────┐
│  🤖 AI Assistant - Tanya Soal Ban & Velg             │
├─────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │ Quick Prompts:                               │   │
│  │ [Ban terbaik untuk Avanza?]                  │   │
│  │ [Apa bedanya ban touring dan sport?]         │   │
│  │ [Velg RPF1 cocok untuk mobil apa saja?]      │   │
│  │ [Berapa harga ban 185/65 R15?]               │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │                                              │   │
│  │  🤖: Halo! Saya AI assistant Omah Ban.      │   │
│  │  Tanya apa saja tentang ban dan velg!        │   │
│  │                                              │   │
│  │  ─────────────────────────────────────────   │   │
│  │                                              │   │
│  │  👤: Avanza saya pakai ban ukuran berapa?   │   │
│  │                                              │   │
│  │  🤖: Toyota Avanza tergantung generasinya:  │   │
│  │                                              │   │
│  │  📊 **Avanza Gen 1 (2004-2011):**           │   │
│  │  - Standar: 175/65 R14                      │   │
│  │  - PCD: 4x100, ET: +40                      │   │
│  │                                              │   │
│  │  📊 **Avanza Gen 2 (2012-2022):**           │   │
│  │  - Standar: 185/65 R15                      │   │
│  │  - PCD: 4x100, ET: +40                      │   │
│  │                                              │   │
│  │  📊 **Avanza Gen 3 (2022-sekarang):**       │   │
│  │  - Standar: 185/60 R15                      │   │
│  │  - PCD: 4x100, ET: +40                      │   │
│  │                                              │   │
│  │  Rekomendasi ban: Bridgestone Ecopia EP150  │   │
│  │  atau Dunlop Enasave EC300+ untuk harian.   │   │
│  │                                              │   │
│  │  ─────────────────────────────────────────   │   │
│  │                                              │   │
│  │  (streaming indicator ●●●)                   │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ┌──────────────────────────────────────────────┐   │
│  │ [📎] Ketik pertanyaan Anda...           [➤] │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ⚙️ API Status: ✅ Connected (gpt-4o-mini)         │
│  [Settings] [Clear Chat] [Export PDF]                │
└─────────────────────────────────────────────────────┘
```

---

### 4.9 Settings (/settings)

```
┌─────────────────────────────────────────────────────┐
│  ⚙️ Settings                                          │
├─────────────────────────────────────────────────────┤
│                                                      │
│  TABS: [Profil] [API Key] [Garage] [Preferensi]      │
│                                                      │
│  ── API Key Settings ──                              │
│  ┌──────────────────────────────────────────────┐   │
│  │ AI Provider: [OpenAI ▼]                      │   │
│  │ API Key: [sk-••••••••••••••••] [👁️] [Test]  │   │
│  │ Model: [gpt-4o-mini ▼]                       │   │
│  │                                              │   │
│  │ ⚠️ API key Anda disimpan terenkripsi di      │   │
│  │ server. Kami TIDAK pernah mengirim key ke    │   │
│  │ pihak lain. Key hanya digunakan untuk        │   │
│  │ request AI dari akun Anda.                   │   │
│  │                                              │   │
│  │ [Simpan API Key]                              │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  ── My Garage ──                                     │
│  ┌──────────────────────────────────────────────┐   │
│  │ Mobil 1: Toyota Avanza 2019                  │   │
│  │   Ban: 185/65 R15 | Velg: Standar            │   │
│  │   [Edit] [Hapus]                              │   │
│  │                                              │   │
│  │ Mobil 2: Honda Jazz 2021                     │   │
│  │   Ban: 185/55 R16 | Velg: Standar            │   │
│  │   [Edit] [Hapus]                              │   │
│  │                                              │   │
│  │ [+ Tambah Mobil]                              │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 5. Component Specifications

### 5.1 Tire Size Display Component
```
┌──────────────────────────────┐
│  185 / 65 / R15              │
│  ↑     ↑     ↑               │
│  Width Profile Rim           │
│  (mm)  (%)   (inch)          │
│                              │
│  Visual:                     │
│  ┌────┐                     │
│  │    │ ← Profile (65%)     │
│  │ R  │ ← Rim (15")         │
│  │    │                     │
│  └────┘                     │
│  ├──185mm──┤                │
└──────────────────────────────┘
```

### 5.2 PCD Display Component
```
┌──────────────────────────────┐
│  PCD: 4 x 100               │
│                              │
│  Visual:                     │
│     ●    ●                  │
│       ◉       ← center bore │
│     ●    ●                  │
│                              │
│  4 bolts, 100mm circle      │
└──────────────────────────────┘
```

### 5.3 Comparison Table Component
```
┌──────────────────────────────────────────────────┐
│  Perbandingan Ban                                  │
│  ┌──────────┬──────────┬──────────┐              │
│  │          │ Ban A    │ Ban B    │              │
│  │──────────│──────────│──────────│              │
│  │ Ukuran   │ 185/65   │ 195/60   │              │
│  │          │ R15      │ R15      │              │
│  │ Merek    │Bridgestone│ Dunlop   │              │
│  │ Tipe     │ Touring  │ Touring  │              │
│  │ Harga    │ 650rb    │ 750rb    │              │
│  │ Rating   │ ⭐4.5    │ ⭐4.3    │              │
│  │          │          │          │              │
│  │ Diameter │ 621.5mm  │ 615mm    │              │
│  │ Luar     │          │          │              │
│  └──────────┴──────────┴──────────┘              │
└──────────────────────────────────────────────────┘
```

---

## 6. Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, bottom nav, sheet sidebar |
| Tablet | 640-1024px | Icon sidebar, 2-column grid |
| Desktop | 1024-1280px | Full sidebar, 3-column grid |
| Wide | > 1280px | Full sidebar, 4-column grid |

---

## 7. Animations & Transitions

| Element | Animation | Duration |
|---------|-----------|----------|
| Page transition | Fade in + slide up | 200ms |
| Card hover | Scale 1.02 + shadow | 150ms |
| Sidebar expand | Width transition | 200ms |
| Modal open | Fade + scale from 0.95 | 200ms |
| AI message | Typewriter effect | 30ms/char |
| Stat counter | Count up animation | 1000ms |
| Skeleton loading | Pulse | 1.5s infinite |
| Filter chip | Bounce on select | 150ms |

---

## 8. Accessibility

- All interactive elements keyboard-navigable
- Color contrast ratio minimum 4.5:1 (WCAG AA)
- Alt text on all images
- ARIA labels on icons without text
- Skip-to-content link
- Focus visible indicators
- Screen reader friendly table headers

---

## 9. Dark Mode (v2)

Planned for v2. Color tokens prepared:
```
Dark Background: #0F172A
Dark Surface:    #1E293B
Dark Text:       #F8FAFC
Dark Border:     #334155
```

---

**Last Updated:** 2026-07-18
**Status:** Ready for Development
