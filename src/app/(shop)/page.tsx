import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { ProductCard } from "@/components/ProductCard";
import { Carousel } from "@/components/gr/Carousel";
import { GrIcon } from "@/components/gr/GrIcon";
import { FoundationFinder } from "@/components/home/FoundationFinder";
import { expandVariants, getCategory, getProducts, type ProductCard as Card } from "@/lib/data";
import { getContent } from "@/lib/content";
import type { Banner } from "@/lib/content-schema";

// Banners, stories, mood items and carousel sources are edited in /admin/content → "მთავარი გვერდი: ბანერები და ფოტოები".
// The sizes below are the design's picture sizes; next/image keeps each picture's own aspect ratio.
type Size = { w: number; h: number };
const external = (href: string) => /^https?:\/\//.test(href);

function Campaign({ b, size, sizes, priority }: { b: Banner; size: Size; sizes: string; priority?: boolean }) {
  if (!b.image) return null;
  const image = <Image src={b.image} width={size.w} height={size.h} alt={b.title} sizes={sizes} priority={priority} />;
  const href = b.href || "/catalog";
  return external(href) ? (
    <a className="campaign" href={href} target="_blank" rel="noopener noreferrer" aria-label={b.title}>
      {image}
    </a>
  ) : (
    <Link className="campaign" href={href} aria-label={b.title}>
      {image}
    </Link>
  );
}

function Grid({ items, cols, size, className, label }: { items: Banner[]; cols: "two" | "three" | "four"; size: Size; className: string; label: string }) {
  if (!items.length) return null;
  const sizes = { two: "(max-width: 600px) 100vw, 720px", three: "(max-width: 600px) 33vw, 480px", four: "(max-width: 600px) 50vw, 360px" }[cols];
  return (
    <section className={`container campaign-grid ${cols} ${className}`} aria-label={label}>
      {items.map((b, i) => (
        <Campaign key={b.image + i} b={b} size={size} sizes={sizes} priority={className.includes("opening") && i < 2} />
      ))}
    </section>
  );
}

function FullBanner({ items, size, className = "" }: { items: Banner[]; size: Size; className?: string }) {
  return items.slice(0, 1).map((b) => (
    <div key={b.image} className={`full-banner ${className}`}>
      <Campaign b={b} size={size} sizes="100vw" />
    </div>
  ));
}

function Products({ title, items, columns }: { title?: string; items: Card[]; columns: number }) {
  if (!items.length) return null;
  return (
    <section className="product-section" aria-label={title ?? "Golden Rose products"}>
      {title && <h2 className="block-title">{title}</h2>}
      <Carousel columns={columns}>
        {items.map((p) => (
          <ProductCard key={`${p.id}-${p.defaultVariant?.id ?? ""}`} p={p} />
        ))}
      </Carousel>
    </section>
  );
}

const assuranceIcons = ["/img/gr/aa-1-tr.svg", "/img/gr/cas-2-tr.svg", "/img/gr/caa-3-tr.svg"];

/** Products of a collection, one card per color; an empty name hides the block. */
async function collectionCards(name: string) {
  if (!name.trim()) return [];
  return expandVariants((await getProducts({ collection: name.trim() })).items);
}

export default async function HomePage() {
  "use cache";
  cacheLife("hours");

  const [{ home, homeMedia: m, site }, foundation] = await Promise.all([getContent(), getCategory("foundation")]);
  const [nails, newest, lipButter, brows, eyeGlaze, foundations] = await Promise.all([
    collectionCards(m.nailCollection),
    getProducts({ q: m.newSearch.trim() || undefined, sort: "new" }).then((r) => expandVariants(r.items)),
    collectionCards(m.lipCollection),
    collectionCards(m.browCollection),
    collectionCards(m.eyeCollection),
    foundation ? getProducts({ categoryIds: foundation.descendantIds }).then((r) => r.items) : [],
  ]);

  const socials = [
    [site.instagram, "Instagram", "/img/gr/tr_img_1_1.svg"],
    [site.youtube, "YouTube", "/img/gr/tr_img_1_2.svg"],
    [site.facebook, "Facebook", "/img/gr/tr_img_1_5.svg"],
  ].filter(([href]) => href);

  return (
    <>
      <Grid cols="four" className="opening-campaigns" label="Campaigns" items={m.opening} size={{ w: 1536, h: 1024 }} />
      <FullBanner items={m.lashBanner} size={{ w: 1920, h: 200 }} />
      <Grid cols="two" className="spaced" label="Longest Lash" items={m.lashPair} size={{ w: 1260, h: 630 }} />
      <div className="container standard-products">
        <Products title={home.nailTitle} items={nails.slice(0, 24)} columns={5} />
      </div>
      <Grid cols="two" className="spaced" label="Favorites" items={m.lipPair} size={{ w: 1200, h: 628 }} />
      <FullBanner items={m.ccBanner} size={{ w: 1920, h: 200 }} />
      <Grid cols="two" className="spaced" label="Skin Perfector" items={m.ccPair} size={{ w: 1200, h: 628 }} />
      <FoundationFinder
        eyebrow={home.finderEyebrow}
        title={home.finderTitle}
        text={home.finderText}
        foundations={foundations.map((f) => ({ name: f.name, slug: f.slug }))}
      />
      {m.stories.length > 0 && (
        <section className="container stories-section" aria-label="Discover the collections">
          <Carousel story label="collections">
            {m.stories.map((s, i) => (
              <Link key={s.image + i} className="story" href={s.href || "/catalog"}>
                <div className="story-ring">{s.image && <Image src={s.image} alt={s.title} width={140} height={140} sizes="140px" />}</div>
                <span>{s.title}</span>
              </Link>
            ))}
          </Carousel>
        </section>
      )}
      <FullBanner items={m.baseBanner} size={{ w: 1920, h: 400 }} />
      <Grid cols="three" className="spaced" label="Smart Cheek and Smart Glow" items={m.cheekTrio} size={{ w: 900, h: 1200 }} />
      <div className="container new-products">
        <Products title={home.newTitle} items={newest.slice(0, 30)} columns={4} />
      </div>
      <Feature banner={m.lipFeature[0]} size={{ w: 1080, h: 1080 }} title={home.lipTitle} items={lipButter} />
      <Feature banner={m.browFeature[0]} size={{ w: 600, h: 600 }} title={home.browTitle} items={brows} />
      <Grid cols="three" className="eye-campaigns" label="Eye Glaze" items={m.eyeTrio} size={{ w: 1200, h: 600 }} />
      {eyeGlaze.length > 0 && (
        <div className="container eye-products">
          <Products items={eyeGlaze} columns={5} />
        </div>
      )}
      {(m.moodLips.length > 0 || m.moodEyes.length > 0) && (
        <section className="container mood-grid">
          <MoodPanel color="pink" title={home.moodLipTitle} text={home.moodLipText} items={m.moodLips} />
          <MoodPanel color="blue" title={home.moodEyeTitle} text={home.moodEyeText} items={m.moodEyes} />
        </section>
      )}
      {site.instagram && (
        <section className="instagram-invite">
          <h2 className="block-title">{home.instagramTitle}</h2>
          <p>{home.instagramText}</p>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer">
            {home.instagramButton} <GrIcon name="arrow" size={16} />
          </a>
        </section>
      )}
      <section className="social-section">
        <div className="container">
          <h2 className="block-title">{home.socialTitle}</h2>
          {socials.length > 0 && (
            <div className="social-icons">
              {socials.map(([href, label, icon]) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Image src={icon} width={40} height={40} alt="" />
                </a>
              ))}
            </div>
          )}
          <div className="social-reels">
            {m.reels.map((r, i) =>
              r.image ? (
                <a key={r.image + i} className="reel" href={r.href || site.instagram || "#"} target="_blank" rel="noopener noreferrer" aria-label={r.title}>
                  <Image src={r.image} width={400} height={500} alt={r.title} sizes="(max-width: 600px) 44vw, 280px" />
                  <span className="reel-play">
                    <GrIcon name="play" size={20} />
                  </span>
                </a>
              ) : null,
            )}
          </div>
        </div>
      </section>
      <section className="assurance container">
        {home.assurance.slice(0, 3).map((a, i) => (
          <div key={i}>
            <Image src={assuranceIcons[i]} alt="" width={24} height={24} />
            <strong>{a.title}</strong>
            <span>{a.text}</span>
          </div>
        ))}
      </section>
      <FullBanner className="store-banner" items={m.storeBanner} size={{ w: 1920, h: 300 }} />
    </>
  );
}

function Feature({ banner, size, title, items }: { banner?: Banner; size: Size; title: string; items: Card[] }) {
  if (!banner?.image && !items.length) return null;
  return (
    <section className="container feature-grid">
      <div className="feature-image">{banner && <Campaign b={banner} size={size} sizes="(max-width: 600px) 100vw, 600px" />}</div>
      <div className="feature-products">
        <Products title={title} items={items} columns={3} />
      </div>
    </section>
  );
}

function MoodPanel({ color, title, text, items }: { color: string; title: string; text: string; items: Banner[] }) {
  return (
    <section className={`mood-panel ${color}`}>
      <h2 className="block-title">{title}</h2>
      <p>{text}</p>
      <Carousel trackClass="mood-items" label="products">
        {items.map((b, i) => (
          <Link key={b.image + i} href={b.href || "/catalog"}>
            {b.image && <Image src={b.image} alt={b.title} width={300} height={450} sizes="(max-width: 600px) 30vw, 200px" />}
            <span>{b.title}</span>
          </Link>
        ))}
      </Carousel>
    </section>
  );
}
