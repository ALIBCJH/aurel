/**
 * Selected work.
 *
 * Single source of truth for /work, /work/[slug], and the proof block on
 * service pages.
 *
 * A NOTE ON HONESTY, because it governs what may be written here.
 *
 * `relationship` states plainly what our involvement was on each project. R&J
 * Interiors is a venture Simon founded and builds for rather than a client
 * engagement, and simonjuma.me says so publicly — writing round it would be
 * trivially disprovable by anyone who searches his name before signing a
 * contract, which is exactly what people do. Stated accurately it is a stronger
 * entry anyway: a whole product business built end to end.
 *
 * `metrics` and `quote` are optional and MUST stay empty until the numbers are
 * measured and the client has actually said the words. The detail in these
 * entries comes from what the live sites verifiably do — insurer names, fabric
 * counts, form fields, price ranges. None of it is estimated, and no outcome is
 * claimed that cannot be pointed at. Inventing a conversion lift to make a page
 * feel more convincing would put a fabricated claim in front of prospects and
 * destroy the credibility this page exists to build.
 */

export type CaseMetric = {
  label: string;
  value: string;
};

export type Case = {
  slug: string;
  /** Display name of the business. */
  client: string;
  /** Live URL, if the work is public. */
  url?: string;
  sector: string;
  location: string;
  year: string;
  /** Plain statement of our involvement. Never omitted, never softened. */
  relationship: string;
  /** Which disciplines this drew on — slugs from services.ts. */
  services: string[];
  /** Headline for the index card and the detail hero. */
  headline: string;
  /** One-line summary for compact listings. */
  summary: string;
  /** Search-facing meta description. */
  metaDescription: string;
  /** The business problem, not the brief. */
  challenge: string;
  /** What was built, and the decisions that shaped it. */
  approach: Array<{ title: string; body: string }>;
  /** What exists now as a result. */
  outcome: string;
  /** Verifiable specifics — what the thing demonstrably does. */
  facts: Array<{ label: string; value: string }>;
  /**
   * Hard numbers. Empty until measured — see the note above.
   * Never populate from an estimate.
   */
  metrics: CaseMetric[];
  /** Verbatim, attributed, and only once actually given. */
  quote?: { text: string; author: string; role: string };
  stack: string[];
  /** The lead shot — hero, index card, social card. */
  image: { src: string; alt: string };
  /** A phone-width capture of the same product, if one exists. */
  mobileImage?: { src: string; alt: string };
  /**
   * Further real screens. Every one of these is a capture of the live product,
   * never a mockup or a stock substitute — the whole argument of this page is
   * that the work exists.
   */
  gallery: Array<{ src: string; alt: string; caption: string }>;
};

export const cases: Case[] = [
  {
    slug: "rj-interiors",
    client: "R&J Interiors",
    url: "https://www.rjinteriors.studio/",
    sector: "Interior design & custom textiles",
    location: "Nyeri, Kenya",
    year: "2025",
    relationship:
      "Our own venture. Simon is founder and technical lead — R&J Interiors was designed, engineered, and is operated by us end to end.",
    services: ["websites", "ai-automation"],
    headline: "A showroom you can walk through before anything is cut.",
    summary:
      "A real-time 3D showroom that lets a customer stand in a furnished room and change the curtains.",
    metaDescription:
      "How we built R&J Interiors a real-time 3D showroom — walk a full-scale room, switch 14 colours across 4 fabrics, and see them in simulated local daylight before ordering.",
    challenge:
      "Custom curtains are sold from a swatch. A customer holds a ten-centimetre square of fabric under shop lighting and is asked to picture it across a three-metre window, in their own light, at home. So they guess — and often guess wrong. By then the fabric is cut, the money is spent, and nobody is happy. For a maker, every wrong guess is a remake absorbed at cost or a customer who does not come back. Worse, the uncertainty suppresses the order before it is ever placed: people postpone a decision they cannot picture.",
    approach: [
      {
        title: "A room to stand in, not a product to rotate",
        body: "The obvious build is a product page with a 3D model you spin. We rejected it. Curtains are not an object you examine — they are a surface you live beside, and their whole character comes from the room around them. So we built the room: an exterior approach, a sitting room, and a bedroom, at full architectural scale, navigated on foot rather than orbited.",
      },
      {
        title: "Calibrated to the person looking",
        body: "Before entering, the viewer sets their height. The scene then renders from where they will actually stand. It sounds like a trivial detail and it is the one that decides whether the illusion holds — a room viewed from the wrong eye level reads as a doll's house, and every judgement made inside it is untrustworthy.",
      },
      {
        title: "Materials that behave like fabric",
        body: "Fourteen colours across four fabric types, updating live in every room at once. Each fabric carries its own drape and weight rather than being the same geometry recoloured, so a heavy blackout hangs like a blackout and a sheer moves like a sheer. Getting this wrong is what makes most product visualisers feel like a catalogue.",
      },
      {
        title: "Light is the whole argument",
        body: "A fabric that looks right under neutral studio lighting can look completely wrong at four in the afternoon, and that gap is exactly where customer regret lives. The renderer simulates local daylight — the angle it enters at, its warmth, and the way it passes through a sheer instead of stopping at it — using HDRI environment mapping so light behaves rather than being painted on.",
      },
      {
        title: "Commerce on the end of it",
        body: "Configure, receive a same-day quote, order, and track it. Delivery and installation are included, so the promise the showroom makes is the one the customer actually receives — which is the point of building it this carefully.",
      },
    ],
    outcome:
      "R&J sells from a picture of the actual outcome rather than a description of one. A customer configures curtains in a room lit the way their room will be lit, and orders having already seen the result. The catalogue prices in Kenyan shillings and the entire path from first look to placed order runs in the browser, with no showroom visit required.",
    facts: [
      { label: "Rooms modelled", value: "Three, full scale" },
      { label: "Fabric options", value: "14 colours · 4 fabrics" },
      { label: "Catalogue range", value: "KES 8,000 – 11,500" },
      { label: "Lighting", value: "Simulated local daylight, HDRI" },
    ],
    metrics: [],
    stack: [
      "Next.js",
      "TypeScript",
      "Real-time 3D",
      "HDRI lighting",
      "Physically-based materials",
      "Tailwind CSS",
    ],
    image: {
      src: "/work/rj-home.webp",
      alt: "The R&J Interiors homepage: a furnished sitting room with a live fabric selector offering sheer, blackout, and linen options.",
    },
    mobileImage: {
      src: "/work/rj-catalog-phone.webp",
      alt: "The R&J catalogue on a phone: custom-knit curtain panels, each with its own price and lead time.",
    },
    gallery: [
      {
        src: "/work/rj-studio.webp",
        alt: "The live R&J configurator: a curtained window previewing in real time, with tabs for fabric, window and walls, colour swatches, and a Pay to Book button.",
        caption: "The configurator — change fabric, window or wall and the room updates as you watch",
      },
      {
        // Second in the list on purpose: the opening spread takes the lead
        // shot plus the first two gallery entries, and a calendar carrying
        // real availability is the strongest thing on this site after the
        // configurator itself.
        src: "/work/rj-booking.webp",
        alt: "The R&J booking flow: choose a date, pick a time, leave your details — over a live calendar where the bookable dates are marked and some are already down to a few slots.",
        caption: "Booking in three steps, over a calendar showing what is actually still free",
      },
      {
        src: "/work/rj-catalog.webp",
        alt: "The R&J catalogue, headed 'Curtains & Fabrics', with every panel custom-knit to order and consultation, production, delivery and installation included.",
        caption: "The catalogue — every panel custom-knit, with fitting included in the price",
      },
      {
        src: "/work/rj-founding.webp",
        alt: "The R&J founding customers page: 'Reserve your place. Be among the first.' with a form to join the launch list.",
        caption: "The launch list — reserving a place before booking opens",
      },
      {
        src: "/work/rj-track.webp",
        alt: "The R&J order tracking page: enter an order number and the phone number used at checkout.",
        caption: "Order tracking — an order number and the phone used to pay",
      },
      {
        src: "/work/rj-experience.webp",
        alt: "The R&J experience page, headed 'Step Inside' — a room a customer can walk through before a single curtain is made.",
        caption: "Step Inside — the room walked through before anything is cut",
      },
    ],
  },

  {
    slug: "datani-insurance",
    client: "Datani Insurance Agency",
    url: "https://datani.co.ke",
    sector: "Insurance brokerage",
    location: "Nyeri, Kenya",
    year: "2024",
    relationship:
      "Commissioned by the agency and delivered as a contracted engagement. The site is live and in production.",
    services: ["websites", "seo"],
    headline: "Making a good broker easy to find online.",
    summary:
      "A product-by-product site and quote path for an agency that ran entirely on referral.",
    metaDescription:
      "How we built Datani Insurance Agency a searchable, product-by-product website with a short quote form and WhatsApp contact — turning referral-led business into something findable.",
    challenge:
      "Datani places cover with eight of Kenya's major insurers for farmers, families, and small businesses. That breadth is the entire argument for using a broker instead of going direct — and none of it was visible anywhere. The agency ran on reputation and referral, which works right up until you want to grow past the people who already know your name. Someone in Nyeri comparing motor cover had no way to find them, and no way to learn what they could actually offer.",
    approach: [
      {
        title: "One page per product, because that is how people search",
        body: "Nobody searches for 'insurance services'. They search for motor cover, or medical cover, or goods in transit. We split the offering into its own pages — motor, medical, property, marine and goods in transit, liability, life, pension, and investment — so each has a page that can rank and answer, instead of being one line in an undifferentiated list.",
      },
      {
        title: "A quote form short enough to finish",
        body: "Insurance forms fail by asking underwriting questions before any relationship exists. This one asks for a name, a phone number, and the type of cover, and promises an agent's call within one business day. Email is optional, because in this market a phone number is the contact detail that matters — insisting on an email address costs real enquiries.",
      },
      {
        title: "WhatsApp as a real channel",
        body: "WhatsApp is wired in at the top of the page, not tucked into the footer as an icon. It is how customers here actually open a conversation, and treating it as a primary channel rather than a courtesy changes how many of them start one.",
      },
      {
        title: "The insurer panel as the credibility argument",
        body: "Jubilee, Britam, CIC, Old Mutual, Madison, Canon, Geminia, and Heritage are shown prominently. For a broker this is the whole case — it is the reason to call them rather than an insurer directly — and it had been buried.",
      },
      {
        title: "Answers to the questions asked before buying",
        body: "Claims guidance, FAQs, and an insurance blog were added to handle the things people ask in the days before they commit, and to give the site something to be found for beyond its own name.",
      },
    ],
    outcome:
      "Datani has a searchable presence with a page for every product it places, a quote path short enough that people finish it, WhatsApp contact as a first-class route in, and a claims and FAQ section that answers questions which previously arrived one phone call at a time.",
    facts: [
      { label: "Insurers represented", value: "Eight" },
      { label: "Product pages", value: "Eight lines of cover" },
      { label: "Quote form", value: "Three required fields" },
      { label: "Response promise", value: "Agent call within one business day" },
    ],
    metrics: [],
    stack: [
      "Web build",
      "Quote capture",
      "WhatsApp integration",
      "Search setup",
      "Structured content",
    ],
    image: {
      src: "/work/datani-products.webp",
      alt: "The Datani products page: cover for personal, family, life and business, each product its own page, with a free quote call to action.",
    },
    mobileImage: {
      src: "/work/datani-home-phone.webp",
      alt: "The Datani homepage on a phone, with the phone number, WhatsApp and a quote button reachable without scrolling.",
    },
    gallery: [
      {
        src: "/work/datani-quote.webp",
        alt: "The Datani quote page: 'Get a free quote', asking for a little about you and promising options in plain language with no pressure.",
        caption: "The quote path — a short form, then a person calls back",
      },
      {
        src: "/work/datani-claims.webp",
        alt: "The Datani claims page, 'How Claims Work', set out as three numbered steps: notify us, submit documents, review and compensation.",
        caption: "Claims explained as three steps, in the order they actually happen",
      },
      {
        src: "/work/datani-faqs.webp",
        alt: "The Datani FAQ page answering settlement times, required documents, excess and co-payments, and whether a police abstract is needed.",
        caption: "The questions people actually ask, answered on the page",
      },
      {
        src: "/work/datani-testimonial.webp",
        alt: "The Datani testimonials page, 'What our clients say', with accounts from farms, family health cover and small shops.",
        caption: "Clients in their own words — farms, family health, small shops",
      },
      {
        src: "/work/datani-article.webp",
        alt: "A published Datani article, 'Digital Disruption: How Technology Is Changing Insurance in Kenya', dated and timed to read, with the rest of the series listed beside it.",
        caption: "The writing that keeps earning searches, months after it went up",
      },
      {
        src: "/work/datani-motor.webp",
        alt: "Datani's motor insurance page — one page per product, written around what people search for: private cars, matatus, lorries and fleets.",
        caption: "One page per product, each written around what people actually search",
      },
    ],
  },
];

export function getCase(slug: string): Case | undefined {
  return cases.find((entry) => entry.slug === slug);
}

/** Cases that drew on a given discipline — powers the proof block on service pages. */
export function casesForService(serviceSlug: string): Case[] {
  return cases.filter((entry) => entry.services.includes(serviceSlug));
}
