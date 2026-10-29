"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localeHref } from "@/i18n/config";
import { useLocale } from "@/i18n/client";

/** next/link that keeps the current language: "/catalog" becomes "/en/catalog" on the English site. */
export default function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  return <NextLink href={typeof href === "string" ? localeHref(locale, href) : href} {...props} />;
}
