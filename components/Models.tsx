"use client";

import Image from "next/image";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Carousel from "./ui/Carousel";
import Reveal from "./ui/Reveal";
import { models } from "@/lib/content";

type Card = (typeof models.cards)[number];

function ModelCard({ card }: { card: Card }) {
  return (
    <article className="grid overflow-hidden lg:grid-cols-2">
      <div
        className="flex flex-col justify-between gap-[clamp(20px,2.1vw,40px)] p-[clamp(20px,2.1vw,40px)] lg:aspect-[616/380] lg:p-[clamp(24px,2.5vw,48px)]"
        style={{ backgroundColor: card.bg }}
      >
        <div>
          <h3 className="text-[clamp(1.5rem,2.5vw,3rem)] font-bold leading-tight text-white">
            {card.title}
          </h3>
          <p className="mt-[clamp(10px,1.05vw,20px)] max-w-[42ch] text-[var(--fs-xs)] leading-relaxed text-white/90">
            {card.body}
          </p>
        </div>

        <a
          href="#contacto"
          className="group inline-flex w-fit items-center gap-4 rounded-full border border-white/70 px-[clamp(16px,1.25vw,24px)] py-[clamp(9px,0.83vw,16px)] text-[var(--fs-xs)] font-semibold text-white transition-colors duration-400 hover:bg-white/10"
        >
          {card.cta}
          <span className="relative block h-[2px] w-6 overflow-hidden bg-white/60">
            <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 ease-wuality group-hover:translate-x-0" />
          </span>
        </a>
      </div>

      <div className="relative aspect-[616/380] w-full">
        <Image
          src={card.image}
          alt={card.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </article>
  );
}

export default function Models() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  /**
   * Las dos líneas del claim entran desde lados opuestos. El desplazamiento
   * viaja como variable CSS en vez de como transform: un transform enlazado a
   * `useScroll` con `target` acaba acelerado por hardware sobre un ViewTimeline
   * cuyo rango no coincide con el de la librería en JS (misma razón que en Hero).
   */
  const shift = useMotionTemplate`${useTransform(scrollYProgress, [0, 0.5], [8, 0])}`;

  return (
    <section className="bg-ink py-[calc(var(--section-y)*1.6)]">
      <motion.div
        ref={ref}
        className="shell flex flex-col items-center overflow-hidden"
        style={{ "--shift": reduced ? 0 : shift } as React.CSSProperties}
      >
        <p
          className="text-center text-[clamp(2rem,5.4vw,6.5rem)] font-bold leading-[1.15] tracking-[-0.02em] text-bone"
          style={{ translate: "calc(var(--shift) * 1%) 0" }}
        >
          {models.line1}
        </p>
        <p
          className="mt-[clamp(6px,1vw,20px)] text-center text-[clamp(2rem,5.4vw,6.5rem)] font-medium leading-[1.15] tracking-[-0.02em] text-bone"
          style={{ translate: "calc(var(--shift) * -1%) 0" }}
        >
          {models.line2}
        </p>
      </motion.div>

      {/* Desktop: tarjetas apiladas y desalineadas como en el Figma */}
      <div className="shell mt-[clamp(32px,3.3vw,64px)] hidden flex-col items-center lg:flex">
        {models.cards.map((card, i) => (
          <Reveal
            key={card.title}
            delay={i * 0.1}
            className={`w-full max-w-[1232px] ${i === 1 ? "-ml-[clamp(0px,1.3vw,25px)]" : "ml-[clamp(0px,1.3vw,25px)]"}`}
          >
            <ModelCard card={card} />
          </Reveal>
        ))}
      </div>

      {/* Mobile / tablet: carrusel con dots */}
      <div className="shell mt-8 lg:hidden">
        <Carousel ariaLabel="Modelos de trabajo" slideClassName="w-full sm:w-[70%]" gap="gap-4">
          {models.cards.map((card) => (
            <ModelCard key={card.title} card={card} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
