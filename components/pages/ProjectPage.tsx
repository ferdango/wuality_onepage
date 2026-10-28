import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CaseStudyPage from "@/components/CaseStudyPage";
import Meeting from "@/components/Meeting";
import JsonLd from "@/components/JsonLd";
import LangProvider from "@/components/LangProvider";
import { getContent, localePath, type Lang } from "@/lib/i18n";
import { pageMeta, projectDescription, projectGraph, projectTitle } from "@/lib/seo";

/** Los casos tienen el mismo slug en los dos idiomas (/proyectos/x/ y /en/projects/x/). */
export const projectParams = () => getContent("es").projects.map((p) => ({ slug: p.slug }));

export function projectMetadata(slug: string, lang: Lang): Metadata {
  const project = getContent(lang).projects.find((p) => p.slug === slug);
  if (!project) return {};
  return pageMeta({
    lang,
    title: projectTitle(project, lang),
    description: projectDescription(project),
    path: `/proyectos/${project.slug}/`,
    image: { url: `/og/${project.slug}.jpg`, width: 1200, height: 630, alt: `${project.name}: ${project.headline}` },
    type: "article",
    article: { authors: ["Wuality"], section: lang === "es" ? "Proyectos" : "Work", tags: [...project.tags] },
  });
}

export default function ProjectPage({ slug, lang }: { slug: string; lang: Lang }) {
  const { projects } = getContent(lang);
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  // Circular: desde el último se vuelve al primero.
  const next = projects[(index + 1) % projects.length];

  return (
    <LangProvider lang={lang}>
      <JsonLd data={projectGraph(project, lang)} />
      {/* En una ruta interna los anclajes del menú vuelven al home de su idioma. */}
      <Header linkBase={localePath(lang, "/")} />
      <main id="main" tabIndex={-1} className="outline-none">
        <CaseStudyPage project={project} next={next} lang={lang} />
        {/* La referencia cierra el caso con el formulario de contacto: aquí, el de la web. */}
        <Meeting />
      </main>
      <Footer lang={lang} />
      <FloatingActions />
    </LangProvider>
  );
}
