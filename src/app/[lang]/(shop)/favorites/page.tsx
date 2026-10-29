import type { Metadata } from "next";
import { getT } from "@/i18n/server";
import { Favorites } from "./Favorites";

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getT()).catalog.wishlist, robots: { index: false } };
}

export default async function FavoritesPage() {
  const t = await getT();
  return (
    <div className="container">
      <div className="pagehead">
        <h1>{t.catalog.wishlist}</h1>
      </div>
      <Favorites />
    </div>
  );
}
