import stock from "@/data/shop-stock.json";

/**
 * Keep normalizeTireSize / sizesLooselyEqual in sync with scripts/lib/tire-size.mjs
 */

export type ShopStockItem = {
  id: string;
  brand: string;
  productName: string;
  sizeRaw: string;
  rim: number;
  sizeNormalized: string;
  sellPrice: number;
  qty: number;
  sheet: string;
  yearHint?: string;
};

export function normalizeTireSize(
  sizeRaw: string | null | undefined,
  rim: number | null | undefined,
): string {
  if (sizeRaw == null || rim == null || Number.isNaN(Number(rim))) return "";
  const s = String(sizeRaw).trim().replace(/\s+/g, "");
  const rimN = Number(rim);
  if (/^\d{3}\/\d{2}$/.test(s)) return `${s} R${rimN}`;
  if (/^\d{3}$/.test(s) || /^\d{2,3}$/.test(s)) return `${s} R${rimN}`;
  if (/R\d{2}$/i.test(s)) {
    return s
      .replace(/r/i, " R")
      .replace(/\s+/g, " ")
      .toUpperCase()
      .replace(/\s+R/, " R")
      .trim();
  }
  return `${s} R${rimN}`;
}

export function sizesLooselyEqual(a: string, b: string): boolean {
  const na = a.toUpperCase().replace(/\s+/g, "");
  const nb = b.toUpperCase().replace(/\s+/g, "");
  return na === nb || na.includes(nb) || nb.includes(na);
}

export function getShopStock(): ShopStockItem[] {
  return stock as ShopStockItem[];
}

/** Alias used by plan: loadShopStock */
export function loadShopStock(): ShopStockItem[] {
  return getShopStock();
}

export function matchStockForOem(
  oemTire: string,
  items: ShopStockItem[] = getShopStock(),
  opts: { inStockOnly?: boolean } = { inStockOnly: true },
): ShopStockItem[] {
  const target = oemTire.toUpperCase().replace(/\s+/g, "");
  const inStockOnly = opts.inStockOnly !== false;
  return items.filter((it) => {
    if (inStockOnly && it.qty <= 0) return false;
    const n = it.sizeNormalized.toUpperCase().replace(/\s+/g, "");
    return n === target || n.includes(target) || target.includes(n);
  });
}

export function searchStock(
  query: string,
  items: ShopStockItem[] = getShopStock(),
): ShopStockItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((it) => {
    const hay = [
      it.brand,
      it.productName,
      it.sizeRaw,
      it.sizeNormalized,
      it.sheet,
      String(it.rim),
      it.yearHint ?? "",
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}
