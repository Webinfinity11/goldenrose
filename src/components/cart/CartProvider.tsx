"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type FavItem = {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string | null;
  /** Stock limit when the shop tracks stock for this product (or variant). */
  max?: number;
};
/** What goes into the cart: a product, optionally in one of its variants (shades). */
export type CartItem = FavItem & { variantId?: number; variant?: string };
/** key = product id, or "product-variant" for a variant, so two shades of one product are separate lines. */
export type CartLine = CartItem & { key: string; qty: number };

const lineKey = (i: CartItem) => (i.variantId ? `${i.id}-${i.variantId}` : String(i.id));

type CartState = {
  lines: CartLine[];
  favs: FavItem[];
  count: number;
  total: number;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  add: (item: CartItem, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  toggleFav: (item: FavItem) => void;
  isFav: (id: number) => boolean;
  toast: string | null;
  notify: (message: string) => void;
};

const CartContext = createContext<CartState | null>(null);
const CART_KEY = "gr-cart";
const FAV_KEY = "gr-favs";
export const MAX_QTY = 999;

function read<T>(key: string, fallback: T): T {
  try {
    const v = JSON.parse(localStorage.getItem(key) ?? "null");
    return Array.isArray(v) ? (v as T) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [favs, setFavs] = useState<FavItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setLines(read<CartLine[]>(CART_KEY, []).map((l) => ({ ...l, key: l.key ?? lineKey(l) })));
    setFavs(read(FAV_KEY, []));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(lines));
      localStorage.setItem(FAV_KEY, JSON.stringify(favs));
    } catch {}
  }, [lines, favs, loaded]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const clampQty = (n: number, max = MAX_QTY) => Math.min(max, MAX_QTY, Math.max(1, Math.floor(n) || 1));

  const add = useCallback((item: CartItem, qty = 1) => {
    const key = lineKey(item);
    setLines((ls) => {
      const existing = ls.find((l) => l.key === key);
      if (existing) return ls.map((l) => (l.key === key ? { ...l, ...item, qty: clampQty(l.qty + qty, item.max) } : l));
      return [...ls, { ...item, key, qty: clampQty(qty, item.max) }];
    });
    setDrawerOpen(true);
  }, []);

  const value = useMemo<CartState>(
    () => ({
      lines,
      favs,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((n, l) => n + l.price * l.qty, 0),
      drawerOpen,
      setDrawerOpen,
      add,
      setQty: (key, qty) => setLines((ls) => ls.map((l) => (l.key === key ? { ...l, qty: clampQty(qty, l.max) } : l))),
      remove: (key) => setLines((ls) => ls.filter((l) => l.key !== key)),
      clear: () => setLines([]),
      toggleFav: (item) =>
        setFavs((fs) => (fs.some((f) => f.id === item.id) ? fs.filter((f) => f.id !== item.id) : [...fs, item])),
      isFav: (id) => favs.some((f) => f.id === id),
      toast,
      notify: setToast,
    }),
    [lines, favs, drawerOpen, add, toast],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
