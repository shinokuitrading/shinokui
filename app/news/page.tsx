import { Section } from "@/components/Section";
import { getAllNews } from "@/lib/news";
import { NewsCard } from "@/components/NewsCard";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";

export default async function NewsPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const news = await getAllNews(locale);

  return (
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
  );
}
