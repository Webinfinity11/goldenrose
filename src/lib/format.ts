import { notFound, permanentRedirect } from "next/navigation";
import { slugify } from "./admin-shared";

export const money = (n: number) => n.toFixed(2);
/**
 * "1 250,00": the amount part of {@link gel}, two decimals with a comma as in the Golden Rose design.
 * Grouped by hand rather than with Intl: Node and browsers ship different locale rules, which broke hydration.
 */
export const gelAmount = (n: number) => {
  const [int, frac] = (Math.round(n * 100) / 100).toFixed(2).split(".");
  return `${int.replace(/\B(?=(\d{3})+(?!\d))/g, " ")},${frac}`;
};
/** "34,00 ₾" */
export const gel = (n: number) => `${gelAmount(n)} ₾`;

export const finalPrice = (p: { price: number; salePrice: number | null }) => p.salePrice ?? p.price;

export const discount = (p: { price: number; salePrice: number | null }) =>
  p.salePrice && p.price ? Math.round((1 - p.salePrice / p.price) * 100) : 0;

export const productUrl = (slug: string) => `/product/${encodeURIComponent(slug)}`;
export const categoryUrl = (slug: string) => `/category/${encodeURIComponent(slug)}`;

/** Unknown slug: links made before slugs went Latin (Georgian) redirect to their transliteration; anything else is a 404. */
export function oldSlugRedirect(slug: string, url: (slug: string) => string): never {
  const latin = slugify(slug);
  if (latin && latin !== slug) permanentRedirect(url(latin));
  notFound();
}

/** Units a shopper may put in the cart: tracked stock, or the general cap. */
export const maxQty = (stockQty: number | null | undefined) => (stockQty == null ? 999 : Math.max(0, stockQty));

export const LOW_STOCK = 5;
