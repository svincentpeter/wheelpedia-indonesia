/** Lazy localStorage helpers that avoid setState-in-effect lint traps. */

export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

/** useState lazy initializer: runs once on client mount path. */
export function lazyStorageState<T>(key: string, fallback: T): () => T {
  return () => readJson(key, fallback);
}
