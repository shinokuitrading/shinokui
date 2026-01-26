import Image from "next/image";
import { getTranslations } from "next-intl/server";
import site from "@/data/site.json";

export async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="mt-16 border-t border-oceanBrown/10 bg-ivory">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 md:py-10 grid gap-6 md:grid-cols-[2fr,1fr]">
        <div className="flex gap-4 items-start">
          <Image
            src="/images/Logo.jpg"
            alt={t("common.logoAlt")}
            width={72}
            height={72}
            className="h-12 w-12 md:h-16 md:w-16 rounded-full object-cover"
          />
          <div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-textMuted">
                {t("site.brandUpper")}
              </p>
              <p className="text-sm text-textDark">{t("site.companyName")}</p>
              <p className="text-sm text-textMuted max-w-md">
                {t("site.description")}
              </p>
            </div>
            <div className="mt-[50px]">
              <p className="text-xs text-textMuted">
                {t("site.tags")}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-2 text-sm text-textMuted">
          <p>{t("footer.emailLabel")}: {site.email}</p>
          <p>{t("footer.addressLabel")}: {t("site.address")}</p>
          <p>{t("footer.telTwLabel")}: {site.phoneTaiwan ?? site.phone}</p>
          <p>{t("footer.telJpLabel")}: {site.phoneJapan}</p>
          <div className="flex items-center gap-3 pt-1">
            <a
              href={site.social.line}
              className="text-xs text-textMuted hover:text-textDark"
              target="_blank"
              rel="noreferrer"
            >
              {t("footer.lineLabel")}
            </a>
            <a
              href={site.social.line}
              className="h-16 w-16 rounded-md overflow-hidden border border-oceanBrown/10 bg-ivory"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/images/lineoa.png"
                alt={t("footer.lineAlt")}
                className="h-full w-full object-cover"
                width={64}
                height={64}
              />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-oceanBrown/10 py-3 text-center text-[0.6875rem] text-textMuted">
        {t("footer.rights", { year, company: t("site.companyName") })}
      </div>
    </footer>
  );
}
