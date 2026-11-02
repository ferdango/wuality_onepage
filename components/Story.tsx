"use client";

import Image from "@/components/ui/Img";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";
import { useContent } from "./LangProvider";

/**
 * "Nuestra historia": origen y ambición de la marca (Brand Manifesto 2026,
 * "Built in Lima, Peru"), en una banda celeste de la paleta primaria, como la
 * de "Our story" de ustwo. El texto va en tinta: sobre el celeste da 9,2:1.
 */
export default function Story() {
  const { story } = useContent();
  return (
    <section id="nosotros" className="relative overflow-hidden bg-sky text-ink">
      <div className="shell relative mx-auto grid max-w-[1760px] items-center gap-[clamp(32px,4vw,88px)] py-[calc(var(--section-y)*1.7)] lg:grid-cols-[1fr_1.15fr]">
        <div>
          <Reveal>
            <Eyebrow tone="ink">{story.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-[clamp(16px,1.6vw,28px)] text-[length:clamp(2.25rem,1.2rem_+_4.2vw,6rem)] font-bold leading-[0.98] tracking-[-0.035em]">
              {story.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-[clamp(20px,2vw,36px)] flex max-w-[52ch] flex-col gap-4">
            {story.body.map((line) => (
              <p key={line} className="text-[length:var(--fs-body)] leading-relaxed">
                {line}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.14}>
            <dl className="mt-[clamp(24px,2.6vw,48px)] grid gap-4 border-t border-ink/25 pt-[clamp(16px,1.6vw,28px)] sm:grid-cols-2">
              <div>
                <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.16em]">{story.beliefLabel}</dt>
                <dd className="mt-1 text-[length:var(--fs-sm)] font-semibold">{story.belief}</dd>
              </div>
              <div>
                <dt className="text-[0.75rem] font-semibold uppercase tracking-[0.16em]">{story.ambitionLabel}</dt>
                <dd className="mt-1 text-[length:var(--fs-sm)] font-semibold">{story.ambition}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="relative">
          <figure className="relative aspect-[16/10] w-full overflow-hidden rounded-[clamp(16px,1.6vw,32px)]">
            <Image src={story.image} alt={story.alt} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
          </figure>
          <Image
            src="/media/brand/wuality-simbolo-red.png"
            alt=""
            width={640}
            height={640}
            className="pointer-events-none absolute -left-[5%] -top-[8%] w-[clamp(72px,9vw,168px)] drop-shadow-[0_20px_40px_rgba(244,37,48,0.35)]"
          />
        </Reveal>
      </div>
    </section>
  );
}
