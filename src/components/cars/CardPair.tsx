import type { Car, Site } from "@/lib/content";
import { cn } from "@/lib/cn";
import { CarCard } from "./CarCard";
import { Reveal } from "@/components/ui/Reveal";

/**
 * docs/02 §3.11: two cards side by side inside the container on ≥ 1024 px, stacked below; the only
 * car treatment that is not full-bleed. A single leftover card renders full width.
 */
export function CardPair({ cars, site, className }: { cars: Car[]; site: Site; className?: string }) {
  return (
    <div className={cn("wrap", className)}>
      <Reveal stagger className={cn("cpair", cars.length === 1 && "cpair--single")}>
        {cars.map((car) => (
          <CarCard key={car.slug} car={car} site={site} />
        ))}
      </Reveal>
    </div>
  );
}
