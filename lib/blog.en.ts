/**
 * Artículos del blog en inglés. Se indexan por slug (el mismo en los dos
 * idiomas): de cada post del español sólo se reescriben título, entradilla y
 * categoría; imagen, autor y fecha se heredan (lib/content.en.ts). El cuerpo
 * está en lib/articles.en.ts.
 */
import type { BlogItem } from "./blog";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "28/10/2026" → "October 28, 2026". */
export const dateEn = (dmy: string) => {
  const [d, m, y] = dmy.split("/").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
};

export const categoryEn: Record<string, string> = {
  Branding: "Branding",
  "Experiencia digital": "Digital experience",
  "Producto digital": "Digital product",
};

export const postTexts: Record<string, Required<Pick<BlogItem, "title" | "lead">>> = {
  "grupo-tinbet-marca-para-un-holding-multisector": {
    title: "Grupo Tinbet: designing the brand of a holding with three industries",
    lead: "Entertainment, investments and security under one signature: how we designed Grupo Tinbet's identity and website so three businesses speak as one.",
  },
  "afiliados-tinbet-landing-que-convierte-audiencias-en-socios": {
    title: "Tinbet Affiliates: anatomy of a landing page that turns audiences into partners",
    lead: "A clear value proposition, commissions you understand at a glance and a fast, accessible experience: how we designed the Tinbet affiliate landing page.",
  },
  "peruana-en-rusia-de-la-asesoria-a-la-postulacion-guiada": {
    title: "Peruana en Rusia: from a scholarship advisory to a guided online application",
    lead: "A brand that conveys a safe crossing, a site that answers questions and a portal that supports every step: how we took a study-in-Russia advisory online.",
  },
  "sunqu-journeys-una-marca-de-viajes-que-nace-del-corazon": {
    title: "Sunqu Journeys: a travel brand born from the heart",
    lead: "Sunqu means heart in Quechua. How we designed the brand and website of an experiential travel agency that invites you to discover Peru through emotion.",
  },
  "tuku-travel-fichas-de-tour-que-se-entienden-y-se-reservan": {
    title: "Tuku Travel: designing a tour page that's easy to understand and to book",
    lead: "In travel, the sale is decided on the tour page. How we designed it for Tuku Travel's e-commerce: a gallery, a clear itinerary and online booking.",
  },
  "kingbuilder-branding-industrial-para-la-mineria": {
    title: "KingBuilder: industrial branding for a mining technology builder",
    lead: "“Smart systems, indestructible works.” How we designed KingBuilder's identity and website so the brand conveys the same solidity as its projects.",
  },
  "tec-seg-una-marca-de-seguridad-que-se-ve-en-la-obra": {
    title: "TEC & SEG: a security brand you can see on the construction site",
    lead: "A shield with a watchful feline, high-visibility yellow and a system built for fleet, uniforms and web: how we designed the TEC & SEG brand.",
  },
  "eusebio-arroniz-una-web-escolar-pensada-para-las-familias": {
    title: "Eusebio Arróniz: a school website designed around families' questions",
    lead: "Admissions, methods by level, announcements and support channels: how we designed the web experience of Eusebio Arróniz School for desktop and mobile.",
  },
  "zenity-finanzas-de-negocio-explicadas-con-ia": {
    title: "Zenity: your business finances in one place, explained with AI",
    lead: "Accounts, wallets and files in one consolidated balance, with an assistant that explains it in seconds: how we designed Zenity, our fintech prototype.",
  },
};
