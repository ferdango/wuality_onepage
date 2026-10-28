"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "motion/react";
import Dots from "./Dots";
import { useContent } from "../LangProvider";
import { fill } from "@/lib/i18n";

type Props = {
  children: ReactNode;
  ariaLabel: string;
  /** Milisegundos entre pasos. */
  intervalMs?: number;
  /**
   * Cuántos caben a la vez, como clases que definen `--per` por breakpoint
   * (p. ej. "[--per:2] sm:[--per:3] lg:[--per:4]").
   */
  perClassName?: string;
  /** Hueco entre slides, como clase que define `--gap`. */
  gapClassName?: string;
};

/**
 * Slider en bucle que avanza solo, de uno en uno.
 *
 * A diferencia de `Carousel` (scroll nativo con snap, pensado para arrastrar),
 * aquí el riel se mueve con `transform`: el paso es siempre exactamente un slide
 * y se ve igual en todos los navegadores. Los slides van dos veces seguidas; al
 * llegar a la copia del primero, en cuanto termina la transición, se vuelve al
 * original sin animación, así que el salto no se ve y el bucle no tiene fin.
 *
 * Se pausa con el cursor encima, con el foco dentro, con la pestaña oculta y con
 * el botón de pausa (WCAG 2.2.2: todo lo que se mueve solo tiene que poder
 * pararse). Con "reducir movimiento" no avanza solo.
 */
export default function LoopSlider({
  children,
  ariaLabel,
  intervalMs = 2600,
  perClassName = "[--per:2] sm:[--per:3] lg:[--per:4]",
  gapClassName = "[--gap:1rem] lg:[--gap:1.5rem]",
}: Props) {
  const { ui } = useContent();
  const reduced = useReducedMotion();
  const slides = Children.toArray(children);
  const count = slides.length;

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const running = !reduced && !stopped && !hovered && !focused && count > 1;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      if (document.visibilityState === "visible") {
        setAnimate(true);
        setIndex((i) => Math.min(i + 1, count));
      }
    }, intervalMs);
    return () => clearInterval(id);
  }, [running, intervalMs, count]);

  /** Al terminar el paso hacia la copia del primero, vuelve al original sin animación. */
  const onTransitionEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.target !== trackRef.current || index < count) return;
      setAnimate(false);
      setIndex(0);
    },
    [index, count],
  );

  // Tras el salto sin animación, la vuelve a activar en el siguiente frame.
  useEffect(() => {
    if (animate) return;
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(frame);
  }, [animate]);

  const goTo = (i: number) => {
    setAnimate(!reduced);
    setIndex(i);
  };

  return (
    <div
      className={`${perClassName} ${gapClassName}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div
        role="region"
        aria-roledescription={ui.carousel.role}
        aria-label={ariaLabel}
        className="overflow-hidden px-[var(--gutter)] [mask-image:linear-gradient(90deg,transparent,#000_var(--gutter),#000_calc(100%_-_var(--gutter)),transparent)]"
      >
        <div
          ref={trackRef}
          onTransitionEnd={onTransitionEnd}
          className={`flex gap-[var(--gap)] ${animate ? "transition-transform duration-700 ease-wuality" : ""}`}
          style={{ transform: `translateX(calc(${-index} * (100% + var(--gap)) / var(--per)))` }}
        >
          {[0, 1].flatMap((copy) =>
            slides.map((slide, i) => (
              <div
                key={`${copy}-${i}`}
                className="w-[calc((100%_-_(var(--per)_-_1)_*_var(--gap))_/_var(--per))] shrink-0"
                aria-roledescription="slide"
                aria-label={fill(ui.carousel.slide, { n: i + 1, total: count })}
                // La segunda vuelta sólo existe para el bucle: fuera del árbol accesible.
                {...(copy === 1 && { "aria-hidden": true, inert: true })}
              >
                {slide}
              </div>
            )),
          )}
        </div>
      </div>

      {count > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2 md:mt-8">
          <Dots count={count} index={index % count} onSelect={goTo} />
          {/**
           * Siempre presente, también con "reducir movimiento" (donde no avanza
           * solo): quitarlo según esa preferencia descuadraría la hidratación.
           */}
          <button
            type="button"
            onClick={() => setStopped((s) => !s)}
            aria-label={stopped ? ui.carousel.play : ui.carousel.pause}
            className="grid size-8 place-items-center rounded-full text-muted transition-colors duration-300 hover:text-bone"
          >
            <svg viewBox="0 0 16 16" aria-hidden className="size-3.5 fill-current">
              {stopped ? <path d="M4 2.5v11l9-5.5z" /> : <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" />}
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
