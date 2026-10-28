import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Icon } from "@/components/Icon";
import { AddToCart, FavButton } from "@/components/cart/CartUI";
import { Gallery } from "@/components/Gallery";
import { ProductCard, StockLabel } from "@/components/ProductCard";
import { ProductTabs } from "@/components/ProductTabs";
import { RailScroller } from "@/components/RailScroller";
import { getContent } from "@/lib/content";
import { getAllSlugs, getProduct } from "@/lib/data";
import { categoryUrl, discount, finalPrice, gelAmount, oldSlugRedirect, productUrl } from "@/lib/format";
import { site } from "@/lib/site";

const slugOf = async (params: PageProps<"/product/[slug]">["params"]) => decodeURIComponent((await params).slug);

export async function generateStaticParams() {
  return (await getAllSlugs()).products.slice(0, 100).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const data = await getProduct(await slugOf(params));
  if (!data) return {};
  const { product } = data;
  return {
    title: product.name,
    description: product.summary.slice(0, 160) || `${product.name}. Order online at ${site.name}.`,
    alternates: { canonical: productUrl(product.slug) },
    openGraph: { images: product.images.slice(0, 1) },
  };
}

async function ProductContent({ params }: PageProps<"/product/[slug]">) {
  const [data, { delivery }] = await Promise.all([getProduct(await slugOf(params)), getContent()]);
  if (!data) return oldSlugRedirect(await slugOf(params), productUrl);
  const { product, trail, categories, related } = data;
  const price = finalPrice(product);
  const off = discount(product);
  const item = { id: product.id, name: product.name, slug: product.slug, price, image: product.images[0] ?? null, max: product.stockQty ?? undefined };
  const attrs = [
    product.brand && { label: "Brand", value: product.brand },
    product.collection && { label: "Collection", value: product.collection },
    product.shade && { label: "Shade", value: product.shade },
    product.volume && { label: "Size", value: product.volume },
    product.country && { label: "Country of Origin", value: product.country },
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
            url: `${site.url}${productUrl(product.slug)}`,
          }
        : undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="pagehead">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          {trail.map((c) => (
            <span key={c.id} style={{ display: "contents" }}>
              <Icon name="right" />
              <Link href={categoryUrl(c.slug)}>{c.name}</Link>
            </span>
          ))}
        </nav>
      </div>
      <div className="pdp">
        <Gallery images={product.images} name={product.name} badge={off > 0 ? `−${off}%` : null} />
        <div className="pdp-info">
          {trail.length > 0 && (
            <Link className="pdp-cat" href={categoryUrl(trail.at(-1)!.slug)}>
              {trail.at(-1)!.name}
            </Link>
          )}
          <h1>{product.name}</h1>
          <div className="pdp-meta">
            <StockLabel inStock={product.inStock} stockQty={product.stockQty} />
            {product.sku && <span className="pdp-sku">SKU: {product.sku}</span>}
          </div>
          {product.summary && <p className="pdp-lead">{product.summary}</p>}
          <div className="pdp-price">
            {price > 0 ? (
              <span className="pdp-price-now">
                {gelAmount(price)}
                <span className="pdp-cur">₾</span>
              </span>
            ) : (
              <span className="pdp-price-now price-request">Price on Request</span>
            )}
            {off > 0 && (
              <>
                <span className="pdp-price-old">{gelAmount(product.price)} ₾</span>
                <span className="pdp-price-off">−{off}%</span>
              </>
            )}
          </div>
          {product.inStock && (
            <div className="pdp-buy">
              <AddToCart item={item} size="lg" />
              <FavButton item={item} />
            </div>
          )}
          {(attrs.length > 0 || product.specs.length > 0) && (
            <div className="pdp-block">
              <h2 className="pdp-block-title">Specifications</h2>
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
              <span className="pdp-cats-label">Categories:</span>
              {categories.map((c) => (
                <Link key={c.id} className="chip" href={categoryUrl(c.slug)}>
                  {c.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <ProductTabs
        tabs={[
          ...(product.description ? [{ id: "description", label: "Description", content: <p className="pdp-desc">{product.description}</p> }] : []),
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
            <h2>Similar Products</h2>
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

export default function ProductPage(props: PageProps<"/product/[slug]">) {
  return (
    <div className="container">
      <Suspense fallback={<div className="pdp" style={{ minHeight: 600 }} />}>
        <ProductContent {...props} />
      </Suspense>
    </div>
  );
}
