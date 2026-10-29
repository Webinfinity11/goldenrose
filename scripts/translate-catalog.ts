// Makes Georgian the main language of the seeded catalog: the English names/descriptions from seed.ts move to
// i18n.en, the plain columns get Georgian and i18n.ru Russian. Rows that already have i18n.en (or that an admin
// renamed to something not listed here) are left alone, so it is safe to run on every deploy.
// Usage: npx tsx scripts/translate-catalog.ts
import "./env";
import { eq } from "drizzle-orm";
import { categories, db, products } from "../src/db";

// English name → [Georgian, Russian]
const categoryNames: Record<string, [string, string]> = {
  Face: ["სახე", "Лицо"],
  Blush: ["ფერუმარილი", "Румяна"],
  "Powder Blush": ["პუდრისებრი ფერუმარილი", "Пудровые румяна"],
  "Liquid Blush": ["თხევადი ფერუმარილი", "Жидкие румяна"],
  "Stick Blush": ["ფერუმარილი სტიკი", "Румяна-стик"],
  Highlighter: ["ჰაილაითერი", "Хайлайтер"],
  "Stick Highlighter": ["ჰაილაითერი სტიკი", "Хайлайтер-стик"],
  "Powder Highlighter": ["პუდრისებრი ჰაილაითერი", "Пудровый хайлайтер"],
  "Liquid Highlighter": ["თხევადი ჰაილაითერი", "Жидкий хайлайтер"],
  "BB & CC Cream": ["BB და CC კრემი", "BB и CC крем"],
  "Nude Look Tinted Moisturizer": ["Nude Look ტონირებული დამატენიანებელი", "Тонирующий увлажняющий крем Nude Look"],
  "BB Cream": ["BB კრემი", "BB крем"],
  "CC Cream": ["CC კრემი", "CC крем"],
  Foundation: ["ტონალური კრემი", "Тональный крем"],
  "Stick Foundation": ["ტონალური სტიკი", "Тональный стик"],
  "Medium Coverage Foundation": ["საშუალო დაფარვის ტონალური", "Тональный крем средней плотности"],
  "Matte Foundation": ["მქრქალი ტონალური", "Матовый тональный крем"],
  "Full Coverage Foundation": ["სრული დაფარვის ტონალური", "Тональный крем плотного покрытия"],
  Concealer: ["კონსილერი", "Консилер"],
  "Color Correcting Concealer": ["ფერის მაკორექტირებელი კონსილერი", "Цветокорректирующий консилер"],
  "Liquid Concealer": ["თხევადი კონსილერი", "Жидкий консилер"],
  "Stick Concealer": ["კონსილერი სტიკი", "Консилер-стик"],
  Powder: ["პუდრი", "Пудра"],
  "Loose Powder": ["ფხვიერი პუდრი", "Рассыпчатая пудра"],
  "Pressed Powder": ["კომპაქტური პუდრი", "Компактная пудра"],
  "Mineral Powder": ["მინერალური პუდრი", "Минеральная пудра"],
  "Primer & Setting Spray": ["პრაიმერი და ფიქსატორი", "Праймер и фиксирующий спрей"],
  Contour: ["კონტური", "Контуринг"],
  "Contour Stick": ["კონტურის სტიკი", "Стик для контуринга"],
  "Contour Pencil": ["კონტურის ფანქარი", "Карандаш для контуринга"],
  "Contour Palette": ["კონტურის პალიტრა", "Палетка для контуринга"],
  Eyes: ["თვალები", "Глаза"],
  Eyeliner: ["აილაინერი", "Подводка для глаз"],
  "Liquid Eyeliner": ["თხევადი აილაინერი", "Жидкая подводка"],
  "Colored Eyeliner": ["ფერადი აილაინერი", "Цветная подводка"],
  "Waterproof Eyeliner": ["წყალგამძლე აილაინერი", "Водостойкая подводка"],
  Eyeshadow: ["თვალის ჩრდილი", "Тени для век"],
  "Matte Eyeshadow": ["მქრქალი ჩრდილი", "Матовые тени"],
  "Shimmer Eyeshadow": ["მბზინავი ჩრდილი", "Мерцающие тени"],
  "Eyeshadow Palette": ["ჩრდილების პალიტრა", "Палетка теней"],
  "Eye Pencil": ["თვალის ფანქარი", "Карандаш для глаз"],
  "Colored Eye Pencil": ["ფერადი თვალის ფანქარი", "Цветной карандаш для глаз"],
  "Shimmer Eye Pencil": ["მბზინავი თვალის ფანქარი", "Мерцающий карандаш для глаз"],
  "White Eye Pencil": ["თეთრი თვალის ფანქარი", "Белый карандаш для глаз"],
  "Brown Eye Pencil": ["ყავისფერი თვალის ფანქარი", "Коричневый карандаш для глаз"],
  "Black Eye Pencil": ["შავი თვალის ფანქარი", "Чёрный карандаш для глаз"],
  Brows: ["წარბები", "Брови"],
  "Brow Powder": ["წარბის პუდრი", "Пудра для бровей"],
  "Brow Mascara": ["წარბის ტუში", "Тушь для бровей"],
  "Brow Pencil": ["წარბის ფანქარი", "Карандаш для бровей"],
  "Brow Shaper": ["წარბის ფიქსატორი", "Гель для бровей"],
  Mascara: ["ტუში", "Тушь для ресниц"],
  "Colored Mascara": ["ფერადი ტუში", "Цветная тушь"],
  "Black Mascara": ["შავი ტუში", "Чёрная тушь"],
  Lips: ["ტუჩები", "Губы"],
  "Lip Gloss": ["ტუჩის გლოსი", "Блеск для губ"],
  "Fruity Lip Gloss": ["ხილის არომატის გლოსი", "Фруктовый блеск для губ"],
  "Shimmer Lip Gloss": ["მბზინავი გლოსი", "Мерцающий блеск для губ"],
  Lipstick: ["პომადა", "Помада"],
  "Liquid Lipstick": ["თხევადი პომადა", "Жидкая помада"],
  "Matte Pencil Lipstick": ["მქრქალი პომადა-ფანქარი", "Матовая помада-карандаш"],
  "Matte Lipstick": ["მქრქალი პომადა", "Матовая помада"],
  "Glossy Lipstick": ["პრიალა პომადა", "Глянцевая помада"],
  "Lip Liner": ["ტუჩის კონტურის ფანქარი", "Карандаш для губ"],
  "Lip Balm": ["ტუჩის ბალზამი", "Бальзам для губ"],
  "Tinted Lip Balm": ["ტონირებული ბალზამი", "Оттеночный бальзам для губ"],
  "Lip Moisturizer": ["ტუჩის დამატენიანებელი", "Увлажняющее средство для губ"],
  "Lip Oil": ["ტუჩის ზეთი", "Масло для губ"],
  Nails: ["ფრჩხილები", "Ногти"],
  "Nail Polish": ["ფრჩხილის ლაქი", "Лак для ногтей"],
  "Glitter Nail Polish": ["ბრჭყვიალა ლაქი", "Лак с блёстками"],
  "Glossy Nail Polish": ["პრიალა ლაქი", "Глянцевый лак"],
  "Nail Care": ["ფრჩხილის მოვლა", "Уход за ногтями"],
  "Skin Care": ["კანის მოვლა", "Уход за кожей"],
  "Face Care": ["სახის მოვლა", "Уход за лицом"],
  "Hair Care": ["თმის მოვლა", "Уход за волосами"],
  Accessories: ["აქსესუარები", "Аксессуары"],
  "False Lashes": ["ხელოვნური წამწამები", "Накладные ресницы"],
  "Makeup Brushes": ["მაკიაჟის ფუნჯები", "Кисти для макияжа"],
  "Makeup Sponges": ["მაკიაჟის ღრუბლები", "Спонжи для макияжа"],
  "Other Accessories": ["სხვა აქსესუარები", "Другие аксессуары"],
  Fragrance: ["სუნამო", "Парфюмерия"],
  "Men's Fragrance": ["მამაკაცის სუნამო", "Мужская парфюмерия"],
  "Women's Fragrance": ["ქალის სუნამო", "Женская парфюмерия"],
  "Unisex Fragrance": ["უნისექს სუნამო", "Парфюмерия унисекс"],
  Collections: ["კოლექციები", "Коллекции"],
  "Nude Look": ["Nude Look", "Nude Look"],
  "Miss Beauty": ["Miss Beauty", "Miss Beauty"],
  "Mood Collection": ["Mood კოლექცია", "Коллекция Mood"],
  Sets: ["ნაკრებები", "Наборы"],
  "Mini Products": ["მინი პროდუქტები", "Мини-продукты"],
  Emily: ["Emily", "Emily"],
  "Emily Lip Pencil": ["Emily ტუჩის ფანქარი", "Карандаш для губ Emily"],
  "Emily Eye Pencil": ["Emily თვალის ფანქარი", "Карандаш для глаз Emily"],
};

// English description → [Georgian, Russian]
const descriptions: Record<string, [string, string]> = {
  "Part of the Nail Rituals care line: a simple routine that keeps nails and cuticles smooth, strong and healthy-looking.": [
    "Nail Rituals-ის მოვლის ხაზის ნაწილი: მარტივი რიტუალი, რომელიც ფრჩხილებსა და კუტიკულას გლუვს, მტკიცესა და ჯანსაღს ინარჩუნებს.",
    "Часть линии ухода Nail Rituals: простой ритуал, который сохраняет ногти и кутикулу гладкими, крепкими и здоровыми на вид.",
  ],
  "A creamy lipstick with a soft satin-matte finish and rich color payoff that stays comfortable all day.": [
    "კრემისებრი პომადა რბილი სატინისებრი მქრქალი ფინიშით და მდიდარი ფერით, რომელიც მთელი დღე კომფორტულია.",
    "Кремовая помада с мягким сатиново-матовым финишем и насыщенным цветом, комфортная весь день.",
  ],
  "A moisturizing lipstick with a sheer, glossy finish for a fresh, natural-looking tint.": [
    "დამატენიანებელი პომადა გამჭვირვალე, პრიალა ფინიშით - ახალი, ბუნებრივი ელფერისთვის.",
    "Увлажняющая помада с прозрачным глянцевым финишем для свежего, естественного оттенка.",
  ],
  "A glossy lipstick with fine shimmer particles for a radiant, light-catching finish.": [
    "პრიალა პომადა წვრილი მბზინავი ნაწილაკებით - ნათელი, სინათლის ამრეკლი ფინიშისთვის.",
    "Глянцевая помада с мелкими мерцающими частицами для сияющего, отражающего свет финиша.",
  ],
  "A non-sticky lip glaze with a high-shine finish and a juicy hint of color.": [
    "არაწებოვანი ტუჩის გლეიზი ძლიერი ბზინვარებით და წვნიანი ფერის ელფერით.",
    "Нелипкий глейз для губ с ярким блеском и сочным оттенком цвета.",
  ],
  "A caring lip butter balm that nourishes like a balm and shines like a gloss.": [
    "მზრუნველი ტუჩის კარაქი-ბალზამი, რომელიც ბალზამივით კვებავს და გლოსივით ბზინავს.",
    "Ухаживающий бальзам-масло для губ: питает как бальзам и сияет как блеск.",
  ],
  "A brow fixing gel that sets brows in place for a laminated, groomed look that lasts all day.": [
    "წარბის მაფიქსირებელი გელი ლამინირებული, მოწესრიგებული იერისთვის, რომელიც მთელი დღე ძლებს.",
    "Фиксирующий гель для бровей: эффект ламинирования и ухоженный вид на весь день.",
  ],
  "A liquid eyeshadow with a wet-look shimmer that glides on easily and dries without creasing.": [
    "თხევადი თვალის ჩრდილი სველი ეფექტის ბზინვარებით: მარტივად ესმება და შრება ნაკეცების გარეშე.",
    "Жидкие тени с влажным мерцанием: легко наносятся и высыхают, не скатываясь в складки.",
  ],
  "A finely milled setting powder that sets makeup, controls shine and helps it last longer.": [
    "წვრილად დაფქული მაფიქსირებელი პუდრი: აფიქსირებს მაკიაჟს, აკონტროლებს ბზინვარებას და ახანგრძლივებს მას.",
    "Тонко измельчённая фиксирующая пудра: закрепляет макияж, убирает блеск и продлевает стойкость.",
  ],
  "A high-coverage foundation and concealer in one for an even, flawless-looking complexion.": [
    "მაღალი დაფარვის ტონალური და კონსილერი ერთში - თანაბარი, უნაკლო სახის ტონისთვის.",
    "Тональный крем и консилер высокой плотности в одном для ровного, безупречного тона лица.",
  ],
  "A lightweight color-correcting foundation that evens out skin tone for a smooth, radiant look.": [
    "მსუბუქი, ფერის მაკორექტირებელი ტონალური, რომელიც ათანაბრებს კანის ტონს გლუვი, მბზინავი იერისთვის.",
    "Лёгкий цветокорректирующий тональный крем выравнивает тон кожи для гладкого, сияющего вида.",
  ],
  "A hydrating foundation with a soft, smooth finish for a natural, comfortable look.": [
    "დამატენიანებელი ტონალური რბილი, გლუვი ფინიშით - ბუნებრივი, კომფორტული იერისთვის.",
    "Увлажняющий тональный крем с мягким, гладким финишем для естественного, комфортного образа.",
  ],
};

const countries: Record<string, [string, string]> = { Turkey: ["თურქეთი", "Турция"] };

(async () => {
  let cats = 0;
  for (const c of await db.select().from(categories)) {
    const t = categoryNames[c.name];
    if (c.i18n?.en || !t) continue;
    await db
      .update(categories)
      .set({ name: t[0], i18n: { en: { name: c.name, description: c.description }, ru: { name: t[1] } } })
      .where(eq(categories.id, c.id));
    cats++;
  }

  let prods = 0;
  for (const p of await db.select().from(products)) {
    if (p.i18n?.en) continue;
    const d = descriptions[p.description];
    const country = p.country ? countries[p.country] : undefined;
    if (!d && !country) continue;
    await db
      .update(products)
      .set({
        description: d?.[0] ?? p.description,
        country: country?.[0] ?? p.country,
        i18n: {
          en: { description: p.description, ...(p.country && { country: p.country }) },
          ru: { ...(d && { description: d[1] }), ...(country && { country: country[1] }) },
        },
      })
      .where(eq(products.id, p.id));
    prods++;
  }
  console.log(`translated: ${cats} categories, ${prods} products`);
  process.exit(0);
})();
