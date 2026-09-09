import { getImageProps } from "next/image";
import type { Car, Site } from "@/lib/content";
import { img, cardStripLuma, CARD_STRIP_INK_ABOVE } from "@/lib/images";
import { Link } from "@/lib/navigation";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";
import { LiquidBadge } from "@/components/ui/LiquidBadge";

/**
 * docs/02 §3.11: a 4:5 portrait photograph in a glass-edged card; liquid badge top-start; name and one
 * line on a glass strip at the bottom; the whole card is the link. Hover: photo 1.03 over --d-slow, strip
 * lifts 4 px, badge brightens. Cards without a -CARD master use the -HERO-M crop at 50% 60%. The
 * photograph is deferred until the card comes near the viewport (RevealObserver), with a noscript copy.
 *
 * The strip keeps the plain glass recipe and changes its *type colour* per card. Since the cars moved
 * into the showroom every card photograph ends in polished cream marble, and platinum on that all but
 * disappeared — the client's note. One darker colour is not the answer either: measured behind the
 * strip, the set runs from 20 (the Corvette's black studio) to 170 (the Flying Spur's white one), so
 * ink would have fixed the bright cards and destroyed the dark ones. scripts/blur-placeholders.mjs
 * records the reading per image in src/lib/luma.json and the strip picks ink or platinum from it,
 * using the same ink tokens the light room uses. Nothing about the glass changes.
 */
export function CarCard({ car, site }: { car: Car; site: Site }) {
  const source = car.images.card ?? car.images.heroM;
  const image = img(source);
  // The strip is glass, so its legibility is the photograph's, not the panel's.
  const inkStrip = cardStripLuma(source) > CARD_STRIP_INK_ABOVE;
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
      data-cursor-view=""
      style={{ "--scene-accent": car.accent } as React.CSSProperties}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img data-src={props.src} data-srcset={props.srcSet} sizes={props.sizes} alt={alt} decoding="async" loading="lazy" fetchPriority="low" className="ccard__img" style={style} />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={String(props.srcSet).split(", ").find((c) => c.endsWith(" 768w"))?.replace(/ \d+w$/, "") ?? props.src} alt={alt} loading="lazy" className="ccard__img" />
      </noscript>
      <LiquidBadge state={car.availability} label={site.common[car.availability]} className="ccard__badge" />
      <div className={cn("ccard__strip glass", inkStrip && "ccard__strip--ink")}>
        <p className="t-eyebrow">{`${car.marque} · ${car.year}`}</p>
        <p className="ccard__title t-card-title">
          <span>{car.title}</span>
          <Icon name="arrow-up-right" className="ccard__arrow" size={20} />
        </p>
        <p className="t-body-m mt-1.5 text-silver">{car.whisper}</p>
      </div>
    </Link>
  );
}
