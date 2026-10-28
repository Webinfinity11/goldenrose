import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/lib/site";
import "./globals.css";
import "./pages.css";

// Open Sans (the Golden Rose design font) for the storefront; FiraGO and BPG Nino Mtavruli keep Georgian readable in the admin.
const openSans = localFont({ src: "../fonts/OpenSans-Regular.ttf", variable: "--font-open-sans", display: "swap" });
const firago = localFont({
  src: [
    { path: "../fonts/FiraGO-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/FiraGO-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});
const mtavruli = localFont({ src: "../fonts/BPGNinoMtavruli.woff2", variable: "--font-heading", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Makeup & Beauty`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { siteName: site.name, locale: "en_US", type: "website" },
};

export const viewport: Viewport = { themeColor: "#fa8072", colorScheme: "only light" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${openSans.variable} ${firago.variable} ${mtavruli.variable}`}>
      <body>{children}</body>
    </html>
  );
}
