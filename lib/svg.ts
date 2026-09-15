import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

export type InlineSvg = { viewBox: string; inner: string };

/**
 * Lee un SVG de /public y devuelve su viewBox y su contenido interno, para
 * poder incrustarlo en el DOM y animar sus trazos (un <img> no deja tocar los
 * paths). Se resuelve en el servidor y, como la página es estática, durante el
 * build: no añade ninguna petición en cliente.
 *
 * Solo para assets propios del repositorio; el resultado se inyecta tal cual.
 */
export const inlineSvg = cache(async (publicPath: string): Promise<InlineSvg> => {
  const raw = await readFile(path.join(process.cwd(), "public", publicPath), "utf8");
  return {
    viewBox: raw.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 100 100",
    inner: raw.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>[\s\S]*$/, ""),
  };
});
