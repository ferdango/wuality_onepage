"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import Logo from "./ui/Logo";
import MenuOverlay from "./MenuOverlay";
import { languages, nav } from "@/lib/content";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState(languages[0].code);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const langRef = useRef<HTMLDivElement>(null);

  // Barra de progreso roja del diseño (línea superior del header).
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy: marca en blanco el enlace de la sección visible.
  useEffect(() => {
    const sections = nav
      .map((n) => document.querySelector<HTMLElement>(n.href))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Cierra el selector de idioma al hacer clic fuera.
  useEffect(() => {
    if (!langOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!langRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setLangOpen(false);
    document.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-red"
        style={{ scaleX: progress }}
      />

      <header
        className={`fixed inset-x-0 top-[3px] z-[60] transition-colors duration-500 ${
          scrolled ? "bg-ink/85 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="shell flex h-[var(--header-h)] items-center justify-between">
          <Logo />

          <div className="flex items-center gap-[clamp(12px,2.5vw,48px)]">
            <nav className="hidden items-center gap-[clamp(20px,2.5vw,48px)] lg:flex">
              {nav.map((item) => {
                const isActive = active === item.href;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`relative text-[var(--fs-sm)] font-semibold transition-colors duration-300 ${
                      isActive ? "text-bone" : "text-ash hover:text-bone"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-[2px] rounded-full bg-red transition-all duration-500 ease-wuality ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Selector de idioma y región */}
            <div ref={langRef} className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                aria-expanded={langOpen}
                aria-haspopup="listbox"
                className="flex items-center gap-3 text-[var(--fs-sm)] font-semibold text-bone"
              >
                <Image
                  src="/media/ui/flag-es.png"
                  alt=""
                  width={32}
                  height={32}
                  className="size-[clamp(22px,1.6667vw,32px)] rounded-full object-cover"
                />
                {lang}
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.ul
                    role="listbox"
                    aria-label="Idioma y región"
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute right-0 top-[calc(100%+18px)] w-[252px] rounded-3xl bg-card/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-xl"
                  >
                    <li className="px-3 pb-3 text-[15px] font-bold text-blue">Idioma y región</li>
                    {languages.map((l) => {
                      const selected = l.code === lang;
                      return (
                        <li key={l.code}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={selected}
                            onClick={() => {
                              setLang(l.code);
                              setLangOpen(false);
                            }}
                            className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left transition-colors duration-200 ${
                              selected ? "bg-ink" : "hover:bg-ink/60"
                            }`}
                          >
                            <span>
                              <span className="block text-[15px] font-semibold text-bone">{l.name}</span>
                              <span className="block text-[13px] text-muted">{l.region}</span>
                            </span>
                            {selected && (
                              <svg viewBox="0 0 24 24" className="size-5 text-[#3ddc84]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              className="group flex size-[clamp(40px,2.917vw,56px)] items-center justify-center rounded-full border border-bone/60 transition-colors duration-300 hover:border-red hover:bg-red"
            >
              <span className="flex w-[45%] flex-col gap-[3px]">
                <span className="h-[2px] w-full rounded-full bg-bone transition-transform duration-300 group-hover:translate-x-[2px]" />
                <span className="h-[2px] w-[72%] self-end rounded-full bg-bone transition-all duration-300 group-hover:w-full" />
                <span className="h-[2px] w-full rounded-full bg-bone transition-transform duration-300 group-hover:-translate-x-[2px]" />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
