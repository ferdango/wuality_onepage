import ProjectPage, { projectMetadata, projectParams } from "@/components/pages/ProjectPage";

type Params = { slug: string };

/** El sitio se exporta estático, así que cada caso necesita su ruta generada. */
export const generateStaticParams = projectParams;

export function generateMetadata({ params }: { params: Params }) {
  return projectMetadata(params.slug, "en");
}

export default function Page({ params }: { params: Params }) {
  return <ProjectPage slug={params.slug} lang="en" />;
}
