import type { MetadataRoute } from "next";
import { site, siteText } from "@/lib/seo";

export const dynamic = "force-static";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Manifiesto web: nombre, colores e icono al guardar el sitio en el móvil. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: site.name,
    description: site.description,
    lang: siteText.es.language,
    start_url: `${BASE}/`,
    scope: `${BASE}/`,
    display: "standalone",
    background_color: "#05080a",
    theme_color: "#05080a",
    icons: [
      { src: `${BASE}/icon.png`, sizes: "512x512", type: "image/png" },
      { src: `${BASE}/apple-icon.png`, sizes: "180x180", type: "image/png" },
    ],
  };
}
