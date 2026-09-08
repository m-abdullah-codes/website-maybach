import { createElement, type SVGProps } from "react";
import { ICON_PATHS, type IconName } from "./icon-paths";

export type { IconName };

/**
 * Lucide, hairline: 1.25 px stroke in a 20 px frame (docs/02 §2.7). The paths are Lucide's own,
 * generated into icon-paths.ts by scripts/gen-icons.mjs, so the artwork is identical and the
 * library never reaches the browser. `strokeWidth` is absolute, as in lucide-react.
 */
export function Icon({
  name,
  size = 20,
  strokeWidth = 1.25,
  className,
  ...rest
}: { name: IconName | string; size?: number; strokeWidth?: number } & Omit<SVGProps<SVGSVGElement>, "name">) {
  const nodes = ICON_PATHS[name as IconName];
  if (!nodes) return null;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={(strokeWidth * 24) / size}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ? `lucide lucide-${name} ${className}` : `lucide lucide-${name}`}
      aria-hidden="true"
      {...rest}
    >
      {nodes.map(([tag, attrs], i) => createElement(tag, { ...attrs, key: i }))}
    </svg>
  );
}

export { WhatsAppGlyph } from "./WhatsAppGlyph";
