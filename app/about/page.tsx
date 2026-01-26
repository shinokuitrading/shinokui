import Image from "next/image";
import { Section } from "@/components/Section";
import { OceanDivider } from "@/components/OceanDivider";
import { getLocale, getTranslations } from "next-intl/server";

export default async function AboutPage() {
  const locale = await getLocale();
  const t = await getTranslations();
  const stanceItems = t.raw("about.stanceItems") as string[];

  return (
    <div className="relative">
      <div
        className="hidden md:block absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/images/bigwhale.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 0 top 25px",
          backgroundSize: "clamp(520px, 62vw, 820px) auto",
          opacity: 0.85
        }}
      />
      <div className="relative z-10">
        <Section className="pt-10 md:pt-16 pb-8 md:pb-10">
          <div
            className={`max-w-none ${
              locale === "ja" ? "md:max-w-[44vw]" : "md:max-w-[48vw]"
            }`}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-textMuted mb-2">
              {t("about.subtitle")}
            </p>
            <h1 className="text-xl font-serif text-textDark mb-4">
              {t("about.title")}
            </h1>
            <p className="text-sm text-textMuted leading-relaxed">
              {t("about.introBody")}
            </p>
          </div>
        </Section>

        <OceanDivider />

        <Section className="py-8 md:py-10">
          <div
            className={`max-w-none ${
              locale === "ja" ? "md:max-w-[44vw]" : "md:max-w-[48vw]"
            }`}
          >
            <h2 className="text-lg font-serif text-textDark mb-4">
              {t("about.brandSymbolTitle")}
            </h2>
            <p className="text-sm text-textMuted leading-relaxed">
              {t("about.brandSymbolBody")}
            </p>
          </div>
        </Section>

        <OceanDivider />

        <Section className="py-8 md:py-10">
          <div
            className={`max-w-none ${
              locale === "ja" ? "md:max-w-[44vw]" : "md:max-w-[48vw]"
            }`}
          >
            <h2 className="text-lg font-serif text-textDark mb-4">
              {t("about.stanceTitle")}
            </h2>
            <ul className="space-y-3 text-sm text-textMuted">
              {stanceItems.map((s, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="mt-[3px] h-[5px] w-[5px] rounded-full bg-oceanBrown/70" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-textMuted leading-relaxed mt-6">
              {t("about.closingBody")}
            </p>
          </div>
        </Section>

        <OceanDivider />

        <Section className="pt-8 md:pt-10 pb-10 md:pb-14">
          <div
            className={`max-w-none ${
              locale === "ja" ? "md:max-w-[44vw]" : "md:max-w-[48vw]"
            }`}
          >
            <h2 className="text-lg font-serif text-textDark mb-4">
              {t("about.taglineTitle")}
            </h2>
            <p className="text-sm text-textMuted leading-relaxed">
              {t("about.tagline")}
            </p>
          </div>
          <div className="md:hidden pt-6">
            <Image
              src="/images/bigwhale.png"
              alt=""
              width={900}
              height={1400}
              className="w-full h-auto max-w-sm mx-auto opacity-90"
            />
          </div>
        </Section>
      </div>
    </div>
  );
}
