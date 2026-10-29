"use server";

import { z } from "zod";
import { db, subscribers } from "@/db";
import { defaultLocale, isLocale, messages } from "@/i18n";

export type SubscribeResult = { ok: boolean; message: string };

/** `locale` comes from the form (server actions can't read the route's language). */
export async function subscribe(email: string, locale: string = defaultLocale): Promise<SubscribeResult> {
  const t = messages[isLocale(locale) ? locale : defaultLocale].layout;
  const parsed = z.email().max(200).safeParse(email.trim().toLowerCase());
  if (!parsed.success) return { ok: false, message: t.invalidEmail };
  await db.insert(subscribers).values({ email: parsed.data }).onConflictDoNothing();
  return { ok: true, message: t.subscribed };
}
