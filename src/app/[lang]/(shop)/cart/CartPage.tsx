"use client";

import Image from "next/image";
import Link from "@/components/Link";
import { Icon } from "@/components/Icon";
import { useCart } from "@/components/cart/CartProvider";
import { Stepper } from "@/components/cart/CartUI";
import { FreeDeliveryBar } from "@/components/cart/CartExtras";
import { money, productUrl } from "@/lib/format";
import { useSite } from "@/components/SiteProvider";
import { fill } from "@/i18n";
import { useT } from "@/i18n/client";

export function CartPage() {
  const { lines, count, total, setQty, remove, clear } = useCart();
  const site = useSite();
  const { checkout: t } = useT();

  if (!lines.length)
    return (
      <div className="empty cart-empty">
        <span className="empty-badge">
          <Icon name="cart" />
        </span>
        <h3>{t.cartEmpty}</h3>
        <p>{t.cartEmptyText}</p>
        <Link className="primary" href="/catalog">
          {t.browseCatalog} <Icon name="arrow" />
        </Link>
      </div>
    );

  return (
    <div className="checkout">
      <div className="card cart-table">
        <div className="cart-table-head">
          <h2>
            {t.products} <span className="muted">({count})</span>
          </h2>
          <button className="linkbtn" onClick={clear}>
            {t.clearCart}
          </button>
        </div>
        {lines.map((l) => (
          <div className="cart-row" key={l.key}>
            <Link href={productUrl(l.slug)} className="cart-row-img">
              {l.image && <Image src={l.image} alt="" fill sizes="96px" />}
            </Link>
            <div className="cart-row-info">
              <Link href={productUrl(l.slug)} className="cart-row-name">
                {l.name}
              </Link>
              {l.variant && <span className="small">{l.variant}</span>}
              <span className="muted small">{money(l.price)} ₾ / {t.each}</span>
            </div>
            <Stepper value={l.qty} onChange={(n) => setQty(l.key, n)} label={l.name} max={l.max} />
            <strong className="cart-row-sum">{money(l.price * l.qty)} ₾</strong>
            <button className="remove" onClick={() => remove(l.key)} aria-label={fill(t.remove, { name: l.name })}>
              <Icon name="trash" />
            </button>
          </div>
        ))}
        <Link className="textlink back" href="/catalog">
          <Icon name="left" /> {t.continueShopping}
        </Link>
      </div>

      <aside className="card summary">
        <h2>{t.orderSummary}</h2>
        <FreeDeliveryBar total={total} />
        <dl className="summary-rows">
          <div>
            <dt>{fill(t.items, { n: count })}</dt>
            <dd>{money(total)} ₾</dd>
          </div>
          <div>
            <dt>{t.delivery}</dt>
            <dd>{total >= site.freeDeliveryFrom ? t.free : t.toBeConfirmed}</dd>
          </div>
        </dl>
        <div className="summary-total">
          <span>{t.total}</span>
          <strong>{money(total)} ₾</strong>
        </div>
        <Link className="primary wide" href="/checkout">
          {t.toCheckout} <Icon name="arrow" />
        </Link>
        <ul className="trust">
          <li>
            <Icon name="shield" /> {t.trustPayAfter}
          </li>
          <li>
            <Icon name="tag" /> {t.trustFlexible}
          </li>
        </ul>
      </aside>
    </div>
  );
}
