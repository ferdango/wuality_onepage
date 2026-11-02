"use client";

import Image from "@/components/ui/Img";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";
import { useContent } from "./LangProvider";

/**
 * "Qué hacemos": la primera banda clara después del hero, al estilo de las
 * presentaciones corporativas (ustwo, Huge, Globant): rótulo, una declaración
 * grande en peso medio, el detalle al lado y una llamada a la acción.
 *
 * Debajo, una foto de equipo con The Wuality Point superpuesto (el manual pide
 * personas en su entorno de trabajo con un detalle de marca) junto a la "gran
 * idea visual" del manifiesto, Complejo → Simple; y cierra la tira de logos de
 * clientes, que es la prueba social que los grandes estudios ponen arriba.
 */
export default function Intro() {
  const { intro, clients } = useContent();
  return (
    <section id="que-hacemos" className="relative overflow-hidden bg-paper text-ink">
      <div className="shell mx-auto max-w-[1760px] py-[calc(var(--section-y)*1.7)]">
        <Reveal>
          <Eyebrow>{intro.eyebrow}</Eyebrow>
        </Reveal>

        <div className="mt-[clamp(20px,2vw,36px)] grid gap-[clamp(28px,4vw,80px)] lg:grid-cols-[1.45fr_1fr]">
          <Reveal delay={0.05}>
            <p className="text-balance text-[length:clamp(1.625rem,1.05rem_+_2.3vw,3.75rem)] font-medium leading-[1.12] tracking-[-0.025em]">
              {intro.statement}
            </p>
          </Reveal>
          <Reveal delay={0.12} className="flex flex-col justify-end gap-6">
            <p className="text-[length:var(--fs-body)] leading-relaxed text-graphite">{intro.body}</p>
            <a
              href="#contacto"
              className="group flex w-fit items-center gap-3 border-b-2 border-ink pb-1 text-[length:var(--fs-body)] font-semibold transition-colors duration-300 hover:border-red hover:text-red"
            >
              {intro.cta}
              <span aria-hidden className="transition-transform duration-400 ease-wuality group-hover:translate-x-1">
                →
              </span>
            </a>
          </Reveal>
        </div>

        <div className="mt-[clamp(40px,5vw,96px)] grid gap-[clamp(12px,1.25vw,24px)] lg:grid-cols-[1.65fr_1fr]">
          <Reveal className="relative">
            <figure className="relative aspect-[16/11] w-full overflow-hidden rounded-[clamp(16px,1.6vw,32px)] bg-sand">
              <Image
                src={intro.image}
                alt={intro.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </figure>
            {/* The Wuality Point asomando por la esquina: el detalle de marca sobre la foto. */}
            <Image
              src="/media/brand/wuality-simbolo-red.png"
              alt=""
              width={640}
              height={640}
              className="pointer-events-none absolute -bottom-[6%] -right-[4%] w-[clamp(84px,12vw,220px)] drop-shadow-[0_24px_48px_rgba(244,37,48,0.35)]"
            />
          </Reveal>

          {/* La gran idea visual del manifiesto: transformación, no decoración. */}
          <Reveal delay={0.1}>
            <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-[clamp(16px,1.6vw,32px)] bg-ink p-[clamp(24px,2.6vw,52px)] text-bone">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-1/4 -top-1/4 aspect-square w-[85%] rounded-full bg-[radial-gradient(circle,rgba(255,73,221,0.55),rgba(244,37,48,0.25)_45%,transparent_70%)] blur-2xl"
              />
              <Eyebrow tone="light" className="relative">
                {intro.idea.title}
              </Eyebrow>
              <ul className="relative flex flex-col gap-[clamp(18px,2vw,32px)]">
                {intro.idea.items.map((item) => (
                  <li key={item.from} className="flex flex-col gap-1">
                    <span className="text-[length:var(--fs-sm)] text-muted line-through decoration-red/70">
                      {item.from}
                    </span>
                    <span className="flex items-center gap-3 text-[length:clamp(1.5rem,1rem_+_1.6vw,2.75rem)] font-semibold leading-none tracking-[-0.02em]">
                      <span aria-hidden className="text-red">
                        →
                      </span>
                      {item.to}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Prueba social: los clientes, en monocromo para que la tira se lea como un bloque. */}
        <div className="mt-[clamp(56px,6vw,120px)]">
          <Reveal>
            <p className="text-center text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-graphite">
              {intro.logos}
            </p>
          </Reveal>
          <ul className="mt-[clamp(20px,2.4vw,44px)] grid grid-cols-4 items-center gap-x-[clamp(16px,3vw,56px)] gap-y-[clamp(20px,2.4vw,40px)] lg:grid-cols-8">
            {clients.map((c) => (
              <li key={c.name} className="relative h-[clamp(28px,2.6vw,48px)]">
                <Image
                  src={c.logo}
                  alt={c.name}
                  fill
                  sizes="(max-width: 1024px) 22vw, 10vw"
                  className={`object-contain opacity-70 transition-opacity duration-300 hover:opacity-100 ${
                    "badge" in c && c.badge ? "grayscale" : "brightness-0"
                  }`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
