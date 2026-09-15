"use client";

import Image from "@/components/ui/Img";
import Carousel from "./ui/Carousel";
import Reveal from "./ui/Reveal";
import { blog } from "@/lib/content";

export default function Blog() {
  return (
    <section className="bg-ink py-[calc(var(--section-y)*1.4)]">
      <Reveal>
        <h2 className="h-section shell mx-auto max-w-[24ch] text-center text-bone">{blog.title}</h2>
      </Reveal>

      <div className="mt-[clamp(24px,3.3vw,64px)]">
        <Carousel
          ariaLabel="Artículos y episodios de Wuality"
          railClassName="px-[var(--gutter)] scroll-pl-[var(--gutter)]"
          slideClassName="w-[76%] sm:w-[48%] lg:w-[320px]"
          gap="gap-4 lg:gap-6"
        >
          {blog.items.map((item, i) =>
            item.type === "video" ? (
              <article
                key={i}
                className="group relative aspect-[4/5] overflow-hidden rounded-[clamp(14px,1.25vw,24px)]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 76vw, 320px"
                  className="object-cover transition-transform duration-700 ease-wuality group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />

                <Image
                  src="/media/ui/youtube.svg"
                  alt="YouTube"
                  width={40}
                  height={28}
                  className="absolute right-4 top-4 h-6 w-auto"
                />

                <div className="absolute inset-x-0 bottom-0 p-[clamp(12px,1.05vw,20px)]">
                  <h3 className="text-[length:var(--fs-xs)] font-bold text-white">{item.title}</h3>
                  <time className="mt-1 block text-[clamp(10px,0.63vw,12px)] text-white/70">
                    {item.date}
                  </time>
                </div>
              </article>
            ) : (
              <article
                key={i}
                className="group flex h-full flex-col rounded-[clamp(14px,1.25vw,24px)] bg-surface p-[clamp(8px,0.63vw,12px)]"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[clamp(10px,0.83vw,16px)]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 76vw, 320px"
                    className="object-cover transition-transform duration-700 ease-wuality group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-[clamp(8px,0.63vw,12px)]">
                  <time className="text-[clamp(10px,0.63vw,12px)] text-muted">{item.date}</time>
                  <h3 className="mt-1 flex-1 text-[length:var(--fs-xs)] font-bold leading-snug text-bone">
                    {item.title}
                  </h3>
                  <a
                    href="#"
                    className="mt-4 w-fit rounded-full border border-bone/30 px-4 py-2 text-[clamp(11px,0.73vw,14px)] text-bone transition-colors duration-300 hover:border-blue hover:text-blue"
                  >
                    {item.cta}
                  </a>
                </div>
              </article>
            ),
          )}
        </Carousel>
      </div>
    </section>
  );
}
