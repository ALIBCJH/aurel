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
    index: "01",
    name: "Websites",
    seoTitle: "Website Design & Development in Kenya",
    headline: "Website design in Kenya that brings you customers",
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
    index: "02",
    name: "Mobile apps",
    seoTitle: "Mobile App Development in Kenya",
    headline: "Mobile app development in Kenya, built around your business",
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
      from: "KES 400,000",
      note: "A focused first release generally runs KES 400,000 to 1.5M depending on complexity, integrations, and whether both platforms are needed at launch. We will often recommend starting with one platform.",
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
      src: "/work/rj-home-phone.webp",
      alt: "R&J Interiors on a phone: the full-screen room preview, readable and usable on a handset.",
      portrait: true,
    },
  },

  {
    slug: "ai-automation",
    index: "03",
    name: "AI & automation",
    seoTitle: "AI & Automation for Kenyan Businesses",
    headline: "AI and automation for businesses in Kenya",
    summary: "Let software handle the repetitive work, properly.",
    metaDescription:
      "AI and automation for Kenyan businesses. Assistants that answer from your own documents, software that reads your paperwork, and WhatsApp helpers that do real office work — measured on hours saved.",
    description:
      "Everyone is being sold AI right now, and most of it is a chat window stuck onto a website that annoys customers. The real saving is somewhere much duller: the repeated, rule-following work that quietly eats your team's week.",
    problem:
      "Someone in your office retypes invoice details into a spreadsheet. Someone answers the same eleven questions on WhatsApp all day. Someone checks M-Pesa statements against orders by eye. None of it needs thinking, all of it needs doing, and every hour spent there is an hour not spent growing the business. Meanwhile the people selling you AI are quoting for a chat window that will not touch any of it.",
    deliverables: [
      {
        title: "An assistant that knows your business",
        body: "A general chat tool knows nothing about your prices, your rules or your stock, so it makes them up. We build assistants that answer only from your own documents and records, show you which document each answer came from, and say \"I do not know\" instead of inventing something. That is the difference between useful and dangerous.",
      },
      {
        title: "It reads your paperwork for you",
        body: "Invoices, delivery notes, claim forms, statements, applications — read automatically, turned into clean records, and sent straight into the system that needs them. This usually pays back fastest, because there is a lot of it, it needs no judgement, and right now a person is doing it who would rather be doing something else.",
      },
      {
        title: "WhatsApp assistants that actually help",
        body: "WhatsApp is where Kenyan businesses meet their customers. We build assistants that answer the everyday questions at any hour, check an order, or take a booking — and pass the chat to a real person the moment it stops being routine. That hand-over is the part most people get wrong.",
      },
      {
        title: "Software that handles a whole sequence",
        body: "Where a job runs across several systems and several steps — take an order, check stock, raise an invoice, tell the customer, update the books — we build something that carries the whole sequence, and stops for a person to approve it at the points that matter.",
      },
      {
        title: "The quiet fixes underneath",
        body: "Often the most valuable thing we do involves no AI at all: connecting two systems that were only talking to each other through a person. We will always tell you when that is the cheaper answer.",
      },
    ],
    includes: [
      "Finding what is worth automating",
      "A test on your own data",
      "An assistant that knows your business",
      "Reading your paperwork",
      "WhatsApp integration",
      "Checking it keeps working",
    ],
    localAngle: {
      title: "English, Swahili, and the way people actually type",
      body: "Kenyan customers do not write in tidy English. They switch language mid-sentence, mix Swahili and Sheng, shorten words heavily, and send voice notes. An assistant built on neat American support tickets falls apart on the first real message. We test ours against your own chat history — misspellings, mixed languages and all — and we would rather give you something narrow that works than something broad that embarrasses you in front of a customer.",
    },
    process: [
      {
        step: "01",
        title: "Find what is costing you time",
        body: "We sit with your team and count which tasks take the most hours and need the least thinking. The best one to start with is almost never the one you expected, and it is rarely a chat window.",
      },
      {
        step: "02",
        title: "Test it on your own data",
        body: "We build a small working test on your real documents and real messages, and compare it against how the job is done today. If it does not beat that, we say so and stop rather than carry on out of excitement.",
      },
      {
        step: "03",
        title: "Start with one job",
        body: "We put it to work on a single task, with someone from your team checking the results at first. It earns your trust on something small before it takes on anything more.",
      },
      {
        step: "04",
        title: "Check it works, then do more",
        body: "We track how accurate it is, how many hours it saves, and what it costs to run. What works we extend; what does not we switch off. This is the step most AI sellers skip.",
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
          "That is not what we build for, and it is not what happens in practice. The work best suited to this is the work nobody wants: retyping, copying between systems, answering the same question for the ninth time. Teams we have done this for do not get smaller; they stop losing their afternoons to data entry. If your aim is specifically to cut jobs, we are probably not the right people.",
      },
      {
        question: "What happens when the AI gets something wrong?",
        answer:
          "It will, so we design for it. Every answer comes from your documents and shows which one it used, so it can be checked. Anything that matters — money, promises, commitments to a customer — goes to a person first. And we keep watching it after launch instead of assuming it stays accurate.",
      },
      {
        question: "Is our data safe? Does it train someone else's model?",
        answer:
          "We use providers whose terms say plainly that your data is not used to train their systems, and we tell you exactly which one handles what. Where the information is truly sensitive we can keep everything on servers you control, so nothing leaves your hands. You get a plain summary of where your data goes, not a link to a privacy policy.",
      },
      {
        question: "Do we need a lot of data to start?",
        answer:
          "Less than people expect. These assistants work straight from the documents you already have — price lists, policies, past emails — with no lengthy setup. If you have a shared folder and a WhatsApp history, you have enough to start.",
      },
      {
        question: "What does it cost to run each month?",
        answer:
          "It depends on how much you run through it, and we will work it out against your real numbers before you commit. For most small and medium businesses the monthly cost is a small fraction of the time it saves. We would rather show you those figures than talk in big words.",
      },
      {
        question: "Can it handle Swahili?",
        answer:
          "Yes, including the mixed English-Swahili-Sheng that people actually write. We evaluate against your own message history rather than a clean benchmark, because that is the only test that predicts how it will behave with your customers.",
      },
      {
        question: "Everyone is selling us AI. Why should we believe you?",
        answer:
          "Because we will tell you when the answer is not AI. A good share of what we are asked for is better solved by connecting two systems properly, and we say so — it is a smaller bill and a better result. Ask anyone selling to you how they will measure it before the work starts. The serious ones can answer that.",
      },
    ],
    showcase: {
      // The honest weak spot on this page. Nothing we have shipped is a
      // picture of automation, so this is the nearest true thing: a live
      // system of ours doing real work in the browser as you use it. The alt
      // text says exactly what it is and does not imply it is an AI product.
      src: "/work/rj-experience.webp",
      alt: "The R&J experience page we built, headed 'Step Inside' — a room a customer can walk through before a single curtain is made.",
    },
  },

  {
    slug: "seo",
    index: "04",
    name: "SEO",
    seoTitle: "SEO Services in Kenya",
    headline: "SEO services in Kenya that bring you customers",
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
      src: "/work/datani-motor.webp",
      alt: "Datani's motor insurance page — one page per product, written around what people search for: private cars, matatus, lorries and fleets.",
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
