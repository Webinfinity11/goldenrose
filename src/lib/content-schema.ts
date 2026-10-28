// Editable site content: defaults (what the site shows until an admin edits it) and the
// field layout the admin editor renders. Client-safe: no server imports here.
// Contacts and texts below are placeholders: edit them in /admin/content or replace here.

export type Link = { label: string; href: string };
/** A picture with a link: banners, stories, mood items. */
export type Banner = { image: string; title: string; href: string };

export const contentDefaults = {
  site: {
    company: "Golden Rose Georgia",
    phone: "+995500000000",
    phoneLabel: "(+995) 500 00 00 00",
    email: "info@goldenrose.ge",
    address: "Tbilisi, Georgia",
    hours: "Monday - Saturday, 10:00 - 19:00",
    freeDeliveryFrom: 100,
    whatsapp: "995500000000",
    instagram: "https://www.instagram.com/goldenroseofficial/",
    facebook: "https://www.facebook.com/goldenroseturkiye/",
    youtube: "https://www.youtube.com/channel/UCxvfNhj6s87pPswlVloUhMg",
    tiktok: "",
    lat: 41.7151,
    lng: 44.8271,
  },
  header: {
    announcements: ["Free delivery on orders over 100 ₾!", "New collections are now in stock!"],
    searchPlaceholder: "Search for a product, category or collection.",
    navLinks: [
      { label: "New Arrivals", href: "/catalog?sort=new" },
      { label: "Campaigns", href: "/catalog?sale=1" },
    ] as Link[],
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
    ] as Link[],
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
  homeMedia: {
    opening: [
      { image: "/img/gr/ekimfavoriler-1-tr-1.jpg", title: "Monthly Favorites", href: "/catalog" },
      { image: "/img/gr/thinkpink-1-tr-1.jpg", title: "Think Pink", href: "/category/lips" },
      { image: "/img/gr/50indirim-1-tr-1.jpg", title: "50% Off", href: "/catalog?sale=1" },
      { image: "/img/gr/nudemood-1-tr-1.jpg", title: "Nude Mood", href: "/catalog?collection=Mood%20Satiny%20Matte%20Lipstick" },
    ] as Banner[],
    lashBanner: [
      { image: "/img/gr/tubing-1920x200-1jpg-1-tr-1.jpg", title: "Longest Lash Tubing Mascara", href: "/category/mascara" },
    ] as Banner[],
    lashPair: [
      { image: "/img/gr/tubing-1-1-1-tr-1.jpg", title: "Legendary Length — False Lash Effect", href: "/category/mascara" },
      { image: "/img/gr/tubing-2-1-1-tr-1.jpg", title: "See how to apply Longest Lash", href: "https://www.youtube.com/watch?v=IM2HlD-Ds40" },
    ] as Banner[],
    nailCollection: "Nail Rituals",
    lipPair: [
      { image: "/img/gr/1200x628-7-1-tr-1.jpg", title: "Lip Butter Balm Care & Gloss", href: "/catalog?collection=Lip%20Butter%20Balm%20Care%26Gloss" },
      { image: "/img/gr/1200x628-6-1-tr-1.jpg", title: "Sweet Kiss Lip Oil Gloss", href: "/category/lip-oil" },
    ] as Banner[],
    ccBanner: [
      { image: "/img/gr/cc-1920x200-tr-1.jpg", title: "Skin Perfector CC Light Foundation", href: "/category/foundation" },
    ] as Banner[],
    ccPair: [
      { image: "/img/gr/cc-1200x628-2-1-tr-1.jpg", title: "A Smooth, Radiant Look", href: "/category/foundation" },
      { image: "/img/gr/cc-1200x628-1-1-tr-1.jpg", title: "See how to apply Skin Perfector", href: "https://www.youtube.com/watch?v=tvaP9Ty0gfY" },
    ] as Banner[],
    stories: [
      { image: "/img/gr/g1-tr-18.jpg", title: "Lash Tubing Mascara", href: "/category/mascara" },
      { image: "/img/gr/sp-webstory-tr-22.jpg", title: "Skin Perfector CC Light Foundation", href: "/category/foundation" },
      { image: "/img/gr/lbb-webstory-tr-21.jpg", title: "Lip Butter Balm Care&Gloss", href: "/category/lip-gloss" },
      { image: "/img/gr/website-story-gorsel-talebi6-tr-14.jpg", title: "Max Hold Brow Glue", href: "/category/brows" },
      { image: "/img/gr/g2-tr-19.jpg", title: "Silky Shine Hydrating Lipstick", href: "/category/lipstick" },
      { image: "/img/gr/gp-webstory-tr-20.jpg", title: "Gel Power Nail Lacquer", href: "/category/nail-polish" },
      { image: "/img/gr/website-story-gorsel-talebi13-tr-11.jpg", title: "Sweet Kiss Lip Oil Gloss", href: "/category/lip-oil" },
      { image: "/img/gr/website-story-gorsel-talebi4-tr-12.jpg", title: "Iconic Lash Intense Mascara", href: "/category/mascara" },
      { image: "/img/gr/website-story-gorsel-talebi7-tr-13.jpg", title: "Pure Matte Powder Lipstick", href: "/category/lipstick" },
      { image: "/img/gr/1-4--1-tr.jpg", title: "Smart Glow Liquid Highlighter", href: "/category/highlighter" },
      { image: "/img/gr/g3-tr-15.jpg", title: "BI-Phase Instant Make Up Remover", href: "/category/face-care" },
      { image: "/img/gr/mood-sparkle-bright-lipstick-154-violet-fizz-isiltili-ruj-tr-17.jpg", title: "Mood Sparkle Bright Lipstick", href: "/category/lipstick" },
      { image: "/img/gr/website-story-gorsel-talebi5-tr-16.jpg", title: "Make Up Primer", href: "/category/primer-setting-spray" },
      { image: "/img/gr/mood-shimmer-lip-glaze-lipgloss-254-berry-spark-isiltili-dudak-parlaticisi-tr-2.jpg", title: "Mood Shimmer Lip Glaze Lipgloss", href: "/category/lip-gloss" },
      { image: "/img/gr/mood-satiny-matte-lipstick-08-candy-red-mat-ruj-tr-3.jpg", title: "Mood Satiny Matte Lipstick", href: "/category/lipstick" },
      { image: "/img/gr/4-2--4-tr.jpg", title: "Glow Kiss Tinted Lip Balm", href: "/category/lip-balm" },
      { image: "/img/gr/5-5-tr.jpg", title: "Velvet Matte Lipstick", href: "/category/lipstick" },
      { image: "/img/gr/mood-gleamy-lip-glaze-lipgloss-203-rose-chic-renkli-dudak-parlaticisi-tr-6.jpg", title: "Mood Gleamy Lip Glaze Lipgloss", href: "/category/lip-gloss" },
      { image: "/img/gr/7-7-tr.jpg", title: "Flash Liner Colored Eyeliner", href: "/category/eyeliner" },
      { image: "/img/gr/mood-sheer-bright-lipstick-106-peachy-pink-parlak-ruj-tr-10.jpg", title: "Mood Sheer Bright Lipstick", href: "/category/lipstick" },
      { image: "/img/gr/8-8-tr.jpg", title: "Juicy Tint Lip & Cheek", href: "/category/blush" },
    ] as Banner[],
    baseBanner: [
      { image: "/img/gr/baz-baslik-1-tr-1.jpg", title: "The Perfect Start to Your Makeup", href: "/category/face" },
    ] as Banner[],
    cheekTrio: [
      { image: "/img/gr/scg-1-1-1-tr-1.jpg", title: "Natural Look, Fresh Cheeks", href: "/category/blush" },
      { image: "/img/gr/scg-2-1-1-tr-1.jpg", title: "See how to apply Smart Cheek and Smart Glow", href: "https://www.youtube.com/watch?v=PgJqOqJyKMo" },
      { image: "/img/gr/scg-3-1-1-tr-1.jpg", title: "A Natural, Radiant Glow", href: "/category/highlighter" },
    ] as Banner[],
    newSearch: "Mood",
    lipFeature: [
      { image: "/img/gr/lbb-1080x1080-tr-1.jpg", title: "Lip Butter Balm", href: "/catalog?collection=Lip%20Butter%20Balm%20Care%26Gloss" },
    ] as Banner[],
    lipCollection: "Lip Butter Balm Care&Gloss",
    browFeature: [
      { image: "/img/gr/adsiz-tasarim-36-tr-3.jpg", title: "Max Hold Brow Glue", href: "/catalog?collection=Max%20Hold%20Brow%20Glue" },
    ] as Banner[],
    browCollection: "Max Hold Brow Glue",
    eyeTrio: [
      { image: "/img/gr/eg-3-2-1-tr-1.jpg", title: "Wet-Look Shimmer", href: "/catalog?collection=Eye%20Glaze%20Liquid%20Eyeshadow" },
      { image: "/img/gr/eg-1-3-1-tr-1.jpg", title: "The Glow Effect in Eye Makeup", href: "https://www.youtube.com/watch?v=-BHHZPu2aD0" },
      { image: "/img/gr/eg-2-3-1-tr-1.jpg", title: "Discover the Formula of Radiant Eyes", href: "/catalog?collection=Eye%20Glaze%20Liquid%20Eyeshadow" },
    ] as Banner[],
    eyeCollection: "Eye Glaze Liquid Eyeshadow",
    moodLips: [
      { image: "/img/gr/r-sat-06-1-tr-1.png", title: "Mood Satiny", href: "/catalog?collection=Mood%20Satiny%20Matte%20Lipstick" },
      { image: "/img/gr/r-spa-153-1-tr-4.png", title: "Mood Sparkle Bright Lipstick", href: "/catalog?collection=Mood%20Sparkle%20Bright%20Lipstick" },
      { image: "/img/gr/r-she-102-1-tr-3.png", title: "Mood Sheer", href: "/catalog?collection=Mood%20Sheer%20Bright%20Lipstick" },
      { image: "/img/gr/k-mdl-07-1-tr-2.png", title: "Dream Lips Lipliner", href: "/category/lip-liner" },
    ] as Banner[],
    moodEyes: [
      { image: "/img/gr/k-gte-106-1-tr-7.png", title: "Tattoo Gel Eyepencil", href: "/category/eye-pencil" },
      { image: "/img/gr/p-sce-m03-1-tr-3.png", title: "Soft Color Matte Mono Eyeshadow", href: "/category/eyeshadow" },
      { image: "/img/gr/k-lmw-207-1-tr-2.png", title: "Liner Matic Waterproof Eyepencil", href: "/category/eye-pencil" },
      { image: "/img/gr/p-sce-p44-1-tr-6.png", title: "Soft Color Pearl Mono Eyeshadow", href: "/category/eyeshadow" },
      { image: "/img/gr/p-sge-54-2-tr-1.png", title: "Sparkle Glow", href: "/category/eyeshadow" },
      { image: "/img/gr/m-fle-104-01-tr-5.png", title: "Flash Liner Colored Eyeliner", href: "/category/eyeliner" },
      { image: "/img/gr/m-flm-010-01-tr-4.png", title: "Flash Lash Colored Mascara", href: "/category/colored-mascara" },
    ] as Banner[],
    reels: [
      { image: "/img/gr/sizden-gelenler-1-tr-1.jpg", title: "Golden Rose beauty video", href: "https://www.youtube.com/shorts/4TIVUaLw_kc" },
      { image: "/img/gr/sizden-gelenler-4-tr-2.jpg", title: "Golden Rose beauty video", href: "https://www.youtube.com/shorts/9Ihm_ooFdVo" },
      { image: "/img/gr/sizden-gelenler-2-tr-3.jpg", title: "Golden Rose beauty video", href: "https://www.youtube.com/shorts/i-8nHAb4s_A" },
      { image: "/img/gr/sizden-gelenler-5-tr-4.jpg", title: "Golden Rose beauty video", href: "https://www.youtube.com/shorts/w98xE9XxllE" },
      { image: "/img/gr/sizden-gelenler-3-tr-5.jpg", title: "Golden Rose beauty video", href: "https://www.youtube.com/shorts/E3bIanyZG9I" },
    ] as Banner[],
    storeBanner: [
      { image: "/img/gr/kioskbaslik-1-tr-1.jpg", title: "Discover Golden Rose Up Close", href: "/contact" },
    ] as Banner[],
  },
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

export type Content = typeof contentDefaults;
export type ContentKey = keyof Content;

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
