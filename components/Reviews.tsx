"use client";

import Image from "@/components/ui/Img";
import HorizontalScroll from "./ui/HorizontalScroll";
import Reveal from "./ui/Reveal";
import { useContent } from "./LangProvider";

/**
 * Ancho de cada tarjeta, acotado también por el alto libre del riel
 * (`--rail-h`, lo mide HorizontalScroll): la sección se queda fija mientras se
 * recorre y todo tiene que caber en una pantalla. 0.814 es la proporción
 * 570/700 de la referencia.
 */
const CARD =
  "w-[min(80vw,calc(var(--rail-h)*0.814))] sm:w-[min(44vw,calc(var(--rail-h)*0.814))] lg:w-[min(28.5vw,calc(var(--rail-h)*0.814))]";

export default function Reviews() {
  const { reviews, projects, ui } = useContent();
  // Sin testimonios publicables no hay sección (y el menú tampoco la enlaza).
  if (!reviews.items.length) return null;
  const brand = (slug: string) => projects.find((p) => p.slug === slug)!;
  return (
    <section id="reviews" className="bg-ink">
      <HorizontalScroll
        ariaLabel={ui.reviews.label}
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
          </div>
        }
      >
        {/**
         * Tarjetas de la referencia: por cada testimonio, la ficha de la marca
         * (su logo sobre su color, en lugar de una foto) y a continuación la
         * cita sobre amarillo de marca, con el nombre y el cargo al pie. Las dos
         * miden lo mismo, así que el riel se lee como una tira continua.
         */}
        {reviews.items.flatMap((r) => {
          const p = brand(r.project);
          return [
            <figure
              key={`${r.project}-marca`}
              className="relative flex aspect-[570/700] w-full items-center justify-center overflow-hidden rounded-[clamp(10px,0.7vw,14px)]"
              style={{ backgroundColor: p.bg }}
            >
              <div className="relative h-[34%] w-[78%]">
                <Image
                  src={p.logo}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 64vw, (max-width: 1024px) 35vw, 23vw"
                  className="object-contain"
                />
              </div>
            </figure>,
            <blockquote
              key={`${r.project}-cita`}
              className="flex aspect-[570/700] w-full flex-col justify-between gap-6 rounded-[clamp(10px,0.7vw,14px)] bg-yellow p-[clamp(20px,1.9vw,36px)] text-ink"
            >
              <div>
                {!r.approved && (
                  <p className="mb-4 inline-block rounded-full bg-ink px-3 py-1 text-[0.75rem] font-semibold text-yellow">
                    {reviews.draft}
                  </p>
                )}
                <p className="text-[clamp(1rem,1.15vw,1.375rem)] leading-[1.4]">{r.quote}</p>
              </div>
              <footer>
                <p className="text-[clamp(1.25rem,1.5vw,1.875rem)] font-semibold leading-tight tracking-[-0.01em]">
                  {r.name || reviews.pendingName}
                </p>
                <p className="mt-[clamp(6px,0.6vw,12px)] text-[length:var(--fs-sm)]">{r.role}</p>
              </footer>
            </blockquote>,
          ];
        })}
      </HorizontalScroll>
    </section>
  );
}
