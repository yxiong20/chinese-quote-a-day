
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
- **Optional remote updates** via S3/CloudFront (configure in `src/config.ts`)
- **Offline-first** (works without internet after first launch)
- **Cross-platform** (iOS + Android from one codebase)

## Data

Bundled dataset: `src/data/proverbs.bundled.json`

Validate data integrity:
```bash
npm run validate:data
```

Generate placeholder proverbs (for testing):
```bash
npm run gen:placeholders
```

## Remote Updates (Optional)

Set `REMOTE_MANIFEST_URL` and `S3_CONFIG` in `src/config.ts`.

### S3 Setup Example

1. Create S3 bucket (e.g. `my-proverbs-bucket`)
2. Enable public read access or use CloudFront
3. Upload two files:
   - `manifest.json`:
     ```json
     {
       "version": 1,
       "dataUrl": "https://d1234.cloudfront.net/proverbs.json"
     }
     ```
   - `proverbs.json`: array of proverb objects

4. Update `src/config.ts`:
   ```ts
   export const REMOTE_MANIFEST_URL = "https://d1234.cloudfront.net/manifest.json";
   export const S3_CONFIG = {
     bucket: "my-proverbs-bucket",
     region: "us-east-1",
     cloudFrontDomain: "d1234.cloudfront.net"
   };
   ```

## Publishing

Build for app stores:
```bash
npx eas build --platform ios
npx eas build --platform android
```

Submit to stores:
```bash
npx eas submit --platform ios
npx eas submit --platform android
```
