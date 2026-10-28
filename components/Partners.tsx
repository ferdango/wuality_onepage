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

      {/* En bucle y de uno en uno: con 4 a la vez en desktop, cada paso deja ver un logo nuevo. */}
      <div className="mx-auto max-w-[1600px]">
        <LoopSlider ariaLabel={ui.partners.label} perClassName="[--per:2] sm:[--per:3] lg:[--per:4]">
          {partners.map((p) => (
            <div
              key={p.name}
              className="group flex h-[clamp(96px,6.9vw,132px)] items-center justify-center rounded-[clamp(12px,1.05vw,20px)] border border-line bg-surface px-6 transition-colors duration-500 hover:border-bone/30 hover:bg-card"
            >
              <div className="relative h-[52%] w-[76%]">
                <Image
                  src={p.logo}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                  className="object-contain opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>
            </div>
          ))}
        </LoopSlider>
      </div>
    </section>
  );
}
