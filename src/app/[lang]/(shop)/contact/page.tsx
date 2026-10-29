import type { Metadata } from "next";
import Link from "@/components/Link";
import { Icon } from "@/components/Icon";
import { getContent } from "@/lib/content";
import { fill } from "@/i18n";
import { getT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const [{ site }, { checkout: t }] = await Promise.all([getContent(), getT()]);
  return { title: t.contactTitle, description: fill(t.contactDescription, { phone: site.phoneLabel, email: site.email, address: site.address }) };
}

export default async function ContactPage() {
  const [{ contact, site }, { checkout: t, locale }] = await Promise.all([getContent(), getT()]);
  const mapSrc = `https://maps.google.com/maps?q=${site.lat},${site.lng}&z=16&hl=${locale}&output=embed`;
  return (
    <>
      <section className="pagehero compact">
        <div className="container">
          <div className="eyebrow">{t.contactTitle}</div>
          <h1>{contact.title}</h1>
          <p>{contact.text}</p>
        </div>
      </section>

      <div className="container contact">
        <div className="contact-cards">
          <a className="contact-card" href={`tel:${site.phone}`}>
            <span className="value-icon">
              <Icon name="phone" />
            </span>
            <span className="muted small">{t.phone}</span>
            <strong>{site.phoneLabel}</strong>
            <span className="textlink">
              {t.callUs} <Icon name="arrow" />
            </span>
          </a>
          <a className="contact-card" href={`mailto:${site.email}`}>
            <span className="value-icon">
              <Icon name="mail" />
            </span>
            <span className="muted small">{t.email}</span>
            <strong>{site.email}</strong>
            <span className="textlink">
              {t.writeUs} <Icon name="arrow" />
            </span>
          </a>
          <a className="contact-card" href={`https://www.google.com/maps/dir/?api=1&destination=${site.lat},${site.lng}`} target="_blank" rel="noopener">
            <span className="value-icon">
              <Icon name="pin" />
            </span>
            <span className="muted small">{t.location}</span>
            <strong>{site.address}</strong>
            <span className="textlink">
              {t.viewOnMap} <Icon name="arrow" />
            </span>
          </a>
          <div className="contact-card">
            <span className="value-icon">
              <Icon name="clock" />
            </span>
            <span className="muted small">{t.workingHours}</span>
            <strong>{site.hours}</strong>
          </div>
        </div>

        <div className="contact-grid">
          <div className="map">
            <iframe src={mapSrc} title={t.map} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <aside className="contact-b2b">
            <div className="eyebrow">{contact.boxEyebrow}</div>
            <h2>{contact.boxTitle}</h2>
            <p>{contact.boxText}</p>
            {contact.boxPoints.length > 0 && (
              <ul className="trust">
                {contact.boxPoints.map((p) => (
                  <li key={p}>
                    <Icon name="check" /> {p}
                  </li>
                ))}
              </ul>
            )}
            <a className="primary wide" href={`mailto:${site.email}`}>
              {contact.boxButton} <Icon name="arrow" />
            </a>
            <Link className="textlink" href="/faq">
              {t.faq} <Icon name="arrow" />
            </Link>
          </aside>
        </div>
      </div>
    </>
  );
}
