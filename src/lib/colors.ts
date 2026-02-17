/**
 * Generate random colors with good contrast for text readability
 */

type ColorScheme = {
  background: string;
  text: string;
  accent: string;
};

// Predefined color schemes with guaranteed good contrast
const COLOR_SCHEMES: ColorScheme[] = [
  // Light backgrounds with dark text
  { background: "#FFF9E6", text: "#2C1810", accent: "#8B4513" }, // Cream & Brown
  { background: "#F0E6FF", text: "#1A0033", accent: "#6B2D9E" }, // Lavender & Purple
  { background: "#E6F7FF", text: "#001A33", accent: "#0066CC" }, // Sky Blue & Navy
  { background: "#FFE6E6", text: "#330000", accent: "#CC0000" }, // Pink & Maroon
  { background: "#E6FFE6", text: "#003300", accent: "#00AA00" }, // Mint & Green
  { background: "#FFF4E6", text: "#331A00", accent: "#CC6600" }, // Peach & Orange
  { background: "#F5F5DC", text: "#2F2F2F", accent: "#8B7355" }, // Beige & Dark Gray
  
  // Dark backgrounds with light text
  { background: "#1A1A2E", text: "#EEEEFF", accent: "#16C79A" }, // Dark Blue & Cyan
  { background: "#2C1810", text: "#FFF9E6", accent: "#D4A574" }, // Dark Brown & Cream
  { background: "#1F2937", text: "#F9FAFB", accent: "#60A5FA" }, // Slate & Light Blue
  { background: "#1E3A5F", text: "#E0F2FE", accent: "#7DD3FC" }, // Navy & Sky
  { background: "#312E2B", text: "#F5E6D3", accent: "#D4AF37" }, // Charcoal & Gold
];

/**
 * Get a random color scheme based on a seed (for daily consistency)
 */
export function getColorScheme(seed: number): ColorScheme {
  const index = seed % COLOR_SCHEMES.length;
  return COLOR_SCHEMES[index];
}

/**
 * Get a random color scheme (truly random, for "next" button)
 */
export function getRandomColorScheme(): ColorScheme {
  const index = Math.floor(Math.random() * COLOR_SCHEMES.length);
  return COLOR_SCHEMES[index];
}
