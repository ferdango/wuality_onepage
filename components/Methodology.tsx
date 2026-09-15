"use client";

import { motion, useReducedMotion } from "motion/react";
import Carousel from "./ui/Carousel";
import MethodCycle from "./ui/MethodCycle";
import SectionTitle from "./ui/SectionTitle";
import { methodology } from "@/lib/content";

type Card = (typeof methodology)[number];

function MethodCard({ card }: { card: Card }) {
  return (
    <div className="relative w-full rounded-[clamp(10px,0.83vw,16px)] bg-[#141d21] p-[clamp(14px,1.25vw,24px)]">
      <span
        className="absolute -top-3 left-[clamp(10px,1vw,18px)] rounded-full px-3 py-1 text-[clamp(9px,0.63vw,12px)] font-bold"
        style={{ backgroundColor: card.tagColor, color: card.tagText }}
      >
        {card.tag}
      </span>
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

  return (
    <section id="edu" className="bg-ink py-[calc(var(--section-y)*1.4)]">
      <SectionTitle className="mb-[clamp(1.5rem,3.3vw,4rem)]">¿Cómo lo logramos?</SectionTitle>

      {/* Desktop: diagrama con tarjetas flotando alrededor */}
      <div className="relative mx-auto hidden aspect-[1920/860] w-full max-w-[1920px] lg:block">
        <div className="absolute left-1/2 top-1/2 h-[86%] w-[40%] -translate-x-1/2 -translate-y-1/2">
          <MethodCycle sizes="40vw" />
        </div>

        {methodology.map((card, i) => (
          <motion.div
            key={card.title}
            style={card.pos}
            initial={reduced ? false : { opacity: 0, y: 26, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="absolute w-[clamp(220px,17vw,326px)]"
          >
            <MethodCard card={card} />
          </motion.div>
        ))}
      </div>

      {/* Mobile / tablet: diagrama arriba, tarjetas en carrusel */}
      <div className="lg:hidden">
        <div className="relative mx-auto aspect-square w-[82%] max-w-[420px]">
          <MethodCycle sizes="82vw" />
        </div>

        <div className="mt-8">
          <Carousel
            ariaLabel="Pilares de la metodología de Wuality"
            slideClassName="w-[78%] sm:w-[48%]"
            gap="gap-4"
            railClassName="pt-4 px-[var(--gutter)] scroll-pl-[var(--gutter)]"
          >
            {methodology.map((card) => (
              <MethodCard key={card.title} card={card} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
