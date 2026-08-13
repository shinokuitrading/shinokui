"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { buttonStyles } from "@/components/buttons";

export function AgeGate() {
  const t = useTranslations("ageGate");
  const [isOpen, setIsOpen] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const reopenAfterReturning = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setIsOpen(true);
      }
    };

    window.addEventListener("pageshow", reopenAfterReturning);

    return () => {
      window.removeEventListener("pageshow", reopenAfterReturning);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    confirmButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const leaveSite = () => {
    setIsLeaving(true);
    window.open("", "_self");
    window.close();
    window.location.replace("about:blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-textDark/75 px-6 backdrop-blur-sm">
      <section
        aria-labelledby="age-gate-title"
        aria-describedby="age-gate-description"
        aria-modal="true"
        className="w-full max-w-md rounded-lg border border-oceanBrown/20 bg-ivory p-7 text-center shadow-2xl md:p-8"
        role="dialog"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-oceanBrown">
          {t("eyebrow")}
        </p>
        <h2
          id="age-gate-title"
          className="font-serif text-2xl font-semibold text-textDark md:text-3xl"
        >
          {t("title")}
        </h2>
        <p
          id="age-gate-description"
          className="mt-4 text-sm leading-7 text-textMuted md:text-base"
        >
          {t("description")}
        </p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button
            ref={confirmButtonRef}
            className={buttonStyles({ className: "w-full" })}
            type="button"
            onClick={() => setIsOpen(false)}
          >
            {t("confirm")}
          </button>
          <button
            className={buttonStyles({
              className: "w-full",
              variant: "outline"
            })}
            disabled={isLeaving}
            type="button"
            onClick={leaveSite}
          >
            {isLeaving ? t("leaving") : t("deny")}
          </button>
        </div>
      </section>
    </div>
  );
}
