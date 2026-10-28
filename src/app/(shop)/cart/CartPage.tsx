"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { useCart } from "@/components/cart/CartProvider";
import { Stepper } from "@/components/cart/CartUI";
import { FreeDeliveryBar } from "@/components/cart/CartExtras";
import { money, productUrl } from "@/lib/format";
import { useSite } from "@/components/SiteProvider";

export function CartPage() {
  const { lines, count, total, setQty, remove, clear } = useCart();
  const site = useSite();

  if (!lines.length)
    return (
      <div className="empty cart-empty">
        <span className="empty-badge">
          <Icon name="cart" />
        </span>
        <h3>Your cart is empty</h3>
        <p>Browse the catalog and add the products you love.</p>
        <Link className="primary" href="/catalog">
          Browse Catalog <Icon name="arrow" />
        </Link>
      </div>
    );

  return (
    <div className="checkout">
      <div className="card cart-table">
        <div className="cart-table-head">
          <h2>
            Products <span className="muted">({count})</span>
          </h2>
          <button className="linkbtn" onClick={clear}>
            Clear Cart
          </button>
        </div>
        {lines.map((l) => (
          <div className="cart-row" key={l.id}>
            <Link href={productUrl(l.slug)} className="cart-row-img">
              {l.image && <Image src={l.image} alt="" fill sizes="96px" />}
            </Link>
            <div className="cart-row-info">
              <Link href={productUrl(l.slug)} className="cart-row-name">
                {l.name}
              </Link>
              <span className="muted small">{money(l.price)} ₾ / each</span>
            </div>
            <Stepper value={l.qty} onChange={(n) => setQty(l.id, n)} label={l.name} max={l.max} />
            <strong className="cart-row-sum">{money(l.price * l.qty)} ₾</strong>
            <button className="remove" onClick={() => remove(l.id)} aria-label={`Remove ${l.name}`}>
              <Icon name="trash" />
            </button>
          </div>
        ))}
        <Link className="textlink back" href="/catalog">
          <Icon name="left" /> Continue Shopping
        </Link>
      </div>

      <aside className="card summary">
        <h2>Order Summary</h2>
        <FreeDeliveryBar total={total} />
        <dl className="summary-rows">
          <div>
            <dt>Items ({count})</dt>
            <dd>{money(total)} ₾</dd>
          </div>
          <div>
            <dt>Delivery</dt>
            <dd>{total >= site.freeDeliveryFrom ? "Free" : "To be confirmed"}</dd>
          </div>
        </dl>
        <div className="summary-total">
          <span>Total</span>
          <strong>{money(total)} ₾</strong>
        </div>
        <Link className="primary wide" href="/checkout">
          Checkout <Icon name="arrow" />
        </Link>
        <ul className="trust">
          <li>
            <Icon name="shield" /> Pay after your order is confirmed
          </li>
          <li>
            <Icon name="tag" /> Flexible payment options
          </li>
        </ul>
      </aside>
    </div>
  );
}
