"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { hero } from "@/lib/content";

/**
 * Secuencia del Figma: el titular entra por palabras, la tarjeta blanca con el
 * video se expande a pantalla completa mientras se hace scroll y aparecen
 * "Innovamos" (arriba izq.) y "Conectamos" (abajo der.).
 */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Fase 1 (0 → .55): la tarjeta crece. Fase 2 (.55 → 1): full-bleed + palabras.
  const width = useTransform(scrollYProgress, [0, 0.58], ["var(--card-w)", "100vw"]);
  const height = useTransform(scrollYProgress, [0, 0.58], ["var(--card-h)", "100svh"]);
  const radius = useTransform(scrollYProgress, [0, 0.58], [48, 0]);
  const pad = useTransform(scrollYProgress, [0, 0.4], ["clamp(10px,0.83vw,16px)", "0px"]);
  const centerY = useTransform(scrollYProgress, [0, 0.58], ["72%", "50%"]);
  const chipOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);

  const headlineOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  const wordsOpacity = useTransform(scrollYProgress, [0.55, 0.72], [0, 1]);
  const leftX = useTransform(scrollYProgress, [0.55, 0.85], ["-12%", "0%"]);
  const rightX = useTransform(scrollYProgress, [0.55, 0.85], ["12%", "0%"]);

  const words = hero.headline.split(" ");

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[320svh]"
      style={
        {
          // Tamaño de la tarjeta en reposo (601×609 en el diseño de 1920).
          "--card-w": "clamp(280px, 31.3vw, 601px)",
          "--card-h": "clamp(284px, 31.7vw, 609px)",
        } as React.CSSProperties
      }
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Titular */}
        <motion.h1
          style={reduced ? undefined : { opacity: headlineOpacity, y: headlineY }}
          className="shell h-display absolute inset-x-0 top-[calc(var(--header-h)+clamp(28px,3.4vw,66px))] z-10 mx-auto max-w-[1600px] text-center text-bone"
        >
          {words.map((w, i) => (
            <motion.span
              key={`${w}-${i}`}
              initial={reduced ? false : { opacity: 0, y: "0.4em", filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block whitespace-pre"
            >
              {w}{" "}
            </motion.span>
          ))}
        </motion.h1>

        {/* Palabras del bloque a pantalla completa */}
        <motion.span
          style={reduced ? { opacity: 1 } : { opacity: wordsOpacity, x: leftX }}
          className="pointer-events-none absolute left-[var(--gutter)] top-[calc(var(--header-h)+clamp(12px,2vw,40px))] z-20 text-[clamp(2.5rem,5.8vw,7rem)] font-bold leading-none tracking-[-0.02em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]"
        >
          {hero.words[0]}
        </motion.span>
        <motion.span
          style={reduced ? { opacity: 1 } : { opacity: wordsOpacity, x: rightX }}
          className="pointer-events-none absolute bottom-[clamp(16px,2.6vw,50px)] right-[var(--gutter)] z-20 text-[clamp(2.5rem,5.8vw,7rem)] font-bold leading-none tracking-[-0.02em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]"
        >
          {hero.words[1]}
        </motion.span>

        {/* Tarjeta / video */}
        <motion.div
          style={
            reduced
              ? { width: "var(--card-w)", height: "var(--card-h)", top: "72%" }
              : { width, height, borderRadius: radius, padding: pad, top: centerY }
          }
          className="absolute left-1/2 z-[15] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center overflow-hidden bg-bone"
        >
          <motion.div
            style={reduced ? undefined : { opacity: chipOpacity }}
            className="mb-[clamp(6px,0.6vw,12px)] flex h-[clamp(34px,3.2vw,62px)] w-[clamp(60px,6.4vw,123px)] shrink-0 items-center justify-center rounded-[clamp(8px,0.83vw,16px)] bg-[#e7e7e7]"
          >
            <Image
              src="/media/brand/isotype-red.svg"
              alt="Wuality"
              width={80}
              height={40}
              className="h-[clamp(16px,1.35vw,26px)] w-auto"
            />
          </motion.div>

          <motion.div
            style={reduced ? undefined : { borderRadius: radius }}
            className="relative w-full flex-1 overflow-hidden"
          >
            <Image
              src={hero.media}
              alt="Dos teléfonos mostrando interfaces diseñadas por Wuality"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
