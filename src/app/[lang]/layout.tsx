import type { Metadata, Viewport } from "next";
import { localeHref, localeLabels, locales } from "@/i18n/config";
import { getLocale, getT } from "@/i18n/server";
import { site } from "@/lib/site";
import { fontClasses } from "../fonts";
import "../globals.css";
import "../pages.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { locale, layout } = await getT();
  return {
    metadataBase: new URL(site.url),
    title: { default: `${site.name} | ${layout.metaTagline}`, template: `%s | ${site.name}` },
    description: layout.metaDescription,
    openGraph: { siteName: site.name, locale: localeLabels[locale].og, type: "website" },
    alternates: { languages: Object.fromEntries(locales.map((l) => [l, localeHref(l, "/")])) },
  };
}

export const viewport: Viewport = { themeColor: "#fa8072", colorScheme: "only light" };

// proxy.ts sends every path without a language prefix to /ka, so the segment always holds a known language.
export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  return (
    <html lang={await getLocale()} className={fontClasses}>
      <body>{children}</body>
    </html>
  );
}
