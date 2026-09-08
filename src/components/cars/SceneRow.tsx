import type { Car, Site } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Scene } from "./Scene";
import { SceneMotion } from "./SceneMotion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { LiquidBadge, EnvCaption } from "@/components/ui/LiquidBadge";
import { SpecChip } from "@/components/ui/SpecChip";

/**
 * docs/02 C2: a Collection row built as a Scene (Cullinan, Flying Spur in the light room, Continental GT).
 * Three of the five Scenes on the site live here.
 */
export function SceneRow({ car, site, side = "end", light }: { car: Car; site: Site; side?: "start" | "end"; light?: boolean }) {
  const sold = car.availability === "sold";
  const href = `/collection/${car.slug}`;
  return (
    <SceneMotion drift={side === "end" ? -40 : 40}>
      <Scene
        id={`row-${car.slug}`}
        bg={{ d: car.images.bgD, m: car.images.bgM }}
        cut={{ a: car.images.cutA, b: car.images.cutB }}
        fallback={{ d: car.images.heroD, m: car.images.heroM }}
        word={car.giantWord ?? car.model}
        carAlt={`${car.year} ${car.marque} ${car.title} in ${car.environment}`}
        side={side}
        height="row"
        light={light}
        accent={car.accent}
        eyebrow={<Eyebrow>{`${car.marque} · ${car.year}`}</Eyebrow>}
        badges={
          <>
            <LiquidBadge state={car.availability} label={site.common[car.availability]} />
            <EnvCaption>{car.environment}</EnvCaption>
          </>
        }
        card={
          <div className="glass glass--ground scene-row__card">
            <SpecChip label={site.common.specs.engine} value={car.specs.engine} />
            <SpecChip label={site.common.specs.power} value={car.specs.power} />
            <SpecChip label={site.common.specs.acceleration} value={car.specs.acceleration} />
          </div>
        }
      >
        <h2 className="t-display-l mt-6">{car.title}</h2>
        <p className="t-body-l measure mt-4 text-silver">{car.whisper}</p>
        <div className="scene-row__actions">
          <Button variant="text" href={href}>
            {site.common.view}
          </Button>
          <Button variant="glass" href={sold ? buildWhatsAppUrl(car.locale) : `${href}#enquire`} icon={false}>
            {sold ? site.common.askAboutSimilar : site.common.enquire}
          </Button>
        </div>
      </Scene>
    </SceneMotion>
  );
}
