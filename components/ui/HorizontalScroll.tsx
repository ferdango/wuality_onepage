"use client";

import { motion, useMotionTemplate, useScroll } from "motion/react";
import { Children, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Riel horizontal guiado por el scroll vertical. La sección se queda fija, el
 * scroll desplaza el riel desde la primera tarjeta hasta la última y, al
 * llegar, suelta el ancla y la página sigue con la siguiente sección.
 *
 * El ancla mide una pantalla más exactamente lo que el riel tiene que
 * recorrer, así que cada píxel de scroll mueve un píxel el riel.
 *
 * El progreso viaja como variable CSS y el riel lo consume con `translate` en
 * CSS: atarlo a un transform hace que Motion lo entregue a un ViewTimeline
 * nativo cuyo rango no coincide con el de la librería, y se congela (ver Hero).
 */
export default function HorizontalScroll({
  header,
  children,
  slideClassName = "",
  gap = "gap-4 lg:gap-6",
  ariaLabel,
}: {
  /** Lo que va encima del riel y se queda fijo con él (título, subtítulo...). */
  header?: ReactNode;
  children: ReactNode;
  /**
   * Ancho de cada tarjeta. En `vw` o px: el riel mide lo que suman ellas. Puede
   * usar `var(--rail-h)`, el alto libre para el riel, para no pasarse de pantalla.
   */
  slideClassName?: string;
  gap?: string;
  ariaLabel: string;
}) {
  const pin = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  const [railH, setRailH] = useState(0);

  useEffect(() => {
    const measure = () => {
      const st = stage.current;
      const t = track.current;
      const v = viewport.current;
      if (!st || !t || !v) return;
      setShift(Math.max(0, Math.round(t.scrollWidth - v.clientWidth)));

      /**
       * Alto que le queda al riel: la pantalla menos el título y la barra. Se
       * publica como `--rail-h` para que las tarjetas se acoten con él; con una
       * reserva fija en px no cabía, porque el título crece con el ancho.
       */
      const cs = getComputedStyle(st);
      const inner = st.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      const block = (el: HTMLElement | null) =>
        el ? el.offsetHeight + parseFloat(getComputedStyle(el).marginTop) : 0;
      const free = inner - block(head.current) - parseFloat(getComputedStyle(v).marginTop) - block(bar.current);
      setRailH(Math.max(160, Math.floor(free)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    [stage, head, track, viewport].forEach((r) => r.current && ro.observe(r.current));
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: pin, offset: ["start start", "end end"] });
  const prog = useMotionTemplate`${scrollYProgress}`;

  return (
    <div ref={pin} className="relative" style={{ height: `calc(100svh + ${shift}px)` }}>
      <motion.div
        className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pb-[clamp(16px,2vw,40px)] pt-[calc(var(--header-h)+clamp(8px,1vw,20px))]"
        ref={stage}
        style={
          { "--prog": prog, "--shift": String(shift), "--rail-h": `${railH}px` } as React.CSSProperties
        }
      >
        {header && <div ref={head}>{header}</div>}

        <div
          ref={viewport}
          role="region"
          aria-roledescription="carrusel"
          aria-label={ariaLabel}
          // Ni el riel ni la barra encogen: si el bloque pasa del alto, el flex los aplastaba.
          className="mt-[clamp(20px,2.2vw,44px)] shrink-0"
        >
          <ul
            ref={track}
            className={`flex w-max px-[var(--gutter)] ${gap}`}
            style={{ translate: "calc(var(--prog) * var(--shift) * -1px) 0" }}
          >
            {Children.toArray(children).map((child, i) => (
              <li key={i} className={`shrink-0 ${slideClassName}`}>
                {child}
              </li>
            ))}
          </ul>
        </div>

        {/* Cuánto riel queda por delante */}
        <div
          ref={bar}
          aria-hidden
          className="mx-auto mt-[clamp(20px,2vw,36px)] h-[3px] w-[min(280px,50vw)] shrink-0 overflow-hidden rounded-full bg-line"
        >
          <div className="h-full w-full origin-left rounded-full bg-bone" style={{ scale: "var(--prog) 1" }} />
        </div>
      </motion.div>
    </div>
  );
}
