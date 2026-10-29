"use client";

import Image from "next/image";
import Link from "@/components/Link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { GrIcon } from "@/components/gr/GrIcon";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { fill } from "@/i18n";
import { useT } from "@/i18n/client";
import { gel, productUrl } from "@/lib/format";
import { MAX_QTY, useCart, type CartItem, type FavItem } from "./CartProvider";

export function Stepper({ value, onChange, label, max = MAX_QTY }: { value: number; onChange: (n: number) => void; label: string; max?: number }) {
  const [draft, setDraft] = useState(String(value));
  const { layout: t } = useT();
  useEffect(() => setDraft(String(value)), [value]);
  return (
    <div className="stepper">
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label={t.decrease}>
        −
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={max}
        value={draft}
        aria-label={fill(t.quantityFor, { name: label })}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => onChange(Number(draft))}
        onKeyDown={(e) => e.key === "Enter" && onChange(Number(draft))}
      />
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={t.increase}>
        +
      </button>
    </div>
  );
}

export function AddToCart({ item, size, disabled }: { item: CartItem; size?: "lg"; disabled?: boolean }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const { layout: t } = useT();
  const max = Math.min(MAX_QTY, item.max ?? MAX_QTY);
  const clamp = (n: number) => Math.min(max, Math.max(1, Math.floor(n) || 1));
  return (
    <div className={size === "lg" ? "purchase purchase-lg" : "purchase"}>
      <Stepper value={qty} onChange={(n) => setQty(clamp(n))} label={item.name} max={max} />
      <button
        type="button"
        className={size === "lg" ? "add" : "add add-icon"}
        onClick={() => add(item, qty)}
        disabled={disabled}
        aria-label={fill(t.addToCartFor, { name: `${item.name}${item.variant ? ` (${item.variant})` : ""}` })}
        title={t.addToCart}
      >
        <Icon name="cart" />
        {size === "lg" && (disabled ? t.outOfStock : t.addToCart)}
      </button>
    </div>
  );
}

export function FavButton({ item, className = "heart" }: { item: FavItem; className?: string }) {
  const { isFav, toggleFav } = useCart();
  const liked = isFav(item.id);
  const { layout: t } = useT();
  return (
    <button
      type="button"
      className={liked ? `${className} liked is-active` : className}
      aria-pressed={liked}
      aria-label={fill(liked ? t.removeFavFor : t.addFavFor, { name: item.name })}
      onClick={() => toggleFav(item)}
    >
      <Icon name="heart" />
    </button>
  );
}

/** The round basket button of a product card: adds one item. */
export function CardAddButton({ item }: { item: CartItem }) {
  const { add } = useCart();
  const { layout: t } = useT();
  return (
    <button className="add-button" type="button" onClick={() => add(item, 1)} aria-label={fill(t.addToCartFor, { name: item.name })}>
      <GrIcon name="basket" />
    </button>
  );
}

/** Right side of the header: language, account, favourites and cart, as in the design. */
export function HeaderCounters() {
  const { count, favs, setDrawerOpen, notify } = useCart();
  const { layout: t } = useT();
  return (
    <div className="header-actions">
      <LanguageSwitcher />
      <button
        type="button"
        className="account-button"
        onClick={() => notify(t.accountsSoon)}
      >
        <GrIcon name="user" size={18} />
        <span>{t.login}</span>
      </button>
      <Link className="icon-button round-button" href="/favorites" aria-label={t.myFavorites}>
        <GrIcon name="heart" size={18} />
        {favs.length > 0 && <span className="count-badge">{favs.length}</span>}
      </Link>
      <button className="icon-button round-button basket-button" onClick={() => setDrawerOpen(true)} aria-label={fill(t.myCartCount, { n: count })}>
        <GrIcon name="basket" size={19} />
        <span className="count-badge">{count}</span>
      </button>
    </div>
  );
}

export function CartDrawer() {
  const { lines, count, total, drawerOpen, setDrawerOpen, setQty, remove, clear } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  const { layout: t } = useT();

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    document.body.classList.add("has-overlay");
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("has-overlay");
      document.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [drawerOpen, setDrawerOpen]);

  const close = () => setDrawerOpen(false);
  return (
    <>
      <div className={drawerOpen ? "drawer-backdrop open" : "drawer-backdrop"} onClick={close} />
      <section
        className={drawerOpen ? "cart-drawer open" : "cart-drawer"}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        inert={!drawerOpen}
      >
        <div className="drawer-header">
          <h2 id="cart-title">
            {t.cart} <span>{count}</span>
          </h2>
          <button ref={closeRef} className="icon-button" onClick={close} aria-label={t.closeCart}>
            <Icon name="close" />
          </button>
        </div>
        {lines.length === 0 ? (
          <div className="drawer-empty">
            <Icon name="cart" />
            <h3>{t.cartEmpty}</h3>
            <p>{t.cartEmptyText}</p>
            <Link className="button button-primary" href="/catalog" onClick={close}>
              {t.continueShopping}
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {lines.map((l) => (
                <article className="cart-item" key={l.key}>
                  {l.image ? (
                    <Image className="cart-item-image" src={l.image} alt="" width={92} height={104} />
                  ) : (
                    <span className="cart-item-image" />
                  )}
                  <div className="cart-item-info">
                    <h3 className="cart-item-title">
                      <Link href={productUrl(l.slug)} onClick={close}>
                        {l.name}
                      </Link>
                    </h3>
                    {l.variant && <small className="cart-item-variant">{l.variant}</small>}
                    <p className="cart-item-price">{gel(l.price * l.qty)}</p>
                    <QtyControl value={l.qty} max={l.max} label={l.name} onChange={(n) => setQty(l.key, n)} />
                  </div>
                  <button className="cart-remove" type="button" onClick={() => remove(l.key)} aria-label={fill(t.removeFromCart, { name: l.name })}>
                    <Icon name="trash" />
                  </button>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <div className="cart-total-row">
                <span>{t.total}</span>
                <strong>{gel(total)}</strong>
              </div>
              <div className="drawer-actions">
                <Link className="button button-secondary" href="/cart" onClick={close}>
                  {t.viewCart}
                </Link>
                <Link className="button button-primary" href="/checkout" onClick={close}>
                  {t.checkout}
                </Link>
              </div>
              <button className="subtle-button" type="button" onClick={clear}>
                {t.clearCart}
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
}

/** − [n] + control in the drawer, as in the design. */
function QtyControl({ value, max = MAX_QTY, label, onChange }: { value: number; max?: number; label: string; onChange: (n: number) => void }) {
  const [draft, setDraft] = useState(String(value));
  const { layout: t } = useT();
  useEffect(() => setDraft(String(value)), [value]);
  return (
    <div className="quantity-control">
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label={fill(t.decreaseFor, { name: label })}>
        <Icon name="minus" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={max}
        value={draft}
        aria-label={fill(t.quantityFor, { name: label })}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => onChange(Number(draft))}
        onKeyDown={(e) => e.key === "Enter" && onChange(Number(draft))}
      />
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={fill(t.increaseFor, { name: label })}>
        <Icon name="plus" />
      </button>
    </div>
  );
}

export function Toast() {
  const { toast } = useCart();
  return (
    <div className={toast ? "toast is-visible" : "toast"} role="status" aria-live="polite">
      {toast}
    </div>
  );
}
