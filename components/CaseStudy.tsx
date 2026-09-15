"use client";

import Image from "@/components/ui/Img";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import Reveal from "./ui/Reveal";
import { PROJECT_DETAIL_ID, useProjectSelection } from "./ProjectSelection";
import { projects } from "@/lib/content";

export default function CaseStudy() {
  const { selected } = useProjectSelection();
  const project = projects[selected];
  const [open, setOpen] = useState(0);

  // Al cambiar de proyecto, el detalle vuelve a su primer capítulo.
  useEffect(() => setOpen(0), [selected]);

  return (
    <section id={PROJECT_DETAIL_ID} className="bg-ink py-[calc(var(--section-y)*1.25)]">
      <div className="shell grid items-start gap-[clamp(28px,3.3vw,64px)] lg:grid-cols-[minmax(0,592fr)_minmax(0,928fr)]">
        <div className="flex flex-col">
          <Reveal>
            <ul className="flex flex-wrap gap-3">
              {project.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-red px-4 py-1.5 text-[clamp(11px,0.9733vw,14px)] font-semibold text-red"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="dotted mt-[clamp(14px,1.25vw,24px)] text-[clamp(2rem,4.44vw,4rem)] font-bold leading-none text-bone">
              {project.name}
            </h2>
          </Reveal>

          {/* El contenido cambia con la tarjeta elegida arriba */}
          <AnimatePresence mode="wait">
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-[clamp(20px,2.1vw,40px)]"
            >
              {project.chapters.map((c, i) => {
                const isOpen = i === open;
                return (
                  <div key={c.title}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      aria-expanded={isOpen}
                      className={`block w-full py-[clamp(10px,1.05vw,20px)] text-left text-[clamp(1.25rem,2.5vw,2.25rem)] font-bold transition-colors duration-400 ${
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
                          <p className="pb-[clamp(12px,1.25vw,24px)] text-[length:var(--fs-body)] leading-relaxed text-ash">
                            {c.body}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal delay={0.12} className="w-full">
          <div className="relative aspect-[928/840] w-full overflow-hidden rounded-[clamp(16px,1.25vw,24px)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ backgroundColor: project.bg }}
                className="absolute inset-0"
              >
                <Image
                  src={project.shot}
                  alt={`Caso de estudio ${project.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-[clamp(20px,3vw,56px)]"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
