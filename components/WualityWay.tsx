"use client";

import Image from "@/components/ui/Img";
import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";
import { useContent } from "./LangProvider";

/** Tiempo en cada paso mientras el punto recorre el método. */
const STEP_MS = 2400;

/**
 * "The Wuality Way", la metodología del Brand Manifesto 2026: Understand →
 * Simplify → Build → Measure → Evolve. Sustituye al ciclo de cuatro pilares,
 * que no coincidía con el método de la marca, y deja de anclar el scroll: los
 * cinco pasos se leen de un vistazo, como el "Our approach" de ustwo.
 *
 * Lo innovador va en un detalle: The Wuality Point recorre la línea de paso en
 * paso mientras la sección está a la vista, y el paso en curso se enciende.
 * Con "reducir movimiento" no recorre nada y los cinco se ven iguales.
 */
export default function WualityWay() {
  const { way } = useContent();
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const inView = useInView(listRef, { amount: 0.4 });
  const [active, setActive] = useState(0);
  const count = way.steps.length;

  useEffect(() => {
    if (reduced || !inView) return;
    const id = setInterval(() => setActive((i) => (i + 1) % count), STEP_MS);
    return () => clearInterval(id);
  }, [reduced, inView, count]);

  const lit = (i: number) => reduced || i === active;

  return (
    <section id="metodo" className="relative overflow-hidden bg-ink text-bone">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[12%] top-[8%] aspect-square w-[46%] rounded-full bg-[radial-gradient(circle,rgba(244,37,48,0.28),transparent_65%)] blur-3xl"
      />

      <div className="shell relative mx-auto max-w-[1760px] py-[calc(var(--section-y)*1.7)]">
        <div className="grid items-end gap-[clamp(28px,4vw,80px)] lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Reveal>
              <Eyebrow tone="light">{way.eyebrow}</Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="h-section mt-[clamp(16px,1.6vw,28px)] max-w-[14ch] text-balance">{way.title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-[clamp(16px,1.6vw,28px)] max-w-[46ch] text-[length:var(--fs-body)] leading-relaxed text-ash">
                {way.lead}
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <figure className="relative aspect-[16/9] w-full overflow-hidden rounded-[clamp(16px,1.6vw,32px)]">
              <Image src={way.image} alt={way.alt} fill sizes="(max-width: 1024px) 100vw, 52vw" className="object-cover" />
            </figure>
          </Reveal>
        </div>

        {/**
         * La línea va por arriba en desktop y por la izquierda en móvil. En
         * desktop un solo punto la recorre: la columna i de una retícula de n
         * columnas con hueco g empieza en i · (ancho + g) / n, de ahí `left`.
         * En móvil cada paso enciende su propio punto.
         */}
        <ol
          ref={listRef}
          className="relative mt-[clamp(48px,6vw,112px)] grid gap-[clamp(28px,3vw,40px)] pl-10 [--gap-x:clamp(16px,2vw,40px)] lg:grid-cols-5 lg:gap-x-[var(--gap-x)] lg:pl-0 lg:pt-14"
          style={{ "--i": active, "--n": count } as React.CSSProperties}
        >
          <span
            aria-hidden
            className="absolute bottom-2 left-[9px] top-2 w-px bg-line lg:inset-x-0 lg:bottom-auto lg:top-[9px] lg:h-px lg:w-auto"
          />
          {!reduced && (
            <span
              aria-hidden
              className="absolute top-0 z-10 hidden size-5 rounded-full bg-red shadow-[0_0_24px_6px_rgba(244,37,48,0.55)] transition-[left] duration-700 ease-wuality lg:block"
              style={{ left: "calc(var(--i) * (100% + var(--gap-x)) / var(--n))" }}
            />
          )}

          {way.steps.map((step, i) => (
            <li
              key={step.key}
              className="relative transition-opacity duration-500"
              style={{ opacity: lit(i) ? 1 : 0.45 }}
            >
              {/* Punto de cada paso sobre la línea; en móvil es el que marca el activo. */}
              <span
                aria-hidden
                className={`absolute -left-10 top-1 size-5 rounded-full border-2 transition-colors duration-500 lg:-top-14 lg:left-0 ${
                  lit(i) ? `border-red bg-red ${reduced ? "" : "lg:border-line lg:bg-ink"}` : "border-line bg-ink"
                }`}
              />
              <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-sky">
                {String(i + 1).padStart(2, "0")} · {step.key}
              </p>
              <h3 className="mt-3 text-[length:var(--fs-h4)] font-semibold leading-tight">{step.title}</h3>
              <p className="mt-3 text-[length:var(--fs-sm)] leading-relaxed text-ash">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
