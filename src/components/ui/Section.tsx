import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionProps {
  id?: string;
  className?: string;
  /** 120 px fade to obsidian (or salon) at the bottom so sections melt into each other (docs/02 §2.1). */
  fade?: boolean;
  /** The one light room (docs/02 §2.1): salon background, ink type. */
  light?: boolean;
  /** Emerge from salon rather than begin at a hard edge — for a dark section under a light one. */
  fadeTop?: boolean;
  /** Per-car --scene-accent, used only inside that car's own sections. */
  accent?: string;
  as?: "section" | "div" | "header" | "footer" | "article";
  style?: CSSProperties;
  children: ReactNode;
  [dataAttr: `data-${string}`]: string | undefined;
}

export function Section({ id, className, fade = true, fadeTop, light, accent, as: Tag = "section", style, children, ...rest }: SectionProps) {
  const vars = accent ? ({ "--scene-accent": accent } as CSSProperties) : undefined;
  return (
    <Tag
      id={id}
      className={cn("relative overflow-hidden", fade && "fade-bottom", fadeTop && "fade-top-salon", light && "scene--light", className)}
      style={vars || style ? { ...vars, ...style } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
