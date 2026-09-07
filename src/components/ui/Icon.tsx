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

/** The WhatsApp glyph, drawn thin to match Lucide (docs/02 §3.2). */
export function WhatsAppGlyph({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.9L3.5 20.5l4.2-1.2A8.5 8.5 0 1 0 12 3.5Z" />
      <path d="M9.2 8.4c.2-.4.5-.5.8-.5h.5c.2 0 .4.2.5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.2-.1.4 0 .5a6 6 0 0 0 2.9 2.9c.2.1.4.1.5 0l.6-.5c.2-.1.4-.2.6-.1l1.7.7c.2.1.4.3.4.5v.5c0 .3-.1.6-.4.8-.6.5-1.4.8-2.3.6a8.6 8.6 0 0 1-6.2-6.2c-.2-.9.1-1.7.6-2.3Z" />
    </svg>
  );
}
