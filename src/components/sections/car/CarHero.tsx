import type { Car, Site } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Section } from "@/components/ui/Section";
import { MediaBg } from "@/components/ui/MediaBg";
import { ScrollFx } from "@/components/ui/ScrollFx";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LiquidBadge, EnvCaption } from "@/components/ui/LiquidBadge";
import { Reveal } from "@/components/ui/Reveal";
import { NavTheme } from "@/components/layout/NavTheme";
import { SplitText } from "@/components/ui/SplitText";
import { GiantWord } from "@/components/ui/GiantWord";
import { GiantCycle } from "@/components/ui/GiantCycle";

/**
 * docs/02 D1: the Photograph, full-bleed, 100vh; copy bottom-start; liquid badge top-start;
 * environment caption top-end. The Flying Spur keeps the same layout on the salon with ink type.
 *
 * Built to the page-hero recipe since September 2026, at the client's request — the same minimal frame
 * the Home, Showroom, Services, Visit and Collection heroes use. Two changes from the spec, both
 * deliberate:
 *
 * **The blend is vertical.** `overlay="y"` rather than `"x"`, so the photograph darkens from the bottom
 * instead of from the start side. The copy sits in that shadow and the car keeps its whole width — which
 * is the point of a full-bleed photograph of one car.
 *
 * **It carries the giant word.** The same treatment the Home and page heroes use: the car's own word
 * over the photograph at 60%, high in the frame, decorative and aria-hidden. The word is
 * `giantWord ?? model`, exactly as the Collection Scene rows resolve it — so the three cars that have a
 * word cycle it (CULLINAN ⇄ PRESENCE, AZURE ⇄ HORIZON, MULLINER ⇄ TAILORED) and the other seven set
 * their model name once. No copy is invented for it, and none is needed. On the Flying Spur's salon the
 * word turns ink by itself, because `.scene--light .giant` already remaps the fill.
 *
 * **Three lines of copy, not five.** §D1 puts the colour line and two buttons here. The colour line is
 * dropped because EXTERIOR and INTERIOR are already two chips in the spec strip immediately below it, so
 * it said the same thing twice a hundred pixels apart; the buttons are dropped because D6 "Enquire" is a
 * whole section of this page and the sticky bar carries Enquire and Concierge from the moment the hero
 * is passed. What is left is eyebrow, name, whisper — the page-hero set.
 */
export function CarHero({ car, site }: { car: Car; site: Site }) {
  const sold = car.availability === "sold";
  const light = car.scene === "light";
  // As SceneRow resolves it: the car's own word where it has one, its model name otherwise.
  const word = { text: car.giantWord ?? car.model, alt: car.giantWordAlt ?? undefined };
  return (
    <Section id="car-hero" accent={car.accent} light={light} className={cn("prow prow--start prow--hero car-hero", sold && "prow--sold")}>
      <NavTheme light={light} />
      <ScrollFx parallax={40} className="prow__media absolute -inset-y-6 inset-x-0 will-change-transform">
        <MediaBg desktop={car.images.heroD} mobile={car.images.heroM} overlay="y" priority />
      </ScrollFx>

      <div className="prow__badges wrap">
        <LiquidBadge state={car.availability} label={site.common[car.availability]} />
        <EnvCaption>{car.environment}</EnvCaption>
      </div>

      <div className="wrap car-hero__inner">
        <div className="car-hero__top">
          {word.alt ? (
            <GiantCycle words={[word.text, word.alt]} hero reveal="inview" className="car-hero__word" />
          ) : (
            <GiantWord text={word.text} hero reveal="inview" className="car-hero__word" />
          )}
        </div>
        <div className="car-hero__copy">
          <Reveal>
            <Eyebrow>{`${car.marque} · ${car.year}`}</Eyebrow>
          </Reveal>
          <SplitText tag="h1" className="t-display-xl mt-6" text={car.title} />
          <Reveal as="p" delay={160} className="t-body-l mt-4 text-silver">
            {car.whisper}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
