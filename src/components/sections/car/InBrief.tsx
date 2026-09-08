import Image from "next/image";
import type { Car, Site } from "@/lib/content";
import { img } from "@/lib/images";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** docs/02 D3: DET-01 (exterior macro, 4:3) end-side; the three-sentence story start-side. Mobile: image first. */
export function InBrief({ car, site }: { car: Car; site: Site }) {
  const macro = img(car.images.macro);
  return (
    <section id="in-brief" className="wrap brief">
      <Reveal className="brief__image">
        <Image
          src={macro.src}
          alt={`${car.marque} ${car.title}`}
          width={macro.width}
          height={macro.height}
          sizes="(min-width: 1024px) 50vw, 100vw"
          placeholder="blur"
          blurDataURL={macro.blurDataURL}
          className="brief__img"
        />
      </Reveal>
      <div className="brief__copy">
        <Reveal>
          <Eyebrow>{site.car.inBrief}</Eyebrow>
        </Reveal>
        <Reveal as="p" delay={120} className="t-body-l measure mt-6">
          {car.story}
        </Reveal>
      </div>
    </section>
  );
}
