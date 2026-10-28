import "server-only";
import { and, eq, inArray, sql } from "drizzle-orm";
import { db, products, variants } from "@/db";

/** Adds (sign 1) or removes (sign -1) units for tracked products or variants; untracked ones are skipped. */
export async function adjustStock(items: { productId: number; variantId?: number; qty: number }[], sign: 1 | -1) {
  for (const i of items) {
    if (i.variantId) {
      await db
        .update(variants)
        .set({
          stockQty: sql`${variants.stockQty} + ${sign * i.qty}`,
          inStock: sql`${variants.stockQty} + ${sign * i.qty} > 0`,
        })
        .where(and(eq(variants.id, i.variantId), sql`${variants.stockQty} is not null`));
      continue;
    }
    await db
      .update(products)
      .set({
        stockQty: sql`${products.stockQty} + ${sign * i.qty}`,
        inStock: sql`${products.stockQty} + ${sign * i.qty} > 0`,
      })
      .where(and(eq(products.id, i.productId), sql`${products.stockQty} is not null`));
  }
  const withVariants = items.filter((i) => i.variantId).map((i) => i.productId);
  if (withVariants.length) await syncVariantStock([...new Set(withVariants)]);
}

/** A product with variants is in stock while any of its variants is. */
export async function syncVariantStock(productIds: number[]) {
  if (!productIds.length) return;
  await db
    .update(products)
    .set({ inStock: sql`exists (select 1 from ${variants} where ${variants.productId} = ${products.id} and ${variants.inStock})` })
    .where(and(inArray(products.id, productIds), sql`exists (select 1 from ${variants} where ${variants.productId} = ${products.id})`));
}
