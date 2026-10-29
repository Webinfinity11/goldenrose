"use client";

import Image from "next/image";
import Link from "@/components/Link";
import { Icon } from "@/components/Icon";
import { useCart } from "@/components/cart/CartProvider";
import { CardAddButton, FavButton } from "@/components/cart/CartUI";
import { useT } from "@/i18n/client";
import { gel, productUrl } from "@/lib/format";

export function Favorites() {
  const { favs } = useCart();
  const t = useT();
  if (!favs.length)
    return (
      <div className="empty" style={{ marginBottom: 60 }}>
        <Icon name="heart" />
        <h3>{t.catalog.wishlistEmpty}</h3>
        <p>{t.catalog.wishlistEmptyText}</p>
        <Link className="primary" href="/catalog">
          {t.catalog.browseCatalog}
        </Link>
      </div>
    );
  return (
    <div className="product-grid" style={{ paddingBottom: 60 }}>
      {favs.map((p) => (
        <article className="product-card" key={p.id}>
          <div className="product-visual">
            <FavButton item={p} className="favorite-button" />
            <Link href={productUrl(p.slug)} className="product-open" tabIndex={-1} aria-hidden="true">
              {p.image && (
                <span className="product-image-wrap">
                  <Image src={p.image} alt="" fill sizes="(max-width: 900px) 45vw, 320px" />
                </span>
              )}
            </Link>
          </div>
          <div className="product-content">
            <Link className="product-name" href={productUrl(p.slug)}>
              {p.name}
            </Link>
            <div className="product-footer">
              <div className="product-price">{gel(p.price)}</div>
              <CardAddButton item={p} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
