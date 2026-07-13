/**
 * The eight Aurel services.
 *
 * Single source of truth for the Services page, the home services grid, and
 * the /services/[slug] detail routes.
 */
export type Service = {
  slug: string;
  index: string;
  name: string;
  /** One-line summary for compact grids. */
  summary: string;
  /** 2–3 sentence description for the Services page. */
  description: string;
  /** What an engagement includes. */
  includes: string[];
};

export const services: Service[] = [
  {
    slug: "websites",
    index: "01",
    name: "Custom websites",
    summary: "Fast, beautiful, conversion-focused sites.",
    description:
      "Fast, beautiful, conversion-focused websites that turn visitors into customers. Designed and engineered around your goals, built to load instantly and read effortlessly on every screen.",
    includes: ["Design", "Build", "CMS", "Performance", "Launch"],
  },
  {
    slug: "software",
    index: "02",
    name: "Custom software",
    summary: "Web and mobile apps built around how you work.",
    description:
      "Web and mobile applications built around how your business actually works — never forced into off-the-shelf templates. Scalable, secure, and entirely yours.",
    includes: ["Web apps", "Mobile apps", "APIs", "Integrations"],
  },
  {
    slug: "ai-automation",
    index: "03",
    name: "AI automation",
    summary: "Put repetitive work on autopilot.",
    description:
      "Put repetitive work on autopilot with AI that handles the busywork. From assistants to document processing, we automate the tasks that quietly drain your team.",
    includes: ["Workflow automation", "AI assistants", "Document & data processing"],
  },
  {
    slug: "strategy",
    index: "04",
    name: "Digital strategy",
    summary: "A clear roadmap for where technology takes you next.",
    description:
      "A clear, honest roadmap for where technology takes you next. We audit what you have, define where you're going, and select the right tools to get there.",
    includes: ["Audits", "Roadmaps", "Technology selection"],
  },
  {
    slug: "branding",
    index: "05",
    name: "Branding",
    summary: "Identity that makes you look as good as you are.",
    description:
      "Identity that makes you look as good as you already are. A cohesive brand system — from logo to guidelines — that earns trust the moment people see it.",
    includes: ["Logo", "Identity", "Design systems", "Guidelines"],
  },
  {
    slug: "seo",
    index: "06",
    name: "SEO",
    summary: "Get found by customers already searching for you.",
    description:
      "Get found by the customers already searching for what you offer. Technical foundations, content, and local search that compound quietly over time.",
    includes: ["Technical SEO", "Content", "Local search", "Analytics"],
  },
  {
    slug: "process",
    index: "07",
    name: "Process optimisation",
    summary: "Streamline operations so growth never means chaos.",
    description:
      "Streamline operations so growth never means chaos. We map how work flows, remove the friction, and connect your tools into one calm system.",
    includes: ["Workflow mapping", "Tooling", "Integrations"],
  },
  {
    slug: "immersive",
    index: "08",
    name: "Immersive experiences",
    summary: "Turn attention into memory.",
    description:
      "Turn attention into memory with experiences people don't forget. 3D, AR/VR, and interactive product configurators that set you firmly apart.",
    includes: ["3D", "AR/VR", "Interactive", "Product configurators"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
