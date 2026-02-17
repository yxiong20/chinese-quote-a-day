import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

const SEED_KEY = "install.seed.uint32";

function bytesToUint32LE(b: Uint8Array): number {
  return (
    (b[0] ?? 0) |
    ((b[1] ?? 0) << 8) |
    ((b[2] ?? 0) << 16) |
    ((b[3] ?? 0) << 24)
  ) >>> 0;
}

/**
 * Get or create a per-install random seed.
 * This ensures each user sees a different "random" proverb on the same date.
 */
export async function getOrCreateInstallSeed(): Promise<number> {
  const existing = await AsyncStorage.getItem(SEED_KEY);
  if (existing != null) {
    const n = Number(existing);
    if (Number.isFinite(n)) return (n >>> 0);
  }

  const bytes = await Crypto.getRandomBytesAsync(4);
  const seed = bytesToUint32LE(bytes);

  await AsyncStorage.setItem(SEED_KEY, String(seed));
  return seed;
}
