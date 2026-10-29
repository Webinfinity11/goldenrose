// All interface texts by language. Client-safe; each area lives in its own file under messages/.
import type { Locale } from "./config";
import catalog from "./messages/catalog";
import checkout from "./messages/checkout";
import common from "./messages/common";
import layout from "./messages/layout";

const pick = (lang: Locale) => ({
  common: common[lang],
  layout: layout[lang],
  catalog: catalog[lang],
  checkout: checkout[lang],
});

export type Messages = ReturnType<typeof pick>;

export const messages: Record<Locale, Messages> = { ka: pick("ka"), en: pick("en"), ru: pick("ru") };

/** "{n} items" → "3 items" */
export const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (m, k) => (k in values ? String(values[k]) : m));

export * from "./config";
