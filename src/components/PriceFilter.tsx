"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/Icon";

export function PriceFilter({ min, max }: { min?: number; max?: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
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
      <span>Price ₾</span>
      <input inputMode="decimal" placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} aria-label="Minimum price" />
      <i>-</i>
      <input inputMode="decimal" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} aria-label="Maximum price" />
      <button type="submit" aria-label="Apply price filter">
        <Icon name="check" />
      </button>
      {(min || max) && (
        <button
          type="button"
          className="clear"
          aria-label="Clear price filter"
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
