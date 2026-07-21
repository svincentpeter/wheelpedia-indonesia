"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Heart, Car, ArrowRight } from "lucide-react";
import { VEHICLES } from "@/data/vehicles";
import { SafeImage } from "@/components/SafeImage";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });

function readSavedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("savedVehicles");
    if (raw) return JSON.parse(raw) as string[];
  } catch {
    // ignore
  }
  return [];
}

export default function BookmarksPage() {
  const [ids, setIds] = useState<string[]>(() => readSavedIds());

  const vehicles = useMemo(
    () => VEHICLES.filter((v) => ids.includes(v.id)),
    [ids],
  );

  const remove = (id: string) => {
    const next = ids.filter((x) => x !== id);
    setIds(next);
    localStorage.setItem("savedVehicles", JSON.stringify(next));
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Heart className="text-rose-500" /> Bookmark Mobil
          </h1>
          <p className="text-sm text-gray-500">
            Disimpan di browser (localStorage) — {vehicles.length} mobil
          </p>
        </div>

        {vehicles.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-xl p-12 border border-gray-200 dark:border-gray-800 text-center">
            <Car className="mx-auto mb-4 text-gray-300" size={40} />
            <p className="text-gray-500">Belum ada bookmark</p>
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-1 mt-3 text-sm font-bold text-[#3B82F6]"
            >
              Buka Database Mobil <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vehicles.map((v) => (
              <div
                key={v.id}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
              >
                <div className="h-36 relative">
                  <SafeImage
                    src={v.image}
                    alt={`${v.brand} ${v.model}`}
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                </div>
                <div className="p-4 flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-bold">
                      {v.brand} {v.model} {v.generation}
                    </h3>
                    <p className="text-xs text-gray-500">
                      PCD {v.pcd} · OEM {v.oemTire}
                    </p>
                    <Link
                      href={`/vehicles?id=${v.id}`}
                      className="text-xs font-bold text-[#3B82F6] inline-flex items-center gap-1 mt-2"
                    >
                      Detail <ArrowRight size={12} />
                    </Link>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(v.id)}
                    className="text-xs text-red-500 font-semibold"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
