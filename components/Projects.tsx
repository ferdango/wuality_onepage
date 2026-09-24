"use client";

import Image from "@/components/ui/Img";
import {
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";
import { PROJECT_DETAIL_ID, useProjectSelection } from "./ProjectSelection";
import { projects } from "@/lib/content";

type Project = (typeof projects)[number];

const N = projects.length;

/** Scroll que consume cada proyecto mientras el panel está anclado. */
const STEP_SVH = 70;

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[1.1em] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function TrendIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[1.1em] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4v16h16" />
      <path d="m7 15 4-4 3 3 5-6" />
    </svg>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

/** Chip de la referencia: el servicio principal del caso, sobre cristal. */
function Chip({ label, tone = "light" }: { label: string; tone?: "light" | "dark" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-[clamp(10px,0.9vw,16px)] py-[clamp(5px,0.45vw,8px)] text-[clamp(11px,0.83vw,16px)] font-medium backdrop-blur-md ${
        // Cristal oscuro sobre foto: el claro de la referencia no se leía sobre fotos claras.
        tone === "light" ? "bg-ink/35 text-white" : "bg-ink/10 text-ink"
      }`}
    >
      <SearchIcon />
      {label}
      <TrendIcon />
    </span>
  );
}

/* ------------------------------------------------------------------------ */
/* Desktop: panel anclado                                                    */
/* ------------------------------------------------------------------------ */

function FeaturedDesktop() {
  const { select } = useProjectSelection();
  const reduced = useReducedMotion();
  const pin = useRef<HTMLDivElement>(null);
  const column = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLSpanElement>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);

  /**
   * El progreso viaja como variable CSS (`--p`, de 0 a N-1) y las dos columnas
   * lo consumen con `translate` en CSS. Atarlo directamente a un transform hace
   * que Motion lo entregue a un ViewTimeline nativo cuyo rango no coincide con
   * el de la librería, y se queda congelado (ver Hero y Models).
   */
  const { scrollYProgress } = useScroll({ target: pin, offset: ["start start", "end end"] });
  const p = useTransform(scrollYProgress, [0, 1], [0, N - 1]);
  const pVar = useMotionTemplate`${p}`;

  useMotionValueEvent(p, "change", (v) => {
    // En móvil el panel no se pinta y el progreso no significa nada.
    if (!pin.current?.offsetHeight) return;
    setActive(Math.min(N - 1, Math.max(0, Math.round(v))));
  });

  // El detalle de abajo sigue al proyecto en curso, sin mover la página.
  useEffect(() => {
    if (!pin.current?.offsetHeight) return;
    select(active, { scroll: false });
  }, [active, select]);

  /**
   * Botón que sigue al cursor. Descansa en el centro de la tarjeta activa y,
   * con el ratón encima de la columna, persigue el puntero con un poco de
   * inercia. Se mueve con `translate` escrito a mano en cada fotograma.
   */
  const target = useRef({ x: 0, y: 0, free: false });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const col = column.current;
    const btn = cursor.current;
    if (!col || !btn) return;
    let raf = 0;
    const rest = () => {
      target.current = { x: col.clientWidth / 2, y: col.clientHeight / 2, free: false };
    };
    rest();
    pos.current = { x: target.current.x, y: target.current.y };

    const tick = () => {
      const k = reduced ? 1 : 0.16;
      pos.current.x += (target.current.x - pos.current.x) * k;
      pos.current.y += (target.current.y - pos.current.y) * k;
      btn.style.translate = `${pos.current.x}px ${pos.current.y}px`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      const r = col.getBoundingClientRect();
      target.current = { x: e.clientX - r.left, y: e.clientY - r.top, free: true };
    };
    col.addEventListener("pointermove", onMove);
    col.addEventListener("pointerleave", rest);
    window.addEventListener("resize", rest);
    return () => {
      cancelAnimationFrame(raf);
      col.removeEventListener("pointermove", onMove);
      col.removeEventListener("pointerleave", rest);
      window.removeEventListener("resize", rest);
    };
  }, [reduced]);

  /**
   * El círculo de color nace de donde esté el botón en el momento en que la
   * tarjeta pasa a ser la activa, como en la referencia. Sin cursor, del centro.
   */
  useEffect(() => {
    const card = cards.current[active];
    const col = column.current;
    if (!card || !col) return;
    const c = card.getBoundingClientRect();
    const r = col.getBoundingClientRect();
    const x = ((r.left + pos.current.x - c.left) / c.width) * 100;
    const y = ((r.top + pos.current.y - c.top) / c.height) * 100;
    card.style.setProperty("--cx", `${Math.max(0, Math.min(100, x))}%`);
    card.style.setProperty("--cy", `${Math.max(0, Math.min(100, y))}%`);
  }, [active]);

  /** Pulsar un nombre lleva el scroll al tramo de ese proyecto. */
  const goTo = useCallback((i: number) => {
    const el = pin.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: top + (span * i) / (N - 1), behavior: smooth ? "smooth" : "auto" });
  }, []);

  return (
    <div
      ref={pin}
      className="relative hidden lg:block"
      // Una pantalla de base y un tramo por cada proyecto que falta por pasar.
      style={{ height: `calc(100svh + ${(N - 1) * STEP_SVH}svh)` }}
    >
      <div className="sticky top-0 h-[100svh] pb-[clamp(16px,1.7vw,32px)] pt-[calc(var(--header-h)+clamp(12px,1.25vw,24px))]">
        <motion.div
          className="shell h-full"
          style={
            {
              "--p": pVar,
              // Alto de cada nombre y de cada tarjeta: de ellos sale cuánto se desplaza cada columna por paso.
              "--item": "clamp(64px, 6vw, 118px)",
              "--card": "calc((100svh - var(--header-h)) * 0.58)",
              "--gap": "clamp(14px, 1.25vw, 24px)",
            } as React.CSSProperties
          }
        >
          <div className="grid h-full grid-cols-[46fr_54fr] overflow-hidden rounded-[clamp(24px,2.1vw,40px)] bg-[#101617]">
            {/* Lista de nombres: la del centro es la activa, las demás se apagan hacia los bordes */}
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_24%,black_76%,transparent)]">
              <ul
                className="absolute inset-x-0 top-[calc(50%-var(--item)/2)] px-[clamp(28px,3.3vw,64px)]"
                style={{ translate: "0 calc(var(--p) * var(--item) * -1)" }}
              >
                {projects.map((project, i) => (
                  <li key={project.slug} className="flex h-[var(--item)] items-center">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      className={`text-left text-[length:var(--fs-h2)] font-semibold leading-none tracking-[-0.02em] transition-[color,translate] duration-500 ease-wuality ${
                        i === active ? "translate-x-[0.18em] text-bone" : "text-[#4a5253] hover:text-ash"
                      }`}
                    >
                      {project.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Columna de tarjetas, sincronizada con la lista */}
            <div ref={column} className="relative cursor-none overflow-hidden">
              <div
                className="absolute inset-x-0 top-[calc(50%-var(--card)/2)] flex flex-col gap-[var(--gap)] px-[clamp(14px,1.25vw,24px)]"
                style={{ translate: "0 calc(var(--p) * (var(--card) + var(--gap)) * -1)" }}
              >
                {projects.map((project, i) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    active={i === active}
                    reduced={Boolean(reduced)}
                    onOpen={() => select(i)}
                    ref={(el) => {
                      cards.current[i] = el;
                    }}
                  />
                ))}
              </div>

              <span
                ref={cursor}
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 z-10 flex size-[clamp(56px,4.4vw,84px)] items-center justify-center rounded-full bg-mint text-ink shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)]"
                // `translate` lo escribe el bucle; el centrado va en `margin` para no pisarlo.
                style={{ marginLeft: "calc(clamp(56px,4.4vw,84px) / -2)", marginTop: "calc(clamp(56px,4.4vw,84px) / -2)" }}
              >
                <ArrowIcon className="size-[38%]" />
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  active,
  reduced,
  onOpen,
  ref,
}: {
  project: Project;
  active: boolean;
  reduced: boolean;
  onOpen: () => void;
  ref: (el: HTMLButtonElement | null) => void;
}) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      aria-controls={PROJECT_DETAIL_ID}
      aria-label={`Ver el caso de ${project.name}`}
      className="relative block h-[var(--card)] w-full shrink-0 cursor-none overflow-hidden rounded-[clamp(14px,1.25vw,24px)] text-left outline-none focus-visible:ring-4 focus-visible:ring-bone"
    >
      <Image src={project.shot} alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
      <span className="absolute bottom-[clamp(12px,1.05vw,20px)] right-[clamp(12px,1.05vw,20px)]">
        <Chip label={project.tags[0]} />
      </span>

      {/* Tarjeta de color: se revela con un círculo que crece desde el botón */}
      <span
        aria-hidden={!active}
        className="absolute inset-0 flex flex-col justify-between p-[clamp(18px,1.7vw,32px)] text-ink"
        style={{
          backgroundColor: project.accent,
          clipPath: `circle(${active ? "150%" : "0%"} at var(--cx, 50%) var(--cy, 50%))`,
          /**
           * Entrada y salida suaves, no la curva de salida rápida del resto del
           * sitio: con ésa el círculo cubre la tarjeta en un tercio del tiempo y
           * no llega a leerse como un círculo que crece.
           */
          transition: reduced ? "none" : "clip-path 1000ms cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        <span className="max-w-[18ch] text-[clamp(1.5rem,2.4vw,2.9rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
          {project.headline}
        </span>
        <span className="flex items-end justify-between gap-4">
          <span className="relative h-[clamp(20px,1.7vw,32px)] w-[clamp(90px,8vw,150px)]">
            <Image src={project.logo} alt={project.name} fill sizes="150px" className="object-contain object-left" />
          </span>
          <Chip label={project.tags[0]} tone="dark" />
        </span>
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------------ */
/* Móvil: tarjetas apiladas                                                  */
/* ------------------------------------------------------------------------ */

function FeaturedMobile() {
  const { select } = useProjectSelection();
  return (
    <div className="shell lg:hidden">
      <div className="flex flex-col gap-4 rounded-[28px] bg-[#101617] p-4">
        {projects.map((project, i) => (
          <Reveal key={project.slug} y={24}>
            <button
              type="button"
              onClick={() => select(i)}
              aria-controls={PROJECT_DETAIL_ID}
              aria-label={`Ver el caso de ${project.name}`}
              className="relative block aspect-[552/415] w-full overflow-hidden rounded-[20px] text-left"
            >
              <Image src={project.shot} alt="" fill sizes="92vw" className="object-cover" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <span className="absolute right-3 top-3">
                <Chip label={project.tags[0]} />
              </span>
              <span className="absolute inset-x-0 bottom-0 p-[18px]">
                <span className="block text-[13px] text-white/85">[{project.tags.slice(1).join(" · ")}]</span>
                <span className="mt-1 block text-[clamp(1.75rem,8vw,2.5rem)] font-semibold leading-none tracking-[-0.02em] text-white">
                  {project.name}
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="work" className="bg-ink pb-[var(--section-y)] pt-[calc(var(--section-y)*1.6)]">
      <SectionTitle className="mb-[clamp(2rem,4.2vw,5rem)]">Nuestros proyectos</SectionTitle>
      <FeaturedDesktop />
      <FeaturedMobile />
    </section>
  );
}
