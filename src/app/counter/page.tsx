"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });
const CounterView = dynamic(() => import("@/components/CounterView"), {
  ssr: false,
});

function CounterContent() {
  return (
    <AppShell>
      <CounterView />
    </AppShell>
  );
}

export default function CounterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-tokobg text-tokomuted text-sm">
          Memuat counter…
        </div>
      }
    >
      <CounterContent />
    </Suspense>
  );
}
