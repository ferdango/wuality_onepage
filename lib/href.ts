const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Antepone el basePath a una ruta interna. `next/link` ya lo hace solo; esto es
 * para los pocos anclajes que no pasan por él (los de Motion, por ejemplo).
 */
export function withBase(href: string) {
  return href.startsWith("/") ? `${BASE}${href}` : href;
}
