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
  once?: boolean;
};

/** Aparición al entrar en viewport. Respeta prefers-reduced-motion. */
export default function Reveal({ children, delay = 0, y = 28, className, once = true }: Props) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.25, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
