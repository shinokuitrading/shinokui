import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { BrandImageCarousel } from "@/components/BrandImageCarousel";
import { getTranslations } from "next-intl/server";

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

export default async function BrandDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const t = await getTranslations();

  if (params.slug === "tsukinoi") {
    return (
      <Section>
        <h1 className="text-xl font-serif text-textDark mb-6">
          {t("brandIntro.title")}
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
      </Section>
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
    <Section>
      <h1 className="text-xl font-serif text-textDark mb-6">
        {t("brandIntro.title")}
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
  );
}
