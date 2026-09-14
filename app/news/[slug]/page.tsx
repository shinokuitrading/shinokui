import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { getAllNews, getNewsBySlug } from "@/lib/news";
import { getLocale } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import {
  absoluteUrl,
  createSeoMetadata,
  defaultOgImage,
  organizationName,
  siteBaseUrl
} from "@/lib/seo";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const items = await getAllNews();
  return items.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { meta } = await getNewsBySlug(params.slug);
    return createSeoMetadata({
      title: meta.seoTitle ?? `${meta.title}｜信億尉貿易`,
      description: meta.excerpt,
      path: `/news/${meta.slug}`,
      image: meta.image ?? defaultOgImage,
      imageAlt: meta.title,
      type: "article",
      publishedTime: meta.date || undefined,
      modifiedTime: meta.dateModified
    });
  } catch {
    return createSeoMetadata({
      title: "找不到文章｜信億尉貿易有限公司",
      description: "此最新消息文章不存在。",
      path: `/news/${params.slug}`,
      noIndex: true
    });
  }
}

export default async function NewsDetailPage({
  params
}: Props) {
  const locale = (await getLocale()) as Locale;

  try {
    const { meta, content } = await getNewsBySlug(params.slug, locale);

    const articleUrl = absoluteUrl(`/news/${meta.slug}`);

    return (
      <>
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              headline: meta.seoTitle ?? meta.title,
              description: meta.excerpt,
              image: [absoluteUrl(meta.image ?? defaultOgImage)],
              ...(meta.date ? { datePublished: meta.date } : {}),
              ...(meta.dateModified
                ? { dateModified: meta.dateModified }
                : {}),
              author: {
                "@type": "Organization",
                name: organizationName,
                url: siteBaseUrl
              },
              publisher: {
                "@type": "Organization",
                name: organizationName,
                url: siteBaseUrl,
                logo: {
                  "@type": "ImageObject",
                  url: absoluteUrl("/images/Logo.jpg")
                }
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": articleUrl
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "首頁",
                  item: `${siteBaseUrl}/`
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "最新消息",
                  item: absoluteUrl("/news")
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: meta.title,
                  item: articleUrl
                }
              ]
            }
          ]}
        />
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
      </>
    );
  } catch {
    return notFound();
  }
}
