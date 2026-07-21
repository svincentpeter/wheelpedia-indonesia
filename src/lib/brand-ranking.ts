export type RankTier = "budget" | "mid" | "premium";

export type BrandRank = {
  brand: string;
  tier: RankTier;
  oneLiner: string;
  bestFor: string;
};

/** Counter language — short, honest, toko style. Separate from Brand marketing cards. */
export const BRAND_RANKS: BrandRank[] = [
  {
    brand: "GT",
    tier: "budget",
    oneLiner: "Paling sering ada di rak, harga masuk akal, cocok harian kota.",
    bestFor: "Customer hemat, ganti 4 ban, jalanan biasa",
  },
  {
    brand: "Accelera",
    tier: "budget",
    oneLiner: "Harga bersaing; cek stok model dulu — beda motif beda rasa.",
    bestFor: "Budget ketat, ukuran umum",
  },
  {
    brand: "Delium",
    tier: "budget",
    oneLiner: "Opsi murah di toko; jelaskan trade-off umur vs harga.",
    bestFor: "Customer cuma mau yang paling murah",
  },
  {
    brand: "Sailun",
    tier: "budget",
    oneLiner: "Value bagus untuk ukuran tertentu; tanya pola pakai dulu.",
    bestFor: "Hemat tapi mau merek yang lebih dikenal",
  },
  {
    brand: "Swallow",
    tier: "budget",
    oneLiner: "Lokal, mudah dicari spare; cocok yang prioritaskan harga.",
    bestFor: "Mobil harian, budget bawah",
  },
  {
    brand: "Achilles",
    tier: "mid",
    oneLiner: "Performa lebih sporty dari budget; sering dipilih muda-mudi.",
    bestFor: "Ingin grip lebih tanpa loncat premium",
  },
  {
    brand: "Dunlop",
    tier: "mid",
    oneLiner: "Seimbang harga-performa; mudah dijelasin ke customer.",
    bestFor: "Upgrade dari ban ori budget, harian + sedikit sport",
  },
  {
    brand: "Hankook",
    tier: "mid",
    oneLiner: "Kesan lebih rapi/quiet di banyak model; harga mid.",
    bestFor: "Customer sensitif noise, city commute",
  },
  {
    brand: "Goodyear",
    tier: "mid",
    oneLiner: "Nama kuat, pilihan mid ke atas; cek stok ukuran dulu.",
    bestFor: "Percaya merek besar, budget menengah",
  },
  {
    brand: "Bridgestone",
    tier: "premium",
    oneLiner: "Paling sering diminta customer yang mau aman & awet.",
    bestFor: "Mobil keluarga, jarak jauh, ganti sepasang/4 ban",
  },
];

export function getRanksByTier(): Record<RankTier, BrandRank[]> {
  return {
    budget: BRAND_RANKS.filter((b) => b.tier === "budget"),
    mid: BRAND_RANKS.filter((b) => b.tier === "mid"),
    premium: BRAND_RANKS.filter((b) => b.tier === "premium"),
  };
}

export function getBrandRank(brand: string): BrandRank | undefined {
  const q = brand.trim().toLowerCase();
  return BRAND_RANKS.find(
    (b) =>
      b.brand.toLowerCase() === q ||
      (q === "gt radial" && b.brand === "GT") ||
      (q === "gajah tunggal" && b.brand === "GT") ||
      (q === "acellera" && b.brand === "Accelera"),
  );
}
