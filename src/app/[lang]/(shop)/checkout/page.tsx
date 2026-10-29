import type { Metadata } from "next";
import { getT } from "@/i18n/server";
import { Checkout } from "./Checkout";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t.checkout.checkoutTitle, robots: { index: false } };
}

export default function CheckoutPage() {
  return (
    <div className="container narrow">
      <Checkout />
    </div>
  );
}
