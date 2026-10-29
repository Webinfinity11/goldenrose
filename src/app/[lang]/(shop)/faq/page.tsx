import type { Metadata } from "next";
import { ContactBox } from "@/components/ContactBox";
import { getContent } from "@/lib/content";
import { getT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t.checkout.faq };
}

export default async function FaqPage() {
  const [{ faq }, t] = await Promise.all([getContent(), getT()]);
  return (
    <>
      <section className="pagehero compact">
        <div className="container">
          <div className="eyebrow">{t.checkout.faqShort}</div>
          <h1>{faq.title}</h1>
        </div>
      </section>
      <div className="container faq">
        {faq.items.map((item, i) => (
          <details key={item.question} open={i === 0}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
        <ContactBox />
      </div>
    </>
  );
}
