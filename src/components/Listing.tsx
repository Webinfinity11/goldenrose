import Link from "@/components/Link";
import { AttrSelect } from "@/components/AttrSelect";
import { Icon } from "@/components/Icon";
import { ProductGrid } from "@/components/ProductCard";
import { PriceFilter } from "@/components/PriceFilter";
import { SidebarTree, type SideNode } from "@/components/SidebarTree";
import { SortSelect } from "@/components/SortSelect";
import { fill } from "@/i18n";
import { getT } from "@/i18n/server";
import { getCategoryTree, getFilterOptions, getProducts, type CategoryNode, type ProductQuery, type SortKey } from "@/lib/data";

export type ListingParams = {
  q?: string;
  sort?: string;
  page?: string;
  sale?: string;
  stock?: string;
  min?: string;
  max?: string;
  brand?: string;
  collection?: string;
};

const sorts: SortKey[] = ["default", "new", "price-asc", "price-desc", "name"];

export function parseListing(sp: ListingParams): ProductQuery {
  return {
    q: sp.q?.trim().slice(0, 100) || undefined,
    sort: sorts.includes(sp.sort as SortKey) ? (sp.sort as SortKey) : "default",
    page: Math.max(1, parseInt(sp.page ?? "1") || 1),
    sale: sp.sale === "1",
    inStock: sp.stock === "1",
    minPrice: Math.max(0, parseFloat(sp.min ?? "") || 0) || undefined,
    maxPrice: Math.max(0, parseFloat(sp.max ?? "") || 0) || undefined,
    brand: sp.brand?.trim().slice(0, 60) || undefined,
    collection: sp.collection?.trim().slice(0, 80) || undefined,
  };
}

/** Builds a URL for `base` with the current filters, overriding some of them. */
function href(base: string, sp: ListingParams, patch: Partial<ListingParams>) {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries({ ...sp, ...patch })) if (v) params.set(k, v);
  if (params.get("page") === "1") params.delete("page");
  if (params.get("sort") === "default") params.delete("sort");
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}

export async function Listing({
  base,
  sp,
  category,
}: {
  base: string;
  sp: ListingParams;
  category?: { id: number; descendantIds: number[] };
}) {
  const query = parseListing(sp);
  const [tree, result, options, t] = await Promise.all([
    getCategoryTree(),
    getProducts({ ...query, categoryIds: category?.descendantIds }),
    getFilterOptions(),
    getT(),
  ]);
  const { items, total, pages } = result;
  const page = Math.min(query.page!, pages);

  return (
    <div className="listing">
      <Sidebar tree={tree} activeId={category?.id} />
      <div>
        <div className="toolbar">
          <div className="chips">
            <Link className={query.sale ? "chip selected" : "chip"} href={href(base, sp, { sale: query.sale ? "" : "1", page: "" })}>
              <Icon name="tag" /> {t.catalog.onSale}
            </Link>
            <Link className={query.inStock ? "chip selected" : "chip"} href={href(base, sp, { stock: query.inStock ? "" : "1", page: "" })}>
              {t.catalog.inStockFilter}
            </Link>
            {query.q && (
              <Link className="chip selected" href={href(base, sp, { q: "", page: "" })}>
                „{query.q}“ <Icon name="close" />
              </Link>
            )}
          </div>
          {options.brands.length > 0 && <AttrSelect name="brand" label={t.catalog.brand} allLabel={fill(t.catalog.attrAll, { label: t.catalog.brand })} value={query.brand} options={options.brands} />}
          {options.collections.length > 0 && (
            <AttrSelect name="collection" label={t.catalog.collection} allLabel={fill(t.catalog.attrAll, { label: t.catalog.collection })} value={query.collection} options={options.collections} />
          )}
          <PriceFilter key={`${query.minPrice}-${query.maxPrice}`} min={query.minPrice} max={query.maxPrice} />
          <span className="resultcount">{fill(total === 1 ? t.catalog.productCountOne : t.catalog.productCount, { n: total })}</span>
          <SortSelect value={query.sort!} />
        </div>
        {items.length ? (
          <ProductGrid items={items} />
        ) : (
          <div className="product-grid">
            <div className="empty">
              <Icon name="search" />
              <h3>{t.catalog.noResults}</h3>
              <p>{t.catalog.noResultsText}</p>
              <Link className="primary" href={base}>
                {t.catalog.clearFilters}
              </Link>
            </div>
          </div>
        )}
        {pages > 1 && <Pagination labels={t.catalog} page={page} pages={pages} link={(n) => href(base, sp, { page: String(n) })} />}
      </div>
    </div>
  );
}

function Sidebar({ tree, activeId }: { tree: CategoryNode[]; activeId?: number }) {
  const strip = (n: CategoryNode): SideNode => ({
    id: n.id,
    name: n.name,
    slug: n.slug,
    image: n.image,
    count: n.count,
    children: n.children.map(strip),
  });
  return <SidebarTree tree={tree.map(strip)} activeId={activeId} />;
}

function Pagination({ labels, page, pages, link }: { labels: { pagination: string; prevPage: string; nextPage: string }; page: number; pages: number; link: (n: number) => string }) {
  const nums = [...new Set([1, page - 1, page, page + 1, pages])].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
  return (
    <nav className="pagination" aria-label={labels.pagination}>
      {page > 1 && (
        <Link href={link(page - 1)} aria-label={labels.prevPage}>
          <Icon name="left" />
        </Link>
      )}
      {nums.map((n, i) => (
        <span key={n} style={{ display: "contents" }}>
          {i > 0 && n - nums[i - 1] > 1 && <span className="gap">…</span>}
          {n === page ? (
            <span className="current" aria-current="page">
              {n}
            </span>
          ) : (
            <Link href={link(n)}>{n}</Link>
          )}
        </span>
      ))}
      {page < pages && (
        <Link href={link(page + 1)} aria-label={labels.nextPage}>
          <Icon name="right" />
        </Link>
      )}
    </nav>
  );
}

export function ListingSkeleton() {
  return (
    <div className="listing">
      <aside className="sidebar" />
      <div className="product-grid">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="product-card" style={{ height: 380, background: "var(--bg)" }} />
        ))}
      </div>
    </div>
  );
}
