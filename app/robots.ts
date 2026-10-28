import type { MetadataRoute } from "next";
import { abs } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * robots.txt. Ojo: en GitHub Pages el sitio cuelga de /wuality_onepage y los
 * buscadores sólo leen el robots.txt de la raíz del dominio, así que éste
 * únicamente cuenta cuando el sitio se sirva desde la raíz (p. ej. en
 * wuality.agency). Mientras tanto el sitemap hay que darlo de alta a mano en
 * Search Console.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: abs("/sitemap.xml"),
  };
}
