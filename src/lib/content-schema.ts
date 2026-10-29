// Editable site content: defaults (what the site shows until an admin edits it) and the
// field layout the admin editor renders. Client-safe: no server imports here.
// Contacts and texts below are placeholders: edit them in /admin/content or replace here.

import { defaultLocale, type Locale } from "@/i18n/config";

export type Link = { label: string; href: string };
/** A picture with a link: banners, stories, mood items. */
export type Banner = { image: string; title: string; href: string };

/** Contacts and links: the same in every language. */
const siteDefaults = {
  company: "Golden Rose Georgia",
  phone: "+995500000000",
  phoneLabel: "(+995) 500 00 00 00",
  email: "info@goldenrose.ge",
  address: "თბილისი, საქართველო",
  hours: "ორშაბათი - შაბათი, 10:00 - 19:00",
  freeDeliveryFrom: 100,
  whatsapp: "995500000000",
  instagram: "https://www.instagram.com/goldenroseofficial/",
  facebook: "https://www.facebook.com/goldenroseturkiye/",
  youtube: "https://www.youtube.com/channel/UCxvfNhj6s87pPswlVloUhMg",
  tiktok: "",
  lat: 41.7151,
  lng: 44.8271,
};

/** Banner pictures with text on them come in each language: /img/gr/ka/…, /img/gr/en/…, /img/gr/ru/…. */
const bannerDir = { ka: "/img/gr/ka", en: "/img/gr/en", ru: "/img/gr/ru" } as const;

const q = (collection: string) => `/catalog?collection=${encodeURIComponent(collection)}`;

/** Home page pictures; `t` holds the banner titles (alt texts) of one language. */
function homeMedia(lang: Locale, t: Record<string, string>) {
  const b = (file: string) => `${bannerDir[lang]}/${file}`;
  const gr = (file: string) => `/img/gr/${file}`;
  return {
    opening: [
      { image: b("ekimfavoriler-1.webp"), title: t.favorites, href: "/catalog" },
      { image: b("thinkpink-1.webp"), title: t.thinkPink, href: "/category/lips" },
      { image: b("50indirim-1.webp"), title: t.sale50, href: "/catalog?sale=1" },
      { image: b("nudemood-1.webp"), title: "Nude Mood", href: q("Mood Satiny Matte Lipstick") },
    ] as Banner[],
    lashBanner: [{ image: b("tubing-1920x200-1jpg-1.webp"), title: "Longest Lash Tubing Mascara", href: "/category/mascara" }] as Banner[],
    lashPair: [
      { image: b("tubing-1-1-1.webp"), title: t.lashLength, href: "/category/mascara" },
      { image: b("tubing-2-1-1.webp"), title: t.lashHowto, href: "https://www.youtube.com/watch?v=IM2HlD-Ds40" },
    ] as Banner[],
    nailCollection: "Nail Rituals",
    lipPair: [
      { image: b("1200x628-7-1.webp"), title: "Lip Butter Balm Care & Gloss", href: q("Lip Butter Balm Care&Gloss") },
      { image: b("1200x628-6-1.webp"), title: "Sweet Kiss Lip Oil Gloss", href: "/category/lip-oil" },
    ] as Banner[],
    ccBanner: [{ image: b("cc-1920x200.webp"), title: "Skin Perfector CC Light Foundation", href: "/category/foundation" }] as Banner[],
    ccPair: [
      { image: b("cc-1200x628-2-1.webp"), title: t.ccLook, href: "/category/foundation" },
      { image: b("cc-1200x628-1-1.webp"), title: t.ccHowto, href: "https://www.youtube.com/watch?v=tvaP9Ty0gfY" },
    ] as Banner[],
    // Story, mood and video pictures carry no text: shared by all languages.
    stories: [
      { image: gr("g1-tr-18.webp"), title: "Lash Tubing Mascara", href: "/category/mascara" },
      { image: gr("sp-webstory-tr-22.webp"), title: "Skin Perfector CC Light Foundation", href: "/category/foundation" },
      { image: gr("lbb-webstory-tr-21.webp"), title: "Lip Butter Balm Care&Gloss", href: "/category/lip-gloss" },
      { image: gr("website-story-gorsel-talebi6-tr-14.webp"), title: "Max Hold Brow Glue", href: "/category/brows" },
      { image: gr("g2-tr-19.webp"), title: "Silky Shine Hydrating Lipstick", href: "/category/lipstick" },
      { image: gr("gp-webstory-tr-20.webp"), title: "Gel Power Nail Lacquer", href: "/category/nail-polish" },
      { image: gr("website-story-gorsel-talebi13-tr-11.webp"), title: "Sweet Kiss Lip Oil Gloss", href: "/category/lip-oil" },
      { image: gr("website-story-gorsel-talebi4-tr-12.webp"), title: "Iconic Lash Intense Mascara", href: "/category/mascara" },
      { image: gr("website-story-gorsel-talebi7-tr-13.webp"), title: "Pure Matte Powder Lipstick", href: "/category/lipstick" },
      { image: gr("1-4--1-tr.webp"), title: "Smart Glow Liquid Highlighter", href: "/category/highlighter" },
      { image: gr("g3-tr-15.webp"), title: "BI-Phase Instant Make Up Remover", href: "/category/face-care" },
      { image: gr("mood-sparkle-bright-lipstick-154-violet-fizz-isiltili-ruj-tr-17.webp"), title: "Mood Sparkle Bright Lipstick", href: "/category/lipstick" },
      { image: gr("website-story-gorsel-talebi5-tr-16.webp"), title: "Make Up Primer", href: "/category/primer-setting-spray" },
      { image: gr("mood-shimmer-lip-glaze-lipgloss-254-berry-spark-isiltili-dudak-parlaticisi-tr-2.webp"), title: "Mood Shimmer Lip Glaze Lipgloss", href: "/category/lip-gloss" },
      { image: gr("mood-satiny-matte-lipstick-08-candy-red-mat-ruj-tr-3.webp"), title: "Mood Satiny Matte Lipstick", href: "/category/lipstick" },
      { image: gr("4-2--4-tr.webp"), title: "Glow Kiss Tinted Lip Balm", href: "/category/lip-balm" },
      { image: gr("5-5-tr.webp"), title: "Velvet Matte Lipstick", href: "/category/lipstick" },
      { image: gr("mood-gleamy-lip-glaze-lipgloss-203-rose-chic-renkli-dudak-parlaticisi-tr-6.webp"), title: "Mood Gleamy Lip Glaze Lipgloss", href: "/category/lip-gloss" },
      { image: gr("7-7-tr.webp"), title: "Flash Liner Colored Eyeliner", href: "/category/eyeliner" },
      { image: gr("mood-sheer-bright-lipstick-106-peachy-pink-parlak-ruj-tr-10.webp"), title: "Mood Sheer Bright Lipstick", href: "/category/lipstick" },
      { image: gr("8-8-tr.webp"), title: "Juicy Tint Lip & Cheek", href: "/category/blush" },
    ] as Banner[],
    baseBanner: [{ image: b("baz-baslik-1.webp"), title: t.base, href: "/category/face" }] as Banner[],
    cheekTrio: [
      { image: b("scg-1-1-1.webp"), title: t.cheekFresh, href: "/category/blush" },
      { image: b("scg-2-1-1.webp"), title: t.cheekHowto, href: "https://www.youtube.com/watch?v=PgJqOqJyKMo" },
      { image: b("scg-3-1-1.webp"), title: t.cheekGlow, href: "/category/highlighter" },
    ] as Banner[],
    newSearch: "Mood",
    lipFeature: [{ image: b("lbb-1080x1080.webp"), title: "Lip Butter Balm", href: q("Lip Butter Balm Care&Gloss") }] as Banner[],
    lipCollection: "Lip Butter Balm Care&Gloss",
    browFeature: [{ image: b("adsiz-tasarim-36.webp"), title: "Max Hold Brow Glue", href: q("Max Hold Brow Glue") }] as Banner[],
    browCollection: "Max Hold Brow Glue",
    eyeTrio: [
      { image: b("eg-3-2-1.webp"), title: t.eyeWet, href: q("Eye Glaze Liquid Eyeshadow") },
      { image: b("eg-1-3-1.webp"), title: t.eyeGlow, href: "https://www.youtube.com/watch?v=-BHHZPu2aD0" },
      { image: b("eg-2-3-1.webp"), title: t.eyeFormula, href: q("Eye Glaze Liquid Eyeshadow") },
    ] as Banner[],
    eyeCollection: "Eye Glaze Liquid Eyeshadow",
    moodLips: [
      { image: gr("r-sat-06-1-tr-1.webp"), title: "Mood Satiny", href: q("Mood Satiny Matte Lipstick") },
      { image: gr("r-spa-153-1-tr-4.webp"), title: "Mood Sparkle Bright Lipstick", href: q("Mood Sparkle Bright Lipstick") },
      { image: gr("r-she-102-1-tr-3.webp"), title: "Mood Sheer", href: q("Mood Sheer Bright Lipstick") },
      { image: gr("k-mdl-07-1-tr-2.webp"), title: "Dream Lips Lipliner", href: "/category/lip-liner" },
    ] as Banner[],
    moodEyes: [
      { image: gr("k-gte-106-1-tr-7.webp"), title: "Tattoo Gel Eyepencil", href: "/category/eye-pencil" },
      { image: gr("p-sce-m03-1-tr-3.webp"), title: "Soft Color Matte Mono Eyeshadow", href: "/category/eyeshadow" },
      { image: gr("k-lmw-207-1-tr-2.webp"), title: "Liner Matic Waterproof Eyepencil", href: "/category/eye-pencil" },
      { image: gr("p-sce-p44-1-tr-6.webp"), title: "Soft Color Pearl Mono Eyeshadow", href: "/category/eyeshadow" },
      { image: gr("p-sge-54-2-tr-1.webp"), title: "Sparkle Glow", href: "/category/eyeshadow" },
      { image: gr("m-fle-104-01-tr-5.webp"), title: "Flash Liner Colored Eyeliner", href: "/category/eyeliner" },
      { image: gr("m-flm-010-01-tr-4.webp"), title: "Flash Lash Colored Mascara", href: "/category/colored-mascara" },
    ] as Banner[],
    reels: [
      { image: gr("sizden-gelenler-1-tr-1.webp"), title: t.video, href: "https://www.youtube.com/shorts/4TIVUaLw_kc" },
      { image: gr("sizden-gelenler-4-tr-2.webp"), title: t.video, href: "https://www.youtube.com/shorts/9Ihm_ooFdVo" },
      { image: gr("sizden-gelenler-2-tr-3.webp"), title: t.video, href: "https://www.youtube.com/shorts/i-8nHAb4s_A" },
      { image: gr("sizden-gelenler-5-tr-4.webp"), title: t.video, href: "https://www.youtube.com/shorts/w98xE9XxllE" },
      { image: gr("sizden-gelenler-3-tr-5.webp"), title: t.video, href: "https://www.youtube.com/shorts/E3bIanyZG9I" },
    ] as Banner[],
    storeBanner: [{ image: b("kioskbaslik-1.webp"), title: t.store, href: "/contact" }] as Banner[],
  };
}

const ka = {
  site: siteDefaults,
  header: {
    announcements: ["უფასო მიწოდება 100 ₾-ზე მეტი შეკვეთისას!", "ახალი კოლექციები უკვე მარაგშია!"],
    searchPlaceholder: "მოძებნე პროდუქტი, კატეგორია ან კოლექცია",
    navLinks: [
      { label: "სიახლეები", href: "/catalog?sort=new" },
      { label: "აქციები", href: "/catalog?sale=1" },
    ] as Link[],
  },
  footer: {
    newsletterTitle: "გამოიწერე Golden Rose-ის სიახლეები!",
    newsletterText: "გამოიწერე ჩვენი სიახლეები და პირველმა გაიგე აქციებისა და ახალი პროდუქციის შესახებ!",
    categoriesTitle: "კატეგორიები",
    menuTitle: "ინფორმაცია",
    menuLinks: [
      { label: "ჩვენ შესახებ", href: "/about" },
      { label: "მიწოდება და გადახდა", href: "/delivery" },
      { label: "ხშირად დასმული კითხვები", href: "/faq" },
      { label: "კონტაქტი", href: "/contact" },
    ] as Link[],
    contactTitle: "მისამართი და კონტაქტი",
    copyright: "© Golden Rose Georgia",
  },
  home: {
    nailTitle: "ფრჩხილის მოვლის ახალი პროდუქცია",
    newTitle: "სიახლეები",
    lipTitle: "ბზინვარება ტუჩებზე, ფერი ღიმილში",
    browTitle: "ახალი ფერები Max Hold-ში!",
    finderEyebrow: "GOLDEN ROSE",
    finderTitle: "იპოვე შენი ტონალური კრემი",
    finderText: "აირჩიე შენთვის სასურველი პარამეტრები და ჩვენ შეგირჩევთ ტონებს, რომლებიც შენს კანსა და მოლოდინს მოერგება.",
    moodLipTitle: "როგორი განწყობა გაქვს დღეს?",
    moodLipText: "პრიალა, სატინისებრი მქრქალი თუ თამამი… აირჩიე შენი განწყობის ფერი და ატარე ტუჩებზე.",
    moodEyeTitle: "რა ფერია დღეს შენი მზერა?",
    moodEyeText: "კლასიკური, ფერადი თუ მბზინავი… აირჩიე განწყობის ტონი და გამოკვეთე თვალები.",
    instagramTitle: "Golden Rose Instagram-ზე",
    instagramText: "უახლესი პროდუქცია, მაკიაჟის რჩევები და სილამაზის შთაგონება.",
    instagramButton: "გამოგვყევი Instagram-ზე",
    socialTitle: "გამოგვყევი",
    assurance: [
      { title: "უსაფრთხო შოპინგი", text: "256-ბიტიანი SSL უსაფრთხოების სერტიფიკატი" },
      { title: "მარტივი დაბრუნება", text: "მარტივი დაბრუნება 14 დღის განმავლობაში" },
      { title: "სწრაფი მიწოდება", text: "შეკვეთა უსაფრთხოდ მოგივა კარამდე" },
    ],
  },
  homeMedia: homeMedia("ka", {
    favorites: "ოქტომბრის ფავორიტები",
    thinkPink: "იფიქრე ვარდისფრად",
    sale50: "50% ფასდაკლება",
    lashLength: "ლეგენდარული სიგრძე — ხელოვნური წამწამების ეფექტი",
    lashHowto: "ნახე, როგორ წაისვა Longest Lash",
    ccLook: "გლუვი, მბზინავი იერი",
    ccHowto: "ნახე, როგორ წაისვა Skin Perfector",
    base: "მაკიაჟის იდეალური დასაწყისი",
    cheekFresh: "ბუნებრივი იერი, ახალი ლოყები",
    cheekHowto: "ნახე, როგორ წაისვა Smart Cheek და Smart Glow",
    cheekGlow: "ბუნებრივი, მბზინავი ნათება",
    eyeWet: "სველი ეფექტის ბზინვარება",
    eyeGlow: "ნათების ეფექტი თვალის მაკიაჟში",
    eyeFormula: "აღმოაჩინე მბზინავი თვალების ფორმულა",
    video: "Golden Rose-ის ვიდეო",
    store: "გაიცანი Golden Rose ახლოდან",
  }),
  about: {
    title: "ჩვენ შესახებ",
    intro: "Golden Rose 1979 წელს დაარსებული კოსმეტიკური ბრენდია: დეკორატიული კოსმეტიკა სახის, თვალების, ტუჩებისა და ფრჩხილებისთვის ხელმისაწვდომ ფასად.",
    note: "ჩვენს ონლაინ მაღაზიაში ოფიციალური დისტრიბუტორის ორიგინალი პროდუქციაა.",
    stats: [
      { value: "1000+", label: "პროდუქტი და ტონი" },
      { value: "1-3 დღე", label: "მიწოდება თბილისში" },
    ],
    missionTitle: "რას გთავაზობთ",
    mission: [
      "პომადები, ტუჩის გლოსები, ტუშები, ჩრდილები, ტონალური კრემები, პუდრები, ფრჩხილის ლაქები და მოვლის საშუალებები.",
      "დაგეხმარებით სწორი პროდუქტისა და ტონის შერჩევაში - უბრალოდ დაგვირეკეთ ან მოგვწერეთ.",
    ],
    reasonsTitle: "რატომ ჩვენ?",
    reasonsText: "ჩვენ გთავაზობთ:",
    reasons: ["ორიგინალ პროდუქციას", "ხელმისაწვდომ ფასებს", "სწრაფ მიწოდებას"],
    howtoEyebrow: "GOLDEN ROSE",
    howtoTitle: "დაგვიკავშირდით",
    howtoText: "გაქვთ შეკითხვა ან გჭირდებათ დახმარება ტონის შერჩევაში? დაგვირეკეთ ან მოგვწერეთ.",
  },
  contact: {
    title: "კონტაქტი",
    text: "გაქვთ შეკითხვა? დაგვირეკეთ ან მოგვწერეთ და სწრაფად გიპასუხებთ.",
    boxEyebrow: "კონსულტაცია",
    boxTitle: "დაგეხმარებით შენი ტონის პოვნაში",
    boxText: "გვითხარი შენი კანის ტიპი და სასურველი იერი - შეგირჩევთ შესაფერის პროდუქტს.",
    boxPoints: ["უფასო კონსულტაცია", "ორიგინალი პროდუქცია", "სწრაფი მიწოდება"],
    boxButton: "მოგვწერე",
  },
  delivery: {
    title: "მიწოდება და გადახდა",
    sections: [
      {
        title: "მიწოდება",
        text: "თბილისში მიწოდება 1-3 სამუშაო დღეში ხდება. 100 ₾-ზე მეტი შეკვეთის მიწოდება თბილისში უფასოა. რეგიონებში მიწოდების ღირებულება და ვადა შეკვეთისას დაზუსტდება.",
      },
      {
        title: "გადახდა",
        text: "შეკვეთის შემდეგ ოპერატორი დაგიკავშირდებათ დასადასტურებლად. გადახდა შეგიძლიათ ნაღდი ფულით მიტანისას ან საბანკო გადარიცხვით.",
      },
    ],
  },
  faq: {
    title: "ხშირად დასმული კითხვები",
    items: [
      { question: "პროდუქცია ორიგინალია?", answer: "დიახ. ყველა პროდუქტი ოფიციალური დისტრიბუტორისგანაა." },
      { question: "შემიძლია პროდუქტის დაბრუნება?", answer: "გაუხსნელი პროდუქტის დაბრუნება შესაძლებელია მიწოდებიდან 14 დღის განმავლობაში." },
      { question: "რამდენ ხანში მოდის შეკვეთა?", answer: "თბილისში 1-3 სამუშაო დღე, რეგიონებში 3-7 დღე." },
    ],
  },
};

export type Content = typeof ka;
export type ContentKey = keyof Content;

const en: Content = {
  site: siteDefaults,
  header: {
    announcements: ["Free delivery on orders over 100 ₾!", "New collections are now in stock!"],
    searchPlaceholder: "Search for a product, category or collection",
    navLinks: [
      { label: "New Arrivals", href: "/catalog?sort=new" },
      { label: "Campaigns", href: "/catalog?sale=1" },
    ],
  },
  footer: {
    newsletterTitle: "Subscribe to the Golden Rose Newsletter!",
    newsletterText: "Subscribe to our newsletter to hear about campaigns and new arrivals first!",
    categoriesTitle: "Categories",
    menuTitle: "Information",
    menuLinks: [
      { label: "About Us", href: "/about" },
      { label: "Delivery & Payment", href: "/delivery" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
    contactTitle: "Address & Contact",
    copyright: "© Golden Rose Georgia",
  },
  home: {
    nailTitle: "Our New Nail Care Products",
    newTitle: "New Arrivals",
    lipTitle: "Shine on Your Lips, Color in Your Smile",
    browTitle: "New Colors in Max Hold!",
    finderEyebrow: "GOLDEN ROSE",
    finderTitle: "Find Your Foundation",
    finderText: "Choose your preferences and let us find the foundation shades that suit your skin and expectations.",
    moodLipTitle: "What's Your Mood Today?",
    moodLipText: "Glossy, satin matte or bold… Pick the color that matches your mood and wear it on your lips.",
    moodEyeTitle: "What Color Is Your Look Today?",
    moodEyeText: "Classic, colorful or shimmering… Pick the shade for your mood and make your eyes stand out.",
    instagramTitle: "Golden Rose on Instagram",
    instagramText: "The newest products, makeup tips and beauty inspiration.",
    instagramButton: "Follow us on Instagram",
    socialTitle: "Follow Us",
    assurance: [
      { title: "SECURE SHOPPING", text: "256-bit SSL security certificate" },
      { title: "EASY RETURNS", text: "Easy returns within 14 days" },
      { title: "FAST DELIVERY", text: "Your order delivered safely to your door" },
    ],
  },
  homeMedia: homeMedia("en", {
    favorites: "October Favorites",
    thinkPink: "Think Pink",
    sale50: "50% Off",
    lashLength: "Legendary Length — False Lash Effect",
    lashHowto: "See how to apply Longest Lash",
    ccLook: "A Smooth, Radiant Look",
    ccHowto: "See how to apply Skin Perfector",
    base: "The Perfect Start to Your Makeup",
    cheekFresh: "Natural Look, Fresh Cheeks",
    cheekHowto: "See how to apply Smart Cheek and Smart Glow",
    cheekGlow: "A Natural, Radiant Glow",
    eyeWet: "Wet-Look Shimmer",
    eyeGlow: "The Glow Effect in Eye Makeup",
    eyeFormula: "Discover the Formula of Radiant Eyes",
    video: "Golden Rose beauty video",
    store: "Discover Golden Rose Up Close",
  }),
  about: {
    title: "About Us",
    intro: "Golden Rose is a cosmetics brand founded in 1979: color cosmetics for face, eyes, lips and nails at affordable prices.",
    note: "Our online store offers original products from the official distributor.",
    stats: [
      { value: "1000+", label: "products and shades" },
      { value: "1-3 days", label: "delivery in Tbilisi" },
    ],
    missionTitle: "What We Offer",
    mission: [
      "Lipsticks, lip glosses, mascaras, eyeshadows, foundations, powders, nail polishes and care products.",
      "We will help you choose the right product and shade - just call or message us.",
    ],
    reasonsTitle: "Why Us?",
    reasonsText: "We offer:",
    reasons: ["Original products", "Affordable prices", "Fast delivery"],
    howtoEyebrow: "GOLDEN ROSE",
    howtoTitle: "Get in Touch",
    howtoText: "Have a question or need help choosing a shade? Call or message us.",
  },
  contact: {
    title: "Contact Us",
    text: "Have a question? Call or message us and we will get back to you quickly.",
    boxEyebrow: "Consultation",
    boxTitle: "We will help you find your shade",
    boxText: "Tell us your skin type and the look you want - we will suggest the right product.",
    boxPoints: ["Free consultation", "Original products", "Fast delivery"],
    boxButton: "Message us",
  },
  delivery: {
    title: "Delivery & Payment",
    sections: [
      {
        title: "Delivery",
        text: "Delivery in Tbilisi takes 1-3 business days. Orders over 100 ₾ ship free in Tbilisi. Delivery cost and time for the regions are confirmed with your order.",
      },
      {
        title: "Payment",
        text: "After you place an order, our operator will contact you to confirm it. You can pay in cash on delivery or by bank transfer.",
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      { question: "Are the products original?", answer: "Yes. All products come from the official distributor." },
      { question: "Can I return a product?", answer: "Unopened products can be returned within 14 days of delivery." },
      { question: "How long does delivery take?", answer: "1-3 business days in Tbilisi, 3-7 days in the regions." },
    ],
  },
};

const ru: Content = {
  site: siteDefaults,
  header: {
    announcements: ["Бесплатная доставка при заказе от 100 ₾!", "Новые коллекции уже в наличии!"],
    searchPlaceholder: "Найдите товар, категорию или коллекцию",
    navLinks: [
      { label: "Новинки", href: "/catalog?sort=new" },
      { label: "Акции", href: "/catalog?sale=1" },
    ],
  },
  footer: {
    newsletterTitle: "Подпишитесь на новости Golden Rose!",
    newsletterText: "Подпишитесь на рассылку и первыми узнавайте об акциях и новинках!",
    categoriesTitle: "Категории",
    menuTitle: "Информация",
    menuLinks: [
      { label: "О нас", href: "/about" },
      { label: "Доставка и оплата", href: "/delivery" },
      { label: "Частые вопросы", href: "/faq" },
      { label: "Контакты", href: "/contact" },
    ],
    contactTitle: "Адрес и контакты",
    copyright: "© Golden Rose Georgia",
  },
  home: {
    nailTitle: "Новинки для ухода за ногтями",
    newTitle: "Новинки",
    lipTitle: "Сияние на губах, цвет в улыбке",
    browTitle: "Новые оттенки Max Hold!",
    finderEyebrow: "GOLDEN ROSE",
    finderTitle: "Подберите свой тональный крем",
    finderText: "Укажите свои предпочтения, и мы подберём оттенки тонального крема, которые подойдут вашей коже и ожиданиям.",
    moodLipTitle: "Какое у вас сегодня настроение?",
    moodLipText: "Глянцевый, сатиновый матовый или яркий… Выберите цвет под настроение и подарите его губам.",
    moodEyeTitle: "Какого цвета ваш взгляд сегодня?",
    moodEyeText: "Классика, яркие цвета или сияние… Выберите оттенок под настроение и подчеркните глаза.",
    instagramTitle: "Golden Rose в Instagram",
    instagramText: "Новинки, советы по макияжу и вдохновение для красоты.",
    instagramButton: "Подписаться в Instagram",
    socialTitle: "Мы в соцсетях",
    assurance: [
      { title: "БЕЗОПАСНЫЕ ПОКУПКИ", text: "256-битный SSL-сертификат безопасности" },
      { title: "ЛЁГКИЙ ВОЗВРАТ", text: "Простой возврат в течение 14 дней" },
      { title: "БЫСТРАЯ ДОСТАВКА", text: "Бережно доставим заказ до двери" },
    ],
  },
  homeMedia: homeMedia("ru", {
    favorites: "Фавориты октября",
    thinkPink: "Думай в розовом",
    sale50: "Скидка 50%",
    lashLength: "Легендарная длина — эффект накладных ресниц",
    lashHowto: "Как наносить Longest Lash",
    ccLook: "Гладкий, сияющий вид",
    ccHowto: "Как наносить Skin Perfector",
    base: "Идеальное начало макияжа",
    cheekFresh: "Естественный образ, свежие щёчки",
    cheekHowto: "Как наносить Smart Cheek и Smart Glow",
    cheekGlow: "Естественное сияние",
    eyeWet: "Сияние с эффектом влажности",
    eyeGlow: "Эффект сияния в макияже глаз",
    eyeFormula: "Откройте формулу сияющего взгляда",
    video: "Видео Golden Rose",
    store: "Познакомьтесь с Golden Rose ближе",
  }),
  about: {
    title: "О нас",
    intro: "Golden Rose — косметический бренд, основанный в 1979 году: декоративная косметика для лица, глаз, губ и ногтей по доступным ценам.",
    note: "В нашем интернет-магазине — оригинальная продукция от официального дистрибьютора.",
    stats: [
      { value: "1000+", label: "товаров и оттенков" },
      { value: "1-3 дня", label: "доставка по Тбилиси" },
    ],
    missionTitle: "Что мы предлагаем",
    mission: [
      "Помады, блески для губ, туши, тени, тональные кремы, пудры, лаки для ногтей и средства ухода.",
      "Поможем выбрать подходящий продукт и оттенок — просто позвоните или напишите нам.",
    ],
    reasonsTitle: "Почему мы?",
    reasonsText: "Мы предлагаем:",
    reasons: ["Оригинальную продукцию", "Доступные цены", "Быструю доставку"],
    howtoEyebrow: "GOLDEN ROSE",
    howtoTitle: "Свяжитесь с нами",
    howtoText: "Есть вопрос или нужна помощь с выбором оттенка? Позвоните или напишите нам.",
  },
  contact: {
    title: "Контакты",
    text: "Есть вопрос? Позвоните или напишите нам — мы быстро ответим.",
    boxEyebrow: "Консультация",
    boxTitle: "Поможем подобрать ваш оттенок",
    boxText: "Расскажите о типе кожи и желаемом образе — мы предложим подходящий продукт.",
    boxPoints: ["Бесплатная консультация", "Оригинальная продукция", "Быстрая доставка"],
    boxButton: "Написать нам",
  },
  delivery: {
    title: "Доставка и оплата",
    sections: [
      {
        title: "Доставка",
        text: "Доставка по Тбилиси занимает 1-3 рабочих дня. Заказы от 100 ₾ доставляются по Тбилиси бесплатно. Стоимость и сроки доставки в регионы уточняются при заказе.",
      },
      {
        title: "Оплата",
        text: "После оформления заказа оператор свяжется с вами для подтверждения. Оплатить можно наличными при получении или банковским переводом.",
      },
    ],
  },
  faq: {
    title: "Частые вопросы",
    items: [
      { question: "Продукция оригинальная?", answer: "Да. Вся продукция поставляется официальным дистрибьютором." },
      { question: "Можно ли вернуть товар?", answer: "Невскрытый товар можно вернуть в течение 14 дней после доставки." },
      { question: "Сколько времени занимает доставка?", answer: "1-3 рабочих дня по Тбилиси, 3-7 дней в регионы." },
    ],
  },
};

/** What the site shows in each language until an admin edits it. */
export const localizedDefaults: Record<Locale, Content> = { ka, en, ru };

/** Georgian defaults: the shape every section is sanitized against. */
export const contentDefaults = ka;

/** Sections that are the same in every language (contacts); the rest are edited per language. */
export const SHARED_SECTIONS: ContentKey[] = ["site"];

/** Settings row key of a section: Georgian (and shared sections) under the bare key, other languages as "key@en". */
export const contentRowKey = (key: ContentKey, lang: Locale) =>
  lang === defaultLocale || SHARED_SECTIONS.includes(key) ? key : `${key}@${lang}`;


// ───────── admin editor layout ─────────

type Sub = { name: string; label: string; long?: boolean; image?: boolean };
export type FieldSpec =
  | { name: string; label: string; type: "text" | "textarea" | "number"; hint?: string }
  | { name: string; label: string; type: "list"; hint?: string; long?: boolean }
  | { name: string; label: string; type: "objects"; hint?: string; fields: Sub[]; fixed?: boolean };

const banner: Sub[] = [
  { name: "image", label: "ფოტო", image: true },
  { name: "title", label: "სათაური / აღწერა" },
  { name: "href", label: "ბმული (მაგ. /category/lips)" },
];

const link: Sub[] = [
  { name: "label", label: "ტექსტი" },
  { name: "href", label: "ბმული (მაგ. /about)" },
];

export const contentSections: { key: ContentKey; title: string; description: string; fields: FieldSpec[] }[] = [
  {
    key: "site",
    title: "საკონტაქტო ინფორმაცია",
    description: "ტელეფონი, ელფოსტა, მისამართი, სოციალური ქსელები - ჩანს ფუტერში, კონტაქტის გვერდზე და შეკვეთისას.",
    fields: [
      { name: "company", label: "კომპანიის სახელი", type: "text" },
      { name: "phoneLabel", label: "ტელეფონი (როგორც ჩანს)", type: "text", hint: "მაგ. (+995) 500 00 00 00" },
      { name: "phone", label: "ტელეფონი დასარეკად", type: "text", hint: "მხოლოდ ციფრები, მაგ. +995500000000" },
      { name: "email", label: "ელფოსტა", type: "text" },
      { name: "address", label: "მისამართი", type: "text" },
      { name: "hours", label: "სამუშაო საათები", type: "text" },
      { name: "freeDeliveryFrom", label: "უფასო მიწოდება (₾-დან)", type: "number" },
      { name: "whatsapp", label: "WhatsApp ნომერი", type: "text", hint: "ციფრები + გარეშე, მაგ. 995500000000; ცარიელი - ღილაკი დაიმალება" },
      { name: "instagram", label: "Instagram ბმული", type: "text" },
      { name: "facebook", label: "Facebook ბმული", type: "text" },
      { name: "youtube", label: "YouTube ბმული", type: "text" },
      { name: "tiktok", label: "TikTok ბმული", type: "text" },
      { name: "lat", label: "რუკა: განედი (lat)", type: "number", hint: "Google Maps-ზე წერტილზე მარჯვენა კლიკი → კოორდინატები" },
      { name: "lng", label: "რუკა: გრძედი (lng)", type: "number" },
    ],
  },
  {
    key: "header",
    title: "ჰედერი",
    description: "მოძრავი ზედა ზოლი, ძიების ველი და მენიუს დამატებითი ბმულები (კატეგორიების შემდეგ).",
    fields: [
      { name: "announcements", label: "ზედა მოძრავი ზოლის ტექსტები", type: "list" },
      { name: "searchPlaceholder", label: "ძიების ველის მინიშნება", type: "text" },
      { name: "navLinks", label: "მენიუს დამატებითი ბმულები", type: "objects", fields: link },
    ],
  },
  {
    key: "footer",
    title: "ფუტერი",
    description: "საიტის ქვედა ნაწილი. კატეგორიების სვეტი ავტომატურად ივსება მთავარი კატეგორიებით.",
    fields: [
      { name: "newsletterTitle", label: "გამოწერის ბლოკის სათაური", type: "text" },
      { name: "newsletterText", label: "გამოწერის ბლოკის ტექსტი", type: "textarea" },
      { name: "categoriesTitle", label: "კატეგორიების სვეტის სათაური", type: "text" },
      { name: "menuTitle", label: "ინფორმაციის სვეტის სათაური", type: "text" },
      { name: "menuLinks", label: "ინფორმაციის ბმულები", type: "objects", fields: link },
      { name: "contactTitle", label: "კონტაქტის სვეტის სათაური", type: "text" },
      { name: "copyright", label: "ქვედა წარწერა", type: "text" },
    ],
  },
  {
    key: "home",
    title: "მთავარი გვერდი",
    description: "პროდუქტების ბლოკების სათაურები, ტონალური კრემის შემრჩევი, განწყობის ბლოკები და გარანტიების ზოლი.",
    fields: [
      { name: "nailTitle", label: "ბლოკი 1: ფრჩხილის მოვლა", type: "text" },
      { name: "newTitle", label: "ბლოკი 2: ახალი პროდუქცია", type: "text" },
      { name: "lipTitle", label: "ბლოკი 3: Lip Butter Balm", type: "text" },
      { name: "browTitle", label: "ბლოკი 4: Max Hold", type: "text" },
      { name: "finderEyebrow", label: "ტონის შემრჩევი: ზედა წარწერა", type: "text" },
      { name: "finderTitle", label: "ტონის შემრჩევი: სათაური", type: "text" },
      { name: "finderText", label: "ტონის შემრჩევი: ტექსტი", type: "textarea" },
      { name: "moodLipTitle", label: "განწყობა (ტუჩები): სათაური", type: "text" },
      { name: "moodLipText", label: "განწყობა (ტუჩები): ტექსტი", type: "textarea" },
      { name: "moodEyeTitle", label: "განწყობა (თვალები): სათაური", type: "text" },
      { name: "moodEyeText", label: "განწყობა (თვალები): ტექსტი", type: "textarea" },
      { name: "instagramTitle", label: "Instagram: სათაური", type: "text" },
      { name: "instagramText", label: "Instagram: ტექსტი", type: "text" },
      { name: "instagramButton", label: "Instagram: ღილაკი", type: "text" },
      { name: "socialTitle", label: "სოციალური ქსელების სათაური", type: "text" },
      {
        name: "assurance",
        label: "გარანტიების ზოლი (3 ცალი)",
        type: "objects",
        fixed: true,
        fields: [
          { name: "title", label: "სათაური" },
          { name: "text", label: "ტექსტი" },
        ],
      },
    ],
  },
  {
    key: "homeMedia",
    title: "მთავარი გვერდი: ბანერები და ფოტოები",
    description: "მთავარი გვერდის ყველა ბანერი, stories, Mood ბლოკები, ვიდეოები და პროდუქტების კარუსელები - ზემოდან ქვემოთ, ისე როგორც საიტზე ჩანს.",
    fields: [
      { name: "opening", label: "1. ზედა ბანერები", type: "objects", fields: banner, hint: "სურათი 1536×1024, 4 ცალი" },
      { name: "lashBanner", label: "2. ფართო ბანერი", type: "objects", fields: banner, hint: "სურათი 1920×200" },
      { name: "lashPair", label: "3. ორი ბანერი", type: "objects", fields: banner, hint: "სურათი 1260×630" },
      { name: "nailCollection", label: "4. პროდუქტების კარუსელი: კოლექცია", type: "text", hint: "კოლექციის სახელი ზუსტად ისე, როგორც პროდუქტზეა. ცარიელი = ბლოკი დაიმალება" },
      { name: "lipPair", label: "5. ორი ბანერი", type: "objects", fields: banner, hint: "სურათი 1200×628" },
      { name: "ccBanner", label: "6. ფართო ბანერი", type: "objects", fields: banner, hint: "სურათი 1920×200" },
      { name: "ccPair", label: "7. ორი ბანერი", type: "objects", fields: banner, hint: "სურათი 1200×628" },
      { name: "stories", label: "8. Stories (მრგვალი ფოტოები)", type: "objects", fields: banner, hint: "კვადრატული ფოტო" },
      { name: "baseBanner", label: "9. ფართო ბანერი", type: "objects", fields: banner, hint: "სურათი 1920×400" },
      { name: "cheekTrio", label: "10. სამი ვერტიკალური ბანერი", type: "objects", fields: banner, hint: "სურათი 900×1200" },
      { name: "newSearch", label: "11. „ახალი პროდუქცია“: სიტყვა პროდუქტის სახელში", type: "text", hint: "მაგ. Mood. ცარიელი = უბრალოდ უახლესი პროდუქტები" },
      { name: "lipFeature", label: "12. დიდი ფოტო კარუსელის გვერდით", type: "objects", fields: banner, hint: "სურათი 1080×1080" },
      { name: "lipCollection", label: "12. კარუსელის კოლექცია", type: "text" },
      { name: "browFeature", label: "13. დიდი ფოტო კარუსელის გვერდით", type: "objects", fields: banner, hint: "სურათი 600×600" },
      { name: "browCollection", label: "13. კარუსელის კოლექცია", type: "text" },
      { name: "eyeTrio", label: "14. სამი ბანერი", type: "objects", fields: banner, hint: "სურათი 1200×600" },
      { name: "eyeCollection", label: "15. პროდუქტების კარუსელი: კოლექცია", type: "text" },
      { name: "moodLips", label: "16. Mood ბლოკი (ტუჩები)", type: "objects", fields: banner, hint: "გამჭვირვალე ფონის PNG, ვერტიკალური" },
      { name: "moodEyes", label: "17. Mood ბლოკი (თვალები)", type: "objects", fields: banner, hint: "გამჭვირვალე ფონის PNG, ვერტიკალური" },
      { name: "reels", label: "18. ვიდეოები (სოც. ქსელები)", type: "objects", fields: banner, hint: "ფოტო 400×500; ბმული - ვიდეოზე" },
      { name: "storeBanner", label: "19. ქვედა ბანერი", type: "objects", fields: banner, hint: "სურათი 1920×300" },
    ],
  },
  {
    key: "about",
    title: "ჩვენ შესახებ",
    description: "„ჩვენ შესახებ“ გვერდის ყველა ტექსტი.",
    fields: [
      { name: "title", label: "სათაური", type: "text" },
      { name: "intro", label: "აღწერა", type: "textarea" },
      { name: "note", label: "დამატებითი ტექსტი", type: "textarea" },
      {
        name: "stats",
        label: "ციფრები",
        type: "objects",
        fields: [
          { name: "value", label: "ციფრი" },
          { name: "label", label: "წარწერა" },
        ],
      },
      { name: "missionTitle", label: "შეთავაზების ბლოკის სათაური", type: "text" },
      { name: "mission", label: "შეთავაზების აბზაცები", type: "list", long: true },
      { name: "reasonsTitle", label: "„რატომ ჩვენ“ სათაური", type: "text" },
      { name: "reasonsText", label: "„რატომ ჩვენ“ ქვესათაური", type: "text" },
      { name: "reasons", label: "„რატომ ჩვენ“ პუნქტები", type: "list" },
      { name: "howtoEyebrow", label: "ქვედა ბლოკი: ზედა წარწერა", type: "text" },
      { name: "howtoTitle", label: "ქვედა ბლოკი: სათაური", type: "text" },
      { name: "howtoText", label: "ქვედა ბლოკი: ტექსტი", type: "textarea" },
    ],
  },
  {
    key: "contact",
    title: "კონტაქტი",
    description: "კონტაქტის გვერდის ტექსტები. ტელეფონი და მისამართი - „საკონტაქტო ინფორმაციაში“.",
    fields: [
      { name: "title", label: "სათაური", type: "text" },
      { name: "text", label: "ქვესათაური", type: "textarea" },
      { name: "boxEyebrow", label: "აქცენტური ბლოკი: ზედა წარწერა", type: "text" },
      { name: "boxTitle", label: "აქცენტური ბლოკი: სათაური", type: "text" },
      { name: "boxText", label: "აქცენტური ბლოკი: ტექსტი", type: "textarea" },
      { name: "boxPoints", label: "აქცენტური ბლოკი: პუნქტები", type: "list" },
      { name: "boxButton", label: "აქცენტური ბლოკი: ღილაკი", type: "text" },
    ],
  },
  {
    key: "delivery",
    title: "მიწოდება და გადახდა",
    description: "„მიწოდება და გადახდა“ გვერდი.",
    fields: [
      { name: "title", label: "სათაური", type: "text" },
      {
        name: "sections",
        label: "ბლოკები",
        type: "objects",
        fields: [
          { name: "title", label: "სათაური" },
          { name: "text", label: "ტექსტი", long: true },
        ],
      },
    ],
  },
  {
    key: "faq",
    title: "ხშირად დასმული კითხვები",
    description: "FAQ გვერდის კითხვები და პასუხები.",
    fields: [
      { name: "title", label: "სათაური", type: "text" },
      {
        name: "items",
        label: "კითხვები",
        type: "objects",
        fields: [
          { name: "question", label: "კითხვა" },
          { name: "answer", label: "პასუხი", long: true },
        ],
      },
    ],
  },
];

/** Settings row holding the home page category picks ({ ids: number[] }); kept outside the content sections. */
export const HOME_CATEGORIES_KEY = "homeCategories";
