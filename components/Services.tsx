"use client";

import Image from "@/components/ui/Img";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Carousel from "./ui/Carousel";
import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";
import { services } from "@/lib/content";

function ArrowCircle({ className = "" }: { className?: string }) {
  return (
    <span
      className={`flex size-[clamp(56px,5.625vw,108px)] items-center justify-center rounded-full bg-blue text-white transition-transform duration-500 ease-wuality group-hover:scale-105 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="size-[26%]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </span>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="bg-ink py-[calc(var(--section-y)*1.6)]">
      <SectionTitle className="mb-[clamp(2rem,8.33vw,10rem)]">Lo que hacemos</SectionTitle>

      {/* Desktop / tablet ancho: lista + imagen sincronizada */}
      <div className="hidden items-start lg:flex">
        <ul className="w-1/2 shrink-0">
          {services.map((s, i) => {
            const isActive = i === active;
            return (
              <li key={s.title} className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-current={isActive}
                  className="group flex w-full flex-col items-start gap-4 py-[clamp(18px,1.875vw,36px)] pl-[var(--gutter)] pr-[clamp(80px,7vw,140px)] text-left"
                >
                  <span
                    className={`text-[length:var(--fs-h3)] font-bold leading-tight tracking-[-0.01em] transition-colors duration-400 ${
                      isActive ? "text-yellow" : "text-muted"
                    }`}
                  >
                    {s.title}
                  </span>
                  <span
                    className={`text-[length:var(--fs-body)] leading-snug transition-colors duration-400 ${
                      isActive ? "text-bone" : "text-muted"
                    }`}
                  >
                    {s.items}
                  </span>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="services-arrow"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="pointer-events-none absolute right-[clamp(8px,1.6vw,32px)] top-1/2 -translate-y-1/2"
                    >
                      <ArrowCircle />
                    </motion.span>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className="relative aspect-[959/835] w-1/2 shrink-0 overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={services[active].image}
                alt={services[active].title}
                fill
                sizes="50vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: carrusel con dots y CTA, como el frame de 360 */}
      <div className="lg:hidden">
        <Carousel ariaLabel="Servicios de Wuality" slideClassName="w-full" gap="gap-0">
          {services.map((s) => (
            <article key={s.title} className="w-full">
              <div className="shell flex flex-col gap-3 pb-6">
                <h3 className="text-[length:var(--fs-h3)] font-bold text-bone">{s.title}</h3>
                <p className="text-[length:var(--fs-body)] text-ash">{s.items}</p>
              </div>
              <div className="relative aspect-[360/300] w-full sm:aspect-[16/9]">
                <Image src={s.image} alt={s.title} fill sizes="100vw" className="object-cover" />
              </div>
              <a
                href="#contacto"
                className="block bg-[#0b1a2e] py-4 text-center text-[length:var(--fs-body)] font-bold text-blue transition-colors duration-300 active:bg-[#10233c]"
              >
                Consulta aquí
              </a>
            </article>
          ))}
        </Carousel>
      </div>

      <Reveal className="mt-10 hidden justify-center lg:flex">
        <a
          href="#contacto"
          className="group flex items-center gap-4 rounded-full border border-bone/30 px-8 py-4 text-[length:var(--fs-sm)] font-semibold text-bone transition-colors duration-300 hover:border-blue hover:text-blue"
        >
          Consulta aquí
          <svg viewBox="0 0 24 24" className="size-5 transition-transform duration-400 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12h15M13 6l6 6-6 6" />
          </svg>
        </a>
      </Reveal>
    </section>
  );
}
