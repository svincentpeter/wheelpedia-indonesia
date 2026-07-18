"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { TIRE_SIZES, getTireSizeInfo } from "@/data/tires";
import { calcOverallDiameter, calcSpeedError } from "@/lib/calculators";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });

export default function ComparisonPage() {
  const [size1, setSize1] = useState("185/65 R15");
  const [size2, setSize2] = useState("195/55 R16");

  const info1 = getTireSizeInfo(size1);
  const info2 = getTireSizeInfo(size2);

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Perbandingan Ukuran Ban</h1>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Ban 1</label>
            <select value={size1} onChange={(e) => setSize1(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700">
              {TIRE_SIZES.map((t) => <option key={t.id} value={t.size}>{t.size}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Ban 2</label>
            <select value={size2} onChange={(e) => setSize2(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700">
              {TIRE_SIZES.map((t) => <option key={t.id} value={t.size}>{t.size}</option>)}
            </select>
          </div>
        </div>
        {info1 && info2 && (
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr><th className="p-3 text-left">Spesifikasi</th><th className="p-3 text-center">{size1}</th><th className="p-3 text-center">{size2}</th><th className="p-3 text-center">Selisih</th></tr>
              </thead>
              <tbody>
                {[
                  ["Lebar (mm)", info1.width, info2.width],
                  ["Profil (%)", info1.profile, info2.profile],
                  ["Rim (inch)", info1.rim, info2.rim],
                  ["Diameter Luar (mm)", info1.overallDiameter.toFixed(1), info2.overallDiameter.toFixed(1)],
                  ["Sidewall (mm)", info1.sidewallHeight.toFixed(1), info2.sidewallHeight.toFixed(1)],
                ].map(([label, v1, v2], i) => (
                  <tr key={i} className="border-t dark:border-gray-800">
                    <td className="p-3 font-medium">{label}</td>
                    <td className="p-3 text-center">{v1}</td>
                    <td className="p-3 text-center">{v2}</td>
                    <td className="p-3 text-center text-gray-500">
                      {typeof v1 === "number" && typeof v2 === "number" ? (v2 - v1).toFixed(1) : "-"}
                    </td>
                  </tr>
                ))}
                <tr className="border-t dark:border-gray-800">
                  <td className="p-3 font-medium">Speed Error</td>
                  <td colSpan={3} className="p-3 text-center">
                    <span className={Math.abs(calcSpeedError(info1.overallDiameter, info2.overallDiameter)) < 3 ? "text-green-600" : "text-red-600"}>
                      {calcSpeedError(info1.overallDiameter, info2.overallDiameter).toFixed(2)}%
                      {Math.abs(calcSpeedError(info1.overallDiameter, info2.overallDiameter)) < 3 ? " ✅ Aman" : " ⚠️ Perlu perhatian"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppShell>
  );
}
