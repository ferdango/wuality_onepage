import type { Metadata } from "next";
import { chat, footer, social, type BlogItem, type projects } from "./content";
import { blogPath, getContent, localePath, projectPath, type Lang } from "./i18n";

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
  email: footer.email,
  phone: chat.phone,
  logo: "/media/brand/wuality-horizontal-red.png",
  ogImage: { url: "/og/wuality.jpg", width: 1200, height: 630, alt: "Wuality — Innovación que conecta" },
  sameAs: social.profiles.map((p) => p.href),
} as const;

/** Título, descripción e idioma del sitio en cada lengua. */
export const siteText: Record<Lang, { title: string; description: string; locale: string; language: string; ogAlt: string }> = {
  es: {
    title: site.title,
    description: site.description,
    locale: "es_PE",
    language: "es-PE",
    ogAlt: "Wuality — Innovación que conecta",
  },
  en: {
    title: "Wuality — Digital transformation agency in Lima, Peru",
    description:
      "Innovation and technology agency in Lima, Peru: branding, UX/UI design, web and app development, AI-driven strategy, SEO and paid media. Book a meeting.",
    locale: "en_US",
    language: "en",
    ogAlt: "Wuality — Innovation that connects",
  },
};

/** URL absoluta de una ruta del sitio ("/blog/x/" → "https://…/wuality_onepage/blog/x/"). */
export const abs = (path = "/") => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;

/** Corta en el último espacio antes del límite, para descripciones de buscador. */
export function clip(text: string, max = 158) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,;:—-]+$/, "")}…`;
}

type PageMeta = {
  lang: Lang;
  /** Título sin la marca: la plantilla del layout le añade "| Wuality". */
  title?: string;
  description: string;
  /**
   * Ruta de la página en español, con barra final (el sitio se exporta con
   * trailingSlash). La del idioma pedido y las alternativas salen de ella.
   */
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
  article?: { publishedTime?: string; authors?: string[]; section?: string; tags?: string[] };
};

/**
 * Metadatos completos de una página. Next combina los del layout y la página
 * clave a clave (sin mezclar el interior), así que una página que define
 * `openGraph` pierde los del layout: por eso aquí se rellena todo cada vez.
 *
 * `alternates.languages` son las etiquetas hreflang: cada página apunta a su
 * versión en el otro idioma, y `x-default` a la española.
 */
export function pageMeta({ lang, title, description, path, image, type = "website", article }: PageMeta): Metadata {
  const text = siteText[lang];
  const img = image ?? { ...site.ogImage, alt: text.ogAlt };
  const fullTitle = title ? `${title} | ${site.name}` : text.title;
  const url = localePath(lang, path);
  return {
    title: title ?? { absolute: text.title },
    description,
    alternates: {
      canonical: url,
      languages: { "es-PE": localePath("es", path), en: localePath("en", path), "x-default": localePath("es", path) },
    },
    openGraph: {
      type,
      siteName: site.name,
      locale: text.locale,
      alternateLocale: lang === "es" ? siteText.en.locale : siteText.es.locale,
      url,
      title: fullTitle,
      description,
      images: [img],
      ...(type === "article" && article),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: img.url, alt: img.alt }],
    },
  };
}

/* ------------------------------------------------------------------------ */
/* Datos estructurados                                                       */
/* ------------------------------------------------------------------------ */

const ORG_ID = abs("/#organization");
const SITE_ID = abs("/#website");

/** La organización es una sola en los dos idiomas: mismo @id, descripción del idioma de la página. */
export function organization(lang: Lang = "es") {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: abs("/"),
    logo: { "@type": "ImageObject", url: abs(site.logo), width: 1300, height: 400 },
    image: abs(site.ogImage.url),
    slogan: site.slogan,
    description: siteText[lang].description,
    email: site.email,
    telephone: site.phone.replace(/\s+/g, ""),
    address: { "@type": "PostalAddress", addressLocality: "Lima", addressCountry: "PE" },
    areaServed: "PE",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      telephone: site.phone.replace(/\s+/g, ""),
      availableLanguage: ["es", "en"],
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
export function homeGraph(lang: Lang) {
  const { projects, faq, ui } = getContent(lang);
  const text = siteText[lang];
  const home = abs(localePath(lang, "/"));
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(lang),
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: abs("/"),
        name: site.name,
        description: siteText.es.description,
        inLanguage: [siteText.es.language, siteText.en.language],
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "WebPage",
        "@id": `${home}#webpage`,
        url: home,
        name: text.title,
        description: text.description,
        inLanguage: text.language,
        isPartOf: { "@id": SITE_ID },
        about: { "@id": ORG_ID },
        primaryImageOfPage: { "@type": "ImageObject", url: abs(site.ogImage.url) },
      },
      {
        "@type": "ItemList",
        "@id": `${home}#work`,
        name: ui.projects.title,
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name,
          url: abs(projectPath(lang, p.slug)),
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${home}#faq`,
        inLanguage: text.language,
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

const CRUMBS: Record<Lang, { home: string; projects: string; blog: string }> = {
  es: { home: "Inicio", projects: "Proyectos", blog: "Blog" },
  en: { home: "Home", projects: "Work", blog: "Blog" },
};

export function projectTitle(p: Project, lang: Lang) {
  // El sufijo "| Wuality" suma 10: se añade el segundo servicio sólo si cabe en ~60.
  const [a, b] = p.tags;
  const two = lang === "es" ? `Caso ${p.name}: ${a} y ${b}` : `${p.name} case study: ${a} and ${b}`;
  if (two.length <= 50) return two;
  return lang === "es" ? `Caso ${p.name}: ${a}` : `${p.name} case study: ${a}`;
}

export function projectDescription(p: Project) {
  return clip(`${p.headline}. ${p.chapters[0].body}`);
}

export function projectGraph(p: Project, lang: Lang) {
  const url = abs(projectPath(lang, p.slug));
  const home = localePath(lang, "/");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#caso`,
        name: `${p.name}: ${p.headline}`,
        headline: p.headline,
        description: projectDescription(p),
        url,
        image: abs(`/og/${p.slug}.jpg`),
        inLanguage: siteText[lang].language,
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
        { name: CRUMBS[lang].home, path: home },
        { name: CRUMBS[lang].projects, path: `${home}#work` },
        { name: p.name, path: projectPath(lang, p.slug) },
      ]),
      organization(lang),
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

export function blogDescription(item: BlogItem, lang: Lang) {
  if ("lead" in item && item.lead) return clip(item.lead);
  return clip(
    lang === "es"
      ? `${item.title}: episodio de ${item.category} en el blog de Wuality sobre transformación digital, diseño y tecnología.`
      : `${item.title}: a ${item.category} episode on the Wuality blog about digital transformation, design and technology.`,
  );
}

/** Caso de la cartera del que habla un artículo, si lo hay. */
export function articleProject(item: BlogItem, lang: Lang) {
  return item.project ? getContent(lang).projects.find((p) => p.slug === item.project) : undefined;
}

export function articleGraph(item: BlogItem, lang: Lang) {
  const { blog } = getContent(lang);
  const url = abs(blogPath(lang, item.slug));
  const home = localePath(lang, "/");
  const project = articleProject(item, lang);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#articulo`,
        headline: item.title,
        description: blogDescription(item, lang),
        url,
        mainEntityOfPage: url,
        image: abs(blogImage(item).url),
        datePublished: isoDate(item.publishedAt),
        inLanguage: siteText[lang].language,
        articleSection: item.category,
        keywords: [...new Set([item.category, project?.name, ...(project?.tags ?? [])].filter(Boolean))].join(", "),
        // Los firma el equipo, así que el autor es la propia organización.
        author: { "@id": ORG_ID },
        // El caso de la cartera (su página publica ese mismo @id en projectGraph).
        ...(project && {
          about: {
            "@type": "CreativeWork",
            "@id": `${abs(projectPath(lang, project.slug))}#caso`,
            name: `${project.name}: ${project.headline}`,
            url: abs(projectPath(lang, project.slug)),
          },
        }),
        publisher: { "@id": ORG_ID },
        isPartOf: { "@type": "Blog", name: blog.title, url: abs(`${home}#blog`) },
      },
      breadcrumb([
        { name: CRUMBS[lang].home, path: home },
        { name: CRUMBS[lang].blog, path: `${home}#blog` },
        { name: item.title, path: blogPath(lang, item.slug) },
      ]),
      organization(lang),
    ],
  };
}
