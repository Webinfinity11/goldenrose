"use server";

import { z } from "zod";
import { db, subscribers } from "@/db";

export type SubscribeResult = { ok: boolean; message: string };

export async function subscribe(email: string): Promise<SubscribeResult> {
  const parsed = z.email().max(200).safeParse(email.trim().toLowerCase());
  if (!parsed.success) return { ok: false, message: "Please enter a valid email address." };
  await db.insert(subscribers).values({ email: parsed.data }).onConflictDoNothing();
  return { ok: true, message: "Thank you! You are now subscribed to our newsletter." };
}
