import type { SVGProps } from "react";

const base: SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  width: 20,
  height: 20,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

/** Thin, hairline social glyphs to match Lucide (docs/02 §2.7, §3.15). */
export function InstagramGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r=".6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SnapchatGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3c3.1 0 5 2.3 5 5.2v2.3c.9.3 1.8.2 2.4-.1.4.4.1 1-1 1.5.2 1.8 1.7 3.2 3.3 3.7-.4 1-1.8 1.3-2.9 1.5-.3 1-1 1.4-1.9 1.4-1.1 0-2 1-4.9 1s-3.8-1-4.9-1c-.9 0-1.6-.4-1.9-1.4-1.1-.2-2.5-.5-2.9-1.5 1.6-.5 3.1-1.9 3.3-3.7-1.1-.5-1.4-1.1-1-1.5.6.3 1.5.4 2.4.1V8.2C7 5.3 8.9 3 12 3Z" />
    </svg>
  );
}

export function TikTokGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M13.5 3v11.2a3.3 3.3 0 1 1-3.3-3.3" />
      <path d="M13.5 3c.3 2.6 2 4.3 4.5 4.5" />
    </svg>
  );
}

export function XGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4l16 16M20 4 4 20" />
    </svg>
  );
}
