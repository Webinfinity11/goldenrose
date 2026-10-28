"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

/** Compact dropdown for one product attribute filter (brand, country); empty value clears it. */
export function AttrSelect({ name, label, value, options }: { name: string; label: string; value?: string; options: string[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  return (
    <select
      className={value ? "attrselect selected" : "attrselect"}
      aria-label={label}
      value={value ?? ""}
      onChange={(e) => {
        const next = new URLSearchParams(params);
        if (e.target.value) next.set(name, e.target.value);
        else next.delete(name);
        next.delete("page");
        const qs = next.toString();
        router.push(qs ? `${pathname}?${qs}` : pathname);
      }}
    >
      <option value="">{label}: All</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
