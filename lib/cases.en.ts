/**
 * Detalle de los casos en inglés, por slug (ver lib/cases.ts): sólo los
 * textos; imágenes, paleta y fondos se heredan del español. `alts` va en el
 * orden de las imágenes de la galería.
 */
import type { CaseTexts } from "./cases";

export const caseTexts: Record<string, CaseTexts> = {
  "grupo-tinbet": {
    status: "Brand and website live",
    intro:
      "Grupo Tinbet brings together entertainment, investment and security companies in Peru. We gave it a shared identity and a corporate website that presents its three verticals with a single voice.",
    challenge:
      "Three businesses with different audiences, rhythms and languages had to be recognized as one group without any of them losing its personality. And the website had to speak to partners, authorities, talent and the press at the same time.",
    approach:
      "We designed a system before a logo: a symbol made of shapes that meet at a central point, a family of corporate greens and one color per vertical. On the website, that code becomes navigation: each vertical and each audience has its own path.",
    facts: [
      { value: "3", label: "verticals under one brand: entertainment, investments and security" },
      { value: "5", label: "site sections: home, works for taxes, business areas, talent and news" },
      { value: "2026", label: "brand manual, with its corporate applications" },
    ],
    scope: [
      ["Concept", "Symbol and logotype", "Brand manual", "Applications"],
      ["UX/UI", "Web design", "Development", "Responsive"],
    ],
    tagline: "Connecting industries, creating value.",
    alts: [
      "The Works for Taxes page on grupotinbet.pe",
      "The Works for Taxes section on mobile",
      "Grupo Tinbet corporate folder",
      "Public works billboard with the Grupo Tinbet brand",
    ],
  },

  "afiliados-tinbet": {
    status: "Landing page live",
    intro:
      "Tinbet's affiliate program needed a page that explained in seconds how much you earn, how you get paid and how to get started. We designed and built a landing page for creators, communities and media.",
    challenge:
      "People who land on an affiliate program come to evaluate a business: they want to know how much they can earn, how they get paid and what support they'll have, without reading a rulebook. And since it's a betting brand, everything had to be communicated responsibly.",
    approach:
      "We put the value proposition up front —Rev Share of up to 50% and CPA— and explained it with tiered commissions and an animated gauge for each tier. We added the affiliate dashboard, the influencer program, the FAQ and the 18+ responsible gaming notice.",
    facts: [
      { value: "50%", label: "maximum Rev Share, plus a CPA of up to S/ 600" },
      { value: "6", label: "commission tiers, from 20% to 50%" },
      { value: "77 KB", label: "is what an image that used to weigh 1 MB weighs now, thanks to AVIF" },
    ],
    scope: [["UX/UI", "Conversion copy", "Web development", "Responsive"]],
    tagline: "Turn your audience into recurring income.",
    alts: [
      "Commission curve by tier, with the 20% of NGR gauge",
      "Tiered commission table on mobile",
      "The affiliate dashboard: monthly summary, trends and commissions by channel",
    ],
  },

  "peruana-en-rusia": {
    status: "Brand and website live",
    intro:
      "Peruana en Rusia guides Peruvian students who want to study at Russian universities on a scholarship. We created its brand and a website that supports every step, from the first question to the day they fly.",
    challenge:
      "Applying for a scholarship abroad mixes hope and fear: choosing a university and a city, gathering documents, signing a contract, getting a visa and planning the trip. The brand and the website had to convey the same trust as the advisory itself.",
    approach:
      "The symbol comes from the stripes of a zebra crossing: a safe crossing into a new stage. On the website we organized the content around an applicant's real questions —universities, success stories, talks— and designed a student portal with the process step by step.",
    facts: [
      { value: "9", label: "partner universities, each with its own page and brochure" },
      { value: "6", label: "Russian cities to study in" },
      { value: "5", label: "guided stages in the portal: details, documents, contract, visa and travel" },
    ],
    scope: [
      ["Concept", "Symbol and logotype", "Brand manual", "Applications"],
      ["UX/UI", "Web design and development", "Digital assets"],
    ],
    tagline: "Your future, without borders.",
    alts: [
      "Partner universities on peruanaenrusia.com, filtered by city",
      "Partner universities on mobile",
      "Peruana en Rusia social media pieces",
      "The brand on an event screen",
    ],
  },

  "sunqu-journeys": {
    status: "Brand created · website in preview",
    intro:
      "Sunqu means heart in Quechua. It's an experiential travel agency with local hosts, and we gave it a brand and a website that invite people to discover Peru through emotion.",
    challenge:
      "Travel brands usually compete with the same image: a landscape and a price. Sunqu wanted to tell a different story, summed up in its manifesto: Peru is not a destination, it's a relationship.",
    approach:
      "The symbol merges a heart, a GPS pin and a plane with strokes inspired by Peruvian iconography; that geometry gives rise to an Andean pattern that dresses the fleet, the merchandise and social media. On the website, trips are chosen by emotion and each journey is told before its fact sheet is shown.",
    facts: [
      { value: "3", label: "emotions to choose a trip by: history, flavor and people" },
      { value: "8 to 10", label: "days per journey, with local hosts" },
      { value: "AA", label: "WCAG 2.2 accessibility level of the website" },
    ],
    scope: [
      ["Brand strategy", "Symbol and logotype", "Manual", "Applications"],
      ["Strategy", "UX/UI", "Web development", "Content"],
    ],
    tagline: "Travel to the heart of Peru.",
    alts: [
      "Journeys chosen by emotion: “How do you want to feel Peru?”",
      "Ways to travel with Sunqu on mobile",
      "T-shirt with Sunqu's Andean pattern",
    ],
  },

  "tuku-travel": {
    status: "E-commerce live",
    intro:
      "Tuku Travel sells tours across Peru and the world. We designed and built its WordPress e-commerce site so every tour can be discovered, understood and booked online.",
    challenge:
      "In travel, the sale is decided on the tour page: that's where travelers compare, hesitate and, if they find what they're looking for, book. Every tour page had to answer the basics without making anyone write in to ask.",
    approach:
      "We organized each tour from emotion to detail: gallery, highlights, day-by-day itinerary and included services in tabs, with the price per adult, the date and the travelers always in view. The catalog can be browsed by destination or by type of experience, and a promotional wheel powers the campaigns.",
    facts: [
      { value: "3", label: "tabs per tour: overview, itinerary and included services" },
      { value: "Online", label: "booking with date, travelers and total before paying" },
      { value: "2", label: "ways to explore the catalog: by destination or by type of experience" },
    ],
    scope: [["UX/UI", "Web design and development", "Tour e-commerce"]],
    tagline: "Travel and enjoy the best of Peru and the world.",
    alts: [
      "The Rainbow Mountain tour page on tukutravel.com",
      "Tour page with highlights and booking on mobile",
      "Featured cities in the Tuku Travel catalog",
    ],
  },

  kingbuilder: {
    status: "Brand created · website designed, launching soon",
    intro:
      "KingBuilder builds and implements technology for the mining industry. We gave it a sober identity and a corporate website that presents its offer as a technical catalog.",
    challenge:
      "In construction and mining, trust is earned with facts. The brand had to convey the same solidity as its projects, and the website had to help an operations or procurement team quickly find what it needs.",
    approach:
      "We created a K made of parallel lines that reads as a letter and as a blueprint, with a mineral palette: Structural Black, Sand White, Copper Sand and Monolith Brown. On the website we organized the offer the way major machinery manufacturers do: solution lines, technical sheets, a filterable catalog and a clear quote request path.",
    facts: [
      { value: "6", label: "solution lines on the website" },
      { value: "4", label: "brand colors, all taken from the materials" },
      { value: "2", label: "measurement systems on every technical sheet: metric and US" },
    ],
    scope: [
      ["Concept", "Logotype", "Brand guidelines", "Stationery", "Digital"],
      ["UX/UI", "Web development", "Solutions catalog", "Responsive"],
    ],
    tagline: "Smart systems, indestructible works.",
    alts: [
      "Solutions catalog with filters by line, application and type",
      "Technical sheet for the KB-75K water truck on mobile",
      "KingBuilder business card",
      "The six solution lines: “Everything your operation needs, from the site to the network”",
    ],
  },

  "tec-seg": {
    status: "Brand and web look & feel",
    intro:
      "TEC & SEG protects public and private construction sites. We designed its brand and the application system it uses on the street, on site and online.",
    challenge:
      "A security company introduces itself on the street: its brand travels on pickups, uniforms and credentials, and it has to be recognizable from afar, day and night, in the dust of a construction site.",
    approach:
      "A shield with a watchful feline sums up protection, discipline and constant attention. High-visibility yellow with black guarantees contrast in any environment, and we took it to the fleet, the uniforms, the stationery, the credentials and a responsive web look & feel.",
    facts: [
      { value: "4", label: "services: physical security, escort, electronic security and consulting" },
      { value: "5", label: "applications: fleet, uniforms, stationery, credentials and web" },
      { value: "2", label: "brand colors: high-visibility yellow and black" },
    ],
    scope: [
      ["Concept", "Responsive logotype", "Symbol", "Typography", "Brand guidelines"],
      ["Stationery", "Fleet and uniforms", "Web look & feel"],
    ],
    tagline: "We protect what you value most.",
    alts: [
      "Stationery, credentials and notebook with the brand",
      "The symbol: a shield with a watchful feline",
      "Web look & feel on a laptop and a monitor",
    ],
  },

  "iep-eusebio-arroniz": {
    status: "UX/UI design in Figma",
    intro:
      "For many families, a school's website is their first visit to the school. We designed the experience of IEP Eusebio Arróniz's institutional website, for desktop and mobile, around the questions families ask most.",
    challenge:
      "Before booking an appointment, families search from their phones how the school teaches, which levels it offers, how admissions work and what other parents think. If the website doesn't answer, they keep looking.",
    approach:
      "We organized the content around who arrives, not around the org chart: admissions with a direct path, teaching methods by level with their ages, announcements, testimonials, FAQ and the official complaints book. Every screen has a desktop and a mobile version.",
    facts: [
      { value: "3", label: "levels with their own teaching method: early years, primary and secondary" },
      { value: "2", label: "versions of every screen: desktop and mobile" },
      { value: "Figma", label: "clickable prototype to validate the journey" },
    ],
    scope: [["Information architecture", "Desktop & mobile UI", "Prototype"]],
    tagline: "Mens sana in corpore sano.",
    alts: [
      "Teaching methods by level on the school's website",
      "The home page on mobile, with a direct link to Admissions",
      "“A learning path”: the school's educational approach",
    ],
  },

  zenity: {
    status: "In-house product prototype",
    intro:
      "Zenity is a Wuality fintech product concept: an app that lets a business owner see their finances in one place and understand them with the help of AI.",
    challenge:
      "Many small and medium-sized business owners have their information scattered across several banks, wallets like Yape and Plin, payment gateways and spreadsheets. Knowing how much came in, how much went out and how much is left can take hours.",
    approach:
      "We started from the questions the app had to answer in seconds and built the home screen around them. We designed the connections to banks, wallets, APIs and files, the reconciliation of duplicated transactions and an assistant that explains the balance in plain language, in a mobile-first clickable prototype.",
    facts: [
      { value: "3", label: "questions it answers in seconds: how much came in, how much went out and how much is left" },
      { value: "4", label: "types of connection: banks, wallets, APIs and files" },
      { value: "AI", label: "summaries and an assistant that explains the balance" },
    ],
    scope: [["Product strategy", "Information architecture", "App UX/UI", "Design system"]],
    alts: [
      "Balance summary with the “Explain this balance” assistant",
      "Income by account, with balance, income and expenses",
    ],
  },
};
