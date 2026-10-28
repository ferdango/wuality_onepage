import * as es from "./content";
import * as en from "./content.en";

/**
 * Idiomas del sitio. El español vive en la raíz (/, /proyectos/…, /blog/…) y
 * el inglés bajo /en (/en/, /en/projects/…, /en/blog/…): cada idioma tiene sus
 * propias URL, que es lo que necesitan los buscadores para indexar los dos.
 */
export type Lang = "es" | "en";
export const LANGS: Lang[] = ["es", "en"];

/** El diccionario español define la forma; el inglés la cumple (ver content.en.ts). */
export type Content = typeof es;
const dictionaries: Record<Lang, Content> = { es, en };

export const getContent = (lang: Lang): Content => dictionaries[lang];

/** Primer segmento de ruta que cambia de nombre en inglés (los demás, como /blog/, se quedan igual). */
const SEGMENTS: Record<string, string> = { proyectos: "projects", privacidad: "privacy" };
const FIRST_SEGMENT = /^\/([^/]+)\//;

/**
 * Ruta de una página en un idioma, a partir de su ruta en español:
 * "/" → "/en/", "/proyectos/x/" → "/en/projects/x/", "/blog/x/" → "/en/blog/x/",
 * "/privacidad/" → "/en/privacy/".
 */
export function localePath(lang: Lang, path = "/") {
  if (lang === "es") return path;
  const translated = path.replace(FIRST_SEGMENT, (m, seg: string) => (seg in SEGMENTS ? `/${SEGMENTS[seg]}/` : m));
  return `/en${translated === "/" ? "/" : translated}`;
}

/** La misma página en el otro idioma (para el selector). Acepta rutas con o sin barra final. */
export function switchPath(pathname: string, to: Lang) {
  const path = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const spanish = path.startsWith("/en/")
    ? path.slice(3).replace(FIRST_SEGMENT, (m, seg: string) => {
        const es = Object.keys(SEGMENTS).find((k) => SEGMENTS[k] === seg);
        return es ? `/${es}/` : m;
      })
    : path;
  return localePath(to, spanish || "/");
}

export const privacyPath = (lang: Lang) => localePath(lang, "/privacidad/");

export const projectPath = (lang: Lang, slug: string) => localePath(lang, `/proyectos/${slug}/`);
export const blogPath = (lang: Lang, slug: string) => localePath(lang, `/blog/${slug}/`);

/** Rellena los huecos `{clave}` de un texto de la interfaz. */
export function fill(text: string, values: Record<string, string | number>) {
  return text.replace(/\{(\w+)\}/g, (m, key: string) => (key in values ? String(values[key]) : m));
}
