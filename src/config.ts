export const APP_NAME = "Chinese Quote a Day";

/**
 * Optional remote update.
 * Leave empty to disable remote fetching.
 *
 * Expected JSON at this URL:
 *  { "version": 1, "dataUrl": "https://example.com/proverbs.json" }
 */
export const REMOTE_MANIFEST_URL = "";

/**
 * S3 configuration for remote updates.
 * Fill in when you're ready to enable cloud-hosted proverb updates.
 */
export const S3_CONFIG = {
  bucket: "",           // e.g. "my-proverbs-bucket"
  region: "",           // e.g. "us-east-1"
  cloudFrontDomain: "", // e.g. "d1234abcd.cloudfront.net"
};

/**
 * Example manifest URL pattern (when configured):
 * https://${S3_CONFIG.cloudFrontDomain}/manifest.json
 *
 * Example data URL pattern:
 * https://${S3_CONFIG.cloudFrontDomain}/proverbs.json
 */
