import type { Car, Site } from "@/lib/content";
import { Scene } from "@/components/cars/Scene";
import { SceneMotion } from "@/components/cars/SceneMotion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

/**
 * docs/02 H7: Scene 2 of 5, the one centred exhibit. CGT-BG with the side-profile cut-out, the word
 * AZURE centred above the car, copy centred beneath. Cool room between two warm ones, on purpose.
 */
export function Featured({ site, car }: { site: Site; car: Car }) {
  const f = site.home.featured;
  return (
    <SceneMotion drift={0}>
      <Scene
        id="featured"
        bg={{ d: car.images.bgD, m: car.images.bgM }}
        cut={{ a: car.images.cutB, b: car.images.cutB }}
        word={f.giantWord}
        carAlt={`${car.year} ${car.marque} ${car.title} in ${car.environment}`}
        side="center"
        height="hero"
        accent={car.accent}
        eyebrow={<Eyebrow className="justify-center">{f.eyebrow}</Eyebrow>}
        wordHidden={0.45}
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
