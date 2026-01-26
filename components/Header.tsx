"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./LocaleSwitcher";

const NAV_ITEMS = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/brand", key: "brand" },
  { href: "/products", key: "products" },
  { href: "/news", key: "news" },
  { href: "#contact", key: "contact" }
];

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const tNav = useTranslations("nav");
  const tSite = useTranslations("site");
  const tCommon = useTranslations("common");

  return (
    <header className="sticky top-0 z-30 bg-ivory/90 backdrop-blur border-b border-oceanBrown/10">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-3 md:py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oceanBrown/60 rounded-full"
        >
          <div className="w-9 h-9 rounded-full bg-oceanBrown/90 overflow-hidden flex items-center justify-center">
            <Image
              src="/images/Logo.jpg"
              alt={tCommon("logoAlt")}
              className="h-full w-full object-cover"
              width={36}
              height={36}
              priority
            />
          </div>
          <div className="hidden sm:block">
            <div className="text-xs uppercase tracking-[0.18em] text-textMuted font-semibold">
              {tSite("brandUpper")}
            </div>
            <div className="text-sm text-textDark font-semibold">
              {tSite("companyName")}
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`tracking-wide ${
                pathname === item.href
                  ? "text-oceanBrown"
                  : "text-textMuted hover:text-textDark"
              }`}
            >
              {tNav(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <button
            type="button"
            className="md:hidden rounded-full border border-oceanBrown/30 px-3 py-1 text-xs text-textMuted hover:text-textDark"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? tCommon("close") : tCommon("menu")}
          </button>
        </div>
      </div>
      <nav
        id="mobile-nav"
        className={`md:hidden border-t border-oceanBrown/10 ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <div className="px-6 py-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`block py-2 text-sm font-semibold ${
                pathname === item.href
                  ? "text-oceanBrown"
                  : "text-textMuted hover:text-textDark"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {tNav(item.key)}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
