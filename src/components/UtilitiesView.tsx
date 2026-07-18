"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Calculator, Gauge, ArrowRight, Compass, ShieldAlert, Check, Sliders, Info } from "lucide-react";

export default function UtilitiesView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Tab state
  const [activeTab, setActiveTab] = useState<"tire" | "wheel">("tire");

  // Read tab parameter from URL on mount/change
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "wheel") {
      setActiveTab("wheel");
    } else {
      setActiveTab("tire");
    }
  }, [searchParams]);

  const handleTabChange = (tab: "tire" | "wheel") => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "wheel") {
      params.set("tab", "wheel");
    } else {
      params.delete("tab");
    }
    router.replace(`/calculators?${params.toString()}`);
  };

  // --- TIRE CALCULATOR STATE & MATH ---
  const [wA, setWA] = useState(185);
  const [aA, setAA] = useState(65);
  const [rA, setRA] = useState(15);

  const [wB, setWB] = useState(195);
  const [aB, setAB] = useState(60);
  const [rB, setRB] = useState(16);

  const getTireSpecs = (w: number, a: number, r: number) => {
    const sidewall = w * (a / 100);
    const rimMm = r * 25.4;
    const diameter = sidewall * 2 + rimMm;
    const circumference = diameter * Math.PI;
    const revsPerKm = 1000000 / circumference;
    return { sidewall, diameter, circumference, revsPerKm };
  };

  const specsA = getTireSpecs(wA, aA, rA);
  const specsB = getTireSpecs(wB, aB, rB);

  const diameterDiff = specsB.diameter - specsA.diameter;
  const percentDiff = (diameterDiff / specsA.diameter) * 100;
  const speedAt100 = 100 * (1 + percentDiff / 100);
  const isTireSafe = Math.abs(percentDiff) <= 3.0;

  // --- WHEEL CALCULATOR STATE & MATH ---
  const [widthA, setWidthA] = useState(7.0);  // inches
  const [offsetA, setOffsetA] = useState(45); // mm
  const [widthB, setWidthB] = useState(8.0);  // inches
  const [offsetB, setOffsetB] = useState(35); // mm
  const [wheelPcd, setWheelPcd] = useState("5x114.3");

  const calcWheelClearance = (w1: number, et1: number, w2: number, et2: number) => {
    const w1Mm = w1 * 25.4;
    const w2Mm = w2 * 25.4;
    // Poke (extension outwards)
    const poke = (w2Mm - w1Mm) / 2 + (et1 - et2);
    // Inset (loss of inner clearance closer to suspension)
    const inset = (w2Mm - w1Mm) / 2 + (et2 - et1);
    return { poke, inset };
  };

  const clearances = calcWheelClearance(widthA, offsetA, widthB, offsetB);
  // Safe limit: offset should not deviate by more than 15-20mm from OEM harian, 
  // and inner clearance shouldn't reduce by more than 10-15mm to avoid rubbing struts.
  const isWheelSafe = clearances.inset <= 12.0 && Math.abs(offsetA - offsetB) <= 20;

  return (
    <div className="space-y-8 animate-fade-in text-left">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-5">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Kalkulator Otomotif</h2>
          <p className="text-gray-500 mt-1 font-medium">Bandingkan ukuran ban dan kecocokan offset velg kustom Anda.</p>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1.5 rounded-xl border border-gray-200/30 self-start md:self-center font-bold text-xs">
          <button
            onClick={() => handleTabChange("tire")}
            className={`px-4.5 py-2.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "tire"
                ? "bg-white dark:bg-gray-900 text-[#3B82F6] shadow-sm"
                : "text-gray-500 hover:text-gray-850 dark:hover:text-gray-200"
            }`}
          >
            <Calculator size={14} />
            Tire Size Calculator
          </button>
          <button
            onClick={() => handleTabChange("wheel")}
            className={`px-4.5 py-2.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === "wheel"
                ? "bg-white dark:bg-gray-900 text-[#3B82F6] shadow-sm"
                : "text-gray-500 hover:text-gray-850 dark:hover:text-gray-200"
            }`}
          >
            <Sliders size={14} />
            Wheel Offset Calculator
          </button>
        </div>
      </div>

      {activeTab === "tire" ? (
        // --- TIRE SIZE CALCULATOR UI ---
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs flex items-center justify-center font-bold">A</span>
                  Ukuran Ban A (OEM / Saat Ini)
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-1">Lebar (mm)</label>
                    <input
                      type="number"
                      min="145"
                      max="335"
                      step="5"
                      value={wA}
                      onChange={(e) => setWA(Number(e.target.value))}
                      className="w-full text-xs font-mono font-bold p-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:border-[#3B82F6] rounded-xl focus:outline-none dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-1">Profil (%)</label>
                    <input
                      type="number"
                      min="25"
                      max="85"
                      step="5"
                      value={aA}
                      onChange={(e) => setAA(Number(e.target.value))}
                      className="w-full text-xs font-mono font-bold p-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:border-[#3B82F6] rounded-xl focus:outline-none dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-1">Velg (Ring)</label>
                    <input
                      type="number"
                      min="12"
                      max="22"
                      value={rA}
                      onChange={(e) => setRA(Number(e.target.value))}
                      className="w-full text-xs font-mono font-bold p-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:border-[#3B82F6] rounded-xl focus:outline-none dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100 dark:border-gray-800" />

              <div className="space-y-4">
                <h3 className="font-bold text-[#3B82F6] text-sm flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-[#3B82F6] text-xs flex items-center justify-center font-bold">B</span>
                  Ukuran Ban B (Baru / Rencana)
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-1">Lebar (mm)</label>
                    <input
                      type="number"
                      min="145"
                      max="335"
                      step="5"
                      value={wB}
                      onChange={(e) => setWB(Number(e.target.value))}
                      className="w-full text-xs font-mono font-bold p-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:border-[#3B82F6] rounded-xl focus:outline-none dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-1">Profil (%)</label>
                    <input
                      type="number"
                      min="25"
                      max="85"
                      step="5"
                      value={aB}
                      onChange={(e) => setAB(Number(e.target.value))}
                      className="w-full text-xs font-mono font-bold p-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:border-[#3B82F6] rounded-xl focus:outline-none dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-1">Velg (Ring)</label>
                    <input
                      type="number"
                      min="12"
                      max="22"
                      value={rB}
                      onChange={(e) => setRB(Number(e.target.value))}
                      className="w-full text-xs font-mono font-bold p-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:border-[#3B82F6] rounded-xl focus:outline-none dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border flex items-start gap-3.5 ${
              isTireSafe
                ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300"
                : "bg-amber-50/50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30 text-amber-800 dark:text-amber-300"
            }`}>
              {isTireSafe ? (
                <Check className="text-emerald-600 flex-shrink-0 mt-0.5" size={18} />
              ) : (
                <ShieldAlert className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
              )}
              <div className="text-xs font-medium space-y-1">
                <p className="font-bold">
                  {isTireSafe ? "Setup Aman (Di bawah batas ±3%)" : "Setup Berisiko (Melebihi batas ±3%)"}
                </p>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {isTireSafe
                    ? `Deviasi diameter ban baru sebesar ${percentDiff.toFixed(2)}% aman untuk harian dan sensor ABS / speedometer.`
                    : `Deviasi diameter ban baru sebesar ${percentDiff.toFixed(2)}% terlalu ekstrem. Berisiko sensor ABS kacau dan mentok fender.`}
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
              <h3 className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
                <Compass size={18} className="text-gray-400" />
                Spesifikasi Rinci Perbandingan
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-850/50 border border-gray-100 dark:border-gray-800 rounded-xl space-y-3">
                  <p className="text-xs font-bold text-gray-500 border-b border-gray-200/50 dark:border-gray-850 pb-1.5">Spesifikasi A</p>
                  <div className="space-y-2 font-semibold text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tinggi Dinding:</span>
                      <span className="text-gray-700 dark:text-gray-300">{specsA.sidewall.toFixed(1)} mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Diameter Total:</span>
                      <span className="text-gray-700 dark:text-gray-300">{specsA.diameter.toFixed(1)} mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Putaran / km:</span>
                      <span className="text-gray-700 dark:text-gray-300">{specsA.revsPerKm.toFixed(0)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50/20 dark:bg-blue-900/10 border border-blue-50 dark:border-blue-900/20 rounded-xl space-y-3">
                  <p className="text-xs font-bold text-[#3B82F6] border-b border-blue-100/30 dark:border-blue-900/25 pb-1.5">Spesifikasi B</p>
                  <div className="space-y-2 font-semibold text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tinggi Dinding:</span>
                      <span className="text-gray-700 dark:text-gray-300">{specsB.sidewall.toFixed(1)} mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Diameter Total:</span>
                      <span className="text-gray-700 dark:text-gray-300">{specsB.diameter.toFixed(1)} mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Putaran / km:</span>
                      <span className="text-gray-700 dark:text-gray-300">{specsB.revsPerKm.toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-gray-100 dark:border-gray-800 space-y-4">
                <h4 className="font-bold text-gray-900 dark:text-white text-xs flex items-center gap-1.5">
                  <Gauge size={16} className="text-gray-400" />
                  Deviasi Speedometer &amp; Tinggi Mobil
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-1">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Tinggi Mobil Berubah</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Ground clearance mobil akan {diameterDiff >= 0 ? "bertambah" : "berkurang"} sebesar{" "}
                      <strong className="text-gray-800 dark:text-white">{(Math.abs(diameterDiff) / 2).toFixed(1)} mm</strong>.
                    </p>
                  </div>
                  <div className="text-center p-4 bg-[#3B82F6]/5 dark:bg-[#3B82F6]/10 rounded-xl border border-[#3B82F6]/10 dark:border-blue-900/20">
                    <span className="text-3xl font-black text-[#3B82F6]">{speedAt100.toFixed(1)}</span>
                    <span className="text-xs font-extrabold text-[#3B82F6] ml-1">km/h</span>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                      Rill pada speedometer 100
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // --- WHEEL CALCULATOR UI ---
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs flex items-center justify-center font-bold">A</span>
                  Spesifikasi Velg A (OEM)
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-1">Lebar Velg (inch)</label>
                    <input
                      type="number"
                      min="5.0"
                      max="12.0"
                      step="0.5"
                      value={widthA}
                      onChange={(e) => setWidthA(Number(e.target.value))}
                      className="w-full text-xs font-mono font-bold p-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:border-[#3B82F6] rounded-xl focus:outline-none dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-1">Offset (ET)</label>
                    <input
                      type="number"
                      min="10"
                      max="60"
                      value={offsetA}
                      onChange={(e) => setOffsetA(Number(e.target.value))}
                      className="w-full text-xs font-mono font-bold p-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:border-[#3B82F6] rounded-xl focus:outline-none dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100 dark:border-gray-800" />

              <div className="space-y-4">
                <h3 className="font-bold text-[#3B82F6] text-sm flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-[#3B82F6] text-xs flex items-center justify-center font-bold">B</span>
                  Spesifikasi Velg B (Kustom)
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-1">Lebar Velg (inch)</label>
                    <input
                      type="number"
                      min="5.0"
                      max="12.0"
                      step="0.5"
                      value={widthB}
                      onChange={(e) => setWidthB(Number(e.target.value))}
                      className="w-full text-xs font-mono font-bold p-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:border-[#3B82F6] rounded-xl focus:outline-none dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-1">Offset (ET)</label>
                    <input
                      type="number"
                      min="10"
                      max="60"
                      value={offsetB}
                      onChange={(e) => setOffsetB(Number(e.target.value))}
                      className="w-full text-xs font-mono font-bold p-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:border-[#3B82F6] rounded-xl focus:outline-none dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-1">PCD / Bolt Pattern</label>
                <select
                  value={wheelPcd}
                  onChange={(e) => setWheelPcd(e.target.value)}
                  className="w-full text-xs font-bold p-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 focus:bg-white dark:focus:bg-gray-900 focus:border-[#3B82F6] rounded-xl focus:outline-none dark:text-white"
                >
                  <option value="4x100">4x100 (Agya, Yaris, Jazz)</option>
                  <option value="5x114.3">5x114.3 (Innova, Civic, HRV)</option>
                  <option value="5x139.7">5x139.7 (Jimny, Taft)</option>
                  <option value="6x139.7">6x139.7 (Fortuner, Pajero Sport)</option>
                </select>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border flex items-start gap-3.5 ${
              isWheelSafe
                ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300"
                : "bg-amber-50/50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/30 text-amber-800 dark:text-amber-300"
            }`}>
              {isWheelSafe ? (
                <Check className="text-emerald-600 flex-shrink-0 mt-0.5" size={18} />
              ) : (
                <ShieldAlert className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
              )}
              <div className="text-xs font-medium space-y-1">
                <p className="font-bold">
                  {isWheelSafe ? "Fitment Aman" : "Perhatian Khusus Diperlukan"}
                </p>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {isWheelSafe
                    ? `Pergeseran ruang dalam roda sebesar ${clearances.inset.toFixed(1)} mm aman dari gesekan suspensi strut.`
                    : `Suspensi berisiko tergesek! Ruang dalam berkurang ${clearances.inset.toFixed(1)} mm. Kami sarankan menambah Hub Ring/Spacer.`}
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-6">
              <h3 className="font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
                <Compass size={18} className="text-gray-400" />
                Analisis Posisi Fitment Velg
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-blue-50/15 dark:bg-blue-900/5 border border-blue-50 dark:border-blue-900/10 rounded-xl space-y-1.5 text-center">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Sisi Luar (Poke)</span>
                  <span className="text-2xl font-black text-[#3B82F6] block">
                    {clearances.poke >= 0 ? "+" : ""}{clearances.poke.toFixed(1)} mm
                  </span>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed font-semibold">
                    {clearances.poke >= 0
                      ? "Velg menonjol keluar lebih dekat ke bibir fender."
                      : "Velg masuk lebih dalam ke dalam ruang fender."}
                  </p>
                </div>

                <div className="p-5 bg-gray-55/40 dark:bg-gray-850/30 border border-gray-100 dark:border-gray-800 rounded-xl space-y-1.5 text-center">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Sisi Dalam (Suspensi)</span>
                  <span className="text-2xl font-black text-gray-700 dark:text-gray-300 block">
                    {clearances.inset >= 0 ? "+" : ""}{clearances.inset.toFixed(1)} mm
                  </span>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed font-semibold">
                    {clearances.inset >= 0
                      ? "Ruang dalam menyempit (mendekati suspensi)."
                      : "Ruang dalam melebar (menjauhi suspensi)."}
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl border border-gray-100 dark:border-gray-800 space-y-3 text-xs leading-relaxed text-gray-650 dark:text-gray-400">
                <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <Info size={15} className="text-[#3B82F6]" />
                  Rekomendasi Ahli Wheelpedia
                </h4>
                <ul className="list-disc pl-5 space-y-1 font-medium">
                  <li>
                    Dengan lebar velg kustom <strong>{widthB} inch</strong> dan offset <strong>ET {offsetB}</strong>, velg kustom Anda akan menonjol keluar sebanyak <strong>{Math.abs(clearances.poke).toFixed(1)} mm</strong> dibandingkan velg OEM.
                  </li>
                  {clearances.poke > 15 && (
                    <li className="text-amber-600 dark:text-amber-400 font-bold">
                      Bibir velg tergolong sangat agresif. Pertimbangkan memotong/melipat fender dalam atau menggunakan ban stretch/narik agar tidak gesrot saat diisi muatan penuh.
                    </li>
                  )}
                  {clearances.inset > 10 && (
                    <li className="text-red-500 font-bold">
                      Jarak velg ke suspensi berkurang signifikan. Pastikan ada celah minimal 8-10 mm agar aman dari gesekan coilover / spring strut.
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
