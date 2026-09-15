"use client";

import Image from "@/components/ui/Img";
import Carousel from "./ui/Carousel";
import SectionTitle from "./ui/SectionTitle";
import { partners } from "@/lib/content";

export default function Partners() {
  return (
    <section className="bg-ink py-[calc(var(--section-y)*1.4)]">
      <SectionTitle className="mb-[clamp(2rem,3.3vw,4rem)]">Partners digitales</SectionTitle>

      <div>
        <Carousel
          ariaLabel="Partners digitales de Wuality"
          railClassName="px-[var(--gutter)] scroll-pl-[var(--gutter)]"
          autoPlayMs={4200}
          slideClassName="w-[70%] sm:w-[45%] lg:w-[calc(20%-1.2rem)]"
          gap="gap-4 lg:gap-6"
        >
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
                  sizes="(max-width: 1024px) 45vw, 20vw"
                  className="object-contain opacity-80 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
