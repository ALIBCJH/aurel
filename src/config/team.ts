/**
 * Who actually does the work.
 *
 * The About page previously listed three unnamed roles — "Founder & Principal
 * Engineer", "Design Lead", "AI & Automation" — under a note promising names
 * "as the studio grows". For a business asking for six-figure KES engagements
 * that is the weakest possible trust signal: it reads as either a solo
 * operator inflating headcount, or a team with something to hide. People buy
 * from people, and the first thing a serious prospect does is search the
 * founder's name.
 *
 * Only add an entry here for a real person who has agreed to be listed. An
 * empty roster is honest; an invented one is discoverable.
 *
 * `photo` is optional. Without it the page falls back to a monogram, which
 * looks deliberate rather than unfinished — but a real photograph outperforms
 * every other asset on this page for trust, so it is worth chasing.
 */
export type Person = {
  name: string;
  role: string;
  /** Where they are, in plain terms. */
  location: string;
  /** Two or three sentences, in the studio's voice. */
  bio: string;
  /** Something they have actually said, if it is worth quoting. */
  quote?: string;
  /** Credential worth stating — degree, certification, prior post. */
  credentials: string[];
  /** What they actually work in. Specific beats broad. */
  focus: string[];
  photo?: { src: string; alt: string };
  links: Array<{ label: string; href: string }>;
};

export const team: Person[] = [
  {
    name: "Simon Juma",
    role: "Founder · Engineer",
    location: "Nyeri & Nairobi, Kenya",
    bio: "Simon started Aurel and builds most of the work himself. He handles every part of a project — the servers, the systems behind the scenes, and the screens you actually see. His main focus is AI tools that hold up in daily use, not just in a demo.",
    quote:
      "Build systems that hold up for people who can't afford for them to fail.",
    credentials: [
      "BSc Information Technology, Dedan Kimathi University of Technology",
      "Founder & technical lead, R&J Interiors",
      "Previously engineering at Britam Insurance and Datani Insurance",
    ],
    focus: [
      "TypeScript",
      "Next.js",
      "React Native",
      "Node.js",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "AWS",
      "Terraform",
      "Docker",
      "AI assistants",
      "Automation",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/ALIBCJH" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/simonjuma" },
      { label: "Personal site", href: "https://simonjuma.me" },
    ],
  },
];

/** Initials for the monogram fallback: "Simon Juma" → "SJ". */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
