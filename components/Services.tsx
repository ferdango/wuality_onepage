"use client";

import Image from "@/components/ui/Img";
import Link from "next/link";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useRef, useState } from "react";
import Eyebrow from "./ui/Eyebrow";
import { useContent, useLang } from "./LangProvider";
import { services as servicesEs } from "@/lib/content";
import { projectPath } from "@/lib/i18n";

// Los dos idiomas tienen los mismos servicios: el número es fijo.
const N = servicesEs.length;

/** Scroll que consume cada servicio mientras la sección está anclada. */
const STEP_SVH = 55;
/** Fracción de tramo que hay que rebasar para cambiar de servicio. */
const HYSTERESIS = 0.08;

/**
 * Cambio de foto sin bajón: la nueva aparece encima de la anterior, que se
 * queda opaca debajo y sólo se oculta cuando la nueva ya la cubre. Con un
 * fundido cruzado normal, a mitad las dos están al 50% y se transparenta el
 * fondo oscuro, que también se lee como un parpadeo.
 */
function photoStyle(isActive: boolean, ms: number, scale?: number): React.CSSProperties {
  return {
    zIndex: isActive ? 1 : 0,
    opacity: isActive ? 1 : 0,
    scale: scale && !isActive ? scale : undefined,
    transition: isActive
      ? `opacity ${ms}ms cubic-bezier(0.22, 1, 0.36, 1), scale ${ms * 1.4}ms cubic-bezier(0.22, 1, 0.36, 1)`
      : `opacity 0ms linear ${ms}ms, scale 0ms linear ${ms}ms`,
  };
}

/** Texto: el saliente se va rápido y el entrante llega justo detrás, para que no se solapen letras. */
function textStyle(isActive: boolean): React.CSSProperties {
  return {
    opacity: isActive ? 1 : 0,
    transition: isActive ? "opacity 300ms ease-out 120ms" : "opacity 150ms ease-in",
  };
}

function Cta({ className = "" }: { className?: string }) {
  const { ui } = useContent();
  return (
    <a
      href="#contacto"
      className={`group flex items-center gap-4 rounded-full bg-bone px-7 py-3.5 text-[length:var(--fs-sm)] font-semibold text-ink transition-colors duration-300 hover:bg-white ${className}`}
    >
      {ui.services.cta}
      <svg viewBox="0 0 24 24" className="size-5 transition-transform duration-400 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}

const number = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Detalle del servicio: qué resuelve, sus capacidades y los casos de la
 * cartera que lo prueban (como los "Learn more" de ustwo o los casos por
 * servicio de DEPT). Va fuera del botón del título: dentro no puede haber
 * enlaces.
 */
function Detail({ service }: { service: (typeof servicesEs)[number] }) {
  const { projects, ui } = useContent();
  const lang = useLang();
  const cases = service.cases
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is (typeof projects)[number] => Boolean(p));
  return (
    <div className="flex flex-col gap-[clamp(10px,1vw,18px)]">
      <p className="max-w-[46ch] text-[length:var(--fs-body)] leading-snug text-bone">{service.lead}</p>
      <ul className="flex flex-wrap gap-2">
        {service.tags.map((t) => (
          <li
            key={t}
            className="rounded-full border border-bone/20 px-3 py-1 text-[length:var(--fs-xs)] text-ash"
          >
            {t}
          </li>
        ))}
      </ul>
      <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[length:var(--fs-xs)]">
        <span className="font-semibold uppercase tracking-[0.14em] text-muted">{ui.services.cases}</span>
        {cases.map((p, i) => (
          <span key={p.slug} className="flex items-baseline gap-3">
            <Link
              href={projectPath(lang, p.slug)}
              className="text-sky underline decoration-sky/40 underline-offset-4 transition-colors duration-300 hover:decoration-sky"
            >
              {"short" in p && p.short ? p.short : p.name}
            </Link>
            {i < cases.length - 1 && <span className="text-muted" aria-hidden>·</span>}
          </span>
        ))}
      </p>
    </div>
  );
}

export default function Services() {
  const { services, ui } = useContent();
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
    const raw = v * N;
    /**
     * Histéresis: para cambiar de servicio hay que pasar la frontera un poco.
     * Sin ella, el rebote del scroll táctil justo en el borde entre dos tramos
     * los hacía alternar varias veces seguidas, que se veía como un parpadeo.
     */
    setActive((cur) => {
      if (raw >= cur + 1 + HYSTERESIS) return Math.min(N - 1, Math.floor(raw - HYSTERESIS));
      if (raw < cur - HYSTERESIS) return Math.max(0, Math.floor(raw + HYSTERESIS));
      return cur;
    });
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
          {/**
           * Encabezado como las bandas del benchmark (ustwo "Our approach"):
           * rótulo, una declaración de capacidades y, en desktop, el detalle
           * al lado. Antes era otro "Lo que hacemos" justo después de "Qué
           * hacemos".
           */}
          <div className="shell mx-auto grid w-full max-w-[1760px] shrink-0 gap-x-[clamp(28px,4vw,80px)] gap-y-2 pb-[clamp(16px,2.6vw,48px)] lg:grid-cols-[1.25fr_1fr] lg:items-end">
            <div>
              <Eyebrow tone="light">{ui.services.eyebrow}</Eyebrow>
              <h2 className="mt-[clamp(10px,1vw,18px)] text-balance text-[length:clamp(1.625rem,0.9rem_+_2.6vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.025em] text-bone">
                {ui.services.title}
              </h2>
            </div>
            <p className="hidden max-w-[44ch] text-[length:var(--fs-body)] leading-relaxed text-ash lg:block">
              {ui.services.lead}
            </p>
          </div>

          {/* Desktop: lista numerada + imagen sincronizada. La imagen ocupa el alto libre en vez de su proporción. */}
          <div className="hidden min-h-0 flex-1 items-stretch lg:flex">
            <ol className="flex w-1/2 shrink-0 flex-col justify-center">
              {services.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.title} className="border-t border-line pl-[var(--gutter)] pr-[clamp(24px,3vw,56px)] last:border-b">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={isActive}
                      className="group flex w-full items-baseline gap-[clamp(14px,1.4vw,28px)] py-[clamp(12px,1.2vw,22px)] text-left"
                    >
                      <span className={`text-[length:var(--fs-xs)] font-semibold tabular-nums transition-colors duration-400 ${isActive ? "text-red" : "text-muted"}`}>
                        {number(i)}
                      </span>
                      <span
                        className={`text-[length:clamp(1.25rem,0.8rem_+_1.3vw,2.25rem)] font-bold leading-tight tracking-[-0.015em] transition-colors duration-400 ${
                          isActive ? "text-yellow" : "text-muted group-hover:text-ash"
                        }`}
                      >
                        {s.title}
                      </span>
                    </button>
                    {/* Sólo el activo despliega su detalle; la altura se anima con grid-rows. */}
                    <div
                      className="grid transition-[grid-template-rows,opacity] duration-500 ease-wuality"
                      style={{ gridTemplateRows: isActive ? "1fr" : "0fr", opacity: isActive ? 1 : 0 }}
                      aria-hidden={!isActive}
                      inert={!isActive}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-[clamp(14px,1.4vw,26px)] pl-[calc(clamp(14px,1.4vw,28px)+2ch)]">
                          <Detail service={s} />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/**
             * Las cuatro fotos están siempre montadas, una encima de otra, y sólo
             * cambia cuál se ve: montar la nueva en cada cambio obligaba a
             * cargarla y durante ese instante no había ninguna.
             */}
            <div className="relative w-1/2 shrink-0 overflow-hidden">
              {services.map((s, i) => (
                <Image
                  key={s.title}
                  src={s.image}
                  alt={i === active ? s.alt : ""}
                  fill
                  sizes="50vw"
                  className="object-cover"
                  style={photoStyle(i === active, 600, 1.04)}
                />
              ))}
            </div>
          </div>

          {/**
           * Mobile / tablet: un servicio a la vez, el que toca por scroll. Los
           * cuatro están montados en la misma celda y sólo cambia la opacidad;
           * antes se desmontaba uno y se montaba el siguiente con un hueco en
           * medio, y en el cambio se veía la sección vacía un instante.
           */}
          <div className="flex min-h-0 flex-1 flex-col lg:hidden">
            <div className="shell grid shrink-0 pb-4">
              {services.map((s, i) => (
                <div
                  key={s.title}
                  aria-hidden={i !== active}
                  inert={i !== active}
                  className="col-start-1 row-start-1 flex flex-col gap-3"
                  style={textStyle(i === active)}
                >
                  <h3 className="flex items-baseline gap-3 text-[length:var(--fs-h3)] font-bold text-yellow">
                    <span className="text-[length:var(--fs-xs)] font-semibold text-red">{number(i)}</span>
                    {s.title}
                  </h3>
                  <Detail service={s} />
                </div>
              ))}
            </div>

            <div className="relative min-h-[140px] w-full flex-1 overflow-hidden">
              {services.map((s, i) => (
                <Image
                  key={s.title}
                  src={s.image}
                  alt={i === active ? s.alt : ""}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  style={photoStyle(i === active, 450)}
                />
              ))}
            </div>

            {/* Por dónde se va */}
            <ul className="mt-4 flex shrink-0 items-center justify-center gap-2" aria-hidden>
              {services.map((s, i) => (
                <li
                  key={s.title}
                  className="h-1.5 rounded-full transition-all duration-500 ease-wuality"
                  style={{ width: i === active ? 28 : 6, backgroundColor: i === active ? "#f4f4f4" : "#5b6466" }}
                />
              ))}
            </ul>

            {/* Con su ancho y centrado: a todo lo ancho, el botón de WhatsApp le tapaba el final. */}
            <div className="shell mt-4 flex shrink-0 justify-center">
              <Cta />
            </div>
          </div>

          <div className="mt-[clamp(16px,2vw,36px)] hidden shrink-0 justify-center lg:flex">
            <Cta />
          </div>
        </div>
      </div>
    </section>
  );
}
