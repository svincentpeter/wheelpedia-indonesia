import bank from "./quiz-bank.json";

export type QuizQuestion = {
  readonly id: string;
  readonly category: string;
  readonly prompt: string;
  readonly choices: readonly string[];
  readonly correctIndex: number;
  readonly explanation: string;
};

export const QUIZ_BANK = bank as QuizQuestion[];

export function pickRandomQuestions(n: number): QuizQuestion[] {
  const copy = [...QUIZ_BANK];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, Math.min(n, copy.length));
}
