"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useId, useMemo, useRef } from "react";
import type { InlineSvg } from "@/lib/svg";

/**
 * Ancho de la ventana de cada trazo medido en pasos. En 1 los tramos van
 * exactamente encadenados; algo por encima deja un pequeño solape para que el
 * relevo entre uno y otro no se note.
 */
const OVERLAP = 1.6;

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
  /**
   * Sin muelle: el scroll ya es continuo, así que el trazo sale fluido por sí
   * solo, y un muelle encima solo añade retardo entre el gesto y la línea.
   */
  const draw = useMotionTemplate`${useTransform(scrollYProgress, [0.15, 0.75], [0, 1])}`;

  useEffect(() => {
    const el = svgRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;

    let configured = false;

    const configure = () => {
      if (configured) return;
      const paths = Array.from(el.querySelectorAll("path"));
      if (!paths.length) return;

      /**
       * El orden lo da el centro horizontal de cada figura, no su borde
       * izquierdo: la flecha verde arranca en el mismo x que las piezas del
       * centro, y ordenando por el borde se colaba a mitad de la secuencia. Por
       * su centro cae al final, que es donde termina el recorrido del ciclo.
       * Tampoco depende del layout, así que vale para la copia oculta.
       */
      let boxes: { node: SVGPathElement; x: number }[];
      try {
        boxes = paths.map((node) => {
          const box = node.getBBox();
          return { node, x: box.x + box.width / 2 };
        });
      } catch {
        return; // todavía sin layout
      }
      // Una copia oculta no tiene medidas: se reintenta cuando se muestre.
      if (boxes.every((b) => b.x === 0)) return;
      configured = true;

      const ordered = boxes.sort((a, b) => a.x - b.x).map((b) => b.node);
      const total = ordered.length;
      // Encadenado exacto: el último trazo termina justo al completarse el recorrido.
      const step = total > 1 ? 1 / (total - 1 + OVERLAP) : 1;
      const window = step * OVERLAP;

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
