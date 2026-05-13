/**
 * SEO helpers for canonical URLs and hreflang alternates.
 *
 * The user-facing URL pattern is `/{locale}/{path}` (enforced by middleware).
 * Canonical URLs MUST match the served URL (locale-prefixed). Alternates
 * provide hreflang for each supported locale + x-default pointing to en.
 */

export const SITE_URL = "https://www.alsolutionsai.online";
export const SUPPORTED_LOCALES = ["en", "ar", "fr"] as const;
export const DEFAULT_LOCALE: (typeof SUPPORTED_LOCALES)[number] = "en";

export type Locale = (typeof SUPPORTED_LOCALES)[number];

/**
 * Normalise a path to start with a single leading slash and have no trailing slash.
 * Empty string and "/" both resolve to "" so we can compose `/{locale}{path}`.
 */
function normalisePath(path: string): string {
  if (!path || path === "/") return "";
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  return withLeading.replace(/\/+$/, "");
}

/**
 * Build the absolute canonical URL for the default locale (en) variant of a page.
 */
export function canonicalUrl(path: string, locale: Locale = DEFAULT_LOCALE): string {
  const normalised = normalisePath(path);
  return `${SITE_URL}/${locale}${normalised}`;
}

/**
 * Build the full hreflang alternates map for a page across all supported locales.
 * Always includes `x-default` pointing to the English variant.
 */
export function hreflangAlternates(path: string): Record<string, string> {
  const normalised = normalisePath(path);
  const map: Record<string, string> = {};
  for (const locale of SUPPORTED_LOCALES) {
    map[locale] = `${SITE_URL}/${locale}${normalised}`;
  }
  map["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}${normalised}`;
  return map;
}

/**
 * Convenience: returns a `Metadata.alternates`-shaped object for a page.
 */
export function alternatesFor(path: string): {
  canonical: string;
  languages: Record<string, string>;
} {
  return {
    canonical: canonicalUrl(path),
    languages: hreflangAlternates(path),
  };
}
