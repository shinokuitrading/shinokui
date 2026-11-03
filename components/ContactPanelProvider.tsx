"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { Button } from "./buttons";

const ContactPanelContext = createContext<{
  open: boolean;
  openPanel: (trigger: HTMLButtonElement) => void;
  closePanel: (restoreFocus?: boolean) => void;
} | null>(null);

export function ContactPanelProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLButtonElement | null>(null);
  const openPanel = useCallback((trigger: HTMLButtonElement) => {
    opener.current = trigger;
    setOpen(true);
  }, []);
  const closePanel = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) opener.current?.focus({ preventScroll: true });
  }, []);

  return (
    <ContactPanelContext.Provider value={{ open, openPanel, closePanel }}>
      {children}
    </ContactPanelContext.Provider>
  );
}

export function useContactPanel() {
  const context = useContext(ContactPanelContext);
  if (!context) throw new Error("Contact panel requires ContactPanelProvider");
  return context;
}

export function ContactPanelButton({ children }: { children: React.ReactNode }) {
  const { open, openPanel } = useContactPanel();
  return (
    <Button
      type="button"
      variant="primary"
      className="whitespace-nowrap"
      aria-expanded={open}
      aria-controls="floating-contact-panel"
      onClick={(event) => openPanel(event.currentTarget)}
    >
      {children}
    </Button>
  );
}
