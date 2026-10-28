"use client";

import Image from "next/image";
import { useState } from "react";
import { Button, inputCls } from "./ui";
import { ImageUploader } from "./ImageUploader";

export type VariantDraft = {
  id?: number;
  name: string;
  /** "#rrggbb" or "" for none. */
  color: string;
  sku: string;
  price: string;
  salePrice: string;
  inStock: boolean;
  stockQty: string;
  images: string[];
};

export const emptyVariant = (name = ""): VariantDraft => ({ name, color: "", sku: "", price: "", salePrice: "", inStock: true, stockQty: "", images: [] });

/**
 * Colors / shades of a product. Each row: name, photos, price, stock. Empty price or photos fall back
 * to the product's, so a new color only needs a name and a photo.
 */
export function VariantsEditor({
  value,
  onChange,
  productImages,
  basePrice,
}: {
  value: VariantDraft[];
  onChange: (v: VariantDraft[]) => void;
  /** The product's own photos, offered as a quick pick for a variant. */
  productImages: string[];
  basePrice: string;
}) {
  const [bulk, setBulk] = useState<string | null>(null);
  const [picking, setPicking] = useState<number | null>(null);
  const set = (i: number, patch: Partial<VariantDraft>) => onChange(value.map((v, j) => (j === i ? { ...v, ...patch } : v)));
  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= value.length) return;
    const next = [...value];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const addBulk = () => {
    const names = (bulk ?? "")
      .split("\n")
      .map((n) => n.trim())
      .filter(Boolean);
    if (names.length) onChange([...value, ...names.map((n) => emptyVariant(n))]);
    setBulk(null);
  };

  return (
    <div className="space-y-3">
      {value.length === 0 ? (
        <div className="rounded-lg bg-slate-50 border border-dashed border-slate-300 p-4 text-sm text-slate-600">
          <p className="font-semibold mb-1">ამ პროდუქტს ფერები არ აქვს.</p>
          <p>
            თუ პროდუქტს რამდენიმე ფერი / ტონი აქვს (მაგ. ტუჩსაცხი 8 ფერში), დაამატეთ ისინი აქ. საიტზე იქნება ერთი გვერდი და მყიდველი ფერს იქვე
            აირჩევს - ფოტო, ფასი და მარაგი ფერის მიხედვით შეიცვლება.
          </p>
        </div>
      ) : (
        <p className="text-xs text-slate-500">
          ცარიელი ფასი = პროდუქტის ფასი ({basePrice || "0"} ₾). ცარიელი მარაგი = არ ითვლება. ფოტო თუ არ აქვს, პროდუქტის ფოტო ჩანს. პირველი ფერი
          საიტზე ავტომატურად არჩეულია.
        </p>
      )}

      {value.map((v, i) => {
        const tracked = v.stockQty.trim() !== "";
        const available = tracked ? Number(v.stockQty) > 0 : v.inStock;
        return (
          <div key={v.id ?? `new-${i}`} className={`border rounded-xl p-3 ${available ? "border-slate-200 bg-white" : "border-red-200 bg-red-50/40"}`}>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-bold text-slate-400 w-6">{i + 1}.</span>
              <ColorPicker value={v.color} onChange={(color) => set(i, { color })} />
              <input
                value={v.name}
                onChange={(e) => set(i, { name: e.target.value })}
                placeholder="ფერის სახელი, მაგ. 03 Nude Rose"
                className={`${inputCls} flex-1 min-w-48 font-semibold`}
              />
              <div className="flex gap-1 ml-auto">
                <Button type="button" variant="secondary" className="px-2.5" onClick={() => move(i, -1)} disabled={i === 0} title="ზემოთ">
                  ↑
                </Button>
                <Button type="button" variant="secondary" className="px-2.5" onClick={() => move(i, 1)} disabled={i === value.length - 1} title="ქვემოთ">
                  ↓
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="px-2.5"
                  title="დუბლირება"
                  onClick={() => onChange([...value.slice(0, i + 1), { ...v, id: undefined, name: `${v.name} (ასლი)` }, ...value.slice(i + 1)])}
                >
                  ⧉
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  className="px-2.5"
                  title="წაშლა"
                  onClick={() => confirm(`წაიშალოს ფერი „${v.name || i + 1}“?`) && onChange(value.filter((_, j) => j !== i))}
                >
                  ✕
                </Button>
              </div>
            </div>

            <div className="grid sm:grid-cols-4 gap-2 mb-3">
              <label className="text-xs text-slate-500">
                ფასი ₾
                <input type="number" min="0" step="0.01" value={v.price} onChange={(e) => set(i, { price: e.target.value })} placeholder={basePrice || "პროდუქტის"} className={inputCls} />
              </label>
              <label className="text-xs text-slate-500">
                ფასდაკლებით ₾
                <input type="number" min="0" step="0.01" value={v.salePrice} onChange={(e) => set(i, { salePrice: e.target.value })} placeholder="არა" className={inputCls} />
              </label>
              <label className="text-xs text-slate-500">
                მარაგი (ც.)
                <input type="number" min="0" step="1" value={v.stockQty} onChange={(e) => set(i, { stockQty: e.target.value })} placeholder="არ ითვლება" className={inputCls} />
              </label>
              <label className="text-xs text-slate-500">
                SKU / კოდი
                <input value={v.sku} onChange={(e) => set(i, { sku: e.target.value })} className={inputCls} />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 accent-[#174abc]" checked={available} disabled={tracked} onChange={(e) => set(i, { inStock: e.target.checked })} />
                მარაგშია {tracked && <span className="text-xs text-slate-500">(რაოდენობით)</span>}
              </label>
              {productImages.length > 0 && (
                <button type="button" className="text-[#174abc] font-semibold" onClick={() => setPicking(picking === i ? null : i)}>
                  {picking === i ? "დახურვა" : "პროდუქტის ფოტოდან არჩევა"}
                </button>
              )}
            </div>

            {picking === i && (
              <div className="flex flex-wrap gap-2 mb-2 p-2 rounded-lg bg-slate-50">
                {productImages.map((url) => {
                  const on = v.images.includes(url);
                  return (
                    <button
                      key={url}
                      type="button"
                      onClick={() => set(i, { images: on ? v.images.filter((u) => u !== url) : [...v.images, url] })}
                      className={`relative w-16 h-16 rounded-lg border-2 bg-white ${on ? "border-[#174abc]" : "border-transparent"}`}
                      title={on ? "მოხსნა" : "დამატება"}
                    >
                      <Image src={url} alt="" fill sizes="64px" className="object-contain p-1" />
                      {on && <span className="absolute -right-1 -top-1 bg-[#174abc] text-white rounded-full w-5 h-5 text-xs grid place-items-center">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}

            <ImageUploader value={v.images} onChange={(images) => set(i, { images })} max={8} compact />
          </div>
        );
      })}

      {bulk === null ? (
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="secondary" onClick={() => onChange([...value, emptyVariant()])}>
            + ფერის დამატება
          </Button>
          <Button type="button" variant="secondary" onClick={() => setBulk("")}>
            + რამდენიმე ფერი ერთად
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border border-slate-200 p-3 bg-slate-50">
          <p className="text-sm font-semibold mb-1">ჩაწერეთ ფერები, თითო ხაზზე ერთი:</p>
          <textarea
            value={bulk}
            onChange={(e) => setBulk(e.target.value)}
            rows={5}
            placeholder={"01 Bare Nude\n02 Velvet Taupe\n03 Nude Rose"}
            className={inputCls}
            autoFocus
          />
          <div className="flex gap-2 mt-2">
            <Button type="button" onClick={addBulk}>
              დამატება
            </Button>
            <Button type="button" variant="secondary" onClick={() => setBulk(null)}>
              გაუქმება
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/** Round swatch that opens the system color picker; "✕" removes the color. */
function ColorPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <span className="flex items-center gap-1">
      <label
        className="relative w-10 h-10 rounded-full border-2 border-slate-300 cursor-pointer shrink-0 overflow-hidden"
        style={{ background: value || "repeating-conic-gradient(#e2e8f0 0 25%, #fff 0 50%) 50% / 12px 12px" }}
        title={value ? `ფერი: ${value} (შესაცვლელად დააჭირეთ)` : "ფერის არჩევა"}
      >
        <input type="color" value={value || "#d4a5a5"} onChange={(e) => onChange(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer" />
      </label>
      {value && (
        <button type="button" onClick={() => onChange("")} className="text-xs text-slate-400 hover:text-red-600" title="ფერის მოხსნა">
          ✕
        </button>
      )}
    </span>
  );
}
