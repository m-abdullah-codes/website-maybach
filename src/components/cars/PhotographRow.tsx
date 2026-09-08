import type { Car, Site, Side } from "@/lib/content";
import { cn } from "@/lib/cn";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Link } from "@/lib/navigation";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { ScrollFx } from "@/components/ui/ScrollFx";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { LiquidBadge, EnvCaption } from "@/components/ui/LiquidBadge";
import { SpecChip } from "@/components/ui/SpecChip";
import { Reveal } from "@/components/ui/Reveal";

interface PhotographRowProps {
  car: Car;
  site: Site;
  side?: Side;
  /** 92vh desktop / 88svh mobile by default; "hero" is the car detail page (100vh, badges under the nav). */
  height?: "row" | "hero";
  id?: string;
}

/**
 * docs/02 §3.10: one composed photograph, full-bleed, copy on the dark side, a small glass spec card.
 * The whole row is a link (the title link is stretched over the row; the buttons sit above it).
 * The photograph pans 40 px on scroll; nothing else moves. Sold rows dim the photograph to .6.
 */
export function PhotographRow({ car, site, side = "start", height = "row", id }: PhotographRowProps) {
  const sold = car.availability === "sold";
  const href = `/collection/${car.slug}`;
  const specLine = [car.specs.engine, car.specs.power, car.specs.acceleration].join(" · ");
  return (
    <Section
      id={id}
      accent={car.accent}
      className={cn("prow", `prow--${side}`, height === "hero" && "prow--hero", sold && "prow--sold")}
    >
      <ScrollFx parallax={40} className="prow__media absolute -inset-y-6 inset-x-0 will-change-transform">
        <MediaBg desktop={car.images.heroD} mobile={car.images.heroM} overlay={side === "start" ? "x" : "x-end"} priority={height === "hero"} />
      </ScrollFx>

      <Link href={href} className="prow__cover" aria-hidden="true" tabIndex={-1} data-cursor-view="" />

      <div className="prow__badges wrap">
        <LiquidBadge state={car.availability} label={site.common[car.availability]} />
        <EnvCaption>{car.environment}</EnvCaption>
      </div>

      <div className="wrap prow__inner">
        <div className="prow__copy">
          <Reveal>
            <Eyebrow>{`${car.marque} · ${car.year}`}</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h3 className="prow__title t-display-m">
              <Link href={href} className="prow__link">
                {car.title}
              </Link>
            </h3>
          </Reveal>
          <Reveal delay={160}>
            <p className="t-body-l measure mt-3 text-silver">{car.whisper}</p>
          </Reveal>
          <Reveal delay={240}>
            <p className="prow__specline t-small mt-4 text-pewter md:hidden">
              <span dir="ltr">{specLine}</span>
            </p>
          </Reveal>
          <Reveal delay={320} className="prow__actions">
            <Button variant="text" href={href}>
              {site.common.view}
            </Button>
            <Button variant="glass" href={sold ? buildWhatsAppUrl(car.locale) : `${href}#enquire`} icon={false}>
              {sold ? site.common.askAboutSimilar : site.common.enquire}
            </Button>
          </Reveal>
        </div>

        <Reveal delay={200} className="prow__card glass glass--ground">
          <SpecChip label={site.common.specs.engine} value={car.specs.engine} />
          <SpecChip label={site.common.specs.power} value={car.specs.power} />
          <SpecChip label={site.common.specs.acceleration} value={car.specs.acceleration} />
        </Reveal>
      </div>
    </Section>
  );
}
