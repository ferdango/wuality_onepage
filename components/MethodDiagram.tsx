"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useId, useMemo, useRef } from "react";
import type { InlineSvg } from "@/lib/svg";

/** Cuánto se solapan los trazos entre sí. Cuanto más alto, más continuo el dibujado. */
const OVERLAP = 3.4;

/**
 * El diagrama se dibuja solo con el scroll: los trazos avanzan de izquierda a
 * derecha siguiendo el recorrido del ciclo y detrás va entrando el relleno.
 *
 * Los paths del export son figuras rellenas sin trazo, así que el "dibujado"
 * usa el contorno de cada figura como línea: `pathLength="1"` normaliza su
 * longitud y basta con animar `stroke-dashoffset` de 1 a 0. No hace falta
 * inventar ninguna geometría.
 */
export default function MethodDiagram({
  svg,
  className = "",
  title,
}: {
  svg: InlineSvg;
  className?: string;
  title: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");

  /**
   * El diagrama se monta dos veces (desktop y mobile) y el export trae ids
   * fijos. Sin renombrarlos, la copia visible referencia los degradados de la
   * copia oculta y algunos tramos —la barra de la izquierda— no llegan a
   * pintarse.
   */
  const markup = useMemo(
    () =>
      svg.inner
        .replace(/id="([^"]+)"/g, (_, id) => `id="${id}-${uid}"`)
        .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${id}-${uid})`),
    [svg.inner, uid],
  );

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  // El muelle suaviza el vínculo con el scroll: el trazo fluye en vez de saltar.
  const progress = useTransform(scrollYProgress, [0.1, 0.66], [0, 1]);
  const smooth = useSpring(progress, { stiffness: 90, damping: 24, restDelta: 0.0005 });
  const draw = useMotionTemplate`${smooth}`;

  useEffect(() => {
    const el = svgRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;

    let configured = false;

    const configure = () => {
      if (configured) return;
      const paths = Array.from(el.querySelectorAll("path"));
      if (!paths.length) return;

      let boxes: { node: SVGPathElement; x: number }[];
      try {
        boxes = paths.map((node) => ({ node, x: node.getBBox().x }));
      } catch {
        return; // todavía sin layout
      }
      // Una copia oculta no tiene medidas: se reintenta cuando se muestre.
      if (boxes.every((b) => b.x === 0)) return;
      configured = true;

      const ordered = boxes.sort((a, b) => a.x - b.x).map((b) => b.node);
      const total = ordered.length;
      const window = Math.min(1, (1 / total) * OVERLAP);
      const step = total > 1 ? (1 - window) / (total - 1) : 0;

      ordered.forEach((node, i) => {
        const fill = node.getAttribute("fill") ?? "";
        node.setAttribute("pathLength", "1");
        // Un relleno degradado no sirve como color de trazo: se usa el azul de marca.
        node.style.stroke = !fill || fill.startsWith("url(") ? "#0065FF" : fill;
        node.style.setProperty("--start", String(i * step));
        node.style.setProperty("--speed", String(1 / window));
      });
    };

    configure();
    const observer = new ResizeObserver(configure);
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [markup]);

  return (
    <motion.div
      ref={wrapRef}
      className={`method-draw ${className}`}
      style={{ "--draw": reduced ? 1 : draw } as React.CSSProperties}
    >
      <svg
        ref={svgRef}
        viewBox={svg.viewBox}
        role="img"
        aria-label={title}
        className="h-full w-full"
        // Asset propio del repositorio, leído en build desde /public.
        dangerouslySetInnerHTML={{ __html: markup }}
      />
    </motion.div>
  );
}
