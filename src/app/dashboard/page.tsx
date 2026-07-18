"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });
const DashboardView = dynamic(() => import("@/components/DashboardView"), { ssr: false });

export default function DashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleModuleClick = (moduleId: string) => {
    router.push("/learning");
  };

  const handleVehicleClick = (vehicleId: string) => {
    router.push(`/vehicles?id=${vehicleId}`);
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
      <DashboardView
        onModuleClick={handleModuleClick}
        onVehicleClick={handleVehicleClick}
        onNavigateToAssistant={handleNavigateToAssistant}
      />
    </AppShell>
  );
}
