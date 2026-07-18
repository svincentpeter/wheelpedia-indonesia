"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import dynamic from "next/dynamic";

import { Suspense } from "react";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });
const VehicleDatabaseView = dynamic(() => import("@/components/VehicleDatabaseView"), { ssr: false });

function VehiclesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const selectedVehicleId = searchParams.get("id");

  const setSelectedVehicleId = (id: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) {
      params.set("id", id);
    } else {
      params.delete("id");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleNavigateToAssistant = (initialPrompt?: string) => {
    if (initialPrompt) {
      router.push(`/ai-assistant?prompt=${encodeURIComponent(initialPrompt)}`);
    } else {
      router.push("/ai-assistant");
    }
  };

  return (
    <AppShell searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
      <VehicleDatabaseView
        onNavigateToAssistant={handleNavigateToAssistant}
        searchQuery={searchQuery}
        selectedVehicleId={selectedVehicleId}
        setSelectedVehicleId={setSelectedVehicleId}
      />
    </AppShell>
  );
}

export default function VehiclesPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-400 font-medium animate-pulse">
        Loading Vehicle Database...
      </div>
    }>
      <VehiclesPageContent />
    </Suspense>
  );
}
