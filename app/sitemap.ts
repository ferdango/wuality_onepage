import type { MetadataRoute } from "next";
import { blog, projects } from "@/lib/content";
import { LANGS, localePath } from "@/lib/i18n";
import { abs, isoDate } from "@/lib/seo";

// La exportación estática necesita generar el archivo en el build.
export const dynamic = "force-static";

/**
 * sitemap.xml: home, los nueve casos, los artículos y la política de privacidad,
 * en español y en inglés.
 * Cada URL lleva sus alternativas de idioma (xhtml:link hreflang), igual que
 * las etiquetas del <head>.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const languages = (path: string) => ({
    languages: { "es-PE": abs(localePath("es", path)), en: abs(localePath("en", path)) },
  });
  const entry = (path: string, extra: Omit<MetadataRoute.Sitemap[number], "url">) =>
    LANGS.map((lang) => ({ url: abs(localePath(lang, path)), alternates: languages(path), ...extra }));

  return [
    ...entry("/", { lastModified: now, changeFrequency: "weekly", priority: 1 }),
    ...projects.flatMap((p) =>
      entry(`/proyectos/${p.slug}/`, {
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        images: [abs(`/og/${p.slug}.jpg`)],
      }),
    ),
    ...blog.items.flatMap((item) =>
      entry(`/blog/${item.slug}/`, {
        lastModified: new Date(isoDate(item.publishedAt)),
        changeFrequency: "yearly",
        priority: 0.6,
      }),
    ),
    ...entry("/privacidad/", { lastModified: now, changeFrequency: "yearly", priority: 0.2 }),
  ];
}
