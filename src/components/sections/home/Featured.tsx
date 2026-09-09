import type { Car, Site } from "@/lib/content";
import { Scene } from "@/components/cars/Scene";
import { SceneMotion } from "@/components/cars/SceneMotion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

/**
 * docs/02 H7: Scene 2 of 5, the one centred exhibit. The side-profile cut-out, the word AZURE centred
 * above the car, copy centred beneath. Cool room between two warm ones, on purpose.
 *
 * The room is FSM-BG and the light treatment, as every Scene on the site now is, at the client's
 * request (September 2026) — see SceneRow.tsx and qa/LOG.md. HM-FEAT-BG, the showroom's centre floor
 * after hours, stays on disk and in the manifest, unused; point `bg` back at it to undo this.
 * Composition knobs are in src/lib/scene-config.ts under "featured".
 */
export function Featured({ site, car }: { site: Site; car: Car }) {
  const f = site.home.featured;
  return (
    <SceneMotion drift={0}>
      <Scene
        id="featured"
        bg={{ d: "fsm-bg-d", m: "fsm-bg-m" }}
        cut={{ a: car.images.cutB, b: car.images.cutB }}
        word={f.giantWord}
        wordAlt={f.giantWordAlt}
        // Not `in ${car.environment}`: the exhibit stands on HM-FEAT-BG (The Centre Floor), not in the
        // Continental GT’s own room, so naming the room would describe a place the picture is not.
        carAlt={`${car.year} ${car.marque} ${car.title}`}
        side="center"
        height="hero"
        light
        accent={car.accent}
        eyebrow={<Eyebrow className="justify-center">{f.eyebrow}</Eyebrow>}
      >
        <h2 className="t-display-m mt-6">{f.name}</h2>
        <p className="t-body-l mt-3 text-silver">{f.line}</p>
        <div className="mt-8 flex justify-center">
          <Button href={`/collection/${car.slug}`}>{f.button}</Button>
        </div>
      </Scene>
    </SceneMotion>
  );
}
