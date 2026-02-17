import fs from "node:fs";
import path from "node:path";

const p = path.resolve("src/data/proverbs.bundled.json");
const raw = fs.readFileSync(p, "utf8");
const data = JSON.parse(raw);

if (!Array.isArray(data)) throw new Error("Dataset must be an array");

const ids = new Set();
for (const [i, item] of data.entries()) {
  if (!item || typeof item !== "object") {
    throw new Error(`Invalid item at index ${i}`);
  }
  for (const k of ["id", "zh", "en", "origin"]) {
    if (typeof item[k] !== "string" || !item[k].trim()) {
      throw new Error(`Missing/invalid '${k}' at index ${i}`);
    }
  }
  if (ids.has(item.id)) throw new Error(`Duplicate id: ${item.id}`);
  ids.add(item.id);
}

console.log(`✅ OK: ${data.length} proverbs validated.`);
