"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { uploadImage } from "@/lib/actions/admin";

/** Uploads immediately (button, drag & drop or paste); the parent stores only the resulting URLs. */
export function ImageUploader({
  value,
  onChange,
  max = 12,
  compact,
  single,
}: {
  value: string[];
  onChange: (urls: string[]) => void;
  max?: number;
  /** Smaller tiles, for variants. */
  compact?: boolean;
  /** One picture filling the box (banners): uploading again replaces it. */
  single?: boolean;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(0);
  const [over, setOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setError(null);
    const list = [...files].filter((f) => f.type.startsWith("image/")).slice(0, single ? 1 : max - value.length);
    if (!list.length) return;
    setBusy(list.length);
    const urls: string[] = [];
    for (const file of list) {
      const form = new FormData();
      form.set("file", file);
      const res = await uploadImage(form);
      if (res.ok) urls.push(res.url);
      else setError(res.error);
      setBusy((n) => n - 1);
    }
    onChange(single ? urls.slice(0, 1).concat(urls.length ? [] : value) : [...value, ...urls]);
    if (input.current) input.current.value = "";
  }

  const move = (i: number, d: number) => {
    const next = [...value];
    [next[i], next[i + d]] = [next[i + d], next[i]];
    onChange(next);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        upload(e.dataTransfer.files);
      }}
      onPaste={(e) => e.clipboardData.files.length && upload(e.clipboardData.files)}
      className={over ? "rounded-lg ring-2 ring-[#174abc] ring-offset-2" : undefined}
    >
      {single && (
        <button
          type="button"
          onClick={() => input.current?.click()}
          disabled={busy > 0}
          className="relative block w-full aspect-[4/3] rounded-lg border-2 border-dashed border-slate-300 bg-white hover:border-[#174abc] text-slate-500 text-sm font-semibold overflow-hidden"
          title="ფოტოს შეცვლა"
        >
          {value[0] ? <Image src={value[0]} alt="" fill sizes="200px" className="object-contain" /> : busy > 0 ? "იტვირთება…" : "+ ფოტო"}
          {value[0] && (
            <span className="absolute inset-x-0 bottom-0 bg-black/55 text-white text-xs py-1">{busy > 0 ? "იტვირთება…" : "შეცვლა (ან გადმოათრიეთ)"}</span>
          )}
        </button>
      )}
      <div hidden={single} className={compact ? "grid grid-cols-4 sm:grid-cols-6 gap-2" : "grid grid-cols-3 sm:grid-cols-4 gap-3"}>
        {value.map((url, i) => (
          <div key={url} className="relative aspect-square rounded-lg border border-slate-200 bg-white group">
            <Image src={url} alt="" fill sizes="160px" className="object-contain p-2" />
            {i === 0 && !compact && <span className="absolute left-1 top-1 text-[11px] bg-[#174abc] text-white rounded px-1.5">მთავარი</span>}
            <div className={`absolute inset-x-1 bottom-1 flex justify-between gap-1 ${compact ? "opacity-0 group-hover:opacity-100 focus-within:opacity-100" : ""}`}>
              <button type="button" disabled={i === 0} onClick={() => move(i, -1)} className="bg-white/90 border rounded px-2 text-sm disabled:opacity-30" aria-label="მარცხნივ">←</button>
              <button type="button" onClick={() => onChange(value.filter((u) => u !== url))} className="bg-white/90 border border-red-200 text-red-600 rounded px-2 text-sm" aria-label="წაშლა">{compact ? "✕" : "წაშლა"}</button>
              <button type="button" disabled={i === value.length - 1} onClick={() => move(i, 1)} className="bg-white/90 border rounded px-2 text-sm disabled:opacity-30" aria-label="მარჯვნივ">→</button>
            </div>
          </div>
        ))}
        {value.length < max && (
          <button
            type="button"
            onClick={() => input.current?.click()}
            disabled={busy > 0}
            className="aspect-square rounded-lg border-2 border-dashed border-slate-300 text-slate-500 hover:border-[#174abc] hover:text-[#174abc] text-sm font-semibold"
          >
            {busy > 0 ? `იტვირთება… (${busy})` : compact ? "+ ფოტო" : "+ სურათის დამატება"}
            {!compact && busy === 0 && <span className="block text-xs font-normal mt-1">ან გადმოათრიეთ აქ</span>}
          </button>
        )}
      </div>
      <input ref={input} type="file" accept="image/*" multiple={!single} hidden onChange={(e) => upload(e.target.files)} />
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  );
}
