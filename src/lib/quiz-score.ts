const KEY = "wheelpedia_quiz_stats";

export type QuizStats = {
  attempts: number;
  bestScore: number;
  lastScore: number;
  lastTotal: number;
  history: { date: string; score: number; total: number }[];
};

const empty = (): QuizStats => ({
  attempts: 0,
  bestScore: 0,
  lastScore: 0,
  lastTotal: 0,
  history: [],
});

export function readQuizStats(): QuizStats {
  if (typeof window === "undefined") return empty();
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as QuizStats;
  } catch {
    // ignore
  }
  return empty();
}

export function recordQuizResult(score: number, total: number): QuizStats {
  const prev = readQuizStats();
  const next: QuizStats = {
    attempts: prev.attempts + 1,
    bestScore: Math.max(prev.bestScore, score),
    lastScore: score,
    lastTotal: total,
    history: [
      { date: new Date().toISOString(), score, total },
      ...prev.history,
    ].slice(0, 20),
  };
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
