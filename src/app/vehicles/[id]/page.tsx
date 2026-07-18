"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { getVehicleById } from "@/data/vehicles";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });

export default function VehicleDetailPage() {
  const params = useParams();
  const vehicle = getVehicleById(params.id as string);

  if (!vehicle) {
    return (
      <AppShell>
        <div className="text-center py-20">
          <p className="text-gray-500">Mobil tidak ditemukan</p>
          <Link href="/vehicles" className="text-blue-600 hover:underline mt-2 block">← Kembali</Link>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <Link href="/vehicles" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4"><ArrowLeft size={16} /> Kembali</Link>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">{vehicle.brand}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">{vehicle.bodyType}</span>
          </div>
          <h1 className="text-3xl font-bold mb-1">{vehicle.model}</h1>
          <p className="text-gray-500">{vehicle.generation} ({vehicle.yearStart}-{vehicle.yearEnd || "sekarang"})</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{vehicle.description}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
            <h2 className="font-semibold text-lg mb-4">Spesifikasi Standar</h2>
            <div className="space-y-3 text-sm">
              {[["Engine", vehicle.engine], ["OEM Ban", vehicle.oemTire], ["OEM Velg", vehicle.oemWheel], ["PCD", vehicle.pcd], ["Center Bore", `${vehicle.centerBore}mm`], ["Offset", `ET +${vehicle.stockOffset}`], ["Nut Size", vehicle.nutSize], ["Tekanan Ban", vehicle.tirePressure]].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                  <span className="text-gray-500">{k}</span>
                  <span className="font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <h2 className="font-semibold text-lg mb-3">Ban Kompatibel</h2>
              <div className="space-y-1">
                {vehicle.compatibleTires.map((t, i) => (
                  <span key={i} className="inline-block text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 mr-2 mb-2">{t}</span>
                ))}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
              <h2 className="font-semibold text-lg mb-3">Velg Kompatibel</h2>
              <div className="space-y-1">
                {vehicle.compatibleWheels.map((w, i) => (
                  <span key={i} className="inline-block text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 mr-2 mb-2">{w}</span>
                ))}
              </div>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
              <h2 className="font-semibold text-lg mb-2">💡 Tips Upgrade</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">{vehicle.upgradeNotes}</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
