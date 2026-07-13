import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Surface card primitive.
 *
 * `interactive` adds a calm hover state (border warms toward gold, subtle lift)
 * for cards that act as links. Compose with the exported sub-parts for
 * consistent internal rhythm.
 */
type CardProps = ComponentPropsWithoutRef<"div"> & {
  interactive?: boolean;
};

export function Card({ className, interactive, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface p-6 sm:p-8",
        "transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
        interactive &&
          "hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg hover:shadow-black/5",
        className,
      )}
      {...props}
    />
  );
}

export function CardEyebrow({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("text-eyebrow text-accent", className)}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className={cn("text-xl sm:text-2xl text-foreground", className)}
      {...props}
    />
  );
}

export function CardBody({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("text-sm leading-relaxed text-muted", className)}
      {...props}
    />
  );
}
