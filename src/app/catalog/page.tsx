"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { SavedTireSpec } from "@/types";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });
const MyCatalogView = dynamic(() => import("@/components/MyCatalogView"), { ssr: false });

function CatalogPageContent() {
  const router = useRouter();

  // Local storage state with preseeded fallback values
  const [savedVehicles, setSavedVehiclesState] = useState<string[]>([]);
  const [savedSpecs, setSavedSpecsState] = useState<SavedTireSpec[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const localVehicles = localStorage.getItem("savedVehicles");
    const localSpecs = localStorage.getItem("savedSpecs");

    if (localVehicles) {
      setSavedVehiclesState(JSON.parse(localVehicles));
    } else {
      setSavedVehiclesState(["innova-zenix", "pajero-sport"]);
    }

    if (localSpecs) {
      setSavedSpecsState(JSON.parse(localSpecs));
    } else {
      setSavedSpecsState([
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
      ]);
    }
    setLoaded(true);
  }, []);

  const setSavedVehicles = (vehicles: string[]) => {
    setSavedVehiclesState(vehicles);
    localStorage.setItem("savedVehicles", JSON.stringify(vehicles));
  };

  const setSavedSpecs = (specs: SavedTireSpec[]) => {
    setSavedSpecsState(specs);
    localStorage.setItem("savedSpecs", JSON.stringify(specs));
  };

  const handleVehicleClick = (vehicleId: string) => {
    router.push(`/vehicles?id=${vehicleId}`);
  };

  return (
    <AppShell>
      {loaded && (
        <MyCatalogView
          savedVehicles={savedVehicles}
          setSavedVehicles={setSavedVehicles}
          savedSpecs={savedSpecs}
          setSavedSpecs={setSavedSpecs}
          onVehicleClick={handleVehicleClick}
        />
      )}
    </AppShell>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-400 font-medium animate-pulse">
        Loading Catalog...
      </div>
    }>
      <CatalogPageContent />
    </Suspense>
  );
}
