import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import type { Site } from "@/lib/content";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { StickyBar } from "./StickyBar";
import { Grain } from "./Grain";
import { SmoothScroll } from "./SmoothScroll";
import { Preloader } from "./Preloader";
import { PageTransition } from "./PageTransition";

/** The global shell (docs/03 Phase 1): preloader, nav, main, footer, sticky bar, grain, transition, smooth scroll. */
export function Shell({
  locale,
  site,
  whatsappHref,
  children,
}: {
  locale: Locale;
  site: Site;
  whatsappHref: string;
  children: ReactNode;
}) {
  const labels = {
    brand: site.brand.name,
    links: [
      { href: "/collection", label: site.nav.collection },
      { href: "/showroom", label: site.nav.showroom },
      { href: "/services", label: site.nav.services },
      { href: "/visit", label: site.nav.visit },
    ],
    reserve: site.nav.reserve,
    concierge: site.nav.concierge,
    languageToggle: site.nav.languageToggle,
    menu: site.nav.menu,
    close: site.nav.close,
  };

  return (
    <>
      <Preloader arabic={locale === "ar"} />
      <Nav locale={locale} labels={labels} whatsappHref={whatsappHref} />
      <main id="main">{children}</main>
      <Footer locale={locale} />
      <StickyBar
        enquire={site.common.enquire}
        concierge={site.nav.concierge}
        enquireHref="/visit#form"
        whatsappHref={whatsappHref}
      />
      <Grain />
      <PageTransition />
      <SmoothScroll />
    </>
  );
}
