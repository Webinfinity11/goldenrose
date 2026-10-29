// Interface texts: Georgian first; en/ru must have the same keys (typed against ka).
const ka = {
  language: "ენა",
  currency: "₾",
};

const en: typeof ka = {
  language: "Language",
  currency: "₾",
};

const ru: typeof ka = {
  language: "Язык",
  currency: "₾",
};

export default { ka, en, ru };
