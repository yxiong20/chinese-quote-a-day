import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_NAME } from "../config";
import { getOrCreateInstallSeed } from "../lib/seed";
import { loadProverbs, tryRemoteUpdate } from "../lib/proverbs/repository";
import type { Proverb } from "../lib/proverbs/types";
import ProverbCard from "../ui/ProverbCard";
import { getColorScheme } from "../lib/colors";

const REMOTE_UPDATE_LAST_CHECK_KEY = "proverbs.remote.lastCheckAt";
const REMOTE_UPDATE_MIN_DELAY_MS = 30_000;
const REMOTE_UPDATE_MAX_DELAY_MS = 5 * 60_000;
const REMOTE_UPDATE_COOLDOWN_MS = 12 * 60 * 60_000;

type LoadState =
  | { status: "loading" }
  | {
      status: "ready";
      proverbs: Proverb[];
      source: "bundled" | "cached";
      installSeed: number;
    }
  | { status: "error"; message: string };

export default function HomeScreen() {
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [updateMsg, setUpdateMsg] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentProverb = useMemo(() => {
    if (state.status !== "ready" || !state.proverbs.length) return null;
    const sorted = [...state.proverbs].sort((a, b) => a.id.localeCompare(b.id));
    return sorted[currentIndex % sorted.length] ?? null;
  }, [state, currentIndex]);

  const colorScheme = useMemo(() => {
    if (state.status !== "ready") return getColorScheme(0);
    // Use index-based color selection for variety
    return getColorScheme(currentIndex);
  }, [state, currentIndex]);

  async function loadLocalData(resetIndex = false) {
    if (resetIndex) setCurrentIndex(0);
    try {
      const installSeed = await getOrCreateInstallSeed();
      const loaded = await loadProverbs();
      setState({ status: "ready", ...loaded, installSeed });
    } catch (e: any) {
      setState({ status: "error", message: e?.message ?? String(e) });
    }
  }

  async function shouldRunScheduledUpdateCheck(): Promise<boolean> {
    const lastCheckStr = await AsyncStorage.getItem(REMOTE_UPDATE_LAST_CHECK_KEY);
    if (!lastCheckStr) return true;
    const lastCheckAt = Number(lastCheckStr);
    if (!Number.isFinite(lastCheckAt)) return true;
    return Date.now() - lastCheckAt >= REMOTE_UPDATE_COOLDOWN_MS;
  }

  async function runUpdateCheck(options?: {
    force?: boolean;
    showNoUpdateMessage?: boolean;
  }): Promise<{ updated: boolean }> {
    const force = options?.force ?? false;
    const showNoUpdateMessage = options?.showNoUpdateMessage ?? false;

    if (!force) {
      const shouldCheck = await shouldRunScheduledUpdateCheck();
      if (!shouldCheck) {
        return { updated: false };
      }
    }

    await AsyncStorage.setItem(
      REMOTE_UPDATE_LAST_CHECK_KEY,
      String(Date.now())
    );

    const upd = await tryRemoteUpdate();
    if (upd.updated) {
      setUpdateMsg(`Updated to v${upd.version} (${upd.count} proverbs)`);
      await loadLocalData();
      return { updated: true };
    }

    if (showNoUpdateMessage) {
      setUpdateMsg(upd.reason);
    }
    return { updated: false };
  }

  async function refreshAll() {
    setUpdateMsg("");
    setCurrentIndex(0);
    try {
      await loadLocalData();
      await runUpdateCheck({ force: true, showNoUpdateMessage: true });
    } catch (e: any) {
      setState({ status: "error", message: e?.message ?? String(e) });
    }
  }

  function showNext() {
    if (state.status !== "ready" || !state.proverbs.length) return;
    // Pick a random index different from current
    const maxIndex = state.proverbs.length - 1;
    const newIndex = Math.floor(Math.random() * state.proverbs.length);
    setCurrentIndex(newIndex);
  }

  useEffect(() => {
    loadLocalData(true);

    const delayMs =
      Math.floor(
        Math.random() * (REMOTE_UPDATE_MAX_DELAY_MS - REMOTE_UPDATE_MIN_DELAY_MS + 1)
      ) + REMOTE_UPDATE_MIN_DELAY_MS;

    const timer = setTimeout(() => {
      runUpdateCheck({ force: false, showNoUpdateMessage: false }).catch(
        () => {
          // non-fatal: app continues using cached/bundled data
        }
      );
    }, delayMs);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colorScheme.background },
      ]}
    >
      <Text style={[styles.title, { color: colorScheme.text }]}>{APP_NAME}</Text>
      <Text style={[styles.subtitle, { color: colorScheme.accent }]}>
        {currentIndex === 0 ? `Today's Proverb` : `Proverb #${currentIndex + 1}`}
      </Text>

      {state.status === "loading" && (
        <View style={styles.center}>
          <ActivityIndicator />
          <Text style={[styles.muted, { color: colorScheme.text }]}>Loading…</Text>
        </View>
      )}

      {state.status === "error" && (
        <View style={styles.center}>
          <Text style={[styles.error, { color: colorScheme.accent }]}>
            Error: {state.message}
          </Text>
          <Pressable
            style={[styles.button, { backgroundColor: colorScheme.accent }]}
            onPress={refreshAll}
          >
            <Text style={styles.buttonText}>Retry</Text>
          </Pressable>
        </View>
      )}

      {state.status === "ready" && currentProverb && (
        <>
          <ProverbCard proverb={currentProverb} colorScheme={colorScheme} />

          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.button, { backgroundColor: colorScheme.accent }]}
              onPress={showNext}
            >
              <Text style={styles.buttonText}>🎲 Surprise Me!</Text>
            </Pressable>
          </View>

          <View style={styles.footerRow}>
            <Text style={[styles.muted, { color: colorScheme.text }]}>
              Data: {state.source}
            </Text>
            <Pressable
              style={[styles.button, { backgroundColor: colorScheme.accent }]}
              onPress={refreshAll}
            >
              <Text style={styles.buttonText}>Check Updates</Text>
            </Pressable>
          </View>

          {!!updateMsg && (
            <Text style={[styles.muted, { color: colorScheme.text }]}>{updateMsg}</Text>
          )}
        </>
      )}

      {state.status === "ready" && !currentProverb && (
        <Text style={[styles.error, { color: colorScheme.accent }]}>
          No proverbs available.
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12, minHeight: "100%" },
  title: { fontSize: 22, fontWeight: "800" },
  subtitle: { fontSize: 13, marginBottom: 4 },
  center: { paddingVertical: 24, alignItems: "center", gap: 10 },
  muted: { fontSize: 12, opacity: 0.7 },
  error: { fontWeight: "600" },
  buttonRow: {
    marginTop: 16,
    alignItems: "center",
  },
  footerRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 13 },
});
