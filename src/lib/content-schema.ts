// Editable site content: defaults (what the site shows until an admin edits it) and the
// field layout the admin editor renders. Client-safe: no server imports here.
// Contacts and texts below are placeholders: edit them in /admin/content or replace here.

export type Link = { label: string; href: string };

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

type Sub = { name: string; label: string; long?: boolean };
export type FieldSpec =
  | { name: string; label: string; type: "text" | "textarea" | "number"; hint?: string }
  | { name: string; label: string; type: "list"; hint?: string; long?: boolean }
  | { name: string; label: string; type: "objects"; hint?: string; fields: Sub[]; fixed?: boolean };

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
