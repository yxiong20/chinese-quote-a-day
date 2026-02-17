export const APP_NAME = "Chinese Quote a Day";

/**
 * GitHub source configuration for remote proverb updates.
 * The app uses GitHub Contents API to fetch files from this repository.
 */
export const GITHUB_SOURCE = {
  owner: "yxiong20",
  repo: "chinese-quote-a-day",
  ref: "main",
  manifestPath: "src/data/manifest.json",
};

/**
 * Expected manifest JSON shape:
 * {
 *   "version": "1.0.0",
 *   "bundlePath": "src/data/proverbs.bundled.json"
 * }
 */
