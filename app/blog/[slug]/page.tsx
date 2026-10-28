import ArticlePage, { articleMetadata, articleParams } from "@/components/pages/ArticlePage";

type Params = { slug: string };

/** El sitio se exporta estático, así que cada post necesita su ruta generada. */
export const generateStaticParams = articleParams;

export function generateMetadata({ params }: { params: Params }) {
  return articleMetadata(params.slug, "es");
}

export default function Page({ params }: { params: Params }) {
  return <ArticlePage slug={params.slug} lang="es" />;
}
