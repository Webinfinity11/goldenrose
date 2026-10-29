import Link from "@/components/Link";
import { getT } from "@/i18n/server";

export default async function NotFound() {
  const t = await getT();
  return (
    <div className="container success">
      <h1>{t.checkout.notFound}</h1>
      <p className="muted">{t.checkout.notFoundText}</p>
      <Link className="primary" href="/catalog">
        {t.checkout.browseCatalog}
      </Link>
    </div>
  );
}
