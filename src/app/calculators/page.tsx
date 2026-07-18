"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });
const UtilitiesView = dynamic(() => import("@/components/UtilitiesView"), { ssr: false });

function CalculatorsPageContent() {
  return (
    <AppShell>
      <UtilitiesView />
    </AppShell>
  );
}

export default function CalculatorsPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-400 font-medium animate-pulse">
        Loading Calculators...
      </div>
    }>
      <CalculatorsPageContent />
    </Suspense>
  );
}
