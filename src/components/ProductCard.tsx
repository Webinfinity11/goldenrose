import Image from "next/image";
import Link from "next/link";
import { CardAddButton, FavButton } from "@/components/cart/CartUI";
import type { ProductCard as Card } from "@/lib/data";
import { LOW_STOCK, discount, finalPrice, gel, productUrl } from "@/lib/format";

const sizes = "(max-width: 600px) 45vw, (max-width: 991px) 30vw, 280px";

/** Product card of the Golden Rose design: photo with hover swap, New badge, favourite, name, prices and the round basket button. */
export function ProductCard({ p, priority }: { p: Card; priority?: boolean }) {
  // A product with colors shows and adds its first available one.
  const v = p.defaultVariant;
  const unit = v ?? p;
  const price = finalPrice(unit);
  const off = discount(unit);
  const item = {
    id: p.id,
    name: p.name,
    slug: p.slug,
    price,
    image: v?.images[0] ?? p.image,
    max: unit.stockQty ?? undefined,
    ...(v && { variantId: v.id, variant: v.name }),
  };
  const href = p.variantCard && v ? `${productUrl(p.slug)}?color=${v.id}` : productUrl(p.slug);
  return (
    <article className="product-card">
      <div className="product-image">
        <Link className="product-image-button" href={href} aria-label={p.name}>
          {p.image ? (
            <Image src={p.image} alt={p.name} fill sizes={sizes} priority={priority} />
          ) : (
            <span className="product-noimg">No photo</span>
          )}
          {p.hoverImage && <Image className="product-alt" src={p.hoverImage} alt="" fill sizes={sizes} />}
        </Link>
        {p.isNew && <span className="new-badge">New</span>}
        <FavButton item={item} className="favorite-button" />
      </div>
      <div className="product-info">
        <Link className="product-name" href={href}>
          {p.name}
        </Link>
        {p.variantCount > 1 && !p.variantCard && <span className="product-colors">{p.variantCount} colors</span>}
        <div className="product-bottom">
          <div className="prices">
            {off > 0 && <span className="old-price">{gel(unit.price)}</span>}
            <div className="current-price-line">
              <span className="price">{gel(price)}</span>
              {off > 0 && (
                <span className="discount-badge">
                  <b>−{off}%</b> OFF
                </span>
              )}
            </div>
          </div>
          {p.inStock ? <CardAddButton item={item} /> : <span className="product-out">Out of stock</span>}
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({ items }: { items: Card[] }) {
  return (
    <div className="product-grid">
      {items.map((p, i) => (
        <ProductCard key={p.id} p={p} priority={i < 4} />
      ))}
    </div>
  );
}

export function StockLabel({ inStock, stockQty }: { inStock: boolean; stockQty: number | null }) {
  if (!inStock) return <span className="stock out">Out of stock</span>;
  if (stockQty != null && stockQty <= LOW_STOCK) return <span className="stock low">Only {stockQty} left</span>;
  return <span className="stock">In stock</span>;
}
