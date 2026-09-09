import { Photo } from "@/components/ui/Photo";
import type { Site } from "@/lib/content";
import { img } from "@/lib/images";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

/** docs/02 S4: three frames, wide / tall / wide, with one-word captions. Mobile: stacked, the -M variants at 4:5. */
export function Space({ site }: { site: Site }) {
  const captions = site.showroom.space.captions;
  const frames = [
    { d: img("sh-03-d"), m: img("sh-03-m"), caption: captions[0], kind: "wide" },
    { d: img("sh-07"), m: img("sh-07"), caption: captions[1], kind: "tall" },
    { d: img("sh-05-d"), m: img("sh-05-m"), caption: captions[2], kind: "wide" },
  ] as const;
  return (
    <section id="space" className="wrap space">
      <div className="space__grid">
        {frames.map((f, i) => (
          <Reveal key={f.caption} delay={i * 80} as="div" className={cn("space__frame", `space__frame--${i + 1}`, `space__frame--${f.kind}`)}>
            <div className="space__media">
              <Photo src={f.m.src} alt={f.caption} fill sizes="100vw" placeholder="blur" blurDataURL={f.m.blurDataURL} className="space__img md:hidden" />
              <Photo
                src={f.d.src}
                alt={f.caption}
                fill
                sizes={f.kind === "wide" ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
                placeholder="blur"
                blurDataURL={f.d.blurDataURL}
                className="space__img hidden md:block"
              />
            </div>
            <p className="t-small mt-3 text-pewter">{f.caption}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
