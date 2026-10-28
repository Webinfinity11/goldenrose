"use client";

import { useState, type ReactNode } from "react";

/** Full-width tab strip under the product (description, delivery, …). */
export function ProductTabs({ tabs }: { tabs: { id: string; label: string; content: ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0]?.id);
  if (!tabs.length) return null;
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  return (
    <section className="pdp-tabs">
      <div className="pdp-tablist" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={t.id === current.id}
            aria-controls={`panel-${t.id}`}
            className={t.id === current.id ? "pdp-tab active" : "pdp-tab"}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="pdp-tabpanel" role="tabpanel" id={`panel-${current.id}`} aria-labelledby={`tab-${current.id}`}>
        {current.content}
      </div>
    </section>
  );
}
