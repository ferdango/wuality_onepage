"use client";

import Image from "@/components/ui/Img";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useRef, useState } from "react";
import SectionTitle from "./ui/SectionTitle";
import { services } from "@/lib/content";

const N = services.length;

/** Scroll que consume cada servicio mientras la sección está anclada. */
const STEP_SVH = 55;

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

function Cta() {
  return (
    <a
      href="#contacto"
      className="group flex items-center gap-4 rounded-full border border-bone/30 px-8 py-4 text-[length:var(--fs-sm)] font-semibold text-bone transition-colors duration-300 hover:border-blue hover:text-blue"
    >
      Consulta aquí
      <svg viewBox="0 0 24 24" className="size-5 transition-transform duration-400 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}

export default function Services() {
  const pin = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /**
   * La sección se queda fija mientras se recorren los servicios: cada tramo de
   * scroll enciende el siguiente y, pasado el último, el ancla se suelta. El
   * progreso se lee en JS y se convierte en un índice en vez de atarse a un
   * estilo, que es lo que hace que Motion lo congele en un ViewTimeline.
   */
  const { scrollYProgress } = useScroll({ target: pin, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(N - 1, Math.max(0, Math.floor(v * N))));
  });

  /** Pulsar un servicio lleva el scroll al centro de su tramo. */
  const goTo = useCallback((i: number) => {
    const el = pin.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const segment = (el.offsetHeight - window.innerHeight) / N;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: top + segment * (i + 0.5), behavior: smooth ? "smooth" : "auto" });
  }, []);

  const current = services[active];

  return (
    <section id="services" className="bg-ink">
      <div
        ref={pin}
        className="relative"
        // Una pantalla de base y un tramo por servicio.
        style={{ height: `calc(100svh + ${N * STEP_SVH}svh)` }}
      >
        {/* El header es fijo: el bloque anclado empieza por debajo de él. */}
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pb-[clamp(16px,2.5vw,44px)] pt-[calc(var(--header-h)+clamp(12px,2vw,36px))]">
          <SectionTitle className="mb-[clamp(1.25rem,3vw,3.5rem)] shrink-0">Lo que hacemos</SectionTitle>

          {/* Desktop: lista + imagen sincronizada. La imagen ocupa el alto libre en vez de su proporción. */}
          <div className="hidden min-h-0 flex-1 items-center lg:flex">
            <ul className="w-1/2 shrink-0">
              {services.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.title} className="relative">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={isActive}
                      className="group flex w-full flex-col items-start gap-4 py-[clamp(14px,1.6vw,32px)] pl-[var(--gutter)] pr-[clamp(80px,7vw,140px)] text-left"
                    >
                      <span
                        className={`text-[length:var(--fs-h3)] font-bold leading-tight tracking-[-0.01em] transition-colors duration-400 ${
                          isActive ? "text-yellow" : "text-muted group-hover:text-ash"
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

            <div className="relative h-full w-1/2 shrink-0 overflow-hidden">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={current.image} alt={current.title} fill sizes="50vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile / tablet: un servicio a la vez, el que toca por scroll */}
          <div className="flex min-h-0 flex-1 flex-col lg:hidden">
            <AnimatePresence mode="wait">
              <motion.article
                key={active}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex min-h-0 flex-1 flex-col"
              >
                <div className="shell flex shrink-0 flex-col gap-3 pb-5">
                  <h3 className="text-[length:var(--fs-h3)] font-bold text-yellow">{current.title}</h3>
                  <p className="text-[length:var(--fs-body)] text-bone">{current.items}</p>
                </div>
                <div className="relative min-h-0 w-full flex-1">
                  <Image src={current.image} alt={current.title} fill sizes="100vw" className="object-cover" />
                </div>
                <a
                  href="#contacto"
                  className="block shrink-0 bg-[#0b1a2e] py-4 text-center text-[length:var(--fs-body)] font-bold text-blue transition-colors duration-300 active:bg-[#10233c]"
                >
                  Consulta aquí
                </a>
              </motion.article>
            </AnimatePresence>

            {/* Por dónde se va */}
            <ul className="mt-4 flex shrink-0 items-center justify-center gap-2" aria-hidden>
              {services.map((s, i) => (
                <li
                  key={s.title}
                  className="h-1.5 rounded-full transition-all duration-500 ease-wuality"
                  style={{ width: i === active ? 28 : 6, backgroundColor: i === active ? "#f4f4f4" : "#2a3335" }}
                />
              ))}
            </ul>
          </div>

          <div className="mt-[clamp(16px,2vw,36px)] hidden shrink-0 justify-center lg:flex">
            <Cta />
          </div>
        </div>
      </div>
    </section>
  );
}
