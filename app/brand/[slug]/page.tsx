import Image from "next/image";
import { notFound } from "next/navigation";
import { Section } from "@/components/Section";
import { getTranslations } from "next-intl/server";

export default async function BrandDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const t = await getTranslations();

  if (params.slug !== "tsukinoi") {
    notFound();
  }

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
          {(t.raw("brandIntro.sections") as Array<{
            heading: string;
            body: string[];
          }>).map((section, idx) => (
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
