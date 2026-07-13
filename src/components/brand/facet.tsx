import { cn } from "@/lib/utils";

/**
 * Diamond — small gold facet glyph used as a section/list marker.
 */
export function Diamond({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block h-1.5 w-1.5 rotate-45 bg-accent", className)}
    />
  );
}

/**
 * FacetedDivider — a hairline section divider with a small gold facet at its
 * centre, replacing a plain rule with the brand's gem motif.
 */
export function FacetedDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("flex items-center", className)}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
      <span className="mx-4 h-2 w-2 rotate-45 border border-accent/60" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
    </div>
  );
}
