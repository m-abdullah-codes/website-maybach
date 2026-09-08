import type { Site } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { ScrollFx } from "@/components/ui/ScrollFx";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

/**
 * docs/02 V2–V7: six full-bleed 80vh photographs, each with one 480 px frosted card on the dark side,
 * sides alternating. The card holds a hairline icon, the number and name, the title, one line and the
 * concierge link (WhatsApp with the service pre-filled). Mobile: the photo above, the card over its lower half.
 */
export function ServiceRows({ site, locale }: { site: Site; locale: Locale }) {
  return (
    <>
      {site.services.items.map((s, i) => {
        const side = i % 2 === 0 ? "start" : "end";
        return (
          <Section key={s.key} id={`service-${s.key}`} className={cn("srow", `srow--${side}`)}>
            <ScrollFx parallax={40} className="absolute -inset-y-6 inset-x-0 will-change-transform">
              <MediaBg desktop={`${s.image}-d`} mobile={`${s.image}-m`} overlay={side === "start" ? "x" : "x-end"} />
            </ScrollFx>
            <div className="wrap srow__inner">
              <Reveal className="srow__card glass">
                <Icon name={s.icon} className="text-silver" />
                <p className="t-eyebrow mt-6">{`${s.number} · ${s.name}`}</p>
                <h2 className="t-display-m mt-3">{s.title}</h2>
                <p className="t-body-m mt-3 text-silver">{s.line}</p>
                <div className="mt-6">
                  <Button variant="text" href={buildWhatsAppUrl(locale, { service: s.name })}>
                    {site.common.askConcierge}
                  </Button>
                </div>
              </Reveal>
            </div>
          </Section>
        );
      })}
    </>
  );
}
