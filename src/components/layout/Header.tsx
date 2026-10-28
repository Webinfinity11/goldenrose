import Image from "next/image";
import Link from "next/link";
import { HeaderCounters } from "@/components/cart/CartUI";
import { getCategoryTree } from "@/lib/data";
import { getContent } from "@/lib/content";
import { categoryUrl } from "@/lib/format";
import { site as brand } from "@/lib/site";
import { MobileMenuButton } from "./MobileMenu";
import { SearchBox } from "./SearchBox";

export async function Header() {
  "use cache";
  const [tree, { header }] = await Promise.all([getCategoryTree(), getContent()]);
  // The ticker scrolls by half its width, so the texts are repeated to fill it seamlessly.
  const ticker = Array.from({ length: 4 }, () => header.announcements).flat();

  return (
    <>
      {ticker.length > 0 && (
        <div className="announcement">
          <div className="announcement-track">
            {ticker.map((t, i) => (
              <span key={i} style={{ display: "contents" }}>
                <span>{t}</span>
                <i>•</i>
              </span>
            ))}
          </div>
        </div>
      )}
      <header className="site-header">
        <div className="container header-main">
          <MobileMenuButton />
          <Link className="logo" href="/" aria-label={`${brand.name} home`}>
            <Image src="/img/gr/logo.png" alt="Golden Rose — Look at the bright side" width={300} height={60} priority />
          </Link>
          <SearchBox placeholder={header.searchPlaceholder} />
          <HeaderCounters />
        </div>
        <nav className="desktop-nav" id="site-nav" aria-label="Main menu">
          <ul className="container nav-list">
            {tree.map((c) => (
              <li className="nav-item" key={c.id}>
                <Link className="nav-link" href={categoryUrl(c.slug)}>
                  {c.name}
                </Link>
                {c.children.length > 0 && (
                  <div className="mega-menu">
                    <div className="container mega-inner">
                      <div className="mega-groups">
                        {c.children.map((s) => (
                          <div className="mega-group" key={s.id}>
                            <Link href={categoryUrl(s.slug)}>{s.name}</Link>
                            {s.children.map((g) => (
                              <Link key={g.id} href={categoryUrl(g.slug)}>
                                {g.name}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                      {c.image && (
                        <Link className="mega-image" href={categoryUrl(c.slug)} tabIndex={-1}>
                          <Image src={c.image} alt={c.name} width={480} height={240} sizes="480px" />
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))}
            {header.navLinks.map((l) => (
              <li className="nav-item" key={l.href + l.label}>
                <Link className="nav-link" href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
