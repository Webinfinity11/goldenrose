// Language of the current request for Server Components and server utilities (not Server Actions or Route Handlers:
// those get the language passed in). Inside "use cache" functions the language becomes part of the cache key.
import { lang } from "next/root-params";
import { defaultLocale, isLocale, localeHref, type Locale } from "./config";
import { messages } from "./index";

/** The storefront language; Georgian outside the [lang] routes (the admin). */
export async function getLocale(): Promise<Locale> {
  try {
    const l = await lang();
    return isLocale(l) ? l : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

/** Interface texts of the current language, plus a helper that prefixes site paths with it. */
export async function getT() {
  const locale = await getLocale();
  return { ...messages[locale], locale, href: (path: string) => localeHref(locale, path) };
}
