import type { Car, Site } from "@/lib/content";
import { img } from "@/lib/images";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { GalleryGrid, type GalleryImage } from "./GalleryGrid";
import { SplitText } from "@/components/ui/SplitText";

/**
 * docs/02 D4: HERO-D, DET-03 and HERO-M (portrait tile), plus retouched real photographs when supplied.
 * Desktop: a 3-column masonry with one 2-column tile. Mobile: horizontal scroll-snap 86vw tiles with a
 * hairline progress bar. Tap opens the obsidian lightbox.
 */
export function Gallery({ car, site }: { car: Car; site: Site }) {
  const name = `${car.marque} ${car.title}`;
  const pick = (ref: string, alt: string, span: GalleryImage["span"]): GalleryImage => {
    const i = img(ref);
    return { src: i.src, width: i.width, height: i.height, blurDataURL: i.blurDataURL, alt, span };
  };
  const images: GalleryImage[] = [
    pick(car.images.heroD, `${name} in ${car.environment}`, "wide"),
    pick(car.images.heroM, `${name} in ${car.environment}`, "tall"),
    pick(car.images.rear, `${name}`, "wide"),
  ];
  return (
    <section id="gallery" className="gallery">
      <div className="wrap gallery__head">
        <Reveal>
          <Eyebrow>{site.car.gallery.eyebrow}</Eyebrow>
        </Reveal>
        <SplitText tag="h2" className="t-display-l mt-6" text={site.car.gallery.title} />
      </div>
      <GalleryGrid images={images} closeLabel={site.nav.close} />
    </section>
  );
}
