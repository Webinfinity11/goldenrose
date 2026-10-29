"use client";

import Image from "next/image";
import Link from "@/components/Link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { GrIcon } from "@/components/gr/GrIcon";
import { fill } from "@/i18n";
import { useLocaleRouter, useT } from "@/i18n/client";
import { finalPrice, gel, productUrl } from "@/lib/format";
import type { ProductCard } from "@/lib/data";

export function SearchBox({ placeholder }: { placeholder: string }) {
  const router = useLocaleRouter();
  const { layout: t, locale } = useT();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<ProductCard[]>([]);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const boxRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement | null)?.tagName ?? "";
      if (e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(tag)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => !boxRef.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) {
      setResults([]);
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(term)}&lang=${locale}`, { signal: ctrl.signal });
        const data = await res.json();
        setResults(data.items);
        setTotal(data.total);
        setOpen(true);
      } catch {}
    }, 200);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [q, locale]);

  const go = () => {
    setOpen(false);
    router.push(q.trim() ? `/catalog?q=${encodeURIComponent(q.trim())}` : "/catalog");
  };

  return (
    <form
      ref={boxRef}
      className="search-form"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        go();
      }}
    >
      <input
        ref={inputRef}
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => results.length && setOpen(true)}
        aria-label={t.searchProducts}
        placeholder={placeholder}
        autoComplete="off"
      />
      <button type="submit" aria-label={t.search}>
        <GrIcon name="search" size={18} />
        <span>{t.search}</span>
      </button>
      {open && q.trim().length >= 2 && (
        <div className="suggest">
          {results.length === 0 ? (
            <p className="suggest-empty">{fill(t.noResults, { q })}</p>
          ) : (
            <>
              {results.map((p) => (
                <Link key={p.id} href={productUrl(p.slug)} className="suggest-item" onClick={() => setOpen(false)}>
                  <span className="suggest-thumb">
                    {p.image && <Image src={p.image} alt="" width={44} height={44} />}
                  </span>
                  <span className="suggest-name">
                    {p.name}
                    {p.shade && <small>{p.shade}</small>}
                  </span>
                  <strong>{finalPrice(p) ? gel(finalPrice(p)) : ""}</strong>
                </Link>
              ))}
              <button type="submit" className="suggest-all">
                {fill(t.allResults, { n: total })} <Icon name="arrow" />
              </button>
            </>
          )}
        </div>
      )}
    </form>
  );
}
