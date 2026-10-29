import type { Metadata } from "next";
import Link from "@/components/Link";
import { Suspense } from "react";
import { Icon } from "@/components/Icon";
import { Listing, ListingSkeleton } from "@/components/Listing";
import { fill, localeHref, locales } from "@/i18n";
import { getT } from "@/i18n/server";
import { getCategory, getCategoryTree } from "@/lib/data";
import { categoryUrl, oldSlugRedirect } from "@/lib/format";
import { site } from "@/lib/site";

const slugOf = async (params: PageProps<"/[lang]/category/[slug]">["params"]) => decodeURIComponent((await params).slug);

export async function generateStaticParams() {
  return (await getCategoryTree()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/category/[slug]">): Promise<Metadata> {
  const [found, t] = await Promise.all([slugOf(params).then(getCategory), getT()]);
  if (!found) return {};
  const { category } = found;
  const path = categoryUrl(category.slug);
  return {
    title: category.name,
    description: category.description || fill(t.catalog.categoryMetaDescription, { name: category.name, count: category.count, site: site.name }),
    alternates: { canonical: t.href(path), languages: Object.fromEntries(locales.map((l) => [l, localeHref(l, path)])) },
  };
}

async function CategoryContent({ params, searchParams }: PageProps<"/[lang]/category/[slug]">) {
  const [found, t] = await Promise.all([slugOf(params).then(getCategory), getT()]);
  if (!found) return oldSlugRedirect(await slugOf(params), categoryUrl, t.locale);
  const { category, trail, descendantIds } = found;
  const sp = (await searchParams) as Record<string, string | undefined>;
  return (
    <>
      <div className="pagehead">
        <nav className="crumbs" aria-label={t.catalog.breadcrumb}>
          <Link href="/">{t.catalog.home}</Link>
          <Icon name="right" />
          <Link href="/catalog">{t.catalog.products}</Link>
          {trail.map((c) => (
            <span key={c.id} style={{ display: "contents" }}>
              <Icon name="right" />
              {c.id === category.id ? <span>{c.name}</span> : <Link href={categoryUrl(c.slug)}>{c.name}</Link>}
            </span>
          ))}
        </nav>
        <h1>{category.name}</h1>
        {category.description && <p>{category.description}</p>}
      </div>
      <Listing base={categoryUrl(category.slug)} sp={sp} category={{ id: category.id, descendantIds }} />
    </>
  );
}

export default function CategoryPage(props: PageProps<"/[lang]/category/[slug]">) {
  return (
    <div className="container">
      <Suspense fallback={<><div className="pagehead"><h1>&nbsp;</h1></div><ListingSkeleton /></>}>
        <CategoryContent {...props} />
      </Suspense>
    </div>
  );
}
