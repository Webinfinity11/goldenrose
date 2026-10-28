import type { Metadata } from "next";
import { Suspense } from "react";
import { Listing, ListingSkeleton } from "@/components/Listing";

export const metadata: Metadata = { title: "Products", alternates: { canonical: "/catalog" } };

async function CatalogHead({ searchParams }: PageProps<"/catalog">) {
  const sp = await searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const sale = sp.sale === "1";
  return (
    <div className="pagehead">
      <h1>{q ? `Search: “${q}”` : sale ? "On Sale" : "All Products"}</h1>
    </div>
  );
}

async function CatalogBody({ searchParams }: PageProps<"/catalog">) {
  const sp = (await searchParams) as Record<string, string | undefined>;
  return <Listing base="/catalog" sp={sp} />;
}

export default function CatalogPage(props: PageProps<"/catalog">) {
  return (
    <div className="container">
      <Suspense fallback={<div className="pagehead"><h1>Products</h1></div>}>
        <CatalogHead {...props} />
      </Suspense>
      <Suspense fallback={<ListingSkeleton />}>
        <CatalogBody {...props} />
      </Suspense>
    </div>
  );
}
