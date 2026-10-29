"use client";

import { useState } from "react";
import { Field, inputCls } from "./ui";

export type TranslationValue = Partial<Record<"en" | "ru", Record<string, string | undefined>>>;
type FieldDef = { name: string; label: string; long?: boolean };

const langs = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
] as const;

/** English and Russian versions of a product's or category's texts; empty fields show the Georgian text. */
export function TranslationsEditor({
  fields,
  value,
  onChange,
}: {
  fields: FieldDef[];
  value: TranslationValue;
  onChange: (v: TranslationValue) => void;
}) {
  const [lang, setLang] = useState<"en" | "ru">("en");
  const set = (name: string, text: string) => onChange({ ...value, [lang]: { ...value[lang], [name]: text } });

  return (
    <div className="grid gap-4">
      <div className="flex gap-2">
        {langs.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            className={`px-4 py-2 rounded-lg border text-sm font-semibold ${l.code === lang ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"}`}
          >
            {l.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-500 -mt-2">ცარიელი ველი საიტზე ქართულ ტექსტს აჩვენებს.</p>
      {fields.map((f) => (
        <Field key={lang + f.name} label={f.label}>
          {f.long ? (
            <textarea value={value[lang]?.[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} rows={5} className={inputCls} />
          ) : (
            <input value={value[lang]?.[f.name] ?? ""} onChange={(e) => set(f.name, e.target.value)} className={inputCls} />
          )}
        </Field>
      ))}
    </div>
  );
}
