import type { Car, Site } from "@/lib/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Scene } from "./Scene";
import { SceneMotion } from "./SceneMotion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { LiquidBadge, EnvCaption } from "@/components/ui/LiquidBadge";
import { SpecChip } from "@/components/ui/SpecChip";

/**
 * docs/02 C2: a Collection row built as a Scene (Cullinan, Flying Spur, Continental GT). Three of the
 * four Scenes on the site live here.
 *
 * **Every Scene now stands in the salon.** The room is FSM-BG and the light treatment, for all three
 * rows, at the client's request (September 2026) — the sandwich sections are one pale room and the
 * photograph rows and cards around them stay dark. docs/02 §2.1 says there is exactly one light room
 * and it is the Flying Spur's; that is the disagreement, recorded in qa/LOG.md. The consequence to know
 * about: the Collection page's warm → neutral → pale → cool rhythm no longer runs through the Scenes,
 * though every `temperature` in cars.json is untouched and the photograph rows and cards still carry it.
 *
 * Each car's own -BG- plate stays on disk and in the manifest, unused, exactly like the twelve that
 * belong to the cars that are not Scenes. Point `bg` back at `car.images.bgD/bgM` to undo this.
 */
export function SceneRow({ car, site, side = "end" }: { car: Car; site: Site; side?: "start" | "end" }) {
  const sold = car.availability === "sold";
  const href = `/collection/${car.slug}`;
  return (
    <SceneMotion drift={side === "end" ? -40 : 40}>
      <Scene
        id={`row-${car.slug}`}
        bg={{ d: "fsm-bg-d", m: "fsm-bg-m" }}
        cut={{ a: car.images.cutA, b: car.images.cutB }}
        // No still fallback, for the reason the Home hero dropped one when it was a light room: §3.9
        // wants the car's own -HERO- photograph if the cut-out fails, but those are night photographs
        // of the showroom and they would land under ink type on a pale cyclorama. Without one a failed
        // cut-out leaves the salon, the copy and the spec card, which still reads.
        word={car.giantWord ?? car.model}
        wordAlt={car.giantWordAlt ?? undefined}
        carAlt={`${car.year} ${car.marque} ${car.title} in ${car.environment}`}
        side={side}
        height="row"
        light
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
