import Image from "next/image";
import { getTranslations } from "next-intl/server";
import site from "@/data/site.json";

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 64"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="instagram-gradient" x1="8" y1="56" x2="56" y2="8">
          <stop stopColor="#FFD600" />
          <stop offset="0.45" stopColor="#FF0169" />
          <stop offset="1" stopColor="#D300C5" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#instagram-gradient)" />
      <rect x="15" y="15" width="34" height="34" rx="10" stroke="white" strokeWidth="4" />
      <circle cx="32" cy="32" r="8" stroke="white" strokeWidth="4" />
      <circle cx="44" cy="20" r="2.5" fill="white" />
    </svg>
  );
}

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
          <nav className="pt-1" aria-label={t("footer.socialLabel")}>
            <ul className="flex flex-wrap gap-5">
              <li>
                <a
                  href={site.social.line}
                  className="group flex w-fit flex-col gap-2 rounded-md text-xs text-textMuted hover:text-textDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oceanBrown focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{t("footer.lineLabel")}</span>
                  <span className="h-16 w-16 overflow-hidden rounded-md border border-oceanBrown/10 bg-ivory transition-transform group-hover:scale-105">
                    <Image
                      src="/images/lineoa.png"
                      alt=""
                      className="h-full w-full object-cover"
                      width={64}
                      height={64}
                    />
                  </span>
                  <span className="sr-only">({t("footer.opensNewTab")})</span>
                </a>
              </li>
              <li>
                <a
                  href={site.social.instagram}
                  className="group flex w-fit flex-col gap-2 rounded-md text-xs text-textMuted hover:text-textDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oceanBrown focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{t("footer.instagramLabel")}</span>
                  <span className="h-16 w-16 overflow-hidden rounded-md border border-oceanBrown/10 bg-ivory transition-transform group-hover:scale-105">
                    <InstagramIcon />
                  </span>
                  <span className="sr-only">({t("footer.opensNewTab")})</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="border-t border-oceanBrown/10 py-3 text-center text-[0.6875rem] text-textMuted">
        {t("footer.rights", { year, company: t("site.companyName") })}
      </div>
    </footer>
  );
}
