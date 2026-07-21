"use client";

import { Suspense, useState } from "react";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });
const ShopStockView = dynamic(() => import("@/components/ShopStockView"), {
  ssr: false,
});

function StokContent() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <AppShell searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
      <ShopStockView />
    </AppShell>
  );
}

export default function StokPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-gray-50 text-gray-400 dark:bg-gray-950">
          Loading stok…
        </div>
      }
    >
      <StokContent />
    </Suspense>
  );
}
