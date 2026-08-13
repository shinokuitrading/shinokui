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
        <article className="max-w-none text-sm leading-relaxed text-textDark [&_p]:mt-4 [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-lg [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_strong]:font-semibold [&_blockquote]:mt-10 [&_blockquote]:flex [&_blockquote]:min-h-32 [&_blockquote]:items-center [&_blockquote]:justify-center [&_blockquote]:border-y-2 [&_blockquote]:border-oceanBrown [&_blockquote]:bg-oceanBrown/10 [&_blockquote]:px-6 [&_blockquote]:py-6 [&_blockquote]:text-center [&_blockquote]:text-base [&_blockquote]:font-semibold [&_blockquote]:text-oceanBrown [&_blockquote_p]:mt-0">
          {content}
        </article>
      </Section>
    );
  } catch {
    return notFound();
  }
}
