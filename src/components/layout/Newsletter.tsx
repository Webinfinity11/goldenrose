"use client";

import { useState, useTransition } from "react";
import { GrIcon } from "@/components/gr/GrIcon";
import { subscribe } from "@/lib/actions/newsletter";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [pending, start] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          const res = await subscribe(email);
          setResult(res);
          if (res.ok) setEmail("");
        });
      }}
    >
      <div className="newsletter-input">
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          aria-label="Your email address"
          required
        />
        <button type="submit" disabled={pending}>
          Subscribe <GrIcon name="arrow" size={16} />
        </button>
      </div>
      <label className="newsletter-consent">
        <input type="checkbox" required /> <span>I agree to receive news and offers by email.</span>
      </label>
      {result && (
        <p className={result.ok ? "newsletter-result" : "newsletter-result is-error"} role="status">
          {result.message}
        </p>
      )}
    </form>
  );
}
