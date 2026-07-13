/**
 * Service definitions.
 *
 * Drives the Services index, the dynamic `/services/[slug]` pages, and can be
 * reused anywhere a service list is needed. Slugs match the footer links.
 */
export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
};

export const services: Service[] = [
  {
    slug: "software",
    name: "Software Development",
    tagline: "Bespoke platforms, engineered to last.",
    description:
      "Custom software built for scale, reliability, and long-term maintainability — from architecture to production.",
  },
  {
    slug: "ai",
    name: "AI Solutions",
    tagline: "Intelligence, applied with intent.",
    description:
      "AI systems and agents that remove manual work, surface insight, and compound your team's output.",
  },
  {
    slug: "experiences",
    name: "Digital Experiences",
    tagline: "Interfaces that feel effortless.",
    description:
      "Fast, elegant, and memorable web experiences that make premium brands feel premium.",
  },
  {
    slug: "automation",
    name: "Automation",
    tagline: "Systems that run themselves.",
    description:
      "Workflow and process automation that connects your tools and eliminates repetitive work.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
