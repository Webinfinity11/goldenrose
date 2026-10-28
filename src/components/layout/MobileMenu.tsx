"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GrIcon } from "@/components/gr/GrIcon";

/** Burger button (≤991px) that opens the category list under the header. */
export function MobileMenuButton() {
  const pathname = usePathname();
  // Open for the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (o: boolean) => setOpenOn(o ? pathname : null);
  useEffect(() => {
    document.getElementById("site-nav")?.classList.toggle("mobile-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <button
      type="button"
      className="mobile-menu-button icon-button"
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="site-nav"
      onClick={() => setOpen(!open)}
    >
      <GrIcon name={open ? "close" : "menu"} />
    </button>
  );
}

/** Round "back to top" button that appears after scrolling down. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      type="button"
      className={visible ? "back-to-top visible" : "back-to-top"}
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <GrIcon name="up" size={18} />
    </button>
  );
}
