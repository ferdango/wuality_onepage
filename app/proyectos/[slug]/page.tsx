import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CaseStudyPage from "@/components/CaseStudyPage";
import Meeting from "@/components/Meeting";
import JsonLd from "@/components/JsonLd";
import { projects } from "@/lib/content";
import { pageMeta, projectDescription, projectGraph, projectTitle } from "@/lib/seo";

type Params = { slug: string };

/** El sitio se exporta estático, así que cada caso necesita su ruta generada. */
export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};
  return pageMeta({
    title: projectTitle(project),
    description: projectDescription(project),
    path: `/proyectos/${project.slug}/`,
    image: { url: `/og/${project.slug}.jpg`, width: 1200, height: 630, alt: `${project.name}: ${project.headline}` },
    type: "article",
    article: { authors: ["Wuality"], section: "Proyectos", tags: [...project.tags] },
  });
}

export default function ProjectPage({ params }: { params: Params }) {
  const index = projects.findIndex((p) => p.slug === params.slug);
  const project = projects[index];
  // Circular: desde el último se vuelve al primero.
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <JsonLd data={projectGraph(project)} />
      {/* En una ruta interna los anclajes del menú tienen que volver al home. */}
      <Header linkBase="/" />
      <main>
        <CaseStudyPage project={project} next={next} />
        {/* La referencia cierra el caso con el formulario de contacto: aquí, el de la web. */}
        <Meeting />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
