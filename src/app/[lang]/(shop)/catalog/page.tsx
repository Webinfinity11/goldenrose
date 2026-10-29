import type { Metadata } from "next";
import { Suspense } from "react";
import { Listing, ListingSkeleton } from "@/components/Listing";
import { fill, localeHref, locales } from "@/i18n";
import { getT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t.catalog.products,
    alternates: { canonical: t.href("/catalog"), languages: Object.fromEntries(locales.map((l) => [l, localeHref(l, "/catalog")])) },
  };
}

async function CatalogHead({ searchParams }: PageProps<"/[lang]/catalog">) {
  const [sp, t] = await Promise.all([searchParams, getT()]);
  const q = typeof sp.q === "string" ? sp.q : "";
  const sale = sp.sale === "1";
  return (
    <div className="pagehead">
      <h1>{q ? fill(t.catalog.searchTitle, { q }) : sale ? t.catalog.onSale : t.catalog.allProducts}</h1>
    </div>
  );
}

async function CatalogBody({ searchParams }: PageProps<"/[lang]/catalog">) {
  const sp = (await searchParams) as Record<string, string | undefined>;
  return <Listing base="/catalog" sp={sp} />;
}

async function HeadFallback() {
  const t = await getT();
  return (
    <div className="pagehead">
      <h1>{t.catalog.products}</h1>
    </div>
  );
}

export default function CatalogPage(props: PageProps<"/[lang]/catalog">) {
  return (
    <div className="container">
      <Suspense fallback={<HeadFallback />}>
        <CatalogHead {...props} />
      </Suspense>
      <Suspense fallback={<ListingSkeleton />}>
        <CatalogBody {...props} />
      </Suspense>
    </div>
  );
}
