import type { Car, Site } from "@/lib/content";
import { formatNumber } from "@/lib/format";
import { SpecChip } from "@/components/ui/SpecChip";
import { Reveal } from "@/components/ui/Reveal";
import { SpecScroll } from "./SpecScroll";

/** docs/02 D2: eight spec chips in one glass strip overlapping the hero by 48 px; horizontal scroll-snap on mobile. */
export function SpecStrip({ car, site }: { car: Car; site: Site }) {
  const s = site.common.specs;
  const chips: Array<[string, string]> = [
    [s.engine, car.specs.engine],
    [s.power, car.specs.power],
    [s.acceleration, car.specs.acceleration],
    [s.drivetrain, car.specs.drivetrain],
    [s.year, String(car.year)],
    [s.mileage, `${formatNumber(car.specs.mileageKm)} ${s.km}`],
    [s.exterior, car.exterior],
    [s.interior, car.interior],
  ];
  return (
    <div className="wrap glance">
      <SpecScroll>
        <Reveal className="glance__strip glass">
          {chips.map(([label, value]) => (
            <SpecChip key={label} label={label} value={value} className="glance__chip" />
          ))}
        </Reveal>
      </SpecScroll>
    </div>
  );
}
