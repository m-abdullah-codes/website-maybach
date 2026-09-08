import type { Car, Site } from "@/lib/content";
import { fill } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { ScrollFx } from "@/components/ui/ScrollFx";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { LiquidBadge, EnvCaption } from "@/components/ui/LiquidBadge";
import { Reveal } from "@/components/ui/Reveal";
import { NavTheme } from "@/components/layout/NavTheme";

/**
 * docs/02 D1: the Photograph, full-bleed, 100vh; copy bottom-start over the dark side; liquid badge
 * top-start; environment caption top-end. The Flying Spur keeps the same layout on the salon with ink type.
 */
export function CarHero({ car, site }: { car: Car; site: Site }) {
  const sold = car.availability === "sold";
  const light = car.scene === "light";
  return (
    <Section id="car-hero" accent={car.accent} light={light} className={cn("prow prow--start prow--hero car-hero", sold && "prow--sold")}>
      <NavTheme light={light} />
      <ScrollFx parallax={40} className="prow__media absolute -inset-y-6 inset-x-0 will-change-transform">
        <MediaBg desktop={car.images.heroD} mobile={car.images.heroM} overlay="x" priority />
      </ScrollFx>

      <div className="prow__badges wrap">
        <LiquidBadge state={car.availability} label={site.common[car.availability]} />
        <EnvCaption>{car.environment}</EnvCaption>
      </div>

      <div className="wrap car-hero__inner">
        <div className="car-hero__copy">
          <Reveal>
            <Eyebrow>{`${car.marque} · ${car.year}`}</Eyebrow>
          </Reveal>
          <Reveal as="h1" lines className="t-display-xl mt-6">
            {car.title}
          </Reveal>
          <Reveal as="p" delay={160} className="t-body-l mt-4">
            {fill(site.common.colourLine, { exterior: car.exterior, interior: car.interior })}
          </Reveal>
          <Reveal as="p" delay={240} className="t-body-l mt-2 text-silver">
            {car.whisper}
          </Reveal>
          <Reveal delay={320} className="car-hero__actions">
            <Button href={sold ? buildWhatsAppUrl(car.locale) : "#enquire"} icon={!sold}>
              {sold ? site.common.askAboutSimilar : site.common.enquire}
            </Button>
            <Button variant="whatsapp" href={buildWhatsAppUrl(car.locale, { car })}>
              {site.common.messageConcierge}
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
