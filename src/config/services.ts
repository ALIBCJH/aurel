/**
 * The six Mojah services.
 *
 * Single source of truth for the Services page, the home index, the
 * /services/[slug] detail routes, and the Service/FAQPage structured data.
 *
 * These are the five disciplines Mojah publishes in its own company rundown —
 * hardware supply and repair, networks, software, system migration, and
 * security systems — plus website development, which sits alongside software
 * rather than inside it because a business searching for a website does not
 * search for "software development".
 *
 * Copy rules, so this file stays coherent as it grows:
 *  - Plain words. Write for a business owner comparing three quotes, not for
 *    another engineer. If a term would need explaining across a desk, it does
 *    not belong here.
 *  - Short sentences. No idioms, no metaphors: good English is not the same as
 *    good signage.
 *  - `headline` is the page's H1 and its first job is to be findable. It should
 *    contain the words somebody would actually type into Google — "computer
 *    repair in Nyeri", not "technology that works".
 *  - Nothing claims a result we cannot point at real work for.
 *  - The local angle is a genuine operating constraint, not a marketing nod.
 *
 * ON PRICES: every discipline reads "On request". Mojah has not published a
 * rate card, and the previous occupant of this file carried six KES floors
 * that were another company's. A figure invented to fill the field would be
 * rendered on the services page, in the contact sidebar, and into schema.org
 * `offers` where Google may show it beside the business — which makes a made-up
 * number a public price promise. When real figures exist, put them in
 * `pricing.from` and the "From" prefix, the price grid and the structured-data
 * offer all switch themselves back on. See `hasPublishedFloor` below.
 */

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
   * to come first.
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
  /** The concrete things we actually do. */
  deliverables: Array<{ title: string; body: string }>;
  /** Short labels — what an engagement includes. */
  includes: string[];
  /** The constraint that makes doing this work here different. */
  localAngle: { title: string; body: string };
  /** How a job runs, specific to this discipline. */
  process: Array<{ step: string; title: string; body: string }>;
  /**
   * Indicative commercials.
   *
   * `from` is a human-readable string because it is rendered directly, and
   * `parsePriceFloor` in `json-ld.tsx` strips the non-digits back out for
   * schema.org. Keeping one source means the figure a visitor reads and the
   * figure Google reads cannot drift apart. A string with no digits in it — as
   * all six currently are — omits the structured-data offer entirely rather
   * than advertising a price of zero.
   *
   * `tiers` is optional and exists for disciplines where the honest answer is
   * a small number of shapes at different prices rather than a single floor.
   * Where it is present the first tier's price and `from` must agree.
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
   * A real screen from delivered work that illustrates this discipline.
   *
   * Optional, and absent on the four disciplines where it would have to be
   * faked. Always a capture of something actually built — never a stock image
   * or an abstract stand-in. There is no honest screenshot of a repaired
   * laptop, a cable run or a camera install in this repository, and attaching
   * an unrelated one would teach the reader that the pictures on this site are
   * decorative.
   */
  showcase?: {
    src: string;
    alt: string;
    /**
     * True for the phone captures, which are 780×1688 against the landscape
     * captures' 1440×900. Without the flag a shared plate crops a phone screen
     * to a horizontal strip through its middle, which shows nothing.
     */
    portrait?: boolean;
  };
};

/** The standing answer wherever a price would go. One string, one place. */
const ON_REQUEST = "On request";

export const services: Service[] = [
  {
    slug: "hardware",
    index: "01",
    name: "Hardware Supply & Repair",
    seoTitle: "Computer, Laptop & Printer Repair in Nyeri",
    headline: "Computer, printer and photocopier repair in Nyeri",
    summary: "Supply and repair of PCs, laptops, phones, printers and copiers.",
    metaDescription:
      "Computer, laptop, tablet, phone, printer and photocopier supply and repair in Nyeri. Bring it to Old Batian House or we come to you. Diagnosis before you commit.",
    description:
      "We supply, install and repair the equipment a business runs on — computers, laptops, tablets, phones, printers and photocopiers. One supplier for buying it and for fixing it, which is the difference between a machine being down for an afternoon and being down for a fortnight.",
    problem:
      "A machine fails on a Monday morning and the whole day stops with it. The person who sold it to you does not repair, and the person who repairs does not have the part. You are quoted for a replacement before anyone has opened the case, or you are quoted for a repair by somebody who will not say what is wrong. Meanwhile the invoices are not going out, because the printer is the thing that broke.",
    deliverables: [
      {
        title: "Diagnosis before you commit to anything",
        body: "We open it, find out what is actually wrong, and tell you what it will take to fix — before you have agreed to spend anything. Sometimes the honest answer is that the machine is not worth repairing, and we would rather say so than take the money.",
      },
      {
        title: "Repair, not replacement, wherever repair is sensible",
        body: "Screens, keyboards, batteries, power supplies, drives, memory, printer rollers and fusers. A great deal of what gets condemned as dead is a part you can buy. Replacement is a recommendation we make, not a default.",
      },
      {
        title: "Supply of the right machine, not the best-margin one",
        body: "New and refurbished computers, laptops, tablets, phones, printers and photocopiers. We ask what the machine has to do all day before we suggest one, because an office that only writes documents and prints invoices does not need a workstation.",
      },
      {
        title: "Set up and ready to use",
        body: "Delivered configured — operating system, the software you actually use, connected to your network and your printer, and your files moved across if it is replacing something. Not a sealed box left on a desk.",
      },
      {
        title: "Consumables and parts kept moving",
        body: "Toner, cartridges, drums and the parts that wear. The cost of a printer is not the printer; it is what it drinks for the next three years, and we will tell you that before you buy rather than after.",
      },
    ],
    includes: [
      "Diagnosis and a written quote",
      "Repair and parts replacement",
      "Supply of new and refurbished equipment",
      "Setup and configuration",
      "Data transfer from the old machine",
      "Consumables and spares",
    ],
    localAngle: {
      title: "Parts availability is the real constraint here",
      body: "The repair is rarely the hard part. Getting the correct part to Nyeri is. Being a supplier as well as a repairer is what makes the difference — we know what is genuinely held in the country, what has to come up from Nairobi and how long that takes, and what is not worth waiting for. So the answer you get is a date rather than a shrug, and where the part will take a week we say that on the first day instead of the fifth.",
    },
    process: [
      {
        step: "01",
        title: "Bring it in, or we come out",
        body: "Small equipment comes to the shop at Old Batian House. Photocopiers, servers and anything bolted to a desk we look at on site.",
      },
      {
        step: "02",
        title: "We find out what is wrong",
        body: "A proper diagnosis, then a quote with the fault named and the parts listed. You decide with the facts in front of you.",
      },
      {
        step: "03",
        title: "Repair or replace",
        body: "We fix it, or where fixing it is throwing good money after bad we say so and price the alternative honestly.",
      },
      {
        step: "04",
        title: "Tested and handed back working",
        body: "Set up, connected, and checked doing the job it is there to do — not just powering on.",
      },
    ],
    pricing: {
      from: ON_REQUEST,
      note: "Quoted per machine after diagnosis, because the same symptom can be a cable or a mainboard and pricing it before opening the case would be a guess. Supply is quoted against the specification you actually need.",
    },
    faqs: [
      {
        question: "How long does a repair take?",
        answer:
          "Where the part is in stock, often the same day or the next. Where it has to be ordered, we tell you the realistic date when we quote rather than after you have left the machine with us. If that date moves, you hear it from us.",
      },
      {
        question: "Do you charge to look at it?",
        answer:
          "We tell you the diagnosis position up front when you bring the equipment in, so there is never a bill you did not expect. What we will not do is quote a repair without opening the machine, because that number would be invented.",
      },
      {
        question: "Will I lose my files?",
        answer:
          "Tell us before we start and we work around your data — and where a drive is failing, recovering what is on it comes first. Back up anything irreplaceable before handing over any machine to anyone, ours included. No repairer can promise a dying drive will survive being handled.",
      },
      {
        question: "Do you sell refurbished machines?",
        answer:
          "Yes, and for a lot of businesses they are the sensible buy. We will tell you which of the two makes sense for the work you are doing rather than steering you at the more expensive one.",
      },
      {
        question: "Can you maintain the equipment rather than just fix it?",
        answer:
          "Yes. Scheduled servicing — cleaning, consumables, checks on the machines you cannot afford to lose — costs less than emergency repairs and interrupts less. It suits offices running photocopiers and shared printers particularly well.",
      },
    ],
  },

  {
    slug: "networks",
    index: "02",
    name: "Network Installation & Maintenance",
    seoTitle: "Network Installation & Cabling in Nyeri, Kenya",
    headline: "Networks that stay up",
    summary: "Cabling, Wi-Fi and network setup that holds under real use.",
    metaDescription:
      "Network installation, configuration and maintenance in Nyeri. Structured cabling, Wi-Fi that reaches, routers, switches and internet that stays up under real use.",
    description:
      "We install, configure and maintain the network an office runs on — cabling, Wi-Fi, switches, routers and the internet connection behind them. Built so it keeps working when the room is full, rather than only when it is being demonstrated.",
    problem:
      "The internet works in one half of the building. The Wi-Fi drops every afternoon when everybody is on it. There is a cupboard of cables nobody has ever labelled and no one alive knows which switch feeds the back office. Somebody is asked to fix it, restarts the router, and it works again for a day. It is never quite bad enough to deal with properly, and it costs an hour of somebody's time every week.",
    deliverables: [
      {
        title: "Cabling done once, properly",
        body: "Structured cabling run, terminated, tested and labelled. Labelling is the part everyone skips and the part that decides whether the next fault takes ten minutes or a morning.",
      },
      {
        title: "Wi-Fi that reaches the whole building",
        body: "Access points placed against how the building is actually built — a coverage problem is usually a wall, not a weak router. We check the coverage after installing rather than assuming it.",
      },
      {
        title: "Routers, switches and the setup behind them",
        body: "Configured rather than left on defaults: addressing, a guest network kept away from your own machines, and passwords that are not the ones printed on the underside of the box.",
      },
      {
        title: "Printers and shared equipment on the network",
        body: "Shared printers, scanners and photocopiers that every machine can find and keep finding — including after somebody's laptop is replaced.",
      },
      {
        title: "Documentation and maintenance",
        body: "A written record of what was installed and where it runs, so you are not dependent on one person's memory. Scheduled checks where you want them.",
      },
    ],
    includes: [
      "Site survey",
      "Structured cabling and termination",
      "Wi-Fi access points and coverage testing",
      "Router and switch configuration",
      "Shared printers and equipment",
      "Labelling, documentation and maintenance",
    ],
    localAngle: {
      title: "Power is part of the network here",
      body: "A network design that ignores the mains is a network that goes down whenever the power does. We plan for it: the switch and the router on protected power so the office does not lose everything the moment the lights flicker, and equipment specified with the local supply in mind. The same goes for the internet connection — we will tell you plainly what a link can and cannot carry before it is sold to you, rather than after the video calls start breaking up.",
    },
    process: [
      {
        step: "01",
        title: "Walk the building",
        body: "We look at the actual rooms, the walls, the power and where people sit. Almost every coverage problem is visible from the floor before anything is installed.",
      },
      {
        step: "02",
        title: "Plan and quote",
        body: "What goes where, what it needs, and what it costs — written down, with the reasoning beside it so you can compare it against anyone else's quote.",
      },
      {
        step: "03",
        title: "Install",
        body: "Cabling run and terminated, equipment mounted and configured, everything labelled as it goes in rather than at the end.",
      },
      {
        step: "04",
        title: "Test and hand over",
        body: "Coverage checked in the rooms that matter, speeds tested, documentation handed over, and your team shown the few things they may need to do themselves.",
      },
    ],
    pricing: {
      from: ON_REQUEST,
      note: "Quoted after a site visit. What moves the number is the number of points, the distances, how much of the building is already cabled, and how hard the walls are to work with — none of which can be judged from a phone call.",
    },
    faqs: [
      {
        question: "Can you work with the network we already have?",
        answer:
          "Usually yes. Most offices need part of it fixed rather than all of it replaced, and we will tell you which parts are worth keeping. A quote to rip out and start again should always come with a reason attached.",
      },
      {
        question: "Why cable at all when Wi-Fi exists?",
        answer:
          "Wi-Fi is right for laptops and phones and wrong for the things that must not drop — a server, a shared printer, a desk that runs all day. Most offices want both, and putting the fixed equipment on cable is what leaves enough Wi-Fi for everybody else.",
      },
      {
        question: "Do you supply the equipment too?",
        answer:
          "Yes, and you are welcome to buy it yourself if you would rather. We will tell you what to look for either way. What we will not do is specify equipment you do not need in order to sell it to you.",
      },
      {
        question: "What happens when something breaks later?",
        answer:
          "Because it is labelled and documented, a fault is usually found quickly — by us or by anyone else competent you call. We offer scheduled maintenance where you want it, and it is never a condition of the installation.",
      },
      {
        question: "Can you set up CCTV on the same network?",
        answer:
          "Yes, and doing both together is cheaper and tidier than doing them separately — the cabling is largely the same job. See Security Systems & CCTV.",
      },
    ],
  },

  {
    slug: "software-development",
    index: "03",
    name: "Software Development",
    seoTitle: "Custom Software Development in Kenya",
    headline: "Software built around how you actually work",
    summary: "Custom software, plus maintenance of the systems you already run.",
    metaDescription:
      "Custom software development, maintenance and optimisation in Kenya. Systems built around how your business actually runs, and support for the software you already have.",
    description:
      "Software built around your business rather than squeezed into a ready-made package — and maintenance and improvement of the systems you already depend on. Both matter: most businesses need the second more urgently than the first.",
    problem:
      "Your business runs on a spreadsheet, a WhatsApp group and somebody's memory. It works until it does not — an order is missed, a payment is never recorded, two people change the same figure. Ready-made software almost fits, and the gap between almost and properly is where the mistakes live. Or you already have a system, it does most of what you need, and the person who built it is unreachable.",
    deliverables: [
      {
        title: "Systems shaped around your process",
        body: "We start from the work being done, not from a product we would like to sell. Often the answer is smaller than what you came in asking for — a system that does three things reliably beats one that does twelve badly.",
      },
      {
        title: "Maintenance of software you already run",
        body: "Taking over a system somebody else built, understanding it, and keeping it running. This is the least glamorous thing on this page and the thing most businesses actually need.",
      },
      {
        title: "Making slow things faster",
        body: "Where a system has become painful to use, the cause is usually specific and findable rather than general. We measure it, fix the part that is actually costing the time, and show you the difference.",
      },
      {
        title: "The reports that tell you what happened",
        body: "Stock, sales, jobs, payments — in a form you can read without exporting it somewhere else first. A system that holds the data and cannot answer questions about it is only half built.",
      },
      {
        title: "Handover, so it is not dependent on us",
        body: "Documented, with the accounts in your name and someone on your side who knows how it fits together. You should be able to hire anyone competent to work on it next.",
      },
    ],
    includes: [
      "Working out what it needs to do",
      "Design and a working sample",
      "Build in stages you can see",
      "Taking over existing systems",
      "Maintenance and improvement",
      "Documentation and handover",
    ],
    localAngle: {
      title: "It has to work on the connection you actually have",
      body: "Software written for a constant, fast connection fails quietly here: it looks fine in the office and stops being usable at a branch or in the field. We treat a slow or intermittent link as the normal case rather than the exception, keep what has to be sent small, and make sure work is not lost when the connection drops mid-task. Where M-Pesa is part of the flow, we handle the awkward cases that really happen — the payment cancelled on the handset, the one recorded twice, the one confirmed ten minutes late.",
    },
    process: [
      {
        step: "01",
        title: "Understand the work",
        body: "We map what actually happens now, including the parts done on paper and by habit, and cut the first version down to what genuinely matters.",
      },
      {
        step: "02",
        title: "Design and a sample to try",
        body: "Something you can click through and hand to the people who will use it every day, before it is built. What they say changes the plan, and at this stage changing it is cheap.",
      },
      {
        step: "03",
        title: "Build in stages",
        body: "Short cycles, with something you can open at the end of each. You watch it take shape instead of waiting months to be shown a finished thing you cannot change.",
      },
      {
        step: "04",
        title: "Launch, then improve",
        body: "In use, watched, and adjusted based on what people actually do with it rather than what everyone expected them to do.",
      },
    ],
    pricing: {
      from: ON_REQUEST,
      note: "Quoted after a conversation about what the system has to do. Maintenance of an existing system is normally a monthly arrangement and is quoted separately from any new build.",
    },
    faqs: [
      {
        question: "Do I need custom software at all?",
        answer:
          "Often no. If a ready-made package fits, buying it is cheaper and better supported than anything built to order, and we will tell you so. Custom earns its place when the gap between the package and your actual process is where the errors happen.",
      },
      {
        question: "Can you take over a system somebody else built?",
        answer:
          "Usually yes. We look at it first and tell you honestly whether it is maintainable, because sometimes it is not — and finding that out from an assessment is far cheaper than finding it out six months into a support arrangement.",
      },
      {
        question: "How long does it take?",
        answer:
          "A focused first version is normally months rather than weeks, and the slow parts are agreeing what it must do and getting your existing data in — not the building. We give you a plan with stages so you can see progress rather than waiting for an ending.",
      },
      {
        question: "Who owns the code?",
        answer:
          "You do. The code and the accounts it runs on are in your name, and we hand over full access. Nothing is held back as a way of keeping you.",
      },
      {
        question: "Can it work with our accounting or stock system?",
        answer:
          "Usually yes. Where a system has no proper way of connecting, we will tell you plainly what is and is not possible rather than promising a link that will keep breaking.",
      },
    ],
    showcase: {
      src: "/work/rj-studio-phone.webp",
      alt: "The R&J configurator on a phone: a live room preview above, fabric, window and wall tabs below, and Pay to Book within thumb reach.",
      portrait: true,
    },
  },

  {
    slug: "websites",
    index: "04",
    name: "Website Development",
    seoTitle: "Website Design & Development in Kenya",
    headline: "Websites that bring you enquiries",
    summary: "Websites that open fast on a phone and bring you enquiries.",
    metaDescription:
      "Website design and development in Kenya. Fast, mobile-friendly websites that bring in enquiries, take M-Pesa payments, and that you can update yourself.",
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
        title: "You can change it yourself",
        body: "A simple editing tool you can actually use, so changing a price or adding a product does not mean paying someone. We hand over the logins and show you how it works.",
      },
      {
        title: "Payments and enquiries that reach you",
        body: "M-Pesa payments where you sell, and contact forms that land in an inbox you check and alert you when they do — not a contact page that has quietly been failing for a year.",
      },
      {
        title: "Found when somebody searches",
        body: "Set up so Google can read it, with your business listed properly on Maps and the pages written around what people actually type. A site nobody can find is a brochure.",
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
      from: ON_REQUEST,
      note: "Quoted after a short conversation. What moves the number is the number of pages, whether you need to take money on the site, and how much of the writing we do.",
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
        question: "Do I own the website?",
        answer:
          "Completely. Code, content, domain, and hosting accounts are all in your name. We do not hold client work back as a way of keeping you.",
      },
    ],
    showcase: {
      src: "/work/datani-home.webp",
      alt: "The Datani Insurance homepage, headed 'Insurance that puts you first', with the phone number, WhatsApp and a quote button all in reach.",
    },
  },

  {
    slug: "system-migration",
    index: "05",
    name: "System Migration & Integration",
    seoTitle: "System Migration, Upgrades & Integration in Kenya",
    headline: "Move systems without stopping the business",
    summary: "Upgrades, migrations and getting separate systems talking.",
    metaDescription:
      "System migration, upgrade and integration in Kenya. Move to new machines or new software without losing data or stopping work, and get separate systems talking to each other.",
    description:
      "Moving from old systems to new ones, and getting systems that were never designed to talk to each other to do it anyway. The work is judged on one thing: whether the business kept running while it happened.",
    problem:
      "You are running something that is out of support, or on machines that are failing, and everybody knows it needs to move. Nobody starts, because the risk of losing data or losing a week is worse than the risk of carrying on. So you keep going, and the longer it is left the harder and more expensive the move becomes. Meanwhile the same figures are being typed into two systems by hand because neither one can see the other.",
    deliverables: [
      {
        title: "A plan that says what happens to the data",
        body: "Where every piece of it goes, what is being left behind on purpose, and how we will know it arrived intact. This is the whole job. Everything else is logistics.",
      },
      {
        title: "Moved without stopping work",
        body: "Sequenced so the business keeps trading — normally moving in stages, with the old system still reachable until the new one has proved itself rather than switched off the same evening.",
      },
      {
        title: "A way back if it goes wrong",
        body: "A tested backup and a defined point at which we stop and reverse. A migration without a rollback plan is not a plan, it is a hope.",
      },
      {
        title: "Systems that talk to each other",
        body: "Connecting the systems you keep so the same figures are not entered twice. Where a system genuinely cannot be connected, we tell you that instead of building something fragile that breaks in six months.",
      },
      {
        title: "People shown the new way before they meet it",
        body: "The technical move is the easy half. A migration fails when nobody showed the team what changed, so they work around the new system and the data goes bad quietly.",
      },
    ],
    includes: [
      "Review of what exists now",
      "Migration plan and rollback plan",
      "Backup and verification",
      "Staged move with the business running",
      "Integration between systems",
      "Training and handover",
    ],
    localAngle: {
      title: "Plan the move around the power and the link",
      body: "A cutover scheduled for an evening assumes the power and the internet will both be there for it. Here that is an assumption worth planning against rather than hoping on. We size moves so they can pause and resume without corrupting anything, keep a local copy rather than depending on an upload finishing, and pick windows around how the business and the town actually run. It is why we prefer staged moves to a single dramatic weekend.",
    },
    process: [
      {
        step: "01",
        title: "See what is actually there",
        body: "The systems, the data, the connections nobody documented, and the one spreadsheet the whole thing secretly depends on. This step always finds something.",
      },
      {
        step: "02",
        title: "Plan the move and the way back",
        body: "Order of work, what moves when, how we verify it, and the point at which we would stop and reverse. Agreed with you before anything is touched.",
      },
      {
        step: "03",
        title: "Back up, then move in stages",
        body: "Backed up and verified first. Then moved a piece at a time, with the old system still available until the new one has been proved on real work.",
      },
      {
        step: "04",
        title: "Check, train, and retire the old",
        body: "Data checked against the source, the team shown the new way of working, and the old system retired only once nobody needs it.",
      },
    ],
    pricing: {
      from: ON_REQUEST,
      note: "Quoted after we have seen the systems, because the honest number depends entirely on how much data there is and what condition it is in. An assessment on its own is available where you want a scope and a plan before committing to the move.",
    },
    faqs: [
      {
        question: "Will we have to stop working while this happens?",
        answer:
          "That is the thing we plan hardest to avoid. Most moves are staged so the business keeps trading, with any unavoidable downtime scheduled, short, and told to you in advance rather than discovered on the day.",
      },
      {
        question: "What if something goes wrong halfway?",
        answer:
          "There is a tested backup and an agreed point at which we stop and go back to the old system. We agree that before starting, when it can be discussed calmly, rather than in the middle of a problem.",
      },
      {
        question: "Can you move us off a system nobody supports any more?",
        answer:
          "Usually yes, and it is one of the more common reasons people call. Getting data out of an old or obscure system is often the hardest part of the job, so we establish early whether it can be done rather than after you have committed.",
      },
      {
        question: "Do we have to replace everything at once?",
        answer:
          "Almost never, and we will usually advise against it. Moving in stages costs less to recover from if something surprises us, and it lets your team absorb one change at a time.",
      },
      {
        question: "Can you connect two systems instead of replacing either?",
        answer:
          "Often yes, and where it works it is much cheaper than a migration. We will tell you honestly which of the two your situation calls for.",
      },
    ],
  },

  {
    slug: "security-systems",
    index: "06",
    name: "Security Systems & CCTV",
    seoTitle: "CCTV Installation in Nyeri, Kenya",
    headline: "CCTV that gives you usable footage",
    summary: "CCTV and security systems installed to actually show you something.",
    metaDescription:
      "CCTV camera installation in Nyeri, Kenya. Cameras placed and set up to give usable footage day and night, recorded properly, and viewable from your phone.",
    description:
      "Installation of CCTV and security systems for shops, offices, yards and homes — placed and configured so that when you need the footage, the footage is there and you can actually make out what happened.",
    problem:
      "Most CCTV installations fail on the day they are needed. The cameras are there, but the one covering the till is pointed at the ceiling fan, the night footage is a white glare, the recorder overwrote last week, or nobody has the password. The system was bought to answer one question on one bad day, and on that day it cannot answer it. That is not a camera problem. It is an installation problem.",
    deliverables: [
      {
        title: "Cameras placed to answer a question",
        body: "We start by asking what you would actually need to see — who came through the door, what happened at the till, who was in the yard at night — and place cameras to answer that. A camera covering everything in general covers nothing in particular.",
      },
      {
        title: "Footage that is usable at night",
        body: "Night is when it matters and it is where most installations fail. We set exposure and lighting for the actual scene, so a face is a face rather than a white shape against a black background.",
      },
      {
        title: "Recording that still has the day you need",
        body: "Storage sized against how far back you would realistically need to look, and checked. A recorder quietly overwriting every four days is the most common fault we find on systems installed by somebody else.",
      },
      {
        title: "Viewing from your phone, set up securely",
        body: "Remote viewing configured properly — your own password, not the manufacturer's default. A camera system reachable from the internet on factory settings is a camera in a stranger's hands.",
      },
      {
        title: "Cabling and power done to last",
        body: "Runs protected, terminated properly, and powered so a flicker does not take the system offline until somebody notices days later.",
      },
    ],
    includes: [
      "Site survey and camera plan",
      "Supply of cameras and recorder",
      "Cabling and installation",
      "Night and exposure setup",
      "Remote viewing on your phone",
      "Handover and maintenance",
    ],
    localAngle: {
      title: "A system that is off is worse than no system",
      body: "The two things that stop CCTV working here are power and neglect. A recorder that drops with every outage is missing exactly the moments you bought it for, so we put the recorder on protected power as a matter of course. And a system nobody has looked at in a year is usually recording nothing — a failed drive, a camera knocked out of aim, a lens nobody has cleaned. We show you the two-minute check that catches all three, because a system you can verify yourself is the only kind that stays working.",
    },
    process: [
      {
        step: "01",
        title: "Agree what you need to see",
        body: "We walk the site and work out the specific things the system has to capture. Everything after this follows from that list.",
      },
      {
        step: "02",
        title: "Plan and quote",
        body: "Camera positions, what each one covers, the recording you need, and the cost — with the reasoning attached so you can compare it fairly against another quote.",
      },
      {
        step: "03",
        title: "Install and aim",
        body: "Cameras mounted and cabled, then aimed and set on the real scene in daylight and after dark. Aiming from a plan alone is how cameras end up pointed at rooflines.",
      },
      {
        step: "04",
        title: "Show you how to use it",
        body: "How to find footage from a date, how to export a clip, and how to check the system is still recording. Passwords are yours and we hand them over.",
      },
    ],
    pricing: {
      from: ON_REQUEST,
      note: "Quoted after a site visit, because the number depends on how many cameras the site genuinely needs, the cable runs, and how long you need to keep recordings. We would rather specify four cameras that answer your questions than eight that do not.",
    },
    faqs: [
      {
        question: "How many cameras do I need?",
        answer:
          "Fewer than most quotes suggest, usually. It depends on what you need to be able to prove — entrances, tills and cash points earn their cameras; a wide shot of a room you already have covered rarely does. We would rather sell you four in the right places than eight in the wrong ones.",
      },
      {
        question: "How long is footage kept?",
        answer:
          "As long as the storage allows, which is a decision made when the system is specified rather than an accident. Tell us how far back you would realistically need to look and we size it for that, then confirm it is behaving that way after installation.",
      },
      {
        question: "Can I watch it on my phone?",
        answer:
          "Yes, and we set it up with your own password rather than the factory one. Systems left on default credentials are routinely found and watched by strangers, which is the opposite of what you bought.",
      },
      {
        question: "What happens when the power goes?",
        answer:
          "We put the recorder and network equipment on protected power as standard, so an outage does not create a gap in the record — that gap is usually the footage you would have needed.",
      },
      {
        question: "Do you maintain systems you did not install?",
        answer:
          "Yes. We will look at what is there and tell you honestly whether it needs servicing, re-aiming, or replacing. A surprising number of systems need nothing more than a cleaned lens, a re-aim, and a new drive.",
      },
    ],
  },
];

/**
 * Does this service publish a numeric starting price?
 *
 * Every render site prefixes the value with the word "From", which would turn
 * "On request" into "From On request" — so each one asks this first. Keyed on
 * the presence of a digit rather than on a magic string, so any future
 * non-numeric phrasing behaves correctly too.
 *
 * Currently false for all six. When real figures are published this switches
 * the "From" prefix, the price grid on /services and the schema.org offer back
 * on by itself.
 */
export function hasPublishedFloor(service: Service): boolean {
  return /\d/.test(service.pricing.from);
}

/** True when any discipline publishes a real figure. Gates the price grid. */
export function anyPublishedFloor(): boolean {
  return services.some(hasPublishedFloor);
}

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
