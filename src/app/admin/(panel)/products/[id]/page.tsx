import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { asc } from "drizzle-orm";
import { categories, db, productCategories, products, variants } from "@/db";
import { requireAdmin } from "@/lib/auth";
import { productUrl } from "@/lib/format";
import { PageTitle } from "@/components/admin/ui";
import { ProductForm } from "@/components/admin/ProductForm";

// Reads the admin session cookie: navigations here may block (see admin/layout.tsx).
export const instant = false;

export default async function EditProduct({ params }: PageProps<"/admin/products/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const isNew = id === "new";
  const [product] = isNew ? [null] : await db.select().from(products).where(eq(products.id, Number(id) || 0));
  if (!isNew && !product) notFound();
  const [cats, links, vars] = await Promise.all([
    db.select({ id: categories.id, name: categories.name, parentId: categories.parentId }).from(categories).orderBy(categories.sortOrder, categories.name),
    product ? db.select().from(productCategories).where(eq(productCategories.productId, product.id)) : [],
    product ? db.select().from(variants).where(eq(variants.productId, product.id)).orderBy(asc(variants.sortOrder), asc(variants.id)) : [],
  ]);

  return (
    <>
      <PageTitle
        actions={
          product?.published && (
            <a href={productUrl(product.slug)} target="_blank" className="text-sm font-semibold text-[#174abc]">
              საიტზე ნახვა ↗
            </a>
          )
        }
      >
        <Link href="/admin/products" className="text-slate-400 font-normal">
          პროდუქცია /
        </Link>{" "}
        {product ? product.name : "ახალი პროდუქტი"}
      </PageTitle>
      <ProductForm product={product} variants={vars} categories={cats} selected={links.map((l) => l.categoryId)} />
    </>
  );
}
