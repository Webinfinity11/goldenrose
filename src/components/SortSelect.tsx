"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useT } from "@/i18n/client";

const options = [
  ["default", "sortDefault"],
  ["new", "sortNew"],
  ["price-asc", "sortPriceAsc"],
  ["price-desc", "sortPriceDesc"],
  ["name", "sortName"],
] as const;

export function SortSelect({ value }: { value: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const t = useT();
  return (
    <label className="sort">
      {t.catalog.sortBy}
      <select
        value={value}
        onChange={(e) => {
          const next = new URLSearchParams(params);
          if (e.target.value === "default") next.delete("sort");
          else next.set("sort", e.target.value);
          next.delete("page");
          const qs = next.toString();
          router.push(qs ? `${pathname}?${qs}` : pathname);
        }}
      >
        {options.map(([v, key]) => (
          <option key={v} value={v}>
            {t.catalog[key]}
          </option>
        ))}
      </select>
    </label>
  );
}
