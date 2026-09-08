import Image from "next/image";
import type { Car, Site } from "@/lib/content";
import { img } from "@/lib/images";
import { Link } from "@/lib/navigation";
import { Scene } from "@/components/cars/Scene";
import { SceneMotion } from "@/components/cars/SceneMotion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

/**
 * docs/02 H1: Scene 1 of 5. HM-HERO-BG with the Cullinan cut-out, giant word MAY BACH, copy start-side
 * bottom third, the floating glass card bottom-end with the car now showing. Mobile: word, car, copy,
 * two full-width buttons, scroll cue.
 */
export function Hero({ site, car }: { site: Site; car: Car }) {
  const h = site.home.hero;
  const mini = img(car.images.details[0]);
  return (
    <SceneMotion drift={-40}>
      <Scene
        id="hero"
        bg={{ d: "hm-hero-bg-d", m: "hm-hero-bg-m" }}
        cut={{ a: car.images.cutA, b: car.images.cutB }}
        fallback={{ d: "hm-hero-still-d", m: "hm-hero-still-m" }}
        word={h.giantWord}
        carAlt={`${car.year} ${car.marque} ${car.model} in ${car.environment}`}
        side="end"
        height="hero"
        priority
        enter="immediate"
        eyebrow={<Eyebrow>{h.eyebrow}</Eyebrow>}
        card={
          <Link href={`/collection/${car.slug}`} className="glass now-showing">
            <Image
              src={mini.src}
              alt=""
              width={72}
              height={72}
              sizes="72px"
              placeholder="blur"
              blurDataURL={mini.blurDataURL}
              className="now-showing__img"
            />
            <span className="now-showing__text">
              <span className="t-small text-pewter">{site.common.nowShowing}</span>
              <span className="t-card-title">{car.displayName}</span>
              <span className="t-button now-showing__view">{site.common.view}</span>
            </span>
          </Link>
        }
      >
        <h1 className="t-display-xl measure mt-6">{h.title}</h1>
        <p className="t-body-l measure mt-4 text-silver">{h.sub}</p>
        <div className="hero__actions">
          <Button href="/collection">{h.primary}</Button>
          <Button variant="secondary" href="/visit">
            {h.secondary}
          </Button>
        </div>
        <p className="scroll-cue" aria-hidden="true">
          <span>{site.common.scroll}</span>
        </p>
      </Scene>
    </SceneMotion>
  );
}
