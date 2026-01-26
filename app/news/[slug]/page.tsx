import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { getAllNews, getNewsBySlug } from "@/lib/news";
import { getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/config";

export async function generateStaticParams() {
  const items = await getAllNews();
  return items.map((n) => ({ slug: n.slug }));
}

export default async function NewsDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const locale = (await getLocale()) as Locale;

  try {
    const { meta, content } = await getNewsBySlug(params.slug, locale);

    return (
      <Section>
        <p className="text-xs text-textMuted mb-1">
          {meta.date}
        </p>
        <h1 className="text-xl font-serif text-textDark mb-4">
          {meta.title}
        </h1>
        <article className="prose prose-sm max-w-none text-textDark prose-headings:font-serif prose-a:text-oceanBrown prose-a:no-underline hover:prose-a:underline">
          {content}
        </article>
      </Section>
    );
  } catch {
    return notFound();
  }
}
