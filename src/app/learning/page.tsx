"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });
const LearningView = dynamic(() => import("@/components/LearningView"), { ssr: false });

export default function LearningPage() {
  const router = useRouter();

  const handleNavigateToAssistant = (initialPrompt?: string) => {
    if (initialPrompt) {
      router.push(`/ai-assistant?prompt=${encodeURIComponent(initialPrompt)}`);
    } else {
      router.push("/ai-assistant");
    }
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <AppShell>
      <LearningView
        onNavigateToAssistant={handleNavigateToAssistant}
        onBackToDashboard={handleBackToDashboard}
      />
    </AppShell>
  );
}
