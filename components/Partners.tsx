"use client";

import Image from "@/components/ui/Img";
import LoopSlider from "./ui/LoopSlider";
import SectionTitle from "./ui/SectionTitle";
import { useContent } from "./LangProvider";

export default function Partners() {
  const { partners, ui } = useContent();
  return (
    <section className="bg-ink py-[calc(var(--section-y)*1.4)]">
      <SectionTitle className="mb-[clamp(2rem,3.3vw,4rem)]">{ui.partners.title}</SectionTitle>

      {/**
       * En bucle y de uno en uno: con 4 a la vez en desktop, cada paso deja ver
       * un logo nuevo; en móvil, 1,6 para que los logos se lean y asome el siguiente.
       */}
      <div className="mx-auto max-w-[1600px]">
        <LoopSlider ariaLabel={ui.partners.label} perClassName="[--per:1.6] sm:[--per:3] lg:[--per:4]">
          {partners.map((p) => (
            <div
              key={p.name}
              className="group flex h-[clamp(96px,6.9vw,132px)] items-center justify-center rounded-[clamp(12px,1.05vw,20px)] border border-line bg-surface px-5 transition-colors duration-500 hover:border-bone/30 hover:bg-card"
            >
              <Image
                src={p.logo}
                alt={p.name}
                width={p.w}
                height={p.h}
                /**
                 * Mismo peso visual para todos: el ancho crece con la raíz de la
                 * proporción, así un logo muy alargado (Atlassian, 8:1) no se ve
                 * diminuto a lo alto ni uno casi cuadrado se come la ficha.
                 */
                style={{ width: `${Math.min(80, 33 * Math.sqrt(p.w / p.h))}%` }}
                className="h-auto opacity-80 transition-opacity duration-500 group-hover:opacity-100"
              />
            </div>
          ))}
        </LoopSlider>
      </div>
    </section>
  );
}
