import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { WhatsAppGlyph } from "./Icon";

export type ButtonVariant = "primary" | "secondary" | "glass" | "text" | "whatsapp";

interface BaseProps {
  variant?: ButtonVariant;
  /** Show the arrow-up-right glyph. Defaults to true for primary and text links. */
  icon?: boolean;
  /** "sm" is the 40 px pill used inside the 56 px nav. */
  size?: "md" | "sm";
  block?: boolean;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}

interface LinkProps extends BaseProps {
  href: string;
  type?: never;
  disabled?: never;
}

interface NativeProps extends BaseProps {
  href?: undefined;
  type?: "button" | "submit";
  disabled?: boolean;
}

export type ButtonProps = LinkProps | NativeProps;

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/** docs/02 §3.2: primary · secondary · glass · text link · WhatsApp. Arrow-up-right is the only arrow. */
export function Button(props: ButtonProps) {
  const { variant = "primary", icon, size = "md", block, className, children, ariaLabel } = props;
  const showArrow = icon ?? (variant === "primary" || variant === "text");
  const classes = cn(
    "btn",
    `btn--${variant === "whatsapp" ? "secondary" : variant}`,
    variant === "glass" && "glass",
    size === "sm" && "btn--sm",
    block && "btn--block",
    className,
  );
  const content = (
    <>
      {variant === "whatsapp" && <WhatsAppGlyph className="btn__glyph" />}
      <span>{children}</span>
      {showArrow && <ArrowUpRight className="btn__icon" size={18} strokeWidth={1.25} absoluteStrokeWidth aria-hidden="true" />}
    </>
  );

  if (props.href !== undefined) {
    if (isExternal(props.href)) {
      return (
        <a href={props.href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel}>
          {content}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} disabled={props.disabled} className={classes} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
