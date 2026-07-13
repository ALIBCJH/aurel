import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/utils";

/**
 * Container — horizontal layout constraint.
 *
 * Centers content and applies responsive gutters at three max-widths that map
 * to the `--container-*` design tokens. Polymorphic via `as`.
 */
const sizeClasses = {
  narrow: "max-w-narrow",
  default: "max-w-default",
  wide: "max-w-wide",
} as const;

type ContainerProps<T extends ElementType> = {
  as?: T;
  size?: keyof typeof sizeClasses;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "size" | "className">;

export function Container<T extends ElementType = "div">({
  as,
  size = "default",
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";
  return (
    <Component
      className={cn(
        "mx-auto w-full px-6 sm:px-8 lg:px-12",
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
