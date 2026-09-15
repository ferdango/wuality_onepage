import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import CaseStudy from "@/components/CaseStudy";
import Partners from "@/components/Partners";
import Methodology from "@/components/Methodology";
import Reviews from "@/components/Reviews";
import Clients from "@/components/Clients";
import Models from "@/components/Models";
import Faq from "@/components/Faq";
import Meeting from "@/components/Meeting";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Projects />
        <CaseStudy />
        <Partners />
        <Methodology />
        <Reviews />
        <Clients />
        <Models />
        <Faq />
        <Meeting />
        <Blog />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
