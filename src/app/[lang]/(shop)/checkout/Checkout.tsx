"use client";

import Image from "next/image";
import Link from "@/components/Link";
import { useState, useTransition } from "react";
import { Icon } from "@/components/Icon";
import { useCart } from "@/components/cart/CartProvider";
import { CheckoutSteps, FreeDeliveryBar } from "@/components/cart/CartExtras";
import { placeOrder } from "@/lib/actions/order";
import { money } from "@/lib/format";
import { useSite } from "@/components/SiteProvider";
import { fill } from "@/i18n";
import { useT } from "@/i18n/client";

export function Checkout() {
  const { lines, count, total, clear } = useCart();
  const site = useSite();
  const { checkout: t, locale } = useT();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<number | null>(null);
  const [pending, start] = useTransition();

  if (done)
    return (
      <>
        <div className="pagehead checkout-head">
          <h1>{t.orderReceived}</h1>
          <CheckoutSteps current={3} />
        </div>
        <div className="success card">
          <span className="tick">
            <Icon name="check" />
          </span>
          <h2>{t.thanks}</h2>
          <p className="order-no">
            {t.orderNumber} <strong>#{done}</strong>
          </p>
          <p className="muted">{t.thanksText}</p>
          <div className="success-actions">
            <Link className="primary" href="/catalog">
              {t.continueShopping}
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
        <h1>{t.checkoutTitle}</h1>
        <CheckoutSteps current={1} />
      </div>
      {!lines.length ? (
        <div className="empty cart-empty">
          <span className="empty-badge">
            <Icon name="cart" />
          </span>
          <h3>{t.cartEmpty}</h3>
          <Link className="primary" href="/catalog">
            {t.browseCatalog}
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
                  items: lines.map((l) => ({ id: l.id, variantId: l.variantId, qty: l.qty })),
                }, locale);
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
                <span className="num">1</span> {t.contactInfo}
              </h2>
              <div className="row2">
                <label>
                  {t.fullName} *
                  <input name="name" required autoComplete="name" maxLength={100} placeholder={t.fullNamePlaceholder} />
                </label>
                <label>
                  {t.phone} *
                  <input name="phone" type="tel" required autoComplete="tel" maxLength={20} placeholder="5XX XX XX XX" />
                </label>
              </div>
              <label>
                {t.email} <span className="optional">{t.optional}</span>
                <input name="email" type="email" autoComplete="email" maxLength={120} placeholder="name@example.com" />
              </label>
            </section>

            <section className="card">
              <h2>
                <span className="num">2</span> {t.delivery}
              </h2>
              <label>
                {t.address} *
                <textarea name="address" required autoComplete="street-address" maxLength={500} rows={2} placeholder={t.addressPlaceholder} />
              </label>
              <label>
                {t.comment} <span className="optional">{t.optional}</span>
                <textarea name="comment" maxLength={1000} rows={3} placeholder={t.commentPlaceholder} />
              </label>
            </section>

            <section className="card">
              <h2>
                <span className="num">3</span> {t.payment}
              </h2>
              <div className="payopt">
                <Icon name="shield" />
                <div>
                  <strong>{t.payAfter}</strong>
                  <p className="muted small">{t.payAfterText}</p>
                </div>
              </div>
            </section>

            {error && <p className="error">{error}</p>}
            <button className="primary wide submit" disabled={pending}>
              {pending ? t.sending : fill(t.placeOrder, { total: money(total) })} <Icon name="arrow" />
            </button>
          </form>

          <aside className="card summary">
            <div className="summary-head">
              <h2>{t.yourOrder}</h2>
              <Link href="/cart" className="textlink">
                {t.edit}
              </Link>
            </div>
            <div className="summary-lines">
              {lines.map((l) => (
                <div className="summary-line" key={l.key}>
                  <span className="thumb">
                    {l.image && <Image src={l.image} alt="" fill sizes="52px" />}
                    <b>{l.qty}</b>
                  </span>
                  <span className="name">
                    {l.name}
                    {l.variant && <small> · {l.variant}</small>}
                  </span>
                  <strong>{money(l.price * l.qty)} ₾</strong>
                </div>
              ))}
            </div>
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
          </aside>
        </div>
      )}
    </>
  );
}
