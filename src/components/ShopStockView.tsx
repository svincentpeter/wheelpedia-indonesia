"use client";

import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  RefreshCw,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { searchStock, type ShopStockItem } from "@/lib/shop-stock";
import { useShopStock } from "@/lib/use-shop-stock";

function formatRp(n: number): string {
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export default function ShopStockView() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const { items: all, source, warning, loading } = useShopStock();
  const [isRefreshing, setIsRefreshing] = useState(false);

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
  const [inStockOnly, setInStockOnly] = useState(false);

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

  const handleRefresh = () => {
    setIsRefreshing(true);
    window.location.reload();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl p-5 border border-tokocream flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-display font-bold text-lg text-tokoteal">
            Data Stok Harian OmahBan
          </h2>
          <p className="text-xs text-tokonavy/60 mt-1 max-w-xl">
            {loading
              ? "Memuat stok…"
              : source === "live"
                ? "Sumber: live POS (baca-saja). Harga jual + qty."
                : "Sumber: snapshot. Set STOCK_SOURCE=live untuk POS."}{" "}
            Jika stok 1–2 pcs, verifikasi rak fisik.
          </p>
          {warning && (
            <p className="text-xs text-amber-700 mt-1 font-medium">{warning}</p>
          )}
        </div>
        <button
          type="button"
          onClick={handleRefresh}
          className="px-4 py-2 bg-tokobg border border-tokocream text-tokonavy hover:bg-tokocream/30 rounded-lg text-xs font-bold flex items-center gap-2 shrink-0"
        >
          <RefreshCw
            size={14}
            className={
              isRefreshing ? "animate-spin text-tokoterracotta" : "text-tokonavy/60"
            }
          />
          {isRefreshing ? "Menyinkronkan..." : "SINKRONKAN"}
        </button>
      </div>

      <div className="bg-white p-5 rounded-xl border border-tokocream space-y-4">
        <div className="flex items-center gap-2 text-tokoterracotta">
          <SlidersHorizontal size={16} />
          <h3 className="font-display font-bold text-xs uppercase tracking-wider">
            Penyaringan & Pencarian
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-5 relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-tokonavy/40">
              <Search size={16} />
            </span>
            <input
              type="search"
              className="w-full bg-tokobg border border-tokocream text-tokonavy placeholder-tokonavy/40 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-hidden focus:ring-1 focus:ring-tokoterracotta"
              placeholder="Cari nama ban, merk, atau profil..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="md:col-span-3">
            <select
              className="w-full bg-tokobg border border-tokocream text-tokonavy rounded-lg px-3 py-2 text-sm"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="">Semua Brand</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <select
              className="w-full bg-tokobg border border-tokocream text-tokonavy rounded-lg px-3 py-2 text-sm"
              value={rim}
              onChange={(e) => setRim(e.target.value)}
            >
              <option value="">Semua Ring</option>
              {rims.map((r) => (
                <option key={r} value={String(r)}>
                  R{r}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2 flex items-center">
            <label className="flex items-center gap-2 text-xs font-bold text-tokonavy cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-tokocream"
              />
              Ada stok saja
            </label>
          </div>
        </div>
        <p className="text-[11px] text-tokonavy/50">
          Menampilkan {filtered.length} item
          {all.length ? ` dari ${all.length}` : ""}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-xl border p-4 space-y-2 ${
              item.qty > 0
                ? "border-tokocream hover:border-tokoterracotta"
                : "border-tokocream/60 opacity-75"
            }`}
          >
            <div className="flex justify-between items-start gap-2">
              <div className="min-w-0">
                <p className="font-display font-bold text-sm text-tokonavy truncate">
                  {item.brand}
                </p>
                <p className="text-xs text-tokonavy/70 truncate">
                  {item.productName}
                </p>
                <p className="text-xs font-mono font-bold text-tokoterracotta mt-1">
                  {item.sizeNormalized}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-tokonavy">
                  {formatRp(item.sellPrice)}
                </p>
                {item.qty > 0 ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-tokogreen mt-1">
                    <CheckCircle size={12} /> Sisa {item.qty}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-tokored mt-1">
                    <XCircle size={12} /> Habis
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && !loading && (
        <p className="text-center text-sm text-tokonavy/50 py-8">
          Tidak ada hasil. Longgarkan filter.
        </p>
      )}
    </div>
  );
}
