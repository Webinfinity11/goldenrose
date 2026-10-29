import type { Metadata } from "next";
import Link from "@/components/Link";
import { Suspense } from "react";
import { Icon } from "@/components/Icon";
import { ProductCard } from "@/components/ProductCard";
import { ProductTabs } from "@/components/ProductTabs";
import { RailScroller } from "@/components/RailScroller";
import { fill, localeHref, locales } from "@/i18n";
import { getT } from "@/i18n/server";
import { getContent } from "@/lib/content";
import { getAllSlugs, getProduct } from "@/lib/data";
import { categoryUrl, finalPrice, oldSlugRedirect, productUrl } from "@/lib/format";
import { site } from "@/lib/site";
import { ProductView } from "./ProductView";

const slugOf = async (params: PageProps<"/[lang]/product/[slug]">["params"]) => decodeURIComponent((await params).slug);

export async function generateStaticParams() {
  return (await getAllSlugs()).products.slice(0, 100).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/product/[slug]">): Promise<Metadata> {
  const [data, t] = await Promise.all([slugOf(params).then(getProduct), getT()]);
  if (!data) return {};
  const { product } = data;
  return {
    title: product.name,
    description: product.summary.slice(0, 160) || fill(t.catalog.orderOnline, { name: product.name, site: site.name }),
    alternates: { canonical: t.href(productUrl(product.slug)), languages: Object.fromEntries(locales.map((l) => [l, localeHref(l, productUrl(product.slug))])) },
    openGraph: { images: product.images.slice(0, 1) },
  };
}

async function ProductContent({ params }: PageProps<"/[lang]/product/[slug]">) {
  const [data, { delivery }, t] = await Promise.all([slugOf(params).then(getProduct), getContent(), getT()]);
  if (!data) return oldSlugRedirect(await slugOf(params), productUrl, t.locale);
  const { product, variants, trail, categories, related } = data;
  const price = finalPrice(variants.find((v) => v.inStock) ?? variants[0] ?? product);
  const attrs = [
    product.brand && { label: t.catalog.brand, value: product.brand },
    product.collection && { label: t.catalog.collection, value: product.collection },
    product.shade && { label: t.catalog.shade, value: product.shade },
    variants.length > 0 && { label: t.catalog.colorsCount, value: String(variants.length) },
    product.volume && { label: t.catalog.size, value: product.volume },
    product.country && { label: t.catalog.country, value: product.country },
  ].filter((a): a is { label: string; value: string } => !!a);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku ?? undefined,
    image: product.images,
    description: product.summary || product.description || undefined,
    offers:
      price > 0
        ? {
            "@type": "Offer",
            price: price.toFixed(2),
            priceCurrency: "GEL",
            availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            url: `${site.url}${t.href(productUrl(product.slug))}`,
          }
        : undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="pagehead">
        <nav className="crumbs" aria-label={t.catalog.breadcrumb}>
          <Link href="/">{t.catalog.home}</Link>
          {trail.map((c) => (
            <span key={c.id} style={{ display: "contents" }}>
              <Icon name="right" />
              <Link href={categoryUrl(c.slug)}>{c.name}</Link>
            </span>
          ))}
        </nav>
      </div>
      <ProductView
        product={{
          id: product.id,
          name: product.name,
          slug: product.slug,
          sku: product.sku,
          price: product.price,
          salePrice: product.salePrice,
          inStock: product.inStock,
          stockQty: product.stockQty,
          images: product.images,
          summary: product.summary,
        }}
        variants={variants}
        category={trail.length > 0 ? { name: trail.at(-1)!.name, href: categoryUrl(trail.at(-1)!.slug) } : null}
      >
          {(attrs.length > 0 || product.specs.length > 0) && (
            <div className="pdp-block">
              <h2 className="pdp-block-title">{t.catalog.specifications}</h2>
              <table className="specs">
                <tbody>
                  {[...attrs, ...product.specs].map((s) => (
                    <tr key={s.label}>
                      <th>{s.label}</th>
                      <td>{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {categories.length > 0 && (
            <div className="pdp-cats">
              <span className="pdp-cats-label">{t.catalog.categoriesLabel}</span>
              {categories.map((c) => (
                <Link key={c.id} className="chip" href={categoryUrl(c.slug)}>
                  {c.name}
                </Link>
              ))}
            </div>
          )}
      </ProductView>
      <ProductTabs
        tabs={[
          ...(product.description ? [{ id: "description", label: t.catalog.description, content: <p className="pdp-desc">{product.description}</p> }] : []),
          {
            id: "delivery",
            label: delivery.title,
            content: (
              <div className="pdp-tab-sections">
                {delivery.sections.map((d) => (
                  <div key={d.title}>
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </div>
                ))}
              </div>
            ),
          },
        ]}
      />
      {related.length > 0 && (
        <section className="section">
          <div className="sectiontitle">
            <h2>{t.catalog.similar}</h2>
          </div>
          <RailScroller>
            {related.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </RailScroller>
        </section>
      )}
    </>
  );
}

export default function ProductPage(props: PageProps<"/[lang]/product/[slug]">) {
  return (
    <div className="container">
      <Suspense fallback={<div className="pdp" style={{ minHeight: 600 }} />}>
        <ProductContent {...props} />
      </Suspense>
    </div>
  );
}
