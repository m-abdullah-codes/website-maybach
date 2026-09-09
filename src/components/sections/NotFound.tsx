import { getSite } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { Button } from "@/components/ui/Button";
import { GiantWord } from "@/components/ui/GiantWord";

/**
 * docs/02 §11: UT-404 (the empty pool of light), the word 404, one line, one button. Centred.
 *
 * Two routes render it. `not-found.tsx` is what a notFound() call inside the app resolves to, and
 * `[...rest]/page.tsx` prerenders it at /404 in each locale, which is the file the asset store hands
 * to a visitor who asks for a path that was never built (wrangler.jsonc → not_found_handling).
 */
export function NotFound({ locale }: { locale: Locale }) {
  const site = getSite(locale);
  return (
    <Section className="page-404" fade={false}>
      <MediaBg desktop="ut-404-d" mobile="ut-404-m" priority overlay="y" />
      <div className="wrap page-404__inner">
        <GiantWord text={site.notFound.giantWord} align="center" hero />
        <h1 className="t-display-xl mt-6">{site.notFound.title}</h1>
        <div className="mt-10">
          <Button href="/collection">{site.notFound.button}</Button>
        </div>
      </div>
    </Section>
  );
}
