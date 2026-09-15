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

type Props = {
  children: ReactNode;
  /** Clase aplicada a cada slide (ancho responsive). */
  slideClassName?: string;
  gap?: string;
  /** Padding lateral del riel, para alinear con la retícula. */
  railClassName?: string;
  showDots?: boolean;
  autoPlayMs?: number;
  ariaLabel: string;
  /** Renderiza controles extra recibiendo el estado del carrusel. */
  controls?: (api: { index: number; count: number; next: () => void; prev: () => void }) => ReactNode;
};

/**
 * Carrusel con scroll nativo + snap: arrastre con mouse, swipe táctil,
 * teclado y rueda de trackpad funcionan sin JS extra. Los dots derivan
 * del scrollLeft real, así nunca se desincronizan.
 */
export default function Carousel({
  children,
  slideClassName = "",
  gap = "gap-4 md:gap-6",
  railClassName = "",
  showDots = true,
  autoPlayMs,
  ariaLabel,
  controls,
}: Props) {
  const railRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const slides = useMemo(() => Children.toArray(children), [children]);
  const count = slides.length;

  const readIndex = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    const slideEls = Array.from(rail.children) as HTMLElement[];
    if (!slideEls.length) return;
    // El slide activo es aquel cuyo borde izquierdo está más cerca del scroll actual.
    let best = 0;
    let bestDist = Infinity;
    slideEls.forEach((el, i) => {
      const dist = Math.abs(el.offsetLeft - rail.scrollLeft);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    setIndex(best);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(readIndex);
    };
    rail.addEventListener("scroll", onScroll, { passive: true });
    readIndex();
    return () => {
      rail.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [readIndex]);

  const goTo = useCallback((i: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const el = rail.children[Math.max(0, Math.min(i, rail.children.length - 1))] as
      | HTMLElement
      | undefined;
    if (el) rail.scrollTo({ left: el.offsetLeft, behavior: "smooth" });
  }, []);

  const next = useCallback(() => goTo((index + 1) % count), [goTo, index, count]);
  const prev = useCallback(() => goTo((index - 1 + count) % count), [goTo, index, count]);

  // Autoplay: se pausa al interactuar o cuando la pestaña no está visible.
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!autoPlayMs || paused || count < 2) return;
    const id = setInterval(() => {
      if (document.visibilityState === "visible") next();
    }, autoPlayMs);
    return () => clearInterval(id);
  }, [autoPlayMs, paused, next, count]);

  // Arrastre con mouse (en táctil el scroll nativo ya funciona).
  const drag = useRef<{ startX: number; startLeft: number; active: boolean }>({
    startX: 0,
    startLeft: 0,
    active: false,
  });

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const rail = railRef.current;
    if (!rail) return;
    drag.current = { startX: e.clientX, startLeft: rail.scrollLeft, active: true };
    rail.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const rail = railRef.current;
    if (!rail || !drag.current.active) return;
    rail.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };

  const endDrag = (e: React.PointerEvent) => {
    const rail = railRef.current;
    if (!rail || !drag.current.active) return;
    drag.current.active = false;
    if (rail.hasPointerCapture(e.pointerId)) rail.releasePointerCapture(e.pointerId);
    goTo(index);
  };

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
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
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`no-scrollbar flex cursor-grab snap-x snap-mandatory overflow-x-auto overscroll-x-contain outline-none active:cursor-grabbing ${gap} ${railClassName}`}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`shrink-0 snap-start ${slideClassName}`}
            aria-roledescription="slide"
            aria-label={`${i + 1} de ${count}`}
          >
            {slide}
          </div>
        ))}
      </div>

      {(showDots || controls) && (
        <div className="mt-6 flex items-center justify-center gap-6 md:mt-8">
          {showDots && <Dots count={count} index={index} onSelect={goTo} />}
          {controls?.({ index, count, next, prev })}
        </div>
      )}
    </div>
  );
}
