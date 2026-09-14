import { Section } from "@/components/Section";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "隱私權政策｜信億尉貿易有限公司",
  description: "信億尉貿易有限公司網站隱私權政策與個人資料使用說明。",
  path: "/privacy",
  noIndex: true
});

export default async function PrivacyPage() {
  const t = await getTranslations();

  return (
    <Section>
      <h1 className="text-xl font-serif text-textDark mb-3">
        {t("privacy.title")}
      </h1>
      <p className="text-sm text-textMuted max-w-2xl leading-relaxed">
        {t("privacy.body")}
      </p>
    </Section>
  );
}
