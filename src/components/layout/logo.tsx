import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/**
 * Brand lockup — an editorial serif wordmark with a single gold accent mark.
 * The gold square is the one recurring "premium accent" in the identity.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "block h-2.5 w-2.5 rotate-45 rounded-[3px] bg-accent",
          "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "group-hover:rotate-[135deg]",
        )}
      />
      <span className="font-display text-xl tracking-tight text-foreground">
        {siteConfig.name}
      </span>
    </Link>
  );
}
