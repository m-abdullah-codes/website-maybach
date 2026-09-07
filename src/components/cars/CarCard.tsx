import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Car, Site } from "@/lib/content";
import { img } from "@/lib/images";
import { Link } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { LiquidBadge } from "@/components/ui/LiquidBadge";

/**
 * docs/02 §3.11: a 4:5 portrait photograph in a glass-edged card; liquid badge top-start; name and one
 * line on a glass strip at the bottom; the whole card is the link. Hover: photo 1.03 over --d-slow, strip
 * lifts 4 px, badge brightens. Cards without a -CARD master use the -HERO-M crop at 50% 60%.
 */
export function CarCard({ car, site, priority }: { car: Car; site: Site; priority?: boolean }) {
  const source = car.images.card ?? car.images.heroM;
  const image = img(source);
  const sold = car.availability === "sold";
  return (
    <Link
      href={`/collection/${car.slug}`}
      className={cn("ccard", sold && "ccard--sold")}
      style={{ "--scene-accent": car.accent } as React.CSSProperties}
    >
      <Image
        src={image.src}
        alt={`${car.year} ${car.marque} ${car.title} in ${car.environment}`}
        fill
        sizes="(min-width: 1024px) 45vw, 100vw"
        priority={priority}
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        className="ccard__img"
        style={car.images.card ? undefined : { objectPosition: "50% 60%" }}
      />
      <LiquidBadge state={car.availability} label={site.common[car.availability]} className="ccard__badge" />
      <div className="ccard__strip glass">
        <p className="t-eyebrow">{`${car.marque} · ${car.year}`}</p>
        <p className="ccard__title t-card-title">
          <span>{car.title}</span>
          <ArrowUpRight className="ccard__arrow" size={20} strokeWidth={1.25} absoluteStrokeWidth aria-hidden="true" />
        </p>
        <p className="t-body-m mt-1.5 text-silver">{car.whisper}</p>
      </div>
    </Link>
  );
}
