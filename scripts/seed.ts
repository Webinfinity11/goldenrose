// Fills an empty database with the Golden Rose category tree and the products from scripts/data/products.json.
// Usage: npx tsx scripts/seed.ts   (refuses to run if products already exist)
import "./env";
import { sql } from "drizzle-orm";
import { categories, db, productCategories, products } from "../src/db";
import { slugify } from "../src/lib/admin-shared";
import data from "./data/products.json";

type Cat = { name: string; image: string; children: string[] };
const img = (f: string) => `/img/gr/${f}`;
// Mirrors the design's mega menu; the image is the one shown in the menu panel.
const tree: Cat[] = [
  {
    name: "Face",
    image: img("tr_img_1_91.jpg"),
    children: ["Blush", "Highlighter", "BB & CC Cream", "Foundation", "Concealer", "Powder", "Primer & Setting Spray", "Contour"],
  },
  { name: "Eyes", image: img("tr_img_1_92.jpg"), children: ["Eyeliner", "Eyeshadow", "Eye Pencil", "Brows", "Mascara"] },
  { name: "Lips", image: img("tr_img_1_52.jpg"), children: ["Lip Gloss", "Lipstick", "Lip Liner", "Lip Balm", "Lip Oil"] },
  { name: "Nails", image: img("tr_img_1_53.jpg"), children: ["Nail Polish", "Nail Care"] },
  { name: "Skin Care", image: img("tr_img_1_75.jpg"), children: ["Face Care", "Hair Care"] },
  { name: "Accessories", image: img("tr_img_1_54.jpg"), children: ["False Lashes", "Makeup Brushes", "Makeup Sponges", "Other Accessories"] },
  { name: "Fragrance", image: img("tr_img_1_67.jpg"), children: ["Women's Fragrance", "Men's Fragrance", "Unisex Fragrance"] },
];

type Seed = {
  name: string;
  collection: string;
  shade: string | null;
  category: string;
  price: number;
  salePrice: number | null;
  isNew: boolean;
  featured: boolean;
  images: string[];
  description: string;
};
const items = data as Seed[];

(async () => {
  const [{ n }] = await db.select({ n: sql<number>`count(*)::int` }).from(products);
  if (n > 0) {
    console.log(`database already has ${n} products — seed skipped`);
    process.exit(0);
  }

  const ids = new Map<string, number>();
  let order = 0;
  for (const root of tree) {
    const [r] = await db
      .insert(categories)
      .values({ name: root.name, slug: slugify(root.name), image: root.image, sortOrder: order++ })
      .returning({ id: categories.id });
    ids.set(root.name, r.id);
    for (const child of root.children) {
      const [c] = await db
        .insert(categories)
        .values({ name: child, slug: slugify(child), parentId: r.id, sortOrder: order++ })
        .returning({ id: categories.id });
      ids.set(child, c.id);
    }
  }

  for (const [i, it] of items.entries()) {
    const [p] = await db
      .insert(products)
      .values({
        name: it.name,
        slug: slugify(it.name),
        sku: `GR-${String(1000 + i)}`,
        price: it.price,
        salePrice: it.salePrice,
        featured: it.featured,
        // "New" products keep a fresh date (badge "New"); the rest are backdated.
        createdAt: new Date(Date.now() - (it.isNew ? i * 60_000 : (60 + i) * 86_400_000)),
        summary: [it.collection, it.shade].filter(Boolean).join(" · "),
        description: it.description,
        images: it.images,
        brand: "Golden Rose",
        collection: it.collection,
        shade: it.shade,
        country: "Turkey",
      })
      .returning({ id: products.id });
    // Link to the leaf and its parent, as the admin form does.
    const parent = tree.find((t) => t.children.includes(it.category))!;
    await db.insert(productCategories).values([
      { productId: p.id, categoryId: ids.get(it.category)! },
      { productId: p.id, categoryId: ids.get(parent.name)! },
    ]);
  }
  console.log(`seeded ${ids.size} categories and ${items.length} products`);
  process.exit(0);
})();
