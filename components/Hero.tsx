"use client";

import Image from "@/components/ui/Img";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import BrandPattern, { type Piece } from "./ui/BrandPattern";
import { hero } from "@/lib/content";

/** Parte del recorrido que ocupa la subida inicial del teléfono. */
const RISE = 0.22;

/**
 * Secuencia del Figma en dos actos.
 *
 * 1. Reposo: el teléfono asoma por abajo (su base queda un 30% de su altura
 *    fuera de pantalla) y sube entero al empezar a hacer scroll.

 * 2. Ya arriba, arranca la secuencia original: el chasis se desvanece, la
 *    pantalla se expande a full-bleed y aparecen "Innovamos" (arriba izq.) y
 *    "Conectamos" (abajo der.).
 *
 * El titular se desvanece durante la subida, no después: al tamaño actual el
 * teléfono llega a ocupar su sitio, y si siguiera a plena opacidad quedaría
 * tapado a medias.
 *
 * Nota de implementación: los valores ligados al scroll se publican como
 * variables CSS y los hijos las consumen con CSS plano. Enlazarlos directamente
 * a `opacity` o a transforms hace que Motion los acelere por hardware con un
 * ViewTimeline nativo, cuyo rango "contain" queda degenerado cuando el objetivo
 * es más alto que el viewport —esta sección mide 320svh— y el progreso se
 * congela. Las propiedades no acelerables sí pueden ir enlazadas.
 */
/** Costados y franja bajo el titular; el teléfono ocupa el centro. */
const HERO_MOBILE: Piece[] = [
  { fig: "cinta-calida", x: 21, y: 32, w: 31, cap: 15, rotate: -14, opacity: 0.5 },
  { fig: "gota-azul", x: 80, y: 28, w: 27, cap: 12, rotate: 16, opacity: 0.45 },
  { fig: "esfera-roja", x: 88, y: 46, w: 20, cap: 11, opacity: 0.45 },
  { fig: "esfera-amarilla", x: 13, y: 52, w: 22, cap: 12, opacity: 0.4 },
  { fig: "cinta-magenta", x: 20, y: 88, w: 30, cap: 14, rotate: 18, opacity: 0.4 },
  { fig: "cinta-fria", x: 80, y: 82, w: 29, cap: 13, rotate: -10, opacity: 0.42 },
];

/** En desktop el mockup deja libres los dos tercios laterales. */
const HERO_DESKTOP: Piece[] = [
  { fig: "cinta-calida", x: 11, y: 40, w: 17, cap: 30, rotate: -16, opacity: 0.5 },
  { fig: "esfera-amarilla", x: 24, y: 22, w: 8, cap: 15, opacity: 0.4 },
  { fig: "gota-azul", x: 9, y: 72, w: 11, cap: 18, rotate: 12, opacity: 0.42 },
  { fig: "esfera-roja", x: 22, y: 78, w: 9, cap: 16, opacity: 0.45 },
  { fig: "cinta-fria", x: 89, y: 36, w: 17, cap: 30, rotate: 14, opacity: 0.5 },
  { fig: "esfera-roja", x: 76, y: 20, w: 8, cap: 14, opacity: 0.4 },
  { fig: "cinta-magenta", x: 88, y: 76, w: 13, cap: 23, rotate: -18, opacity: 0.4 },
  { fig: "esfera-amarilla", x: 78, y: 84, w: 9, cap: 16, opacity: 0.4 },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Acto 1: el teléfono sube hasta quedar completo en pantalla.
  const rise = useMotionTemplate`${useTransform(scrollYProgress, [0, RISE], [1, 0])}`;

  // Acto 2: el resto del recorrido, remapeado a 0→1 para no tocar la secuencia.
  const main = useTransform(scrollYProgress, [RISE, 1], [0, 1]);

  const grow = useTransform(main, [0, 0.58], [0, 1]);
  const width = useMotionTemplate`calc(var(--dev-w) + (100vw - var(--dev-w)) * ${grow})`;
  const height = useMotionTemplate`calc(var(--dev-h) + (100svh - var(--dev-h)) * ${grow})`;

  // El marco y las esquinas se reducen a cero: el chasis desaparece y queda el video.
  const bezelK = useTransform(main, [0, 0.42], [1, 0]);
  const padding = useMotionTemplate`calc(var(--bezel) * ${bezelK})`;
  const radiusK = useTransform(main, [0, 0.58], [1, 0]);
  const radius = useMotionTemplate`calc(var(--radius) * ${radiusK})`;
  const screenRadius = useMotionTemplate`calc((var(--radius) - var(--bezel)) * ${radiusK})`;

  // De su sitio de reposo al centro de la pantalla, a medida que se expande.
  const toCentre = useMotionTemplate`${useTransform(main, [0, 0.58], [0, 1])}`;

  // Los detalles del dispositivo se van antes que el marco, para que no se estiren.
  const chrome = useMotionTemplate`${useTransform(main, [0, 0.12], [1, 0])}`;
  const chip = useMotionTemplate`${useTransform(main, [0, 0.22], [1, 0])}`;
  const headOpacity = useMotionTemplate`${useTransform(scrollYProgress, [0, RISE * 0.8], [1, 0])}`;
  const headShift = useMotionTemplate`${useTransform(scrollYProgress, [0, RISE * 0.8], [0, -80])}`;
  const wordOpacity = useMotionTemplate`${useTransform(main, [0.55, 0.72], [0, 1])}`;
  const wordShift = useMotionTemplate`${useTransform(main, [0.55, 0.85], [12, 0])}`;

  const scrollVars = reduced
    ? { "--rise": 0, "--to-centre": 0, "--chrome": 1, "--chip": 1, "--head-op": 1, "--head-y": 0, "--word-op": 1, "--word-x": 0 }
    : {
        "--rise": rise,
        "--to-centre": toCentre,
        "--chrome": chrome,
        "--chip": chip,
        "--head-op": headOpacity,
        "--head-y": headShift,
        "--word-op": wordOpacity,
        "--word-x": wordShift,
      };

  const words = hero.headline.split(" ");

  const sideButton =
    "absolute w-[var(--btn-w)] rounded-full bg-[linear-gradient(180deg,#b9b9c0,#6f6f78_45%,#cfcfd6)] opacity-[var(--chrome)]";

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[320svh]"
      style={
        {
          // Proporciones reales de un iPhone (402 × 874 pt, radio 55, isla 125 × 36).
          /**
           * El `min` exterior es el que manda en pantallas bajas: por muy grande
           * que lo pida el ancho, el teléfono nunca pasa del 82% del alto del
           * viewport, que es lo que necesita para caber entero con su margen.
           */
          "--dev-h": "min(clamp(780px, 62.4vw, 1200px), 82svh)",
          "--dev-w": "calc(var(--dev-h) * 0.46)",
          "--bezel": "calc(var(--dev-w) * 0.026)",
          "--radius": "calc(var(--dev-w) * 0.137)",
          "--btn-w": "calc(var(--dev-w) * 0.0095)",
          // Reposo: apoyado cerca del borde inferior, entero en pantalla.
          "--rest-top": "calc(100svh - var(--dev-h) / 2 - 16px)",
          // Arranque: su base un 30% de la altura por debajo del borde.
          "--rise-from": "calc(var(--dev-h) * 0.3 + 16px)",
        } as React.CSSProperties
      }
    >
      <motion.div
        className="sticky top-0 h-[100svh] overflow-hidden"
        style={scrollVars as React.CSSProperties}
      >
        {/**
         * Fondo de marca. Va lo primero y sin z propio, así que queda por
         * debajo del titular (z-10) y del mockup (z-15). Dos repartos
         * distintos porque el hueco libre no es el mismo: en móvil el teléfono
         * se come el centro y sólo quedan los costados y la franja bajo el
         * titular; en desktop sobra sitio a izquierda y derecha.
         */}
        <BrandPattern className="md:hidden" pieces={HERO_MOBILE} />
        <BrandPattern className="hidden md:block" pieces={HERO_DESKTOP} />

        {/* Titular */}
        <h1
          className="shell h-display absolute inset-x-0 top-[calc(var(--header-h)+clamp(28px,3.4vw,66px))] z-10 mx-auto max-w-[1600px] text-center text-bone"
          style={{ opacity: "var(--head-op)", translate: "0 calc(var(--head-y) * 1px)" }}
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
        </h1>

        {/* Palabras del bloque a pantalla completa */}
        <span
          className="pointer-events-none absolute left-[var(--gutter)] top-[calc(var(--header-h)+clamp(12px,2vw,40px))] z-20 text-[clamp(2.5rem,5.8vw,7rem)] font-bold leading-none tracking-[-0.02em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]"
          style={{ opacity: "var(--word-op)", translate: "calc(var(--word-x) * -1%) 0" }}
        >
          {hero.words[0]}
        </span>
        <span
          className="pointer-events-none absolute bottom-[clamp(16px,2.6vw,50px)] right-[var(--gutter)] z-20 text-[clamp(2.5rem,5.8vw,7rem)] font-bold leading-none tracking-[-0.02em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]"
          style={{ opacity: "var(--word-op)", translate: "calc(var(--word-x) * 1%) 0" }}
        >
          {hero.words[1]}
        </span>

        {/* iPhone */}
        <motion.div
          style={
            {
              ...(reduced
                ? {
                    width: "var(--dev-w)",
                    height: "var(--dev-h)",
                    borderRadius: "var(--radius)",
                    padding: "var(--bezel)",
                  }
                : { width, height, borderRadius: radius, padding }),
              top: "calc(var(--rest-top) + (50svh - var(--rest-top)) * var(--to-centre))",
              /**
               * El centrado va aquí y no en clases: Tailwind v4 implementa
               * `-translate-x-1/2` con la propiedad `translate`, que este estilo
               * en línea pisaría, dejando el teléfono descentrado.
               */
              translate: "-50% calc(-50% + var(--rise-from) * var(--rise))",
            } as React.CSSProperties
          }
          className="absolute left-1/2 z-[15] bg-[linear-gradient(145deg,#e4e4e9_0%,#9a9aa2_16%,#f4f4f7_32%,#74747d_56%,#dcdce1_76%,#82828b_100%)] shadow-[0_40px_120px_-24px_rgba(0,0,0,0.9)]"
        >
          {/* Botones del chasis */}
          <span className={`${sideButton} -left-[var(--btn-w)] top-[14%] h-[3.4%]`} aria-hidden />
          <span className={`${sideButton} -left-[var(--btn-w)] top-[22%] h-[7.4%]`} aria-hidden />
          <span className={`${sideButton} -left-[var(--btn-w)] top-[31%] h-[7.4%]`} aria-hidden />
          <span className={`${sideButton} -right-[var(--btn-w)] top-[24%] h-[11%]`} aria-hidden />

          {/* Pantalla */}
          <motion.div
            style={
              reduced
                ? { borderRadius: "calc(var(--radius) - var(--bezel))" }
                : { borderRadius: screenRadius }
            }
            className="relative h-full w-full overflow-hidden bg-black"
          >
            <Image
              src={hero.media}
              alt="Dos teléfonos mostrando interfaces diseñadas por Wuality"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />

            {/* Isla dinámica */}
            <span
              className="absolute left-1/2 top-[calc(var(--dev-h)*0.0126)] h-[calc(var(--dev-h)*0.0412)] w-[calc(var(--dev-w)*0.318)] -translate-x-1/2 rounded-full bg-black opacity-[var(--chrome)]"
              aria-hidden
            />

            {/* Marca sobre la pantalla */}
            <div className="absolute left-1/2 top-[calc(var(--dev-h)*0.075)] flex h-[calc(var(--dev-h)*0.058)] w-[calc(var(--dev-w)*0.29)] -translate-x-1/2 items-center justify-center rounded-[calc(var(--dev-w)*0.045)] bg-white/85 opacity-[var(--chip)] backdrop-blur-md">
              <Image
                src="/media/brand/isotype-red.svg"
                alt="Wuality"
                width={80}
                height={40}
                className="h-[calc(var(--dev-h)*0.027)] w-auto"
              />
            </div>

            {/* Indicador de inicio */}
            <span
              className="absolute bottom-[calc(var(--dev-h)*0.0095)] left-1/2 h-[calc(var(--dev-h)*0.006)] w-[34%] -translate-x-1/2 rounded-full bg-white/80 opacity-[var(--chrome)]"
              aria-hidden
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
