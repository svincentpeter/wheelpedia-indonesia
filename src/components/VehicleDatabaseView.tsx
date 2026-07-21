"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, BadgeInfo, Package } from "lucide-react";
import { VEHICLES, type Vehicle } from "@/data/vehicles";
import { SafeImage } from "@/components/SafeImage";
import { matchStockForOem } from "@/lib/shop-stock";

interface VehicleDatabaseViewProps {
  onNavigateToAssistant: (initialPrompt?: string) => void;
  searchQuery: string;
  selectedVehicleId: string | null;
  setSelectedVehicleId: (id: string | null) => void;
}

function displayName(v: Vehicle) {
  return `${v.model} ${v.generation}`.trim();
}

function yearLabel(v: Vehicle) {
  return v.yearEnd ? `${v.yearStart}–${v.yearEnd}` : `${v.yearStart}+`;
}

export default function VehicleDatabaseView({
  onNavigateToAssistant,
  searchQuery,
  selectedVehicleId,
  setSelectedVehicleId,
}: VehicleDatabaseViewProps) {
  const [selectedBrandFilter, setSelectedBrandFilter] = useState("All");

  const selectedVehicle = VEHICLES.find((v) => v.id === selectedVehicleId);

  const shopMatches = useMemo(() => {
    if (!selectedVehicle) return [];
    const oem = matchStockForOem(selectedVehicle.oemTire, undefined, {
      inStockOnly: false,
    });
    const compat = selectedVehicle.compatibleTires.flatMap((size) =>
      matchStockForOem(size, undefined, { inStockOnly: false }),
    );
    const byId = new Map(oem.map((i) => [i.id, i]));
    for (const it of compat) byId.set(it.id, it);
    return Array.from(byId.values())
      .sort((a, b) => b.qty - a.qty || a.sellPrice - b.sellPrice)
      .slice(0, 8);
  }, [selectedVehicle]);

  const filteredVehicles = VEHICLES.filter((vehicle) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      vehicle.model.toLowerCase().includes(q) ||
      vehicle.brand.toLowerCase().includes(q) ||
      vehicle.bodyType.toLowerCase().includes(q) ||
      vehicle.pcd.toLowerCase().includes(q) ||
      vehicle.oemTire.toLowerCase().includes(q);

    const matchesBrand =
      selectedBrandFilter === "All" || vehicle.brand === selectedBrandFilter;

    return matchesSearch && matchesBrand;
  });

  const handleAskAggressive = (vehicle: Vehicle) => {
    onNavigateToAssistant(
      `Bagaimana rekomendasi setup velg lebar (agresif fitment) dan offset (ET) yang pas untuk ${vehicle.brand} ${displayName(vehicle)} (PCD ${vehicle.pcd}, CB ${vehicle.centerBore}, OEM ET ${vehicle.stockOffset}) agar kelihatan padat tanpa gosrok fender?`,
    );
  };

  const brands = ["All", ...Array.from(new Set(VEHICLES.map((v) => v.brand))).sort()];

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {!selectedVehicle ? (
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Vehicle Specs Database
            </h2>
            <p className="text-gray-500 mt-1 font-medium">
              Database PCD, Center Bore, dan spesifikasi ban OEM mobil Indonesia (
              {VEHICLES.length} model).
            </p>
          </div>

          <div className="flex gap-2 pb-2 overflow-x-auto scrollbar-none">
            {brands.map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => setSelectedBrandFilter(brand)}
                className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                  selectedBrandFilter === brand
                    ? "bg-[#3B82F6] text-white shadow-md shadow-blue-500/10"
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => setSelectedVehicleId(vehicle.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setSelectedVehicleId(vehicle.id);
                  }}
                  role="button"
                  tabIndex={0}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-44 overflow-hidden relative">
                      <SafeImage
                        src={vehicle.image}
                        alt={`${vehicle.brand} ${displayName(vehicle)}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width:768px) 100vw, 33vw"
                      />
                      <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded-md z-10">
                        {vehicle.bodyType}
                      </div>
                    </div>
                    <div className="p-5 space-y-2">
                      <h4 className="text-lg font-extrabold text-gray-900 dark:text-white group-hover:text-[#3B82F6] transition-colors">
                        {vehicle.brand} {displayName(vehicle)}
                      </h4>
                      <p className="text-xs text-gray-400 font-medium">
                        Years: {yearLabel(vehicle)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                        {vehicle.description}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 border-t border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20 flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-semibold">
                      PCD:{" "}
                      <strong className="text-gray-700 dark:text-gray-300">
                        {vehicle.pcd}
                      </strong>
                    </span>
                    <span className="text-[#3B82F6] font-bold flex items-center gap-1 group-hover:underline">
                      View Specs <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-900 p-12 text-center rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm text-gray-400 font-semibold">
              <BadgeInfo className="mx-auto text-gray-300 mb-4" size={48} />
              Tidak ada hasil untuk filter atau pencarian Anda.
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setSelectedVehicleId(null)}
              className="text-xs font-bold text-[#3B82F6] hover:underline flex items-center gap-1.5 self-start"
            >
              ← Back to Database Gallery
            </button>
            <div className="text-xs text-gray-400 font-semibold">
              Vehicle Database / {selectedVehicle.brand} /{" "}
              <span className="text-gray-750 dark:text-gray-300 font-bold">
                {displayName(selectedVehicle)}
              </span>
            </div>
          </div>

          <div className="relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-sm group">
            <SafeImage
              src={selectedVehicle.image}
              alt={`${selectedVehicle.brand} ${displayName(selectedVehicle)}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/35 to-transparent z-[1]" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full text-left space-y-3 z-[2]">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white font-bold text-xs border border-white/30">
                  {selectedVehicle.bodyType}
                </span>
                <span className="px-3 py-1 bg-[#3B82F6] rounded-full text-white font-bold text-xs">
                  {yearLabel(selectedVehicle)}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                {selectedVehicle.brand} {displayName(selectedVehicle)}
              </h2>
              <p className="text-gray-200 text-sm max-w-2xl leading-relaxed">
                {selectedVehicle.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8 space-y-6 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-[#3B82F6] flex items-center justify-center font-bold">
                  <BadgeInfo size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Factory Wheel Specifications
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "PCD", value: selectedVehicle.pcd },
                  {
                    label: "Center Bore",
                    value: `${selectedVehicle.centerBore}`,
                    unit: "mm",
                  },
                  { label: "Stock ET", value: `ET${selectedVehicle.stockOffset}` },
                  { label: "Nut Size", value: selectedVehicle.nutSize },
                ].map((cell) => (
                  <div
                    key={cell.label}
                    className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 text-center border border-gray-100 dark:border-gray-800"
                  >
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">
                      {cell.label}
                    </p>
                    <p className="text-lg font-extrabold text-gray-900 dark:text-white">
                      {cell.value}
                      {cell.unit && (
                        <span className="text-xs font-normal text-gray-400 ml-0.5">
                          {cell.unit}
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4">
                <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  OEM &amp; Compatible
                </h4>
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                    <span className="text-xs text-gray-700 dark:text-gray-300 font-bold">
                      OEM Tire
                    </span>
                    <span className="font-mono text-xs font-bold bg-white dark:bg-gray-900 text-[#3B82F6] border border-blue-100 dark:border-blue-900/50 px-3 py-1.5 rounded-lg">
                      {selectedVehicle.oemTire}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                    <span className="text-xs text-gray-700 dark:text-gray-300 font-bold">
                      OEM Wheel
                    </span>
                    <span className="font-mono text-xs font-bold bg-white dark:bg-gray-900 text-[#3B82F6] border border-blue-100 dark:border-blue-900/50 px-3 py-1.5 rounded-lg">
                      {selectedVehicle.oemWheel}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                    <span className="text-xs text-gray-700 dark:text-gray-300 font-bold">
                      Tekanan
                    </span>
                    <span className="font-mono text-xs font-bold px-3 py-1.5">
                      {selectedVehicle.tirePressure}
                    </span>
                  </div>
                </div>
                {selectedVehicle.compatibleTires.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {selectedVehicle.compatibleTires.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-semibold px-2 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Package size={16} className="text-[#3B82F6]" />
                    <h4 className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      Siap di OmahBan
                    </h4>
                  </div>
                  <Link
                    href={`/stok?q=${encodeURIComponent(selectedVehicle.oemTire)}`}
                    className="text-xs font-bold text-[#3B82F6] min-h-11 inline-flex items-center"
                  >
                    Lihat stok →
                  </Link>
                </div>
                {shopMatches.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Belum ada di snapshot stok — cek rak / refresh import
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {shopMatches.map((it) => (
                      <li
                        key={it.id}
                        className="flex min-h-12 flex-col gap-0.5 rounded-xl border border-gray-100 px-3 py-2 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <span className="text-sm font-bold text-gray-900 dark:text-white truncate">
                          {it.brand} {it.productName} · {it.sizeNormalized}
                        </span>
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 shrink-0">
                          Rp {it.sellPrice.toLocaleString("id-ID")}
                          {it.qty > 0 ? ` · sisa ${it.qty}` : " · Habis"}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 bg-gradient-to-br from-[#3B82F6] to-blue-700 rounded-3xl shadow-md p-6 text-white flex flex-col justify-between text-left relative overflow-hidden min-h-[300px]">
              <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                <Sparkles size={120} />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-extrabold text-base">
                  <Sparkles size={20} />
                  Upgrade Notes
                </div>
                <p className="text-xs leading-relaxed text-blue-50/90 font-medium relative z-10">
                  {selectedVehicle.upgradeNotes}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleAskAggressive(selectedVehicle)}
                className="mt-8 w-full py-3 bg-white text-[#3B82F6] hover:bg-blue-50 transition-colors rounded-xl text-xs font-bold shadow-md relative z-10"
              >
                Tanya AI soal fitment agresif
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
