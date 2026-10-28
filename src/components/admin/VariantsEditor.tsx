"use client";

import { useState } from "react";
import { Button, inputCls } from "./ui";
import { ImageUploader } from "./ImageUploader";

export type VariantDraft = {
  id?: number;
  name: string;
  sku: string;
  price: string;
  salePrice: string;
  inStock: boolean;
  stockQty: string;
  images: string[];
};

export const emptyVariant = (): VariantDraft => ({ name: "", sku: "", price: "", salePrice: "", inStock: true, stockQty: "", images: [] });

/** Rows of variants (shades): name, own price / stock / photos. Empty price or photos fall back to the product's. */
export function VariantsEditor({ value, onChange }: { value: VariantDraft[]; onChange: (v: VariantDraft[]) => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const set = (i: number, patch: Partial<VariantDraft>) => onChange(value.map((v, j) => (j === i ? { ...v, ...patch } : v)));
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      {value.length === 0 && (
        <p className="text-slate-500 text-sm">
          ვარიაციები არ აქვს. დაამატეთ, თუ პროდუქტს რამდენიმე ფერი / ტონი აქვს - საიტზე ერთი გვერდი იქნება და მყიდველი ფერს იქვე აირჩევს.
        </p>
      )}
      {value.map((v, i) => (
        <div key={v.id ?? `new-${i}`} className="border border-slate-200 rounded-lg p-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="w-12 h-12 rounded bg-slate-50 overflow-hidden shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {v.images[0] && <img src={v.images[0]} alt="" className="w-full h-full object-contain" />}
            </div>
            <input
              value={v.name}
              onChange={(e) => set(i, { name: e.target.value })}
              placeholder="სახელი, მაგ. 03 Nude Rose"
              className={`${inputCls} flex-1 min-w-40`}
            />
            <input
              type="number"
              min="0"
              step="0.01"
              value={v.price}
              onChange={(e) => set(i, { price: e.target.value })}
              placeholder="ფასი"
              title="ცარიელი = პროდუქტის ფასი"
              className={`${inputCls} w-24`}
            />
            <input
              type="number"
              min="0"
              step="1"
              value={v.stockQty}
              onChange={(e) => set(i, { stockQty: e.target.value })}
              placeholder="მარაგი"
              title="ცარიელი = მარაგს არ ვითვლით"
              className={`${inputCls} w-24`}
            />
            <label className="flex items-center gap-1.5 text-sm whitespace-nowrap">
              <input type="checkbox" checked={v.stockQty.trim() !== "" ? Number(v.stockQty) > 0 : v.inStock} disabled={v.stockQty.trim() !== ""} onChange={(e) => set(i, { inStock: e.target.checked })} />
              მარაგშია
            </label>
            <div className="flex gap-1">
              <Button type="button" variant="secondary" onClick={() => move(i, -1)} aria-label="ზემოთ">
                ↑
              </Button>
              <Button type="button" variant="secondary" onClick={() => move(i, 1)} aria-label="ქვემოთ">
                ↓
              </Button>
              <Button type="button" variant="secondary" onClick={() => setOpen(open === i ? null : i)}>
                {open === i ? "დახურვა" : "მეტი"}
              </Button>
              <Button type="button" variant="danger" onClick={() => onChange(value.filter((_, j) => j !== i))} aria-label="წაშლა">
                ✕
              </Button>
            </div>
          </div>
          {open === i && (
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              <label className="text-sm">
                SKU / კოდი
                <input value={v.sku} onChange={(e) => set(i, { sku: e.target.value })} className={inputCls} />
              </label>
              <label className="text-sm">
                ფასდაკლებული ფასი
                <input type="number" min="0" step="0.01" value={v.salePrice} onChange={(e) => set(i, { salePrice: e.target.value })} className={inputCls} />
              </label>
              <div className="sm:col-span-2 text-sm">
                ფოტოები (ცარიელი = პროდუქტის ფოტოები)
                <ImageUploader value={v.images} onChange={(images) => set(i, { images })} max={8} />
              </div>
            </div>
          )}
        </div>
      ))}
      <Button type="button" variant="secondary" onClick={() => onChange([...value, emptyVariant()])}>
        + ვარიაციის დამატება
      </Button>
    </div>
  );
}
