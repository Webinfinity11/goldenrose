import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { ProductCard } from "@/components/ProductCard";
import { Carousel } from "@/components/gr/Carousel";
import { GrIcon } from "@/components/gr/GrIcon";
import { FoundationFinder } from "@/components/home/FoundationFinder";
import { getCategory, getProducts, type ProductCard as Card } from "@/lib/data";
import { getContent } from "@/lib/content";
import { categoryUrl } from "@/lib/format";

const img = (f: string) => `/img/gr/${f}`;
const cat = categoryUrl;
const collection = (name: string) => `/catalog?collection=${encodeURIComponent(name)}`;

type Banner = { src: string; w: number; h: number; alt: string; href: string };
const external = (href: string) => href.startsWith("http");

function Campaign({ b, sizes, priority }: { b: Banner; sizes: string; priority?: boolean }) {
  const image = <Image src={img(b.src)} width={b.w} height={b.h} alt={b.alt} sizes={sizes} priority={priority} />;
  return external(b.href) ? (
    <a className="campaign" href={b.href} target="_blank" rel="noopener noreferrer" aria-label={b.alt}>
      {image}
    </a>
  ) : (
    <Link className="campaign" href={b.href} aria-label={b.alt}>
      {image}
    </Link>
  );
}

function Grid({ items, cols, className, label }: { items: Banner[]; cols: "two" | "three" | "four"; className: string; label: string }) {
  const sizes = { two: "(max-width: 600px) 100vw, 720px", three: "(max-width: 600px) 33vw, 480px", four: "(max-width: 600px) 50vw, 360px" }[cols];
  return (
    <section className={`container campaign-grid ${cols} ${className}`} aria-label={label}>
      {items.map((b, i) => (
        <Campaign key={b.src} b={b} sizes={sizes} priority={className.includes("opening") && i < 2} />
      ))}
    </section>
  );
}

function FullBanner({ b, className = "" }: { b: Banner; className?: string }) {
  return (
    <div className={`full-banner ${className}`}>
      <Campaign b={b} sizes="100vw" />
    </div>
  );
}

function Products({ title, items, columns }: { title?: string; items: Card[]; columns: number }) {
  if (!items.length) return null;
  return (
    <section className="product-section" aria-label={title ?? "Golden Rose products"}>
      {title && <h2 className="block-title">{title}</h2>}
      <Carousel columns={columns}>
        {items.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </Carousel>
    </section>
  );
}

const stories: [string, string, string][] = [
  ["g1-tr-18.jpg", "Lash Tubing Mascara", "mascara"],
  ["sp-webstory-tr-22.jpg", "Skin Perfector CC Light Foundation", "foundation"],
  ["lbb-webstory-tr-21.jpg", "Lip Butter Balm Care&Gloss", "lip-gloss"],
  ["website-story-gorsel-talebi6-tr-14.jpg", "Max Hold Brow Glue", "brows"],
  ["g2-tr-19.jpg", "Silky Shine Hydrating Lipstick", "lipstick"],
  ["gp-webstory-tr-20.jpg", "Gel Power Nail Lacquer", "nail-polish"],
  ["website-story-gorsel-talebi13-tr-11.jpg", "Sweet Kiss Lip Oil Gloss", "lip-oil"],
  ["website-story-gorsel-talebi4-tr-12.jpg", "Iconic Lash Intense Mascara", "mascara"],
  ["website-story-gorsel-talebi7-tr-13.jpg", "Pure Matte Powder Lipstick", "lipstick"],
  ["1-4--1-tr.jpg", "Smart Glow Liquid Highlighter", "highlighter"],
  ["g3-tr-15.jpg", "BI-Phase Instant Make Up Remover", "face-care"],
  ["mood-sparkle-bright-lipstick-154-violet-fizz-isiltili-ruj-tr-17.jpg", "Mood Sparkle Bright Lipstick", "lipstick"],
  ["website-story-gorsel-talebi5-tr-16.jpg", "Make Up Primer", "primer-setting-spray"],
  ["mood-shimmer-lip-glaze-lipgloss-254-berry-spark-isiltili-dudak-parlaticisi-tr-2.jpg", "Mood Shimmer Lip Glaze Lipgloss", "lip-gloss"],
  ["mood-satiny-matte-lipstick-08-candy-red-mat-ruj-tr-3.jpg", "Mood Satiny Matte Lipstick", "lipstick"],
  ["4-2--4-tr.jpg", "Glow Kiss Tinted Lip Balm", "lip-balm"],
  ["5-5-tr.jpg", "Velvet Matte Lipstick", "lipstick"],
  ["mood-gleamy-lip-glaze-lipgloss-203-rose-chic-renkli-dudak-parlaticisi-tr-6.jpg", "Mood Gleamy Lip Glaze Lipgloss", "lip-gloss"],
  ["7-7-tr.jpg", "Flash Liner Colored Eyeliner", "eyeliner"],
  ["mood-sheer-bright-lipstick-106-peachy-pink-parlak-ruj-tr-10.jpg", "Mood Sheer Bright Lipstick", "lipstick"],
  ["8-8-tr.jpg", "Juicy Tint Lip & Cheek", "blush"],
];

const moodLips: [string, string, string][] = [
  ["r-sat-06-1-tr-1.png", "Mood Satiny", "Mood Satiny Matte Lipstick"],
  ["r-spa-153-1-tr-4.png", "Mood Sparkle Bright Lipstick", "Mood Sparkle Bright Lipstick"],
  ["r-she-102-1-tr-3.png", "Mood Sheer", "Mood Sheer Bright Lipstick"],
];
const moodEyes: [string, string, string][] = [
  ["k-gte-106-1-tr-7.png", "Tattoo Gel Eyepencil", "eye-pencil"],
  ["p-sce-m03-1-tr-3.png", "Soft Color Matte Mono Eyeshadow", "eyeshadow"],
  ["k-lmw-207-1-tr-2.png", "Liner Matic Waterproof Eyepencil", "eye-pencil"],
];

const reels = [
  ["https://www.youtube.com/shorts/4TIVUaLw_kc", "sizden-gelenler-1-tr-1.jpg"],
  ["https://www.youtube.com/shorts/9Ihm_ooFdVo", "sizden-gelenler-4-tr-2.jpg"],
  ["https://www.youtube.com/shorts/i-8nHAb4s_A", "sizden-gelenler-2-tr-3.jpg"],
  ["https://www.youtube.com/shorts/w98xE9XxllE", "sizden-gelenler-5-tr-4.jpg"],
  ["https://www.youtube.com/shorts/E3bIanyZG9I", "sizden-gelenler-3-tr-5.jpg"],
];

const assuranceIcons = ["aa-1-tr.svg", "cas-2-tr.svg", "caa-3-tr.svg"];

export default async function HomePage() {
  "use cache";
  cacheLife("hours");

  const [{ home, site }, nails, newest, lipButter, brows, eyeGlaze, foundation] = await Promise.all([
    getContent(),
    getProducts({ collection: "Nail Rituals" }),
    getProducts({ q: "Mood", sort: "new" }),
    getProducts({ collection: "Lip Butter Balm Care&Gloss" }),
    getProducts({ collection: "Max Hold Brow Glue" }),
    getProducts({ collection: "Eye Glaze Liquid Eyeshadow" }),
    getCategory("foundation"),
  ]);
  const foundations = foundation ? (await getProducts({ categoryIds: foundation.descendantIds })).items : [];

  const socials = [
    [site.instagram, "Instagram", "tr_img_1_1.svg"],
    [site.youtube, "YouTube", "tr_img_1_2.svg"],
    [site.facebook, "Facebook", "tr_img_1_5.svg"],
  ].filter(([href]) => href);

  return (
    <>
      <Grid
        cols="four"
        className="opening-campaigns"
        label="Campaigns"
        items={[
          { src: "ekimfavoriler-1-tr-1.jpg", w: 1536, h: 1024, alt: "Monthly Favorites", href: "/catalog" },
          { src: "thinkpink-1-tr-1.jpg", w: 1536, h: 1024, alt: "Think Pink", href: cat("lips") },
          { src: "50indirim-1-tr-1.jpg", w: 1536, h: 1024, alt: "50% Off", href: "/catalog?sale=1" },
          { src: "nudemood-1-tr-1.jpg", w: 1536, h: 1024, alt: "Nude Mood", href: collection("Mood Satiny Matte Lipstick") },
        ]}
      />
      <FullBanner b={{ src: "tubing-1920x200-1jpg-1-tr-1.jpg", w: 1920, h: 200, alt: "Longest Lash Tubing Mascara", href: cat("mascara") }} />
      <Grid
        cols="two"
        className="spaced"
        label="Longest Lash"
        items={[
          { src: "tubing-1-1-1-tr-1.jpg", w: 1260, h: 630, alt: "Legendary Length — False Lash Effect", href: cat("mascara") },
          { src: "tubing-2-1-1-tr-1.jpg", w: 1260, h: 630, alt: "See how to apply Longest Lash", href: "https://www.youtube.com/watch?v=IM2HlD-Ds40" },
        ]}
      />
      <div className="container standard-products">
        <Products title={home.nailTitle} items={nails.items} columns={5} />
      </div>
      <Grid
        cols="two"
        className="spaced"
        label="Autumn favorites"
        items={[
          { src: "1200x628-7-1-tr-1.jpg", w: 1200, h: 628, alt: "Lip Butter Balm Care & Gloss", href: collection("Lip Butter Balm Care&Gloss") },
          { src: "1200x628-6-1-tr-1.jpg", w: 1200, h: 628, alt: "Sweet Kiss Lip Oil Gloss", href: cat("lip-oil") },
        ]}
      />
      <FullBanner b={{ src: "cc-1920x200-tr-1.jpg", w: 1920, h: 200, alt: "Skin Perfector CC Light Foundation", href: cat("foundation") }} />
      <Grid
        cols="two"
        className="spaced"
        label="Skin Perfector"
        items={[
          { src: "cc-1200x628-2-1-tr-1.jpg", w: 1200, h: 628, alt: "A Smooth, Radiant Look", href: cat("foundation") },
          { src: "cc-1200x628-1-1-tr-1.jpg", w: 1200, h: 628, alt: "See how to apply Skin Perfector", href: "https://www.youtube.com/watch?v=tvaP9Ty0gfY" },
        ]}
      />
      <FoundationFinder
        eyebrow={home.finderEyebrow}
        title={home.finderTitle}
        text={home.finderText}
        foundations={foundations.map((f) => ({ name: f.name, slug: f.slug }))}
      />
      <section className="container stories-section" aria-label="Discover the collections">
        <Carousel story label="collections">
          {stories.map(([src, name, slug]) => (
            <Link key={src} className="story" href={cat(slug)}>
              <div className="story-ring">
                <Image src={img(src)} alt={name} width={140} height={140} sizes="140px" />
              </div>
              <span>{name}</span>
            </Link>
          ))}
        </Carousel>
      </section>
      <FullBanner b={{ src: "baz-baslik-1-tr-1.jpg", w: 1920, h: 400, alt: "The Perfect Start to Your Makeup", href: cat("face") }} />
      <Grid
        cols="three"
        className="spaced"
        label="Smart Cheek and Smart Glow"
        items={[
          { src: "scg-1-1-1-tr-1.jpg", w: 900, h: 1200, alt: "Natural Look, Fresh Cheeks", href: cat("blush") },
          { src: "scg-2-1-1-tr-1.jpg", w: 900, h: 1200, alt: "See how to apply Smart Cheek and Smart Glow", href: "https://www.youtube.com/watch?v=PgJqOqJyKMo" },
          { src: "scg-3-1-1-tr-1.jpg", w: 900, h: 1200, alt: "A Natural, Radiant Glow", href: cat("highlighter") },
        ]}
      />
      <div className="container new-products">
        <Products title={home.newTitle} items={newest.items} columns={4} />
      </div>
      <section className="container feature-grid">
        <div className="feature-image">
          <Campaign
            b={{ src: "lbb-1080x1080-tr-1.jpg", w: 1080, h: 1080, alt: "Lip Butter Balm", href: collection("Lip Butter Balm Care&Gloss") }}
            sizes="(max-width: 600px) 100vw, 600px"
          />
        </div>
        <div className="feature-products">
          <Products title={home.lipTitle} items={lipButter.items} columns={3} />
        </div>
      </section>
      <section className="container feature-grid">
        <div className="feature-image">
          <Campaign
            b={{ src: "adsiz-tasarim-36-tr-3.jpg", w: 600, h: 600, alt: "Max Hold Brow Glue", href: collection("Max Hold Brow Glue") }}
            sizes="(max-width: 600px) 100vw, 600px"
          />
        </div>
        <div className="feature-products">
          <Products title={home.browTitle} items={brows.items} columns={3} />
        </div>
      </section>
      <Grid
        cols="three"
        className="eye-campaigns"
        label="Eye Glaze"
        items={[
          { src: "eg-3-2-1-tr-1.jpg", w: 1200, h: 600, alt: "Wet-Look Shimmer", href: collection("Eye Glaze Liquid Eyeshadow") },
          { src: "eg-1-3-1-tr-1.jpg", w: 1200, h: 600, alt: "The Glow Effect in Eye Makeup", href: "https://www.youtube.com/watch?v=-BHHZPu2aD0" },
          { src: "eg-2-3-1-tr-1.jpg", w: 1200, h: 600, alt: "Discover the Formula of Radiant Eyes", href: collection("Eye Glaze Liquid Eyeshadow") },
        ]}
      />
      <div className="container eye-products">
        <Products items={eyeGlaze.items} columns={5} />
      </div>
      <section className="container mood-grid">
        <MoodPanel color="pink" title={home.moodLipTitle} text={home.moodLipText} items={moodLips.map(([s, n, c]) => [s, n, collection(c)])} />
        <MoodPanel color="blue" title={home.moodEyeTitle} text={home.moodEyeText} items={moodEyes.map(([s, n, c]) => [s, n, cat(c)])} />
      </section>
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
                  <Image src={img(icon)} width={40} height={40} alt="" />
                </a>
              ))}
            </div>
          )}
          <div className="social-reels">
            {reels.map(([href, src], i) => (
              <a key={href} className="reel" href={href} target="_blank" rel="noopener noreferrer" aria-label={`Golden Rose beauty video ${i + 1}`}>
                <Image src={img(src)} width={400} height={500} alt="Golden Rose makeup inspiration" sizes="(max-width: 600px) 44vw, 280px" />
                <span className="reel-play">
                  <GrIcon name="play" size={20} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="assurance container">
        {home.assurance.slice(0, 3).map((a, i) => (
          <div key={i}>
            <Image src={img(assuranceIcons[i])} alt="" width={24} height={24} />
            <strong>{a.title}</strong>
            <span>{a.text}</span>
          </div>
        ))}
      </section>
      <FullBanner className="store-banner" b={{ src: "kioskbaslik-1-tr-1.jpg", w: 1920, h: 300, alt: "Discover Golden Rose Up Close", href: "/contact" }} />
    </>
  );
}

function MoodPanel({ color, title, text, items }: { color: string; title: string; text: string; items: string[][] }) {
  return (
    <section className={`mood-panel ${color}`}>
      <h2 className="block-title">{title}</h2>
      <p>{text}</p>
      <div className="mood-items">
        {items.map(([src, name, href]) => (
          <Link key={src} href={href}>
            <Image src={img(src)} alt={name} width={300} height={520} sizes="(max-width: 600px) 30vw, 200px" />
            <span>{name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
