import type { MetadataRoute } from "next";
import { localeHref, locales } from "@/i18n/config";
import { getAllSlugs } from "@/lib/data";
import { categoryUrl, productUrl } from "@/lib/format";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { products, categories } = await getAllSlugs();
  // Every page in all languages (Georgian without a prefix), each listing its translations.
  const entry = (path: string, priority: number, lastModified?: Date) =>
    locales.map((l) => ({
      url: site.url + localeHref(l, path),
      lastModified,
      priority,
      alternates: { languages: Object.fromEntries(locales.map((x) => [x, site.url + localeHref(x, path)])) },
    }));
  return [
    ...entry("/", 1),
    ...entry("/catalog", 0.9),
    ...categories.flatMap((c) => entry(categoryUrl(c.slug), 0.8)),
    ...products.flatMap((p) => entry(productUrl(p.slug), 0.6, p.updatedAt)),
  ];
}
