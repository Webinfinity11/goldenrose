import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { eq } from "drizzle-orm";
import { db, settings } from "@/db";
import { contentDefaults, contentRowKey, localizedDefaults, HOME_CATEGORIES_KEY, type Content, type ContentKey } from "@/lib/content-schema";
import type { Locale } from "@/i18n/config";
import { getLocale } from "@/i18n/server";

/** Site content of a language (the request's when not given) with admin edits layered over the defaults. */
export async function getContent(locale?: Locale): Promise<Content> {
  "use cache";
  cacheLife("hours");
  cacheTag("content");
  const lang = locale ?? (await getLocale());
  const rows = new Map((await db.select().from(settings)).map((r) => [r.key, r.value]));
  const merged = structuredClone(localizedDefaults[lang]) as Record<string, Record<string, unknown>>;
  for (const key of Object.keys(merged) as ContentKey[]) {
    const saved = rows.get(contentRowKey(key, lang));
    if (saved) merged[key] = { ...merged[key], ...saved };
  }
  return merged as unknown as Content;
}

const SAFE_HREF = /^(\/(?!\/)|https?:\/\/|tel:|mailto:)/i;
const SAFE_IMAGE = /^(\/(?!\/)|https:\/\/)/i;

/**
 * Coerces an edited section to the shape of its defaults: unknown keys are dropped,
 * every value is forced to the default's type, and link targets must be safe.
 */
export function sanitizeSection(key: ContentKey, input: unknown): Record<string, unknown> {
  const shape = contentDefaults[key] as Record<string, unknown>;
  const src = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  const str = (v: unknown, max = 4000) => String(v ?? "").slice(0, max);

  for (const [name, def] of Object.entries(shape)) {
    const v = src[name];
    if (typeof def === "number") {
      const n = Number(v);
      out[name] = Number.isFinite(n) ? n : def;
    } else if (typeof def === "string") {
      const s = str(v).trim();
      out[name] = name.toLowerCase().endsWith("href") && s && !SAFE_HREF.test(s) ? def : s;
    } else if (Array.isArray(def)) {
      const list = Array.isArray(v) ? v.slice(0, 50) : [];
      if (typeof def[0] === "string" || def.length === 0) {
        out[name] = list.map((x) => str(x).trim()).filter(Boolean);
      } else {
        const keys = Object.keys(def[0] as object);
        out[name] = list
          .map((item) => {
            const o = (item && typeof item === "object" ? item : {}) as Record<string, unknown>;
            const clean: Record<string, string> = {};
            for (const k of keys) clean[k] = str(o[k]).trim();
            if ("href" in clean && clean.href && !SAFE_HREF.test(clean.href)) clean.href = "/";
            // Pictures are site paths or uploads (https); anything else is dropped.
            if ("image" in clean && clean.image && !SAFE_IMAGE.test(clean.image)) clean.image = "";
            return clean;
          })
          .filter((o) => Object.values(o).some(Boolean));
      }
    }
  }
  return out;
}

/** Category ids picked for the home page grid, in display order; null until the admin saves a selection. */
export async function getHomeCategoryIds(): Promise<number[] | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("content");
  const [row] = await db.select().from(settings).where(eq(settings.key, HOME_CATEGORIES_KEY));
  const ids = row?.value.ids;
  return Array.isArray(ids) && ids.length ? ids.map(Number).filter(Number.isInteger) : null;
}
