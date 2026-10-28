import type { Metadata } from "next";
import { CheckoutSteps } from "@/components/cart/CartExtras";
import { CartPage } from "./CartPage";

export const metadata: Metadata = { title: "Cart", robots: { index: false } };

export default function Page() {
  return (
    <div className="container narrow">
      <div className="pagehead checkout-head">
        <h1>Cart</h1>
        <CheckoutSteps current={0} />
      </div>
      <CartPage />
    </div>
  );
}
