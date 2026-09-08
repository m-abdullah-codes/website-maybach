"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { Link } from "@/lib/navigation";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import type { NavLabels } from "./Nav";

interface MobileMenuProps {
  id: string;
  open: boolean;
  onClose: () => void;
  locale: Locale;
  labels: NavLabels;
  whatsappHref: string;
  isActive: (href: string) => boolean;
  currentPath: string;
  /** BR-03 texture, rendered on the server and passed through (keeps the image manifest off the client). */
  texture: ReactNode;
}

/**
 * docs/02 §3.1: full-screen obsidian overlay with BR-03 as texture, Display L links stacked with a
 * staggered reveal, language toggle and WhatsApp at the bottom.
 */
export function MobileMenu({ id, open, onClose, locale, labels, whatsappHref, isActive, currentPath, texture }: MobileMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const other: Locale = locale === "ar" ? "en" : "ar";

  useEffect(() => {
    if (!open) return;
    const root = ref.current;
    const focusables = () =>
      Array.from(root?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      id={id}
      ref={ref}
      className={cn("menu", open && "is-open")}
      role="dialog"
      aria-modal="true"
      aria-label={labels.menu}
      aria-hidden={!open}
    >
      {texture}
      <nav className="menu__links">
        {labels.links.map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            className={cn("menu__link t-display-l", isActive(l.href) && "is-active")}
            style={{ "--i": i } as CSSProperties}
            tabIndex={open ? 0 : -1}
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="menu__foot" style={{ "--i": labels.links.length } as CSSProperties}>
        <Link href={currentPath} locale={other} className="menu__toggle t-button" lang={other} tabIndex={open ? 0 : -1}>
          {labels.languageToggle}
        </Link>
        <Button variant="whatsapp" href={whatsappHref} className="menu__whatsapp">
          {labels.concierge}
        </Button>
      </div>
    </div>
  );
}
