import { notFound } from "next/navigation";

// Always a 404, so there is nothing to validate for instant navigation.
export const instant = false;

// Any unknown path inside a language shows the shop's own 404 page (with header and footer).
export default function UnknownPage() {
  notFound();
}
