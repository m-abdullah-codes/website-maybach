import { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import { avifSet, type Img } from "@/lib/images";

/**
 * The car cut-out layer as one <picture>: -A above 768 px, -B below, a single request. The box keeps a
 * CSS aspect ratio per breakpoint from the manifest, so it never shifts before the file arrives. A hero
 * loads eagerly with a high fetch priority and media-scoped preloads (docs/03 §12). The mobile candidate
 * is sized at 100vw (the 768 file) rather than 112vw: a few percent of upscale on a soft-edged cut-out is
 * invisible and keeps the LCP image under 30 KB.
 */
export function SceneCut({ a, b, alt, priority }: { a: Img; b: Img; alt: string; priority?: boolean }) {
  const { props: pa } = getImageProps({ src: a.src, alt, width: a.width, height: a.height, sizes: "60vw", quality: 80 });
  // No blur placeholder here: the cut-out is a transparent PNG, so a placeholder background would sit
  // behind the alpha as a grey box and never clear (getImageProps has no onLoad to remove it).
  const { props: pb } = getImageProps({ src: b.src, alt, width: b.width, height: b.height, sizes: "100vw", quality: 78 });
  const vars = { "--car-ratio-d": `${a.width} / ${a.height}`, "--car-ratio-m": `${b.width} / ${b.height}` } as CSSProperties;
  // 4:4:4 AVIF of the same rung, offered above the webp — the cut-out's edge is the whole subject.
  const aAvif = avifSet(pa.srcSet);
  const bAvif = avifSet(pb.srcSet);
  return (
    <>
      {priority && (
        <>
          <link rel="preload" as="image" type="image/avif" imageSrcSet={bAvif} imageSizes="100vw" media="(max-width: 767px)" fetchPriority="high" />
          <link rel="preload" as="image" type="image/avif" imageSrcSet={aAvif} imageSizes="60vw" media="(min-width: 768px)" fetchPriority="high" />
        </>
      )}
      <picture className="contents">
        <source media="(min-width: 768px)" type="image/avif" srcSet={aAvif} sizes="60vw" />
        <source media="(min-width: 768px)" srcSet={pa.srcSet} sizes="60vw" />
        <source type="image/avif" srcSet={bAvif} sizes="100vw" />
        <img
          src={pb.src}
          srcSet={pb.srcSet}
          sizes="100vw"
          width={b.width}
          height={b.height}
          alt={alt}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "low"}
          className="car-cut scene__car"
          style={{ ...(pb.style as CSSProperties), ...vars }}
        />
      </picture>
    </>
  );
}
