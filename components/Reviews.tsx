"use client";

import Image from "@/components/ui/Img";
import Carousel from "./ui/Carousel";
import Reveal from "./ui/Reveal";
import { reviews } from "@/lib/content";

export default function Reviews() {
  return (
    <section
      id="reviews"
      // En móvil la sección ocupa 90vh, con el contenido centrado en ese alto.
      className="flex min-h-[90svh] flex-col justify-center bg-ink py-[calc(var(--section-y)*1.4)] md:block md:min-h-0"
    >
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

      <div className="shell mt-[clamp(24px,2.5vw,48px)]">
        <Carousel
          ariaLabel="Opiniones de clientes"
          slideClassName="w-[84%] sm:w-[55%] lg:w-[26%]"
          gap="gap-4 lg:gap-6"
        >
          {reviews.items.map((r) => (
            <article
              key={r.name + r.date}
              className="flex h-full flex-col rounded-[clamp(14px,1.25vw,24px)] border border-line bg-surface p-[clamp(16px,1.25vw,24px)] transition-colors duration-500 hover:border-bone/20"
            >
              <header className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Image
                    src={r.avatar}
                    alt=""
                    width={44}
                    height={44}
                    className="size-[clamp(32px,2.3vw,44px)] rounded-full object-cover"
                  />
                  <span>
                    <span className="block text-[length:var(--fs-xs)] font-bold text-yellow">{r.name}</span>
                    <span className="block text-[length:var(--fs-xs)] text-ash">{r.role}</span>
                  </span>
                </div>
                <Image
                  src="/media/ui/heart-eyes.png"
                  alt="Reseña positiva"
                  width={32}
                  height={32}
                  className="pop-on-active size-[clamp(24px,1.67vw,32px)] shrink-0"
                />
              </header>

              <p className="mt-[clamp(12px,1.05vw,20px)] flex-1 text-[length:var(--fs-xs)] leading-relaxed text-ash">
                {r.quote}
              </p>

              <time className="mt-[clamp(12px,1.05vw,20px)] block text-[clamp(11px,0.9733vw,14px)] font-semibold text-bone">
                {r.date}
              </time>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
