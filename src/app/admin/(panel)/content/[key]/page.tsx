import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getContent } from "@/lib/content";
import { contentSections, SHARED_SECTIONS } from "@/lib/content-schema";
import { defaultLocale, isLocale, localeLabels, locales } from "@/i18n/config";
import { PageTitle } from "@/components/admin/ui";
import { ContentForm } from "@/components/admin/ContentForm";

// Reads the admin session cookie: navigations here may block (see admin/layout.tsx).
export const instant = false;

export default async function EditContent({ params, searchParams }: PageProps<"/admin/content/[key]">) {
  await requireAdmin();
  const { key } = await params;
  const section = contentSections.find((s) => s.key === key);
  if (!section) notFound();
  const shared = SHARED_SECTIONS.includes(section.key);
  const requested = (await searchParams).lang;
  const lang = !shared && isLocale(requested) ? requested : defaultLocale;
  const content = await getContent(lang);
  return (
    <>
      <PageTitle>
        <Link href="/admin/content" className="text-slate-400 font-normal">
          კონტენტი /
        </Link>{" "}
        {section.title}
      </PageTitle>
      <p className="text-slate-500 -mt-4 mb-5">{section.description}</p>
      {!shared && (
        <div className="flex gap-2 mb-5" aria-label="ენა">
          {locales.map((l) => (
            <Link
              key={l}
              href={`/admin/content/${section.key}?lang=${l}`}
              className={`px-4 py-2 rounded-lg border text-sm font-semibold ${l === lang ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-slate-200 text-slate-600 hover:border-blue-300"}`}
            >
              {localeLabels[l].name}
            </Link>
          ))}
        </div>
      )}
      <ContentForm
        key={lang + JSON.stringify(content[section.key])}
        sectionKey={section.key}
        lang={lang}
        fields={section.fields}
        initial={content[section.key] as Record<string, unknown>}
      />
    </>
  );
}
