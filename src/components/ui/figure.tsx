import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { NexoraImage } from "@/config/imagery";
import { cn } from "@/lib/utils";

/**
 * Renders a commissioned Nexora image, or a reserved slot where it will go.
 *
 * This is a server component and the existence check runs at build time, which
 * is the only reason the approach is affordable: no client bundle, no request,
 * no layout shift. When the asset lands the placeholder disappears on the next
 * build with no code change.
 *
 * Why a placeholder rather than a stand-in image: the brief said not to
 * generate replacement imagery, and a plausible-looking filler is worse than
 * an obvious gap — it stops anyone noticing the real asset never arrived. This
 * states the path and the brief on the page, so the gap is self-documenting to
 * whoever opens the site next.
 *
 * The mobile variant is handled with <picture>-style art direction via two
 * sources rather than by scaling one file, because the hero crops differently
 * on a handset: the desktop composition is 16:9 and loses its subject entirely
 * when squeezed into a phone viewport.
 */
/**
 * Whether a reserved asset has actually landed in `public/`.
 *
 * Exported so a caller can choose a *different element* when it has not,
 * rather than being forced to render the reserved slot. The services page uses
 * it that way: three of the six disciplines pointed at commissioned art that
 * was never delivered, so half that page shipped grey boxes with a file path
 * set in mono where a screenshot of real work should be. A reserved slot is
 * the right answer when there is nothing else to show; it is the wrong answer
 * when a real screenshot is sitting in the same config object.
 *
 * Build-time only — this reads the filesystem and must stay in a server
 * component.
 */
export function hasImageAsset(publicPath: string): boolean {
  return existsSync(path.join(process.cwd(), "public", publicPath));
}

export function Figure({
  image,
  priority = false,
  sizes = "100vw",
  className,
  imageClassName,
}: {
  image: NexoraImage;
  /** True only for the image above the fold. */
  priority?: boolean;
  sizes?: string;
  className?: string;
  imageClassName?: string;
}) {
  const publicDir = path.join(process.cwd(), "public");
  const hasDesktop = existsSync(path.join(publicDir, image.path));
  const hasMobile = image.mobilePath
    ? existsSync(path.join(publicDir, image.mobilePath))
    : false;

  if (!hasDesktop) {
    return (
      <PendingAsset image={image} className={className} hasMobile={hasMobile} />
    );
  }

  // Width/height are nominal: `aspect` is the contract, and the intrinsic size
  // only has to carry the correct ratio for Next to reserve the right box.
  const width = 1600;
  const height = Math.round(width / image.aspect);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-card)] border border-rule bg-paper-deep",
        className,
      )}
    >
      {hasMobile && image.mobilePath ? (
        <picture>
          <source media="(max-width: 767px)" srcSet={image.mobilePath} />
          <Image
            src={image.path}
            alt={image.alt}
            width={width}
            height={height}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes={sizes}
            className={cn("h-auto w-full", imageClassName)}
          />
        </picture>
      ) : (
        <Image
          src={image.path}
          alt={image.alt}
          width={width}
          height={height}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={sizes}
          className={cn("h-auto w-full", imageClassName)}
        />
      )}
    </div>
  );
}

/**
 * The reserved slot. Composed rather than apologetic — it holds the exact
 * space the asset will occupy, in the page's own materials, so the layout
 * around it can be judged before the asset exists.
 */
function PendingAsset({
  image,
  hasMobile,
  className,
}: {
  image: NexoraImage;
  hasMobile: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-card)] border border-rule bg-paper-deep",
        className,
      )}
      style={{ aspectRatio: String(image.aspect) }}
      role="img"
      aria-label={image.alt}
    >
      {/* The same measured grid used behind the opening — this reads as a
          drawing board waiting for a plate, not as a broken element. */}
      <div aria-hidden className="plate-grid absolute inset-0 opacity-40" />

      <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="text-label-sm text-foil">Image pending</span>
          <span
            aria-hidden
            className="h-2 w-2 shrink-0 rounded-full bg-foil/60"
          />
        </div>

        <div className="max-w-xl">
          <p className="font-mono text-[0.8125rem] leading-relaxed text-ink">
            {image.path}
          </p>
          {image.mobilePath && (
            <p className="font-mono text-[0.8125rem] leading-relaxed text-ink-mute">
              {image.mobilePath}
              {hasMobile ? "" : " (also pending)"}
            </p>
          )}
          <p className="mt-4 text-sm leading-[1.65] text-ink-soft">
            {image.brief}
          </p>
        </div>
      </div>

      {/* Corner ticks — the plate register marks used elsewhere on the site. */}
      <span aria-hidden className="absolute left-4 top-4 h-3 w-px bg-rule-strong" />
      <span aria-hidden className="absolute left-4 top-4 h-px w-3 bg-rule-strong" />
      <span aria-hidden className="absolute bottom-4 right-4 h-3 w-px bg-rule-strong" />
      <span aria-hidden className="absolute bottom-4 right-4 h-px w-3 bg-rule-strong" />
    </div>
  );
}
