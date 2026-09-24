"use client";

import Image from "@/components/ui/Img";
import HorizontalScroll from "./ui/HorizontalScroll";
import Reveal from "./ui/Reveal";
import { reviews } from "@/lib/content";

/**
 * Ancho de cada tarjeta, acotado también por el alto libre del riel
 * (`--rail-h`, lo mide HorizontalScroll): la sección se queda fija mientras se
 * recorre y todo tiene que caber en una pantalla. 0.814 es la proporción
 * 570/700 de la referencia.
 */
const CARD =
  "w-[min(80vw,calc(var(--rail-h)*0.814))] sm:w-[min(44vw,calc(var(--rail-h)*0.814))] lg:w-[min(28.5vw,calc(var(--rail-h)*0.814))]";

export default function Reviews() {
  return (
    <section id="reviews" className="bg-ink">
      <HorizontalScroll
        ariaLabel="Opiniones de clientes"
        slideClassName={CARD}
        gap="gap-4 lg:gap-8"
        header={
          <div className="shell flex flex-col items-center text-center">
            <Reveal>
              <h2 className="h-section dotted max-w-[16ch] text-bone">{reviews.title}</h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-[clamp(12px,1.05vw,20px)] max-w-[62ch] text-[length:var(--fs-sm)] leading-relaxed text-ash">
                {reviews.subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-[clamp(16px,1.6vw,30px)] flex items-center gap-4">
                <div className="flex -space-x-3">
                  {reviews.avatars.map((a, i) => (
                    <Image
                      key={a + i}
                      src={a}
                      alt=""
                      width={48}
                      height={48}
                      className="size-[clamp(34px,2.5vw,48px)] rounded-full border-2 border-ink object-cover"
                    />
                  ))}
                </div>
                <span className="text-[length:var(--fs-sm)] text-ash">{reviews.count}</span>
              </div>
            </Reveal>
          </div>
        }
      >
        {/**
         * Tarjetas de la referencia: por cada cliente, su foto y a continuación
         * su cita sobre amarillo de marca, con el nombre y el cargo al pie. Las
         * dos miden lo mismo, así que el riel se lee como una tira continua.
         */}
        {reviews.items.flatMap((r) => [
          <figure
            key={`${r.name}-foto`}
            className="relative aspect-[570/700] w-full overflow-hidden rounded-[clamp(10px,0.7vw,14px)] bg-card"
          >
            <Image
              src={r.avatar}
              alt={r.name}
              fill
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 44vw, 29vw"
              className="object-cover"
            />
          </figure>,
          <blockquote
            key={`${r.name}-cita`}
            className="flex aspect-[570/700] w-full flex-col justify-between rounded-[clamp(10px,0.7vw,14px)] bg-yellow p-[clamp(20px,1.9vw,36px)] text-ink"
          >
            <p className="text-[clamp(1rem,1.25vw,1.5rem)] leading-[1.35]">{r.quote}</p>
            <footer>
              <p className="text-[clamp(1.5rem,1.8vw,2.125rem)] font-semibold leading-tight tracking-[-0.01em]">
                {r.name}
              </p>
              <p className="mt-[clamp(8px,0.8vw,16px)] text-[length:var(--fs-sm)]">{r.role}</p>
            </footer>
          </blockquote>,
        ])}
      </HorizontalScroll>
    </section>
  );
}
