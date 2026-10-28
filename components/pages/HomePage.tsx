import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Partners from "@/components/Partners";
import Methodology from "@/components/Methodology";
import Reviews from "@/components/Reviews";
import Clients from "@/components/Clients";
import Models from "@/components/Models";
import SocialPosts from "@/components/SocialPosts";
import Faq from "@/components/Faq";
import Meeting from "@/components/Meeting";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import JsonLd from "@/components/JsonLd";
import LangProvider from "@/components/LangProvider";
import type { Lang } from "@/lib/i18n";
import { homeGraph, pageMeta, siteText } from "@/lib/seo";

/** La portada es la misma en los dos idiomas; cambian los textos y la URL (/ y /en/). */
export const homeMetadata = (lang: Lang) => pageMeta({ lang, description: siteText[lang].description, path: "/" });

export default function HomePage({ lang }: { lang: Lang }) {
  return (
    <LangProvider lang={lang}>
      <JsonLd data={homeGraph(lang)} />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Services />
        <Projects />
        <Partners />
        <Methodology />
        <Reviews />
        <Clients />
        <Models />
        <SocialPosts />
        <Faq />
        <Meeting />
        <Blog />
      </main>
      <Footer lang={lang} />
      <FloatingActions />
    </LangProvider>
  );
}
