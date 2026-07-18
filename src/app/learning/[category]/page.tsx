"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { getModulesByCategory, LEARNING_MODULES } from "@/data/learning";
import { renderMarkdown } from "@/lib/utils";

const AppShell = dynamic(() => import("@/components/AppShell"), { ssr: false });

const diffColor: Record<string, string> = {
  beginner: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  intermediate: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  advanced: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function LearningCategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const modules = getModulesByCategory(category);

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 capitalize">Belajar {category}</h1>
        {modules.length === 0 ? (
          <p className="text-gray-500">Belum ada materi untuk kategori ini</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {modules.map((mod) => (
              <div key={mod.id} className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800">
                <span className={`text-xs px-2 py-0.5 rounded-full ${diffColor[mod.difficulty]}`}>{mod.difficulty}</span>
                <h3 className="font-semibold mt-2 mb-1">{mod.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{mod.description}</p>
                <p className="text-xs text-gray-500">{mod.sections.length} bagian • {mod.duration}</p>
                {mod.sections.map((s, i) => (
                  <div key={i} className="mt-3 p-4 bg-gray-50 dark:bg-gray-850 border border-gray-100 dark:border-gray-800 rounded-xl space-y-2 text-left">
                    <h4 className="font-extrabold text-sm mb-1 text-gray-900 dark:text-white">{s.title}</h4>
                    <div className="text-xs text-gray-650 dark:text-gray-400 space-y-1.5">
                      {renderMarkdown(s.content)}
                    </div>
                  </div>
                ))}
                {mod.quiz && mod.quiz.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-sm mb-2">Quiz ({mod.quiz.length} soal)</h4>
                    {mod.quiz.map((q, i) => (
                      <div key={q.id} className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-2">
                        <p className="text-sm font-medium">{i + 1}. {q.question}</p>
                        <div className="mt-1 space-y-1">
                          {q.options.map((opt, j) => (
                            <div key={j} className="text-xs text-gray-600 dark:text-gray-400">{String.fromCharCode(65 + j)}. {opt}</div>
                          ))}
                        </div>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">Jawaban: {String.fromCharCode(65 + q.correctIndex)} - {q.explanation}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
