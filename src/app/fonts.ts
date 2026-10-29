import localFont from "next/font/local";

// Open Sans (the Golden Rose design font) for the storefront; FiraGO (Georgian + Cyrillic) is its fallback
// and the admin font, BPG Nino Mtavruli the Georgian headings.
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

export const fontClasses = `${openSans.variable} ${firago.variable} ${mtavruli.variable}`;
