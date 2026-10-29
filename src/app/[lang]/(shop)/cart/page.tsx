import type { Metadata } from "next";
import { CheckoutSteps } from "@/components/cart/CartExtras";
import { getT } from "@/i18n/server";
import { CartPage } from "./CartPage";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t.checkout.cartTitle, robots: { index: false } };
}

export default async function Page() {
  const t = await getT();
  return (
    <div className="container narrow">
      <div className="pagehead checkout-head">
        <h1>{t.checkout.cartTitle}</h1>
        <CheckoutSteps current={0} />
      </div>
      <CartPage />
    </div>
  );
}
