"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Sparkles,
  Car,
  ChevronRight,
  Info,
  CheckCircle,
  XCircle,
  Loader2,
  HelpCircle,
  TrendingUp,
  Award,
  Layers,
  Send,
} from "lucide-react";
import { VEHICLES, type Vehicle } from "@/data/vehicles";
import { useShopStock } from "@/lib/use-shop-stock";
import { getBrandRank } from "@/lib/brand-ranking";
import TireWearDiagnostic from "@/components/counter/TireWearDiagnostic";
import {
  type CounterStockItem,
  parseTireSize,
  diameterMm,
  formatRp,
  matchCounterStock,
  tierBadgeClass,
  requestExplainScript,
  toCounterStock,
} from "@/lib/counter-helpers";

function vehicleLabel(v: Vehicle): string {
  const years =
    v.yearEnd == null ? `${v.yearStart}+` : `${v.yearStart}–${v.yearEnd}`;
  return `${v.brand} ${v.model} ${v.generation} (${years})`;
}

function vehicleYears(v: Vehicle): string {
  return v.yearEnd == null ? `${v.yearStart}+` : `${v.yearStart}–${v.yearEnd}`;
}

type LayoutVariant = "A" | "B" | "C";
type SubTab = "specs" | "stock" | "brands" | "calculator" | "quote";

export default function CounterView() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [layoutVariant, setLayoutVariant] = useState<LayoutVariant>("B");
  const [activeSubTab, setActiveSubTab] = useState<SubTab>("stock");

  const [calcWidth, setCalcWidth] = useState(185);
  const [calcAspect, setCalcAspect] = useState(60);
  const [calcRim, setCalcRim] = useState(15);

  const [quoteTire, setQuoteTire] = useState<CounterStockItem | null>(null);
  const [quoteQty, setQuoteQty] = useState(4);
  const [includeSpooring, setIncludeSpooring] = useState(true);
  const [includeBalancing, setIncludeBalancing] = useState(true);
  const [includePentil, setIncludePentil] = useState(true);
  const [includeNitrogen, setIncludeNitrogen] = useState(true);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const [selectedStockForAI, setSelectedStockForAI] =
    useState<CounterStockItem | null>(null);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const {
    items: stockItems,
    source: stockSource,
    warning: stockWarning,
    loading: stockLoading,
  } = useShopStock();

  useEffect(() => {
    const id = searchParams.get("vehicle");
    if (id && VEHICLES.some((v) => v.id === id)) setSelectedId(id);
  }, [searchParams]);

  const selected = useMemo(
    () => VEHICLES.find((v) => v.id === selectedId) ?? null,
    [selectedId],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return VEHICLES.slice(0, 12);
    return VEHICLES.filter((v) => {
      const hay =
        `${v.brand} ${v.model} ${v.generation} ${v.oemTire}`.toLowerCase();
      return hay.includes(q);
    }).slice(0, 40);
  }, [query]);

  const matchingStock = useMemo(() => {
    if (!selected) return [] as CounterStockItem[];
    const oem = matchCounterStock(selected.oemTire, stockItems);
    const compat = selected.compatibleTires.flatMap((size) =>
      matchCounterStock(size, stockItems),
    );
    const byId = new Map<string, CounterStockItem>();
    for (const it of [...oem, ...compat]) byId.set(it.id, it);
    return Array.from(byId.values()).sort((a, b) => {
      if (b.qty !== a.qty) return b.qty - a.qty;
      return a.price - b.price;
    });
  }, [selected, stockItems]);

  const allCounterStock = useMemo(
    () => stockItems.map(toCounterStock),
    [stockItems],
  );

  useEffect(() => {
    if (!selected) return;
    const parsed = parseTireSize(selected.oemTire);
    if (parsed) {
      setCalcWidth(parsed.width);
      setCalcAspect(parsed.aspect);
      setCalcRim(parsed.rim);
    }
    const first =
      matchingStock.find((s) => s.qty > 0) ?? matchingStock[0] ?? null;
    setQuoteTire(first);
    setSelectedStockForAI(first);
    setGeneratedScript(null);
    setAiError(null);
  }, [selected, matchingStock]);

  const handleSelectVehicle = (v: Vehicle) => {
    setSelectedId(v.id);
    setQuery("");
    setActiveSubTab("stock");
    setGeneratedScript(null);
  };

  const handleGenerateScript = async (stockItem: CounterStockItem) => {
    if (!selected) return;
    setIsGeneratingScript(true);
    setGeneratedScript(null);
    setAiError(null);
    setSelectedStockForAI(stockItem);
    try {
      const tierInfo = getBrandRank(stockItem.brand);
      const text = await requestExplainScript({
        vehicle: {
          brand: selected.brand,
          model: `${selected.model} ${selected.generation}`,
          oemTireSize: selected.oemTire,
          pcd: selected.pcd,
          cb: `${selected.centerBore} mm`,
          et: String(selected.stockOffset),
          notes: selected.upgradeNotes,
        },
        stockItem,
        tierInfo,
      });
      setGeneratedScript(text);
    } catch (e) {
      setAiError(e instanceof Error ? e.message : "Gagal membuat skrip.");
    } finally {
      setIsGeneratingScript(false);
    }
  };

  const oemParsed = selected ? parseTireSize(selected.oemTire) : null;
  const oemDia = oemParsed
    ? diameterMm(oemParsed.width, oemParsed.aspect, oemParsed.rim)
    : 0;
  const altDia = diameterMm(calcWidth, calcAspect, calcRim);
  const diffMm = oemDia ? altDia - oemDia : 0;
  const diffPct = oemDia ? (diffMm / oemDia) * 100 : 0;
  const isSafe = Math.abs(diffPct) <= 3;
  const isPerfect = Math.abs(diffPct) <= 1.5;
  const altSizeStr = `${calcWidth}/${calcAspect} R${calcRim}`;
  const matchedAltStock = matchCounterStock(altSizeStr, stockItems);

  const quoteTotals = useMemo(() => {
    if (!quoteTire) return null;
    const tireTotal = quoteTire.price * quoteQty;
    const spooringCost = includeSpooring ? 150_000 : 0;
    const balancingCost = includeBalancing ? 25_000 * quoteQty : 0;
    const pentilCost = includePentil ? 15_000 * quoteQty : 0;
    const nitrogenCost = includeNitrogen ? 10_000 * quoteQty : 0;
    const totalServices =
      spooringCost + balancingCost + pentilCost + nitrogenCost;
    const grandTotal = Math.max(0, tireTotal + totalServices - discountAmount);
    return {
      tireTotal,
      balancingCost,
      pentilCost,
      nitrogenCost,
      totalServices,
      grandTotal,
    };
  }, [
    quoteTire,
    quoteQty,
    includeSpooring,
    includeBalancing,
    includePentil,
    includeNitrogen,
    discountAmount,
  ]);

  const buildWaText = () => {
    if (!selected || !quoteTire || !quoteTotals) return "";
    const t = quoteTotals;
    return `*PENAWARAN ESTIMASI HARGA - OMAHBAN*
----------------------------------------
*Pelanggan:* Pemilik ${selected.brand} ${selected.model}
*Rekomendasi Roda:* ${selected.oemTire}

*Item Ban:*
- ${quoteQty} pcs *${quoteTire.brand} ${quoteTire.productName}* (${quoteTire.size})
  @ ${formatRp(quoteTire.price)} = *${formatRp(t.tireTotal)}*

${
  t.totalServices > 0
    ? `*Layanan Tambahan:*
${includeSpooring ? `- Spooring (Wheel Alignment): Rp 150.000\n` : ""}${includeBalancing ? `- ${quoteQty}x Balancing Roda: ${formatRp(t.balancingCost)}\n` : ""}${includePentil ? `- ${quoteQty}x Pentil Tubeless Besi: ${formatRp(t.pentilCost)}\n` : ""}${includeNitrogen ? `- ${quoteQty}x Pengisian Nitrogen Baru: ${formatRp(t.nitrogenCost)}\n` : ""}`
    : ""
}${
      discountAmount > 0
        ? `*Potongan Harga / Diskon:*
- Diskon Khusus: -${formatRp(discountAmount)}\n`
        : ""
    }
*TOTAL ESTIMASI:* *${formatRp(t.grandTotal)}*
----------------------------------------
*Catatan:*
- Layanan termasuk bongkar pasang & balancing standar.
- Silakan kunjungi bengkel *OmahBan* untuk eksekusi langsung.
- Ini estimasi, bukan nota kasir.

Terima kasih atas kepercayaan Anda, Kak!`;
  };

  const copyWa = async () => {
    try {
      await navigator.clipboard.writeText(buildWaText());
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const stockCard = (
    item: CounterStockItem,
    opts?: { onExplain?: () => void; compact?: boolean },
  ) => (
    <div
      key={item.id}
      className={`p-4 rounded-xl border transition-all ${
        item.qty === 0
          ? "bg-tokobg/40 border-tokocream/50 opacity-60"
          : "bg-white border-tokocream hover:border-tokoterracotta"
      }`}
    >
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0">
          <span
            className={`text-[9px] px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-wider inline-block mb-1.5 ${tierBadgeClass(item.tier)}`}
          >
            {item.tier} Tier
          </span>
          <h5 className="font-display font-bold text-sm text-tokonavy">
            {item.brand}{" "}
            <span className="font-sans font-medium text-xs text-tokonavy/80">
              {item.productName}
            </span>
          </h5>
          <p className="text-xs text-tokonavy/50 font-mono mt-0.5">{item.size}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm font-bold text-tokoterracotta">
            {formatRp(item.price)}
          </p>
          {item.qty > 0 ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-tokogreen font-mono">
              <CheckCircle size={10} /> Sisa {item.qty}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-tokored font-mono">
              <XCircle size={10} /> Habis
            </span>
          )}
        </div>
      </div>
      {!opts?.compact && item.description && (
        <p className="text-xs text-tokonavy/60 mt-2 line-clamp-2">
          {item.description}
        </p>
      )}
      {item.qty > 0 && opts?.onExplain && (
        <div className="mt-3 pt-3 border-t border-tokobg flex justify-end">
          <button
            type="button"
            onClick={opts.onExplain}
            className="px-3 py-1.5 rounded-lg bg-tokoterracotta text-white text-xs font-bold flex items-center gap-1.5"
          >
            <Sparkles size={12} /> Bantu Jelasin
          </button>
        </div>
      )}
    </div>
  );

  const aiScriptPanel = (
    <div className="space-y-3">
      {isGeneratingScript && (
        <div className="flex flex-col items-center justify-center py-10 text-center space-y-3 bg-tokobg rounded-xl border border-tokocream">
          <Loader2 size={32} className="text-tokoterracotta animate-spin" />
          <p className="text-xs text-tokonavy/60">
            Menyusun argumen ramah berdasarkan tier ban...
          </p>
        </div>
      )}
      {!isGeneratingScript && aiError && (
        <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-4 rounded-xl">
          {aiError}
        </div>
      )}
      {!isGeneratingScript && generatedScript && (
        <div className="bg-amber-50/40 border border-amber-200 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center border-b border-amber-200/50 pb-2">
            <p className="text-[10px] font-bold text-tokoterracotta uppercase tracking-wider">
              Hasil: {selectedStockForAI?.brand} ({selectedStockForAI?.tier})
            </p>
            <button
              type="button"
              onClick={() => setGeneratedScript(null)}
              className="text-[10px] text-tokonavy/50 hover:underline font-bold"
            >
              Reset
            </button>
          </div>
          <div className="whitespace-pre-line text-sm text-tokonavy/80 leading-relaxed bg-white p-4 rounded-lg border border-tokocream max-h-80 overflow-y-auto custom-scrollbar">
            {generatedScript}
          </div>
          <p className="text-[10px] text-tokonavy/40">
            Selalu pastikan stok fisik di rak sebelum transaksi.
          </p>
        </div>
      )}
      {!isGeneratingScript && !generatedScript && !aiError && (
        <div className="text-center p-8 bg-tokobg/40 rounded-lg border border-tokocream space-y-2">
          <HelpCircle size={28} className="mx-auto text-tokonavy/30" />
          <p className="text-xs text-tokonavy/60">
            Klik <strong>Bantu Jelasin</strong> di ban stok untuk generate skrip
            via /api/explain.
          </p>
        </div>
      )}
    </div>
  );

  const specsGrid = selected && (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
      {(
        [
          ["Baut Roda (PCD)", selected.pcd, "Kecocokan lubang baut hub roda."],
          [
            "Center Bore (CB)",
            `${selected.centerBore} mm`,
            "Lubang tengah tumpuan velg.",
          ],
          [
            "Offset Roda (ET)",
            String(selected.stockOffset),
            "Mekar atau celong posisi roda.",
          ],
          ["Tekanan Angin", selected.tirePressure, "Rekomendasi kenyamanan."],
          ["Ban OEM", selected.oemTire, "Ukuran standar pabrik."],
          ["Velg OEM", selected.oemWheel, "Velg bawaan pabrik."],
        ] as const
      ).map(([k, v, hint]) => (
        <div
          key={k}
          className="bg-tokobg p-3 rounded-xl border border-tokocream flex flex-col justify-between"
        >
          <div>
            <p className="text-tokonavy/50 font-medium">{k}</p>
            <p className="text-sm font-bold font-mono mt-1 text-tokonavy">{v}</p>
          </div>
          <p className="text-[10px] text-tokonavy/40 mt-2">{hint}</p>
        </div>
      ))}
    </div>
  );

  const calculatorPanel = selected && (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-tokobg/50 rounded-xl p-4 border border-tokocream">
        <div>
          <span className="text-[10px] uppercase font-mono font-bold text-tokonavy/50">
            OEM
          </span>
          <p className="text-2xl font-bold font-mono text-tokonavy mt-1">
            {selected.oemTire}
          </p>
          <p className="text-xs text-tokonavy/60">
            Diameter: {oemDia ? `${oemDia.toFixed(1)} mm` : "N/A"}
          </p>
        </div>
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-mono font-bold text-tokoterracotta">
            Tes Alternatif
          </span>
          <div className="grid grid-cols-3 gap-2">
            <label className="text-[10px] font-bold text-tokonavy/60">
              Lebar
              <select
                value={calcWidth}
                onChange={(e) => setCalcWidth(Number(e.target.value))}
                className="mt-1 w-full bg-white border border-tokocream rounded-lg px-2 py-1.5 text-xs font-mono font-bold"
              >
                {[165, 175, 185, 195, 205, 215, 225].map((w) => (
                  <option key={w} value={w}>
                    {w}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-[10px] font-bold text-tokonavy/60">
              Aspek
              <select
                value={calcAspect}
                onChange={(e) => setCalcAspect(Number(e.target.value))}
                className="mt-1 w-full bg-white border border-tokocream rounded-lg px-2 py-1.5 text-xs font-mono font-bold"
              >
                {[45, 50, 55, 60, 65, 70, 75].map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-[10px] font-bold text-tokonavy/60">
              Ring
              <select
                value={calcRim}
                onChange={(e) => setCalcRim(Number(e.target.value))}
                className="mt-1 w-full bg-white border border-tokocream rounded-lg px-2 py-1.5 text-xs font-mono font-bold"
              >
                {[14, 15, 16, 17, 18].map((r) => (
                  <option key={r} value={r}>
                    R{r}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <div
        className={`p-5 rounded-xl border ${
          isPerfect
            ? "bg-emerald-50/50 border-emerald-200"
            : isSafe
              ? "bg-amber-50/50 border-amber-200"
              : "bg-red-50/50 border-red-200"
        }`}
      >
        <span
          className={`inline-flex text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
            isPerfect
              ? "bg-emerald-100 text-tokogreen"
              : isSafe
                ? "bg-amber-100 text-amber-800"
                : "bg-red-100 text-tokored"
          }`}
        >
          {isPerfect
            ? "Sangat Aman"
            : isSafe
              ? "Cukup Aman (±3%)"
              : "Bahaya (melebihi batas)"}
        </span>
        <h5 className="font-display font-bold text-lg text-tokonavy mt-2">
          Selisih:{" "}
          <span className="font-mono">
            {diffPct > 0 ? "+" : ""}
            {diffPct.toFixed(2)}%
          </span>{" "}
          ({diffMm > 0 ? "+" : ""}
          {diffMm.toFixed(1)} mm)
        </h5>
      </div>

      {oemParsed && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {(
            [
              [
                "Tapak Lebar",
                oemParsed.width + 10,
                Math.max(45, oemParsed.aspect - 5),
                oemParsed.rim,
              ],
              [
                "Tapak Lebar Tebal",
                oemParsed.width + 10,
                oemParsed.aspect,
                oemParsed.rim,
              ],
              [
                "Lebih Ramping",
                Math.max(165, oemParsed.width - 10),
                Math.min(75, oemParsed.aspect + 5),
                oemParsed.rim,
              ],
            ] as const
          ).map(([label, w, a, r]) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                setCalcWidth(w);
                setCalcAspect(a);
                setCalcRim(r);
              }}
              className="p-3 rounded-lg border border-tokocream bg-tokobg/20 hover:border-tokoterracotta text-left text-xs"
            >
              <span className="font-bold text-tokonavy block">{label}</span>
              <span className="font-mono text-tokonavy/70">
                {w}/{a} R{r}
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <h5 className="font-display font-bold text-xs uppercase text-tokonavy">
          Stok alternatif {altSizeStr}
        </h5>
        {matchedAltStock.length === 0 ? (
          <p className="text-xs text-tokonavy/50 p-4 bg-tokobg rounded-xl border border-dashed border-tokocream">
            Tidak ada stok ukuran ini di snapshot.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-3">
            {matchedAltStock.slice(0, 8).map((item) =>
              stockCard(item, {
                compact: true,
                onExplain: () => {
                  setQuoteTire(item);
                  setActiveSubTab("quote");
                },
              }),
            )}
          </div>
        )}
      </div>
      <Link
        href="/calculators"
        className="text-xs font-bold text-tokoterracotta hover:underline"
      >
        Buka kalkulator lengkap →
      </Link>
    </div>
  );

  const quoteOptions =
    matchingStock.length > 0 ? matchingStock : allCounterStock.slice(0, 100);

  const quotePanel = selected && (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-4">
        <label className="block text-xs font-bold text-tokonavy space-y-1">
          Pilih Produk Ban
          <select
            value={quoteTire?.id ?? ""}
            onChange={(e) => {
              const found = quoteOptions.find((i) => i.id === e.target.value);
              setQuoteTire(found ?? null);
            }}
            className="w-full bg-white border border-tokocream rounded-lg px-3 py-2 text-xs font-semibold"
          >
            <option value="">-- Pilih ban --</option>
            {quoteOptions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.brand} {item.productName} ({item.size}) —{" "}
                {formatRp(item.price)}
              </option>
            ))}
          </select>
        </label>

        {quoteTire && (
          <>
            <div className="space-y-2">
              <p className="text-xs font-bold text-tokonavy">Jumlah</p>
              <div className="flex gap-2">
                {[1, 2, 4].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuoteQty(q)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${
                      quoteQty === q
                        ? "bg-tokoterracotta text-white border-tokoterracotta"
                        : "bg-white border-tokocream"
                    }`}
                  >
                    {q} pcs
                  </button>
                ))}
                <input
                  type="number"
                  min={1}
                  value={quoteQty}
                  onChange={(e) =>
                    setQuoteQty(Math.max(1, Number(e.target.value) || 1))
                  }
                  className="w-16 border border-tokocream rounded-lg text-center text-xs font-mono font-bold"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(
                [
                  [
                    "Spooring Roda",
                    "Rp 150.000",
                    includeSpooring,
                    setIncludeSpooring,
                  ],
                  [
                    "Balancing",
                    `Rp 25.000 × ${quoteQty}`,
                    includeBalancing,
                    setIncludeBalancing,
                  ],
                  [
                    "Pentil Besi",
                    `Rp 15.000 × ${quoteQty}`,
                    includePentil,
                    setIncludePentil,
                  ],
                  [
                    "Nitrogen",
                    `Rp 10.000 × ${quoteQty}`,
                    includeNitrogen,
                    setIncludeNitrogen,
                  ],
                ] as const
              ).map(([label, price, val, set]) => (
                <label
                  key={label}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-tokocream bg-tokobg/10 cursor-pointer text-xs"
                >
                  <input
                    type="checkbox"
                    checked={val}
                    onChange={(e) => set(e.target.checked)}
                    className="accent-tokoterracotta"
                  />
                  <span>
                    <span className="font-bold text-tokonavy block">{label}</span>
                    <span className="text-[10px] text-tokonavy/50">{price}</span>
                  </span>
                </label>
              ))}
            </div>
            <label className="block text-xs font-bold text-tokonavy space-y-1">
              Diskon (Rp)
              <input
                type="number"
                min={0}
                step={5000}
                value={discountAmount}
                onChange={(e) =>
                  setDiscountAmount(Math.max(0, Number(e.target.value) || 0))
                }
                className="w-full border border-tokocream rounded-lg px-3 py-1.5 font-mono text-xs"
              />
            </label>
          </>
        )}
      </div>

      <div className="lg:col-span-5">
        {quoteTire && quoteTotals ? (
          <div className="bg-tokonavy text-white rounded-xl p-5 space-y-4">
            <h5 className="font-display font-bold text-sm border-b border-white/10 pb-2">
              Rincian Penawaran
            </h5>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-white/60">Ban ({quoteQty} pcs)</span>
                <span className="font-mono">
                  {formatRp(quoteTotals.tireTotal)}
                </span>
              </div>
              {quoteTotals.totalServices > 0 && (
                <div className="flex justify-between">
                  <span className="text-white/60">Layanan</span>
                  <span className="font-mono">
                    {formatRp(quoteTotals.totalServices)}
                  </span>
                </div>
              )}
              {discountAmount > 0 && (
                <div className="flex justify-between text-amber-300">
                  <span>Diskon</span>
                  <span className="font-mono">-{formatRp(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold border-t border-white/10 pt-2 text-amber-200">
                <span>Total Estimasi</span>
                <span className="font-mono">
                  {formatRp(quoteTotals.grandTotal)}
                </span>
              </div>
            </div>
            <textarea
              readOnly
              value={buildWaText()}
              className="w-full h-28 bg-white/5 border border-white/10 rounded-lg p-2 text-[10px] font-mono text-white/80 resize-none"
            />
            <button
              type="button"
              onClick={copyWa}
              className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 ${
                isCopied
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-tokonavy hover:bg-white/90"
              }`}
            >
              {isCopied ? (
                <>
                  <CheckCircle size={14} /> Berhasil Disalin!
                </>
              ) : (
                <>
                  <Send size={14} /> Salin Penawaran WhatsApp
                </>
              )}
            </button>
            <p className="text-[10px] text-white/40">
              Estimasi saja — bukan nota POS.
            </p>
          </div>
        ) : (
          <div className="bg-tokobg rounded-xl p-6 border border-tokocream text-center text-xs text-tokonavy/50">
            <HelpCircle size={24} className="mx-auto text-tokonavy/30 mb-2" />
            Pilih ban untuk hitung penawaran.
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl p-5 border border-tokocream shadow-xs">
        <h2 className="font-display font-bold text-lg text-tokonavy mb-2">
          Asisten Counter OmahBan
        </h2>
        <p className="text-xs text-tokonavy/60 mb-4 leading-relaxed">
          Cari mobil → OEM specs → stok rak → skrip AI / quote WhatsApp.{" "}
          {stockLoading
            ? "Memuat stok…"
            : stockSource === "live"
              ? "Sumber: live POS."
              : "Sumber: snapshot."}{" "}
          Bukan kasir.
        </p>
        {stockWarning && (
          <p className="mb-3 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
            {stockWarning}
          </p>
        )}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-tokonavy/40">
            <Search size={18} />
          </span>
          <input
            type="search"
            className="w-full bg-tokobg border border-tokocream text-tokonavy placeholder-tokonavy/40 rounded-lg pl-10 pr-4 py-3 text-base focus:ring-1 focus:ring-tokoterracotta"
            placeholder="Cari Jazz, Avanza, Innova, atau ukuran ban..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedId(null);
            }}
            autoComplete="off"
          />
        </div>
        {query && !selected && (
          <div className="mt-3 bg-tokobg/50 rounded-lg border border-tokocream divide-y divide-tokocream/40 max-h-60 overflow-y-auto">
            {results.length === 0 ? (
              <div className="p-4 text-center text-xs text-tokonavy/50">
                Mobil tidak ditemukan.
              </div>
            ) : (
              results.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => handleSelectVehicle(v)}
                  className="w-full text-left px-4 py-3 hover:bg-tokocream/30 flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Car size={16} className="text-tokoterracotta shrink-0" />
                    <span className="font-bold text-tokonavy truncate">
                      {v.brand} {v.model}
                    </span>
                    <span className="text-xs text-tokonavy/60 font-mono">
                      {v.generation}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-sm bg-tokonavy/10 shrink-0">
                    {v.oemTire}
                  </span>
                </button>
              ))
            )}
          </div>
        )}
        {!query && !selected && (
          <ul className="mt-4 divide-y divide-tokocream/40 rounded-lg border border-tokocream overflow-hidden">
            {results.map((v) => (
              <li key={v.id}>
                <button
                  type="button"
                  onClick={() => handleSelectVehicle(v)}
                  className="flex min-h-12 w-full items-center gap-3 px-4 py-3 text-left hover:bg-tokobg"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-tokoterracotta/10 text-tokoterracotta">
                    <Car size={18} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-bold text-tokonavy text-sm">
                      {v.brand} {v.model}
                    </span>
                    <span className="block truncate text-xs text-tokonavy/50">
                      {v.generation} · OEM {v.oemTire}
                    </span>
                  </span>
                  <ChevronRight className="text-tokonavy/30" size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected ? (
        <div className="space-y-5">
          <div className="bg-tokonavy text-white rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-tokoterracotta flex items-center justify-center shrink-0">
                <Car size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-tokocream/70">
                    OEM Match
                  </span>
                  <span className="text-[10px] bg-tokoterracotta font-mono font-bold px-1.5 py-0.5 rounded-sm">
                    {selected.oemTire}
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl leading-tight">
                  {selected.brand} {selected.model}
                </h3>
                <p className="text-xs text-tokocream/70 font-mono mt-0.5">
                  {vehicleLabel(selected)}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/vehicles?id=${selected.id}`}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 text-xs font-semibold"
              >
                Detail DB
              </Link>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                className="px-3 py-1.5 rounded-lg bg-white/10 text-white hover:bg-white/20 text-xs font-semibold"
              >
                Ganti Mobil
              </button>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-tokocream flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-tokoterracotta flex items-center gap-1">
                <Info size={12} /> Tata Letak Counter
              </p>
              <p className="text-[11px] text-tokonavy/60">
                Varian B (Tab Fokus) direkomendasikan untuk antrean counter.
              </p>
            </div>
            <div className="flex gap-1 bg-tokobg p-1 rounded-lg w-full md:w-auto">
              {(
                [
                  ["A", "Varian A (Bento)"],
                  ["B", "Varian B (Tab ⭐)"],
                  ["C", "Varian C (Side)"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setLayoutVariant(id);
                    if (id === "B") setActiveSubTab("stock");
                  }}
                  className={`flex-1 md:flex-initial px-3 py-1.5 rounded-md text-xs font-bold ${
                    layoutVariant === id
                      ? "bg-tokonavy text-white"
                      : "text-tokonavy/70 hover:bg-tokocream/50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {layoutVariant === "A" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-tokocream p-5 space-y-4">
                <h4 className="font-display font-bold text-sm text-tokoterracotta uppercase tracking-wider">
                  1. Ukuran Roda Bawaan (OEM)
                </h4>
                {specsGrid}
                {selected.upgradeNotes && (
                  <div className="bg-amber-50/50 p-3 rounded-lg border border-amber-100 text-xs text-amber-800">
                    <strong>Catatan:</strong> {selected.upgradeNotes}
                  </div>
                )}
              </div>
              <div className="bg-white rounded-xl border border-tokocream p-5 space-y-4">
                <h4 className="font-display font-bold text-sm text-tokoterracotta uppercase tracking-wider flex justify-between">
                  <span>2. Stok di Rak</span>
                  <span className="text-[10px] bg-tokocream text-tokonavy font-mono px-2 py-0.5 rounded-full">
                    {matchingStock.length} cocok
                  </span>
                </h4>
                <div className="space-y-3 max-h-[380px] overflow-y-auto custom-scrollbar">
                  {matchingStock.length === 0 ? (
                    <p className="text-xs text-tokonavy/50 p-6 bg-tokobg rounded-lg border border-dashed text-center">
                      Ukuran {selected.oemTire} kosong di snapshot.
                    </p>
                  ) : (
                    matchingStock
                      .slice(0, 20)
                      .map((item) =>
                        stockCard(item, {
                          onExplain: () => void handleGenerateScript(item),
                        }),
                      )
                  )}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-tokocream p-5 space-y-4">
                <h4 className="font-display font-bold text-sm text-tokoterracotta uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={14} /> 3. Skrip Bicara AI
                </h4>
                {aiScriptPanel}
              </div>
            </div>
          )}

          {layoutVariant === "B" && (
            <div className="bg-white rounded-xl border border-tokocream overflow-hidden">
              <div className="flex border-b border-tokocream bg-tokobg/30 overflow-x-auto">
                {(
                  [
                    ["stock", "Stok Cocok", TrendingUp],
                    ["specs", "Spek OEM", Car],
                    ["calculator", "Kalkulator", Layers],
                    ["quote", "Estimasi Harga", Award],
                    ["brands", "Kamus Merk & AI", Sparkles],
                  ] as const
                ).map(([id, label, Icon]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveSubTab(id)}
                    className={`flex-1 min-w-[110px] py-3 text-center text-xs font-bold border-b-2 flex justify-center items-center gap-1.5 shrink-0 ${
                      activeSubTab === id
                        ? "border-tokoterracotta text-tokoterracotta bg-white"
                        : "border-transparent text-tokonavy/60 hover:text-tokonavy"
                    }`}
                  >
                    <Icon size={14} />
                    {id === "stock"
                      ? `${label} (${matchingStock.length})`
                      : label}
                  </button>
                ))}
              </div>
              <div className="p-5">
                {activeSubTab === "stock" && (
                  <div className="space-y-4">
                    <h4 className="font-display font-bold text-sm text-tokonavy">
                      Ban ukuran {selected.oemTire}
                    </h4>
                    {matchingStock.length === 0 ? (
                      <div className="p-12 text-center text-sm text-tokonavy/50 bg-tokobg rounded-xl border border-dashed">
                        Stok cocok kosong di snapshot.
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-4">
                        {matchingStock.slice(0, 40).map((item) =>
                          stockCard(item, {
                            onExplain: () => {
                              void handleGenerateScript(item);
                              setActiveSubTab("brands");
                            },
                          }),
                        )}
                      </div>
                    )}
                    <Link
                      href={`/stok?q=${encodeURIComponent(selected.oemTire)}`}
                      className="text-xs font-bold text-tokoterracotta hover:underline"
                    >
                      Browse stok penuh →
                    </Link>
                  </div>
                )}
                {activeSubTab === "specs" && (
                  <div className="space-y-4">
                    <h4 className="font-display font-bold text-sm text-tokonavy">
                      Spek {selected.brand} {selected.model} (
                      {vehicleYears(selected)})
                    </h4>
                    {specsGrid}
                    {selected.upgradeNotes && (
                      <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-900">
                        <strong>Catatan teknisi:</strong>{" "}
                        {selected.upgradeNotes}
                      </div>
                    )}
                  </div>
                )}
                {activeSubTab === "calculator" && calculatorPanel}
                {activeSubTab === "quote" && quotePanel}
                {activeSubTab === "brands" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-display font-bold text-sm text-tokonavy flex items-center gap-2">
                        <Sparkles size={16} className="text-tokoterracotta" />
                        Asisten Penjelasan AI & Rekomendasi Merk
                      </h4>
                      <p className="text-xs text-tokonavy/50 mt-1">
                        Generate skrip dari tab Stok, atau buka{" "}
                        <Link
                          href="/brands"
                          className="text-tokoterracotta font-bold"
                        >
                          Panduan Merk
                        </Link>
                        .
                      </p>
                    </div>
                    {aiScriptPanel}
                    <div className="bg-tokoterracotta/5 rounded-xl p-5 border border-tokoterracotta/20 space-y-2 text-xs text-tokonavy/80">
                      <h5 className="font-display font-bold text-xs uppercase text-tokoterracotta">
                        Panduan Tier Singkat
                      </h5>
                      <p>
                        <strong>Premium</strong>: keamanan & kesenyapan
                        (MPV/SUV jarak jauh).
                      </p>
                      <p>
                        <strong>Mid</strong>: harian kota, kenyamanan vs harga.
                      </p>
                      <p>
                        <strong>Budget</strong>: mobil kerja / ojol, awet
                        kilometer.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {layoutVariant === "C" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white rounded-xl border border-tokocream p-5 space-y-4">
                  <h4 className="font-display font-bold text-sm text-tokoterracotta uppercase tracking-wider">
                    Spesifikasi Sasis & Velg
                  </h4>
                  <div className="space-y-3 text-sm">
                    {(
                      [
                        ["PCD", selected.pcd],
                        ["CB", `${selected.centerBore} mm`],
                        ["ET", String(selected.stockOffset)],
                        ["Tekanan", selected.tirePressure],
                        ["OEM Ban", selected.oemTire],
                      ] as const
                    ).map(([k, v]) => (
                      <div
                        key={k}
                        className="flex justify-between py-2 border-b border-tokobg last:border-0"
                      >
                        <span className="text-tokonavy/50">{k}</span>
                        <span className="font-mono font-bold text-tokonavy">
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                  {selected.upgradeNotes && (
                    <div className="bg-tokocream/20 p-4 rounded-xl text-xs text-tokonavy/70">
                      <strong>Saran toko:</strong> {selected.upgradeNotes}
                    </div>
                  )}
                </div>
                <div className="bg-white rounded-xl border border-tokocream p-5 space-y-2">
                  <h4 className="font-display font-bold text-xs uppercase text-tokoterracotta">
                    Edukasi Center Ring
                  </h4>
                  <p className="text-xs text-tokonavy/60 leading-relaxed">
                    Upgrade velg aftermarket dengan CB lebih besar? Pasang{" "}
                    <strong>Center Ring</strong> agar setir tidak bergetar di
                    atas 80 km/jam.
                  </p>
                </div>
              </div>
              <div className="lg:col-span-7 bg-white rounded-xl border border-tokocream p-5 space-y-5">
                <div className="border-b border-tokocream pb-3 flex justify-between items-center">
                  <h4 className="font-display font-bold text-sm text-tokonavy">
                    Stok Cocok ({matchingStock.length})
                  </h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    Match OEM
                  </span>
                </div>
                <div className="space-y-3 max-h-[360px] overflow-y-auto custom-scrollbar">
                  {matchingStock.length === 0 ? (
                    <p className="p-8 text-center text-xs text-tokonavy/50 bg-tokobg rounded-xl">
                      Stok {selected.oemTire} kosong di snapshot.
                    </p>
                  ) : (
                    matchingStock.slice(0, 24).map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 bg-tokobg/40 border border-tokocream rounded-xl flex justify-between items-center gap-4"
                      >
                        <div className="min-w-0">
                          <span
                            className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${tierBadgeClass(item.tier)}`}
                          >
                            {item.tier}
                          </span>
                          <h5 className="font-display font-bold text-sm text-tokonavy truncate mt-1">
                            {item.brand} {item.productName}
                          </h5>
                          <p className="text-[10px] font-mono text-tokonavy/50">
                            {item.size}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-bold text-sm">
                            {formatRp(item.price)}
                          </p>
                          <p
                            className={`text-[10px] font-bold ${item.qty > 0 ? "text-tokogreen" : "text-tokored"}`}
                          >
                            {item.qty > 0 ? `Sisa ${item.qty}` : "Habis"}
                          </p>
                          {item.qty > 0 && (
                            <button
                              type="button"
                              onClick={() => void handleGenerateScript(item)}
                              className="text-[10px] font-bold text-tokoterracotta hover:underline mt-1 flex items-center gap-0.5 ml-auto"
                            >
                              <Sparkles size={10} /> Jelasin AI
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {aiScriptPanel}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-tokocream p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-tokoterracotta/10 flex items-center justify-center text-tokoterracotta mx-auto">
            <Car size={32} />
          </div>
          <h3 className="font-display font-bold text-base text-tokonavy">
            Mulai Pencarian Mobil Pelanggan
          </h3>
          <p className="text-xs text-tokonavy/60 max-w-md mx-auto">
            Ketik <strong>Jazz</strong>, <strong>Avanza</strong>, atau{" "}
            <strong>Innova</strong> di bilah pencarian.
          </p>
        </div>
      )}

      <TireWearDiagnostic />
    </div>
  );
}
