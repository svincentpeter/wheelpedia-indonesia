"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });
const LearningView = dynamic(() => import("@/components/LearningView"), {
  ssr: false,
});

function LearningContent() {
  const router = useRouter();

  const handleNavigateToAssistant = (initialPrompt?: string) => {
    if (initialPrompt) {
      router.push(`/ai-assistant?prompt=${encodeURIComponent(initialPrompt)}`);
    } else {
      router.push("/ai-assistant");
    }
  };

  return (
    <AppShell>
      <LearningView
        onNavigateToAssistant={handleNavigateToAssistant}
        onBackToDashboard={() => router.push("/dashboard")}
      />
    </AppShell>
  );
}

export default function LearningPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-tokobg text-tokomuted text-sm">
          Memuat belajar…
        </div>
      }
    >
      <LearningContent />
    </Suspense>
  );
}
