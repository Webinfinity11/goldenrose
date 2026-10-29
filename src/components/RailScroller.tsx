"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/Icon";
import { useT } from "@/i18n/client";

/**
 * Horizontal product row with prev/next arrows instead of a scrollbar.
 * With `toolbar`, the arrows sit at the right end of a row above the cards instead of over their edges.
 */
export function RailScroller({ children, toolbar }: { children: ReactNode; toolbar?: ReactNode }) {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = () => {
    const el = ref.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const go = (dir: number) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  if (toolbar !== undefined)
    return (
      <div className="rail-wrap">
        <div className="rail-toolbar">
          <div className="rail-toolbar-main">{toolbar}</div>
          <div className="rail-nav">
            <button className="rail-nav-btn" onClick={() => go(-1)} disabled={edges.start} aria-label={t.catalog.previous}>
              <Icon name="left" />
            </button>
            <button className="rail-nav-btn" onClick={() => go(1)} disabled={edges.end} aria-label={t.catalog.next}>
              <Icon name="right" />
            </button>
          </div>
        </div>
        <div className="rail" ref={ref} onScroll={update}>
          {children}
        </div>
      </div>
    );

  return (
    <div className="rail-wrap">
      <button className="rail-arrow prev" onClick={() => go(-1)} disabled={edges.start} aria-label={t.catalog.previous}>
        <Icon name="left" />
      </button>
      <div className="rail" ref={ref} onScroll={update}>
        {children}
      </div>
      <button className="rail-arrow next" onClick={() => go(1)} disabled={edges.end} aria-label={t.catalog.next}>
        <Icon name="right" />
      </button>
    </div>
  );
}
