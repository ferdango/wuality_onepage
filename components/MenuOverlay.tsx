"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import Logo from "./ui/Logo";
import { nav } from "@/lib/content";
import { withBase } from "@/lib/href";

/** Orden del menú overlay en el Figma (distinto al del header). */
const menuOrder = ["About Wuality", "Services", "Work", "Reviews", "Blog"] as const;
const items = menuOrder.map((label) => nav.find((n) => n.label === label)!);

export default function MenuOverlay({
  open,
  onClose,
  linkBase = "",
}: {
  open: boolean;
  onClose: () => void;
  /** Igual que en Header: desde una ruta interna los anclajes vuelven al home. */
  linkBase?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(0);

  // Bloquea el scroll del body y cierra con Escape.
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("scroll-locked");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("scroll-locked");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] bg-ink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Menú principal"
        >
          <div className="shell flex h-[var(--header-h)] items-center justify-between pt-2">
            <Logo />
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar menú"
              className="flex size-[clamp(40px,2.917vw,56px)] items-center justify-center rounded-full border border-bone/60 text-bone transition-colors duration-300 hover:border-red hover:bg-red hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="size-[45%]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>

          <nav
            className="flex h-[calc(100dvh-var(--header-h))] flex-col items-center justify-center gap-[clamp(4px,0.8vw,10px)]"
            onMouseLeave={() => setHovered(0)}
          >
            {items.map((item, i) => (
              <motion.a
                key={item.label}
                href={withBase(`${linkBase}${item.href}`)}
                onClick={onClose}
                onMouseEnter={() => setHovered(i)}
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className={`text-[clamp(2rem,3.75vw,4.5rem)] font-bold leading-[1.35] transition-colors duration-300 ${
                  hovered === i ? "text-bone" : "text-muted"
                }`}
              >
                {item.short}
              </motion.a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
