"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { useT } from "@/i18n/client";

export function PriceFilter({ min, max }: { min?: number; max?: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const t = useT();
  const [from, setFrom] = useState(min ? String(min) : "");
  const [to, setTo] = useState(max ? String(max) : "");

  const apply = (f: string, t: string) => {
    const next = new URLSearchParams(params);
    for (const [k, v] of [["min", f], ["max", t]]) {
      const n = parseFloat(v);
      if (n > 0) next.set(k, String(n));
      else next.delete(k);
    }
    next.delete("page");
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <form
      className="pricefilter"
      onSubmit={(e) => {
        e.preventDefault();
        apply(from, to);
      }}
    >
      <span>{t.catalog.price}</span>
      <input inputMode="decimal" placeholder={t.catalog.from} value={from} onChange={(e) => setFrom(e.target.value)} aria-label={t.catalog.minPrice} />
      <i>-</i>
      <input inputMode="decimal" placeholder={t.catalog.to} value={to} onChange={(e) => setTo(e.target.value)} aria-label={t.catalog.maxPrice} />
      <button type="submit" aria-label={t.catalog.applyPrice}>
        <Icon name="check" />
      </button>
      {(min || max) && (
        <button
          type="button"
          className="clear"
          aria-label={t.catalog.clearPrice}
          onClick={() => {
            setFrom("");
            setTo("");
            apply("", "");
          }}
        >
          <Icon name="close" />
        </button>
      )}
    </form>
  );
}
