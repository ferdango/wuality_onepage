import type { Metadata } from "next";
import { blog, chat, faq, footer, projects, social, type BlogItem } from "./content";

type Project = (typeof projects)[number];

/**
 * Datos del sitio para SEO: metadatos, Open Graph, sitemap y datos
 * estructurados (schema.org).
 *
 * `url` es el origen público con el que se construyen canonicals, `og:url` y
 * el sitemap. Por defecto es GitHub Pages; para publicar en otro dominio (por
 * ejemplo wuality.agency) basta con definir NEXT_PUBLIC_SITE_URL en el build.
 * El basePath no hay que repetirlo: Next lo toma del `pathname` de
 * `metadataBase` y lo antepone a cada ruta relativa.
 */
export const site = {
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ferdango.github.io/wuality_onepage").replace(/\/+$/, ""),
  name: "Wuality",
  legalName: "WUALITY S.A.C.",
  /** Lema de marca (manual de identidad y dossier comercial). */
  slogan: "Innovación que conecta",
  title: "Wuality — Agencia de transformación digital en Lima, Perú",
  description:
    "Agencia de innovación y tecnología en Lima, Perú: branding, diseño UX/UI, desarrollo web y de apps, estrategia con IA, SEO y paid media. Agenda una reunión.",
  locale: "es_PE",
  language: "es-PE",
  email: footer.email,
  phone: chat.phone,
  logo: "/media/brand/wuality-horizontal-red.png",
  ogImage: { url: "/og/wuality.jpg", width: 1200, height: 630, alt: "Wuality — Innovación que conecta" },
  sameAs: social.profiles.map((p) => p.href),
} as const;

/** URL absoluta de una ruta del sitio ("/blog/x/" → "https://…/wuality_onepage/blog/x/"). */
export const abs = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

/** Corta en el último espacio antes del límite, para descripciones de buscador. */
export function clip(text: string, max = 158) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:—-]+$/, "")}…`;
}

type PageMeta = {
  /** Título sin la marca: la plantilla del layout le añade "| Wuality". */
  title?: string;
  description: string;
  /** Ruta canónica, con barra final (el sitio se exporta con trailingSlash). */
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
  article?: { publishedTime?: string; authors?: string[]; section?: string; tags?: string[] };
};

/**
 * Metadatos completos de una página. Next combina los del layout y la página
 * clave a clave (sin mezclar el interior), así que una página que define
 * `openGraph` pierde los del layout: por eso aquí se rellena todo cada vez.
 */
export function pageMeta({ title, description, path, image = site.ogImage, type = "website", article }: PageMeta): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : site.title;
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: fullTitle,
      description,
      images: [image],
      ...(type === "article" && article),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}

/* ------------------------------------------------------------------------ */
/* Datos estructurados                                                       */
/* ------------------------------------------------------------------------ */

const ORG_ID = abs("/#organization");
const SITE_ID = abs("/#website");

export function organization() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: abs("/"),
    logo: { "@type": "ImageObject", url: abs(site.logo), width: 1300, height: 400 },
    image: abs(site.ogImage.url),
    slogan: site.slogan,
    description: site.description,
    email: site.email,
    telephone: site.phone.replace(/\s+/g, ""),
    address: { "@type": "PostalAddress", addressLocality: "Lima", addressCountry: "PE" },
    areaServed: "PE",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      telephone: site.phone.replace(/\s+/g, ""),
      availableLanguage: ["es"],
    },
    sameAs: site.sameAs,
  };
}

function breadcrumb(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

/** Home: la organización, el sitio, la página, la cartera y las preguntas frecuentes. */
export function homeGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: abs("/"),
        name: site.name,
        description: site.description,
        inLanguage: site.language,
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "WebPage",
        "@id": abs("/#webpage"),
        url: abs("/"),
        name: site.title,
        description: site.description,
        inLanguage: site.language,
        isPartOf: { "@id": SITE_ID },
        about: { "@id": ORG_ID },
        primaryImageOfPage: { "@type": "ImageObject", url: abs(site.ogImage.url) },
      },
      {
        "@type": "ItemList",
        "@id": abs("/#work"),
        name: "Nuestros proyectos",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          url: abs(`/proyectos/${p.slug}/`),
        })),
      },
      {
        "@type": "FAQPage",
        "@id": abs("/#faq"),
        mainEntity: faq.items.map((it) => ({
          "@type": "Question",
          name: it.q,
          acceptedAnswer: { "@type": "Answer", text: it.a },
        })),
      },
    ],
  };
}

/* ------------------------------------------------------------------------ */
/* Casos y artículos                                                         */
/* ------------------------------------------------------------------------ */

export function projectTitle(p: Project) {
  // El sufijo "| Wuality" suma 10: se añade el segundo servicio sólo si cabe en ~60.
  const two = `Caso ${p.name}: ${p.tags[0]} y ${p.tags[1]}`;
  return two.length <= 50 ? two : `Caso ${p.name}: ${p.tags[0]}`;
}

export function projectDescription(p: Project) {
  return clip(`${p.headline}. ${p.chapters[0].body}`);
}

export function projectGraph(p: Project) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": abs(`/proyectos/${p.slug}/#caso`),
        name: `${p.name}: ${p.headline}`,
        headline: p.headline,
        description: projectDescription(p),
        url: abs(`/proyectos/${p.slug}/`),
        image: abs(`/og/${p.slug}.jpg`),
        inLanguage: site.language,
        genre: p.tags.join(", "),
        keywords: [...p.tags, p.sector].join(", "),
        creator: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
        about: {
          "@type": "Organization",
          name: p.name,
          ...("site" in p && p.site && { url: `https://${p.site}/` }),
        },
      },
      breadcrumb([
        { name: "Inicio", path: "/" },
        { name: "Proyectos", path: "/#work" },
        { name: p.name, path: `/proyectos/${p.slug}/` },
      ]),
      organization(),
    ],
  };
}

/** "04/07/2023" (día/mes/año, como en el artículo) → "2023-07-04". */
export function isoDate(dmy: string) {
  const [d, m, y] = dmy.split("/");
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

/** Imagen para compartir de cada post: su foto recortada a 1200×630 (public/og). */
export function blogImage(item: BlogItem) {
  const file = item.image.split("/").pop()!.replace(/\.\w+$/, ".jpg");
  return { url: `/og/${file}`, width: 1200, height: 630, alt: item.title };
}

export function blogDescription(item: BlogItem) {
  return clip(
    "lead" in item && item.lead
      ? item.lead
      : `${item.title}: episodio de ${item.category} en el blog de Wuality sobre transformación digital, diseño y tecnología.`,
  );
}

export function articleGraph(item: BlogItem) {
  const url = abs(`/blog/${item.slug}/`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#articulo`,
        headline: item.title,
        description: blogDescription(item),
        url,
        mainEntityOfPage: url,
        image: abs(blogImage(item).url),
        datePublished: isoDate(item.publishedAt),
        inLanguage: site.language,
        articleSection: item.category,
        author: { "@type": "Person", name: item.author.name },
        publisher: { "@id": ORG_ID },
        isPartOf: { "@type": "Blog", name: blog.title, url: abs("/#blog") },
      },
      breadcrumb([
        { name: "Inicio", path: "/" },
        { name: "Blog", path: "/#blog" },
        { name: item.title, path: `/blog/${item.slug}/` },
      ]),
      organization(),
    ],
  };
}
