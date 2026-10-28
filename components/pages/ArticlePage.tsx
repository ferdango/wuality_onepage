import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import Article from "@/components/Article";
import BlogRail from "@/components/BlogRail";
import JsonLd from "@/components/JsonLd";
import LangProvider from "@/components/LangProvider";
import { getContent, localePath, type Lang } from "@/lib/i18n";
import { articleGraph, blogDescription, blogImage, isoDate, pageMeta } from "@/lib/seo";

/** Los posts tienen el mismo slug en los dos idiomas. */
export const articleParams = () => getContent("es").blog.items.map((item) => ({ slug: item.slug }));

export function articleMetadata(slug: string, lang: Lang): Metadata {
  const item = getContent(lang).blog.items.find((i) => i.slug === slug);
  if (!item) return {};
  return pageMeta({
    lang,
    title: item.title,
    description: blogDescription(item, lang),
    path: `/blog/${item.slug}/`,
    image: blogImage(item),
    type: "article",
    article: {
      publishedTime: isoDate(item.publishedAt),
      authors: [item.author.name],
      section: item.category,
      tags: [item.category],
    },
  });
}

export default function ArticlePage({ slug, lang }: { slug: string; lang: Lang }) {
  const { blog, ui } = getContent(lang);
  const index = blog.items.findIndex((i) => i.slug === slug);
  const item = blog.items[index];
  // Circular: desde el último se vuelve al primero.
  const next = blog.items[(index + 1) % blog.items.length];

  /**
   * "Más ideas para ti": el resto de posts, primero los de la misma categoría
   * (texto con texto, vídeo con vídeo) y luego los demás.
   */
  const others = blog.items.filter((i) => i.slug !== item.slug);
  const related = [
    ...others.filter((i) => i.category === item.category),
    ...others.filter((i) => i.category !== item.category),
  ];

  return (
    <LangProvider lang={lang}>
      <JsonLd data={articleGraph(item, lang)} />
      {/* En una ruta interna los anclajes del menú vuelven al home de su idioma. */}
      <Header linkBase={localePath(lang, "/")} />
      <main>
        <Article item={item} next={next} lang={lang} />
        <section className="bg-ink">
          <BlogRail title={blog.related} items={related} ariaLabel={ui.blog.related} />
        </section>
      </main>
      <Footer lang={lang} />
      <FloatingActions />
    </LangProvider>
  );
}
