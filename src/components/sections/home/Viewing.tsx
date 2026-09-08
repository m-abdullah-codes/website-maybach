import type { Site } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

interface ViewingProps {
  site: Site;
  locale: Locale;
  /** Override for the Showroom S7 variant ("Come after dark." on SH-06). */
  title?: string;
  desktop?: string;
  mobile?: string;
  id?: string;
}

/** docs/02 H8 (also V8, S7): centred copy in the doorway light, two buttons side by side, stacked on mobile. */
export function Viewing({ site, locale, title, desktop = "hm-view-d", mobile = "hm-view-m", id = "viewing" }: ViewingProps) {
  const v = site.home.viewing;
  return (
    <Section id={id} className="viewing">
      <MediaBg desktop={desktop} mobile={mobile} overlay="y" />
      <div className="wrap viewing__inner scrim scrim--center">
        <Reveal>
          <Eyebrow className="justify-center">{v.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal as="h2" lines className="t-display-l mt-6">
          {title ?? v.title}
        </Reveal>
        <Reveal as="p" delay={200} className="t-body-l mx-auto mt-4 max-w-[52ch] text-silver">
          {v.sub}
        </Reveal>
        <Reveal delay={320} className="viewing__actions">
          <Button href="/visit">{v.primary}</Button>
          <Button variant="whatsapp" href={buildWhatsAppUrl(locale)}>
            {v.secondary}
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
