import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { OceanDivider } from "@/components/OceanDivider";
import { Button, buttonStyles } from "@/components/buttons";
import { getAllProducts } from "@/lib/products";
import { getAllNews } from "@/lib/news";
import { ProductCard } from "@/components/ProductCard";
import { NewsCard } from "@/components/NewsCard";
import { getLocale, getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";

export default async function HomePage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations();
  const products = getAllProducts().slice(0, 6);
  const news = await getAllNews(locale);
  const categoryLabels = t.raw("products.categoryLabels") as Record<
    string,
    string
  >;
  const contactHref = "#contact";

  return (
    <>
      <Section className="pt-16 md:pt-20">
        <div className="grid md:grid-cols-[3fr,2fr] gap-10 items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-textMuted">
              {t("site.brandUpper")}
            </p>
            <h1 className="font-serif text-2xl md:text-3xl leading-relaxed text-textDark">
              {t("home.heroTitle")}
            </h1>
            <p className="text-sm md:text-base text-textMuted max-w-lg leading-relaxed">
              {t("home.heroSubtitle")}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={contactHref}
                className={buttonStyles({ variant: "primary" })}
              >
                {t("cta.consult")}
              </Link>
              <Button variant="outline">
                {t("cta.catalog")}
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden bg-oceanBrown/5">
            <Image
              src="/images/torii.png"
              alt={t("home.heroImageAlt")}
              fill
              priority
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </Section>

      <OceanDivider />

      <Section>
        <div className="grid md:grid-cols-3 gap-6">
          <HomeCard
            title={t("home.importSupply")}
            body={t("home.importSupplyDesc")}
            imageSrc="/images/import.png"
          />
          <HomeCard
            title={t("home.brandPartnership")}
            body={t("home.brandPartnershipDesc")}
            imageSrc="/images/collab.png"
          />
          <HomeCard
            title={t("home.events")}
            body={t("home.eventsDesc")}
            imageSrc="/images/hosting.png"
          />
        </div>
      </Section>

      <Section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-lg font-serif text-textDark tracking-wide">
            {t("home.featuredProducts")}
          </h2>
          <Link
            href="/products"
            className="text-xs text-oceanBrown hover:underline tracking-[0.18em] uppercase"
          >
            {t("common.viewAll")}
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard
              key={p.slug}
              product={p}
              locale={locale}
              categoryLabels={categoryLabels}
              volumeLabel={t("products.volumeLabel")}
              abvLabel={t("products.abvLabel")}
            />
          ))}
        </div>
      </Section>

      <OceanDivider />

      <Section>
        <div className="grid md:grid-cols-[3fr,2fr] gap-10 items-center">
          <div className="space-y-4">
            <h2 className="text-lg font-serif text-textDark">
              {t("home.aboutShortTitle")}
            </h2>
            <p className="text-sm text-textMuted leading-relaxed">
              {t("home.aboutShortBody")}
            </p>
            <Button variant="ghost">
              <a href="/about">{t("home.aboutLink")}</a>
            </Button>
          </div>
          <div className="relative h-56 md:h-72 rounded-3xl overflow-hidden bg-oceanBrown/5">
            <Image
              src="/images/aboutme.jpg"
              alt={t("home.aboutImageAlt")}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </Section>

      <Section>
        <h2 className="text-lg font-serif text-textDark mb-6">
          {t("home.processTitle")}
        </h2>
        <ol className="grid md:grid-cols-4 gap-6 text-sm text-textMuted">
          {(t.raw("home.processSteps") as Array<{
            step: string;
            title: string;
            body: string;
          }>).map((item) => (
            <ProcessItem
              key={item.step}
              step={item.step}
              title={item.title}
              body={item.body}
            />
          ))}
        </ol>
      </Section>

      <OceanDivider />

      <Section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-lg font-serif text-textDark">
            {t("home.newsTitle")}
          </h2>
          <Link
            href="/news"
            className="text-xs text-oceanBrown hover:underline tracking-[0.18em] uppercase"
          >
            {t("common.viewAll")}
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {news.slice(0, 2).map((n) => (
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

function HomeCard({
  title,
  body,
  imageSrc
}: {
  title: string;
  body: string;
  imageSrc: string;
}) {
  return (
    <div className="border border-oceanBrown/10 rounded-2xl px-5 py-6 bg-ivory/70">
      <div className="mb-4">
        <Image
          src={imageSrc}
          alt={title}
          width={720}
          height={420}
          className="w-full h-auto rounded-xl"
        />
      </div>
      <h3 className="text-sm font-semibold text-textDark mb-2">{title}</h3>
      <p className="text-sm text-textMuted leading-relaxed">{body}</p>
    </div>
  );
}

function ProcessItem({
  step,
  title,
  body
}: {
  step: string;
  title: string;
  body: string;
}) {
  return (
    <li className="space-y-2">
      <p className="text-xs uppercase tracking-[0.2em] text-textMuted">
        {step}
      </p>
      <p className="text-sm font-semibold text-textDark">{title}</p>
      <p className="text-sm text-textMuted leading-relaxed">{body}</p>
    </li>
  );
}
