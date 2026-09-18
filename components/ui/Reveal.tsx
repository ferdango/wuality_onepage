"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Retardo en segundos, para escalonar elementos hermanos. */
  delay?: number;
  /** Desplazamiento inicial en px. */
  y?: number;
  className?: string;
  /** Para medidas que no pueden vivir en una clase de Tailwind (anchos calculados). */
  style?: React.CSSProperties;
  once?: boolean;
};

/** Aparición al entrar en viewport. Respeta prefers-reduced-motion. */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  style,
  once = true,
}: Props) {
  const reduced = useReducedMotion();

  if (reduced)
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
