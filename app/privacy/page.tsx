import { Section } from "@/components/Section";
import { getTranslations } from "next-intl/server";

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
