import Image from "next/image";
import type { Car, Site } from "@/lib/content";
import { img } from "@/lib/images";
import { Link } from "@/lib/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";

/**
 * Home H1. Since September 2026 this is the Showroom page's treatment, not the Scene: one photograph
 * of the showroom interior after hours — the Cullinan alone under a single pool of downlight — with the
 * giant word over the dark glass wall at reduced opacity and the copy at the bottom. The client asked
 * for "a hero like the Showroom page's", and for the cars to stand in his own building rather than in
 * an invented place; both notes are answered by the same plate.
 *
 * So docs/02 §3.9's five Scenes are now four (Home featured, Cullinan, Flying Spur, Continental GT).
 * That is a client-requested deviation from the spec, recorded in qa/LOG.md.
 *
 * Two things the four page heroes do not have and this one keeps: the word still cycles
 * (MAY BACH ⇄ THE FINEST), and the "Now showing" card floats bottom-end. The card names the car in the
 * photograph, which is deliberate — the hero *is* the Cullinan. The headline and support line come
 * back with the room: they exist verbatim in content/site.*.json and have been unrendered since the
 * hero lost them.
 */
export function Hero({ site, car }: { site: Site; car: Car }) {
  const h = site.home.hero;
  const mini = img(car.images.details[0]);
  return (
    <PageHero
      className="home__hero"
      wordPlacement="sky"
      desktop="hm-hero-bg-d"
      mobile="hm-hero-bg-m"
      eyebrow={h.eyebrow}
      word={h.giantWord}
      wordAlt={h.giantWordAlt}
      title={h.title}
      sub={h.sub}
      card={
        <Link href={`/collection/${car.slug}`} className="glass glass--ground now-showing">
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
      <div className="hero__actions">
        <Button href="/collection">{h.primary}</Button>
        <Button variant="secondary" href="/visit">
          {h.secondary}
        </Button>
      </div>
      <p className="scroll-cue" aria-hidden="true">
        <span>{site.common.scroll}</span>
      </p>
    </PageHero>
  );
}
