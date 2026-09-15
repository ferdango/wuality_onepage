"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useRef } from "react";
import useDragScroll from "./ui/useDragScroll";
import { clients } from "@/lib/content";

function Tile({
  logo,
  name,
  i,
  dim,
}: {
  logo: string;
  name: string;
  i: number;
  /** En desktop el logo está apagado y se enciende al pasar el cursor. */
  dim: boolean;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (i % 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group flex aspect-[384/230] items-center justify-center rounded-[clamp(10px,0.83vw,16px)] border border-line bg-ink transition-colors duration-500 hover:border-bone/20 hover:bg-card"
    >
      <div className="relative h-[46%] w-[62%]">
        <Image
          src={logo}
          alt={name}
          fill
          sizes="(max-width: 1024px) 76vw, 20vw"
          className={`object-contain transition duration-500 ${
            dim
              ? "opacity-55 grayscale group-hover:opacity-100 group-hover:grayscale-0"
              : "opacity-100"
          }`}
        />
      </div>
    </motion.div>
  );
}

export default function Clients() {
  const railRef = useRef<HTMLDivElement>(null);
  useDragScroll(railRef);

  return (
    <section className="bg-ink pb-[calc(var(--section-y)*1.4)]">
      {/* Desktop: retícula 5×3 */}
      <div className="shell hidden grid-cols-5 gap-[clamp(6px,0.52vw,10px)] lg:grid">
        {clients.map((c, i) => (
          <Tile key={c.name} logo={c.logo} name={c.name} i={i} dim />
        ))}
      </div>

      {/**
       * Mobile: 3 filas que sangran a los lados, como en el frame de 360. Las
       * tarjetas son mucho más anchas que en desktop para que los logos se lean,
       * y van a plena opacidad porque en táctil no hay hover que las encienda.
       */}
      <div
        ref={railRef}
        className="no-scrollbar grid auto-cols-[76%] cursor-grab grid-flow-col grid-rows-3 gap-3 overflow-x-auto px-[var(--gutter)] active:cursor-grabbing lg:hidden"
      >
        {clients.map((c, i) => (
          <Tile key={c.name} logo={c.logo} name={c.name} i={i} dim={false} />
        ))}
      </div>
    </section>
  );
}
