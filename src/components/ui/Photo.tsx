import { getImageProps, type ImageProps } from "next/image";
import { avifSet } from "@/lib/images";

/**
 * next/image with the AVIF offered first.
 *
 * A bare <img srcset> can only name one format, and in the static build that format has to be the one
 * every browser reads (webp — see src/lib/image-loader.ts). A <picture> can offer both, so this takes
 * exactly the props <Image> takes, hands them to getImageProps, and wraps the result: AVIF for the
 * browsers that have it, the same rung in webp underneath for the ones that do not.
 *
 * The wrapper is `display: contents`, so it generates no box of its own — the <img> stays the flex or
 * grid item its section styles it as, and `fill` images keep the positioned ancestor they expect. The
 * full-bleed backgrounds and the Scene cut-outs build their own <picture> instead, because they also
 * art-direct on a media query (MediaBg, SceneCut).
 */
export function Photo(props: ImageProps) {
  const { props: img } = getImageProps(props);
  const { alt, ...rest } = img;
  const avif = avifSet(img.srcSet);
  return (
    <picture className="contents">
      {avif && avif !== img.srcSet && <source type="image/avif" srcSet={avif} sizes={img.sizes} />}
      <img alt={alt} {...rest} />
    </picture>
  );
}
