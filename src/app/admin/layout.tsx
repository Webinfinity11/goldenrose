import type { Metadata } from "next";
import { site } from "@/lib/site";
import { fontClasses } from "../fonts";
import "../globals.css";
import "../pages.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "ადმინი", template: "%s · ადმინი" },
  robots: { index: false },
};

// The whole admin (login included) reads the session cookie, so navigations into it may block; opts out of instant-navigation validation.
export const instant = false;

// The admin is a root layout of its own (the storefront's is app/[lang]/layout.tsx); it stays in Georgian.
export default function AdminRoot({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka" className={fontClasses}>
      <body>
        <div className="min-h-screen bg-slate-50 text-slate-800 text-[15px]">{children}</div>
      </body>
    </html>
  );
}
