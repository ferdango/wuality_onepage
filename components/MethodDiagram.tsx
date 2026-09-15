"use client";

import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import type { InlineSvg } from "@/lib/svg";

/** Cuánto se solapan los trazos entre sí, para que el dibujado fluya. */
const OVERLAP = 2.2;

/**
 * El diagrama se dibuja solo con el scroll: primero se trazan los contornos de
 * izquierda a derecha —siguiendo el recorrido del ciclo— y detrás va entrando
 * el relleno.
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

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const draw = useMotionTemplate`${useTransform(scrollYProgress, [0.12, 0.62], [0, 1])}`;

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const paths = Array.from(el.querySelectorAll("path"));
    if (!paths.length) return;

    // El orden sale de la primera coordenada X del path: no depende del layout,
    // así que también funciona en la copia que está oculta al montar.
    const ordered = paths
      .map((node) => ({
        node,
        x: Number(node.getAttribute("d")?.match(/M\s*(-?[\d.]+)/)?.[1] ?? 0),
      }))
      .sort((a, b) => a.x - b.x)
      .map((entry) => entry.node);

    const total = ordered.length;
    const window = Math.min(1, (1 / total) * OVERLAP);
    const step = total > 1 ? (1 - window) / (total - 1) : 0;

    ordered.forEach((node, i) => {
      const fill = node.getAttribute("fill") ?? "";
      node.setAttribute("pathLength", "1");
      // Los rellenos degradados no sirven como color de trazo: se usa el azul de marca.
      node.style.stroke = !fill || fill.startsWith("url(") ? "#0065FF" : fill;
      node.style.setProperty("--start", String(i * step));
      node.style.setProperty("--speed", String(1 / window));
    });
  }, [svg]);

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
        dangerouslySetInnerHTML={{ __html: svg.inner }}
      />
    </motion.div>
  );
}
