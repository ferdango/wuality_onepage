import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import Article from "@/components/Article";
import BlogRail from "@/components/BlogRail";
import { blog } from "@/lib/content";

type Params = { slug: string };

/** El sitio se exporta estático, así que cada post necesita su ruta generada. */
export function generateStaticParams(): Params[] {
  return blog.items.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const item = blog.items.find((i) => i.slug === params.slug);
  if (!item) return {};
  return {
    title: `${item.title} — Wuality`,
    description: "lead" in item ? item.lead : item.title,
    openGraph: { title: item.title, images: [item.image], type: "article" },
  };
}

export default function ArticlePage({ params }: { params: Params }) {
  const index = blog.items.findIndex((i) => i.slug === params.slug);
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
    <>
      {/* En una ruta interna los anclajes del menú tienen que volver al home. */}
      <Header linkBase="/" />
      <main>
        <Article item={item} next={next} />
        <section className="bg-ink">
          <BlogRail title={blog.related} items={related} ariaLabel="Artículos relacionados" />
        </section>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
