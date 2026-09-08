import type { Site } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/** docs/02 C3: SV-01 (the aircraft ramp) with one centred glass panel; the button opens the concierge on WhatsApp for sourcing. */
export function NotHere({ site, locale }: { site: Site; locale: Locale }) {
  const n = site.collection.notHere;
  const sourcing = site.services.items.find((s) => s.key === "sourcing")?.name ?? site.services.items[0].name;
  return (
    <Section id="not-here" className="nothere" fade={false}>
      <MediaBg desktop="sv-01-d" mobile="sv-01-m" overlay="y" />
      <div className="wrap nothere__inner">
        <Reveal className="nothere__panel glass">
          <h2 className="t-display-l">{n.title}</h2>
          <p className="t-body-l mt-4 text-silver">{n.sub}</p>
          <div className="mt-8">
            <Button href={buildWhatsAppUrl(locale, { service: sourcing })}>{n.button}</Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
