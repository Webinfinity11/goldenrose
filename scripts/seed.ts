// Fills an empty database with the Golden Rose category tree and the products from scripts/data/products.json.
// Usage: npx tsx scripts/seed.ts   (refuses to run if products already exist)
import "./env";
import { sql } from "drizzle-orm";
import { categories, db, productCategories, products } from "../src/db";
import { slugify } from "../src/lib/admin-shared";
import data from "./data/products.json";

// A child is a name, or [name, its own children] for the third level of the mega menu.
type Child = string | [string, string[]];
type Cat = { name: string; image?: string; children: Child[] };
const img = (f: string) => `/img/gr/${f}`;
// Mirrors the design's mega menu; the image is the one shown in the menu panel.
const tree: Cat[] = [
  {
    name: "Face",
    image: img("tr_img_1_91.jpg"),
    children: [
      ["Blush", ["Powder Blush", "Liquid Blush", "Stick Blush"]],
      ["Highlighter", ["Stick Highlighter", "Powder Highlighter", "Liquid Highlighter"]],
      ["BB & CC Cream", ["Nude Look Tinted Moisturizer", "BB Cream", "CC Cream"]],
      ["Foundation", ["Stick Foundation", "Medium Coverage Foundation", "Matte Foundation", "Full Coverage Foundation"]],
      ["Concealer", ["Color Correcting Concealer", "Liquid Concealer", "Stick Concealer"]],
      ["Powder", ["Loose Powder", "Pressed Powder", "Mineral Powder"]],
      "Primer & Setting Spray",
      ["Contour", ["Contour Stick", "Contour Pencil", "Contour Palette"]],
    ],
  },
  {
    name: "Eyes",
    image: img("tr_img_1_92.jpg"),
    children: [
      ["Eyeliner", ["Liquid Eyeliner", "Colored Eyeliner", "Waterproof Eyeliner"]],
      ["Eyeshadow", ["Matte Eyeshadow", "Shimmer Eyeshadow", "Eyeshadow Palette"]],
      ["Eye Pencil", ["Colored Eye Pencil", "Shimmer Eye Pencil", "White Eye Pencil", "Brown Eye Pencil", "Black Eye Pencil"]],
      ["Brows", ["Brow Powder", "Brow Mascara", "Brow Pencil", "Brow Shaper"]],
      ["Mascara", ["Colored Mascara", "Black Mascara"]],
    ],
  },
  {
    name: "Lips",
    image: img("tr_img_1_52.jpg"),
    children: [
      ["Lip Gloss", ["Fruity Lip Gloss", "Shimmer Lip Gloss"]],
      ["Lipstick", ["Liquid Lipstick", "Matte Pencil Lipstick", "Matte Lipstick", "Glossy Lipstick"]],
      "Lip Liner",
      ["Lip Balm", ["Tinted Lip Balm", "Lip Moisturizer"]],
      "Lip Oil",
    ],
  },
  { name: "Nails", image: img("tr_img_1_53.jpg"), children: [["Nail Polish", ["Glitter Nail Polish", "Glossy Nail Polish"]], "Nail Care"] },
  { name: "Skin Care", image: img("tr_img_1_75.jpg"), children: ["Face Care", "Hair Care"] },
  { name: "Accessories", image: img("tr_img_1_54.jpg"), children: ["False Lashes", "Makeup Brushes", "Makeup Sponges", "Other Accessories"] },
  { name: "Fragrance", image: img("tr_img_1_67.jpg"), children: ["Men's Fragrance", "Women's Fragrance", "Unisex Fragrance"] },
  { name: "Collections", image: img("tr_img_1_70.jpg"), children: ["Nude Look", "Miss Beauty", "Mood Collection"] },
  { name: "Sets", children: [] },
  { name: "Mini Products", children: [] },
  { name: "Emily", image: img("tr_img_1_96.jpg"), children: ["Emily Lip Pencil", "Emily Eye Pencil"] },
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
  const parents = new Map<string, string>();
  const insert = async (name: string, parentId: number | null, image?: string) => {
    const [c] = await db
      .insert(categories)
      .values({ name, slug: slugify(name), parentId, image: image ?? null, sortOrder: order++ })
      .returning({ id: categories.id });
    ids.set(name, c.id);
    return c.id;
  };
  for (const root of tree) {
    const rootId = await insert(root.name, null, root.image);
    for (const child of root.children) {
      const [name, grand] = typeof child === "string" ? [child, []] : child;
      const id = await insert(name, rootId);
      parents.set(name, root.name);
      for (const g of grand) {
        await insert(g, id);
        parents.set(g, name);
      }
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
    // Link to the category and all its ancestors, as the admin form does.
    const chain = [it.category];
    while (parents.has(chain.at(-1)!)) chain.push(parents.get(chain.at(-1)!)!);
    await db.insert(productCategories).values(chain.map((name) => ({ productId: p.id, categoryId: ids.get(name)! })));
  }
  console.log(`seeded ${ids.size} categories and ${items.length} products`);
  process.exit(0);
})();
