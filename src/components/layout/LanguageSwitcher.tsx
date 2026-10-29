"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { GrIcon } from "@/components/gr/GrIcon";
import { localeHref, localeLabels, locales, stripLocale, type Locale } from "@/i18n/config";
import { useLocale, useT } from "@/i18n/client";

/** The same page in another language; the query string is added on click (useSearchParams would need a Suspense boundary). */
function useLanguageLinks() {
  const pathname = usePathname();
  const current = useLocale();
  const path = stripLocale(pathname || "/");
  const keepQuery = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.href += window.location.search;
  };
  return { current, links: locales.map((l: Locale) => ({ locale: l, href: localeHref(l, path), ...localeLabels[l] })), keepQuery };
}

/** Header dropdown (desktop): "GE − GEL", the other languages on hover / focus. */
export function LanguageSwitcher() {
  const { layout: t } = useT();
  const { current, links, keepQuery } = useLanguageLinks();
  return (
    <div className="language-wrap">
      <button type="button" className="language-button" aria-label={t.languageMenu}>
        {localeLabels[current].short} − GEL <GrIcon name="down" size={12} />
      </button>
      <div className="language-menu">
        {links.map((l) => (
          <a key={l.locale} href={l.href} hrefLang={l.locale} lang={l.locale} onClick={keepQuery} aria-current={l.locale === current || undefined}>
            {l.name}
          </a>
        ))}
      </div>
    </div>
  );
}

/** Plain GE / EN / RU row for the mobile menu. */
export function LanguageLinks() {
  const { layout: t } = useT();
  const { current, links, keepQuery } = useLanguageLinks();
  return (
    <div className="lang-links" role="group" aria-label={t.languageMenu}>
      {links.map((l) => (
        <a key={l.locale} href={l.href} hrefLang={l.locale} lang={l.locale} title={l.name} onClick={keepQuery} aria-current={l.locale === current || undefined}>
          {l.short}
        </a>
      ))}
    </div>
  );
}
