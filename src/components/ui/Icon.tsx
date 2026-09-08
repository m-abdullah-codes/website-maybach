import {
  ArrowUpRight,
  Compass,
  Droplets,
  FileBadge,
  Gem,
  KeyRound,
  Scale,
  ScrollText,
  ShieldCheck,
  Truck,
  type LucideProps,
} from "lucide-react";

const ICONS = {
  "arrow-up-right": ArrowUpRight,
  compass: Compass,
  droplets: Droplets,
  "file-badge": FileBadge,
  gem: Gem,
  "key-round": KeyRound,
  scale: Scale,
  "scroll-text": ScrollText,
  "shield-check": ShieldCheck,
  truck: Truck,
} as const;

export type IconName = keyof typeof ICONS;

/** Lucide, hairline: 1.25 px stroke in a 20 px frame (docs/02 §2.7). */
export function Icon({ name, size = 20, ...rest }: { name: IconName | string } & Omit<LucideProps, "ref">) {
  const C = ICONS[name as IconName];
  if (!C) return null;
  return <C size={size} strokeWidth={1.25} absoluteStrokeWidth aria-hidden="true" {...rest} />;
}

export { WhatsAppGlyph } from "./WhatsAppGlyph";
