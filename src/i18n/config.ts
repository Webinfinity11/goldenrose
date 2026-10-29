// Storefront languages. Client-safe: no server imports here.
// Georgian is the main language and has no URL prefix (/catalog); the others do (/en/catalog, /ru/catalog).

export const locales = ["ka", "en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ka";

export const isLocale = (v: unknown): v is Locale => locales.includes(v as Locale);

export const localeLabels: Record<Locale, { short: string; name: string; og: string }> = {
  ka: { short: "GE", name: "ქართული", og: "ka_GE" },
  en: { short: "EN", name: "English", og: "en_US" },
  ru: { short: "RU", name: "Русский", og: "ru_RU" },
};

/** A site path in the given language: "/catalog" → "/en/catalog". External links and anchors stay as they are. */
export function localeHref(lang: Locale, href: string): string {
  if (lang === defaultLocale || !href.startsWith("/") || href.startsWith("//")) return href;
  if (hasLocalePrefix(href)) return href;
  return href === "/" ? `/${lang}` : `/${lang}${href}`;
}

const PREFIX = new RegExp(`^/(${locales.join("|")})(?=/|\\?|#|$)`);

export const hasLocalePrefix = (path: string) => PREFIX.test(path);

/** "/en/catalog?x=1" → "/catalog?x=1" */
export function stripLocale(path: string): string {
  const out = path.replace(PREFIX, "");
  return out === "" || out.startsWith("?") || out.startsWith("#") ? `/${out}` : out;
}
