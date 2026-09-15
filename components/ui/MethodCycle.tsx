"use client";

import Image from "@/components/ui/Img";
import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

/**
 * Normaliza un incremento de ángulo al rango (-180, 180]. Sin esto, cruzar el
 * corte de atan2 (de 179° a -179°) se leería como una vuelta entera hacia el
 * otro lado y la rueda pegaría un salto.
 */
function wrapDegrees(deg: number) {
  return ((((deg + 180) % 360) + 360) % 360) - 180;
}

/** Cuánto se frena la inercia en cada fotograma, y a partir de qué velocidad se da por parada. */
const FRICTION = 0.955;
const STOP_BELOW = 0.02;
/** Píxeles que hay que recorrer con el dedo antes de decidir si el gesto gira o hace scroll. */
const DIRECTION_LOCK = 8;

type Gesture = "idle" | "undecided" | "rotate" | "scroll";

export default function MethodCycle({ sizes }: { sizes: string }) {
  const wheel = useRef<HTMLDivElement>(null);
  const angle = useRef(0);
  const velocity = useRef(0);
  const frame = useRef<number | null>(null);
  const gesture = useRef<Gesture>("idle");
  const origin = useRef({ x: 0, y: 0 });
  const lastAngle = useRef(0);
  const lastTime = useRef(0);
  const reduced = useReducedMotion();

  /**
   * El ángulo se escribe directamente en el DOM en vez de pasar por estado: a
   * 60fps un re-render por fotograma no aporta nada y se nota.
   */
  const apply = useCallback(() => {
    if (wheel.current) wheel.current.style.rotate = `${angle.current}deg`;
  }, []);

  const stopSpin = useCallback(() => {
    if (frame.current !== null) {
      cancelAnimationFrame(frame.current);
      frame.current = null;
    }
  }, []);

  useEffect(() => stopSpin, [stopSpin]);

  /** Ángulo del puntero medido desde el centro de la rueda. */
  const pointerAngle = (event: React.PointerEvent) => {
    const box = wheel.current!.getBoundingClientRect();
    const dx = event.clientX - (box.left + box.width / 2);
    const dy = event.clientY - (box.top + box.height / 2);
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    stopSpin();
    velocity.current = 0;
    origin.current = { x: event.clientX, y: event.clientY };
    lastAngle.current = pointerAngle(event);
    lastTime.current = performance.now();
    /**
     * Con ratón se gira desde el primer píxel. Con el dedo hay que esperar:
     * `touch-pan-y` deja el scroll vertical al navegador, y si girásemos
     * mientras tanto, bajar la página haría dar vueltas a la rueda.
     */
    gesture.current = event.pointerType === "mouse" ? "rotate" : "undecided";

    // Capturar puede fallar si el puntero ya no está activo; no es motivo para
    // abortar el arrastre.
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {}
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (gesture.current === "idle" || gesture.current === "scroll") return;

    if (gesture.current === "undecided") {
      const dx = event.clientX - origin.current.x;
      const dy = event.clientY - origin.current.y;
      if (Math.hypot(dx, dy) < DIRECTION_LOCK) return;
      if (Math.abs(dy) > Math.abs(dx)) {
        gesture.current = "scroll";
        return;
      }
      // Gesto de giro: se reancla aquí para que los píxeles gastados en decidir
      // no se cuelen como un salto.
      gesture.current = "rotate";
      lastAngle.current = pointerAngle(event);
      lastTime.current = performance.now();
      return;
    }

    const current = pointerAngle(event);
    const delta = wrapDegrees(current - lastAngle.current);
    const now = performance.now();

    angle.current += delta;
    // Grados por fotograma de 16ms, que es la unidad en la que corre la inercia.
    velocity.current = (delta / Math.max(now - lastTime.current, 8)) * 16;
    lastAngle.current = current;
    lastTime.current = now;
    apply();
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const wasRotating = gesture.current === "rotate";
    gesture.current = "idle";
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {}

    if (!wasRotating || reduced || Math.abs(velocity.current) < 0.15) return;

    const step = () => {
      velocity.current *= FRICTION;
      angle.current += velocity.current;
      apply();
      frame.current =
        Math.abs(velocity.current) > STOP_BELOW ? requestAnimationFrame(step) : null;
    };
    frame.current = requestAnimationFrame(step);
  };

  const onPointerCancel = () => {
    gesture.current = "idle";
    velocity.current = 0;
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const step = event.key === "ArrowLeft" ? -15 : event.key === "ArrowRight" ? 15 : 0;
    if (!step) return;
    event.preventDefault();
    stopSpin();
    angle.current += step;
    apply();
  };

  return (
    <div
      ref={wheel}
      role="img"
      aria-label="Ciclo de trabajo iterativo de Wuality. Arrástralo o usa las flechas para girarlo."
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      /**
       * El navegador manda `pointercancel` cuando se queda el gesto para hacer
       * scroll. Ahí se corta en seco: ni giro ni inercia.
       */
      onPointerCancel={onPointerCancel}
      onKeyDown={onKeyDown}
      /**
       * `touch-pan-y` deja el scroll vertical en manos del navegador: la rueda
       * ocupa media pantalla en móvil y bloquearlo entero dejaría la página
       * atascada al pasar el dedo por encima.
       */
      className="absolute inset-0 cursor-grab touch-pan-y select-none rounded-full outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-bone/40"
    >
      <Image
        src="/media/ui/method-cycle.svg"
        alt=""
        fill
        sizes={sizes}
        draggable={false}
        className="pointer-events-none object-contain"
      />
    </div>
  );
}
