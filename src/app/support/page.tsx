"use client";

import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });
const SupportView = dynamic(() => import("@/components/SupportView"), { ssr: false });

export default function SupportPage() {
  return (
    <AppShell>
      <SupportView />
    </AppShell>
  );
}
