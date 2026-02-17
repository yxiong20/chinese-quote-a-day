import fs from "node:fs";
import path from "node:path";

const outPath = path.resolve("src/data/proverbs.bundled.json");

function pad(n, width) {
  return String(n).padStart(width, "0");
}

// NOTE: These are placeholders (NOT real well-known proverbs).
// Replace with curated content before shipping.
const base = [
  {
    zh: "千里之行，始于足下",
    pinyin: "qiān lǐ zhī xíng, shǐ yú zú xià",
    en: "A journey of a thousand miles begins with a single step.",
    origin: "Placeholder origin text. Replace with curated origin/history.",
    source: "Placeholder",
  },
];

const total = 1000;
const items = [];
for (let i = 1; i <= total; i++) {
  const b = base[(i - 1) % base.length];
  items.push({
    id: `p${pad(i, 4)}`,
    zh: b.zh,
    pinyin: b.pinyin,
    en: b.en,
    origin: b.origin,
    source: b.source,
  });
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(items, null, 2), "utf8");
console.log(`✅ Wrote ${items.length} items to ${outPath}`);
