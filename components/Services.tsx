"use client";

import Image from "@/components/ui/Img";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useRef, useState } from "react";
import SectionTitle from "./ui/SectionTitle";
import { services } from "@/lib/content";

const N = services.length;

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

function Cta() {
  return (
    <a
      href="#contacto"
      className="group flex items-center gap-4 rounded-full border border-bone/30 px-8 py-4 text-[length:var(--fs-sm)] font-semibold text-bone transition-colors duration-300 hover:border-blue hover:text-blue"
    >
      Consulta aquí
      <svg viewBox="0 0 24 24" className="size-5 transition-transform duration-400 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h15M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}

export default function Services() {
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
          <SectionTitle className="mb-[clamp(1.25rem,3vw,3.5rem)] shrink-0">Lo que hacemos</SectionTitle>

          {/* Desktop: lista + imagen sincronizada. La imagen ocupa el alto libre en vez de su proporción. */}
          <div className="hidden min-h-0 flex-1 items-center lg:flex">
            <ul className="w-1/2 shrink-0">
              {services.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.title}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={isActive}
                      className="group flex w-full flex-col items-start gap-4 py-[clamp(14px,1.6vw,32px)] pl-[var(--gutter)] pr-[clamp(24px,3vw,56px)] text-left"
                    >
                      <span
                        className={`text-[length:var(--fs-h3)] font-bold leading-tight tracking-[-0.01em] transition-colors duration-400 ${
                          isActive ? "text-yellow" : "text-muted group-hover:text-ash"
                        }`}
                      >
                        {s.title}
                      </span>
                      <span
                        className={`text-[length:var(--fs-body)] leading-snug transition-colors duration-400 ${
                          isActive ? "text-bone" : "text-muted"
                        }`}
                      >
                        {s.items}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {/**
             * Las cuatro fotos están siempre montadas, una encima de otra, y sólo
             * cambia cuál se ve: montar la nueva en cada cambio obligaba a
             * cargarla y durante ese instante no había ninguna.
             */}
            <div className="relative h-full w-1/2 shrink-0 overflow-hidden">
              {services.map((s, i) => (
                <Image
                  key={s.title}
                  src={s.image}
                  alt={i === active ? s.title : ""}
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
            <div className="shell grid shrink-0 pb-5">
              {services.map((s, i) => (
                <div
                  key={s.title}
                  aria-hidden={i !== active}
                  className="col-start-1 row-start-1 flex flex-col gap-3"
                  style={textStyle(i === active)}
                >
                  <h3 className="text-[length:var(--fs-h3)] font-bold text-yellow">{s.title}</h3>
                  <p className="text-[length:var(--fs-body)] text-bone">{s.items}</p>
                </div>
              ))}
            </div>

            <div className="relative min-h-0 w-full flex-1 overflow-hidden">
              {services.map((s, i) => (
                <Image
                  key={s.title}
                  src={s.image}
                  alt={i === active ? s.title : ""}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  style={photoStyle(i === active, 450)}
                />
              ))}
            </div>

            <a
              href="#contacto"
              className="block shrink-0 bg-[#0b1a2e] py-4 text-center text-[length:var(--fs-body)] font-bold text-blue transition-colors duration-300 active:bg-[#10233c]"
            >
              Consulta aquí
            </a>

            {/* Por dónde se va */}
            <ul className="mt-4 flex shrink-0 items-center justify-center gap-2" aria-hidden>
              {services.map((s, i) => (
                <li
                  key={s.title}
                  className="h-1.5 rounded-full transition-all duration-500 ease-wuality"
                  style={{ width: i === active ? 28 : 6, backgroundColor: i === active ? "#f4f4f4" : "#2a3335" }}
                />
              ))}
            </ul>
          </div>

          <div className="mt-[clamp(16px,2vw,36px)] hidden shrink-0 justify-center lg:flex">
            <Cta />
          </div>
        </div>
      </div>
    </section>
  );
}
