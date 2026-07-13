/**
 * Central site configuration.
 *
 * Navigation, footer, and social data live here so every current and future
 * page renders from a single source of truth. Add a page? Add a link here.
 */

export type NavItem = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: NavItem[];
};

export type SocialLink = {
  label: string;
  href: string;
  icon: "linkedin" | "github" | "x";
};

export const siteConfig = {
  name: "Aurel",
  /** Short descriptor used in the logo lockup and metadata. */
  tagline: "Digital Transformation Studio",
  description:
    "Aurel is a digital transformation studio building custom software, AI automation, and modern web experiences for ambitious businesses.",
  url: "https://aurel.studio",
} as const;

/** Primary navigation — shared by desktop nav and the mobile menu. */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Primary call-to-action, reused across navbar and page sections. */
export const primaryCta: NavItem = {
  label: "Start a Project",
  href: "/contact",
};

/** Footer link columns. */
export const footerColumns: FooterColumn[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Work", href: "/work" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Software Development", href: "/services/software" },
      { label: "AI Solutions", href: "/services/ai" },
      { label: "Digital Experiences", href: "/services/experiences" },
      { label: "Automation", href: "/services/automation" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "GitHub", href: "https://github.com", icon: "github" },
  { label: "Twitter / X", href: "https://x.com", icon: "x" },
];

/** Small print links in the footer's bottom bar. */
export const legalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];
