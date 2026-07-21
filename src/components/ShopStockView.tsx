"use client";

import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Package } from "lucide-react";
import { searchStock, type ShopStockItem } from "@/lib/shop-stock";
import { useShopStock } from "@/lib/use-shop-stock";

function formatRp(n: number): string {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export default function ShopStockView() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const { items: all, source, warning, loading } = useShopStock();

  const brands = useMemo(
    () => Array.from(new Set(all.map((i) => i.brand))).sort(),
    [all],
  );
  const rims = useMemo(
    () =>
      Array.from(new Set(all.map((i) => i.rim).filter((r) => r > 0))).sort(
        (a, b) => a - b,
      ),
    [all],
  );

  const [query, setQuery] = useState(initialQ);
  const [brand, setBrand] = useState("");
  const [rim, setRim] = useState("");
  const [inStockOnly, setInStockOnly] = useState(true);

  const filtered: ShopStockItem[] = useMemo(() => {
    let list = searchStock(query, all);
    if (brand) list = list.filter((i) => i.brand === brand);
    if (rim) {
      const r = Number(rim);
      list = list.filter((i) => i.rim === r);
    }
    if (inStockOnly) list = list.filter((i) => i.qty > 0);
    return list.slice(0, 200);
  }, [all, query, brand, rim, inStockOnly]);

  return (
    <div className="mx-auto max-w-3xl space-y-5 pb-20 text-left animate-fade-in">
      <header className="space-y-1">
        <p className="text-xs font-bold uppercase tracking-wider text-[#3B82F6]">
          Snapshot stok
        </p>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Stok OmahBan
        </h1>
        <p className="text-sm font-medium text-gray-500">
          {loading
            ? "Memuat stok…"
            : source === "live"
              ? "Sumber: live POS (Sanctum proxy). Harga jual + qty saja."
              : "Sumber: snapshot Excel. Set STOCK_SOURCE=live untuk POS."}
        </p>
        {warning && (
          <p className="text-xs font-medium text-amber-600 dark:text-amber-400">
            {warning}
          </p>
        )}
      </header>

      <div className="space-y-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari merk, tipe, ukuran…"
            className="min-h-12 w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-base font-medium outline-none ring-[#3B82F6] focus:ring-2 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <label className="block text-xs font-bold text-gray-500">
            Merk
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="mt-1 min-h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            >
              <option value="">Semua</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs font-bold text-gray-500">
            Ring
            <select
              value={rim}
              onChange={(e) => setRim(e.target.value)}
              className="mt-1 min-h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium dark:border-gray-700 dark:bg-gray-950 dark:text-white"
            >
              <option value="">Semua</option>
              {rims.map((r) => (
                <option key={r} value={String(r)}>
                  R{r}
                </option>
              ))}
            </select>
          </label>
          <label className="col-span-2 flex min-h-11 items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200 sm:col-span-1 sm:mt-5">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="h-5 w-5 rounded border-gray-300"
            />
            Hanya ada stok
          </label>
        </div>
      </div>

      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
        {filtered.length} item (max 200 tampil)
      </p>

      <ul className="space-y-2">
        {filtered.length === 0 && (
          <li className="rounded-2xl border border-dashed border-gray-200 px-4 py-8 text-center text-sm text-gray-500 dark:border-gray-700">
            Tidak ada baris. Longgarkan filter atau refresh import.
          </li>
        )}
        {filtered.map((it) => (
          <li
            key={it.id}
            className="flex min-h-16 flex-col gap-1 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#3B82F6] dark:bg-blue-950">
                <Package size={18} />
              </span>
              <div className="min-w-0">
                <p className="truncate font-bold text-gray-900 dark:text-white">
                  {it.brand} {it.productName}
                </p>
                <p className="text-sm text-gray-500">
                  {it.sizeNormalized}
                  {it.yearHint ? ` · th ${it.yearHint}` : ""}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 pl-12 sm:pl-0">
              <span className="font-bold text-gray-900 dark:text-white">
                {formatRp(it.sellPrice)}
              </span>
              {it.qty > 0 ? (
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  sisa {it.qty}
                </span>
              ) : (
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-500 dark:bg-gray-800">
                  Habis
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
