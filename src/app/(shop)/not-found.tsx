import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container success">
      <h1>Page Not Found</h1>
      <p className="muted">The product may have been removed or the link has changed.</p>
      <Link className="primary" href="/catalog">
        Browse Catalog
      </Link>
    </div>
  );
}
