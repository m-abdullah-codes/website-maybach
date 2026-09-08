import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, dirOf, type Locale } from "@/lib/i18n";
import { fontClass } from "@/lib/fonts";
import { getSite } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { alternatesFor } from "@/lib/seo";
import { Shell } from "@/components/layout/Shell";
import { LocaleProvider } from "@/lib/navigation";
import "../globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://maybach.sa";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const site = getSite(locale as Locale);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: site.meta.homeTitle, template: site.meta.titlePattern.replace("{page}", "%s") },
    description: site.meta.description,
    alternates: alternatesFor(locale as Locale, "/"),
    openGraph: {
      type: "website",
      siteName: site.brand.name,
      locale: locale === "ar" ? "ar_SA" : "en_GB",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: site.brand.tagline }],
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

// Marks JS availability (reveals hide nothing without it) and hides the preloader before hydration on
// repeat visits within the session (docs/02 §3.16).
const PRELOAD_SCRIPT = `document.documentElement.classList.add("js");try{if(sessionStorage.getItem("mb-preloaded"))document.documentElement.classList.add("preloaded")}catch(e){}`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const site = getSite(locale);
  const whatsapp = buildWhatsAppUrl(locale);

  return (
    <html lang={locale} dir={dirOf(locale)} className={fontClass(locale)}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: PRELOAD_SCRIPT }} />
        <LocaleProvider locale={locale}>
          <Shell locale={locale} site={site} whatsappHref={whatsapp}>
            {children}
          </Shell>
        </LocaleProvider>
      </body>
    </html>
  );
}
