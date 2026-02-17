import type { Proverb } from "./proverbs/types";

function hashStringToUint32(input: string): number {
  // FNV-1a 32-bit hash
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function localDateKey(d = new Date()): string {
  // Local date in YYYY-MM-DD format
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function stableOrder(proverbs: Proverb[]): Proverb[] {
  // Keep selection stable even if remote data changes order
  return [...proverbs].sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Pick today's proverb deterministically based on:
 * - Local date (same proverb all day)
 * - Per-install seed (different for each user)
 */
export function pickDailyProverb(
  proverbs: Proverb[],
  opts: { dateKey: string; installSeed: number }
): Proverb | null {
  if (!proverbs.length) return null;

  const ordered = stableOrder(proverbs);
  const seed = hashStringToUint32(`${opts.dateKey}#${opts.installSeed}`) >>> 0;
  const rnd = mulberry32(seed)();
  const idx = Math.floor(rnd * ordered.length);
  return ordered[idx] ?? ordered[0] ?? null;
}
