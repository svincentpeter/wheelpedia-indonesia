/**
 * Pure tire size helpers for OmahBan stock matching.
 * Keep in sync with src/lib/shop-stock.ts normalizeTireSize / sizesLooselyEqual.
 */

export function normalizeTireSize(sizeRaw, rim) {
  if (sizeRaw == null || rim == null || Number.isNaN(Number(rim))) return "";
  const s = String(sizeRaw).trim().replace(/\s+/g, "");
  const rimN = Number(rim);
  // "175/65" + 14 → "175/65 R14"
  if (/^\d{3}\/\d{2}$/.test(s)) return `${s} R${rimN}`;
  // "175" + 13 → "175 R13" (commercial/bias style in sheet)
  if (/^\d{3}$/.test(s) || /^\d{2,3}$/.test(s)) return `${s} R${rimN}`;
  // already full like 185/65R15 or 185/65 R15
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

export function sizesLooselyEqual(a, b) {
  const na = String(a).toUpperCase().replace(/\s+/g, "");
  const nb = String(b).toUpperCase().replace(/\s+/g, "");
  return na === nb || na.includes(nb) || nb.includes(na);
}
