import { Photo } from "@/components/ui/Photo";
import type { Site } from "@/lib/content";
import { img } from "@/lib/images";
import { Reveal } from "@/components/ui/Reveal";

/** docs/02 S2: SH-04 (the sign, macro) start-side at 4:3; three paragraphs end-side. Mobile: image, then copy. */
export function Story({ site }: { site: Site }) {
  const sign = img("sh-04");
  return (
    <section id="story" className="wrap story">
      <Reveal className="story__image">
        <Photo
          src={sign.src}
          alt={site.brand.wordmark}
          width={sign.width}
          height={sign.height}
          sizes="(min-width: 1024px) 50vw, 100vw"
          placeholder="blur"
          blurDataURL={sign.blurDataURL}
          className="story__img"
        />
      </Reveal>
      <div className="story__copy">
        {site.showroom.story.map((p, i) => (
          <Reveal key={i} as="p" delay={i * 120} className="t-body-l measure">
            {p}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
