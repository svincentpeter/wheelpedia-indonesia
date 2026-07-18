import { Vehicle, ChatHistory, QuizQuestion } from "./types";

export const VEHICLES: Vehicle[] = [
  {
    id: "innova-zenix",
    brand: "Toyota",
    name: "Innova Zenix",
    type: "MPV",
    years: "2022 - Present",
    pcd: "5x114.3",
    cb: "60.1",
    nutSize: "M12x1.5",
    engine: "2.0L M20A-FKS (Petrol) / M20A-FXS (Hybrid)",
    tireSizes: [
      { trim: "G / V Grade", size: "215/60 R17" },
      { trim: "Q Grade (Hybrid)", size: "225/50 R18" }
    ],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjUziHItosr-LCP3Ngiojl5sO_WXliN5mko1xi50Zam2rj0FpXRgv0qK8mirx2mnDrvta7mnQ2oxpcT8dlpMp2toUF_9_mGfYC-QfKYQtqhBFm9S8TFCBEDOcoh4pr5btcD9VwFTTtQQAfXyW_YixI7I8d1IGYjFPKRqRJbtVQjUr8X67q6mFp4u24PLTKpNaCVAFlkFCjQ3zAOEFSNiMESEnCP8c55d2gtyQJ-WxDqbS_2zQTIc5rG1n_vmMJAafDt6fKZ2O4CUU",
    description: "The latest evolution of Indonesia's iconic MPV, featuring a transition to a monocoque chassis (TNGA-C) and advanced hybrid powertrain options.",
    aiInsight: "The transition to the TNGA-C platform has completely changed the Zenix's fitment characteristics compared to previous Reborn models. It now favors higher offsets (ET40-45) similar to modern crossovers rather than the lower offsets of older RWD chassis."
  },
  {
    id: "pajero-sport",
    brand: "Mitsubishi",
    name: "Pajero Sport",
    type: "SUV",
    years: "2016 - Present",
    pcd: "6x139.7",
    cb: "67.1",
    nutSize: "M12x1.5",
    engine: "2.4L 4N15 MIVEC Clean Diesel Turbo",
    tireSizes: [
      { trim: "GLX / Exceed Grade", size: "265/65 R17" },
      { trim: "Dakar / Ultimate Grade", size: "265/60 R18" }
    ],
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
    description: "One of Indonesia's favorite ladder-frame luxury SUVs, offering formidable off-road capabilities coupled with premium on-road presence and torque.",
    aiInsight: "Pajero Sport operates on a rugged 6x139.7 PCD. Upgrading to 20-inch wheels is extremely popular in Indonesia, typically using 265/50 R20 tires. A conservative offset of ET20 to ET25 ensures a aggressive, flush look without fender rubbing."
  },
  {
    id: "avanza",
    brand: "Toyota",
    name: "Avanza / Veloz",
    type: "MPV",
    years: "2021 - Present",
    pcd: "5x100",
    cb: "54.1",
    nutSize: "M12x1.5",
    engine: "1.3L 1NR-VE / 1.5L 2NR-VE Dual VVT-i",
    tireSizes: [
      { trim: "1.3 E / G Grade", size: "185/65 R15" },
      { trim: "1.5 G Grade", size: "195/60 R16" },
      { trim: "Veloz Q Grade", size: "205/50 R17" }
    ],
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800",
    description: "Indonesia's legendary 'Sejuta Umat' family MPV. The third generation introduces a revolutionary front-wheel-drive platform (DNGA) and 5x100 bolt patterns.",
    aiInsight: "With the shift to the DNGA platform and 5x100 PCD, Avanza/Veloz owners can now fit wheels from other DNGA/TNGA vehicles (like Toyota Sienta or Subaru). High offset wheels (ET40-ET45) are ideal. Upgrading to 17-inch wheels with 205/50 R17 is the perfect daily setup."
  },
  {
    id: "hr-v",
    brand: "Honda",
    name: "HR-V",
    type: "SUV",
    years: "2022 - Present",
    pcd: "5x114.3",
    cb: "64.1",
    nutSize: "M12x1.5",
    engine: "1.5L i-VTEC (Petrol) / 1.5L VTEC Turbo (RS)",
    tireSizes: [
      { trim: "S / E / SE Grade", size: "215/60 R17" },
      { trim: "RS Turbo Grade", size: "225/45 R18" }
    ],
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&q=80&w=800",
    description: "A stylish compact crossover SUV that dominates the premium Indonesian subcompact segment with its sleek coupe-like silhouette and Honda SENSING.",
    aiInsight: "Honda HR-V features a standard 5x114.3 PCD with a 64.1mm hub. It has a generous wheel well, allowing aggressive fitments of up to 19 inches. Popular Indonesian stance builds feature 19x8.5 wheels with ET40 and 225/40 R19 tires."
  },
  {
    id: "fortuner",
    brand: "Toyota",
    name: "Fortuner",
    type: "SUV",
    years: "2016 - Present",
    pcd: "6x139.7",
    cb: "106.1",
    nutSize: "M12x1.5",
    engine: "2.4L 2GD-FTV / 2.8L 1GD-FTV Diesel Turbo / 2.7L Petrol",
    tireSizes: [
      { trim: "G Grade", size: "265/65 R17" },
      { trim: "VRZ / GR Sport Grade", size: "265/60 R18" }
    ],
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=800",
    description: "The premier ladder-frame luxury SUV from Toyota, known for its heavy-duty performance, high resale value, and authoritative presence on Indonesian toll roads.",
    aiInsight: "Toyota Fortuner shares the same 6x139.7 PCD as Pajero Sport, but has a larger Center Bore of 106.1mm. If fitting aftermarket wheels, ensuring the wheel hub bore is at least 106.1mm (or using hub-centric rings) is absolutely crucial to prevent steering vibrations at high speeds."
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "Apa arti angka 65 pada kode ban 185/65 R15?",
    options: [
      "Lebar ban 65mm",
      "Tinggi dinding samping adalah 65% dari lebar telapak",
      "Kecepatan maksimal adalah 65 km/jam"
    ],
    answerIndex: 1,
    explanation: "Angka 65 menunjukkan Aspect Ratio (Rasio Aspek), yaitu tinggi dinding samping ban yang diukur sebagai persentase dari lebar telapak ban (65% dari 185mm = 120.25mm)."
  },
  {
    id: "q2",
    question: "Manakah PCD yang paling umum digunakan pada Toyota Innova Zenix?",
    options: [
      "4x100",
      "5x100",
      "5x114.3"
    ],
    answerIndex: 2,
    explanation: "Toyota Innova Zenix menggunakan PCD 5x114.3, yang merupakan standar baut roda 5 untuk sebagian besar mobil MPV dan SUV ukuran sedang di Indonesia."
  },
  {
    id: "q3",
    question: "Apa kepanjangan dari huruf R pada kode ban seperti 185/65 R15?",
    options: [
      "Ring / Rim",
      "Radial (Konstruksi Internal)",
      "Racing Edition"
    ],
    answerIndex: 1,
    explanation: "Huruf R menandakan konstruksi internal ban yaitu Radial (arah serat kawat karkas melintang tegak lurus dengan arah putaran ban)."
  }
];

export const DEFAULT_CHAT_HISTORIES: ChatHistory[] = [
  {
    id: "hist-1",
    title: "Rekomendasi ban Innova Zenix",
    category: "Tires",
    dateLabel: "Today",
    messages: [
      {
        id: "msg-1",
        role: "user",
        content: "Rekomendasi ban 18 inci untuk Innova Zenix yang senyap?"
      },
      {
        id: "msg-2",
        role: "model",
        content: `Untuk Toyota Kijang Innova Zenix varian Q Hybrid atau V yang menggunakan velg 18 inci (ukuran standar **225/50 R18**), prioritas utama biasanya adalah kenyamanan (comfort) dan kesenyapan kabin (low noise).

Berikut adalah dua rekomendasi terbaik di pasar Indonesia saat ini:

### 1. Michelin Primacy 4
*Pilihan premium untuk kenyamanan maksimal.*
- **Kelebihan:** Sangat senyap berkat teknologi *Silent Rib*, bantingan sangat empuk, pengereman di jalan basah sangat baik.
- **Kekurangan:** Harga relatif tinggi, dinding ban (sidewall) terasa sedikit lebih soft saat bermanuver tajam.

### 2. Bridgestone Turanza T005A
*Keseimbangan antara durabilitas dan kesenyapan.*
- **Kelebihan:** Kesenyapan sangat baik dengan pitch noise yang direduksi, umur pakai (treadwear) umumnya lebih awet, handling lebih solid dibanding Primacy.
- **Kekurangan:** Bantingan sedikit lebih firm (keras) dibandingkan Michelin, meski masih dalam kategori sangat nyaman.

**Saran Pemasangan:** Pastikan tekanan angin dijaga di angka **33-35 psi** (sesuai plakat di pilar pintu pengemudi) untuk mendapatkan keseimbangan terbaik antara kenyamanan dan efisiensi BBM hybrid.`,
        citations: ["Katalog Ban 2024.pdf"]
      }
    ]
  },
  {
    id: "hist-2",
    title: "Offset Pajero Sport",
    category: "Fitment",
    dateLabel: "Today",
    messages: [
      {
        id: "paj-1",
        role: "user",
        content: "Berapa offset ideal Pajero Sport kalau mau pakai velg 20 inci?"
      },
      {
        id: "paj-2",
        role: "model",
        content: `Untuk Mitsubishi Pajero Sport yang ingin upgrade ke velg diameter 20 inci, setup yang paling ideal dan aman untuk harian tanpa mentok spatbor (fender) adalah:

- **Ukuran Velg:** 20x9.0 inci
- **Offset (ET) Ideal:** **ET +20 hingga +25**
- **Ukuran Ban Rekomendasi:** **265/50 R20** (seperti Yokohama Geolandar H/T atau Michelin Primacy SUV)

### Analisis Fitment:
1. **Lebih Kecil dari ET +15:** Roda akan cenderung keluar dari bodi (fender), memberikan kesan brutal-offroad tetapi berisiko mentok bibir fender saat suspensi tertekan penuh atau belok patah.
2. **Lebih Besar dari ET +30:** Velg akan terlalu masuk ke dalam, berisiko mentok ke area sasis (frame) atau suspensi bagian dalam saat setir diputar habis.

Setup ET +20 s/d +25 dengan ban 265/50 R20 akan menghasilkan tampilan **rata bodi (flush)** yang sangat sporty, elegan, dan tetap nyaman digunakan di jalanan berlubang Indonesia.`
      }
    ]
  },
  {
    id: "hist-3",
    title: "Kalkulator Ban Avanza",
    category: "Calculator",
    dateLabel: "Previous 7 Days",
    messages: [
      {
        id: "av-1",
        role: "user",
        content: "Bandingkan diameter ban Avanza 185/65 R15 dengan ban 195/60 R16."
      },
      {
        id: "av-2",
        role: "model",
        content: `Berikut adalah perbandingan dimensi antara ukuran ban Avanza standar 185/65 R15 dengan Velos/Avanza upsize 195/60 R16:

1. **Ukuran 185/65 R15:**
   - Lebar tapak: 185 mm
   - Tinggi dinding samping: 120.3 mm (65% dari 185)
   - Diameter total: **621.5 mm**
   - Lingkar ban: 1952.5 mm

2. **Ukuran 195/60 R16:**
   - Lebar tapak: 195 mm
   - Tinggi dinding samping: 117.0 mm (60% dari 195)
   - Diameter total: **640.4 mm**
   - Lingkar ban: 2011.9 mm

### Perbedaan Teknis:
- **Kenaikan Diameter:** **+18.9 mm (+3.0%)**
- **Dampak Speedometer:** Ketika speedometer menunjukkan **100 km/jam**, kecepatan asli kendaraan sebenarnya adalah **103 km/jam** (deviasi +3.0%).
- **Rekomendasi:** Perubahan 3.0% masih dalam batas aman (maksimal ±3%). Ground clearance mobil akan bertambah sekitar 9.5 mm, membuat mobil sedikit lebih tinggi dan aman melewati polisi tidur.`
      }
    ]
  },
  {
    id: "hist-4",
    title: "Torsi baut velg HR-V",
    category: "Specs",
    dateLabel: "Previous 7 Days",
    messages: [
      {
        id: "hrv-1",
        role: "user",
        content: "Berapa torsi pengencangan baut roda yang pas untuk Honda HR-V?"
      },
      {
        id: "hrv-2",
        role: "model",
        content: `Torsi pengencangan baut roda (lug nut) standar pabrikan untuk Honda HR-V adalah **108 Nm (Newton Meter)** atau sekitar **80 lb-ft (pound-feet)**.

### Tips Pengencangan:
1. **Gunakan Kunci Momen (Torque Wrench):** Jangan mengencangkan baut roda hanya mengandalkan kunci roda bawaan mobil atau kunci impact pneumatik bengkel tanpa batas torsi, karena bisa menyebabkan baut mulur, ulir rusak, atau piringan rem (rotor) melenting.
2. **Metode Menyilang (Star Pattern):** Selalu kencangkan baut dengan urutan menyilang (membentuk bintang) untuk memastikan velg duduk dengan rata sempurna pada hub roda.`
      }
    ]
  },
  {
    id: "hist-5",
    title: "Perbedaan PCD 4x100 dan 4x114.3",
    category: "Technical",
    dateLabel: "Previous 7 Days",
    messages: [
      {
        id: "diff-1",
        role: "user",
        content: "Apa bedanya velg PCD 4x100 dengan PCD 4x114.3?"
      },
      {
        id: "diff-2",
        role: "model",
        content: `Perbedaan utama antara PCD 4x100 dan 4x114.3 terletak pada **diameter lingkaran bayangan** yang terbentuk dari titik pusat baut roda:

1. **PCD 4x100:**
   - Memiliki **4 lubang baut** dengan diameter lingkaran **100 mm**.
   - Sangat umum digunakan pada mobil Hatchback / City Car berukuran kecil di Indonesia (seperti Honda Brio, Toyota Yaris, Honda Jazz, Toyota Agya, Daihatsu Ayla).

2. **PCD 4x114.3:**
   - Memiliki **4 lubang baut** dengan diameter lingkaran **114.3 mm** (setara dengan 4.5 inci).
   - Umum digunakan pada mobil generasi lama atau MPV medium-ringan (seperti Toyota Avanza generasi ke-1 & 2, Nissan Grand Livina, Honda Accord lawas).

**Penting:** Velg dengan PCD 4x100 **tidak bisa dipasang** pada mobil ber-PCD 4x114.3 tanpa menggunakan adaptor tambahan atau merubah hub tromol roda, karena letak lubang baut tidak akan presisi.`
      }
    ]
  }
];
