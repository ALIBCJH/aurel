/**
 * The six Nexora services.
 *
 * Single source of truth for the Services page, the home index, the
 * /services/[slug] detail routes, and the Service/FAQPage structured data.
 *
 * This was eight disciplines. Eight produced eight ~150-word pages that neither
 * sold nor ranked, and stretched a young studio's credibility across claims it
 * could not prove. The four that remain are the ones actually sold; branding
 * now lives inside Websites, process optimisation inside AI, and strategy is a
 * discovery phase in every engagement rather than a product of its own.
 *
 * Copy rules, so this file stays coherent as it grows:
 *  - Plain words. Write for a business owner comparing three quotes, not for
 *    another engineer. If a term would need explaining across a desk, it does
 *    not belong here — "RAG", "CMS", "API", "on-page", "agentic" and "deploy
 *    narrow" all lived in this file and all told the reader nothing.
 *  - Short sentences. No idioms, no metaphors: "earns its keep" and "survives a
 *    real network" are good English and bad signage.
 *  - `headline` is the page's H1 and its first job is to be findable. It should
 *    contain the words somebody would actually type into Google — "website
 *    design in Kenya", not "a website that earns its keep".
 *  - Nothing claims a result we cannot point at real work for.
 *  - The local angle is a genuine engineering constraint, not a marketing nod.
 */

import type { ImageryKey } from "@/config/imagery";

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type Service = {
  slug: string;
  index: string;
  name: string;
  /** Outcome-led H1 for the detail page. */
  headline: string;
  /**
   * The <title> for the detail page — kept separate from `headline` because
   * the two have different jobs. The H1 talks to a reader who has already
   * arrived; this talks to somebody scanning a page of Google results, where
   * roughly 60 characters survive before truncation and the useful words have
   * to come first. These pages used to title themselves `service.name`, so the
   * strongest search page on the site announced itself as "Websites".
   */
  seoTitle: string;
  /** One-line summary for compact grids and the home index. */
  summary: string;
  /** Search-facing meta description, ~150–160 chars. */
  metaDescription: string;
  /** Opening paragraph — 2–3 sentences. */
  description: string;
  /** Who this is for and what is broken today. */
  problem: string;
  /** The concrete things we actually build. */
  deliverables: Array<{ title: string; body: string }>;
  /** Short labels — what an engagement includes. */
  includes: string[];
  /** The constraint that makes building for this market different. */
  localAngle: { title: string; body: string };
  /** How an engagement runs, specific to this discipline. */
  process: Array<{ step: string; title: string; body: string }>;
  /**
   * Indicative commercials. Ranges, never a fixed quote.
   *
   * `from` must stay a human-readable string with the currency in it, because
   * it is rendered directly and `parsePriceFloor` in `json-ld.tsx` strips the
   * non-digits back out for schema.org. Keeping one source means the figure a
   * visitor reads and the figure Google reads cannot drift apart.
   *
   * `tiers` is optional and exists for disciplines where the honest answer is
   * a small number of shapes at different prices rather than a single floor.
   * Where it is present the first tier's price and `from` must agree — they
   * are rendered within a few centimetres of each other.
   */
  pricing: {
    from: string;
    note: string;
    tiers?: Array<{
      /** What you get, in plain words. Not a package name. */
      name: string;
      price: string;
      body: string;
    }>;
  };
  /** Real objections. Rendered visibly on the page and mirrored into FAQPage schema. */
  faqs: ServiceFaq[];
  /**
   * A commissioned Nexora image for this discipline, where one exists.
   *
   * Four services carry commissioned art; the rest carry a real screen from
   * shipped work. That split is deliberate rather than a gap: the flagship
   * disciplines are sold on what they *are*, and the others are sold on what
   * we have already done. When this is set it wins over `showcase`.
   */
  heroImage?: ImageryKey;
  /**
   * A real screen from shipped work that illustrates this discipline.
   * Always a capture of something we actually built — never a stock image or
   * an abstract stand-in, because the entire argument of the services page is
   * that these are things we have done rather than things we offer.
   */
  showcase: {
    src: string;
    alt: string;
    /**
     * True for the phone captures, which are 780×1688 against the landscape
     * captures' 1440×900. Without the flag a shared plate crops a phone screen
     * to a horizontal strip through its middle, which shows nothing. Set here
     * rather than sniffed from the filename so a future rename cannot silently
     * break the layout.
     */
    portrait?: boolean;
  };
};

export const services: Service[] = [
  {
    slug: "websites",
    heroImage: "hero",
    index: "01",
    name: "Website Development",
    seoTitle: "Website Design & Development in Kenya",
    headline: "Websites that make your business impossible to ignore",
    summary: "Websites that open fast and bring you enquiries.",
    metaDescription:
      "Website design and development in Kenya. We build fast, mobile-friendly websites that bring in enquiries, take M-Pesa payments, and that you can update yourself.",
    description:
      "Many business websites just sit there. We build the other kind: a site that opens quickly on a phone, says what you do in the first few seconds, and makes it clear what to do next.",
    problem:
      "You have a website and it brings you nothing. It was built once, by someone you can no longer reach, on a system you cannot edit. It takes eight seconds to open on a phone, which is how nearly everyone will see it. It describes your work in words nobody types into Google. Meanwhile a competitor with a faster site is getting the calls that should be coming to you.",
    deliverables: [
      {
        title: "Built around one clear action",
        body: "Every page has one job: get the visitor to call, book, or buy. We agree what that action is before we design anything, then remove whatever gets in its way. Most sites fail because they try to say everything to everyone.",
      },
      {
        title: "It opens fast on a phone",
        body: "We build for an ordinary Android phone on a busy network, because that is what your customers are using. That means light pages, properly sized images, and none of the extra add-ons that slow a site down for no real benefit.",
      },
      {
        title: "A look that matches your business",
        body: "Logo, colours and fonts, plus simple rules for using them — enough that your website, your quotation and your WhatsApp profile all look like the same company.",
      },
      {
        title: "You can change it yourself",
        body: "A simple editing tool you can actually use, so changing a price or adding a product does not mean paying someone. We hand over the logins and show you how it works.",
      },
      {
        title: "Payments and enquiries that reach you",
        body: "M-Pesa payments where you sell, and contact forms that land in an inbox you check and alert you when they do — not a contact page that has quietly been failing for a year.",
      },
    ],
    includes: [
      "Understanding your business",
      "Design",
      "Building the site",
      "You can edit it yourself",
      "M-Pesa payments",
      "Google setup and tracking",
    ],
    localAngle: {
      title: "Built for how Kenya browses",
      body: "About nine in ten Kenyan visitors arrive on a phone, usually on bundles, where every megabyte costs them something. A heavy site does not just open slowly here — it spends the visitor's money to open, so they leave. We keep every page light, send images at the size they are actually shown, and put your words on screen before anything else has to load. It is the same reason this site opens the way it does.",
    },
    process: [
      {
        step: "01",
        title: "We learn your business",
        body: "We sit down and go through what you do, who buys from you, and the one action the site is there to produce. It takes half a day and it shapes everything after it.",
      },
      {
        step: "02",
        title: "Words and layout",
        body: "We agree the pages and write the words first, then design. Designing before the words exist is how sites end up looking good and saying nothing.",
      },
      {
        step: "03",
        title: "Design",
        body: "Full design of every key page, on desktop and phone, before a line of production code is written.",
      },
      {
        step: "04",
        title: "Build and go live",
        body: "We build it, load your content, set it up for Google, and hand it over with a walkthrough — so you never have to call us to change a price.",
      },
    ],
    pricing: {
      from: "KES 30,000",
      note: "Three shapes, priced up front. Most businesses start in the middle. What moves the number is page count, whether you need to take money on the site, and how much of the writing we do.",
      tiers: [
        {
          name: "One page, one action",
          price: "KES 30,000",
          body: "A single page that loads fast on a phone and points at one thing — call, WhatsApp, or send an enquiry. Right for a business whose customers already know what it does and just need to reach it.",
        },
        {
          name: "A full site you can edit",
          price: "KES 50,000",
          body: "Several pages, a page per thing you sell, and an editing tool you control so changing a price never means calling us. Set up for Google and handed over with a walkthrough.",
        },
        {
          name: "A site that takes payments",
          price: "KES 100,000",
          body: "Everything above, plus M-Pesa and card payments, a catalogue with stock and lead times, and order confirmations that reach both you and the customer.",
        },
      ],
    },
    faqs: [
      {
        question: "How long does a website take?",
        answer:
          "Four to eight weeks for most business sites. The build is rarely the slow part — waiting on content, photography, and approvals is. We tell you exactly what we need from you and when, at the start.",
      },
      {
        question: "Can I update it myself afterwards?",
        answer:
          "Yes. Every site ships with a content management system you control and a walkthrough of how to use it. Changing text, prices, images, or adding a page should never require calling us.",
      },
      {
        question: "Do you use WordPress?",
        answer:
          "Only when it is genuinely the right tool. Most of our sites are built on modern frameworks that are faster and materially harder to break into, because a large share of WordPress sites are compromised through outdated plugins rather than anything exotic. If you already have a WordPress site you are happy with, we will say so rather than sell you a rebuild.",
      },
      {
        question: "Can you integrate M-Pesa?",
        answer:
          "Yes. Your customer gets the familiar M-Pesa prompt on their phone and pays without leaving your site. We also handle the awkward cases that really happen: the customer who cancels on their handset, the payment recorded twice, and the one confirmed several minutes late.",
      },
      {
        question: "What happens if something breaks after launch?",
        answer:
          "You have a 30-day warranty on anything that is our defect, fixed at no charge. After that most clients take a small monthly retainer for updates, monitoring, and backups. Neither is compulsory and you keep the code either way.",
      },
      {
        question: "Do I own the website?",
        answer:
          "Completely. Code, content, domain, and hosting accounts are all in your name. We do not hold client work hostage as a retention strategy.",
      },
    ],
    showcase: {
      src: "/work/datani-home.webp",
      alt: "The Datani Insurance homepage we built, headed 'Insurance that puts you first', with the phone number, WhatsApp and a quote button all in reach.",
    },
  },

  {
    slug: "mobile-apps",
    heroImage: "mobileApps",
    index: "02",
    name: "Mobile Applications",
    seoTitle: "Mobile App Development in Kenya",
    headline: "Mobile apps built around your users",
    summary: "Android and iPhone apps built around how you actually work.",
    metaDescription:
      "Mobile app development in Kenya. Android and iPhone apps built for everyday phones, weak network, working offline, and M-Pesa — shaped around how your business actually runs.",
    description:
      "An app your team and your customers carry in their pocket, built around how your business really runs instead of squeezed into ready-made software. Made for the phones and the network your people actually have.",
    problem:
      "Your business runs on WhatsApp messages, a shared spreadsheet and somebody's memory. It works until it does not — an order is missed, a payment is never recorded, a team in the field sends yesterday's numbers tomorrow. Ready-made software almost fits, and the gap between almost and properly is where the mistakes happen. You end up paying every month for something you still have to work around.",
    deliverables: [
      {
        title: "It works without network",
        body: "A team out in the field should keep working when the network drops, not stop. The app keeps its own copy of the information, carries on, and updates everything once the connection returns — including a clear rule for what happens when two people changed the same thing.",
      },
      {
        title: "Built for the phones people actually own",
        body: "We test on ordinary, affordable Android phones, not only the newest ones. That decides how big the app is and how hard it makes the phone work — the difference between an app that feels quick and one that gets deleted.",
      },
      {
        title: "M-Pesa built in",
        body: "M-Pesa done properly: paying in, paying out, and the pop-up prompt on the customer's phone. It still adds up correctly when a payment arrives late or is recorded twice, which happens more often than people expect.",
      },
      {
        title: "The system behind it",
        body: "The app is only the part people see. Behind it sits the records, the dashboard your team works from, and the reports that tell you what happened. We build all of that too.",
      },
    ],
    includes: [
      "Agreeing what it should do",
      "Design and screens",
      "Android and iPhone apps",
      "The system behind it",
      "A dashboard for your team",
      "Getting it on Play Store and App Store",
    ],
    localAngle: {
      title: "We build for the network people really have",
      body: "Most app advice assumes constant network and a new iPhone. Neither is true for a delivery rider in Kiambu or a field officer in Nyeri. We take patchy network, costly data and a three-year-old Android phone as the normal case the app has to be good on. And where an app is the wrong answer, we will say so — sometimes a simple *384# style menu, or a good mobile site, reaches more of your customers for less money.",
    },
    process: [
      {
        step: "01",
        title: "Agree what it does",
        body: "We map out the work the app is replacing and cut the first version down to what really matters. The biggest risk in app projects is spending a year building things nobody asked for.",
      },
      {
        step: "02",
        title: "Design and a working sample",
        body: "We give you a tappable sample you can hand to the people who will use it every day, before we start building. What they say changes the plan — and at this stage, changing it is cheap.",
      },
      {
        step: "03",
        title: "Build",
        body: "We work in two-week rounds, and at the end of each one you get a version you can install on your own phone. You watch it take shape instead of waiting months to be shown something.",
      },
      {
        step: "04",
        title: "Launch, then improve",
        body: "We put it on Play Store and App Store, keep an eye on it, and make a first round of changes based on how people actually use it.",
      },
    ],
    pricing: {
      from: "KES 80,000",
      note: "A focused first release starts at KES 80,000, on one platform. What moves the number is the number of screens, whether it has to work offline, and what it has to connect to. We will usually recommend launching on Android first and adding iPhone once people are using it.",
    },
    faqs: [
      {
        question: "Do I need both Android and iOS?",
        answer:
          "Usually not at first. Almost everyone in Kenya is on Android, so starting there and adding iPhone once the app has proved itself is normally the better use of your money. We build it in a way that shares most of the work between the two, so adding iPhone later is a small extra job rather than a second project.",
      },
      {
        question: "Should I build an app at all?",
        answer:
          "Often no. If your customers use you occasionally, asking them to install and keep an app is a large favour to request — a fast mobile site or a WhatsApp flow will reach more of them. Apps earn their place with repeat use, offline needs, or device features like camera and GPS. We would rather talk you out of one than build something that gets deleted.",
      },
      {
        question: "How much does it cost to keep running?",
        answer:
          "Budget for hosting, the Apple and Google developer accounts, and periodic maintenance as operating systems change. For a typical business app the running cost is modest, and we set it out before you commit so it is never a surprise.",
      },
      {
        question: "Who owns the code and the store listings?",
        answer:
          "You do. The code, the Play Store and App Store accounts, and the servers are all in your name, and we hand over full access at launch.",
      },
      {
        question: "Can it work with our existing systems?",
        answer:
          "Usually yes. We connect to accounting packages, stock systems, payment providers and your own records. Where a system has no proper way to connect, we will tell you plainly what is and is not possible instead of promising a link that will keep breaking.",
      },
    ],
    showcase: {
      src: "/work/rj-studio-phone.webp",
      alt: "The R&J configurator on a phone: a live room preview above, fabric, window and wall tabs below, and Pay to Book within thumb reach.",
      portrait: true,
    },
  },

  {
    slug: "seo",
    heroImage: "seo",
    index: "03",
    name: "SEO & Digital Visibility",
    seoTitle: "SEO Services in Kenya",
    headline: "Get found by the people looking for you",
    summary: "Get found by the customers already looking for you.",
    metaDescription:
      "SEO services in Kenya. We fix your website, set up your Google Business Profile, and get you showing up in local searches — measured on the enquiries you receive, not on rankings.",
    description:
      "Somebody typed what you sell into Google this morning, in your town, ready to buy. They found a competitor instead. Search is the one place customers arrive already wanting what you have — and unlike adverts, the position you build keeps working after you stop paying.",
    problem:
      "You depend on referrals and a Facebook page. It has brought you this far, but every month starts from zero and it cannot grow much further. Somewhere a competitor with a weaker product has a Google Business Profile with forty reviews and a website that opens in a second, and they are taking the customers who searched instead of asking a friend. The difference is not skill or money. It is that nobody has done the boring groundwork.",
    deliverables: [
      {
        title: "Fixing the basics on your site",
        body: "Everything that decides whether Google can read, understand and trust your site: how fast it opens on a phone, whether Google can reach every page, and whether the pages describe themselves properly. Nothing else works until this does.",
      },
      {
        title: "Your Google Business Profile",
        body: "This is the listing that shows on the map when somebody searches near you, and for a business serving a town or county it is the most valuable thing you own online. Most are never even claimed. We set yours up properly: right categories, full details, the same name, address and phone everywhere online, real photographs, and a simple way to keep collecting reviews.",
      },
      {
        title: "Pages that answer what people ask",
        body: "We find out what your customers actually type into Google — which is rarely the words you use inside the business — and build pages that answer those questions properly. One thorough page beats ten thin ones, every time.",
      },
      {
        title: "Writing that keeps working",
        body: "A plan for what to publish that you can actually keep up with, aimed at the questions people ask just before they buy. It is slow, and it is the part most businesses give up on by month three — which is exactly why it works for the ones who do not.",
      },
      {
        title: "Reporting that means something",
        body: "We set up your reporting to show enquiries and calls, not just positions on a page. Being number one for something nobody searches is not a result.",
      },
    ],
    includes: [
      "Checking what is holding you back",
      "Finding what people search for",
      "Fixing your pages so Google understands them",
      "Your Google Business Profile",
      "A plan for what to publish",
      "Monthly reporting",
    ],
    localAngle: {
      title: "Local searches are the ones you can win",
      body: "Competing across the whole country for a broad phrase is expensive and slow. Competing for the searches happening in Nyeri, Nanyuki, Thika or a Nairobi suburb is neither, because most local competitors have never claimed their Google listing, have no reviews, and run a site that struggles on a phone. That is an open goal. We would rather put you first for the searches that end in a call from someone twenty minutes away than fortieth for a national phrase that would never have brought you work.",
    },
    process: [
      {
        step: "01",
        title: "Check what is there",
        body: "We go through your site and compare it against the competitors currently above you, then give you an ordered list of what is costing you the most. It is yours to keep whether or not you continue with us.",
      },
      {
        step: "02",
        title: "Fix the basics",
        body: "Speed, making sure Google can reach every page, and getting each page to describe itself properly. Most of the early improvement comes from here, because most sites are carrying obvious mistakes.",
      },
      {
        step: "03",
        title: "Build your presence",
        body: "Your Google Business Profile, listings on the directories that matter, a way to keep collecting reviews, and the first set of pages aimed at the searches closest to a sale.",
      },
      {
        step: "04",
        title: "Publish and measure",
        body: "We keep publishing to the plan and report every month against enquiries. You see the searches you gained and the ones you lost.",
      },
    ],
    pricing: {
      from: "KES 25,000",
      note: "A one-off technical and local audit starts at KES 25,000 and is yours regardless of what you do next — including if you take it to someone else. Ongoing work is quoted monthly, and depends on how competitive your searches are and how much writing is involved.",
    },
    faqs: [
      {
        question: "How long before I see results?",
        answer:
          "Technical fixes and Google Business Profile work can move local visibility within four to eight weeks. Competitive commercial phrases take four to six months of consistent work. Anyone promising page one in thirty days is either targeting phrases nobody searches or planning something that will eventually get you penalised.",
      },
      {
        question: "Can you guarantee number one on Google?",
        answer:
          "No, and neither can anyone else — Google does not sell that and does not offer it. What we commit to is the work: the technical fixes, the profile, the pages, and honest monthly reporting on what moved. If a competitor guarantees a position, ask them what happens contractually when it does not arrive.",
      },
      {
        question: "How is this different from Google Ads?",
        answer:
          "Ads rent attention; SEO builds an asset. Ads stop the moment you stop paying, but they work immediately and are excellent for testing which phrases actually convert. SEO takes months and then keeps working. Most businesses should run ads while SEO matures — we will tell you if ads are the better use of your money right now.",
      },
      {
        question: "Do I need a whole new website?",
        answer:
          "Usually not. Most sites can be fixed. We only recommend a rebuild when the platform makes the necessary work impossible or absurdly expensive — and we show you the specific blockers rather than asserting it.",
      },
      {
        question: "What is a Google Business Profile and why do you keep mentioning it?",
        answer:
          "It is the listing that appears in the map results and on the right of a branded search. For any business serving a specific area it is the highest-return thing you can fix, it is free, and a startling number of Kenyan businesses have either never claimed theirs or left it half complete. We usually do this in the first fortnight.",
      },
      {
        question: "What do you actually report each month?",
        answer:
          "Enquiries, calls, and the searches that produced them; positions gained and lost; work completed and work next. In plain language. If a month was flat we say so and explain why, rather than finding a chart that went up.",
      },
    ],
    showcase: {
      // A product page shows what a business sells; it does not show SEO work.
      // A page written to answer the question someone actually typed does.
      src: "/work/datani-tips.webp",
      alt: "Datani's insurance tips page, which we wrote and built: seven plain-language answers to the questions people search for before they buy cover.",
    },
  },

  {
    // Appended as 05 rather than inserted at the front, even though it is the
    // cheapest way in. Leading with it would renumber every other discipline
    // and shift each one's engraving, which is a lot of visual churn for an
    // ordering nobody asked to change.
    slug: "online-presence",
    heroImage: "googleMaps",
    index: "04",
    name: "Google Maps & Business Presence",
    headline: "Put your business on the map",
    seoTitle: "Get Your Business Online in Kenya | Packages from KES 20,000",
    summary: "Packages that get you findable, from a profile to a full setup.",
    metaDescription:
      "Get your Kenyan business online: Google Business Profile, WhatsApp Business, website and SEO in one package. Four options from KES 20,000. Nyeri and Nairobi.",
    description:
      "Four packages that take a business from invisible to findable. Each one bundles the pieces that only work properly together — a profile, a way to be contacted, a site, and the basics of being found — so you buy an outcome rather than a list of parts.",
    problem:
      "Most businesses do not need a big project. They need to come up when somebody searches their name, to be reachable on the app their customers already use, and to look like a real business when a stranger checks. Right now that is spread across four suppliers and half of it is never finished. The result is a business that exists but cannot be found.",
    deliverables: [
      {
        title: "A Google Business Profile that is actually complete",
        body: "Claimed, verified, and filled in properly — hours, location, photos, the services you offer, and a way to keep collecting reviews. It is free, it is the highest-return thing most local businesses can fix, and a startling number of them have never claimed it.",
      },
      {
        title: "WhatsApp Business, set up the way people use it",
        body: "The catalogue, the away message, the quick replies, and the click-to-chat link that goes on everything. Your customers are already on WhatsApp. This is about them reaching you there without it becoming a second full-time job.",
      },
      {
        title: "A website, where the package includes one",
        body: "Built the same way as everything under Websites — fast on a phone, editable by you, pointed at one clear action. The package price is lower than buying it on its own.",
      },
      {
        title: "The basics of being found",
        body: "Titles and descriptions written for what people actually type, the technical checks that stop a site being invisible, and listings on the directories that matter in Kenya.",
      },
      {
        title: "Maps, social and analytics on the larger packages",
        body: "Your location correct on Google Maps, the social profiles that suit your business set up and matching, and analytics configured so you can see what is actually bringing enquiries rather than guessing.",
      },
    ],
    includes: [
      "Google Business Profile",
      "WhatsApp Business",
      "Website (on Digital Presence and up)",
      "Search basics",
      "Maps and social setup",
      "Analytics",
    ],
    localAngle: {
      title: "Findable here means WhatsApp and Maps, not just Google",
      body: "In Kenya a first contact usually arrives on WhatsApp, and a first check is usually a Maps search or a Google Business Profile rather than a homepage. A package that ships a beautiful site but leaves the profile unclaimed and the WhatsApp number buried has fixed the least important part. We do these together because separately each one leaks.",
    },
    process: [
      {
        step: "01",
        title: "See what already exists",
        body: "Half the time a profile exists, was created by somebody who has left, and has the wrong hours on it. We find what is already out there in your name before building anything new.",
      },
      {
        step: "02",
        title: "Claim and fix",
        body: "Profile claimed and verified, WhatsApp Business configured, and the details made consistent everywhere — the same name, the same number, the same address. Inconsistency is what stops you ranking locally.",
      },
      {
        step: "03",
        title: "Build the rest of the package",
        body: "The site, the listings, the social profiles and the analytics, depending on which package you chose.",
      },
      {
        step: "04",
        title: "Hand over and show you",
        body: "You get every login, and a walkthrough of how to post an update, reply on WhatsApp and read the numbers. The point is that you can run it without us.",
      },
    ],
    pricing: {
      from: "KES 20,000",
      note: "Bundled deliberately below the cost of buying the parts separately, because the pieces only work together — a site nobody can find and a profile with no site behind it both underperform. Custom is quoted after a short call.",
      tiers: [
        {
          name: "Online Starter",
          price: "KES 20,000",
          body: "Google Business Profile, WhatsApp Business, and the basics of being found. No website — right for a business whose customers need to reach it rather than read about it.",
        },
        {
          name: "Digital Presence",
          price: "KES 45,000",
          body: "Everything in Starter, plus a website. The most common starting point for a business that wants to look established to somebody who has never heard of it.",
        },
        {
          name: "Growth",
          price: "KES 75,000",
          body: "Everything in Digital Presence, plus Maps, social profiles set up to match, and analytics configured so you can see which of it is actually working.",
        },
        {
          name: "Custom",
          price: "Quoted after a call",
          body: "Where the business does not fit a shape — several branches, more than one language, an existing site worth keeping, or a setup somebody else half-built. We quote it once we have seen it.",
        },
      ],
    },
    faqs: [
      {
        question: "Which package should I start with?",
        answer:
          "If people already know your name and just need to reach you, Starter is enough. If a stranger has to be convinced you are real, you need a website, so start at Digital Presence. Growth is worth it once you have enquiries coming in and want to know where they came from. We will tell you if a cheaper one is the right answer.",
      },
      {
        question: "Do I own everything at the end?",
        answer:
          "Yes. The Google profile, the WhatsApp account, the domain, the site and every login are in your name from the start. That includes the Google Business Profile, which is the one people most often discover is registered to a former supplier and cannot be recovered quickly.",
      },
      {
        question: "Is this cheaper than buying the parts separately?",
        answer:
          "Yes, deliberately. A one-page site and a search audit bought on their own come to more than Digital Presence costs. The saving is real work we do not repeat when the pieces are done together.",
      },
      {
        question: "What if I already have a website?",
        answer:
          "Then you probably want Starter for the profile and WhatsApp work, or Custom if the site needs fixing rather than replacing. We will not sell you a rebuild of something that is working.",
      },
      {
        question: "How long does it take?",
        answer:
          "Starter is usually a week, most of which is waiting for Google to verify the profile — that step is out of our hands and can take a few days. Packages with a website follow the website timeline, which is four to eight weeks depending on content.",
      },
    ],
    showcase: {
      // The R&J homepage on a handset: a small business looking established to
      // a stranger on the device that stranger is actually holding, which is
      // the whole argument of these packages.
      src: "/work/rj-home-phone.webp",
      alt: "R&J Interiors on a phone: the full-screen room preview, readable and usable on a handset.",
      portrait: true,
    },
  },

  {
    slug: "digital-strategy",
    index: "05",
    name: "Digital Strategy",
    seoTitle: "Digital Strategy Consulting for Businesses in Kenya",
    headline: "Technology with a purpose",
    summary: "Decide what to build, and what not to, before anyone builds it.",
    metaDescription:
      "Digital strategy for Kenyan businesses. We work out what your business actually needs online, in what order, and what it should cost — before a line of code.",
    description:
      "The most expensive decisions in a project are made before anyone writes code. This is the work of deciding what to build, in what order, and what to leave alone — so the money goes where it changes something.",
    problem:
      "Most digital spending in a small business is reactive. Someone sells you a website, someone else sells you ads, a third person sets up a page, and none of them talk to each other or to what the business is actually trying to do. A year later there are five logins, four suppliers, no measurement, and no way to tell which of it worked.",
    deliverables: [
      {
        title: "What the business actually needs",
        body: "We start from the business and the customer, not from the technology. Who buys, how they decide, where they look first, and what is currently stopping them. Often the answer is smaller and cheaper than what you came in asking for, and we will say so.",
      },
      {
        title: "An order of work",
        body: "Everything worth doing, sequenced by what it returns and what it costs. You get a plan you could hand to any competent supplier — not one that only works if you keep hiring us.",
      },
      {
        title: "One joined-up picture",
        body: "The site, the profile, the app, the ads and the analytics treated as one system rather than five purchases. This is usually where the quiet waste is found.",
      },
      {
        title: "What success looks like, in numbers",
        body: "Agreed before we start: enquiries, calls, bookings, orders. Written down so that in six months there is a fact to check rather than an argument to have.",
      },
    ],
    includes: [
      "Business and customer review",
      "What to build, in order",
      "Budget shape",
      "Measurement plan",
      "Supplier-neutral written plan",
    ],
    localAngle: {
      title: "The plan has to survive a real budget",
      body: "Strategy decks written for enterprises assume budgets and teams that a Kenyan SME does not have. A plan that cannot be executed for the money in the room is not a plan. We size the sequence to what you can actually spend this year, and say plainly which parts can wait.",
    },
    process: [
      {
        step: "01",
        title: "Understand the business",
        body: "Half a day on what you sell, who buys it, and what currently brings enquiries. Usually the most useful hour in the whole engagement.",
      },
      {
        step: "02",
        title: "Look at what exists",
        body: "The site, the profile, the listings, the analytics if any. What is working, what is broken, and what is quietly costing money.",
      },
      {
        step: "03",
        title: "Decide and sequence",
        body: "What to build, what to fix, what to stop paying for, and in what order — with the reasoning written down beside each one.",
      },
      {
        step: "04",
        title: "Hand it over",
        body: "A written plan you own, and a conversation to walk through it. You are free to execute it with us, with someone else, or in-house.",
      },
    ],
    pricing: {
      from: "On application",
      note: "Scoped to the size of the business and the decision in front of it, and quoted after a short call. Where the work continues into a build with us, the strategy fee comes off the build.",
    },
    faqs: [
      {
        question: "Is this just a document?",
        answer:
          "It is a written plan, yes — but one you can hand to any supplier and get comparable quotes against. That is the point of it. If what you need is a build rather than a decision, we will tell you on the call and skip this entirely.",
      },
      {
        question: "Do I have to build it with you?",
        answer:
          "No. The plan is yours and it is written to be supplier-neutral. We would rather you executed a good plan elsewhere than a bad one with us.",
      },
      {
        question: "How is this different from discovery?",
        answer:
          "Discovery scopes a project you have already decided to do. This decides whether that project is the right one, and what should come before and after it.",
      },
    ],
    showcase: {
      src: "/work/datani-products.webp",
      alt: "The Datani products page: cover for personal, family, life and business, each product its own page — the structure that came out of deciding what the site had to do before it was designed.",
    },
  },

  {
    slug: "analytics-growth",
    index: "06",
    name: "Analytics & Growth",
    seoTitle: "Website Analytics & Conversion Tracking in Kenya",
    headline: "Know what is working. Improve what is not.",
    summary: "Measurement that tells you where your enquiries actually come from.",
    metaDescription:
      "Website analytics and conversion tracking for Kenyan businesses. See which pages, searches and channels bring real enquiries — and what to fix next.",
    description:
      "Most businesses cannot say which half of their digital spend works. We set up measurement that answers that question honestly, then use it to improve the things that turn out to matter.",
    problem:
      "Analytics is usually either absent or installed and never opened. Either way the effect is the same: decisions get made on impressions. You cannot tell whether the enquiries came from search, from the profile, from a WhatsApp forward or from a poster — so you keep paying for all of it, or you cut the wrong one.",
    deliverables: [
      {
        title: "Measurement that is actually installed correctly",
        body: "Analytics and search reporting set up properly, with the events that matter defined: a call pressed, a form sent, a WhatsApp opened, an order placed. A page-view count on its own tells you almost nothing.",
      },
      {
        title: "Where enquiries come from",
        body: "Which searches, pages and channels produce real contacts rather than traffic. This is the number that changes what you spend next month.",
      },
      {
        title: "What people do and where they stop",
        body: "The path through the site, and the point at which people give up. Usually one or two specific places, and usually cheap to fix once you can see them.",
      },
      {
        title: "Reporting in plain language",
        body: "What changed, what caused it, and what we propose next. If a month was flat we say so and explain why, rather than finding a chart that went up.",
      },
      {
        title: "Improvements, then measurement again",
        body: "A change is only finished when the numbers show what it did. We work in small rounds so each one can be attributed.",
      },
    ],
    includes: [
      "Analytics setup",
      "Conversion tracking",
      "Search performance",
      "User behaviour",
      "Monthly reporting",
      "Continuous improvement",
    ],
    localAngle: {
      title: "Most of the journey happens off your website",
      body: "In this market a customer often finds you on a Google Business Profile, checks you on WhatsApp, and calls a number from a poster. Measurement that only watches the website misses most of that. We track the contact points people here actually use, including the WhatsApp handoff, so the picture is not flattering and wrong.",
    },
    process: [
      {
        step: "01",
        title: "Agree what counts",
        body: "Which actions are worth money to you. Everything else is noise and we deliberately do not report it.",
      },
      {
        step: "02",
        title: "Install and verify",
        body: "Set it up, then test every event by performing it, because analytics that were never verified are worse than none — they are confidently wrong.",
      },
      {
        step: "03",
        title: "Read it properly",
        body: "A first full picture once there is enough data: where enquiries come from, and where they are being lost.",
      },
      {
        step: "04",
        title: "Improve, then measure again",
        body: "Small changes, one at a time, each one checked against the numbers before the next.",
      },
    ],
    pricing: {
      from: "On application",
      note: "Setup is a one-off and depends on how many contact points need tracking. Ongoing reporting is monthly and quoted with it. Where we already built the site, setup is usually included.",
    },
    faqs: [
      {
        question: "Do I need this if I already have Google Analytics?",
        answer:
          "Possibly not. But an unconfigured install records page views and nothing else, which cannot tell you where an enquiry came from. We will look at what you have and say honestly whether it needs work or just needs reading.",
      },
      {
        question: "Will you report numbers that make you look bad?",
        answer:
          "Yes. That is the entire value of paying someone else to measure it. A report that only ever goes up is a marketing document, not a measurement.",
      },
      {
        question: "Is this GDPR or data-protection compliant?",
        answer:
          "We configure analytics to avoid collecting personal data you do not need, and Kenya's Data Protection Act applies to what you do collect. We will tell you what is being stored and where.",
      },
    ],
    showcase: {
      src: "/work/datani-article.webp",
      alt: "A published Datani article with its date and read time — the kind of page whose search performance is worth measuring month on month.",
    },
  },
];


/**
 * Does this service publish a numeric starting price?
 *
 * Two disciplines are quoted after a call rather than from a floor, and their
 * `pricing.from` reads "On application". Every render site prefixes the value
 * with the word "From", which turns that into "From On application" — so each
 * one asks this first. Keyed on the presence of a digit rather than on a
 * magic string, so any future non-numeric phrasing behaves correctly too.
 */
export function hasPublishedFloor(service: Service): boolean {
  return /\d/.test(service.pricing.from);
}

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
