import type { Car, Site } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CardPair } from "@/components/cars/CardPair";

/** docs/02 D8: two cards of the same category, then the next in the list; "See the whole collection". */
export function AlsoInResidence({ car, cars, site }: { car: Car; cars: Car[]; site: Site }) {
  const others = cars.filter((c) => c.slug !== car.slug);
  const same = others.filter((c) => c.category === car.category);
  const rest = others.filter((c) => c.category !== car.category);
  const picks = [...same, ...rest].slice(0, 2);
  return (
    <section id="also" className="also">
      <div className="wrap also__head">
        <Reveal>
          <Eyebrow>{site.car.alsoInResidence}</Eyebrow>
        </Reveal>
        <Reveal delay={120} className="also__link">
          <Button variant="text" href="/collection">
            {site.common.seeWholeCollection}
          </Button>
        </Reveal>
      </div>
      <CardPair cars={picks} site={site} />
      <div className="wrap also__foot md:hidden">
        <Button variant="text" href="/collection">
          {site.common.seeWholeCollection}
        </Button>
      </div>
    </section>
  );
}
