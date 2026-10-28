"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { GrIcon } from "./GrIcon";

/** Horizontal scroller with round prev/next arrows; wraps around at both ends, as in the design. */
export function Carousel({
  children,
  columns,
  story,
  label = "products",
}: {
  children: ReactNode;
  columns?: number;
  story?: boolean;
  label?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const slide = (dir: number) => {
    const t = track.current;
    if (!t) return;
    const max = t.scrollWidth - t.clientWidth;
    if (dir > 0 && t.scrollLeft >= max - 5) t.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir < 0 && t.scrollLeft <= 5) t.scrollTo({ left: max, behavior: "smooth" });
    else t.scrollBy({ left: t.clientWidth * dir, behavior: "smooth" });
  };
  const size = story ? 16 : 18;
  return (
    <div className={story ? "story-carousel" : "carousel"} style={columns ? ({ "--columns": columns } as CSSProperties) : undefined}>
      <button type="button" className="carousel-arrow prev" onClick={() => slide(-1)} aria-label={`Previous ${label}`}>
        <GrIcon name="prev" size={size} />
      </button>
      <div ref={track} className={story ? "story-track" : "product-track"}>
        {children}
      </div>
      <button type="button" className="carousel-arrow next" onClick={() => slide(1)} aria-label={`Next ${label}`}>
        <GrIcon name="next" size={size} />
      </button>
    </div>
  );
}
