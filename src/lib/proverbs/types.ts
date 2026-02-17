export type Proverb = {
  id: string;        // stable unique id
  zh: string;        // Chinese text
  pinyin?: string;   // optional pinyin romanization
  en: string;        // English translation
  origin: string;    // short origin/history story
  source?: string;   // optional: book/period attribution
  tags?: string[];   // optional: categorization tags
};

export type RemoteManifest = {
  version: number | string; // increment when publishing new dataset
  bundlePath?: string;      // repository path to the JSON array file
  dataUrl?: string;         // optional direct URL to the proverbs JSON array
  sha256?: string;          // optional SHA-256 of bundle JSON text
};
