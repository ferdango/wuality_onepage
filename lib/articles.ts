import type { ArticleBlock } from "./blog";
import type { Lang } from "./i18n";
import { bodies as es } from "./articles.es";
import { bodies as en } from "./articles.en";

/**
 * Cuerpo de un artículo en su idioma. Sólo lo importa la página del artículo
 * (componente de servidor), así los textos largos no viajan en el JS del
 * cliente. Si falta, el build falla en lugar de publicar un artículo vacío.
 */
export function articleBody(slug: string, lang: Lang): ArticleBlock[] {
  const body = (lang === "en" ? en : es)[slug];
  if (!body) throw new Error(`articles: falta el cuerpo de ${slug} (${lang})`);
  return body;
}
