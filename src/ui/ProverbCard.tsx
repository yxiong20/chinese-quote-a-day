import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { Proverb } from "../lib/proverbs/types";

type ColorScheme = {
  background: string;
  text: string;
  accent: string;
};

export default function ProverbCard({
  proverb,
  colorScheme,
}: {
  proverb: Proverb;
  colorScheme: ColorScheme;
}) {
  return (
    <View style={[styles.card, { backgroundColor: colorScheme.background }]}>
      <Text style={[styles.zh, { color: colorScheme.text }]}>{proverb.zh}</Text>
      {!!proverb.pinyin && (
        <Text style={[styles.pinyin, { color: colorScheme.accent }]}>
          {proverb.pinyin}
        </Text>
      )}

      <View style={[styles.divider, { backgroundColor: colorScheme.accent, opacity: 0.3 }]} />

      <Text style={[styles.en, { color: colorScheme.text }]}>{proverb.en}</Text>

      <Text style={[styles.sectionTitle, { color: colorScheme.accent }]}>Origin</Text>
      <Text style={[styles.origin, { color: colorScheme.text }]}>{proverb.origin}</Text>

      {!!proverb.source && (
        <Text style={[styles.source, { color: colorScheme.accent, opacity: 0.7 }]}>
          Source: {proverb.source}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  zh: { fontSize: 26, fontWeight: "700" },
  pinyin: { marginTop: 6, fontSize: 14 },
  divider: { height: 2, marginVertical: 14 },
  en: { fontSize: 16, lineHeight: 22 },
  sectionTitle: {
    marginTop: 14,
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  origin: { marginTop: 6, fontSize: 14, lineHeight: 20 },
  source: { marginTop: 10, fontSize: 12 },
});
