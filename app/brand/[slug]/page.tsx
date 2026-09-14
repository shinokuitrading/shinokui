import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { BrandImageCarousel } from "@/components/BrandImageCarousel";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { RelatedReading } from "@/components/RelatedReading";
import { absoluteUrl, createSeoMetadata, siteBaseUrl } from "@/lib/seo";

const shineMuscatImages = [
  "/images/shine-muscat-01.jpg",
  "/images/shine-muscat-02.jpg",
  "/images/shine-muscat-03.jpg",
  "/images/shine-muscat-04.jpg",
  "/images/shine-muscat-05.jpg"
];

type BrandSection = {
  heading: string;
  body: string[];
};

type ShineMuscatContent = {
  cardTitle: string;
  subtitle: string;
  intro: string;
  highlights: string[];
  sections: BrandSection[];
  imageAlts: string[];
};

export function generateStaticParams() {
  return [{ slug: "tsukinoi" }, { slug: "shine-muscat" }];
}

const brandSeo = {
  tsukinoi: {
    title: "月の井酒造店｜茨城縣大洗町日本酒品牌｜信億尉貿易",
    description:
      "認識創業於1865年的月の井酒造店。酒藏扎根日本茨城縣大洗町，以當地風土、傳統釀造與長期時間淬鍊月之井日本酒。",
    image: "/images/tsukinoi_logo.jpeg",
    imageAlt: "月の井酒造店標誌",
    name: "月の井酒造店"
  },
  "shine-muscat": {
    title: "日本麝香葡萄品牌介紹｜信億尉貿易",
    description:
      "認識日本麝香葡萄的品種歷史、栽培特色、品質標準，以及山梨縣產地風土所帶來的香氣與口感。",
    image: "/images/shine-muscat-05.jpg",
    imageAlt: "日本麝香葡萄",
    name: "日本麝香葡萄"
  }
} as const;

export function generateMetadata({
  params
}: {
  params: { slug: string };
}): Metadata {
  const seo = brandSeo[params.slug as keyof typeof brandSeo];
  if (!seo) {
    return createSeoMetadata({
      title: "找不到品牌｜信億尉貿易有限公司",
      description: "此品牌頁面不存在。",
      path: `/brand/${params.slug}`,
      noIndex: true
    });
  }

  return createSeoMetadata({
    ...seo,
    path: `/brand/${params.slug}`
  });
}

export default async function BrandDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const t = await getTranslations();
  const seo = brandSeo[params.slug as keyof typeof brandSeo];

  if (!seo) notFound();

  const pageUrl = absoluteUrl(`/brand/${params.slug}`);
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: seo.title,
      description: seo.description,
      url: pageUrl,
      primaryImageOfPage: absoluteUrl(seo.image),
      inLanguage: "zh-Hant-TW"
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
          name: "品牌介紹",
          item: absoluteUrl("/brand")
        },
        {
          "@type": "ListItem",
          position: 3,
          name: seo.name,
          item: pageUrl
        }
      ]
    }
  ];

  if (params.slug === "tsukinoi") {
    return (
      <>
        <JsonLd data={structuredData} />
        <Section>
        <h1 className="text-xl font-serif text-textDark mb-6">
          {t("brandIntro.cardTitle")}
        </h1>
        <div className="border border-oceanBrown/10 rounded-xl overflow-hidden bg-ivory/60">
          <div className="relative aspect-[4/3] bg-oceanBrown/5">
            <Image
              src="/images/tsukinoi_logo.jpeg"
              alt={t("brandIntro.cardTitle")}
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-contain p-6"
            />
          </div>
          <div className="px-6 py-6 space-y-5 text-sm text-textMuted leading-relaxed">
            <div>
              <p className="text-base font-semibold text-textDark">
                {t("brandIntro.cardTitle")}
              </p>
            </div>
            <p>{t("brandIntro.intro")}</p>
            {(t.raw("brandIntro.sections") as BrandSection[]).map(
              (section, idx) => (
                <div key={idx} className="space-y-2">
                  <p className="text-sm font-semibold text-textDark">
                    {section.heading}
                  </p>
                  {section.body.map((line, lineIdx) => (
                    <p key={lineIdx}>{line}</p>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
        <RelatedReading
          title="月之井酒造與日本酒知識"
          items={[
            {
              title: "月之井酒造店｜來自日本茨城大洗的百年酒藏",
              href: "/news/tsukinoi-sake-brewery-oarai-1865"
            },
            {
              title: "生酛是什麼？從和之月39認識傳統日本酒釀造",
              href: "/news/kimoto-sake-wanotsuki-39"
            },
            {
              title: "純米吟釀與純米大吟釀差在哪？",
              href: "/news/junmai-ginjo-vs-junmai-daiginjo"
            },
            {
              title: "發泡清酒是什麼？",
              href: "/news/sparkling-sake-aqua-guide"
            },
            {
              title: "梅酒怎麼喝？",
              href: "/news/umeshu-how-to-drink-koiume"
            }
          ]}
        />
        </Section>
      </>
    );
  }

  if (params.slug !== "shine-muscat") {
    notFound();
  }

  const brand = t.raw("brandIntro.shineMuscat") as ShineMuscatContent;
  const images = shineMuscatImages.map((src, index) => ({
    src,
    alt: brand.imageAlts[index] ?? brand.cardTitle
  }));

  return (
    <>
      <JsonLd data={structuredData} />
      <Section>
      <h1 className="text-xl font-serif text-textDark mb-6">
        {brand.cardTitle}
      </h1>
      <div className="border border-oceanBrown/10 rounded-xl overflow-hidden bg-ivory/60">
        <BrandImageCarousel
          images={images}
          previousLabel={t("brandIntro.carouselPrevious")}
          nextLabel={t("brandIntro.carouselNext")}
        />
        <div className="px-6 py-6 space-y-5 text-sm text-textMuted leading-relaxed">
          <div>
            <p className="text-base font-semibold text-textDark">
              {brand.cardTitle}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-oceanBrown">
              {brand.subtitle}
            </p>
          </div>
          <p>{brand.intro}</p>
          <ul className="grid gap-3 md:grid-cols-3">
            {brand.highlights.map((highlight) => (
              <li
                key={highlight}
                className="border-l border-oceanBrown/30 pl-3 text-textDark"
              >
                {highlight}
              </li>
            ))}
          </ul>
          {brand.sections.map((section, idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-sm font-semibold text-textDark">
                {section.heading}
              </p>
              {section.body.map((line, lineIdx) => (
                <p key={lineIdx}>{line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
      </Section>
    </>
  );
}
