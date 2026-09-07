import fs from "node:fs";
import path from "node:path";
import type { MarqueTile } from "@/components/ui/Marquee";

// Order and names come from site.home.marques.list (docs/02 §3.7); slugs name the SVG files in /public/logos.
const SLUGS = ["rolls-royce", "bentley", "mercedes-benz", "range-rover", "chevrolet", "gmc", "lamborghini", "porsche"];

/** Resolves each marque name to its official SVG if the file exists in public/logos (server only). */
export function marqueTiles(names: string[]): MarqueTile[] {
  return names.map((name, i) => {
    const slug = SLUGS[i] ?? name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const file = path.join(process.cwd(), "public", "logos", `${slug}.svg`);
    return { name, logo: fs.existsSync(file) ? `/logos/${slug}.svg` : null };
  });
}
