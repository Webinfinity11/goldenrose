// The bundled pictures under /img/gr/ are WebP now: rewrites stored .jpg/.png paths to .webp in products,
// variants, categories and saved site content. Uploads are left alone. Safe to run again.
// Usage: npx tsx scripts/webp-paths.ts
import "./env";
import { eq } from "drizzle-orm";
import { categories, db, products, settings, variants } from "../src/db";

const fix = (s: string) => s.replace(/(\/img\/gr\/[^"'\s)]*?)\.(jpe?g|png)\b/gi, "$1.webp");
const fixList = (list: string[]) => list.map(fix);
const same = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

(async () => {
  let n = 0;
  for (const p of await db.select({ id: products.id, images: products.images }).from(products)) {
    const images = fixList(p.images);
    if (!same(images, p.images)) await db.update(products).set({ images }).where(eq(products.id, p.id)), n++;
  }
  for (const v of await db.select({ id: variants.id, images: variants.images }).from(variants)) {
    const images = fixList(v.images);
    if (!same(images, v.images)) await db.update(variants).set({ images }).where(eq(variants.id, v.id)), n++;
  }
  for (const c of await db.select({ id: categories.id, image: categories.image }).from(categories)) {
    if (c.image && fix(c.image) !== c.image) await db.update(categories).set({ image: fix(c.image) }).where(eq(categories.id, c.id)), n++;
  }
  for (const s of await db.select().from(settings)) {
    const value = JSON.parse(fix(JSON.stringify(s.value)));
    if (!same(value, s.value)) await db.update(settings).set({ value }).where(eq(settings.key, s.key)), n++;
  }
  console.log(`webp paths: ${n} row(s) updated`);
  process.exit(0);
})();
