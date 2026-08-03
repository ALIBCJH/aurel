/**
 * The four Aurel services.
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
 *  - `headline` states the outcome, never the discipline.
 *  - Nothing claims a result we cannot point at real work for.
 *  - The local angle is a genuine engineering constraint, not a marketing nod.
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
  /** Indicative commercials. Ranges, never a fixed quote. */
  pricing: { from: string; note: string };
  /** Real objections. Rendered visibly on the page and mirrored into FAQPage schema. */
  faqs: ServiceFaq[];
  /**
   * A real screen from shipped work that illustrates this discipline.
   * Always a capture of something we actually built — never a stock image or
   * an abstract stand-in, because the entire argument of the services page is
   * that these are things we have done rather than things we offer.
   */
  showcase: { src: string; alt: string };
};

export const services: Service[] = [
  {
    slug: "websites",
    index: "01",
    name: "Websites",
    headline: "A website that earns its keep.",
    summary: "Fast, credible sites that turn visitors into enquiries.",
    metaDescription:
      "Custom website design and development in Kenya. Fast, mobile-first sites built to convert — engineered for real Kenyan network conditions and M-Pesa payments.",
    description:
      "Most business websites are a brochure nobody reads. We build the other kind: a site that loads instantly on a phone on mobile data, says the right thing in the first five seconds, and makes it obvious what to do next.",
    problem:
      "You have a website, and it does nothing. It was built once, by someone who has since disappeared, on a platform you cannot edit. It takes eight seconds to load on a phone, which is how almost everyone will see it. It describes what you do in language nobody searches for. Meanwhile a competitor with a worse product and a faster site is taking the enquiries that should be yours.",
    deliverables: [
      {
        title: "A site built around one decision",
        body: "Every page has a job: get the visitor to enquire, book, or buy. We work out what that action is before we design anything, then remove whatever does not serve it. Most sites fail because they try to say everything to everyone.",
      },
      {
        title: "Performance as a feature, not a checkbox",
        body: "We build for a mid-range Android phone on a congested 4G cell, because that is the real device and the real network. That means small pages, images that are actually optimised, and no third-party script that costs a second of load time for a metric nobody reads.",
      },
      {
        title: "Identity that matches the ambition",
        body: "Logo, colour, type, and the rules that hold them together — enough of a brand system that your site, your quotation, and your WhatsApp profile look like the same company.",
      },
      {
        title: "Content you can change yourself",
        body: "A CMS you can actually use, so updating a price or adding a product does not require an invoice. We hand over the keys and show you how it works.",
      },
      {
        title: "Payments and enquiries that arrive",
        body: "M-Pesa checkout where you sell, and forms that reach a real inbox with a real notification — not a contact page that has been silently failing for a year.",
      },
    ],
    includes: [
      "Discovery & positioning",
      "Design",
      "Build",
      "CMS & handover",
      "M-Pesa / payments",
      "Analytics & search setup",
    ],
    localAngle: {
      title: "Built for how Kenya actually browses",
      body: "Around nine in ten Kenyan visitors arrive on a phone, often on metered data where every megabyte is a decision. A heavy site does not just load slowly here — it costs the visitor money to open, and they leave. We treat page weight as a hard budget, ship images in modern formats at the size they are displayed, and render meaningful content before any JavaScript runs. The same discipline is why this site loads the way it does.",
    },
    process: [
      {
        step: "01",
        title: "Discovery",
        body: "We learn your business, your customer, and the one action the site exists to produce. Half a day, and it changes everything downstream.",
      },
      {
        step: "02",
        title: "Structure & copy",
        body: "Sitemap and words first, design second. Designing before the copy exists is how sites end up with beautiful sections that say nothing.",
      },
      {
        step: "03",
        title: "Design",
        body: "Full design of every key page, on desktop and phone, before a line of production code is written.",
      },
      {
        step: "04",
        title: "Build & launch",
        body: "Engineering, content loading, performance and search setup, then handover with a walkthrough so you are not dependent on us to change a price.",
      },
    ],
    pricing: {
      from: "KES 120,000",
      note: "A focused marketing site for an established business typically lands between KES 120,000 and 400,000 depending on page count, content, and whether payments are involved. Larger platforms are quoted after discovery.",
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
          "Yes — Daraja STK Push for checkout, with proper handling of the cases that actually happen in production: the customer who cancels on their handset, the callback that arrives twice, and the payment that is confirmed minutes late.",
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
      src: "/work/datani-insurance.png",
      alt: "The Datani Insurance website we built: a product-led homepage with a prominent quote call to action.",
    },
  },

  {
    slug: "mobile-apps",
    index: "02",
    name: "Mobile apps",
    headline: "Apps that survive a real phone on a real network.",
    summary: "Android and iOS apps built for how your business works.",
    metaDescription:
      "Mobile app development in Kenya. Android and iOS apps engineered for low-end devices, patchy networks, offline use, and M-Pesa — built around how your business actually works.",
    description:
      "Software your team and your customers carry in their pocket, built around how your business actually runs rather than forced into an off-the-shelf template. Engineered for the phones and networks your users really have.",
    problem:
      "Your operation runs on WhatsApp messages, a shared spreadsheet, and someone's memory. It works until it doesn't — an order is missed, a payment goes unrecorded, a field team submits yesterday's numbers tomorrow. Off-the-shelf software almost fits, but the gap between almost and actually is where the errors live, and you end up paying a monthly fee to keep working around it.",
    deliverables: [
      {
        title: "Apps that work without signal",
        body: "A field team in a coverage hole should keep working, not stop. We build offline-first: the app holds its own data, keeps functioning, and reconciles when the connection returns — with a deliberate answer for what happens when two people edited the same record.",
      },
      {
        title: "Built for the phones people own",
        body: "We test on low-end Android, not just a current-generation flagship. That governs bundle size, memory use, and how much work happens on the device — the difference between an app that feels instant and one that gets uninstalled.",
      },
      {
        title: "M-Pesa where money moves",
        body: "Daraja integration done properly: STK push, C2B and B2C, callbacks that are idempotent, and reconciliation that stands up when a payment lands late or arrives twice.",
      },
      {
        title: "The back office behind it",
        body: "An app is the visible tenth. Underneath sits the API, the database, the admin dashboard your team uses, and the reporting that tells you what happened — all of which we build too.",
      },
    ],
    includes: [
      "Product definition",
      "UX & interface design",
      "Android & iOS build",
      "API & backend",
      "Admin dashboard",
      "Store submission",
    ],
    localAngle: {
      title: "The network is a design constraint, not an assumption",
      body: "Most app tutorials assume permanent connectivity and a recent iPhone. Neither holds for a delivery rider in Kiambu or a field officer in Nyeri. We treat intermittent connectivity, expensive data, and three-year-old Android hardware as the baseline the app must be good on — and where a full app is the wrong answer, we will tell you that a USSD flow or a well-built mobile site reaches more of your customers for less money.",
    },
    process: [
      {
        step: "01",
        title: "Define",
        body: "We map the workflow the app replaces and cut the first release to what genuinely matters. The biggest risk in app projects is building a year of features nobody asked for.",
      },
      {
        step: "02",
        title: "Design & prototype",
        body: "A clickable prototype you can hand to the people who will use it daily, before engineering starts. Their reaction changes the build — cheaply, at this stage.",
      },
      {
        step: "03",
        title: "Build",
        body: "Two-week cycles with something installable at the end of each, so you watch it take shape instead of waiting months for a reveal.",
      },
      {
        step: "04",
        title: "Launch & iterate",
        body: "Store submission, monitoring, and a first round of changes driven by what real usage reveals.",
      },
    ],
    pricing: {
      from: "KES 400,000",
      note: "A focused first release generally runs KES 400,000 to 1.5M depending on complexity, integrations, and whether both platforms are needed at launch. We will often recommend starting with one platform.",
    },
    faqs: [
      {
        question: "Do I need both Android and iOS?",
        answer:
          "Usually not at first. Android carries the overwhelming majority of the Kenyan market, so launching there and adding iOS once the product has proven itself is normally the better use of budget. We build with a shared codebase, so adding the second platform later is an increment rather than a second project.",
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
          "You do. Repositories, developer accounts, and infrastructure are all in your name, and we hand over full access at launch.",
      },
      {
        question: "Can it work with our existing systems?",
        answer:
          "Generally yes. We integrate with accounting packages, inventory systems, payment providers, and internal databases. Where a system has no API we will say plainly what is and is not possible rather than promising a bridge that will be fragile.",
      },
    ],
    showcase: {
      src: "/work/rj-mobile.png",
      alt: "R&J Interiors on a phone, with the real-time fabric selector filling the screen.",
    },
  },

  {
    slug: "ai-automation",
    index: "03",
    name: "AI & automation",
    headline: "AI that does the work, not the talking.",
    summary: "Put the repetitive work on autopilot — properly.",
    metaDescription:
      "AI integration and automation for Kenyan businesses. RAG assistants, document processing, and WhatsApp bots that handle real back-office work — built by engineers, measured on hours saved.",
    description:
      "Every business is being sold AI right now, and most of what is on offer is a chatbot bolted onto a website that irritates customers. The money is somewhere far less glamorous: the repetitive, rules-heavy work that quietly consumes your team's week.",
    problem:
      "Someone in your office retypes invoice details into a spreadsheet. Someone answers the same eleven questions on WhatsApp all day. Someone reconciles M-Pesa statements against orders by eye. None of it needs judgement, all of it needs doing, and every hour spent on it is an hour not spent on work that grows the business. Meanwhile the AI vendors circling you are quoting for a chatbot that will not touch any of it.",
    deliverables: [
      {
        title: "Assistants that actually know your business",
        body: "A general chatbot knows nothing about your prices, your policies, or your stock, so it invents them. We build retrieval-grounded assistants: the model answers from your own documents and data, cites what it used, and is built to say it does not know rather than produce a confident fabrication. That difference is the whole difference between useful and dangerous.",
      },
      {
        title: "Document and data processing",
        body: "Invoices, delivery notes, claim forms, statements, applications — read, extracted into structured data, and pushed into the system that needs them. This is usually the fastest return in the entire engagement, because the work is high volume, low judgement, and currently done by a person who would rather be doing something else.",
      },
      {
        title: "WhatsApp assistants that hold a real conversation",
        body: "WhatsApp is where Kenyan businesses actually meet customers. We build assistants that answer the routine questions around the clock, check an order, take a booking — and hand over to a human the moment the conversation stops being routine, which is the part most implementations get wrong.",
      },
      {
        title: "Agentic workflows for multi-step work",
        body: "Where a task spans several systems and several decisions — receive an order, verify stock, raise an invoice, notify the customer, update the ledger — we build agents that carry the whole sequence, with checkpoints where a human should still sign off.",
      },
      {
        title: "The unglamorous automation underneath",
        body: "Often the highest-value thing we do involves no model at all: connecting two systems that were passing data through a human being. We will always tell you when that is the cheaper answer.",
      },
    ],
    includes: [
      "Opportunity audit",
      "Proof of concept on your data",
      "RAG & assistant build",
      "Document processing",
      "WhatsApp & channel integration",
      "Monitoring & evaluation",
    ],
    localAngle: {
      title: "English, Swahili, and the way people actually type",
      body: "Kenyan customers do not write in clean English. They code-switch mid-sentence, mix Swahili and Sheng, abbreviate heavily, and send voice notes. An assistant tuned on tidy American support tickets falls apart on the first real message. We evaluate against your actual conversation history — the messy, misspelt, code-switched reality — and we would rather ship something narrow that works than something broad that embarrasses you in front of a customer.",
    },
    process: [
      {
        step: "01",
        title: "Find the expensive work",
        body: "We sit with your team and count: which tasks consume the most hours for the least judgement. The best candidate is almost never the one you expected, and it is rarely a chatbot.",
      },
      {
        step: "02",
        title: "Prove it on your data",
        body: "A narrow proof of concept on your real documents and real messages, measured against how the work is done today. If it does not clear that bar we say so and stop, rather than proceeding on enthusiasm.",
      },
      {
        step: "03",
        title: "Deploy narrow",
        body: "Into production on one workflow, with a human reviewing output at first. Trust is earned on a small surface before it is extended.",
      },
      {
        step: "04",
        title: "Measure and widen",
        body: "We track accuracy, hours saved, and running cost. What works expands; what does not gets switched off. This is the step vendors selling AI by the seat tend to skip.",
      },
    ],
    pricing: {
      from: "KES 150,000",
      note: "A scoped audit and a proof of concept on one workflow typically starts around KES 150,000. Full deployments are quoted after the proof, because until we have seen your data any number would be a guess — and running costs are quoted separately and honestly.",
    },
    faqs: [
      {
        question: "Is this going to replace my staff?",
        answer:
          "That is not what we build for, and in practice it is not what happens. The work best suited to automation is the work nobody wants: retyping, copying between systems, answering the same question for the ninth time. Teams we have automated for do not shrink; they stop spending their afternoons on data entry. If your goal is specifically headcount reduction, we are probably not the right partner.",
      },
      {
        question: "What happens when the AI gets something wrong?",
        answer:
          "It will, so the system is designed around that. Assistants are grounded in your documents and cite what they used, so an answer can be checked. Anything consequential — money, commitments, customer promises — routes to a human. And we monitor output in production rather than assuming launch-day accuracy holds.",
      },
      {
        question: "Is our data safe? Does it train someone else's model?",
        answer:
          "We use providers whose business terms exclude your data from training, and we tell you exactly which provider processes what. Where data is genuinely sensitive we can keep processing self-hosted so nothing leaves infrastructure you control. You get a plain-language summary of where your data goes — not a link to a privacy policy.",
      },
      {
        question: "Do we need a lot of data to start?",
        answer:
          "Less than people expect. Retrieval-based assistants work from the documents you already have — price lists, policies, past correspondence — with no training run required. If you have a shared drive and a WhatsApp history, you have enough to start.",
      },
      {
        question: "What does it cost to run each month?",
        answer:
          "It depends on volume, and we will model it against your real numbers before you commit. For most SME workloads the monthly cost is a small fraction of the labour it displaces. We would rather show you that arithmetic than talk about transformation.",
      },
      {
        question: "Can it handle Swahili?",
        answer:
          "Yes, including the mixed English-Swahili-Sheng that people actually write. We evaluate against your own message history rather than a clean benchmark, because that is the only test that predicts how it will behave with your customers.",
      },
      {
        question: "Everyone is selling us AI. Why should we believe you?",
        answer:
          "Because we will tell you when the answer is not AI. A good share of what we are asked for is better solved by connecting two systems properly, and we say so — it is a smaller invoice and a better outcome. Ask any vendor to show you the measurement plan before the build starts; that is the question the serious ones can answer.",
      },
    ],
    showcase: {
      src: "/work/rj-experience.png",
      alt: "The R&J studio entry screen, where colour selection happens before the customer walks into the 3D room.",
    },
  },

  {
    slug: "seo",
    index: "04",
    name: "SEO",
    headline: "Be the answer when Kenya searches for what you sell.",
    summary: "Get found by the customers already looking for you.",
    metaDescription:
      "SEO services in Kenya. Technical foundations, Google Business Profile, and local search that put you in front of customers already searching — measured on enquiries, not rankings.",
    description:
      "Somebody typed what you sell into Google this morning, in your town, ready to buy. They found a competitor. Search is the only channel where the customer arrives already wanting the thing — and unlike advertising, the position you build keeps working after you stop paying for it.",
    problem:
      "You rely on referrals and a Facebook page. It has carried you this far, but it does not scale and it does not compound — every month starts from zero. Somewhere a competitor with a worse product has a Google Business Profile with forty reviews and a site that loads in a second, and they are collecting the customers who searched instead of asking a friend. The gap is not talent or budget. It is that nobody has done the unglamorous work.",
    deliverables: [
      {
        title: "Technical foundations",
        body: "Everything that decides whether Google can crawl, understand, and trust your site: speed on mobile, crawlability, sitemaps and robots, structured data, canonicals, and the internal linking that tells search engines what matters. Nothing else works until this does.",
      },
      {
        title: "Google Business Profile and the local pack",
        body: "For a business serving a town or a county this is the single highest-leverage asset there is, and it sits mostly unclaimed. Correct categories, complete information, consistent name-address-phone across the web, real photographs, and a system for actually collecting reviews.",
      },
      {
        title: "Pages that answer real queries",
        body: "We research what your customers actually type — which is rarely the language you use internally — and build pages that answer those questions properly. One thorough page beats ten thin ones, every time.",
      },
      {
        title: "Content that compounds",
        body: "A publishing plan you can sustain, aimed at the questions asked just before someone buys. This is slow and it is the part most businesses abandon at month three, which is precisely why it works for the ones who do not.",
      },
      {
        title: "Measurement that means something",
        body: "Search Console and analytics configured to report enquiries and calls, not vanity rankings. A number-one position for a phrase nobody searches is not a result.",
      },
    ],
    includes: [
      "Technical audit",
      "Keyword & intent research",
      "On-page optimisation",
      "Google Business Profile",
      "Content plan",
      "Reporting",
    ],
    localAngle: {
      title: "Local intent is where the game is winnable",
      body: "Competing nationally for a broad commercial phrase is expensive and slow. Competing for the searches happening in Nyeri, Nanyuki, Thika, or a Nairobi suburb is neither, because most local competitors have never claimed their Google Business Profile, have no reviews, and run a site that fails on mobile. That is an open goal. We would rather put you first for the searches that end in a phone call from someone twenty minutes away than fortieth for a national term that would never have converted.",
    },
    process: [
      {
        step: "01",
        title: "Audit",
        body: "A full technical and content audit against the competitors actually outranking you, delivered as a prioritised list of what is costing you the most — yours to keep whether or not you continue with us.",
      },
      {
        step: "02",
        title: "Fix the foundations",
        body: "Speed, crawlability, structured data, and the on-page work. This is where most of the early movement comes from, because most sites are carrying obvious unforced errors.",
      },
      {
        step: "03",
        title: "Build presence",
        body: "Google Business Profile, local citations, review generation, and the first tranche of pages targeting the queries closest to a purchase.",
      },
      {
        step: "04",
        title: "Publish and measure",
        body: "Sustained content against the plan, reported monthly against enquiries. We show you the searches you gained and the ones you lost.",
      },
    ],
    pricing: {
      from: "KES 45,000",
      note: "A one-off technical and local audit starts at KES 45,000 and is yours regardless of what you do next. Ongoing engagements typically run KES 60,000–150,000 a month depending on competitiveness and how much content is involved.",
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
      src: "/work/datani-quote.png",
      alt: "The Datani quote page, structured around the cover types people actually search for.",
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
