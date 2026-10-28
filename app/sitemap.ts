import type { MetadataRoute } from "next";
import { blog, projects } from "@/lib/content";
import { abs, isoDate } from "@/lib/seo";

// La exportación estática necesita generar el archivo en el build.
export const dynamic = "force-static";

/** sitemap.xml: home, los nueve casos y los artículos del blog. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: abs("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...projects.map((p) => ({
      url: abs(`/proyectos/${p.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [abs(`/og/${p.slug}.jpg`)],
    })),
    ...blog.items.map((item) => ({
      url: abs(`/blog/${item.slug}/`),
      lastModified: new Date(isoDate(item.publishedAt)),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
