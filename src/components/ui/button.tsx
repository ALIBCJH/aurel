import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  buttonVariants,
  type ButtonSize,
  type ButtonVariant,
} from "./button-variants";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

/**
 * Polymorphic Button.
 *
 * - No `href`            → renders a <button>.
 * - Internal `href`      → renders a Next.js <Link>.
 * - External `href`      → renders an <a> (opens in a new tab).
 *
 * All interaction feedback (hover lift + shadow, active press) is CSS-driven
 * via `buttonVariants`, so it is identical across every element type and needs
 * no client boundary — this component stays a server component. Larger,
 * orchestrated motion lives in the Framer Motion components (navbar, menu,
 * footer, Reveal).
 */
type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { href, external, variant, size, className, children, ...rest } =
      props as ButtonAsLink;
    const classes = buttonVariants({ variant, size, className });

    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          {...rest}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant, size, className, children, ...rest } =
    props as ButtonAsButton;
  const classes = buttonVariants({ variant, size, className });

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
