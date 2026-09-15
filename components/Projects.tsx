"use client";

import Image from "next/image";
import Carousel from "./ui/Carousel";
import SectionTitle from "./ui/SectionTitle";
import { PROJECT_DETAIL_ID, useProjectSelection } from "./ProjectSelection";
import { projects } from "@/lib/content";

export default function Projects() {
  const { selected, select } = useProjectSelection();

  return (
    <section id="work" className="bg-ink pb-[var(--section-y)] pt-[calc(var(--section-y)*1.6)]">
      <SectionTitle className="mb-[clamp(2rem,4.2vw,5rem)]">Nuestros proyectos</SectionTitle>

      <Carousel
        ariaLabel="Proyectos de Wuality"
        slideClassName="w-[86vw] sm:w-[50vw] lg:w-1/4"
        gap="gap-0"
        autoPlayMs={5200}
      >
        {projects.map((p, i) => {
          const isSelected = i === selected;
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => select(i)}
              aria-controls={PROJECT_DETAIL_ID}
              aria-label={`Ver el caso de ${p.name}`}
              style={{ backgroundColor: p.bg }}
              className={`group relative flex aspect-[360/470] w-full flex-col items-center overflow-hidden pt-[clamp(20px,2.1vw,40px)] text-left outline-none transition-opacity duration-500 ease-wuality lg:aspect-[480/745] ${
                isSelected ? "opacity-100" : "opacity-64"
              }`}
            >
              <div className="relative h-[clamp(24px,2.1vw,40px)] w-[62%]">
                <Image
                  src={p.logo}
                  alt={p.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-contain"
                />
              </div>

              <div className="relative mt-[clamp(14px,1.6vw,30px)] w-[72%] flex-1">
                <Image
                  src={p.shot}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 60vw, 20vw"
                  className="object-contain object-top transition-transform duration-700 ease-wuality group-hover:-translate-y-2 group-hover:scale-[1.03]"
                />
              </div>

              {/* Invitación a abrir el detalle */}
              <span
                className={`pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-black/70 to-transparent pb-[clamp(14px,1.25vw,24px)] pt-[clamp(28px,2.5vw,48px)] text-[var(--fs-xs)] font-semibold text-white transition-opacity duration-400 ${
                  isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                }`}
              >
                {isSelected ? "Caso abierto abajo" : "Ver caso"}
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M6 13l6 6 6-6" />
                </svg>
              </span>

              {/* Foco de teclado, hacia dentro para no romper el sangrado de la tarjeta */}
              <span
                className="pointer-events-none absolute inset-0 ring-0 ring-transparent ring-inset transition-all duration-400 group-focus-visible:ring-4 group-focus-visible:ring-bone"
                aria-hidden
              />
            </button>
          );
        })}
      </Carousel>
    </section>
  );
}
