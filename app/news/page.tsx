import { Section } from "@/components/Section";
import { getAllNews } from "@/lib/news";
import { NewsCard } from "@/components/NewsCard";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, createSeoMetadata, newsSeo } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata(newsSeo);

export default async function NewsPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const news = await getAllNews(locale);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: newsSeo.title,
          description: newsSeo.description,
          url: absoluteUrl(newsSeo.path),
          inLanguage: "zh-Hant-TW",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: news.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: absoluteUrl(`/news/${item.slug}`),
              name: item.title
            }))
          }
        }}
      />
      <Section>
        <h1 className="text-xl font-serif text-textDark mb-4">
          {t("news.title")}
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          {news.map((n) => (
            <NewsCard
              key={n.slug}
              item={n}
              labelReadMore={t("news.readMore")}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
