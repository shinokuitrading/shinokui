"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import site from "@/data/site.json";
import styles from "./FloatingContact.module.css";

export function FloatingContact() {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const contact = document.querySelector("#contact nav");
    if (!contact) return;
    const observer = new IntersectionObserver(([entry]) => {
      setFooterVisible(entry.isIntersecting);
    });
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus({ preventScroll: true });
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const phones = [
    { label: "footer.telTwLabel", value: site.phoneTaiwan ?? site.phone },
    { label: "footer.telJpLabel", value: site.phoneJapan }
  ];

  return (
    <div
      ref={rootRef}
      className={styles.root}
      hidden={pathname === "/contact" || (footerVisible && !open)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-label={t("nav.contact")}
        aria-expanded={open}
        aria-controls="floating-contact-panel"
        onClick={() => setOpen((value) => !value)}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="m4 7 8 6 8-6" />
        </svg>
        <span className={styles.triggerLabel}>{t("nav.contact")}</span>
      </button>
      <section
        id="floating-contact-panel"
        aria-labelledby="floating-contact-title"
        className={styles.panel}
        hidden={!open}
      >
        <div className={styles.heading}>
          <h2 id="floating-contact-title">{t("nav.contact")}</h2>
          <button
            type="button"
            className={styles.close}
            aria-label={t("common.close")}
            onClick={() => {
              setOpen(false);
              triggerRef.current?.focus({ preventScroll: true });
            }}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="m6 6 12 12M6 18 18 6" />
            </svg>
          </button>
        </div>
        <ul className={styles.links}>
          <li>
            <a ref={firstLinkRef} href={`mailto:${site.email}`}>
              <span className={styles.label}>{t("footer.emailLabel")}</span>
              <span>{site.email}</span>
            </a>
          </li>
          {phones.map(({ label, value }) => (
            <li key={label}>
              <a href={`tel:${value.replace(/[\s-]/g, "")}`}>
                <span className={styles.label}>{t(label)}</span>
                <span>{value}</span>
              </a>
            </li>
          ))}
          <li className={styles.social}>
            {(["line", "instagram"] as const).map((name) => (
              <a key={name} href={site.social[name]} target="_blank" rel="noopener noreferrer">
                {t(`footer.${name}Label`)}
                <span className="sr-only">({t("footer.opensNewTab")})</span>
                <span aria-hidden="true">↗</span>
              </a>
            ))}
          </li>
        </ul>
      </section>
    </div>
  );
}
