# Public Specification
# Catalog Omah Ban - Data, Knowledge Base & Domain Reference

---

## 1. Overview

Dokumen ini berisi **seluruh data domain** yang dibutuhkan untuk mengisi database Catalog Omah Ban. Mencakup:
- Referensi ukuran ban per mobil Indonesia
- Database ban (merek, ukuran, tipe, harga)
- Database velg (merek, ukuran, PCD, material)
- Data mobil Indonesia (merek, model, generasi, ukuran ban standar)
- Materi pembelajaran (outline artikel, glossary)
- Spesifikasi teknis ban & velg

---

## 2. Ukuran Ban - Penjelasan Lengkap

### 2.1 Cara Membaca Ukuran Ban

Contoh: **185/65 R15 88H**

| Komponen | Nilai | Arti |
|----------|-------|------|
| **185** | Lebar tapak | 185 milimeter |
| **65** | Aspect ratio | Tinggi profil = 65% dari lebar (185 × 0.65 = 120.25mm) |
| **R** | Konstruksi | Radial |
| **15** | Diameter rim | 15 inch |
| **88** | Load Index | Maks beban 560 kg per ban |
| **H** | Speed Rating | Maks kecepatan 210 km/h |

### 2.2 Rumus Menghitung Diameter Luar Ban

```
Diameter Luar = (2 × lebar × aspect_ratio / 100) + (rim × 25.4)

Contoh: 185/65 R15
= (2 × 185 × 65/100) + (15 × 25.4)
= (2 × 120.25) + 381
= 240.5 + 381
= 621.5 mm
```

### 2.3 Speed Rating Lengkap

| Rating | Max Speed | Kegunaan |
|--------|-----------|----------|
| L | 120 km/h | Off-road, ban serep |
| M | 130 km/h | Off-road |
| N | 140 km/h | Ban serep temporary |
| P | 150 km/h | Passenger standard |
| Q | 160 km/h | Winter tires |
| R | 170 km/h | Light truck |
| S | 180 km/h | Passenger standar Indonesia |
| T | 190 km/h | Passenger touring |
| U | 200 km/h | Touring |
| H | 210 km/h | Sport touring |
| V | 240 km/h | Performance |
| W | 270 km/h | High performance |
| Y | 300 km/h | Ultra high performance |
| ZR | >240 km/h | Z-rated (suffix) |

### 2.4 Load Index Tabel (Yang Umum di Indonesia)

| Load Index | Beban (kg) | Load Index | Beban (kg) |
|------------|------------|------------|------------|
| 70 | 335 | 85 | 515 |
| 71 | 345 | 86 | 530 |
| 72 | 355 | 87 | 545 |
| 73 | 365 | **88** | **560** |
| 74 | 375 | 89 | 580 |
| 75 | 387 | 90 | 600 |
| 76 | 400 | 91 | 615 |
| 77 | 412 | 92 | 630 |
| 78 | 425 | 93 | 650 |
| 79 | 437 | 94 | 670 |
| 80 | 450 | 95 | 690 |
| 81 | 462 | 96 | 710 |
| 82 | 475 | 97 | 730 |
| 83 | 487 | 98 | 750 |
| 84 | 500 | 99 | 775 |

---

## 3. Velg (Rim) - Penjelasan Lengkap

### 3.1 Cara Membaca Ukuran Velg

Contoh: **7J x 15 ET35 4x100 CB60.1**

| Komponen | Nilai | Arti |
|----------|-------|------|
| **7** | Lebar velg | 7 inch |
| **J** | Bentuk flensa | J-type (paling umum) |
| **x** | One-piece | Velg satu bagian |
| **15** | Diameter | 15 inch |
| **ET35** | Offset | 35mm (jarak mounting surface ke centerline) |
| **4x100** | PCD | 4 lubang baut, diameter lingkaran 100mm |
| **CB60.1** | Center Bore | Diameter lubang tengah 60.1mm |

### 3.2 PCD (Pitch Circle Diameter)

PCD = jumlah baut × diameter lingkaran baut (dalam mm)

**PCD Umum di Indonesia:**

| PCD | Mobil Umum |
|-----|-----------|
| **4x100** | Toyota Avanza, Honda Jazz/Brio, Suzuki Swift, Daihatsu Ayla/Xenia, Honda City (lama) |
| **4x114.3** | Honda Civic (lama), Toyota Soluna, Suzuki Baleno (lama) |
| **5x100** | Toyota Yaris, Subaru models |
| **5x114.3** | Toyota Innova/CHR/Rush, Honda HRV/CRV, Mitsubishi Xpander/Pajero, Nissan X-Trail, Hyundai Tucson, Kia Seltos, Mazda CX-5 |
| **5x112** | BMW, Mercedes-Benz, VW, Audi |
| **5x120** | BMW (sebagian), Honda Odyssey |

### 3.3 Offset (ET) Explained

```
ET (Einpresstiefe) = jarak dari mounting surface ke centerline velg

ET Positif (+)  → Mounting surface lebih ke luar (most common)
ET Negatif (-)  → Mounting surface lebih ke dalam (deep dish look)
ET Nol (0)      → Mounting surface tepat di centerline

Visual:
                    Centerline
                         |
    [====|===============]  ET +35 (mild poke)
    [========|==========]   ET +45 (standard)
    [|==================]   ET 0 (flush)
    [=================|]    ET -15 (poke/stanced)

Efek:
- ET lebih kecil → velg lebih keluar (poke), bisa kena fender
- ET lebih besar → velg lebih masuk, bisa kena strut/spring
```

### 3.4 Center Bore Umum

| Center Bore | Mobil |
|-------------|-------|
| 60.1mm | Toyota (Avanza, Yaris, dll) |
| 64.1mm | Honda (Jazz, Brio, HRV, CRV) |
| 66.1mm | Mitsubishi (Xpander, Pajero) |
| 66.5mm | Nissan (X-Trail, Serena) |
| 67.1mm | Mazda, beberapa Suzuki |
| 72.6mm | BMW |
| 66.5mm | Hyundai, Kia |

### 3.5 Material Comparison

| Property | Steel | Alloy (Cast) | Flow Formed | Forged |
|----------|-------|-------------|-------------|--------|
| Berat | Berat | Sedang | Ringan | Sangat Ringan |
| Kekuatan | Biasa | Baik | Sangat Baik | Excellent |
| Harga/pc | 300-800rb | 1-5jt | 3-8jt | 5-20jt |
| Tampilan | Polos | Bervariasi | Bervariasi | Premium |
| Perawatan | Mudah | Perlu hati-hati | Perlu hati-hati | Perlu hati-hati |
| Repair | Mudah dilas | Sulit | Sulit | Sangat Sulit |
| Cocok untuk | Harian, ekonomis | Upgrade estetika | Performance | Track, show |

### 3.6 Brand Velg Populer di Indonesia

| Brand | Asal | Harga Range (per pc) | Tipe |
|-------|------|---------------------|------|
| Enkei | Jepang | 2-10jt | Forged, Flow Formed |
| OZ Racing | Italia | 4-15jt | Alloy, Forged |
| Rays | Jepang | 5-25jt | Forged (Volk, Gram Lights) |
| Work | Jepang | 4-20jt | Forged, 3-piece |
| SSR | Jepang | 3-12jt | Flow Formed, Forged |
| Advan (Yokohama) | Jepang | 3-10jt | Forged |
| Sparco | Italia | 2-8jt | Alloy |
| BBS | Jerman | 5-20jt | Forged |
| HRE | USA | 10-40jt+ | Forged |
| Lenso | Thailand | 1-4jt | Alloy |
| TSW | UK | 2-6jt | Alloy |
| Rotiform | USA | 3-10jt | Forged, Cast |
| Vossen | UAE | 4-15jt | Flow Formed, Forged |
| ART | Indonesia | 1-3jt | Alloy |
| Brabus | Germany | 5-15jt | Alloy |
| Recaro | Jepang | 2-5jt | Alloy |

---

## 4. Data Mobil Indonesia Lengkap

### 4.1 TOYOTA

| Model | Generasi | Tahun | Ban Standar | PCD | CB | ET | Body |
|-------|----------|-------|-------------|-----|-----|-----|------|
| **Avanza** | Gen 1 | 2004-2011 | 175/65 R14 | 4x100 | 60.1 | +40 | MPV |
| **Avanza** | Gen 2 | 2012-2022 | 185/65 R15 | 4x100 | 60.1 | +40 | MPV |
| **Avanza** | Gen 3 (All New) | 2022+ | 185/60 R15 | 4x100 | 60.1 | +40 | MPV |
| **Xenia** | Gen 1 | 2004-2011 | 175/65 R14 | 4x100 | 60.1 | +40 | MPV |
| **Xenia** | Gen 2 | 2012-2022 | 185/65 R15 | 4x100 | 60.1 | +40 | MPV |
| **Xenia** | Gen 3 | 2022+ | 185/60 R15 | 4x100 | 60.1 | +40 | MPV |
| **Innova** | Gen 1 (Reborn) | 2004-2015 | 205/65 R15 | 5x114.3 | 60.1 | +40 | MPV |
| **Innova** | Gen 2 (Venturer) | 2015-2022 | 205/65 R16 | 5x114.3 | 60.1 | +40 | MPV |
| **Innova** | Gen 3 (Zenix) | 2022+ | 215/55 R17 | 5x114.3 | 60.1 | +40 | MPV |
| **Yaris** | XP150 | 2013-2020 | 185/60 R15 | 4x100 | 60.1 | +45 | Hatchback |
| **Yaris** | XP210 | 2020+ | 195/55 R16 | 4x100 | 60.1 | +45 | Hatchback |
| **Yaris Cross** | - | 2023+ | 215/55 R17 | 5x114.3 | 60.1 | +40 | SUV |
| **Raize** | - | 2021+ | 195/60 R16 | 4x100 | 60.1 | +40 | SUV |
| **Rush** | Gen 2 | 2018+ | 215/60 R16 | 5x114.3 | 60.1 | +40 | SUV |
| **CHR** | - | 2017+ | 215/60 R17 | 5x114.3 | 60.1 | +40 | SUV |
| **Fortuner** | Gen 2 | 2015+ | 265/65 R17 | 6x139.7 | 106.1 | +30 | SUV |
| **Calya** | - | 2016+ | 175/65 R14 | 4x100 | 60.1 | +40 | MPV |
| **Agya** | Gen 1 | 2013-2020 | 175/65 R14 | 4x100 | 60.1 | +40 | Hatchback |
| **Agya** | Gen 2 | 2020+ | 175/65 R14 | 4x100 | 60.1 | +40 | Hatchback |
| **Vios** | Gen 3 | 2013-2018 | 185/60 R15 | 4x100 | 60.1 | +45 | Sedan |
| **Camry** | Gen 8 | 2019+ | 235/45 R18 | 5x114.3 | 60.1 | +40 | Sedan |
| **Corolla Cross** | - | 2020+ | 215/60 R17 | 5x114.3 | 60.1 | +40 | SUV |
| **Hilux** | Gen 8 | 2015+ | 265/65 R17 | 6x139.7 | 106.1 | +30 | Pickup |
| **Land Cruiser** | LC300 | 2022+ | 265/55 R20 | 6x139.7 | 106.1 | +40 | SUV |

### 4.2 HONDA

| Model | Generasi | Tahun | Ban Standar | PCD | CB | ET | Body |
|-------|----------|-------|-------------|-----|-----|-----|------|
| **Brio** | Gen 1 | 2013-2018 | 175/65 R14 | 4x100 | 64.1 | +45 | Hatchback |
| **Brio** | Gen 2 (Satya) | 2018+ | 175/65 R14 | 4x100 | 64.1 | +45 | Hatchback |
| **Jazz** | GE | 2008-2014 | 175/65 R15 | 4x100 | 64.1 | +45 | Hatchback |
| **Jazz** | GK | 2014-2020 | 185/55 R16 | 4x100 | 64.1 | +45 | Hatchback |
| **City** | GN2 | 2014-2020 | 185/55 R16 | 4x100 | 64.1 | +45 | Sedan |
| **City** | GN3 (Hatchback) | 2021+ | 185/55 R16 | 4x100 | 64.1 | +45 | Hatchback |
| **HRV** | Gen 1 | 2014-2022 | 215/55 R17 | 5x114.3 | 64.1 | +40 | SUV |
| **HRV** | Gen 2 (RS) | 2022+ | 215/55 R17 | 5x114.3 | 64.1 | +40 | SUV |
| **BRV** | Gen 1 | 2016-2022 | 195/60 R16 | 5x114.3 | 64.1 | +40 | SUV |
| **BRV** | Gen 2 | 2022+ | 215/55 R17 | 5x114.3 | 64.1 | +40 | SUV |
| **CRV** | Gen 5 | 2017+ | 235/60 R18 | 5x114.3 | 64.1 | +40 | SUV |
| **WRV** | - | 2023+ | 215/55 R17 | 5x114.3 | 64.1 | +40 | SUV |
| **Civic** | Gen 11 (FE) | 2022+ | 235/40 R18 | 5x114.3 | 64.1 | +45 | Sedan |
| **Accord** | Gen 11 | 2023+ | 235/45 R18 | 5x114.3 | 64.1 | +45 | Sedan |

### 4.3 SUZUKI

| Model | Generasi | Tahun | Ban Standar | PCD | CB | ET | Body |
|-------|----------|-------|-------------|-----|-----|-----|------|
| **Ertiga** | Gen 1 | 2012-2018 | 185/65 R15 | 4x100 | 60.1 | +40 | MPV |
| **Ertiga** | Gen 2 | 2018+ | 185/65 R15 | 4x100 | 60.1 | +40 | MPV |
| **Swift** | Gen 3 | 2010-2017 | 185/60 R16 | 4x100 | 60.1 | +40 | Hatchback |
| **Swift** | Gen 4 | 2018+ | 185/55 R16 | 4x100 | 60.1 | +40 | Hatchback |
| **Baleno** | New | 2016+ | 185/55 R16 | 4x100 | 60.1 | +40 | Hatchback |
| **Ignis** | - | 2017+ | 175/65 R15 | 4x100 | 60.1 | +40 | Hatchback |
| **SX4 S-Cross** | - | 2016+ | 215/60 R16 | 5x114.3 | 60.1 | +40 | SUV |
| **Jimny** | Gen 4 | 2019+ | 195/80 R15 | 5x139.7 | 108 | +5 | Off-road |
| **XL7** | - | 2020+ | 195/60 R16 | 5x114.3 | 60.1 | +40 | SUV |
| **S-Presso** | - | 2020+ | 165/70 R14 | 4x100 | 60.1 | +40 | Hatchback |

### 4.4 DAIHATSU

| Model | Generasi | Tahun | Ban Standar | PCD | CB | ET | Body |
|-------|----------|-------|-------------|-----|-----|-----|------|
| **Ayla** | Gen 1 | 2013-2020 | 165/65 R14 | 4x100 | 60.1 | +40 | Hatchback |
| **Ayla** | Gen 2 | 2020+ | 175/65 R14 | 4x100 | 60.1 | +40 | Hatchback |
| **Sigra** | - | 2016+ | 175/65 R14 | 4x100 | 60.1 | +40 | MPV |
| **Terios** | Gen 2 | 2017+ | 215/60 R16 | 5x114.3 | 60.1 | +40 | SUV |
| **Rocky** | - | 2021+ | 195/60 R16 | 4x100 | 60.1 | +40 | SUV |
| **Xenia** | (lihat Toyota) | - | - | - | - | - | MPV |

### 4.5 MITSUBISHI

| Model | Generasi | Tahun | Ban Standar | PCD | CB | ET | Body |
|-------|----------|-------|-------------|-----|-----|-----|------|
| **Xpander** | Gen 1 | 2017-2022 | 205/55 R16 | 5x114.3 | 66.1 | +40 | MPV |
| **Xpander** | Gen 2 (Cross) | 2022+ | 205/55 R16 | 5x114.3 | 66.1 | +40 | MPV |
| **Xpander Cross** | - | 2019+ | 205/55 R17 | 5x114.3 | 66.1 | +40 | SUV |
| **Pajero Sport** | Gen 3 | 2016+ | 265/60 R18 | 6x139.7 | 112 | +30 | SUV |
| **Triton** | Gen 5 | 2019+ | 245/70 R16 | 6x139.7 | 112 | +30 | Pickup |
| **Outlander Sport** | - | 2012-2020 | 215/65 R17 | 5x114.3 | 66.1 | +40 | SUV |
| **Eclipse Cross** | - | 2019+ | 225/55 R18 | 5x114.3 | 66.1 | +40 | SUV |
| **L300** | - | 1980+ | 185 R14 LT | 5x114.3 | 66.1 | +40 | Van/Pickup |

### 4.6 NISSAN

| Model | Generasi | Tahun | Ban Standar | PCD | CB | ET | Body |
|-------|----------|-------|-------------|-----|-----|-----|------|
| **Livina** | Gen 2 | 2019+ | 195/60 R16 | 5x114.3 | 66.1 | +40 | MPV |
| **X-Trail** | Gen 3 | 2014-2022 | 225/65 R17 | 5x114.3 | 66.1 | +40 | SUV |
| **Serena** | Gen 4 (C27) | 2018+ | 205/55 R17 | 5x114.3 | 66.5 | +40 | MPV |
| **Kicks** | - | 2020+ | 205/55 R17 | 5x114.3 | 66.1 | +40 | SUV |
| **Terra** | - | 2018+ | 255/60 R18 | 6x139.7 | 100 | +30 | SUV |
| **Magnite** | - | 2021+ | 195/60 R16 | 4x100 | 60.1 | +40 | SUV |

### 4.7 MAZDA

| Model | Generasi | Tahun | Ban Standar | PCD | CB | ET | Body |
|-------|----------|-------|-------------|-----|-----|-----|------|
| **Mazda 2** | DJ | 2015+ | 185/60 R16 | 4x100 | 67.1 | +45 | Hatchback |
| **Mazda 3** | BP | 2019+ | 215/45 R18 | 5x114.3 | 67.1 | +45 | Sedan/HB |
| **CX-3** | DK | 2016+ | 215/60 R16 | 5x114.3 | 67.1 | +40 | SUV |
| **CX-30** | DM | 2020+ | 215/55 R18 | 5x114.3 | 67.1 | +40 | SUV |
| **CX-5** | KF | 2017+ | 225/65 R17 | 5x114.3 | 67.1 | +40 | SUV |
| **CX-8** | - | 2019+ | 225/55 R19 | 5x114.3 | 67.1 | +40 | SUV |

### 4.8 HYUNDAI

| Model | Generasi | Tahun | Ban Standar | PCD | CB | ET | Body |
|-------|----------|-------|-------------|-----|-----|-----|------|
| **Creta** | Gen 2 | 2022+ | 215/60 R17 | 5x114.3 | 67.1 | +40 | SUV |
| **Stargazer** | - | 2022+ | 195/60 R16 | 5x114.3 | 67.1 | +40 | MPV |
| **Tucson** | Gen 4 (NX4) | 2021+ | 235/55 R18 | 5x114.3 | 67.1 | +40 | SUV |
| **Santa Fe** | Gen 4 (TM) | 2019+ | 235/60 R18 | 5x114.3 | 67.1 | +40 | SUV |
| **Ioniq 5** | - | 2022+ | 235/55 R19 | 5x114.3 | 67.1 | +40 | EV SUV |
| **Palisade** | - | 2020+ | 245/50 R20 | 5x114.3 | 67.1 | +40 | SUV |

### 4.9 KIA

| Model | Generasi | Tahun | Ban Standar | PCD | CB | ET | Body |
|-------|----------|-------|-------------|-----|-----|-----|------|
| **Seltos** | - | 2020+ | 215/60 R17 | 5x114.3 | 67.1 | +40 | SUV |
| **Sonet** | - | 2021+ | 195/60 R16 | 5x114.3 | 67.1 | +40 | SUV |
| **Sportage** | Gen 5 (NQ5) | 2022+ | 235/55 R18 | 5x114.3 | 67.1 | +40 | SUV |
| **Carnival** | Gen 4 (KA4) | 2021+ | 235/60 R18 | 5x114.3 | 67.1 | +40 | MPV |

### 4.10 WULING

| Model | Generasi | Tahun | Ban Standar | PCD | CB | ET | Body |
|-------|----------|-------|-------------|-----|-----|-----|------|
| **Confero** | - | 2017+ | 195/60 R15 | 4x100 | 60.1 | +40 | MPV |
| **Cortez** | - | 2018+ | 195/55 R16 | 4x100 | 60.1 | +40 | MPV |
| **Almaz** | - | 2019+ | 215/55 R17 | 5x114.3 | 60.1 | +40 | SUV |
| **Air EV** | - | 2022+ | 165/65 R14 | 4x100 | 60.1 | +40 | EV |
| **Bingo** | - | 2023+ | 185/55 R15 | 4x100 | 60.1 | +40 | EV |

### 4.11 BMW & MERCEDES (Populer di Indonesia)

| Model | Generasi | Tahun | Ban Standar | PCD | CB | ET | Body |
|-------|----------|-------|-------------|-----|-----|-----|------|
| **BMW 3 Series (G20)** | G20 | 2019+ | 225/45 R18 | 5x112 | 66.6 | +30 | Sedan |
| **BMW X1 (F48)** | F48 | 2016+ | 225/50 R18 | 5x112 | 66.6 | +30 | SUV |
| **BMW X3 (G01)** | G01 | 2018+ | 245/50 R19 | 5x112 | 66.6 | +30 | SUV |
| **Mercedes C-Class (W206)** | W206 | 2022+ | 225/45 R18 | 5x112 | 66.6 | +35 | Sedan |
| **Mercedes GLC (X254)** | X254 | 2023+ | 235/55 R19 | 5x112 | 66.6 | +35 | SUV |

---

## 5. Database Ban Lengkap (Populer di Indonesia)

### 5.1 Ban Ukuran 175/65 R14 (Mobil LCGC & City Car)

| Merek | Model | Tipe | Load/Speed | Harga (IDR) | Rating |
|-------|-------|------|------------|-------------|--------|
| Bridgestone | Ecopia EP150 | Eco/Touring | 82T | 350-450rb | ⭐4.3 |
| Dunlop | Enasave EC300+ | Eco | 82T | 350-430rb | ⭐4.2 |
| GT Radial | Champiro Eco | Eco | 82T | 280-350rb | ⭐4.0 |
| Yokohama | BluEarth-A AE50 | Eco | 82T | 380-450rb | ⭐4.1 |
| Accelera | Phi-R | Touring | 82T | 220-300rb | ⭐3.8 |
| Hankook | Kinergy Eco2 | Eco | 82T | 350-420rb | ⭐4.1 |

### 5.2 Ban Ukuran 185/65 R15 (Avanza, Ertiga, dll)

| Merek | Model | Tipe | Load/Speed | Harga (IDR) | Rating |
|-------|-------|------|------------|-------------|--------|
| Bridgestone | Ecopia EP150 | Eco/Touring | 88H | 550-700rb | ⭐4.5 |
| Bridgestone | Turanza T005A | Touring Premium | 88H | 700-850rb | ⭐4.6 |
| Dunlop | Enasave EC300+ | Eco | 88H | 500-650rb | ⭐4.3 |
| Dunlop | SP Sport LM705 | Touring Comfort | 88H | 600-750rb | ⭐4.4 |
| GT Radial | Champiro Eco | Eco | 88H | 380-480rb | ⭐4.0 |
| GT Radial | Champiro HPY | Sport Touring | 88H | 450-580rb | ⭐4.2 |
| Yokohama | BluEarth-GT AE50 | Eco/Touring | 88H | 550-700rb | ⭐4.3 |
| Hankook | Kinergy Eco2 | Eco | 88H | 500-650rb | ⭐4.2 |
| Toyo | Nano Energy 3 | Eco | 88H | 480-600rb | ⭐4.1 |
| Accelera | Phi-R | Touring | 88H | 300-400rb | ⭐3.9 |

### 5.3 Ban Ukuran 195/55 R16 (Yaris, Jazz GK, City)

| Merek | Model | Tipe | Load/Speed | Harga (IDR) | Rating |
|-------|-------|------|------------|-------------|--------|
| Bridgestone | Turanza T005A | Touring | 87V | 800-1000rb | ⭐4.6 |
| Dunlop | SP Sport LM705 | Comfort | 87V | 700-900rb | ⭐4.4 |
| Yokohama | BluEarth-GT AE50 | Touring | 87V | 700-850rb | ⭐4.3 |
| GT Radial | Champiro HPY | Sport Touring | 87V | 550-700rb | ⭐4.2 |
| Michelin | Primacy 4 | Premium Touring | 87V | 950-1200rb | ⭐4.7 |
| Continental | UltraContact UC6 | Touring | 87V | 800-1000rb | ⭐4.4 |

### 5.4 Ban Ukuran 205/55 R16 (Innova, Xpander, Livina)

| Merek | Model | Tipe | Load/Speed | Harga (IDR) | Rating |
|-------|-------|------|------------|-------------|--------|
| Bridgestone | Turanza T005A | Premium Touring | 91V | 900-1100rb | ⭐4.6 |
| Dunlop | SP Sport LM705 | Comfort | 91V | 800-1000rb | ⭐4.4 |
| GT Radial | Champiro HPY | Sport Touring | 91V | 600-750rb | ⭐4.2 |
| Yokohama | BluEarth-GT AE50 | Touring | 91V | 750-950rb | ⭐4.3 |
| Michelin | Primacy 4 | Premium | 91V | 1100-1400rb | ⭐4.7 |
| Continental | PremiumContact 6 | Premium | 91V | 1000-1300rb | ⭐4.5 |
| Hankook | Ventus Prime4 | Touring | 91V | 750-950rb | ⭐4.3 |
| Toyo | Proxes CF2 | Sport Touring | 91V | 700-900rb | ⭐4.2 |

### 5.5 Ban Ukuran 215/55 R17 (HRV, Creta, BRV, dll)

| Merek | Model | Tipe | Load/Speed | Harga (IDR) | Rating |
|-------|-------|------|------------|-------------|--------|
| Bridgestone | Turanza T005A | Premium | 94V | 1000-1300rb | ⭐4.6 |
| Dunlop | SP Sport Maxx 050+ | Sport | 94V | 1000-1250rb | ⭐4.5 |
| Michelin | Primacy 4 | Premium | 94V | 1200-1500rb | ⭐4.7 |
| Continental | PremiumContact 6 | Premium | 94V | 1100-1400rb | ⭐4.5 |
| Yokohama | Advan Sport V107 | Performance | 94W | 1300-1600rb | ⭐4.6 |
| Hankook | Ventus S1 evo3 | Performance | 94V | 1000-1300rb | ⭐4.4 |
| Falken | Azenis FK510 | Sport | 94W | 900-1200rb | ⭐4.4 |

### 5.6 Ban Ukuran 215/60 R17 (Rush, Terios, Creta)

| Merek | Model | Tipe | Load/Speed | Harga (IDR) | Rating |
|-------|-------|------|------------|-------------|--------|
| Bridgestone | Dueler H/L 33 | Highway | 96H | 1100-1400rb | ⭐4.5 |
| Dunlop | Grandtrek PT3 | Touring SUV | 96H | 1000-1300rb | ⭐4.3 |
| GT Radial | Savero HT Plus | Highway | 96H | 700-900rb | ⭐4.0 |
| Yokohama | Geolandar CV G058 | Crossover | 96H | 1100-1400rb | ⭐4.4 |
| Hankook | Dynapro HP2 | Highway | 96H | 900-1150rb | ⭐4.2 |

### 5.7 Ban Ukuran 215/65 R17 (CRV, Innova Zenix)

| Merek | Model | Tipe | Load/Speed | Harga (IDR) | Rating |
|-------|-------|------|------------|-------------|--------|
| Bridgestone | Dueler H/L 33 | Highway | 99H | 1200-1500rb | ⭐4.5 |
| Dunlop | Grandtrek PT3 | Touring | 99H | 1100-1400rb | ⭐4.3 |
| Continental | CrossContact LX Sport | SUV | 99H | 1300-1600rb | ⭐4.5 |
| Michelin | Latitude Sport 3 | Premium SUV | 99H | 1500-1800rb | ⭐4.6 |

### 5.8 Ban Ukuran 265/65 R17 (Fortuner, Pajero, Hilux)

| Merek | Model | Tipe | Load/Speed | Harga (IDR) | Rating |
|-------|-------|------|------------|-------------|--------|
| Bridgestone | Dueler H/T 684II | Highway | 112H | 1500-1900rb | ⭐4.4 |
| Dunlop | Grandtrek AT3 | All-Terrain | 112H | 1400-1700rb | ⭐4.3 |
| GT Radial | Savero A/T Plus | All-Terrain | 112H | 900-1200rb | ⭐4.0 |
| BFGoodrich | All-Terrain T/A KO2 | Off-road | 112R | 1800-2200rb | ⭐4.6 |
| Toyo | Open Country A/T III | All-Terrain | 112H | 1500-1800rb | ⭐4.4 |
| Yokohama | Geolandar A/T G015 | All-Terrain | 112H | 1500-1900rb | ⭐4.5 |

---

## 6. Data Velg Populer (PCD Umum Indonesia)

### 6.1 Velg PCD 4x100 (Avanza, Jazz, Brio, Yaris, Ayla, dll)

| Brand | Model | Ukuran | ET | Material | Harga/pc | Harga Set |
|-------|-------|--------|-----|----------|----------|-----------|
| Enkei | RPF1 | 15x7 | +35 | Forged | 4.5jt | 18jt |
| Enkei | NT03 | 15x7 | +35 | Forged | 5jt | 20jt |
| SSR | Type C | 15x7 | +35 | Flow Formed | 3.5jt | 14jt |
| OZ Racing | Ultraleggera | 15x7 | +37 | Alloy | 4jt | 16jt |
| Sparco | Assetto Gara | 15x7 | +35 | Alloy | 2.5jt | 10jt |
| ART | Berlin | 15x7 | +40 | Alloy | 1.2jt | 4.8jt |
| ART | Monaco | 16x7 | +40 | Alloy | 1.5jt | 6jt |
| Lenso | D1R | 15x7 | +38 | Alloy | 1jt | 4jt |
| TSW | Sebring | 15x7 | +35 | Alloy | 2jt | 8jt |
| Rays | Volk Racing TE37 | 15x8 | +25 | Forged | 8jt | 32jt |

### 6.2 Velg PCD 5x114.3 (Innova, HRV, CRV, Xpander, dll)

| Brand | Model | Ukuran | ET | Material | Harga/pc | Harga Set |
|-------|-------|--------|-----|----------|----------|-----------|
| Enkei | RPF1 | 17x8 | +35 | Forged | 6jt | 24jt |
| Enkei | NT03 | 17x8.5 | +35 | Forged | 6.5jt | 26jt |
| OZ Racing | Ultraleggera | 17x8 | +37 | Alloy | 5.5jt | 22jt |
| SSR | GTX04 | 18x8.5 | +38 | Flow Formed | 5jt | 20jt |
| Work | Emotion CR Kiwami | 18x8.5 | +38 | Alloy | 6jt | 24jt |
| Rays | Volk Racing CE28 | 18x8.5 | +35 | Forged | 10jt | 40jt |
| BBS | LM | 19x8.5 | +35 | Forged | 12jt | 48jt |
| ART | Berlin | 17x8 | +40 | Alloy | 1.5jt | 6jt |
| Lenso | Jager | 17x8 | +38 | Alloy | 1.2jt | 4.8jt |
| Sparco | Terra | 17x8 | +37 | Alloy | 3jt | 12jt |

### 6.3 Velg PCD 5x112 (BMW, Mercedes, VW)

| Brand | Model | Ukuran | ET | Material | Harga/pc | Harga Set |
|-------|-------|--------|-----|----------|----------|-----------|
| BBS | CH-R | 19x8.5 | +35 | Flow Formed | 8jt | 32jt |
| OZ Racing | Superturismo LM | 19x8.5 | +32 | Alloy | 7jt | 28jt |
| HRE | FF01 | 19x8.5 | +35 | Forged | 18jt | 72jt |
| Vossen | HF-2 | 20x9 | +35 | Flow Formed | 8jt | 32jt |
| Enkei | GTC02 | 19x8.5 | +38 | Flow Formed | 6jt | 24jt |

---

## 7. Materi Pembelajaran (Learning Center Content)

### 7.1 Outline Artikel - Ban 101 (Beginner)

#### Artikel 1: "Cara Membaca Ukuran Ban - Panduan Lengkap"
```
Durasi: 8 menit baca
Level: Beginner

Isi:
1. Apa arti angka di samping ban?
2. Penjelasan 185/65 R15 secara visual
3. Cara menghitung diameter luar ban
4. Mengapa ukuran ban penting?
5. Apa yang terjadi jika pakai ukuran salah?
6. Contoh ukuran populer di Indonesia
7. Tips: Cek ukuran di pintu driver atau manual book

Visual: Diagram anatomi ban dengan label
```

#### Artikel 2: "Jenis-Jenis Ban: Touring, Sport, Off-Road"
```
Durasi: 6 menit baca
Level: Beginner

Isi:
1. Ban Touring - Untuk harian, nyaman, awet
2. Ban Sport - Untuk performa, grip tinggi
3. Ban All-Terrain (A/T) - Off-road ringan
4. Ban Off-Road (M/T) - Medan berat
5. Ban Eco - Hemat BBM
6. Ban Runflat - Bisa jalan tanpa angin
7. Mana yang cocok untuk Anda?

Visual: Perbandingan tapak ban per tipe
```

#### Artikel 3: "Merek Ban Populer di Indonesia"
```
Durasi: 10 menit baca
Level: Beginner

Isi:
1. Bridgestone - Premium Jepang, dealer luas
2. Dunlop - Touring bagus, harga menengah
3. GT Radial - Produk Indonesia, value terbaik
4. Yokohama - Sport & eco, teknologi Jepang
5. Michelin - Premium Eropa, awet
6. Continental - Safety focused
7. Hankook - Korea, value premium
8. Falken - Sport budget
9. Accelera - Indonesia, budget friendly
10. Toyo - Jepang, sport & off-road

Tips: Pilih berdasarkan kebutuhan & budget
```

#### Artikel 4: "Kapan Harus Ganti Ban?"
```
Durasi: 5 menit baca
Level: Beginner

Isi:
1. Tanda-TW indicator (1.6mm minimum)
2. Umur ban (maks 5 tahun, ideal 3 tahun)
3. Retak di sidewall
4. Benjolan di ban
5. Ban aus tidak rata
6. Sering kempes
7. Cara cek DOT code (tahun produksi)

Visual: Foto ban yang perlu diganti
```

### 7.2 Outline Artikel - Velg 101 (Beginner)

#### Artikel 5: "Apa itu Velg/Rim? Panduan untuk Pemula"
```
Durasi: 6 menit baca
Level: Beginner

Isi:
1. Bedanya velg dan rim (sama saja)
2. Fungsi velg
3. Jenis: Steel vs Alloy
4. Ukuran velg: diameter x lebar
5. Mengapa velg penting?
6. Velg standar vs aftermarket

Visual: Diagram bagian velg
```

#### Artikel 6: "Memahami PCD (Pitch Circle Diameter)"
```
Durasi: 7 menit baca
Level: Intermediate

Isi:
1. Apa itu PCD?
2. Cara mengukur PCD
3. PCD umum di Indonesia
4. Apa yang terjadi jika PCD salah?
5. PCD adapter (boleh atau tidak?)
6. Mobil Anda PCD berapa? (lookup table)

Visual: Diagram PCD dengan cara ukur
```

#### Artikel 7: "Offset (ET) - Apa dan Mengapa Penting?"
```
Durasi: 8 menit baca
Level: Intermediate

Isi:
1. Apa itu offset?
2. ET positif, negatif, nol
3. Pengaruh offset terhadap tampilan
4. Poke vs Flush vs Tucked
5. Offset aman untuk mobil Anda
6. Clearance: strut, fender, brake caliper
7. Hitung offset aman dengan kalkulator

Visual: Diagram offset side-view
```

### 7.3 Outline Artikel - Advanced

#### Artikel 8: "Menghitung Speedometer Error Setelah Ganti Ban"
```
Durasi: 10 menit baca
Level: Advanced

Rumus:
Speedometer Error = (Diameter Ban Baru - Diameter Standar) / Diameter Standar × 100%

Contoh:
Standar: 185/65 R15 = 621.5mm diameter
Upgrade: 195/55 R16 = 620.9mm diameter
Error = (620.9 - 621.5) / 621.5 × 100% = -0.097%
→ Speedometer menunjuk 0.1% lebih cepat dari aktual
→ Saat speedometer 100 km/h, aktual 99.9 km/h (negligible)

Tabel referensi upgrade umum + error masing-masing
```

#### Artikel 9: "Forged vs Cast vs Flow Formed"
```
Durasi: 8 menit baca
Level: Advanced

Perbandingan detail proses manufacturing, kekuatan, berat, harga
```

#### Artikel 10: "Tire Compound & Tread Design Engineering"
```
Durasi: 12 menit baca
Level: Advanced

Silica vs carbon black, tread pattern engineering, wet grip rating
```

### 7.4 Outline Tips & Practical

#### Artikel 11: "Tips Merawat Ban agar Awet"
#### Artikel 12: "Cara Cek Tekanan Ban yang Benar"
#### Artikel 13: "Rotasi Ban: Kapan dan Bagaimana?"
#### Artikel 14: "Spooring & Balancing: Apa Bedanya?"
#### Artikel 15: "Ban Serep: Full Size vs Temporary"
#### Artikel 16: "Upgrade Ban & Velg: Panduan Aman"
#### Artikel 17: "Budget Upgrade Ban & Velg per Tipe Mobil"
#### Artikel 18: "Ban Musim Hujan: Apa yang Harus Diperhatikan?"

---

## 8. Glossary Lengkap

### 8.1 Istilah Ban

| Istilah | Definisi | Contoh |
|---------|----------|--------|
| **Aspect Ratio** | Rasio tinggi profil terhadap lebar ban (dalam %) | 65 artinya tinggi = 65% dari lebar |
| **Bead** | Bagian ban yang menempel di velg | Terbuat dari kawat baja |
| **Camber** | Sudut kemiringan ban dari vertikal | Negative camber = ban condong ke dalam |
| **Cold Pressure** | Tekanan ban saat dingin (belum jalan) | Ukur sebelum jalan |
| **Contact Patch** | Area ban yang menyentuh jalan | Lebih lebar = grip lebih baik |
| **DOT Code** | Code Department of Transportation (tahun produksi) | DOT XXXX 2523 = minggu 25 tahun 2023 |
| **Groove** | Alur di tapak ban untuk membuang air | Lebih dalam = wet grip lebih baik |
| **Load Index** | Angka yang menunjukkan kapasitas beban maksimal | 88 = 560 kg |
| **Ply** | Lapisan di dalam ban | Nylon, polyester, steel |
| **PSI** | Pounds per Square Inch (satuan tekanan) | 32 PSI standar passenger car |
| **Radial (R)** | Konstruksi ban dengan lapisan menyilang 90° | Standar modern |
| **Rotation** | Memutar posisi ban secara berkala | Setiap 5.000-10.000 km |
| **Runflat** | Ban yang bisa jalan tanpa angin (terbatas) | Biasanya BMW, Mercedes |
| **Sidewall** | Sisi samping ban | Tempat info ukuran |
| **Speed Rating** | Kecepatan maksimal yang aman | H = 210 km/h |
| **Tread** | Bagian tapak ban yang menyentuh jalan | Desain menentukan grip |
| **Tread Depth** | Kedalaman alur tapak | Baru: 7-8mm, minimum: 1.6mm |
| **Treadwear** | Indeks ketahanan aus | 300 = standar, 600 = awet |
| **TWI** | Tread Wear Indicator | Tonjolan di alur = saatnya ganti |

### 8.2 Istilah Velg

| Istilah | Definisi | Contoh |
|---------|----------|--------|
| **Alloy** | Campuran logam (biasanya aluminium) | Lebih ringan dari steel |
| **Bead Seat** | Bagian velg tempat bead ban menempel | Harus presisi |
| **Bolt Pattern / PCD** | Pola lubang baut | 4x100, 5x114.3 |
| **Center Bore (CB)** | Diameter lubang tengah velg | 60.1mm untuk Toyota |
| **Center Cap** | Tutup tengah velg | Estetika + lindung nut |
| **Concave** | Velg cekung ke dalam | Tampilan sport |
| **Dish** | Bagian luar velg yang menonjol | Deep dish = tampilan klasik |
| **ET (Offset)** | Jarak mounting surface ke centerline | ET35 = 35mm |
| **Flow Formed** | Proses casting + spinning untuk ringan | Di antara cast dan forged |
| **Forged** | Proses tempa dari blok aluminium | Paling kuat & ringan |
| **Hub** | Bagian tengah velg | Center bore |
| **Hubcentric** | Velg yang centering pakai center bore | Lebih aman, minim getaran |
| **Hub Ring** | Adapter agar velg jadi hub-centric | Plastik atau aluminium |
| **Lip** | Bagian luar velg | Deep lip = tampilan menarik |
| **Lug Nut** | Mur baut velg | Haruk torsi sesuai spek |
| **One-piece** | Velg satu bagian | Paling umum |
| **Three-piece** | Velg tiga bagian (face, inner, outer) | Kustomisasi tinggi |
| **Two-piece** | Velg dua bagian | Kompromi |
| **Spoke** | Jari-jari velg | 5-spoke, multi-spoke |
| **Weight** | Berat velg | Kg per piece |
| **Width** | Lebar velg dalam inch | 7J = 7 inch |

### 8.3 Istilah Mobil & Fitment

| Istilah | Definisi |
|---------|----------|
| **Fender** | Panel body di atas roda |
| **Fender Roll** | Melipat tepi fender agar ban tidak gesrot |
| **Fender Pull** | Menarik fender ke luar |
| **Flush** | Velg rata dengan fender |
| **Poke** | Velg keluar dari fender |
| **Tucked** | Velg masuk ke dalam fender |
| **Rub** | Ban/velg gesrot body/suspension |
| **Clearance** | Jarak bebas antara ban/velg dengan komponen lain |
| **Coilover** | Suspensi yang bisa diatur tingginya |
| **Camber Kit** | Kit untuk adjust camber |

---

## 9. Kalkulator & Tools (Fitur Aplikasi)

### 9.1 Tire Size Calculator

```
Input:
- Ukuran ban sekarang: 185/65 R15
- Ukuran ban baru: 195/55 R16

Output:
┌──────────────────────────────────────────┐
│ Perbandingan                              │
│                                           │
│ Diameter Standar:  621.5mm               │
│ Diameter Baru:     620.9mm               │
│ Selisih:           -0.6mm (-0.097%)      │
│                                           │
│ Speedometer Error:  negligible            │
│ Clearance Change:   -0.3mm radius         │
│                                           │
│ ✅ Upgrade AMAN                           │
│ Diameter berubah < 3% = acceptable       │
└──────────────────────────────────────────┘
```

### 9.2 Offset Calculator

```
Input:
- Velg sekarang: 15x7 ET40
- Velg baru: 15x7 ET35

Output:
┌──────────────────────────────────────────┐
│ Velg baru akan keluar 5mm lebih dari     │
│ velg standar.                             │
│                                           │
│ Inner clearance berkurang 5mm             │
│ Outer position bertambah 5mm              │
│                                           │
│ ⚠️ Pastikan fender clearance mencukupi    │
│ Test: belok penuh kiri/kanan, cek gesrot │
└──────────────────────────────────────────┘
```

### 9.3 PCD Finder

```
Input: Toyota Avanza Gen 2

Output:
┌──────────────────────────────────────────┐
│ PCD: 4x100                               │
│ Center Bore: 60.1mm                      │
│ Offset Range: +35 to +45                 │
│                                           │
│ Velg cocok:                              │
│ • Semua velg PCD 4x100                   │
│ • Ukuran 14-16 inch recommended          │
│ • Lebar 6-7.5 inch                       │
└──────────────────────────────────────────┘
```

---

## 10. AI Chat - Template Prompts & Responses

### 10.1 Quick Prompt Templates

```json
[
  {
    "id": "q1",
    "label": "Ban terbaik untuk [mobil]",
    "prompt": "Apa ban terbaik untuk Toyota Avanza untuk pemakaian harian?",
    "category": "recommendation"
  },
  {
    "id": "q2",
    "label": "Ukuran ban standar [mobil]",
    "prompt": "Berapa ukuran ban standar Honda Jazz GK?",
    "category": "info"
  },
  {
    "id": "q3",
    "label": "Velg cocok untuk [mobil]",
    "prompt": "Velg apa saja yang cocok untuk Toyota Yaris dengan PCD 4x100?",
    "category": "recommendation"
  },
  {
    "id": "q4",
    "label": "Beda ban [A] dan [B]",
    "prompt": "Apa bedanya Bridgestone Ecopia EP150 dan Dunlop Enasave EC300+?",
    "category": "comparison"
  },
  {
    "id": "q5",
    "label": "Apa itu [istilah]?",
    "prompt": "Apa itu PCD dan mengapa penting saat memilih velg?",
    "category": "education"
  },
  {
    "id": "q6",
    "label": "Budget upgrade ban",
    "prompt": "Saya punya budget 3 juta untuk upgrade ban Avanza, rekomendasi apa?",
    "category": "recommendation"
  },
  {
    "id": "q7",
    "label": "Ban untuk musim hujan",
    "prompt": "Ban apa yang bagus untuk musim hujan di Indonesia?",
    "category": "recommendation"
  },
  {
    "id": "q8",
    "label": "Upgrade velg aman",
    "prompt": "Saya mau upgrade velg Innova Reborn dari 16 ke 17 inch, aman tidak?",
    "category": "safety"
  }
]
```

### 10.2 Expected AI Behaviors

```
AI HARUS:
✅ Menggunakan data katalog saat menjawab
✅ Memberikan rekomendasi spesifik (merek + model + ukuran)
✅ Menjelaskan alasan rekomendasi
✅ Menyebutkan range harga
✅ Memberikan alternatif (budget, mid, premium)
✅ Mengingat mobil user dari garage
✅ Menjelaskan istilah teknis dengan bahasa sederhana
✅ Memberikan safety warning jika ada risiko

AI TIDAK BOLEH:
❌ Memberikan harga pasti (gunakan range)
❌ Merekomendasikan ban bekas
❌ Menyarankan ukuran yang tidak aman (>3% dari standar tanpa warning)
❌ Menjawab pertanyaan di luar ban/velg/mobil
❌ Menggunakan API key user untuk hal lain selain chat
❌ Menyimpan konten chat di luar database user tersebut
```

---

## 11. External Data Sources (Referensi)

| Source | URL | Usage |
|--------|-----|-------|
| TireRack.com | tirerack.com | Spesifikasi ban, review |
| Fitment Industries | fitmentindustries.com | Gallery velg, data fitment |
| 1010tires.com | 1010tires.com | Kalkulator ban |
| Tyre Size Calculator | tyresizecalculator.com | Konversi ukuran |
| Wikipedia | wikipedia.org | Definisi teknis |
| Bridgestone Indonesia | bridgestone.co.id | Harga & produk lokal |
| GT Radial | gtradial.com | Produk Indonesia |
| Official manufacturer sites | Various | Spesifikasi resmi |

---

## 12. Data Validation Rules

### 12.1 Tire Size Validation
```typescript
const TIRE_SIZE_REGEX = /^(\d{3})\/(\d{2})\s*R(\d{2})$/;

// Valid ranges
const VALID_WIDTH = [125, 135, 145, 155, 165, 175, 185, 195, 205, 215, 225, 235, 245, 255, 265, 275, 285, 295, 305, 315, 325];
const VALID_PROFILE = [25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85];
const VALID_RIM = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
```

### 12.2 PCD Validation
```typescript
const PCD_REGEX = /^([456])x(\d{3}(\.\d+)?)$/;

const COMMON_PCD = ['4x100', '4x114.3', '5x100', '5x112', '5x114.3', '5x120', '6x139.7'];
```

### 12.3 Price Validation
```typescript
// Prices in IDR
const TIRE_PRICE_MIN = 150000;    // Rp 150rb (ban kecil LCGC)
const TIRE_PRICE_MAX = 15000000;  // Rp 15jt (ban premium SUV)
const RIM_PRICE_MIN = 500000;     // Rp 500rb (velg steel)
const RIM_PRICE_MAX = 100000000;  // Rp 100jt (velg forged premium)
```

---

## 13. SEO & Content Metadata

### 13.1 Page Titles Template
```
Dashboard: "Dashboard - Catalog Omah Ban"
Katalog Ban: "Katalog Ban [Size] - Harga & Spesifikasi | Omah Ban"
Detail Ban: "[Brand Model] [Size] - Harga, Spesifikasi & Review | Omah Ban"
Katalog Velg: "Katalog Velg [PCD] - Harga & Kompatibilitas | Omah Ban"
Mobil: "Ukuran Ban [Brand Model] [Year] - Standar & Upgrade | Omah Ban"
Learning: "[Article Title] - Belajar Ban & Velg | Omah Ban"
AI Chat: "AI Assistant - Tanya Soal Ban & Velg | Omah Ban"
```

### 13.2 Meta Description Template
```
"Temukan ukuran ban standar [Brand Model], rekomendasi ban terbaik,
harga terbaru, dan panduan lengkap di Catalog Omah Ban."
```

---

**Document Owner:** Content & Engineering Team
**Last Updated:** 2026-07-18
**Status:** Approved - Data Reference for Development
**Version:** 1.0
