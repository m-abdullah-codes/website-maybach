import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getSite } from "@/lib/content";
import { Wordmark } from "@/components/brand/Wordmark";

// Phase 0 placeholder: the wordmark and tagline only. Home H1–H10 are built in Phase 2.
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const site = getSite(locale);

  return (
    <main className="grid min-h-svh place-items-center">
      <div className="wrap text-center">
        <Wordmark variant={locale === "ar" ? "arabic" : "latin"} className="mx-auto h-10 w-auto" title={site.brand.wordmark} />
        <p className="t-body-l mt-6 text-silver">{site.brand.tagline}</p>
      </div>
    </main>
  );
}
