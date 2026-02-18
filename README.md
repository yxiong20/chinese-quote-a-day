
# Chinese Quote a Day

---
**Component:** `jadepeaksoftware`
**Copyright © 2026 Jade Peak Software Consulting**
---

Daily Chinese proverbs with English translations and origin stories.


## Ownership

This project and all its components are owned and maintained by **Jade Peak Software Consulting**.

## Setup & Run

```bash
cd /Users/yxiong3/Projects/Chinese-Quote-a-Day
npm install
npx expo start
```

Press `i` for iOS simulator, `a` for Android emulator.

## Features

- **1000 curated Chinese proverbs** bundled with the app
- **Random per-user daily selection** (stable for the day, unique per install)
- **Optional remote updates** from GitHub repository files (`manifest.json` + bundle)
- **Bundle integrity verification** via manifest `sha256` check before applying updates
- **Offline-first** (works without internet after first launch)
- **Cross-platform** (iOS + Android from one codebase)

## Data

Bundled dataset: `src/data/proverbs.bundled.json`

Validate data integrity:
```bash
npm run validate:data
```

Update manifest SHA after data changes:
```bash
npm run manifest:sha
```

Generate placeholder proverbs (for testing):
```bash
npm run gen:placeholders
```

## Remote Updates

Remote updates are fetched from this repo via GitHub Contents API.

Configuration lives in `src/config.ts`:
```ts
export const GITHUB_SOURCE = {
  owner: "yxiong20",
  repo: "chinese-quote-a-day",
  ref: "main",
  manifestPath: "src/data/manifest.json",
};
```

Manifest file (`src/data/manifest.json`):
```json
{
  "version": "1.0.0",
  "bundlePath": "src/data/proverbs.bundled.json",
  "sha256": "<sha256 of bundle text>"
}
```

### How update logic works

1. App fetches manifest from GitHub.
2. If `version` differs from cached version, app fetches the bundle.
3. If manifest includes `sha256`, app hashes downloaded bundle text and requires exact match.
4. On success, app writes cache file and updates metadata.
5. On remote failure (missing manifest/bundle, network error, checksum mismatch), app falls back to cached/bundled data.

### Publishing new proverb bundle

1. Update `src/data/proverbs.bundled.json`.
2. Bump `version` in `src/data/manifest.json`.
3. Run:
   ```bash
   npm run manifest:sha
   ```
4. Commit and push both files.

## Publishing

Build for app stores:
```bash
npm run eas:build:ios
npm run eas:build:android
```

Submit to stores:
```bash
npm run eas:submit:ios
npm run eas:submit:android
```

If your npm registry mirrors packages, these scripts intentionally call `eas-cli` (not `eas`) to avoid `npx` resolving the wrong package.

### Troubleshooting EAS CLI resolution

If you see errors like `could not determine executable to run` and logs mention `pkgid eas@0.1.0`, your npm registry resolved `eas` instead of `eas-cli`.

Use one-off fallback commands pinned to npmjs:

```bash
npx --yes --registry=https://registry.npmjs.org eas-cli@latest build --platform ios
npx --yes --registry=https://registry.npmjs.org eas-cli@latest build --platform android
```

You can also verify the CLI directly:

```bash
npx --yes --registry=https://registry.npmjs.org eas-cli@latest --version
```
