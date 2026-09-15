"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Reveal from "./ui/Reveal";
import { caseStudy } from "@/lib/content";

export default function CaseStudy() {
  const [open, setOpen] = useState(0);

  return (
    <section id="about" className="bg-ink py-[calc(var(--section-y)*1.25)]">
      <div className="shell grid items-start gap-[clamp(28px,3.3vw,64px)] lg:grid-cols-[minmax(0,592fr)_minmax(0,928fr)]">
        <div className="flex flex-col">
          <Reveal>
            <ul className="flex flex-wrap gap-3">
              {caseStudy.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-red px-4 py-1.5 text-[clamp(11px,0.73vw,14px)] font-semibold text-red"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="dotted mt-[clamp(14px,1.25vw,24px)] text-[clamp(2rem,3.33vw,4rem)] font-bold leading-none text-bone">
              {caseStudy.client}
            </h2>
          </Reveal>

          <div className="mt-[clamp(20px,2.1vw,40px)]">
            {caseStudy.chapters.map((c, i) => {
              const isOpen = i === open;
              return (
                <div key={c.title}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className={`block w-full py-[clamp(10px,1.05vw,20px)] text-left text-[clamp(1.25rem,1.875vw,2.25rem)] font-bold transition-colors duration-400 ${
                      isOpen ? "text-blue" : "text-muted hover:text-ash"
                    }`}
                  >
                    {c.title}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-[clamp(12px,1.25vw,24px)] text-[var(--fs-body)] leading-relaxed text-ash">
                          {c.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.12} className="w-full">
          <div className="relative aspect-[928/840] w-full overflow-hidden rounded-[clamp(16px,1.25vw,24px)]">
            <Image
              src={caseStudy.image}
              alt={`Caso de estudio ${caseStudy.client}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
