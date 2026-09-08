"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname as useNextPathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { Link, usePathname } from "@/lib/navigation";
import { cn } from "@/lib/cn";
import { getLenis } from "@/lib/lenis";
import { Wordmark } from "@/components/brand/Wordmark";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

export interface NavLabels {
  brand: string;
  links: Array<{ href: string; label: string }>;
  reserve: string;
  concierge: string;
  languageToggle: string;
  menu: string;
  close: string;
}

interface NavProps {
  locale: Locale;
  labels: NavLabels;
  whatsappHref: string;
  menuTexture: ReactNode;
}

/**
 * docs/02 §3.1: transparent over the hero; after 80 px a floating glass pill (56 px, max 1120 px, carbon
 * 82% behind the blur). Desktop: wordmark · links · language toggle + Reserve pill. Mobile: wordmark · ☰.
 */
export function Nav({ locale, labels, whatsappHref, menuTexture }: NavProps) {
  const pathname = usePathname();
  const fullPath = useNextPathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const other: Locale = locale === "ar" ? "en" : "ar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on navigation.
  useEffect(() => {
    setOpen(false);
  }, [fullPath]);

  // Body scroll lock + a flag the sticky bar reads.
  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      root.dataset.menuOpen = "";
      getLenis()?.stop();
    } else {
      delete root.dataset.menuOpen;
      getLenis()?.start();
    }
    return () => {
      delete root.dataset.menuOpen;
      getLenis()?.start();
    };
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    burgerRef.current?.focus();
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className={cn("nav", scrolled && "nav--pill", open && "nav--open")}>
        <div className="nav__bar">
          <Link href="/" className="nav__brand" aria-label={labels.brand}>
            <Wordmark variant={locale === "ar" ? "arabic" : "latin"} className="h-[22px] w-auto" />
          </Link>

          <nav className="nav__links">
            {labels.links.map((l) => (
              <Link key={l.href} href={l.href} className={cn("nav__link", isActive(l.href) && "is-active")}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="nav__end">
            <Link href={pathname} locale={other} className="nav__toggle" lang={other}>
              {labels.languageToggle}
            </Link>
            <Button href="/visit" size="sm" icon={false} className="nav__reserve">
              {labels.reserve}
            </Button>
            <button
              ref={burgerRef}
              type="button"
              className={cn("burger", open && "is-open")}
              aria-label={open ? labels.close : labels.menu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="burger__lines" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        id="mobile-menu"
        open={open}
        onClose={close}
        locale={locale}
        labels={labels}
        whatsappHref={whatsappHref}
        isActive={isActive}
        currentPath={pathname}
        texture={menuTexture}
      />
    </>
  );
}
