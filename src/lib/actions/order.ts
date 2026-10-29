"use server";

import { and, eq, gte, inArray, sql } from "drizzle-orm";
import { updateTag } from "next/cache";
import { z } from "zod";
import { db, orders, products, variants, type OrderItem } from "@/db";
import { getProductsByIds, resolveVariant } from "@/lib/data";
import { finalPrice } from "@/lib/format";
import { adjustStock, syncVariantStock } from "@/lib/stock";
import { notifyNewOrder } from "@/lib/notify";
import { after } from "next/server";
import { fill, isLocale, messages, type Locale } from "@/i18n";

// Error texts reach the shopper in their language: each message here is a key of messages.checkout.
const schema = z.object({
  name: z.string().trim().min(2, "errName").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d\s()-]{9,20}$/, "errPhone"),
  email: z.union([z.literal(""), z.email("errEmail")]).optional(),
  address: z.string().trim().min(5, "errAddress").max(500),
  comment: z.string().trim().max(1000).optional(),
  items: z
    .array(
      z.object({ id: z.number().int().positive(), variantId: z.number().int().positive().optional(), qty: z.number().int().min(1).max(999) }),
    )
    .min(1, "errCartEmpty")
    .max(200),
});

export type OrderResult = { ok: true; id: number } | { ok: false; error: string };

/** `locale` is the shopper's language (Server Actions can't read the route's language). */
export async function placeOrder(input: z.input<typeof schema>, locale?: Locale): Promise<OrderResult> {
  const t = messages[isLocale(locale) ? locale : "ka"].checkout;
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    const key = parsed.error.issues[0].message;
    return { ok: false, error: key in t ? t[key as keyof typeof t] : t.errInvalid };
  }
  const data = parsed.data;

  // Prices and stock always come from the database, never from the browser.
  const found = await getProductsByIds(data.items.map((i) => i.id));
  const variantIds = data.items.flatMap((i) => (i.variantId ? [i.variantId] : []));
  const foundVariants = variantIds.length ? await db.select().from(variants).where(inArray(variants.id, variantIds)) : [];
  const items: OrderItem[] = [];
  for (const i of data.items) {
    const p = found.find((f) => f.id === i.id);
    if (!p) continue;
    const raw = i.variantId ? foundVariants.find((v) => v.id === i.variantId && v.productId === p.id) : undefined;
    if (i.variantId && !raw) continue;
    // A variant carries its own price, stock and photo; otherwise the product's are used.
    const v = raw ? resolveVariant(raw, p) : null;
    const unit = v ?? p;
    const label = v ? `${p.name} (${v.name})` : p.name;
    if (!unit.inStock) continue;
    if (unit.stockQty != null && i.qty > unit.stockQty)
      return { ok: false, error: fill(t.errStock, { n: unit.stockQty, name: label }) };
    items.push({
      productId: p.id,
      ...(v && { variantId: v.id, variant: v.name }),
      name: p.name,
      sku: v?.sku ?? p.sku,
      price: finalPrice(unit),
      qty: i.qty,
      image: unit.images[0] ?? null,
    });
  }
  if (!items.length) return { ok: false, error: t.errUnavailable };

  // Reserve tracked stock with conditional updates so two simultaneous orders can't oversell.
  const reserved: { productId: number; variantId?: number; qty: number }[] = [];
  for (const i of items) {
    const p = found.find((f) => f.id === i.productId)!;
    const v = i.variantId ? foundVariants.find((x) => x.id === i.variantId)! : null;
    if ((v ?? p).stockQty == null) continue;
    const ok = v
      ? await db
          .update(variants)
          .set({ stockQty: sql`${variants.stockQty} - ${i.qty}`, inStock: sql`${variants.stockQty} - ${i.qty} > 0` })
          .where(and(eq(variants.id, v.id), gte(variants.stockQty, i.qty)))
          .returning({ id: variants.id })
      : await db
          .update(products)
          .set({ stockQty: sql`${products.stockQty} - ${i.qty}`, inStock: sql`${products.stockQty} - ${i.qty} > 0` })
          .where(and(eq(products.id, p.id), gte(products.stockQty, i.qty)))
          .returning({ id: products.id });
    if (!ok.length) {
      await adjustStock(reserved, 1);
      return { ok: false, error: fill(t.errSoldOut, { name: v ? `${p.name} (${v.name})` : p.name }) };
    }
    reserved.push({ productId: p.id, variantId: v?.id, qty: i.qty });
  }
  if (reserved.some((r) => r.variantId)) await syncVariantStock([...new Set(reserved.map((r) => r.productId))]);

  const total = items.reduce((n, i) => n + i.price * i.qty, 0);
  try {
    const [order] = await db
      .insert(orders)
      .values({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        address: data.address,
        comment: data.comment ?? "",
        items,
        total: Math.round(total * 100) / 100,
      })
      .returning({ id: orders.id });
    if (reserved.length) updateTag("products");
    // Runs after the response is sent, so a slow mail provider never delays checkout.
    after(() => notifyNewOrder({ id: order.id, name: data.name, phone: data.phone, total, items }));
    return { ok: true, id: order.id };
  } catch (e) {
    await adjustStock(reserved, 1);
    throw e;
  }
}
