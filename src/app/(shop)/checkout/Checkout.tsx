"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Icon } from "@/components/Icon";
import { useCart } from "@/components/cart/CartProvider";
import { CheckoutSteps, FreeDeliveryBar } from "@/components/cart/CartExtras";
import { placeOrder } from "@/lib/actions/order";
import { money } from "@/lib/format";
import { useSite } from "@/components/SiteProvider";

export function Checkout() {
  const { lines, count, total, clear } = useCart();
  const site = useSite();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<number | null>(null);
  const [pending, start] = useTransition();

  if (done)
    return (
      <>
        <div className="pagehead checkout-head">
          <h1>Order Received</h1>
          <CheckoutSteps current={3} />
        </div>
        <div className="success card">
          <span className="tick">
            <Icon name="check" />
          </span>
          <h2>Thank you for your order!</h2>
          <p className="order-no">
            Order number <strong>#{done}</strong>
          </p>
          <p className="muted">Our manager will contact you shortly to confirm your order and arrange a delivery time.</p>
          <div className="success-actions">
            <Link className="primary" href="/catalog">
              Continue Shopping
            </Link>
            <a className="secondary" href={`tel:${site.phone}`}>
              <Icon name="phone" /> {site.phoneLabel}
            </a>
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className="pagehead checkout-head">
        <h1>Checkout</h1>
        <CheckoutSteps current={1} />
      </div>
      {!lines.length ? (
        <div className="empty cart-empty">
          <span className="empty-badge">
            <Icon name="cart" />
          </span>
          <h3>Your cart is empty</h3>
          <Link className="primary" href="/catalog">
            Browse Catalog
          </Link>
        </div>
      ) : (
        <div className="checkout">
          <form
            className="form checkout-form"
            onSubmit={(e) => {
              e.preventDefault();
              const f = new FormData(e.currentTarget);
              setError(null);
              start(async () => {
                const res = await placeOrder({
                  name: String(f.get("name")),
                  phone: String(f.get("phone")),
                  email: String(f.get("email") ?? ""),
                  address: String(f.get("address")),
                  comment: String(f.get("comment") ?? ""),
                  items: lines.map((l) => ({ id: l.id, qty: l.qty })),
                });
                if (res.ok) {
                  clear();
                  setDone(res.id);
                  window.scrollTo({ top: 0 });
                } else setError(res.error);
              });
            }}
          >
            <section className="card">
              <h2>
                <span className="num">1</span> Contact Information
              </h2>
              <div className="row2">
                <label>
                  Full Name / Company *
                  <input name="name" required autoComplete="name" maxLength={100} placeholder="e.g. John Smith" />
                </label>
                <label>
                  Phone *
                  <input name="phone" type="tel" required autoComplete="tel" maxLength={20} placeholder="5XX XX XX XX" />
                </label>
              </div>
              <label>
                Email <span className="optional">(optional)</span>
                <input name="email" type="email" autoComplete="email" maxLength={120} placeholder="name@example.com" />
              </label>
            </section>

            <section className="card">
              <h2>
                <span className="num">2</span> Delivery
              </h2>
              <label>
                Address *
                <textarea name="address" required autoComplete="street-address" maxLength={500} rows={2} placeholder="City, street, building, apartment / office" />
              </label>
              <label>
                Comment <span className="optional">(optional)</span>
                <textarea name="comment" maxLength={1000} rows={3} placeholder="e.g. preferred delivery time, company ID number" />
              </label>
            </section>

            <section className="card">
              <h2>
                <span className="num">3</span> Payment
              </h2>
              <div className="payopt">
                <Icon name="shield" />
                <div>
                  <strong>Pay After Confirmation</strong>
                  <p className="muted small">A sales manager will contact you to agree on payment terms.</p>
                </div>
              </div>
            </section>

            {error && <p className="error">{error}</p>}
            <button className="primary wide submit" disabled={pending}>
              {pending ? "Sending…" : `Place Order · ${money(total)} ₾`} <Icon name="arrow" />
            </button>
          </form>

          <aside className="card summary">
            <div className="summary-head">
              <h2>Your Order</h2>
              <Link href="/cart" className="textlink">
                Edit
              </Link>
            </div>
            <div className="summary-lines">
              {lines.map((l) => (
                <div className="summary-line" key={l.id}>
                  <span className="thumb">
                    {l.image && <Image src={l.image} alt="" fill sizes="52px" />}
                    <b>{l.qty}</b>
                  </span>
                  <span className="name">{l.name}</span>
                  <strong>{money(l.price * l.qty)} ₾</strong>
                </div>
              ))}
            </div>
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
          </aside>
        </div>
      )}
    </>
  );
}
