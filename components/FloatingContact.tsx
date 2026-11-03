"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import site from "@/data/site.json";
import { InstagramIcon } from "./InstagramIcon";
import { useContactPanel } from "./ContactPanelProvider";
import styles from "./FloatingContact.module.css";

export function FloatingContact() {
  const t = useTranslations();
  const pathname = usePathname();
  const { open, openPanel, closePanel } = useContactPanel();
  const [footerVisible, setFooterVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    closePanel();
  }, [pathname, closePanel]);

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
      if (!rootRef.current?.contains(event.target as Node)) closePanel();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePanel(true);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closePanel]);

  return (
    <div
      ref={rootRef}
      className={styles.root}
      hidden={pathname === "/contact" || (footerVisible && !open)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closePanel();
      }}
    >
      <button
        type="button"
        className={styles.trigger}
        aria-label={t("nav.contact")}
        aria-expanded={open}
        aria-controls="floating-contact-panel"
        onClick={(event) => open ? closePanel() : openPanel(event.currentTarget)}
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
              closePanel(true);
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
          {(["line", "instagram"] as const).map((name) => (
            <li key={name} className={styles.social}>
              <a href={site.social[name]} target="_blank" rel="noopener noreferrer">
                <span className={styles.socialIcon}>
                  {name === "line" ? (
                    <Image src="/images/lineoa.png" alt="" width={24} height={24} />
                  ) : (
                    <InstagramIcon idPrefix="floating-contact-instagram" />
                  )}
                </span>
                <span>{t(`footer.${name}Label`)}</span>
                <span className="sr-only">({t("footer.opensNewTab")})</span>
                <span className={styles.externalArrow} aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
