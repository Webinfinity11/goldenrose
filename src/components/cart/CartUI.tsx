"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { GrIcon } from "@/components/gr/GrIcon";
import { gel, productUrl } from "@/lib/format";
import { MAX_QTY, useCart, type FavItem } from "./CartProvider";

export function Stepper({ value, onChange, label, max = MAX_QTY }: { value: number; onChange: (n: number) => void; label: string; max?: number }) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);
  return (
    <div className="stepper">
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Decrease quantity">
        −
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={max}
        value={draft}
        aria-label={`Quantity: ${label}`}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => onChange(Number(draft))}
        onKeyDown={(e) => e.key === "Enter" && onChange(Number(draft))}
      />
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Increase quantity">
        +
      </button>
    </div>
  );
}

export function AddToCart({ item, size }: { item: FavItem; size?: "lg" }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const max = Math.min(MAX_QTY, item.max ?? MAX_QTY);
  const clamp = (n: number) => Math.min(max, Math.max(1, Math.floor(n) || 1));
  return (
    <div className={size === "lg" ? "purchase purchase-lg" : "purchase"}>
      <Stepper value={qty} onChange={(n) => setQty(clamp(n))} label={item.name} max={max} />
      <button
        type="button"
        className={size === "lg" ? "add" : "add add-icon"}
        onClick={() => add(item, qty)}
        aria-label={`Add to cart: ${item.name}`}
        title="Add to cart"
      >
        <Icon name="cart" />
        {size === "lg" && "Add to Cart"}
      </button>
    </div>
  );
}

export function FavButton({ item, className = "heart" }: { item: FavItem; className?: string }) {
  const { isFav, toggleFav } = useCart();
  const liked = isFav(item.id);
  return (
    <button
      type="button"
      className={liked ? `${className} liked is-active` : className}
      aria-pressed={liked}
      aria-label={liked ? `Remove from favorites: ${item.name}` : `Add to favorites: ${item.name}`}
      onClick={() => toggleFav(item)}
    >
      <Icon name="heart" />
    </button>
  );
}

/** The round basket button of a product card: adds one item. */
export function CardAddButton({ item }: { item: FavItem }) {
  const { add } = useCart();
  return (
    <button className="add-button" type="button" onClick={() => add(item, 1)} aria-label={`Add to cart: ${item.name}`}>
      <GrIcon name="basket" />
    </button>
  );
}

export function HeaderCounters() {
  const { count, favs, setDrawerOpen } = useCart();
  return (
    <div className="header-actions">
      <Link className="icon-button" href="/favorites" aria-label="My favorites">
        <GrIcon name="heart" />
        {favs.length > 0 && <span className="count-badge">{favs.length}</span>}
      </Link>
      <button className="icon-button basket-button" onClick={() => setDrawerOpen(true)} aria-label={`My cart: ${count} items`}>
        <GrIcon name="basket" size={25} />
        <span className="count-badge">{count}</span>
      </button>
    </div>
  );
}

export function CartDrawer() {
  const { lines, count, total, drawerOpen, setDrawerOpen, setQty, remove, clear } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

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
            My Cart <span>{count}</span>
          </h2>
          <button ref={closeRef} className="icon-button" onClick={close} aria-label="Close cart">
            <Icon name="close" />
          </button>
        </div>
        {lines.length === 0 ? (
          <div className="drawer-empty">
            <Icon name="cart" />
            <h3>Your cart is empty</h3>
            <p>Discover our newest makeup and care products and add your favorites to the cart.</p>
            <Link className="button button-primary" href="/catalog" onClick={close}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {lines.map((l) => (
                <article className="cart-item" key={l.id}>
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
                    <p className="cart-item-price">{gel(l.price * l.qty)}</p>
                    <QtyControl value={l.qty} max={l.max} label={l.name} onChange={(n) => setQty(l.id, n)} />
                  </div>
                  <button className="cart-remove" type="button" onClick={() => remove(l.id)} aria-label={`Remove from cart: ${l.name}`}>
                    <Icon name="trash" />
                  </button>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <div className="cart-total-row">
                <span>Total</span>
                <strong>{gel(total)}</strong>
              </div>
              <div className="drawer-actions">
                <Link className="button button-secondary" href="/cart" onClick={close}>
                  View Cart
                </Link>
                <Link className="button button-primary" href="/checkout" onClick={close}>
                  Checkout
                </Link>
              </div>
              <button className="subtle-button" type="button" onClick={clear}>
                Clear Cart
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
  useEffect(() => setDraft(String(value)), [value]);
  return (
    <div className="quantity-control">
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label={`Decrease quantity: ${label}`}>
        <Icon name="minus" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={max}
        value={draft}
        aria-label={`Quantity: ${label}`}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => onChange(Number(draft))}
        onKeyDown={(e) => e.key === "Enter" && onChange(Number(draft))}
      />
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label={`Increase quantity: ${label}`}>
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
