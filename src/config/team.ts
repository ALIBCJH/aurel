/**
 * Who actually does the work.
 *
 * People buy from people, and the first thing a serious prospect does is search
 * the name of whoever they would be dealing with. An unnamed roster reads as
 * either a one-person operation inflating headcount or a team with something to
 * hide, so the people listed here are named.
 *
 * Only add an entry for a real person who has agreed to be listed. An empty
 * roster is honest; an invented one is discoverable.
 *
 * `photo`, `credentials`, `focus` and `links` are all optional in practice —
 * the About page renders each block only when it has something to put in it, so
 * a sparse entry looks deliberate rather than broken. A real photograph
 * outperforms every other asset on that page for trust, so it is worth chasing:
 * without one the page falls back to a monogram set in foil.
 */
export type Person = {
  name: string;
  role: string;
  /** Where they are, in plain terms. */
  location: string;
  /** Two or three sentences, in the company's voice. */
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
    name: "Marcus Mugo",
    role: "Chief Executive Officer",
    location: "Nyeri, Kenya",
    bio: "Marcus leads Mojah Investments. He works directly with clients on what their business needs from technology before any of it is bought or built, and he is the person accountable for the work being what was promised.",
    // Verbatim from Marcus, as published in the company's own material.
    quote:
      "This is your chance to partner with a company that will redefine your view and use of technology in your business.",
    // Blank on purpose. No photograph, qualifications or public profiles have
    // been supplied, and inventing any of them would put an unverifiable claim
    // on the page whose entire job is trust. Each block below is hidden while
    // it is empty and appears the moment it is filled — see app/about/page.tsx.
    //
    // TO FILL IN: `credentials` takes qualifications and prior posts, one
    // string each. `focus` takes the areas Marcus personally works in.
    // `photo` takes a file in `public/` plus alt text describing the person.
    // `links` takes a LinkedIn or profile URL as { label, href }.
    credentials: [],
    focus: [],
    links: [],
  },
];

/** Initials for the monogram fallback: "Marcus Mugo" → "MM". */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
