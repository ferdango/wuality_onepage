"use client";

import Image from "@/components/ui/Img";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import SectionTitle from "./ui/SectionTitle";
import { faq } from "@/lib/content";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-ink py-[calc(var(--section-y)*1.4)]">
      <SectionTitle className="mb-[clamp(2rem,4.2vw,5rem)]">{faq.title}</SectionTitle>

      <div className="mx-auto w-full max-w-[1440px] px-[var(--gutter)]">
        {faq.items.map((item, i) => {
          const isOpen = i === open;
          return (
            <div key={i} className="border-b border-line">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-[clamp(18px,2.9vw,56px)] text-left"
                >
                  <span className="text-[length:var(--fs-h4)] font-bold leading-snug text-bone">
                    {item.q}
                  </span>
                  <span className="relative grid size-4 shrink-0 place-items-center">
                    <Image
                      src={isOpen ? "/media/ui/faq-minus.svg" : "/media/ui/faq-plus.svg"}
                      alt=""
                      width={48}
                      height={48}
                      className={`size-full transition-transform duration-400 ease-wuality ${
                        isOpen ? "" : "group-hover:rotate-90"
                      }`}
                    />
                  </span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-[clamp(24px,3.3vw,64px)] pr-0 lg:pr-[clamp(24px,3.3vw,64px)]">
                      <p className="text-[length:var(--fs-lead)] leading-relaxed text-ash">{item.a}</p>

                      {i === 0 && (
                        <div className="mt-[clamp(20px,2.1vw,40px)] flex flex-wrap items-center gap-5">
                          <span className="text-[length:var(--fs-body)] text-ash">{faq.cta.label}</span>
                          <a
                            href="#contacto"
                            className="rounded-xl bg-blue/15 px-6 py-3 text-[length:var(--fs-xs)] font-bold text-blue transition-colors duration-300 hover:bg-blue/25"
                          >
                            {faq.cta.button}
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
