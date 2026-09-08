import type { Car, Site } from "@/lib/content";
import { cn } from "@/lib/cn";
import { CarCard } from "./CarCard";
import { Reveal } from "@/components/ui/Reveal";

/**
 * docs/02 §3.11: two cards side by side inside the container on ≥ 1024 px, stacked below; the only
 * car treatment that is not full-bleed. A single leftover card renders full width. Each card carries
 * its category so the Collection filter can hide one of a pair.
 */
export function CardPair({ cars, site, className }: { cars: Car[]; site: Site; className?: string }) {
  return (
    <div className={cn("wrap", className)}>
      <Reveal stagger className={cn("cpair", cars.length === 1 && "cpair--single")}>
        {cars.map((car) => (
          <div key={car.slug} data-cat={car.category}>
            <CarCard car={car} site={site} />
          </div>
        ))}
      </Reveal>
    </div>
  );
}
