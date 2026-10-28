/**
 * Artículos del blog en español: uno por cada caso de la cartera
 * (`projects` en lib/content.ts), ordenados por fecha. Aquí van los
 * datos de la tarjeta y del buscador; el cuerpo está en lib/articles.es.ts.
 *
 * Son textos de producción. Sólo cuentan lo que es público en cada caso
 * (dossier, manuales de marca y webs): nada de cifras internas, honorarios ni
 * contenido que en los propios proyectos todavía es de ejemplo.
 */
export type ArticleBlock = { type: "p" | "h2"; text: string };

export type BlogItem = {
  slug: string;
  /**
   * Maqueta del Figma que se usa al abrir el post: los "video" llevan el icono
   * de YouTube en la tarjeta del home y abren "Single Article Video" (la
   * miniatura enlaza a `video`); el resto abre "Single Article Text".
   */
  type: "note" | "video";
  /** Fecha visible en la tarjeta del home. */
  date: string;
  title: string;
  image: string;
  cta?: string;
  category: string;
  author: { name: string; avatar: string };
  /** Día/mes/año, como en la línea de autor del artículo. */
  publishedAt: string;
  /** Slug del caso de la cartera del que habla el artículo. */
  project?: string;
  lead?: string;
  video?: string;
};

const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

/** "28/10/2026" → "28 de octubre de 2026". */
const fecha = (dmy: string) => {
  const [d, m, y] = dmy.split("/").map(Number);
  return `${d} de ${MESES[m - 1]} de ${y}`;
};

const author = { name: "Equipo Wuality", avatar: "/media/brand/avatar-wuality.png" };

/** Nota de texto: la imagen lleva el nombre del slug (y su recorte para redes, el mismo en public/og). */
function note(post: { slug: string; project: string; title: string; category: string; publishedAt: string; lead: string }): BlogItem {
  return {
    ...post,
    type: "note",
    date: fecha(post.publishedAt),
    image: `/media/blog/${post.slug}.jpg`,
    cta: "Leer nota",
    author,
  };
}

/** "28/10/2026" → 20261028, para ordenar por fecha. */
const sortKey = (dmy: string) => Number(dmy.split("/").reverse().join(""));

/** Del más reciente al más antiguo: así aparecen en el home y así avanza "Siguiente artículo". */
export const posts: BlogItem[] = ([
  note({
    slug: "grupo-tinbet-marca-para-un-holding-multisector",
    project: "grupo-tinbet",
    title: "Grupo Tinbet: cómo diseñar la marca de un holding con tres industrias",
    category: "Branding",
    publishedAt: "26/08/2026",
    lead: "Entretenimiento, inversiones y seguridad bajo una misma firma: así diseñamos la identidad y la web de Grupo Tinbet para que tres negocios hablen como uno.",
  }),
  note({
    slug: "afiliados-tinbet-landing-que-convierte-audiencias-en-socios",
    project: "afiliados-tinbet",
    title: "Afiliados Tinbet: anatomía de una landing que convierte audiencias en socios",
    category: "Experiencia digital",
    publishedAt: "09/08/2026",
    lead: "Propuesta de valor clara, comisiones que se entienden de un vistazo y una experiencia rápida y accesible: así diseñamos la landing de afiliados de Tinbet.",
  }),
  note({
    slug: "peruana-en-rusia-de-la-asesoria-a-la-postulacion-guiada",
    project: "peruana-en-rusia",
    title: "Peruana en Rusia: de una asesoría de becas a una postulación guiada en línea",
    category: "Producto digital",
    publishedAt: "16/03/2026",
    lead: "Una marca que transmite un cruce seguro, una web que resuelve dudas y un portal que acompaña cada paso: así digitalizamos una asesoría para estudiar en Rusia.",
  }),
  note({
    slug: "sunqu-journeys-una-marca-de-viajes-que-nace-del-corazon",
    project: "sunqu-journeys",
    title: "Sunqu Journeys: una marca de viajes que nace del corazón",
    category: "Branding",
    publishedAt: "17/03/2026",
    lead: "Sunqu significa corazón en quechua. Así diseñamos la marca y la web de una agencia de viajes experienciales que propone conocer el Perú desde la emoción.",
  }),
  note({
    slug: "tuku-travel-fichas-de-tour-que-se-entienden-y-se-reservan",
    project: "tuku-travel",
    title: "Tuku Travel: cómo diseñar una ficha de tour que se entiende y se reserva",
    category: "Experiencia digital",
    publishedAt: "21/01/2026",
    lead: "En turismo, la venta se decide en la ficha del tour. Así la diseñamos en el e-commerce de Tuku Travel: galería, itinerario claro y reserva en línea.",
  }),
  note({
    slug: "kingbuilder-branding-industrial-para-la-mineria",
    project: "kingbuilder",
    title: "KingBuilder: branding industrial para una constructora de tecnología minera",
    category: "Branding",
    publishedAt: "02/05/2026",
    lead: "«Sistemas inteligentes, obras indestructibles». Así diseñamos la identidad y la web de KingBuilder para que la marca transmita la solidez de sus obras.",
  }),
  note({
    slug: "tec-seg-una-marca-de-seguridad-que-se-ve-en-la-obra",
    project: "tec-seg",
    title: "TEC & SEG: una marca de seguridad que se ve en la obra",
    category: "Branding",
    publishedAt: "04/06/2026",
    lead: "Un escudo con un felino vigilante, amarillo de alta visibilidad y un sistema pensado para flota, uniformes y web: así diseñamos la marca de TEC & SEG.",
  }),
  note({
    slug: "eusebio-arroniz-una-web-escolar-pensada-para-las-familias",
    project: "iep-eusebio-arroniz",
    title: "Eusebio Arróniz: una web escolar pensada desde las preguntas de las familias",
    category: "Experiencia digital",
    publishedAt: "27/03/2026",
    lead: "Admisión, metodologías por nivel, comunicados y canales de atención: así diseñamos la experiencia web de Eusebio Arróniz School en desktop y mobile.",
  }),
  note({
    slug: "zenity-finanzas-de-negocio-explicadas-con-ia",
    project: "zenity",
    title: "Zenity: las finanzas de tu negocio en un solo lugar, explicadas con IA",
    category: "Producto digital",
    publishedAt: "25/04/2026",
    lead: "Cuentas, billeteras y archivos en un balance consolidado, con un asistente que lo explica en segundos: así diseñamos Zenity, nuestro prototipo fintech.",
  }),
] satisfies BlogItem[]).sort((a, b) => sortKey(b.publishedAt) - sortKey(a.publishedAt));
