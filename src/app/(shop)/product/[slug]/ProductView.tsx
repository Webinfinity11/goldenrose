"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type ReactNode } from "react";
import { AddToCart, FavButton } from "@/components/cart/CartUI";
import { Gallery } from "@/components/Gallery";
import { StockLabel } from "@/components/ProductCard";
import type { VariantOption } from "@/lib/data";
import { discount, finalPrice, gelAmount } from "@/lib/format";

type Base = {
  id: number;
  name: string;
  slug: string;
  sku: string | null;
  price: number;
  salePrice: number | null;
  inStock: boolean;
  stockQty: number | null;
  images: string[];
  summary: string;
};

/**
 * Photos, price, variant picker and the buy row. Picking a variant (shade) swaps the photos, price,
 * stock and what goes into the cart on the same page: the URL stays the product's.
 */
export function ProductView({
  product,
  variants,
  category,
  children,
}: {
  product: Base;
  variants: VariantOption[];
  category: { name: string; href: string } | null;
  children: ReactNode;
}) {
  // ?color=<variant id> (links from the home carousels) opens the page with that color picked.
  const fromLink = Number(useSearchParams().get("color"));
  const [selectedId, setSelectedId] = useState(
    () => (variants.find((v) => v.id === fromLink) ?? variants.find((v) => v.inStock) ?? variants[0])?.id,
  );
  const v = variants.find((x) => x.id === selectedId) ?? null;
  const unit = v ?? product;
  const price = finalPrice(unit);
  const off = discount(unit);
  const images = v?.images.length ? v.images : product.images;
  const item = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price,
    image: images[0] ?? null,
    max: unit.stockQty ?? undefined,
    ...(v && { variantId: v.id, variant: v.name }),
  };
  const sku = v?.sku ?? product.sku;

  return (
    <div className="pdp">
      {/* key: a new variant starts at its first photo */}
      <Gallery key={v?.id ?? 0} images={images} name={v ? `${product.name} - ${v.name}` : product.name} badge={off > 0 ? `−${off}%` : null} />
      <div className="pdp-info">
        {category && (
          <Link className="pdp-cat" href={category.href}>
            {category.name}
          </Link>
        )}
        <h1>{product.name}</h1>
        <div className="pdp-meta">
          <StockLabel inStock={unit.inStock} stockQty={unit.stockQty} />
          {sku && <span className="pdp-sku">SKU: {sku}</span>}
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
              <span className="pdp-price-old">{gelAmount(unit.price)} ₾</span>
              <span className="pdp-price-off">−{off}%</span>
            </>
          )}
        </div>
        {variants.length > 0 && v && (
          <div className="pdp-variants">
            <div className="pdp-variants-head">
              <span>
                <b>Color:</b> {v.name}
              </span>
              <span className="pdp-variants-count">{variants.length} colors</span>
            </div>
            <div className="pdp-variants-list" role="radiogroup" aria-label="Color">
              {variants.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  role="radio"
                  aria-checked={x.id === v.id}
                  className={x.id === v.id ? "pdp-variant is-current" : x.inStock ? "pdp-variant" : "pdp-variant is-out"}
                  onClick={() => setSelectedId(x.id)}
                  title={x.inStock ? x.name : `${x.name} (out of stock)`}
                >
                  <span className="pdp-variant-img">{x.images[0] && <Image src={x.images[0]} alt="" width={70} height={90} />}</span>
                  <span className="pdp-variant-label">{x.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        {(unit.inStock || v) && (
          <div className="pdp-buy">
            <AddToCart key={v?.id ?? 0} item={item} size="lg" disabled={!unit.inStock} />
            <FavButton item={{ id: product.id, name: product.name, slug: product.slug, price, image: product.images[0] ?? null }} />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
