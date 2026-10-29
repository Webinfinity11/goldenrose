"use client";

import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import { Icon } from "@/components/Icon";
import { fill } from "@/i18n";
import { useT } from "@/i18n/client";

/** Product photos: hover magnifies under the cursor (desktop); click / the loupe button opens a full-screen view. */
export function Gallery({ images, name, badge }: { images: string[]; name: string; badge: string | null }) {
  const t = useT();
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [full, setFull] = useState(false);
  const src = images[active];

  useEffect(() => {
    if (!full) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFull(false);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [full, images.length]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div className="gallery">
      <div
        className={zoom ? "gallery-main is-zoomed" : "gallery-main"}
        onMouseMove={src ? onMove : undefined}
        onMouseLeave={() => setZoom(null)}
        onClick={() => src && setFull(true)}
      >
        {badge && <span className="badge sale-badge">{badge}</span>}
        {src ? (
          <>
            <Image
              src={src}
              alt={name}
              fill
              sizes="(max-width: 900px) 100vw, 720px"
              priority
              style={zoom ? { transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
            />
            <button
              type="button"
              className="gallery-loupe"
              aria-label={t.catalog.zoom}
              onClick={(e) => {
                e.stopPropagation();
                setFull(true);
              }}
            >
              <Icon name="search" />
            </button>
          </>
        ) : (
          <span className="noimg">{t.catalog.noImage}</span>
        )}
      </div>
      {images.length > 1 && (
        <div className="thumbs">
          {images.map((s, i) => (
            <button key={s} className={i === active ? "active" : ""} onClick={() => setActive(i)} aria-label={fill(t.catalog.image, { n: i + 1 })}>
              <Image src={s} alt="" fill sizes="76px" />
            </button>
          ))}
        </div>
      )}
      {full && src && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={name} onClick={() => setFull(false)}>
          <button type="button" className="lightbox-close" aria-label={t.catalog.close} onClick={() => setFull(false)}>
            <Icon name="close" />
          </button>
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="lightbox-nav prev"
                aria-label={t.catalog.previous}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((i) => (i - 1 + images.length) % images.length);
                }}
              >
                <Icon name="left" />
              </button>
              <button
                type="button"
                className="lightbox-nav next"
                aria-label={t.catalog.next}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((i) => (i + 1) % images.length);
                }}
              >
                <Icon name="right" />
              </button>
            </>
          )}
          <div className="lightbox-img" onClick={(e) => e.stopPropagation()}>
            <Image src={src} alt={name} fill sizes="100vw" />
          </div>
        </div>
      )}
    </div>
  );
}
