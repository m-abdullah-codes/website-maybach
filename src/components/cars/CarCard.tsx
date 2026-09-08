import { getImageProps } from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Car, Site } from "@/lib/content";
import { img } from "@/lib/images";
import { Link } from "@/lib/navigation";
import { cn } from "@/lib/cn";
import { LiquidBadge } from "@/components/ui/LiquidBadge";

/**
 * docs/02 §3.11: a 4:5 portrait photograph in a glass-edged card; liquid badge top-start; name and one
 * line on a glass strip at the bottom; the whole card is the link. Hover: photo 1.03 over --d-slow, strip
 * lifts 4 px, badge brightens. Cards without a -CARD master use the -HERO-M crop at 50% 60%. The
 * photograph is deferred until the card comes near the viewport (RevealObserver), with a noscript copy.
 */
export function CarCard({ car, site }: { car: Car; site: Site }) {
  const source = car.images.card ?? car.images.heroM;
  const image = img(source);
  const sold = car.availability === "sold";
  const alt = `${car.year} ${car.marque} ${car.title} in ${car.environment}`;
  const { props } = getImageProps({
    src: image.src,
    alt,
    width: image.width,
    height: image.height,
    sizes: "(min-width: 1024px) 45vw, 100vw",
    quality: 75,
    placeholder: "blur",
    blurDataURL: image.blurDataURL,
  });
  const style = { ...(props.style as React.CSSProperties), ...(car.images.card ? {} : { objectPosition: "50% 60%" }) };
  return (
    <Link
      href={`/collection/${car.slug}`}
      className={cn("ccard", sold && "ccard--sold")}
      style={{ "--scene-accent": car.accent } as React.CSSProperties}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img data-src={props.src} data-srcset={props.srcSet} sizes={props.sizes} alt={alt} decoding="async" loading="lazy" fetchPriority="low" className="ccard__img" style={style} />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={String(props.srcSet).split(", ").find((c) => c.endsWith(" 768w"))?.replace(/ \d+w$/, "") ?? props.src} alt={alt} loading="lazy" className="ccard__img" />
      </noscript>
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
