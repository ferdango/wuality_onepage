"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Dots from "./ui/Dots";
import useDragScroll from "./ui/useDragScroll";
import SectionTitle from "./ui/SectionTitle";
import { projects } from "@/lib/content";

export default function Projects() {
  const railRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useDragScroll(railRef);

  // Los controles solo tienen sentido si el riel desborda (ver Carousel).
  const [overflowing, setOverflowing] = useState(false);
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const check = () => setOverflowing(rail.scrollWidth - rail.clientWidth > 4);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(rail);
    Array.from(rail.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  const goTo = (i: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const el = rail.children[i] as HTMLElement | undefined;
    if (el) rail.scrollTo({ left: el.offsetLeft, behavior: "smooth" });
  };

  const onScroll = () => {
    const rail = railRef.current;
    if (!rail) return;
    const els = Array.from(rail.children) as HTMLElement[];
    let best = 0;
    let dist = Infinity;
    els.forEach((el, i) => {
      const d = Math.abs(el.offsetLeft - rail.scrollLeft);
      if (d < dist) { dist = d; best = i; }
    });
    setIndex(best);
  };

  return (
    <section id="work" className="bg-ink pb-[var(--section-y)] pt-[calc(var(--section-y)*1.6)]">
      <SectionTitle className="mb-[clamp(2rem,4.2vw,5rem)]">Nuestros proyectos</SectionTitle>

      <div className="relative">
        <div
          ref={railRef}
          onScroll={onScroll}
          role="region"
          aria-roledescription="carrusel"
          aria-label="Proyectos de Wuality"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") { e.preventDefault(); goTo(Math.min(index + 1, projects.length - 1)); }
            if (e.key === "ArrowLeft") { e.preventDefault(); goTo(Math.max(index - 1, 0)); }
          }}
          className="no-scrollbar flex cursor-grab snap-x snap-mandatory overflow-x-auto overscroll-x-contain outline-none active:cursor-grabbing"
        >
          {projects.map((p) => (
            <article
              key={p.name}
              style={{ backgroundColor: p.bg }}
              className="group relative flex aspect-[360/470] w-[86vw] shrink-0 snap-start flex-col items-center overflow-hidden pt-[clamp(20px,2.1vw,40px)] sm:w-[50vw] lg:aspect-[480/745] lg:w-1/4"
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
                  alt={`Proyecto ${p.name}`}
                  fill
                  sizes="(max-width: 1024px) 60vw, 20vw"
                  className="object-contain object-top transition-transform duration-700 ease-wuality group-hover:-translate-y-2 group-hover:scale-[1.03]"
                />
              </div>
            </article>
          ))}
        </div>

        {/* Botón de avance sobre el riel, como en el diseño */}
        {overflowing && (
        <motion.button
          type="button"
          onClick={() => goTo((index + 1) % projects.length)}
          aria-label="Siguiente proyecto"
          whileTap={{ scale: 0.92 }}
          className="absolute left-[35%] top-[72%] z-10 flex size-[clamp(56px,5.2vw,100px)] -translate-y-1/2 items-center justify-center rounded-full bg-blue text-white shadow-2xl shadow-black/30 transition-transform duration-500 ease-wuality hover:scale-110 lg:left-[17%] lg:top-[68%]"
        >
          <svg viewBox="0 0 24 24" className="size-[28%]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12h15M13 6l6 6-6 6" />
          </svg>
        </motion.button>
        )}
      </div>

      {overflowing && (
        <Dots count={projects.length} index={index} onSelect={goTo} className="mt-[clamp(16px,1.7vw,32px)]" />
      )}
    </section>
  );
}
