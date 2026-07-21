"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });
const CounterView = dynamic(() => import("@/components/CounterView"), {
  ssr: false,
});

export default function CounterPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AppShell searchQuery={searchQuery} setSearchQuery={setSearchQuery}>
      <CounterView />
    </AppShell>
  );
}
