"use client";

import Image from "@/components/ui/Img";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";
import MethodCycle from "./ui/MethodCycle";
import SectionTitle from "./ui/SectionTitle";
import { methodology } from "@/lib/content";

type Card = (typeof methodology)[number];

/**
 * Orden del ciclo: amarilla → azul → magenta → roja. En la rueda esas cuatro
 * caen en las diagonales superior izquierda, inferior izquierda, inferior
 * derecha y superior derecha, así que llevarlas por turno al mismo sitio hace
 * girar el círculo en el sentido que marcan las puntas de la órbita.
 *
 * Los números son índices de `methodology`, que va en el orden del contenido
 * (Design Thinking, Feedback, Gestión ágil, Mejora continua).
 */
const CYCLE = [0, 2, 3, 1];
const STEPS = CYCLE.length;

function MethodCard({ card, active = true }: { card: Card; active?: boolean }) {
  return (
    <div
      className="relative w-full rounded-[clamp(10px,0.83vw,16px)] bg-[#141d21]/[0.68] p-[clamp(14px,1.25vw,24px)] backdrop-blur-[40px] transition-[opacity,scale] duration-700 ease-wuality"
      style={{ opacity: active ? 1 : 0.32, scale: active ? 1 : 0.96 }}
    >
      {/**
       * En lugar de la píldora de color, la figura del entregable que le toca:
       * es la misma que hace de nodo en el diagrama, así que la tarjeta y su
       * punto del ciclo se reconocen a la vez. El texto de la etiqueta no se
       * pierde, baja al interior sobre el título.
       */}
      <Image
        src={`/media/brand/figuras/${card.fig}.png`}
        alt=""
        width={380}
        height={380}
        className="absolute -top-[clamp(18px,1.5vw,28px)] left-[clamp(10px,1vw,18px)] h-auto w-[clamp(44px,3.6vw,68px)]"
      />
      <p
        className="mt-[clamp(20px,1.7vw,32px)] text-[clamp(9px,0.63vw,12px)] font-bold uppercase tracking-[0.08em]"
        style={{ color: card.tagColor }}
      >
        {card.tag}
      </p>
      <h3
        className="mt-1 text-[clamp(0.95rem,1.25vw,1.5rem)] font-bold"
        style={{ color: card.titleColor }}
      >
        {card.title}
      </h3>
      <p className="mt-2 text-[clamp(0.8125rem,0.94vw,1.125rem)] leading-snug text-ash">
        {card.body}
      </p>
    </div>
  );
}

export default function Methodology() {
  const reduced = useReducedMotion();
  const pin = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  /**
   * La sección se queda fija mientras se recorren los cuatro pilares. El
   * progreso se lee en JS y se convierte en un índice: no se ata a ninguna
   * propiedad de estilo, que es lo que hace que Motion lo entregue a un
   * ViewTimeline nativo y se quede congelado (ver Hero y Models).
   */
  const { scrollYProgress } = useScroll({ target: pin, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStep(Math.min(STEPS - 1, Math.max(0, Math.floor(v * STEPS))));
  });

  const activeIndex = CYCLE[step];
  const activeCard = methodology[activeIndex];
  // Un cuarto de vuelta por paso: así el siguiente pilar llega al mismo sitio.
  const angle = step * 90;

  return (
    <section id="edu" className="bg-ink">
      {/**
       * El contenedor mide cuatro pantallas y el contenido va pegado arriba: los
       * tres altos de scroll que sobran son los que reparten los cuatro pasos.
       * Pasado el cuarto, la sección se suelta y la página sigue normal.
       */}
      <div ref={pin} className="relative h-[400svh]">
        {/* El header es fijo: el bloque anclado tiene que empezar por debajo de él. */}
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pb-[clamp(16px,3vw,48px)] pt-[calc(var(--header-h)+clamp(8px,1.5vw,24px))]">
          <SectionTitle className="mb-[clamp(0.75rem,2.5vw,3rem)]">
            ¿Cómo lo logramos?
          </SectionTitle>

          {/* Desktop: diagrama con las cuatro tarjetas alrededor; sólo se enciende la del pilar en curso */}
          <div className="relative mx-auto hidden w-full max-w-[1920px] flex-1 lg:block">
            {/* Cuadrado: si la caja no lo fuera, `object-contain` dejaría franjas y las
                figuras dejarían de caer sobre la órbita. */}
            <div className="absolute left-1/2 top-1/2 aspect-square h-[86%] -translate-x-1/2 -translate-y-1/2">
              <MethodCycle sizes="40vw" angle={reduced ? undefined : angle} activeFig={activeCard.fig} />
            </div>

            {methodology.map((card, i) => (
              <div key={card.title} style={card.pos} className="absolute w-[clamp(220px,17vw,326px)]">
                {/* Cada una con su propio ritmo y desfase: en bloque parecería un ascensor. */}
                <div
                  className="method-float"
                  style={{ animationDelay: `${i * 0.85}s`, animationDuration: `${5.6 + i * 0.7}s` }}
                >
                  <MethodCard card={card} active={i === activeIndex} />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile / tablet: diagrama arriba y una sola tarjeta, la del pilar en curso */}
          <div className="flex flex-1 flex-col justify-center lg:hidden">
            <div className="relative mx-auto aspect-square w-[76%] max-w-[380px]">
              <MethodCycle sizes="76vw" angle={reduced ? undefined : angle} activeFig={activeCard.fig} />
            </div>

            {/**
             * Las cuatro apiladas y sólo visible la activa: el carrusel que había
             * aquí competía con el propio scroll, que es quien manda ahora.
             */}
            <div className="relative mt-[clamp(28px,7vw,48px)] px-[var(--gutter)]">
              {methodology.map((card, i) => (
                <div
                  key={card.title}
                  aria-hidden={i !== activeIndex}
                  className={`transition-opacity duration-500 ease-wuality ${
                    i === activeIndex ? "opacity-100" : "pointer-events-none absolute inset-x-[var(--gutter)] top-0 opacity-0"
                  }`}
                >
                  <MethodCard card={card} />
                </div>
              ))}
            </div>

            {/* Cuántos pilares quedan por delante */}
            <ul className="mt-[clamp(16px,4vw,28px)] flex items-center justify-center gap-2" aria-hidden>
              {CYCLE.map((cardIndex, i) => (
                <li
                  key={cardIndex}
                  className="h-1.5 rounded-full transition-all duration-500 ease-wuality"
                  style={{
                    width: i === step ? 28 : 6,
                    backgroundColor: i === step ? methodology[cardIndex].titleColor : "#2a3335",
                  }}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
