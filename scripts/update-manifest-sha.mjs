import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const repoRoot = process.cwd();
const manifestPath = path.join(repoRoot, "src/data/manifest.json");

async function main() {
  const manifestText = await readFile(manifestPath, "utf8");
  const manifest = JSON.parse(manifestText);

  if (!manifest.bundlePath || typeof manifest.bundlePath !== "string") {
    throw new Error("manifest.json must include a string bundlePath");
  }

  const bundlePath = path.join(repoRoot, manifest.bundlePath);
  const bundleText = await readFile(bundlePath, "utf8");

  const sha256 = createHash("sha256").update(bundleText, "utf8").digest("hex");

  manifest.sha256 = sha256;

  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`Updated ${path.relative(repoRoot, manifestPath)} sha256: ${sha256}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
