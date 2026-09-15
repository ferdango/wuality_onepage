"use client";

import Image from "@/components/ui/Img";
import { motion, useReducedMotion } from "motion/react";
import { clients } from "@/lib/content";

export default function Clients() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-ink pb-[calc(var(--section-y)*1.4)]">
      {/* Dos columnas en móvil y cinco en desktop: entran todos sin scroll lateral. */}
      <div className="shell grid grid-cols-2 gap-3 lg:grid-cols-5 lg:gap-[clamp(6px,0.52vw,10px)]">
        {clients.map((c, i) => (
          <motion.div
            key={c.name}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: (i % 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group flex aspect-[384/230] items-center justify-center rounded-[clamp(10px,0.83vw,16px)] border border-line bg-ink transition-colors duration-500 hover:border-bone/20 hover:bg-card"
          >
            <div className="relative h-[46%] w-[62%]">
              <Image
                src={c.logo}
                alt={c.name}
                fill
                sizes="(max-width: 1024px) 50vw, 20vw"
                /**
                 * En reposo van en escala de grises y recuperan su color al
                 * pasar el cursor o al mantener pulsado (`active`, que es lo
                 * que llega en táctil, donde no hay hover).
                 */
                className="object-contain opacity-55 grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-active:opacity-100 group-active:grayscale-0"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
