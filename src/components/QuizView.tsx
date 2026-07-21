"use client";

import { useMemo, useState } from "react";
import { Award, Check, RefreshCw, X, HelpCircle } from "lucide-react";
import { pickRandomQuestions, type QuizQuestion } from "@/data/quiz";
import { readQuizStats, recordQuizResult, type QuizStats } from "@/lib/quiz-score";

const ROUND_SIZE = 10;

export default function QuizView() {
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    pickRandomQuestions(ROUND_SIZE),
  );
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [stats, setStats] = useState<QuizStats>(() => readQuizStats());

  const current = questions[index];
  const progress = useMemo(
    () => `${Math.min(index + 1, questions.length)} / ${questions.length}`,
    [index, questions.length],
  );

  const handleSelect = (choiceIndex: number) => {
    if (selected !== null || !current) return;
    setSelected(choiceIndex);
    if (choiceIndex === current.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (selected === null || !current) return;
    if (index + 1 >= questions.length) {
      setStats(recordQuizResult(score, questions.length));
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  };

  const handleRestart = () => {
    setQuestions(pickRandomQuestions(ROUND_SIZE));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setStats(readQuizStats());
  };

  if (done) {
    return (
      <div className="max-w-xl mx-auto space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 text-center space-y-4">
          <Award className="mx-auto text-[#3B82F6]" size={40} />
          <h2 className="text-2xl font-extrabold">Selesai!</h2>
          <p className="text-lg font-bold text-[#3B82F6]">
            Skor: {score} / {questions.length}
          </p>
          <p className="text-sm text-gray-500">
            Percobaan: {stats.attempts} · Best: {stats.bestScore}
          </p>
          <button
            type="button"
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#3B82F6] text-white rounded-xl text-sm font-bold"
          >
            <RefreshCw size={16} /> Main lagi
          </button>
        </div>
      </div>
    );
  }

  if (!current) {
    return <p className="text-center text-gray-500">Bank soal kosong.</p>;
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <HelpCircle className="text-[#3B82F6]" /> Quiz Acak
          </h1>
          <p className="text-sm text-gray-500">
            Soal {progress} · Skor sementara {score}
          </p>
        </div>
        <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-50 text-[#3B82F6] dark:bg-blue-900/30">
          {current.category}
        </span>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-4">
        <p className="font-bold text-gray-900 dark:text-white text-base leading-relaxed">
          {current.prompt}
        </p>
        <div className="space-y-2">
          {current.choices.map((choice, i) => {
            let style =
              "border-gray-200 dark:border-gray-700 hover:border-[#3B82F6]";
            if (selected !== null) {
              if (i === current.correctIndex)
                style = "border-green-500 bg-green-50 dark:bg-green-900/20";
              else if (i === selected)
                style = "border-red-400 bg-red-50 dark:bg-red-900/20";
              else style = "border-gray-100 opacity-60";
            }
            return (
              <button
                key={i}
                type="button"
                disabled={selected !== null}
                onClick={() => handleSelect(i)}
                className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${style}`}
              >
                <span className="inline-flex items-center gap-2">
                  {selected !== null && i === current.correctIndex && (
                    <Check size={14} className="text-green-600" />
                  )}
                  {selected !== null &&
                    i === selected &&
                    i !== current.correctIndex && (
                      <X size={14} className="text-red-500" />
                    )}
                  {choice}
                </span>
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
            <strong>Penjelasan:</strong> {current.explanation}
          </div>
        )}

        <button
          type="button"
          disabled={selected === null}
          onClick={handleNext}
          className="w-full py-3 rounded-xl bg-[#3B82F6] text-white font-bold text-sm disabled:opacity-40"
        >
          {index + 1 >= questions.length ? "Lihat hasil" : "Soal berikutnya"}
        </button>
      </div>

      {stats.attempts > 0 && (
        <p className="text-xs text-center text-gray-400">
          Last: {stats.lastScore}/{stats.lastTotal} · Best ever: {stats.bestScore}
        </p>
      )}
    </div>
  );
}
