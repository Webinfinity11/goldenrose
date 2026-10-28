import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/gr/GrIcon";
import { getCategoryTree } from "@/lib/data";
import { categoryUrl } from "@/lib/format";
import { getContent } from "@/lib/content";
import { BackToTop } from "./MobileMenu";
import { NewsletterForm } from "./Newsletter";

export async function Footer() {
  "use cache";
  const [tree, { footer, site }] = await Promise.all([getCategoryTree(), getContent()]);
  return (
    <>
      <footer className="site-footer">
        <section className="newsletter">
          <h2>{footer.newsletterTitle}</h2>
          <p>{footer.newsletterText}</p>
          <NewsletterForm />
        </section>
        <div className="container footer-columns">
          <div className="footer-column">
            <h3>{footer.categoriesTitle}</h3>
            {tree.map((c) => (
              <Link key={c.id} href={categoryUrl(c.slug)}>
                {c.name}
              </Link>
            ))}
          </div>
          <div className="footer-column">
            <h3>{footer.menuTitle}</h3>
            {footer.menuLinks.map((l) => (
              <Link key={l.href + l.label} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className="footer-column">
            <h3>Shop</h3>
            <Link href="/catalog?sort=new">New Arrivals</Link>
            <Link href="/catalog?sale=1">Campaigns</Link>
            <Link href="/favorites">My Favorites</Link>
            <Link href="/cart">My Cart</Link>
          </div>
          <div className="footer-column contact">
            <h3>{footer.contactTitle}</h3>
            <p>{site.address}</p>
            <a href={`tel:${site.phone}`}>
              Customer Service
              <br />
              <strong>{site.phoneLabel}</strong>
            </a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <p>{site.hours}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <Image src="/img/gr/footer-bank.svg" width={289} height={30} alt="Secure payment methods" />
          <p>{footer.copyright}</p>
        </div>
      </footer>
      {site.whatsapp && (
        <a
          className="whatsapp-button"
          href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp support"
        >
          <WhatsAppIcon />
        </a>
      )}
      <BackToTop />
    </>
  );
}
