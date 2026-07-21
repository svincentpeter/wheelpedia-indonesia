import { normalizeTireSize, type ShopStockItem } from "@/lib/shop-stock";

/** Raw row from ProjectOmahBan GET /api/products (fields may be partial). */
export type PosProductRaw = {
  id?: number | string;
  product_code?: string | null;
  product_name?: string | null;
  product_quantity?: number | null;
  product_price?: number | null;
  product_cost?: number | null;
  brand_id?: number | null;
  brand?: { id?: number; name?: string } | null;
  brand_name?: string | null;
  product_size?: string | null;
  ring?: number | string | null;
  product_year?: number | string | null;
  is_active?: boolean | null;
  [key: string]: unknown;
};

const BRAND_ID_MAP: Record<number, string> = {
  1: "Achilles",
  2: "Bridgestone",
  3: "GT",
  4: "Swallow",
  5: "Aeolus",
  6: "Delli",
  7: "Sliwer",
  8: "Dunlop",
  9: "Accelera",
  10: "Forceum",
  11: "Hankook",
  12: "Delium",
  13: "Goodyear",
  14: "Sailun",
  15: "Heida",
  16: "Falken",
  17: "Pirelli",
  18: "Yokohama",
  19: "Uniroyal",
  20: "BF Goodrich",
  21: "Continental",
  22: "Federal",
};

const SIZE_RATIO = /(\d{3})\s*\/\s*(\d{2})/;
const SIZE_COMMERCIAL = /\b(\d{2,3})\s*R\s*(\d{2})\b/i;
const RIM_ONLY = /\bR\s*(\d{2})\b/i;

export function resolveBrandName(raw: PosProductRaw): string {
  if (raw.brand?.name) return String(raw.brand.name);
  if (raw.brand_name) return String(raw.brand_name);
  if (raw.brand_id != null && BRAND_ID_MAP[Number(raw.brand_id)]) {
    return BRAND_ID_MAP[Number(raw.brand_id)];
  }
  const name = String(raw.product_name ?? "");
  const lower = name.toLowerCase();
  for (const b of Object.values(BRAND_ID_MAP)) {
    if (lower.startsWith(b.toLowerCase()) || lower.startsWith(b.slice(0, 3).toLowerCase() + " ")) {
      return b;
    }
  }
  if (lower.startsWith("bs ")) return "Bridgestone";
  if (lower.startsWith("gt ")) return "GT";
  return "Unknown";
}

export function parseSizeAndRim(
  raw: PosProductRaw,
): { sizeRaw: string; rim: number } {
  if (raw.product_size != null && String(raw.product_size).trim()) {
    const sizeRaw = String(raw.product_size).trim();
    let rim = 0;
    if (raw.ring != null && raw.ring !== "") {
      const n = Number(raw.ring);
      if (!Number.isNaN(n)) rim = n;
    }
    if (!rim) {
      const m = RIM_ONLY.exec(String(raw.product_name ?? ""));
      if (m) rim = Number(m[1]);
    }
    return { sizeRaw, rim };
  }

  const hay = `${raw.product_name ?? ""} ${raw.product_code ?? ""}`;
  const ratio = SIZE_RATIO.exec(hay);
  if (ratio) {
    const sizeRaw = `${ratio[1]}/${ratio[2]}`;
    let rim = 0;
    if (raw.ring != null && raw.ring !== "") {
      const n = Number(raw.ring);
      if (!Number.isNaN(n)) rim = n;
    }
    if (!rim) {
      const m = RIM_ONLY.exec(hay);
      if (m) rim = Number(m[1]);
    }
    return { sizeRaw, rim };
  }

  const commercial = SIZE_COMMERCIAL.exec(hay);
  if (commercial) {
    return { sizeRaw: commercial[1], rim: Number(commercial[2]) };
  }

  let rim = 0;
  if (raw.ring != null && raw.ring !== "") {
    const n = Number(raw.ring);
    if (!Number.isNaN(n)) rim = n;
  }
  return { sizeRaw: "", rim };
}

/** Map POS product → ShopStockItem. Never copies cost fields. */
export function mapPosProductToShopItem(raw: PosProductRaw): ShopStockItem | null {
  const productName = String(raw.product_name ?? "").trim();
  if (!productName) return null;

  const { sizeRaw, rim } = parseSizeAndRim(raw);
  const sizeNormalized =
    sizeRaw && rim > 0
      ? normalizeTireSize(sizeRaw, rim)
      : sizeRaw
        ? normalizeTireSize(sizeRaw, rim || 0)
        : "";

  const year =
    raw.product_year != null && String(raw.product_year).trim()
      ? String(raw.product_year)
      : undefined;

  const item: ShopStockItem = {
    id: `live-${raw.id ?? raw.product_code ?? productName}`,
    brand: resolveBrandName(raw),
    productName,
    sizeRaw,
    rim: rim || 0,
    sizeNormalized,
    sellPrice: Number(raw.product_price) || 0,
    qty: Number(raw.product_quantity) || 0,
    sheet: "POS live",
  };
  if (year) item.yearHint = year;
  return item;
}

export function stripCostKeys<T extends Record<string, unknown>>(row: T): T {
  const out = { ...row };
  for (const k of Object.keys(out)) {
    if (/cost|modal|hpp|margin|avg_cost|buy_price/i.test(k)) {
      delete out[k];
    }
  }
  return out;
}
