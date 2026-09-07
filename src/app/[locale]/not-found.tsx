import { getLocale } from "next-intl/server";
import { getSite } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { Button } from "@/components/ui/Button";
import { GiantWord } from "@/components/ui/GiantWord";

/** docs/02 §11: UT-404 (the empty pool of light), the word 404, one line, one button. Centred. */
export default async function NotFound() {
  const locale = (await getLocale()) as Locale;
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
