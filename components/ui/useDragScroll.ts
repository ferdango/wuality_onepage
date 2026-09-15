"use client";

import { useEffect, type RefObject } from "react";

/**
 * Arrastre con mouse/trackpad sobre un riel con scroll horizontal.
 *
 * En táctil no hace nada: el scroll nativo ya es mejor que cualquier emulación.
 * Mientras se arrastra desactiva el scroll-snap (si no, el riel se "pega" y el
 * gesto se siente trabado) y lo restaura al soltar, para que el navegador haga
 * el encaje final. También suprime el click posterior al arrastre, de modo que
 * soltar sobre un enlace o un botón no lo active por accidente.
 */
export default function useDragScroll<T extends HTMLElement>(ref: RefObject<T | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let active = false;
    let moved = false;
    let suppressClick = false;
    let startX = 0;
    let startLeft = 0;
    let pointerId = -1;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch" || e.button !== 0) return;
      active = true;
      moved = false;
      suppressClick = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      pointerId = e.pointerId;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!active) return;
      const dx = e.clientX - startX;
      // Umbral: por debajo de 4px sigue siendo un click, no un arrastre.
      if (!moved) {
        if (Math.abs(dx) < 4) return;
        moved = true;
        el.classList.add("is-dragging");
        try {
          el.setPointerCapture(pointerId);
        } catch {
          /* el puntero ya se soltó */
        }
      }
      el.scrollLeft = startLeft - dx;
      e.preventDefault();
    };

    const onPointerUp = () => {
      if (!active) return;
      active = false;
      if (moved) {
        suppressClick = true;
        el.classList.remove("is-dragging");
        if (el.hasPointerCapture(pointerId)) el.releasePointerCapture(pointerId);
      }
      moved = false;
    };

    const onClick = (e: MouseEvent) => {
      if (!suppressClick) return;
      suppressClick = false;
      e.preventDefault();
      e.stopPropagation();
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("click", onClick, true);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("click", onClick, true);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      el.classList.remove("is-dragging");
    };
  }, [ref]);
}
