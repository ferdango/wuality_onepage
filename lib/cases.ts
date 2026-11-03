import type { Lang } from "./i18n";
import { cases as es } from "./cases.es";
import { caseTexts as en } from "./cases.en";

/**
 * Detalle ampliado de cada caso de la cartera (página /proyectos/<slug>/):
 * estado, reto y enfoque, claves, alcance por capítulo, frase de marca,
 * paleta y galería.
 *
 * Sale del Dossier Comercial 2026 (alcance, frases y paletas de cada marca),
 * de las capturas de cada web y de los artículos del blog. Sólo hechos: nada
 * de cifras internas ni de resultados que no estén medidos.
 *
 * Va aparte del diccionario (lib/content.ts) porque sólo lo usa la página del
 * caso, que se genera en el servidor: así no viaja en el JS del cliente.
 */

export type Shot = { src: string; alt: string; w: number; h: number };

/**
 * Bloques de la galería. `browser` y `phone` enmarcan una captura de la web
 * sobre el color del proyecto (como la portada); `photo` es una pieza de
 * marca a sangre. Ninguno repite la imagen de la portada.
 */
export type GalleryItem =
  | { kind: "browser"; shot: Shot; layout: "full" | "half" }
  | { kind: "phone"; shot: Shot; layout: "half" }
  /** `contain` + `bg`: la pieza entera sobre su propio fondo, cuando recortarla perdería parte. */
  | { kind: "photo"; shot: Shot; layout: "full" | "half"; contain?: boolean; bg?: string };

export type CaseDetail = {
  /** Estado real del proyecto: publicado, diseñado, prototipo… */
  status: string;
  /** Entradilla, más larga que el titular. */
  intro: string;
  challenge: string;
  approach: string;
  /** Tres claves del proyecto, con su dato y su explicación. */
  facts: { value: string; label: string }[];
  /** Alcance de cada capítulo del caso (`chapters` en content.ts), en el mismo orden. */
  scope: string[][];
  /** Frase de la marca (del dossier o de la propia web), si la hay. */
  tagline?: string;
  /** Colores de la marca, tal como vienen en el dossier. */
  palette?: string[];
  /** Fondo de la portada y de la galería, si el `bg` del proyecto no sirve (p. ej. blanco). */
  stage?: string;
  /**
   * Portada: dos mockups compuestos con scripts/case-mockups (la web en su
   * navegador y su teléfono, con las figuras de la marca si hicimos su
   * branding), apaisado para desktop y vertical para móvil. Sin ellos, la
   * imagen del proyecto.
   */
  hero?: { desktop: string; mobile: string };
  gallery: GalleryItem[];
};

/** Textos en inglés de un caso: los mismos campos, y los `alt` de la galería en orden. */
export type CaseTexts = Pick<CaseDetail, "status" | "intro" | "challenge" | "approach" | "facts" | "scope"> & {
  tagline?: string;
  alts: string[];
};


/** Detalle del caso en su idioma. Si falta o no cuadra, el build falla en lugar de publicar un caso a medias. */
export function caseDetail(slug: string, lang: Lang): CaseDetail {
  const base = es[slug];
  if (!base) throw new Error(`cases: falta el detalle de ${slug}`);
  if (lang === "es") return base;
  const t = en[slug];
  if (!t) throw new Error(`cases: falta la traducción de ${slug}`);
  if (t.alts.length !== base.gallery.length) throw new Error(`cases: ${slug} no tiene un alt por imagen`);
  const gallery = base.gallery.map((item, i) => ({ ...item, shot: { ...item.shot, alt: t.alts[i] } }));
  const { alts: _alts, ...texts } = t;
  return { ...base, ...texts, gallery };
}
