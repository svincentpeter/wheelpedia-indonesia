"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function QuizPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/learning?tab=quiz");
  }, [router]);
  return (
    <div className="flex h-screen items-center justify-center bg-tokobg text-sm text-tokomuted">
      Mengalihkan ke Belajar & Quiz…
    </div>
  );
}
