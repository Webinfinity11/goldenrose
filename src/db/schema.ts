import {
  pgTable,
  serial,
  integer,
  text,
  numeric,
  boolean,
  timestamp,
  jsonb,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";

export type Spec = { label: string; value: string };
export type OrderItem = {
  productId: number;
  /** Set when the product was bought in a specific variant (shade). */
  variantId?: number;
  variant?: string;
  name: string;
  sku: string | null;
  price: number;
  qty: number;
  image: string | null;
};

export const categories = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    parentId: integer("parent_id"),
    description: text("description").notNull().default(""),
    image: text("image"),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("categories_parent_idx").on(t.parentId)],
);

export const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    sku: text("sku"),
    price: numeric("price", { precision: 10, scale: 2, mode: "number" }).notNull().default(0),
    salePrice: numeric("sale_price", { precision: 10, scale: 2, mode: "number" }),
    inStock: boolean("in_stock").notNull().default(true),
    // null = stock isn't tracked for this product; otherwise in_stock follows stock_qty > 0
    stockQty: integer("stock_qty"),
    published: boolean("published").notNull().default(true),
    featured: boolean("featured").notNull().default(false),
    summary: text("summary").notNull().default(""),
    description: text("description").notNull().default(""),
    // ── cosmetics attributes (all optional; used for filters and the spec table) ──
    brand: text("brand"), // ბრენდი
    collection: text("collection"), // კოლექცია / ხაზი, მაგ. "Mood Satiny Matte Lipstick"
    shade: text("shade"), // ტონი, მაგ. "03 Nude Rose"
    volume: text("volume"), // მოცულობა / წონა, მაგ. "4.2 გ"
    country: text("country"), // წარმოების ქვეყანა
    // Extra free-form specs shown after the structured ones.
    specs: jsonb("specs").$type<Spec[]>().notNull().default([]),
    images: jsonb("images").$type<string[]>().notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("products_sku_idx").on(t.sku), index("products_brand_idx").on(t.brand), index("products_collection_idx").on(t.collection)],
);

/**
 * Variants (shades) of a product: one product page, the shopper picks the variant there.
 * Price / sale price left empty use the product's; images left empty use the product's.
 */
export const variants = pgTable(
  "variants",
  {
    id: serial("id").primaryKey(),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    // Swatch color shown on the product page, e.g. "#c0392b"; null = the photo only.
    color: text("color"),
    sku: text("sku"),
    price: numeric("price", { precision: 10, scale: 2, mode: "number" }),
    salePrice: numeric("sale_price", { precision: 10, scale: 2, mode: "number" }),
    inStock: boolean("in_stock").notNull().default(true),
    // null = stock isn't tracked for this variant; otherwise in_stock follows stock_qty > 0
    stockQty: integer("stock_qty"),
    images: jsonb("images").$type<string[]>().notNull().default([]),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (t) => [index("variants_product_idx").on(t.productId)],
);

export const productCategories = pgTable(
  "product_categories",
  {
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (t) => [primaryKey({ columns: [t.productId, t.categoryId] }), index("pc_category_idx").on(t.categoryId)],
);

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  address: text("address").notNull(),
  comment: text("comment").notNull().default(""),
  items: jsonb("items").$type<OrderItem[]>().notNull(),
  total: numeric("total", { precision: 10, scale: 2, mode: "number" }).notNull(),
  // new → confirmed → delivered | cancelled
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Editable site content (header, footer, page copy), one JSON document per section. */
export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").$type<Record<string, unknown>>().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Newsletter sign-ups from the footer form. */
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type Variant = typeof variants.$inferSelect;
