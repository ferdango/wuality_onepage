/**
 * Contenido en inglés. Tiene la misma forma que content.ts (lib/i18n.ts lo
 * comprueba con el tipo `Content`): de cada bloque sólo se reescriben los
 * textos, y imágenes, colores, posiciones y enlaces se heredan del español para
 * no mantenerlos dos veces.
 *
 * Los nombres propios (marcas, servicios como "Brand Identity", el lema
 * "Imagine. Create. Develop. Together.") quedan igual en los dos idiomas.
 */
import * as es from "./content";
import type { NavItem } from "./content";
import { categoryEn, dateEn, postTexts } from "./blog.en";

/** Copia los elementos del español sustituyendo sólo los campos de texto. */
function withTexts<T extends object>(base: readonly T[], texts: Partial<T>[]): T[] {
  if (texts.length !== base.length) throw new Error("content.en: falta o sobra una traducción");
  return base.map((item, i) => ({ ...item, ...texts[i] }));
}

const navItems: NavItem[] = [
  { label: "About Wuality", short: "About", href: "#edu" },
  { label: "Work", short: "Work", href: "#work" },
  { label: "Services", short: "Services", href: "#services" },
  { label: "Reviews", short: "Reviews", href: "#reviews" },
  { label: "Blog", short: "Blog", href: "#blog" },
];

// Cada idioma se nombra en su propia lengua, así que la lista es la misma.
export const languages = es.languages;

export const hero = {
  headline: "We are Wuality, your Digital Transformation Partner",
  words: ["We innovate", "We connect"],
};

export const services = withTexts(es.services, [
  {
    items: "Culture / Visual communication / Identity / Value proposition",
    alt: "Identities created by Wuality: the Grupo Tinbet symbol, a Sunqu Journeys T-shirt, the KingBuilder emblem, the TEC & SEG shield and pickup, and the Peruana en Rusia logo",
  },
  {
    items: "UX/UI / Product management / Front-end / Back-end / Apps",
    alt: "Mobile websites designed by Wuality for Tuku Travel, Peruana en Rusia, Grupo Tinbet, Sunqu Journeys and KingBuilder",
  },
  {
    items: "Accessibility / Customer journey / Research / Trends",
    alt: "Screens from Zenity, Wuality's fintech prototype: a consolidated balance, income and expenses per account, and an AI assistant that explains the balance",
  },
  {
    items: "SEM / SEO / Paid social / Display / Video / Native",
    alt: "Wuality campaigns: a Peruana en Rusia billboard and event, a Grupo Tinbet event, and social posts for Grupo Tinbet, Sunqu Journeys and Peruana en Rusia",
  },
]);

export const projects = withTexts(es.projects, [
  {
    headline: "A corporate website worthy of a multi-sector group",
    sector: "Corporate holding",
    tags: ["Branding", "Web Design", "Web Development"],
    chapters: [
      {
        title: "Branding",
        body: "Identity system for a Peruvian holding that brings together iGaming, construction and investment: symbol, logotype, a multi-sector palette and corporate applications.",
      },
      {
        title: "Web design and development",
        body: "A website that connects the group's three verticals —entertainment, investments and security— with sections on Works for Taxes, principles, people and talent, and news.",
      },
    ],
  },
  {
    headline: "A landing page that turns audiences into business partners",
    sector: "Gaming & entertainment",
    tags: ["UX/UI", "Conversion copy", "Web Development"],
    chapters: [
      {
        title: "UX/UI and web development",
        body: "Design and development of the affiliate program website: a clear value proposition (Rev Share up to 50% and CPA up to S/ 600), tiered commissions, an affiliate dashboard and an influencer program.",
      },
    ],
  },
  {
    headline: "From the dream of studying abroad to a guided application",
    sector: "International education",
    tags: ["Branding", "Web Design", "Digital assets"],
    chapters: [
      {
        title: "Branding",
        body: "Identity for a scholarship advisory service in Russia. The symbol is born from zebra-crossing lines: a safe crossing into a new chapter. It includes the compact Pe·Ru version, 3D assets and applications.",
      },
      {
        title: "Web design and development",
        body: "A website to attract scholarship applicants: an introduction video, step-by-step guidance, success stories and universities, plus digital pieces for campaigns.",
      },
    ],
  },
  {
    headline: "Peru is not a destination. It's a relationship",
    sector: "Experiential travel",
    tags: ["Branding", "Strategy", "Web Development"],
    chapters: [
      {
        title: "Branding",
        body: "Brand for an experiential travel agency. The symbol fuses a heart, a GPS pin and a plane with straight shapes inspired by Peruvian iconography; the Andean pattern brings the fleet, merchandise and social media to life.",
      },
      {
        title: "Web design and development",
        body: "A web experience with brand storytelling and a journey selector by emotion —history, flavor, people— for tailor-made trips with local hosts.",
      },
    ],
  },
  {
    headline: "Tours you can discover, understand and book",
    sector: "Tourism",
    tags: ["Web Design", "Web Development", "Tour e-commerce"],
    chapters: [
      {
        title: "Web design and development",
        body: "Tour pages with a gallery, highlights, a day-by-day itinerary, included services and a per-adult price with online booking; plus destinations and itineraries by type of experience.",
      },
    ],
  },
  {
    headline: "A technical catalog that sells authority",
    sector: "Construction & mining",
    tags: ["Branding", "Web Design", "Web Development"],
    chapters: [
      {
        title: "Branding",
        body: "Identity for a mining-technology construction company: a K made of parallel lines that expresses structure and engineering, a palette of structural black, sand white, copper sand and monolith brown, and a print and digital system.",
      },
      {
        title: "Web design and development",
        body: "A corporate website with six solution lines, featured products with technical sheets, an end-to-end way of working, application environments and a clear path to a quote.",
      },
    ],
  },
  {
    headline: "A brand that shows up on site, on the street and online",
    sector: "Construction site security",
    tags: ["Branding", "Applications", "Web look & feel"],
    chapters: [
      {
        title: "Branding",
        body: "Brand for a security company specializing in public and private construction works. A shield with a watchful feline sums up protection, discipline and trust.",
      },
      {
        title: "Applications",
        body: "Applications system: vehicle fleet, uniforms, corporate stationery, credentials and a responsive web look & feel to present physical security, escort, electronic security and consulting services.",
      },
    ],
  },
  {
    headline: "A school website designed for families",
    sector: "School education",
    tags: ["UX/UI", "Information architecture", "Prototype"],
    chapters: [
      {
        title: "UX/UI web",
        body: "UX/UI design of the institutional website in Figma: admissions, teaching methods by level —preschool, primary and secondary—, announcements, testimonials, FAQs and complaints book, in desktop and mobile versions.",
      },
    ],
  },
  {
    headline: "Connect your finances in one place",
    sector: "Fintech",
    tags: ["Product Design", "App UX/UI", "Design system"],
    chapters: [
      {
        title: "Product design",
        body: "A business app that brings accounts, cards and API connections together in a consolidated balance, with income and expenses per account, AI-generated daily summaries and a conversational assistant.",
      },
    ],
  },
]);

export const partners = es.partners;

export const methodology = withTexts(es.methodology, [
  {
    title: "User-centric design",
    body: "We put your users at the center of everything we create.",
  },
  {
    tag: "Ceremonies, Meetings",
    title: "Constant feedback",
    body: "Your feedback is the engine of what we create.",
  },
  {
    title: "Agile management",
    body: "With our agile management, we turn uncertainty into fast, visible results.",
  },
  {
    title: "Continuous improvement",
    body: "The digital world evolves, and your product should stay at the cutting edge too.",
  },
]);

/** Testimonios en inglés, por caso (ver los borradores en content.ts). */
const testimonialsEn: Record<string, { role: string; quote: string }> = {
  "grupo-tinbet": {
    role: "CEO, Grupo Tinbet",
    quote:
      "“We needed three very different businesses to present themselves as one group without losing their personality. Wuality solved it with a clear brand system and a website we now use to talk to partners, authorities and talent. They understood the business before designing a single piece.”",
  },
  "afiliados-tinbet": {
    role: "CEO, Tinbet",
    quote:
      "“We wanted a creator to understand our affiliate program in seconds, and that's what the landing page achieves: clear commissions, simple steps and zero fine print. Wuality took care of every detail, from loading speed to the responsible gaming notice.”",
  },
  "peruana-en-rusia": {
    role: "Founder & CEO, Peruana en Rusia",
    quote:
      "“Guiding a student from their first question to the day they fly used to be a chain of emails and chats. With the portal Wuality designed, every applicant knows which step they're on and our team approves each stage from one place. And the brand conveys exactly who we are: a safe crossing.”",
  },
  "sunqu-journeys": {
    role: "CEO, Sunqu Journeys",
    quote:
      "“We didn't want to sell packages; we wanted to tell Peru's story through emotion. Wuality turned that idea into a symbol, a pattern and a website where every traveler chooses their trip by what they want to feel. Everything tells the same story, from the fleet to the screen.”",
  },
  "tuku-travel": {
    role: "CEO, Tuku Travel",
    quote:
      "“Our customers now find everything before booking: photos, a day-by-day itinerary, what's included and how much it costs. Wuality organized our catalog and gave us an online store we update ourselves, with a promotional wheel that brings our campaigns to life.”",
  },
  kingbuilder: {
    role: "CEO, KingBuilder",
    quote:
      "“In mining, trust is everything, and our brand had to convey the same solidity as our projects. Wuality understood the sector from day one: a sober identity, an organized technical catalog and a clear quote path for our clients.”",
  },
  "tec-seg": {
    role: "CEO, TEC & SEG",
    quote:
      "“Our brand lives on the street: on our pickups, on our uniforms, at the gate of every site. Wuality designed a system that's recognizable from afar and that the team wears with pride. The shield with the feline is now part of how our clients see us.”",
  },
  "iep-eusebio-arroniz": {
    role: "Head of School, IEP Eusebio Arróniz",
    quote:
      "“Families always asked us the same questions: how admissions work, how we teach at each level, how to reach the school. Wuality designed a website that answers them clearly and with the warmth we want to convey as a school community.”",
  },
};

export const reviews = {
  ...es.reviews,
  title: "What our clients say",
  subtitle: "The people who lead the brands we work with share what building with Wuality was like.",
  draft: "Draft · pending approval",
  pendingName: "Name to be confirmed",
  items: es.reviews.items.map((t) => {
    const texts = testimonialsEn[t.project];
    if (!texts) throw new Error(`content.en: falta la traducción del testimonio de ${t.project}`);
    return { ...t, ...texts };
  }),
};

export const nav: NavItem[] = navItems.filter((n) => n.href !== "#reviews" || reviews.items.length > 0);

export const clients = es.clients;

/** "Two models / only one effect" es el titular original del Figma en inglés. */
export const models = {
  line1: "Two models",
  line2: "only one effect",
  fit: 6,
  cards: withTexts(es.models.cards, [
    {
      body: "We become your extended digital team: an ongoing roadmap with priorities that adapt to your business.",
      cta: "Learn more",
    },
    {
      body: "A defined scope, with schedule, deliverables and investment agreed from the start.",
      cta: "Learn more",
    },
  ]),
};

export const social = {
  ...es.social,
  title: "Latest posts",
  lead: "The latest from Wuality on TikTok and Instagram.",
  profiles: withTexts(es.social.profiles, [
    {
      bio: "We're a team with all the energy to boost businesses ⚡⚡",
      cta: "Follow on TikTok",
      soon: "First videos, coming soon",
    },
    {
      bio: "Creators of digital paths to success",
      cta: "Follow on Instagram",
      soon: "First posts, coming soon",
    },
  ]),
  consent: {
    body: "This post loads from {red}, which uses its own cookies.",
    load: "Show here",
    open: "Open on {red}",
  },
};

export const faq = {
  title: "Frequently asked questions",
  cta: { label: "Still have questions?", button: "Book a meeting" },
  items: [
    {
      q: "What kind of projects does Wuality develop?",
      a: "We work on digital transformation projects that combine strategy, design, technology and growth. We can help you from building a brand or a digital product to developing platforms, apps, SEO strategies, paid media and AI-powered solutions.",
    },
    {
      q: "How do you work with new clients?",
      a: "First we get to know your business, goals and needs. Based on that diagnosis we define the most suitable scope, team and methodology for the project, with constant communication and feedback throughout the process.",
    },
    {
      q: "Do you work per project or as a long-term partner?",
      a: "Both. We can deliver a project with a defined scope and deliverables, or join you as a strategic partner to support the ongoing evolution of your product, brand or digital business.",
    },
    {
      q: "How can I start a project with Wuality?",
      a: "Tell us what you want to achieve, what problem you need to solve and what stage your project is at. We'll schedule a first meeting to understand the challenge and define the next step with you.",
    },
  ],
};

export const dialCodes = withTexts(es.dialCodes, [
  { name: "Peru" },
  { name: "Chile" },
  { name: "Colombia" },
  { name: "Ecuador" },
  { name: "Bolivia" },
  { name: "Argentina" },
  { name: "Mexico" },
  { name: "United States" },
  { name: "Spain" },
]);

export const meeting = {
  ...es.meeting,
  title: "Book a meeting",
  subtitle: "Choose a platform for our first meeting",
};

/** Cada post del español con sus textos en inglés (lib/blog.en.ts); imagen, autor y fecha se heredan. */
export const blog = {
  title: "What you need to know to go further",
  items: es.blog.items.map((item) => {
    const texts = postTexts[item.slug];
    if (!texts) throw new Error(`content.en: falta la traducción del post ${item.slug}`);
    return {
      ...item,
      ...texts,
      date: dateEn(item.publishedAt),
      category: categoryEn[item.category] ?? item.category,
      ...(item.cta && { cta: "Read article" }),
    };
  }),
  share: "Share",
  next: "Next article",
  related: "More ideas for you",
};

export const footer = {
  ...es.footer,
  name: "Wuality: Innovation & Technology Agency",
  legal: "Wuality Agency © {year} All rights reserved",
  cookies: "Cookies",
  privacy: "Privacy",
};

export const chat = {
  ...es.chat,
  question: "Have a project in mind? Let's talk.",
  cta: "Start chat",
};

export const cookies = {
  body: "We use your browser's storage so the site works and remembers your choice. If you accept, we'll also load the TikTok and Instagram posts, which may use their own cookies.",
  accept: "Accept",
  reject: "Reject",
};

export const ui: typeof es.ui = {
  header: { home: "Wuality — home", openMenu: "Open menu", language: "Language and region", skip: "Skip to content" },
  menu: { label: "Main menu", close: "Close menu" },
  hero: { screen: "Lock screen with the Wuality brand wallpaper", date: "Tuesday, 31 July" },
  services: { title: "What we do", cta: "Get in touch" },
  projects: { title: "Our work", open: "See the {name} case" },
  partners: { title: "Digital partners", label: "Wuality's digital partners" },
  methodology: {
    title: "How do we do it?",
    cycle: "Wuality's iterative work cycle. Drag it or use the arrow keys to rotate it.",
  },
  reviews: { label: "Client reviews" },
  blog: {
    label: "Wuality articles and episodes",
    related: "Related articles",
    shareOn: "Share on {red}",
    watch: "Watch the video: {title}",
    youtube: "YouTube",
    readingTime: "{min} min read",
    read: "Read: {title}",
  },
  social: {
    rail: "Latest posts on TikTok and Instagram",
    post: "{handle} post on {red}",
    prev: "Previous posts",
    next: "Next posts",
  },
  carousel: { role: "carousel", slide: "{n} of {total}", goTo: "Go to slide {n}", pause: "Pause the carousel", play: "Resume the carousel" },
  caseStudy: { services: "Services", client: "Client", sector: "Industry", web: "Website", next: "Next case" },
  meeting: {
    platform: "Meeting platform",
    continue: "Continue",
    back: "back",
    dial: "Country code",
    name: "Full name",
    phone: "Mobile number",
    email: "Email",
    date: "Meeting date",
    time: "Meeting time",
    hintMeet: "We'll open Google Calendar with the meeting ready to save.",
    hintZoom: "We'll send the Zoom link to your email.",
    hintZone: "Time in your time zone.",
    privacy: "I have read and accept the Privacy and Data Protection Policy*",
    privacyError: "Please accept the Privacy Policy to continue.",
    sendError: "We couldn't send your request. Email us at {inbox} and we'll schedule it with you.",
    sending: "Sending…",
    submitMeet: "Schedule in Google Calendar",
    submitZoom: "I want a meeting",
    bookingTitle: "Book a meeting with Wuality in Google Calendar",
    bookingOpen: "Open the booking page in Google Calendar",
    done: "All set!",
    doneMeet: "We opened Google Calendar with the meeting on {date} at {time}. Save it so we receive the invitation.",
    openCalendar: "Open Google Calendar",
    doneZoom: "We received your request for {date} at {time}. We'll send the Zoom link to {email}.",
    again: "Book another",
    eventTitle: "Meeting with Wuality — {name}",
    eventDetails: "First meeting requested from the Wuality website.",
    eventName: "Name",
    eventPhone: "Mobile",
    eventEmail: "Email",
    dateLocale: "en",
  },
  floating: {
    cookies: "Cookie preferences",
    banner: "Cookie notice",
    whatsapp: "Message us on WhatsApp at {phone}",
    saved: "Preference saved: {choice}.",
    accepted: "accepted",
    rejected: "rejected",
  },
};
