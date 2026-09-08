import Image from "next/image";
import type { Site } from "@/lib/content";
import { img } from "@/lib/images";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** docs/02 S5: SH-09 (dallah and cups) end-side at 4:5; copy start-side. */
export function Majlis({ site }: { site: Site }) {
  const m = site.showroom.majlis;
  const coffee = img("sh-09");
  return (
    <section id="majlis" className="wrap majlis">
      <div className="majlis__copy">
        <Reveal>
          <Eyebrow>{m.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal as="h2" lines className="t-display-l mt-6">
          {m.title}
        </Reveal>
        <Reveal as="p" delay={200} className="t-body-l measure mt-4 text-silver">
          {m.sub}
        </Reveal>
      </div>
      <Reveal delay={120} className="majlis__image">
        <Image
          src={coffee.src}
          alt={m.title}
          width={coffee.width}
          height={coffee.height}
          sizes="(min-width: 1024px) 40vw, 100vw"
          placeholder="blur"
          blurDataURL={coffee.blurDataURL}
          className="majlis__img"
        />
      </Reveal>
    </section>
  );
}
