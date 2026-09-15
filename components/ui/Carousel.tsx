"use client";

import {
  Children,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Dots from "./Dots";
import useDragScroll from "./useDragScroll";

type Props = {
  children: ReactNode;
  /** Clase aplicada a cada slide (ancho responsive). */
  slideClassName?: string;
  gap?: string;
  /** Padding lateral del riel, para alinear con la retícula. */
  railClassName?: string;
  showDots?: boolean;
  /** Milisegundos entre avances. 0 desactiva el avance automático. */
  autoPlayMs?: number;
  ariaLabel: string;
  /** Se avisa cada vez que cambia el slide en curso (índice real, no el del DOM). */
  onActiveChange?: (index: number) => void;
};

/** Copias del set de slides: una a cada lado para que el bucle nunca vea el borde. */
const COPIES = 3;

/**
 * Carrusel en bucle infinito con avance automático.
 *
 * El riel usa scroll nativo con snap, así que swipe táctil, rueda de trackpad y
 * teclado funcionan sin JS extra; `useDragScroll` añade el arrastre con mouse.
 * El bucle se consigue repitiendo los slides tres veces y empezando en la copia
 * central: cuando el scroll se detiene fuera de ella, se salta una copia entera
 * de golpe. Como el salto es exactamente el ancho de un set, el contenido bajo
 * el cursor no cambia y el corte es invisible. El salto se hace al detenerse y
 * no durante el scroll para no cancelar un desplazamiento suave en curso.
 */
export default function Carousel({
  children,
  slideClassName = "",
  gap = "gap-4 md:gap-6",
  railClassName = "",
  showDots = true,
  autoPlayMs = 4000,
  ariaLabel,
  onActiveChange,
}: Props) {
  const railRef = useRef<HTMLDivElement>(null);
  const slides = useMemo(() => Children.toArray(children), [children]);
  const count = slides.length;
  const loops = count > 1;
  const copies = loops ? COPIES : 1;

  // Índice dentro del DOM repetido; el punto activo es su resto entre `count`.
  const [domIndex, setDomIndex] = useState(loops ? count : 0);

  useDragScroll(railRef);

  /** Distancia exacta de un set completo, gaps incluidos. */
  const setWidth = useCallback(() => {
    const rail = railRef.current;
    if (!rail || !loops) return 0;
    const first = rail.children[0] as HTMLElement | undefined;
    const second = rail.children[count] as HTMLElement | undefined;
    return first && second ? second.offsetLeft - first.offsetLeft : 0;
  }, [count, loops]);

  const scrollToSlide = useCallback((i: number, smooth = true) => {
    const rail = railRef.current;
    if (!rail) return;
    const el = rail.children[Math.max(0, Math.min(i, rail.children.length - 1))] as
      | HTMLElement
      | undefined;
    if (el) rail.scrollTo({ left: el.offsetLeft, behavior: smooth ? "smooth" : "auto" });
  }, []);

  // Arrancar en la copia central deja recorrido hacia ambos lados.
  useEffect(() => {
    if (!loops) return;
    const frame = requestAnimationFrame(() => scrollToSlide(count, false));
    return () => cancelAnimationFrame(frame);
  }, [loops, count, scrollToSlide]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;
    let idle: ReturnType<typeof setTimeout>;

    const readIndex = () => {
      const els = Array.from(rail.children) as HTMLElement[];
      if (!els.length) return;
      let best = 0;
      let dist = Infinity;
      els.forEach((el, i) => {
        const d = Math.abs(el.offsetLeft - rail.scrollLeft);
        if (d < dist) { dist = d; best = i; }
      });
      setDomIndex(best);
    };

    const recentre = () => {
      const width = setWidth();
      if (!width) return;
      // Fuera de la copia central: saltar un set entero, sin animación.
      if (rail.scrollLeft < width * 0.5) rail.scrollLeft += width;
      else if (rail.scrollLeft > width * 1.5) rail.scrollLeft -= width;
      readIndex();
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(readIndex);
      if (!loops) return;
      clearTimeout(idle);
      idle = setTimeout(recentre, 180);
    };

    rail.addEventListener("scroll", onScroll, { passive: true });
    readIndex();
    return () => {
      rail.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(idle);
    };
  }, [loops, setWidth]);

  const next = useCallback(() => {
    setDomIndex((current) => {
      const target = loops ? current + 1 : (current + 1) % count;
      scrollToSlide(target);
      return current;
    });
  }, [loops, count, scrollToSlide]);

  const prev = useCallback(() => {
    setDomIndex((current) => {
      const target = loops ? current - 1 : (current - 1 + count) % count;
      scrollToSlide(target);
      return current;
    });
  }, [loops, count, scrollToSlide]);

  /** Los puntos apuntan al slide equivalente dentro de la copia actual. */
  const goToDot = useCallback(
    (i: number) => scrollToSlide(Math.floor(domIndex / count) * count + i),
    [domIndex, count, scrollToSlide],
  );

  // Avance automático: se pausa al interactuar o si la pestaña no está visible.
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const pauseNow = useCallback(() => {
    clearTimeout(resumeTimer.current);
    setPaused(true);
  }, []);

  const resumeNow = useCallback(() => {
    clearTimeout(resumeTimer.current);
    setPaused(false);
  }, []);

  /**
   * En táctil no hay `mouseleave` que reanude, así que un solo toque dejaría el
   * carrusel parado para siempre. Se reanuda solo tras un respiro.
   */
  const resumeAfterTouch = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === "mouse") return;
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), 4000);
  }, []);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  useEffect(() => {
    if (!autoPlayMs || paused || count < 2) return;
    const id = setInterval(() => {
      if (document.visibilityState === "visible") next();
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [autoPlayMs, paused, next, count]);

  // Aviso del slide en curso, para que quien use el carrusel pueda seguirlo.
  const active = count ? domIndex % count : 0;
  const notify = useRef(onActiveChange);
  notify.current = onActiveChange;
  useEffect(() => {
    notify.current?.(active);
  }, [active]);

  return (
    <div
      onMouseEnter={pauseNow}
      onMouseLeave={resumeNow}
      onFocusCapture={pauseNow}
      onBlurCapture={resumeNow}
      onPointerDown={pauseNow}
      onPointerUp={resumeAfterTouch}
      onPointerCancel={resumeAfterTouch}
    >
      <div
        ref={railRef}
        role="region"
        aria-roledescription="carrusel"
        aria-label={ariaLabel}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); next(); }
          if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
        }}
        className={`no-scrollbar flex cursor-grab snap-x snap-mandatory overflow-x-auto overscroll-x-contain outline-none active:cursor-grabbing ${gap} ${railClassName}`}
      >
        {Array.from({ length: copies }).flatMap((_, copy) =>
          slides.map((slide, i) => (
            <div
              key={`${copy}-${i}`}
              className={`shrink-0 snap-start ${slideClassName}`}
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${count}`}
              // Deja que el contenido del slide reaccione a estar activo (ver .pop-on-active).
              data-active={copy * count + i === domIndex ? "true" : undefined}
            >
              {slide}
            </div>
          )),
        )}
      </div>

      {showDots && count > 1 && (
        <div className="mt-6 flex items-center justify-center md:mt-8">
          <Dots count={count} index={active} onSelect={goToDot} />
        </div>
      )}
    </div>
  );
}
