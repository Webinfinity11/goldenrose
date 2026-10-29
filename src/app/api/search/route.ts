import { isLocale } from "@/i18n/config";
import { getProducts } from "@/lib/data";

// Route handlers can't read the [lang] root param: the search box sends the language as ?lang=.
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const q = params.get("q")?.trim().slice(0, 100) ?? "";
  if (q.length < 2) return Response.json({ items: [], total: 0 });
  const lang = params.get("lang");
  const { items, total } = await getProducts({ q, lang: isLocale(lang) ? lang : undefined });
  return Response.json({ items: items.slice(0, 6), total });
}
