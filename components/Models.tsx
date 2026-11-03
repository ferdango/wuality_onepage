"use client";

import Image from "@/components/ui/Img";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";
import { useContent } from "./LangProvider";

const number = (i: number) => String(i + 1).padStart(2, "0");

/**
 * "Modelos de trabajo". Antes era un titular gigante en dos tipografías (la
 * segunda, Chau Philomene One, venía del Figma y no está en el manual) sobre
 * mucho vacío, y dos tarjetas que se apilaban con el scroll sin verse nunca
 * juntas. Ahora, como presentan sus modelos Huge o Globant:
 *
 *   - encabezado de banda (rótulo, titular, contexto), como el resto del sitio;
 *   - las dos opciones lado a lado, para compararlas: qué es, para quién, qué
 *     incluye y un botón que dice adónde lleva;
 *   - debajo, lo que comparten los dos, que es el "mismo compromiso".
 *
 * Se queda el gesto de marca: las dos esferas que convergen (dos que acaban
 * siendo uno), detrás del encabezado, acercándose con el scroll.
 */
export default function Models() {
  const { models } = useContent();
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  /**
   * Va como variable CSS y no atado a un transform: enlazado directamente,
   * Motion lo pasa a un ViewTimeline nativo y se congela (ver Hero).
   */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const converge = useMotionTemplate`${useTransform(scrollYProgress, [0, 1], [1, 0])}`;

  return (
    <section ref={ref} id="modelos" className="relative overflow-hidden bg-ink py-[calc(var(--section-y)*1.7)] text-bone">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[clamp(420px,52vw,880px)] overflow-hidden mix-blend-screen [mask-image:linear-gradient(to_bottom,black_40%,transparent)]"
        style={{ "--k": reduced ? 0 : converge } as React.CSSProperties}
      >
        {/* El original viene sobre negro: con `screen` el negro desaparece y queda el resplandor. */}
        <Image
          src="/media/brand/esferas-convergen.jpg"
          alt=""
          width={1400}
          height={1400}
          className="absolute left-1/2 top-[-18%] w-[max(110vw,900px)] max-w-none -translate-x-1/2 opacity-30"
          style={{ scale: "calc(1 + var(--k) * 0.18)" }}
        />
      </motion.div>

      <div className="shell relative mx-auto max-w-[1760px]">
        <div className="grid items-end gap-[clamp(20px,4vw,80px)] lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Reveal>
              <Eyebrow tone="light">{models.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-section mt-[clamp(16px,1.6vw,28px)] max-w-[16ch] text-balance">{models.title}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[46ch] text-[length:var(--fs-body)] leading-relaxed text-ash">{models.lead}</p>
          </Reveal>
        </div>

        <div className="mt-[clamp(36px,4.5vw,88px)] grid gap-[clamp(14px,1.5vw,28px)] lg:grid-cols-2">
          {models.cards.map((card, i) => (
            <Reveal key={card.title} delay={0.06 * i} className="h-full">
              <article
                className="flex h-full flex-col overflow-hidden rounded-[clamp(16px,1.6vw,32px)]"
                style={{ backgroundColor: card.bg }}
              >
                <figure className="relative aspect-[16/9] w-full">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 46vw"
                    className="object-cover"
                  />
                </figure>

                <div className="flex flex-1 flex-col p-[clamp(22px,2.4vw,48px)]">
                  {/* En blanco translúcido: el rojo sobre el azul noche o la ciruela no llega a 4,5:1. */}
                  <p className="text-[length:var(--fs-xs)] font-semibold tabular-nums text-white/75">{number(i)}</p>
                  <h3 className="mt-2 text-[length:clamp(1.625rem,1rem_+_1.8vw,3rem)] font-bold leading-tight tracking-[-0.02em]">
                    {card.title}
                  </h3>
                  <p className="mt-[clamp(10px,1vw,18px)] max-w-[48ch] text-[length:var(--fs-body)] leading-relaxed text-white/90">
                    {card.body}
                  </p>
                  <p className="mt-[clamp(10px,1vw,18px)] max-w-[48ch] text-[length:var(--fs-sm)] leading-relaxed text-white/75">
                    {card.ideal}
                  </p>

                  <p className="mt-[clamp(20px,2vw,36px)] text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-white/70">
                    {models.includes}
                  </p>
                  <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                    {card.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-[length:var(--fs-sm)] leading-snug">
                        <svg viewBox="0 0 24 24" aria-hidden className="mt-[0.15em] size-[1.05em] shrink-0 text-sky" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Abajo del todo, para que los dos botones queden alineados aunque el texto mida distinto. */}
                  <div className="mt-auto pt-[clamp(24px,2.6vw,48px)]">
                    <a
                      href="#contacto"
                      className="group inline-flex w-fit items-center gap-3 rounded-full bg-bone px-6 py-3 text-[length:var(--fs-xs)] font-semibold text-ink transition-colors duration-300 hover:bg-white"
                    >
                      {card.cta}
                      <svg viewBox="0 0 24 24" aria-hidden className="size-4 transition-transform duration-400 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 12h15M13 6l6 6-6 6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Lo que comparten los dos modelos: el "mismo compromiso" del titular. */}
        <Reveal delay={0.1}>
          <div className="mt-[clamp(14px,1.5vw,28px)] rounded-[clamp(16px,1.6vw,32px)] border border-line p-[clamp(22px,2.4vw,48px)]">
            <Eyebrow tone="light">{models.shared.title}</Eyebrow>
            <ul className="mt-[clamp(16px,1.6vw,28px)] grid gap-x-[clamp(20px,2.4vw,48px)] gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              {models.shared.items.map((item) => (
                <li key={item} className="border-t border-line pt-4 text-[length:var(--fs-body)] font-semibold leading-snug">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
