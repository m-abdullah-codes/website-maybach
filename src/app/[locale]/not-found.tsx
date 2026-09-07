import { getLocale } from "next-intl/server";
import { getSite } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { GiantWord } from "@/components/ui/GiantWord";

// Phase 0: copy and structure only; the UT-404 photograph and the shell arrive in Phase 1.
export default async function NotFound() {
  const locale = (await getLocale()) as Locale;
  const site = getSite(locale);
  return (
    <main className="grid min-h-svh place-items-center">
      <div className="wrap text-center">
        <GiantWord text={site.notFound.giantWord} align="center" hero />
        <h1 className="t-display-xl mt-8">{site.notFound.title}</h1>
        <div className="mt-10">
          <Button href="/collection">{site.notFound.button}</Button>
        </div>
      </div>
    </main>
  );
}
