"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { defaultLocale, isLocale, localeHref, type Locale } from "./config";
import { messages } from "./index";

export function useLocale(): Locale {
  const { lang } = useParams<{ lang?: string }>();
  return isLocale(lang) ? lang : defaultLocale;
}

/** Interface texts of the current language, plus a helper that prefixes site paths with it. */
export function useT() {
  const locale = useLocale();
  return useMemo(() => ({ ...messages[locale], locale, href: (path: string) => localeHref(locale, path) }), [locale]);
}

/** useRouter whose push/replace keep the current language. */
export function useLocaleRouter() {
  const router = useRouter();
  const locale = useLocale();
  return useMemo(
    () => ({
      ...router,
      push: (href: string, opts?: Parameters<typeof router.push>[1]) => router.push(localeHref(locale, href), opts),
      replace: (href: string, opts?: Parameters<typeof router.replace>[1]) => router.replace(localeHref(locale, href), opts),
    }),
    [router, locale],
  );
}
