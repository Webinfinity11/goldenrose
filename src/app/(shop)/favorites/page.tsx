import type { Metadata } from "next";
import { Favorites } from "./Favorites";

export const metadata: Metadata = { title: "Wishlist", robots: { index: false } };

export default function FavoritesPage() {
  return (
    <div className="container">
      <div className="pagehead">
        <h1>Wishlist</h1>
      </div>
      <Favorites />
    </div>
  );
}
