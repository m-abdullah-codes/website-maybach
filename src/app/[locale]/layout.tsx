import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, dirOf, type Locale } from "@/lib/i18n";
import { fontClass } from "@/lib/fonts";
import { getSite } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Shell } from "@/components/layout/Shell";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const site = getSite(locale as Locale);
  return {
    title: { default: site.meta.homeTitle, template: site.meta.titlePattern.replace("{page}", "%s") },
    description: site.meta.description,
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
        <NextIntlClientProvider>
          <Shell locale={locale} site={site} whatsappHref={whatsapp}>
            {children}
          </Shell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
