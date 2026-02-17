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
  version: number;   // increment when publishing new dataset
  dataUrl: string;   // URL to the proverbs JSON array
};
