"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { locales, type Locale } from "@/i18n/config";

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = useLocale() as Locale;
  const t = useTranslations("locale");

  function switchTo(locale: Locale) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("lang");
    document.cookie = `lang=${locale}; path=/; max-age=31536000`;
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
    router.refresh();
  }

  return (
    <div className="flex gap-1 rounded-full border border-oceanBrown/30 px-1 py-0.5 text-xs">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchTo(loc)}
          className={`px-2 py-0.5 rounded-full uppercase tracking-[0.18em] ${
            loc === currentLocale
              ? "bg-oceanBrown text-ivory"
              : "text-textMuted hover:text-textDark"
          }`}
        >
          {loc === "zh-TW" ? t("zhTW") : t("ja")}
        </button>
      ))}
    </div>
  );
}
