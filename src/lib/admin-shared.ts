// Georgian → Latin (national transliteration), so URLs read like /category/vitrinebi instead of percent-encoded Georgian.
const GEO: Record<string, string> = {
  ა: "a", ბ: "b", გ: "g", დ: "d", ე: "e", ვ: "v", ზ: "z", თ: "t", ი: "i", კ: "k", ლ: "l", მ: "m", ნ: "n", ო: "o", პ: "p", ჟ: "zh",
  რ: "r", ს: "s", ტ: "t", უ: "u", ფ: "p", ქ: "k", ღ: "gh", ყ: "q", შ: "sh", ჩ: "ch", ც: "ts", ძ: "dz", წ: "ts", ჭ: "ch", ხ: "kh", ჯ: "j", ჰ: "h",
};

export function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[ა-ჰ]/g, (c) => GEO[c] ?? "")
    .normalize("NFKD")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export const ORDER_STATUSES = ["new", "confirmed", "delivered", "cancelled"] as const;
export const ORDER_STATUS_LABELS: Record<string, string> = {
  new: "ახალი",
  confirmed: "დადასტურებული",
  delivered: "მიწოდებული",
  cancelled: "გაუქმებული",
};
