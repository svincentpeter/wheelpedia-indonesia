// Glossary - Complete dictionary of tire & wheel terms

export interface GlossaryTerm {
  id: string;
  term: string;
  category: "Ban" | "Velg" | "Fitment" | "Umum";
  definition: string;
  example?: string;
  relatedTerms?: string[];
}

export const GLOSSARY: GlossaryTerm[] = [
  // BAN
  { id: "aspect-ratio", term: "Aspect Ratio", category: "Ban", definition: "Rasio tinggi profil ban terhadap lebarnya, dalam persen. Contoh: 65 artinya tinggi profil = 65% dari lebar ban.", example: "185/65 R15 → tinggi = 185 × 0.65 = 120.25mm" },
  { id: "bead", term: "Bead", category: "Ban", definition: "Bagian ban yang menempel pada velg. Terbuat dari kawat baja yang dilapisi karet.", relatedTerms: ["Rim", "Sidewall"] },
  { id: "bias", term: "Bias Ply", category: "Ban", definition: "Konstruksi ban dengan lapisan kain yang saling menyilang. Umumnya untuk kendaraan berat.", relatedTerms: ["Radial"] },
  { id: "cold-pressure", term: "Cold Pressure", category: "Ban", definition: "Tekanan ban saat dingin (belum dipakai). Selalu ukur tekanan ban sebelum berkendara.", example: "Standar: 30-35 PSI untuk mobil penumpang" },
  { id: "contact-patch", term: "Contact Patch", category: "Ban", definition: "Area ban yang menyentuh permukaan jalan. Lebih lebar = grip lebih baik, tapi lebih banyak gesekan.", relatedTerms: ["Tread", "Traction"] },
  { id: "dot", term: "DOT Code", category: "Ban", definition: "Kode Department of Transportation yang menunjukkan tahun dan minggu produksi ban.", example: "DOT XXXX 2523 = minggu ke-25 tahun 2023" },
  { id: "groove", term: "Groove", category: "Ban", definition: "Alur di tapak ban yang berfungsi membuang air. Lebih dalam = wet grip lebih baik.", relatedTerms: ["Tread", "Tread Depth"] },
  { id: "load-index", term: "Load Index", category: "Ban", definition: "Angka yang menunjukkan kapasitas beban maksimal ban. Tertulis di sidewall.", example: "88 = 560 kg per ban", relatedTerms: ["Speed Rating"] },
  { id: "ply", term: "Ply", category: "Ban", definition: "Lapisan di dalam ban yang memberikan kekuatan struktural. Bisa dari nylon, polyester, atau steel.", relatedTerms: ["Radial", "Bias"] },
  { id: "psi", term: "PSI", category: "Ban", definition: "Pounds per Square Inch. Satuan tekanan ban yang paling umum digunakan.", example: "32 PSI = tekanan standar mobil penumpang" },
  { id: "radial", term: "Radial (R)", category: "Ban", definition: "Konstruksi ban modern dengan lapisan kawat baja menyilang 90°. Lebih awet dan nyaman.", relatedTerms: ["Bias Ply"] },
  { id: "rotation", term: "Tire Rotation", category: "Ban", definition: "Memutar posisi ban secara berkala untuk memastikan keausan merata.", example: "Setiap 5.000 - 10.000 km" },
  { id: "runflat", term: "Runflat", category: "Ban", definition: "Ban yang bisa tetap dipakai meskipun kempes. Biasanya untuk mobil premium.", example: "BMW, Mercedes umumnya pakai runflat" },
  { id: "sidewall", term: "Sidewall", category: "Ban", definition: "Sisi samping ban. Tempat tertera informasi ukuran, merek, dan spesifikasi ban.", relatedTerms: ["Aspect Ratio"] },
  { id: "speed-rating", term: "Speed Rating", category: "Ban", definition: "Huruf yang menunjukkan kecepatan maksimal ban. Tertulis setelah load index.", example: "H = 210 km/h, V = 240 km/h, W = 270 km/h" },
  { id: "tread", term: "Tread", category: "Ban", definition: "Bagian tapak ban yang menyentuh jalan. Desain tread menentukan grip, noise, dan wet performance.", relatedTerms: ["Tread Depth", "Groove"] },
  { id: "tread-depth", term: "Tread Depth", category: "Ban", definition: "Kedalaman alur tapak ban. Baru: 7-8mm, minimum legal: 1.6mm.", relatedTerms: ["TWI", "Tread"] },
  { id: "treadwear", term: "Treadwear Rating (UTQG)", category: "Ban", definition: "Indeks ketahanan aus ban. Semakin tinggi semakin awet. 300 = standar.", example: "300 = standar, 600 = 2x lebih awet dari standar" },
  { id: "traction", term: "Traction Rating (UTQG)", category: "Ban", definition: "Rating kemampuan ban berhenti di jalan basah. AA = tertinggi, C = terendah.", relatedTerms: ["Treadwear", "Temperature"] },
  { id: "temperature", term: "Temperature Rating (UTQG)", category: "Ban", definition: "Rating ketahanan panas ban. A = tertinggi, C = terendah.", relatedTerms: ["Treadwear", "Traction"] },
  { id: "twi", term: "TWI (Tread Wear Indicator)", category: "Ban", definition: "Tonjolan kecil di alur ban yang menunjukkan batas keausan minimum. Saat tread sejajar TWI = saatnya ganti ban.", relatedTerms: ["Tread Depth"] },
  { id: "tubeless", term: "Tubeless", category: "Ban", definition: "Ban tanpa ban dalam. Standar mobil modern. Lebih aman saat kempes karena angin keluar perlahan.", relatedTerms: ["Tube Type"] },
  { id: "all-season", term: "All Season", category: "Ban", definition: "Ban yang dirancang untuk semua musim. Kompromi antara summer dan winter tire.", relatedTerms: ["Winter", "Summer"] },
  { id: "at", term: "All-Terrain (A/T)", category: "Ban", definition: "Ban untuk jalan on-road dan off-road ringan. Tapak lebih agresif dari highway tire.", relatedTerms: ["M/T", "H/T"] },
  { id: "mt", term: "Mud-Terrain (M/T)", category: "Ban", definition: "Ban untuk off-road berat. Tapak sangat agresif, noise tinggi di jalan aspal.", relatedTerms: ["A/T", "H/T"] },
  { id: "ht", term: "Highway-Terrain (H/T)", category: "Ban", definition: "Ban untuk SUV/pickup yang mostly di jalan raya. Lebih nyaman dari A/T.", relatedTerms: ["A/T", "M/T"] },
  { id: "semi-slick", term: "Semi Slick", category: "Ban", definition: "Ban performa tinggi dengan minimal groove. Grip kering sangat baik, grip basah buruk.", relatedTerms: ["Slick", "Sport"] },
  // VELG
  { id: "alloy", term: "Alloy Wheel", category: "Velg", definition: "Velg dari campuran aluminium. Lebih ringan dari steel, tampilan lebih baik.", relatedTerms: ["Steel", "Forged"] },
  { id: "backspacing", term: "Backspacing", category: "Velg", definition: "Jarak dari mounting surface ke tepi inner velg. Lebih besar = velg lebih masuk.", relatedTerms: ["Offset"] },
  { id: "bolt-pattern", term: "Bolt Pattern / PCD", category: "Velg", definition: "Pol<a lobang baut velg. Format: jumlah_baut x diameter_lingkaran (mm).", example: "5x114.3 = 5 lobang, diameter lingkaran 114.3mm", relatedTerms: ["PCD"] },
  { id: "cast", term: "Cast Wheel", category: "Velg", definition: "Velg dari proses cor aluminium. Paling umum dan terjangkau.", relatedTerms: ["Forged", "Flow Formed"] },
  { id: "cb", term: "Center Bore (CB)", category: "Velg", definition: "Diameter lubang tengah velg. Harus sesuai dengan mobil.", example: "Toyota: 60.1mm, Honda: 64.1mm", relatedTerms: ["Hub Ring"] },
  { id: "center-cap", term: "Center Cap", category: "Velg", definition: "Tutup tengah velg yang menutupi hub. Berfungsi estetika dan melindungi nut.", relatedTerms: ["Center Bore"] },
  { id: "concave", term: "Concave", category: "Velg", definition: "Desain velg yang cekung ke dalam. Tampilan lebih agresif dan sporty.", relatedTerms: ["Lip", "Dish"] },
  { id: "dish", term: "Dish", category: "Velg", definition: "Bagian luar velg yang menonjol. Deep dish = tampilan klasik/agresif.", relatedTerms: ["Lip", "Concave"] },
  { id: "et", term: "ET / Offset", category: "Velg", definition: "Jarak (mm) dari mounting surface ke centerline velg. ET+ = lebih masuk, ET- = lebih keluar.", example: "ET35 = mounting surface 35mm dari centerline", relatedTerms: ["Backspacing", "Poke"] },
  { id: "flow-formed", term: "Flow Formed", category: "Velg", definition: "Proses casting + spinning untuk menghasilkan velg lebih ringan dari cast, lebih murah dari forged.", relatedTerms: ["Cast", "Forged"] },
  { id: "forged", term: "Forged Wheel", category: "Velg", definition: "Velg dari proses tempa aluminium. Paling kuat dan ringan, harga paling tinggi.", relatedTerms: ["Cast", "Flow Formed"] },
  { id: "hub-ring", term: "Hub Ring / Hub Centric Ring", category: "Velg", definition: "Adapter plastik/aluminium agar velg centering di hub mobil. Mengurangi getaran.", relatedTerms: ["Center Bore", "Hub Centric"] },
  { id: "hub-centric", term: "Hub Centric", category: "Velg", definition: "Velg yang centering menggunakan center bore (bukan baut). Lebih aman, minim getaran.", relatedTerms: ["Lug Centric", "Center Bore"] },
  { id: "lip", term: "Lip", category: "Velg", definition: "Bagian terluar velg. Deep lip = tampilan menarik, sering di velg JDM.", relatedTerms: ["Dish", "Concave"] },
  { id: "lug-nut", term: "Lug Nut", category: "Velg", definition: "Mur baut yang mengikat velg ke mobil. Harus dikencangkan dengan torsi yang benar.", relatedTerms: ["Bolt Pattern"] },
  { id: "one-piece", term: "One-Piece Wheel", category: "Velg", definition: "Velg satu bagian. Paling umum, paling terjangkau.", relatedTerms: ["Two-Piece", "Three-Piece"] },
  { id: "pcd", term: "PCD (Pitch Circle Diameter)", category: "Velg", definition: "Diameter lingkaran imajiner yang melewati semua lobang baut. Format: jumlah_baut x diameter_mm.", example: "4x100, 5x114.3, 6x139.7", relatedTerms: ["Bolt Pattern"] },
  { id: "poke", term: "Poke", category: "Velg", definition: "Kondisi velg keluar dari fender. Biasanya karena offset terlalu kecil.", relatedTerms: ["Flush", "ET"] },
  { id: "flush", term: "Flush", category: "Velg", definition: "Kondisi velg rata dengan fender. Tampilan ideal untuk stance.", relatedTerms: ["Poke", "Tucked"] },
  { id: "spoke", term: "Spoke", category: "Velg", definition: "Jari-jari velg yang menghubungkan center ke outer rim. Jumlah spoke mempengaruhi tampilan dan kekuatan.", example: "5-spoke, multi-spoke, mesh" },
  { id: "three-piece", term: "Three-Piece Wheel", category: "Velg", definition: "Velg tiga bagian: face, inner barrel, outer barrel. Kustomisasi tinggi, harga sangat mahal.", relatedTerms: ["One-Piece", "Two-Piece"] },
  { id: "weight", term: "Wheel Weight", category: "Velg", definition: "Berat velg dalam kg. Lebih ringan = akselerasi lebih baik, handling lebih responsif.", example: "Forged: 5-7kg, Cast: 8-12kg" },
  { id: "width", term: "Wheel Width", category: "Velg", definition: "Lebar velg dalam inch. Menentukan lebar ban yang cocok.", example: "7J = lebar 7 inch", relatedTerms: ["Diameter"] },
  // FITMENT
  { id: "camber", term: "Camber", category: "Fitment", definition: "Sudut kemiringan ban dari vertikal saat dilihat dari depan. Negative camber = ban condong ke dalam.", relatedTerms: ["Caster", "Toe"] },
  { id: "caster", term: "Caster", category: "Fitment", definition: "Sudut steering axis dari vertikal saat dilihat dari samping. Mempengaruhi stabilitas lurus.", relatedTerms: ["Camber", "Toe"] },
  { id: "clearance", term: "Clearance", category: "Fitment", definition: "Jarak bebas antara ban/velg dengan komponen lain (fender, strut, brake caliper).", relatedTerms: ["Rub", "Fender"] },
  { id: "fender-roll", term: "Fender Roll", category: "Fitment", definition: "Melipat tepi fender ke dalam agar ban tidak gesrot saat suspensi compress.", relatedTerms: ["Fender Pull", "Rub"] },
  { id: "flush-fitment", term: "Flush Fitment", category: "Fitment", definition: "Setup di mana velg tepat rata dengan fender. Tampilan clean tanpa poke atau tuck.", relatedTerms: ["Poke", "Stance"] },
  { id: "rub", term: "Rub / Fender Rub", category: "Fitment", definition: "Kondisi ban menggesrot fender atau komponen lain. Harus dihindari.", relatedTerms: ["Clearance", "Fender Roll"] },
  { id: "spacers", term: "Wheel Spacers", category: "Fitment", definition: "Piringan yang dipasang antara velg dan hub untuk mendorong velg keluar. Gunakan dengan hati-hati.", relatedTerms: ["ET", "Poke"] },
  { id: "stance", term: "Stance", category: "Fitment", definition: "Gaya modifikasi yang fokus pada fitment velg dan tinggi mobil. Flush, poke, atau tucked.", relatedTerms: ["Flush", "Poke", "Camber"] },
  { id: "toe", term: "Toe", category: "Fitment", definition: "Sudut ban dari atas saat dilihat dari belakang. Toe-in = ujung depan lebih dekat, toe-out = sebaliknya.", relatedTerms: ["Camber", "Caster"] },
  { id: "plus-sizing", term: "Plus Sizing", category: "Fitment", definition: "Upgrade velg ke diameter lebih besar dengan ban profil lebih rendah, menjaga diameter luar tetap sama.", example: "Plus 1: 15→16 inch, Plus 2: 15→17 inch", relatedTerms: ["Overall Diameter"] },
  // UMUM
  { id: "overall-diameter", term: "Overall Diameter (OD)", category: "Umum", definition: "Diameter total ban dari satu sisi ke sisi lain. Harus sama saat ganti ukuran.", relatedTerms: ["Plus Sizing"] },
  { id: "rolling-circumference", term: "Rolling Circumference", category: "Umum", definition: "Keliling ban saat berputar di jalan. Mempengaruhi speedometer dan odometer.", relatedTerms: ["Overall Diameter"] },
  { id: "speedometer-error", term: "Speedometer Error", category: "Umum", definition: "Selisih antara kecepatan yang ditunjukkan speedometer dengan kecepatan aktual. Terjadi saat ganti ukuran ban.", relatedTerms: ["Overall Diameter"] },
  { id: "oem", term: "OEM (Original Equipment Manufacturer)", category: "Umum", definition: "Ban/velg standar yang dipasang dari pabrik. Spesifikasi yang direkomendasikan.", relatedTerms: ["Aftermarket"] },
  { id: "aftermarket", term: "Aftermarket", category: "Umum", definition: "Ban/velg bukan dari pabrik. Dipasang oleh pemilik sebagai upgrade atau pengganti.", relatedTerms: ["OEM"] },
];

export function searchGlossary(query: string) {
  const q = query.toLowerCase();
  return GLOSSARY.filter(
    (g) =>
      g.term.toLowerCase().includes(q) ||
      g.definition.toLowerCase().includes(q) ||
      g.category.toLowerCase().includes(q)
  );
}

export function getGlossaryByCategory(category: string) {
  return GLOSSARY.filter((g) => g.category === category);
}
