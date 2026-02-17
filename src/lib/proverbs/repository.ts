import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { REMOTE_MANIFEST_URL } from "../../config";
import type { Proverb, RemoteManifest } from "./types";

import bundled from "../../data/proverbs.bundled.json";

const STORAGE_KEYS = {
  cachedVersion: "proverbs.cached.version",
  cachedPath: "proverbs.cached.path",
};

const CACHE_FILE_NAME = "proverbs.cached.json";

function assertProverbsShape(data: any): Proverb[] {
  if (!Array.isArray(data)) throw new Error("Proverbs JSON must be an array");
  for (const item of data) {
    if (!item || typeof item !== "object") throw new Error("Invalid proverb item");
    if (typeof item.id !== "string") throw new Error("Proverb missing id");
    if (typeof item.zh !== "string") throw new Error("Proverb missing zh");
    if (typeof item.en !== "string") throw new Error("Proverb missing en");
    if (typeof item.origin !== "string") throw new Error("Proverb missing origin");
  }
  return data as Proverb[];
}

async function readCachedIfExists(): Promise<Proverb[] | null> {
  const path = await AsyncStorage.getItem(STORAGE_KEYS.cachedPath);
  if (!path) return null;

  const info = await FileSystem.getInfoAsync(path);
  if (!info.exists) return null;

  const text = await FileSystem.readAsStringAsync(path, {
    encoding: FileSystem.EncodingType.UTF8,
  });
  const json = JSON.parse(text);
  return assertProverbsShape(json);
}

export async function loadProverbs(): Promise<{
  proverbs: Proverb[];
  source: "bundled" | "cached";
}> {
  const cached = await readCachedIfExists();
  if (cached?.length) return { proverbs: cached, source: "cached" };

  const parsed = assertProverbsShape(bundled);
  return { proverbs: parsed, source: "bundled" };
}

async function fetchJson(url: string): Promise<any> {
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return await res.json();
}

/**
 * Checks remote manifest and updates cached dataset if a new version is available.
 * Safe to call on app start or pull-to-refresh.
 */
export async function tryRemoteUpdate(): Promise<
  | { updated: false; reason: string }
  | { updated: true; version: number; count: number }
> {
  if (!REMOTE_MANIFEST_URL) {
    return { updated: false, reason: "REMOTE_MANIFEST_URL not set" };
  }

  const manifest = (await fetchJson(REMOTE_MANIFEST_URL)) as RemoteManifest;
  if (
    typeof manifest?.version !== "number" ||
    typeof manifest?.dataUrl !== "string"
  ) {
    return { updated: false, reason: "Invalid manifest format" };
  }

  const currentVersionStr = await AsyncStorage.getItem(
    STORAGE_KEYS.cachedVersion
  );
  const currentVersion = currentVersionStr ? Number(currentVersionStr) : 0;

  if (Number.isFinite(currentVersion) && manifest.version <= currentVersion) {
    return { updated: false, reason: "Already up to date" };
  }

  const proverbsRaw = await fetchJson(manifest.dataUrl);
  const proverbs = assertProverbsShape(proverbsRaw);

  const dir = FileSystem.documentDirectory;
  if (!dir) {
    return { updated: false, reason: "No documentDirectory available" };
  }

  const targetPath = dir + CACHE_FILE_NAME;
  await FileSystem.writeAsStringAsync(targetPath, JSON.stringify(proverbs), {
    encoding: FileSystem.EncodingType.UTF8,
  });

  await AsyncStorage.multiSet([
    [STORAGE_KEYS.cachedVersion, String(manifest.version)],
    [STORAGE_KEYS.cachedPath, targetPath],
  ]);

  return { updated: true, version: manifest.version, count: proverbs.length };
}
