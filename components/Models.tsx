"use client";

import Image from "@/components/ui/Img";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { models } from "@/lib/content";

export default function Models() {
  const claimRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  /**
   * Los valores ligados al scroll viajan como variables CSS. Enlazarlos a
   * `opacity` o a transforms hace que Motion los acelere sobre un ViewTimeline
   * nativo cuyo rango no coincide con el de la librería en JS (misma razón que
   * en Hero).
   */
  const { scrollYProgress: claimProgress } = useScroll({
    target: claimRef,
    offset: ["start end", "end start"],
  });
  const shift = useMotionTemplate`${useTransform(claimProgress, [0, 0.5], [8, 0])}`;

  /**
   * "end start" y no "end end": el contenedor puede ser más corto que el
   * viewport y ese rango se invierte, dejando el progreso saltando entre 0 y 1.
   * Este mide desde que el contenedor toca el borde superior hasta que lo
   * abandona, y es correcto sea cual sea su altura.
   */
  const { scrollYProgress: stackProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end start"],
  });
  const stack = useMotionTemplate`${stackProgress}`;

  const total = models.cards.length;

  return (
    <section className="bg-ink pb-[calc(var(--section-y)*1.6)] pt-[calc(var(--section-y)*1.6)]">
      {/* Claim: 220px en el Figma de 1920, 64px en el de 360 */}
      <motion.div
        ref={claimRef}
        className="shell relative flex min-h-[60svh] flex-col items-center justify-center overflow-hidden"
        style={
          {
            "--shift": reduced ? 0 : shift,
            /**
             * 220px sobre el lienzo de 1920 del Figma, es decir 11.458vw.
             * El segundo `min` acota el tamaño al ancho disponible: "only one
             * effect" es la línea más larga (~6em en Chau Philomene One) y sin
             * ese tope se sale de pantalla en móvil, donde el nodo del Figma
             * usa una variante más estrecha que la de Google Fonts.
             */
            "--claim": "min(clamp(4rem, 11.458vw, 13.75rem), calc((100vw - 2 * var(--gutter)) / 6))",
          } as React.CSSProperties
        }
      >
        {/**
         * Elemento gráfico de marca: dos esferas que se encuentran. Dice lo
         * mismo que el titular —dos que acaban siendo uno— así que va detrás
         * del texto, con el punto de encuentro a la altura del hueco entre las
         * dos líneas.
         *
         * El original viene sobre negro; con `screen` ese negro desaparece y
         * sólo queda el resplandor rojo, así que no hacen falta máscaras ni se
         * ven los cantos del encuadre. Se dimensiona para sangrar por los
         * cuatro lados —de ahí el `max` entre ancho y alto de viewport—: si
         * cupiera entero se verían dos círculos completos en vez de dos arcos.
         */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen [mask-image:linear-gradient(to_bottom,transparent,black_26%,black_74%,transparent)]"
        >
          <Image
            src="/media/brand/esferas-convergen.jpg"
            alt=""
            width={1400}
            height={1400}
            className="absolute left-1/2 top-1/2 size-[max(118vw,86svh)] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-30"
            style={{ scale: "calc(1 + var(--shift) * 0.014)" }}
          />
        </div>

        <p
          className="relative whitespace-nowrap text-center text-[length:var(--claim)] font-bold leading-[1] tracking-[-0.02em] text-bone"
          style={{ translate: "calc(var(--shift) * 1%) 0" }}
        >
          {models.line1}
        </p>
        <p
          className="relative mt-[clamp(2.4375rem,5vw,6rem)] whitespace-nowrap text-center font-chau text-[length:var(--claim)] leading-[1] tracking-[-0.01em] text-bone"
          style={{ translate: "calc(var(--shift) * -1%) 0" }}
        >
          {models.line2}
        </p>
      </motion.div>

      {/**
       * Las tarjetas se apilan: cada una queda fija un poco más abajo que la
       * anterior, de modo que al bajar la siguiente se monta encima y deja
       * asomando el borde de la de atrás, que además se encoge y se oscurece.
       */}
      <motion.div
        ref={stackRef}
        className="shell mt-[clamp(32px,3.3vw,64px)]"
        style={
          {
            "--stack-progress": reduced ? 1 : stack,
            "--stack-step": "clamp(14px,1.25vw,24px)",
          } as React.CSSProperties
        }
      >
        {models.cards.map((card, i) => {
          const isLast = i === total - 1;
          return (
            <div
              key={card.title}
              className="sticky mx-auto w-full max-w-[1024px] last:mb-0 mb-[clamp(24px,4vw,80px)]"
              style={
                {
                  // 48px de aire bajo el header: pegada arriba se veía apretada.
                  top: `calc(var(--header-h) + 48px + ${i} * var(--stack-step))`,
                  zIndex: i + 1,
                  // 0 mientras la tarjeta manda, 1 cuando ya está cubierta.
                  "--k": isLast ? "0" : `clamp(0, var(--stack-progress) * ${total} - ${i}, 1)`,
                } as React.CSSProperties
              }
            >
              <article
                className="grid origin-top overflow-hidden shadow-[0_-24px_60px_-30px_rgba(0,0,0,0.9)] lg:grid-cols-2"
                style={
                  reduced
                    ? undefined
                    : {
                        scale: "calc(1 - var(--k) * 0.05)",
                        filter: "brightness(calc(1 - var(--k) * 0.35))",
                      }
                }
              >
                <div
                  className="flex flex-col justify-between gap-[clamp(20px,2.1vw,40px)] px-[clamp(20px,2.1vw,40px)] py-[clamp(36px,3.75vw,72px)] lg:aspect-[616/380] lg:px-[clamp(24px,2.5vw,48px)]"
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
            </div>
          );
        })}

        {/* Sin este respiro la última tarjeta no tiene recorrido para quedarse fija */}
        <div className="h-[clamp(120px,32vh,360px)]" aria-hidden />
      </motion.div>
    </section>
  );
}
