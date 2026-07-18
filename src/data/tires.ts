// Tire Database - Popular sizes in Indonesia

export interface TireSize {
  id: string;
  size: string;
  width: number;
  profile: number;
  rim: number;
  overallDiameter: number; // mm
  sidewallHeight: number; // mm
  circumference: number; // mm
  commonVehicles: string[];
  plusOne: string;
  plusTwo: string;
  minusOne: string;
}

export interface TireProduct {
  id: string;
  brand: string;
  model: string;
  size: string;
  type: string;
  loadIndex: number;
  speedRating: string;
  priceMin: number;
  priceMax: number;
  rating: number;
  reviewCount: number;
  description: string;
}

export const TIRE_SIZES: TireSize[] = [
  {
    id: "175-65-r14",
    size: "175/65 R14",
    width: 175,
    profile: 65,
    rim: 14,
    overallDiameter: 583.1,
    sidewallHeight: 113.75,
    circumference: 1831.9,
    commonVehicles: ["Agya", "Ayla", "Brio", "Calya", "Sigra"],
    plusOne: "185/55 R15",
    plusTwo: "195/45 R16",
    minusOne: "165/70 R13",
  },
  {
    id: "185-65-r15",
    size: "185/65 R15",
    width: 185,
    profile: 65,
    rim: 15,
    overallDiameter: 621.5,
    sidewallHeight: 120.25,
    circumference: 1952.5,
    commonVehicles: ["Avanza Gen 2", "Ertiga", "Xenia Gen 2"],
    plusOne: "195/55 R16",
    plusTwo: "205/45 R17",
    minusOne: "175/70 R14",
  },
  {
    id: "185-60-r15",
    size: "185/60 R15",
    width: 185,
    profile: 60,
    rim: 15,
    overallDiameter: 603.0,
    sidewallHeight: 111.0,
    circumference: 1894.4,
    commonVehicles: ["Avanza Gen 3", "Yaris XP150"],
    plusOne: "195/50 R16",
    plusTwo: "205/40 R17",
    minusOne: "175/65 R14",
  },
  {
    id: "185-55-r16",
    size: "185/55 R16",
    width: 185,
    profile: 55,
    rim: 16,
    overallDiameter: 610.1,
    sidewallHeight: 101.75,
    circumference: 1916.8,
    commonVehicles: ["Jazz GK", "City Hatchback", "Swift"],
    plusOne: "195/45 R17",
    plusTwo: "205/35 R18",
    minusOne: "185/60 R15",
  },
  {
    id: "195-60-r16",
    size: "195/60 R16",
    width: 195,
    profile: 60,
    rim: 16,
    overallDiameter: 640.0,
    sidewallHeight: 117.0,
    circumference: 2010.6,
    commonVehicles: ["Raize", "Rocky", "Livina", "Stargazer", "XL7"],
    plusOne: "205/50 R17",
    plusTwo: "215/40 R18",
    minusOne: "185/65 R15",
  },
  {
    id: "195-55-r16",
    size: "195/55 R16",
    width: 195,
    profile: 55,
    rim: 16,
    overallDiameter: 620.9,
    sidewallHeight: 107.25,
    circumference: 1950.6,
    commonVehicles: ["Yaris XP210"],
    plusOne: "205/45 R17",
    plusTwo: "215/35 R18",
    minusOne: "185/60 R15",
  },
  {
    id: "205-55-r16",
    size: "205/55 R16",
    width: 205,
    profile: 55,
    rim: 16,
    overallDiameter: 631.9,
    sidewallHeight: 112.75,
    circumference: 1985.2,
    commonVehicles: ["Xpander", "Livina"],
    plusOne: "215/45 R17",
    plusTwo: "225/35 R18",
    minusOne: "195/60 R15",
  },
  {
    id: "205-65-r16",
    size: "205/65 R16",
    width: 205,
    profile: 65,
    rim: 16,
    overallDiameter: 673.5,
    sidewallHeight: 133.25,
    circumference: 2116.0,
    commonVehicles: ["Innova Gen 2"],
    plusOne: "215/55 R17",
    plusTwo: "225/45 R18",
    minusOne: "195/70 R15",
  },
  {
    id: "215-55-r17",
    size: "215/55 R17",
    width: 215,
    profile: 55,
    rim: 17,
    overallDiameter: 668.5,
    sidewallHeight: 118.25,
    circumference: 2100.2,
    commonVehicles: ["Innova Zenix", "HR-V", "Creta", "Almaz", "Stargazer", "Xpander Cross"],
    plusOne: "225/45 R18",
    plusTwo: "235/35 R19",
    minusOne: "205/60 R16",
  },
  {
    id: "215-60-r17",
    size: "215/60 R17",
    width: 215,
    profile: 60,
    rim: 17,
    overallDiameter: 689.4,
    sidewallHeight: 129.0,
    circumference: 2166.0,
    commonVehicles: ["Rush", "Terios", "C-HR"],
    plusOne: "225/50 R18",
    plusTwo: "235/40 R19",
    minusOne: "205/65 R16",
  },
  {
    id: "225-45-r18",
    size: "225/45 R18",
    width: 225,
    profile: 45,
    rim: 18,
    overallDiameter: 685.3,
    sidewallHeight: 101.25,
    circumference: 2153.0,
    commonVehicles: ["BMW 320i", "HR-V Gen 2"],
    plusOne: "225/35 R19",
    plusTwo: "235/30 R20",
    minusOne: "215/50 R17",
  },
  {
    id: "235-60-r18",
    size: "235/60 R18",
    width: 235,
    profile: 60,
    rim: 18,
    overallDiameter: 739.0,
    sidewallHeight: 141.0,
    circumference: 2321.7,
    commonVehicles: ["CR-V", "Tucson"],
    plusOne: "245/50 R19",
    plusTwo: "255/40 R20",
    minusOne: "225/65 R17",
  },
  {
    id: "265-65-r17",
    size: "265/65 R17",
    width: 265,
    profile: 65,
    rim: 17,
    overallDiameter: 776.1,
    sidewallHeight: 172.25,
    circumference: 2438.3,
    commonVehicles: ["Fortuner", "Pajero Sport"],
    plusOne: "265/60 R18",
    plusTwo: "275/50 R19",
    minusOne: "255/70 R16",
  },
];

export const TIRE_PRODUCTS: TireProduct[] = [
  // 175/65 R14
  { id: "ep150-175", brand: "Bridgestone", model: "Ecopia EP150", size: "175/65 R14", type: "Eco", loadIndex: 82, speedRating: "T", priceMin: 350000, priceMax: 450000, rating: 4.3, reviewCount: 150, description: "Ban eco untuk LCGC" },
  { id: "enasave-175", brand: "Dunlop", model: "Enasave EC300+", size: "175/65 R14", type: "Eco", loadIndex: 82, speedRating: "T", priceMin: 350000, priceMax: 430000, rating: 4.2, reviewCount: 120, description: "Ban eco hemat BBM" },
  { id: "gteco-175", brand: "GT Radial", model: "Champiro Eco", size: "175/65 R14", type: "Eco", loadIndex: 82, speedRating: "T", priceMin: 280000, priceMax: 350000, rating: 4.0, reviewCount: 200, description: "Produk Indonesia, value terbaik" },
  { id: "blu-a-175", brand: "Yokohama", model: "BluEarth-A AE50", size: "175/65 R14", type: "Eco", loadIndex: 82, speedRating: "T", priceMin: 380000, priceMax: 450000, rating: 4.1, reviewCount: 90, description: "Teknologi BluEarth dari Yokohama" },
  // 185/65 R15
  { id: "ep150-185", brand: "Bridgestone", model: "Ecopia EP150", size: "185/65 R15", type: "Eco", loadIndex: 88, speedRating: "H", priceMin: 550000, priceMax: 700000, rating: 4.5, reviewCount: 200, description: "Ban eco populer untuk Avanza" },
  { id: "t005-185", brand: "Bridgestone", model: "Turanza T005A", size: "185/65 R15", type: "Touring", loadIndex: 88, speedRating: "H", priceMin: 700000, priceMax: 850000, rating: 4.6, reviewCount: 150, description: "Premium touring, lebih nyaman" },
  { id: "enasave-185", brand: "Dunlop", model: "Enasave EC300+", size: "185/65 R15", type: "Eco", loadIndex: 88, speedRating: "H", priceMin: 500000, priceMax: 650000, rating: 4.3, reviewCount: 180, description: "Ban eco Dunlop" },
  { id: "lm705-185", brand: "Dunlop", model: "SP Sport LM705", size: "185/65 R15", type: "Touring", loadIndex: 88, speedRating: "H", priceMin: 600000, priceMax: 750000, rating: 4.4, reviewCount: 160, description: "Comfort touring" },
  { id: "gteco-185", brand: "GT Radial", model: "Champiro Eco", size: "185/65 R15", type: "Eco", loadIndex: 88, speedRating: "H", priceMin: 380000, priceMax: 480000, rating: 4.0, reviewCount: 250, description: "Value terbaik" },
  { id: "gthpy-185", brand: "GT Radial", model: "Champiro HPY", size: "185/65 R15", type: "Sport", loadIndex: 88, speedRating: "H", priceMin: 450000, priceMax: 580000, rating: 4.2, reviewCount: 180, description: "Sport touring dari GT Radial" },
  // 205/55 R16
  { id: "t005-205", brand: "Bridgestone", model: "Turanza T005A", size: "205/55 R16", type: "Touring", loadIndex: 91, speedRating: "V", priceMin: 900000, priceMax: 1100000, rating: 4.6, reviewCount: 180, description: "Premium touring untuk Xpander" },
  { id: "lm705-205", brand: "Dunlop", model: "SP Sport LM705", size: "205/55 R16", type: "Touring", loadIndex: 91, speedRating: "V", priceMin: 800000, priceMax: 1000000, rating: 4.4, reviewCount: 150, description: "Comfort touring" },
  { id: "gthpy-205", brand: "GT Radial", model: "Champiro HPY", size: "205/55 R16", type: "Sport", loadIndex: 91, speedRating: "V", priceMin: 600000, priceMax: 750000, rating: 4.2, reviewCount: 200, description: "Sport touring Indonesia" },
  { id: "primacy4-205", brand: "Michelin", model: "Primacy 4", size: "205/55 R16", type: "Premium", loadIndex: 91, speedRating: "V", priceMin: 1100000, priceMax: 1400000, rating: 4.7, reviewCount: 120, description: "Premium dari Michelin" },
  // 215/55 R17
  { id: "t005-215", brand: "Bridgestone", model: "Turanza T005A", size: "215/55 R17", type: "Touring", loadIndex: 94, speedRating: "V", priceMin: 1000000, priceMax: 1300000, rating: 4.6, reviewCount: 160, description: "Premium untuk HR-V, Creta" },
  { id: "spmaxx-215", brand: "Dunlop", model: "SP Sport Maxx 050+", size: "215/55 R17", type: "Sport", loadIndex: 94, speedRating: "V", priceMin: 1000000, priceMax: 1250000, rating: 4.5, reviewCount: 130, description: "Sport performance" },
  { id: "primacy4-215", brand: "Michelin", model: "Primacy 4", size: "215/55 R17", type: "Premium", loadIndex: 94, speedRating: "V", priceMin: 1200000, priceMax: 1500000, rating: 4.7, reviewCount: 100, description: "Premium Michelin" },
  { id: "fk510-215", brand: "Falken", model: "Azenis FK510", size: "215/55 R17", type: "Sport", loadIndex: 94, speedRating: "W", priceMin: 900000, priceMax: 1200000, rating: 4.4, reviewCount: 90, description: "Sport dari Falken" },
  // 265/65 R17
  { id: "dueler-265", brand: "Bridgestone", model: "Dueler H/T 684II", size: "265/65 R17", type: "Highway", loadIndex: 112, speedRating: "H", priceMin: 1500000, priceMax: 1900000, rating: 4.4, reviewCount: 80, description: "Highway untuk SUV besar" },
  { id: "at3-265", brand: "Dunlop", model: "Grandtrek AT3", size: "265/65 R17", type: "All-Terrain", loadIndex: 112, speedRating: "H", priceMin: 1400000, priceMax: 1700000, rating: 4.3, reviewCount: 70, description: "All-Terrain untuk Fortuner" },
  { id: "ko2-265", brand: "BFGoodrich", model: "All-Terrain T/A KO2", size: "265/65 R17", type: "Off-Road", loadIndex: 112, speedRating: "R", priceMin: 1800000, priceMax: 2200000, rating: 4.6, reviewCount: 60, description: "Off-road legendaris" },
];

export function getTiresBySize(size: string) {
  return TIRE_PRODUCTS.filter((t) => t.size === size);
}

export function getTireSizeInfo(size: string) {
  return TIRE_SIZES.find((t) => t.size === size);
}

export function searchTires(query: string) {
  const q = query.toLowerCase();
  return TIRE_PRODUCTS.filter(
    (t) =>
      t.brand.toLowerCase().includes(q) ||
      t.model.toLowerCase().includes(q) ||
      t.size.toLowerCase().includes(q) ||
      t.type.toLowerCase().includes(q)
  );
}
