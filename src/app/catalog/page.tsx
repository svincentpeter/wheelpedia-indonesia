"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import type { SavedTireSpec } from "@/types";
import { writeJson } from "@/lib/browser-storage";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });
const MyCatalogView = dynamic(() => import("@/components/MyCatalogView"), {
  ssr: false,
});

const DEFAULT_VEHICLES = ["innova-zenix", "pajero-sport"];
const DEFAULT_SPECS: SavedTireSpec[] = [
  {
    id: "spec-1",
    name: "Innova Zenix OEM 18",
    width: 225,
    aspect: 50,
    construction: "R",
    rim: 18,
    dateSaved: "18 Jul 2026",
  },
  {
    id: "spec-2",
    name: "Avanza Veloz Ring 17",
    width: 205,
    aspect: 50,
    construction: "R",
    rim: 17,
    dateSaved: "17 Jul 2026",
  },
];

function CatalogPageContent() {
  const router = useRouter();

  const [savedVehicles, setSavedVehiclesState] = useState<string[]>(() => {
    if (typeof window === "undefined") return DEFAULT_VEHICLES;
    try {
      const raw = localStorage.getItem("savedVehicles");
      if (raw) return JSON.parse(raw) as string[];
    } catch {
      // ignore
    }
    return DEFAULT_VEHICLES;
  });

  const [savedSpecs, setSavedSpecsState] = useState<SavedTireSpec[]>(() => {
    if (typeof window === "undefined") return DEFAULT_SPECS;
    try {
      const raw = localStorage.getItem("savedSpecs");
      if (raw) return JSON.parse(raw) as SavedTireSpec[];
    } catch {
      // ignore
    }
    return DEFAULT_SPECS;
  });

  const setSavedVehicles = (vehicles: string[]) => {
    setSavedVehiclesState(vehicles);
    writeJson("savedVehicles", vehicles);
  };

  const setSavedSpecs = (specs: SavedTireSpec[]) => {
    setSavedSpecsState(specs);
    writeJson("savedSpecs", specs);
  };

  return (
    <AppShell>
      <MyCatalogView
        savedVehicles={savedVehicles}
        setSavedVehicles={setSavedVehicles}
        savedSpecs={savedSpecs}
        setSavedSpecs={setSavedSpecs}
        onVehicleClick={(vehicleId) => router.push(`/vehicles?id=${vehicleId}`)}
      />
    </AppShell>
  );
}

export default function CatalogPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-400 font-medium animate-pulse">
          Loading Catalog...
        </div>
      }
    >
      <CatalogPageContent />
    </Suspense>
  );
}
