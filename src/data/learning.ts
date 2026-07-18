// Learning content data

export interface LearningModule {
  id: string;
  title: string;
  category: "ban" | "velg" | "umum";
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  icon: string;
  description: string;
  sections: LearningSection[];
  quiz?: QuizQuestion[];
}

export interface LearningSection {
  title: string;
  content: string;
  image?: string;
  videoUrl?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: "cara-baca-ukuran-ban",
    title: "Cara Membaca Ukuran Ban",
    category: "ban",
    difficulty: "beginner",
    duration: "8 menit",
    icon: "Ruler",
    description: "Pelajari arti angka dan huruf di sisi ban Anda",
    sections: [
      {
        title: "Anatomi Ukuran Ban",
        content: `Ukuran ban tertera di sidewall (sisi samping ban). Contoh: **185/65 R15 88H**

**Penjelasan:**
- **185** = Lebar tapak ban dalam milimeter
- **65** = Aspect ratio (tinggi profil = 65% dari lebar)
- **R** = Konstruksi Radial
- **15** = Diameter velg dalam inch
- **88** = Load Index (kapasitas beban)
- **H** = Speed Rating (kecepatan maksimal)`,
      },
      {
        title: "Cara Menghitung Diameter Luar",
        content: `Rumus: Diameter Luar = (2 × lebar × aspect_ratio / 100) + (rim × 25.4)

Contoh untuk 185/65 R15:
- Sidewall = 185 × 65/100 = 120.25mm
- Diameter = (2 × 120.25) + (15 × 25.4) = 240.5 + 381 = 621.5mm

Penting: Diameter luar harus tetap sama saat ganti ukuran ban!`,
      },
      {
        title: "Speed Rating & Load Index",
        content: `**Speed Rating populer:**
- S = 180 km/h (standar Indonesia)
- T = 190 km/h (touring)
- H = 210 km/h (sport touring)
- V = 240 km/h (performance)

**Load Index populer:**
- 82 = 475 kg (LCGC)
- 88 = 560 kg (Avanza, Jazz)
- 91 = 615 kg (Xpander, Innova)
- 112 = 1120 kg (Fortuner, Pajero)`,
      },
    ],
    quiz: [
      { id: "q1", question: "Berapa lebar ban 185/65 R15?", options: ["185 mm", "65 mm", "15 mm", "185 inch"], correctIndex: 0, explanation: "Angka pertama (185) menunjukkan lebar tapak ban dalam milimeter." },
      { id: "q2", question: "Apa arti 'R' pada ukuran ban?", options: ["Racing", "Radial", "Rear", "Rim"], correctIndex: 1, explanation: "R = Radial, yaitu konstruksi ban modern dengan lapisan kawat baja." },
      { id: "q3", question: "Speed rating 'H' menunjukkan kecepatan maksimal berapa?", options: ["190 km/h", "200 km/h", "210 km/h", "220 km/h"], correctIndex: 2, explanation: "H = 210 km/h. Ini adalah speed rating populer untuk mobil harian." },
    ],
  },
  {
    id: "jenis-jenis-ban",
    title: "Jenis-Jenis Ban",
    category: "ban",
    difficulty: "beginner",
    duration: "6 menit",
    icon: "Layers",
    description: "Touring, Sport, All-Terrain, dan lainnya",
    sections: [
      {
        title: "Ban Touring",
        content: `Ban touring dirancang untuk kenyamanan harian. Ciri-ciri:
- Tapak simetris atau asimetris
- Noise rendah
- Umur panjang
- Ride comfort baik

Cocok untuk: Harian, perjalanan jauh, MPV, sedan

Contoh: Bridgestone Turanza T005A, Dunlop SP Sport LM705`,
      },
      {
        title: "Ban Sport",
        content: `Ban sport fokus pada performa dan grip. Ciri-ciri:
- Tapak directional atau asimetris
- Grip kering sangat baik
- Respons steering tajam
- Umur lebih pendek

Cocok untuk: Sedan sport, hatchback, weekend car

Contoh: Bridgestone Potenza RE003, Michelin Pilot Sport 4`,
      },
      {
        title: "Ban All-Terrain & Off-Road",
        content: `**All-Terrain (A/T):** Untuk on-road dan off-road ringan. Tapak lebih agresif dari H/T.
Contoh: BFGoodrich KO2, Toyo Open Country A/T III

**Mud-Terrain (M/T):** Untuk off-road berat. Tapak sangat agresif.
Contoh: BFGoodrich KM3, Toyo Open Country M/T

**Highway-Terrain (H/T):** Untuk SUV/pickup yang mostly di jalan raya.
Contoh: Bridgestone Dueler H/T 684II`,
      },
      {
        title: "Ban Eco & Lainnya",
        content: `**Ban Eco:** Dioptimalkan untuk hemat BBM. Rolling resistance rendah.
Contoh: Bridgestone Ecopia EP150, Dunlop Enasave EC300+

**Ban Runflat:** Bisa jalan tanpa angin (terbatas 80km, 80km/h).
Contoh: Bridgestone RFT, Michelin ZP

**Ban Winter:** Untuk salju dan es. Tidak relevan di Indonesia.

**Ban Semi-Slick:** Untuk track day. Grip kering maksimal.
Contoh: Federal SS595, Achilles 123S`,
      },
    ],
    quiz: [
      { id: "q1", question: "Ban jenis apa yang paling cocok untuk harian di Indonesia?", options: ["Sport", "Touring", "Semi-Slick", "Mud-Terrain"], correctIndex: 1, explanation: "Ban touring paling cocok untuk harian karena nyaman, awet, dan noise rendah." },
      { id: "q2", question: "Apa kelebihan ban eco?", options: ["Grip terbaik", "Hemat BBM", "Paling murah", "Paling awet"], correctIndex: 1, explanation: "Ban eco dioptimalkan untuk rolling resistance rendah sehingga hemat BBM." },
    ],
  },
  {
    id: "memahami-pcd",
    title: "Memahami PCD (Pitch Circle Diameter)",
    category: "velg",
    difficulty: "intermediate",
    duration: "7 menit",
    icon: "Circle",
    description: "Pelajari pola baut velg dan cara mengukurnya",
    sections: [
      {
        title: "Apa itu PCD?",
        content: `PCD (Pitch Circle Diameter) adalah diameter lingkaran imajiner yang melewati pusat semua lobang baut.

Format: **Jumlah Baut x Diameter (mm)**

Contoh:
- **4x100** = 4 lobang, diameter lingkaran 100mm
- **5x114.3** = 5 lobang, diameter lingkaran 114.3mm

PCD HARUS sesuai antara velg dan mobil. Tidak bisa dipaksa!`,
      },
      {
        title: "PCD Umum di Indonesia",
        content: `**4x100:** Toyota Avanza, Honda Jazz/Brio, Suzuki Swift, Daihatsu Ayla, Toyota Yaris

**5x114.3:** Toyota Innova/Rush, Honda HRV/CRV, Mitsubishi Xpander, Nissan, Hyundai, Kia, Mazda

**5x112:** BMW, Mercedes-Benz, VW, Audi

**6x139.7:** Toyota Fortuner, Mitsubishi Pajero/Triton, Toyota Hilux

**5x139.7:** Suzuki Jimny`,
      },
      {
        title: "Cara Mengukur PCD",
        content: `**4 Baut:** Ukur jarak dari pusat lubang satu ke pusat lubang yang bersebrangan.

**5 Baut:** Ukur dari tepi luar satu lubang ke tepi dalam lubang yang bersebrangan, lalu tambahkan diameter lubang.

**Tips:** Gunakan kaliper untuk akurasi. Atau cek di manual book mobil.

**PCD Adapter:** Bisa menggunakan adapter untuk mengubah PCD, tapi TIDAK DIREKOMENDASIKAN karena mengurangi keamanan.`,
      },
    ],
    quiz: [
      { id: "q1", question: "PCD Toyota Avanza Gen 2 adalah?", options: ["4x100", "4x114.3", "5x100", "5x114.3"], correctIndex: 0, explanation: "Avanza Gen 2 menggunakan PCD 4x100." },
      { id: "q2", question: "Bisa tidak PCD 4x100 dipasang di mobil 5x114.3?", options: ["Bisa", "Bisa dengan adapter", "Tidak bisa", "Tergantung offset"], correctIndex: 2, explanation: "PCD harus sesuai. Jumlah baut dan diameter berbeda = tidak compatible." },
    ],
  },
  {
    id: "memahami-offset",
    title: "Offset (ET) - Apa dan Mengapa Penting",
    category: "velg",
    difficulty: "intermediate",
    duration: "8 menit",
    icon: "ArrowLeftRight",
    description: "Pelajari pengaruh offset terhadap tampilan dan keamanan",
    sections: [
      {
        title: "Apa itu Offset?",
        content: `Offset (ET) adalah jarak dalam milimeter dari mounting surface (tempat velg menempel di mobil) ke centerline velg.

**ET Positif (+):** Mounting surface lebih ke luar dari centerline (paling umum)
**ET Negatif (-):** Mounting surface lebih ke dalam (deep dish look)
**ET Nol (0):** Mounting surface tepat di centerline

Contoh mobil Indonesia:
- Avanza: ET +40
- Innova: ET +40
- HR-V: ET +40
- Fortuner: ET +30`,
      },
      {
        title: "Pengaruh Offset",
        content: `**ET lebih kecil (misal +35 → +25):**
- Velg lebih keluar (poke)
- Tampilan lebih agresif
- Inner clearance berkurang
- Bisa kena fender

**ET lebih besar (misal +40 → +50):**
- Velg lebih masuk
- Tampilan lebih "tucked"
- Outer clearance berkurang
- Bisa kena strut/spring

**Sweet spot:** ET standar ± 5mm biasanya aman.`,
      },
      {
        title: "Flush, Poke, dan Tucked",
        content: `**Flush:** Velg rata dengan fender. Tampilan ideal.
Untuk flush, cari ET yang membuat velg tepat di garis fender.

**Poke:** Velg keluar dari fender. Agresif tapi berisiko kena fender.
Perlu fender roll atau pull.

**Tucked:** Velg masuk ke dalam fender. Clean look tapi kurang agresif.

**Tips:** Sebelum beli velg, hitung posisi velg baru:
Posisi = ET standar - ET baru
Misal: ET40 - ET35 = keluar 5mm dari standar`,
      },
    ],
    quiz: [
      { id: "q1", question: "Apa yang terjadi jika offset terlalu kecil?", options: ["Velg lebih masuk", "Velg lebih keluar", "Tidak ada efek", "Ban lebih tipis"], correctIndex: 1, explanation: "Offset kecil = velg lebih keluar (poke). Bisa kena fender." },
      { id: "q2", question: "Offset standar Avanza adalah?", options: ["ET30", "ET35", "ET40", "ET45"], correctIndex: 2, explanation: "Avanza menggunakan ET+40 dari pabrik." },
    ],
  },
  {
    id: "velg-material",
    title: "Material Velg: Forged vs Cast vs Flow Formed",
    category: "velg",
    difficulty: "advanced",
    duration: "10 menit",
    icon: "Cog",
    description: "Perbedaan proses manufacturing dan pengaruhnya",
    sections: [
      {
        title: "Cast Wheel (Cor)",
        content: `Proses: Aluminium dicairkan dan dituang ke cetakan.

**Kelebihan:**
- Paling terjangkau
- Banyak pilihan desain
- Cocok untuk harian

**Kekurangan:**
- Paling berat
- Kekuatan standar
- Sulit diperbaiki jika retak

**Harga:** Rp 800rb - 5jt per pcs`,
      },
      {
        title: "Flow Formed (Rotary Forged)",
        content: `Proses: Cast lalu diputar dan ditekan untuk mengentalkan material.

**Kelebihan:**
- Lebih ringan dari cast (20-30%)
- Lebih kuat dari cast
- Harga menengah

**Kekurangan:**
- Lebih mahal dari cast
- Tidak sekuat forged

**Harga:** Rp 2jt - 8jt per pcs

**Populer:** SSR, Enkei (beberapa model), OZ Racing`,
      },
      {
        title: "Forged Wheel (Tempa)",
        content: `Proses: Blok aluminium ditempa dengan tekanan sangat tinggi.

**Kelebihan:**
- Paling ringan (bisa 5-7kg per pcs)
- Paling kuat
- Bisa diperbaiki
- Kualitas ultimate

**Kekurangan:**
- Paling mahal
- Pilihan desain terbatas
- Produk palsu banyak

**Harga:** Rp 5jt - 30jt per pcs

**Populer:** Enkei RPF1, Rays Volk Racing TE37, BBS`,
      },
    ],
  },
  {
    id: "kapan-ganti-ban",
    title: "Kapan Harus Ganti Ban?",
    category: "ban",
    difficulty: "beginner",
    duration: "5 menit",
    icon: "AlertTriangle",
    description: "Tanda-tanda ban perlu diganti",
    sections: [
      {
        title: "Tanda-Tanda Ban Harus Diganti",
        content: `**1. TWI (Tread Wear Indicator)**
Tonjolan kecil di alur ban. Saat tread sejajar TWI = minimum tercapai (1.6mm).

**2. Umur Ban**
Maksimal 5 tahun dari tanggal produksi (cek DOT code). Idealnya ganti setiap 3-4 tahun.

**3. Retak di Sidewall**
Tanda ban sudah tua dan karet sudah keras.

**4. Benjolan**
Bahaya! Ban bisa pecah kapan saja.

**5. Ban Aus Tidak Rata**
Tanda masalah alignment atau suspensi.

**6. Sering Kempes**
Mungkin ada kebocoran yang tidak terdeteksi.`,
      },
      {
        title: "Cek DOT Code",
        content: `DOT code tertera di sidewall ban. 4 digit terakhir menunjukkan minggu dan tahun produksi.

Contoh: DOT XXXX **2523**
- 25 = minggu ke-25
- 23 = tahun 2023

Artinya ban diproduksi minggu ke-25 tahun 2023.

**Tips:** Beli ban yang produksinya tidak lebih dari 1 tahun. Ban yang terlalu lama disimpan juga tidak baik.`,
      },
    ],
  },
  {
    id: "tips-merawat-ban",
    title: "Tips Merawat Ban agar Awet",
    category: "ban",
    difficulty: "beginner",
    duration: "5 menit",
    icon: "Shield",
    description: "Perawatan sederhana untuk memperpanjang umur ban",
    sections: [
      {
        title: "Perawatan Rutin",
        content: `**1. Cek Tekanan Setiap 2 Minggu**
Gunakan pressure gauge. Isi sesuai rekomendasi (lihat sticker di pintu driver).

**2. Rotasi Ban Setiap 5.000-10.000 km**
Pola: Depan kiri → Belakang kanan, Depan kanan → Belakang kiri.

**3. Spooring & Balancing**
- Spooring: Setiap 10.000-20.000 km atau setelah kena lubang besar
- Balancing: Setiap 5.000-10.000 km atau saat ada getaran

**4. Hindari:**
- Parkir terlalu lama di tempat panas
- Menghantam lubang dengan kecepatan tinggi
- Menggunakan ban yang sudah aus`,
      },
    ],
  },
];

export function getModuleById(id: string) {
  return LEARNING_MODULES.find((m) => m.id === id);
}

export function getModulesByCategory(category: string) {
  return LEARNING_MODULES.filter((m) => m.category === category);
}

export function getModulesByDifficulty(difficulty: string) {
  return LEARNING_MODULES.filter((m) => m.difficulty === difficulty);
}
