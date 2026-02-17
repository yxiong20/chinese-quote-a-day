import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system/legacy";
import * as Crypto from "expo-crypto";
import { toByteArray } from "base64-js";
import { GITHUB_SOURCE } from "../../config";
import type { Proverb, RemoteManifest } from "./types";

import bundled from "../../data/proverbs.bundled.json";

const STORAGE_KEYS = {
  cachedVersion: "proverbs.cached.version",
  cachedPath: "proverbs.cached.path",
};

const CACHE_FILE_NAME = "proverbs.cached.json";
const CACHE_TEMP_FILE_NAME = "proverbs.cached.tmp.json";

type GitHubContentResponse = {
  sha: string;
  content?: string;
  encoding?: "base64";
};

function encodeGitHubPath(path: string): string {
  return path
    .split("/")
    .filter((part) => part.length > 0)
    .map(encodeURIComponent)
    .join("/");
}

function decodeBase64ToUtf8(base64Text: string): string {
  const normalized = base64Text.replace(/\n/g, "");
  const bytes = toByteArray(normalized);
  let percentEncoded = "";
  for (const byte of bytes) {
    percentEncoded += `%${byte.toString(16).padStart(2, "0")}`;
  }
  return decodeURIComponent(percentEncoded);
}

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

  try {
    const text = await FileSystem.readAsStringAsync(path, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    const json = JSON.parse(text);
    return assertProverbsShape(json);
  } catch {
    return null;
  }
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

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return await res.text();
}

async function sha256Hex(text: string): Promise<string> {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    text
  );
}

async function fetchGitHubRepoText(path: string): Promise<{
  text: string;
  sha: string;
}> {
  const encodedPath = encodeGitHubPath(path);
  const ref = encodeURIComponent(GITHUB_SOURCE.ref);
  const url = `https://api.github.com/repos/${GITHUB_SOURCE.owner}/${GITHUB_SOURCE.repo}/contents/${encodedPath}?ref=${ref}`;
  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url}`);
  }

  const payload = (await res.json()) as GitHubContentResponse;
  if (!payload.content || payload.encoding !== "base64") {
    throw new Error(`Invalid GitHub contents response for ${path}`);
  }

  return {
    text: decodeBase64ToUtf8(payload.content),
    sha: payload.sha,
  };
}

async function resolveManifestAndDataUrl(): Promise<{
  manifest: RemoteManifest;
  dataUrl: string;
  manifestSha: string;
}> {
  const { text, sha } = await fetchGitHubRepoText(GITHUB_SOURCE.manifestPath);
  const manifest = JSON.parse(text) as RemoteManifest;
  const bundlePath = manifest.bundlePath;

  if (bundlePath && typeof bundlePath === "string") {
    const encodedPath = encodeGitHubPath(bundlePath);
    const encodedRef = encodeURIComponent(GITHUB_SOURCE.ref);
    return {
      manifest,
      dataUrl: `https://api.github.com/repos/${GITHUB_SOURCE.owner}/${GITHUB_SOURCE.repo}/contents/${encodedPath}?ref=${encodedRef}`,
      manifestSha: sha,
    };
  }

  if (manifest.dataUrl && typeof manifest.dataUrl === "string") {
    return { manifest, dataUrl: manifest.dataUrl, manifestSha: sha };
  }

  throw new Error("Invalid manifest format");
}

async function fetchProverbsFromDataUrl(dataUrl: string): Promise<{
  proverbs: Proverb[];
  contentSha256: string;
}> {
  if (dataUrl.startsWith("https://api.github.com/repos/")) {
    const res = await fetch(dataUrl, {
      method: "GET",
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${dataUrl}`);
    const payload = (await res.json()) as GitHubContentResponse;
    if (!payload.content || payload.encoding !== "base64") {
      throw new Error("Invalid GitHub bundle response");
    }
    const text = decodeBase64ToUtf8(payload.content);
    const json = JSON.parse(text);
    return {
      proverbs: assertProverbsShape(json),
      contentSha256: await sha256Hex(text),
    };
  }

  const text = await fetchText(dataUrl);
  const json = JSON.parse(text);
  return {
    proverbs: assertProverbsShape(json),
    contentSha256: await sha256Hex(text),
  };
}

/**
 * Checks remote manifest and updates cached dataset if a new version is available.
 * Safe to call on app start or pull-to-refresh.
 */
export async function tryRemoteUpdate(): Promise<
  | { updated: false; reason: string }
  | { updated: true; version: number | string; count: number }
> {
  if (!GITHUB_SOURCE.owner || !GITHUB_SOURCE.repo || !GITHUB_SOURCE.manifestPath) {
    return { updated: false, reason: "GitHub source not configured" };
  }

  try {
    const { manifest, dataUrl, manifestSha } = await resolveManifestAndDataUrl();

    if (
      (typeof manifest?.version !== "number" &&
        typeof manifest?.version !== "string") ||
      !dataUrl
    ) {
      return { updated: false, reason: "Invalid manifest format" };
    }

    const currentVersionStr = await AsyncStorage.getItem(
      STORAGE_KEYS.cachedVersion
    );
    const currentVersion = currentVersionStr ? currentVersionStr : "";
    const nextVersion = String(manifest.version);
    if (currentVersion && currentVersion === nextVersion) {
      return { updated: false, reason: "Already up to date" };
    }

    const { proverbs, contentSha256 } = await fetchProverbsFromDataUrl(dataUrl);

    if (manifest.sha256 && typeof manifest.sha256 === "string") {
      const expectedSha = manifest.sha256.trim().toLowerCase();
      const actualSha = contentSha256.trim().toLowerCase();
      if (expectedSha !== actualSha) {
        return { updated: false, reason: "Bundle SHA-256 mismatch" };
      }
    }

    const dir = FileSystem.documentDirectory;
    if (!dir) {
      return { updated: false, reason: "No documentDirectory available" };
    }

    const targetPath = dir + CACHE_FILE_NAME;
    const tempPath = dir + CACHE_TEMP_FILE_NAME;
    await FileSystem.writeAsStringAsync(tempPath, JSON.stringify(proverbs), {
      encoding: FileSystem.EncodingType.UTF8,
    });

    const existing = await FileSystem.getInfoAsync(targetPath);
    if (existing.exists) {
      await FileSystem.deleteAsync(targetPath, { idempotent: true });
    }
    await FileSystem.moveAsync({ from: tempPath, to: targetPath });

    const cacheFingerprint = contentSha256;

    await AsyncStorage.multiSet([
      [STORAGE_KEYS.cachedVersion, nextVersion],
      [STORAGE_KEYS.cachedPath, targetPath],
      ["proverbs.cached.manifestSha", manifestSha],
      ["proverbs.cached.fingerprint", cacheFingerprint],
    ]);

    return { updated: true, version: manifest.version, count: proverbs.length };
  } catch (error: any) {
    return {
      updated: false,
      reason: `Remote update unavailable: ${error?.message ?? String(error)}`,
    };
  }
}
