// Rewrites Georgian (non-Latin) category and product slugs to their Latin transliteration.
// Idempotent: rows that already have a Latin slug are left alone. Old URLs redirect via oldSlugRedirect.
// Usage: npx tsx scripts/latin-slugs.ts
import "./env";
import { eq } from "drizzle-orm";
import { categories, db, products } from "../src/db";
import { slugify } from "../src/lib/admin-shared";

const LATIN = /^[a-z0-9-]+$/;

async function migrate(table: typeof categories | typeof products, label: string) {
  const rows = await db.select({ id: table.id, name: table.name, slug: table.slug }).from(table);
  const taken = new Set(rows.filter((r) => LATIN.test(r.slug)).map((r) => r.slug));
  let changed = 0;
  for (const r of rows) {
    if (LATIN.test(r.slug)) continue;
    const root = slugify(r.slug) || slugify(r.name) || "item";
    let slug = root;
    for (let n = 2; taken.has(slug); n++) slug = `${root}-${n}`;
    taken.add(slug);
    await db.update(table).set({ slug }).where(eq(table.id, r.id));
    changed++;
  }
  console.log(`${label}: ${changed} slug(s) made Latin`);
}

(async () => {
  await migrate(categories, "categories");
  await migrate(products, "products");
  process.exit(0);
})();
