"use client";

import Image from "@/components/ui/Img";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { chat, cookies } from "@/lib/content";

const STORAGE_KEY = "wuality:cookie-consent";

export default function FloatingActions() {
  const [consent, setConsent] = useState<string | null>("pending");
  const [cookieOpen, setCookieOpen] = useState(false);
  const [teaserOpen, setTeaserOpen] = useState(false);
  const [canHover, setCanHover] = useState(false);

  // La decisión de cookies se recuerda entre visitas.
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    setConsent(stored);
    if (!stored) {
      const t = setTimeout(() => setCookieOpen(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  // El globo del diseño solo aparece donde hay hover real: en táctil el tap
  // debe abrir WhatsApp directamente, sin un paso intermedio.
  useEffect(() => {
    const query = window.matchMedia("(hover: hover)");
    const sync = () => setCanHover(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const decide = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* modo privado: la decisión solo dura esta sesión */
    }
    setConsent(value);
    setCookieOpen(false);
  };

  return (
    <>
      {/* Botón de cookies (abajo izquierda) */}
      <button
        type="button"
        onClick={() => setCookieOpen((v) => !v)}
        aria-label="Preferencias de cookies"
        aria-expanded={cookieOpen}
        className="fixed bottom-[clamp(16px,1.67vw,32px)] left-[clamp(16px,1.67vw,32px)] z-50 flex size-[clamp(44px,3.33vw,64px)] items-center justify-center rounded-full bg-bone shadow-xl shadow-black/40 transition-transform duration-400 ease-wuality hover:scale-110"
      >
        <Image src="/media/ui/cookie.svg" alt="" width={32} height={32} className="size-[58%]" />
      </button>

      {/* WhatsApp (abajo derecha): el botón lleva directo al chat */}
      <div
        className="fixed bottom-[clamp(16px,1.67vw,32px)] right-[clamp(16px,1.67vw,32px)] z-50 flex flex-col items-end gap-4"
        onMouseEnter={() => canHover && setTeaserOpen(true)}
        onMouseLeave={() => setTeaserOpen(false)}
        onFocusCapture={() => canHover && setTeaserOpen(true)}
        onBlurCapture={() => setTeaserOpen(false)}
      >
        <AnimatePresence>
          {teaserOpen && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.94 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-[284px] rounded-[28px] bg-[#141d21] p-6 text-center shadow-2xl shadow-black/50"
            >
              <Image
                src="/media/ui/sparkle.svg"
                alt=""
                width={40}
                height={40}
                className="mx-auto size-9"
              />
              <p className="mt-4 text-[15px] font-bold leading-snug text-bone">{chat.question}</p>
              <a
                href={chat.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 block rounded-full border border-bone/50 py-3 text-[14px] text-bone transition-colors duration-300 hover:bg-bone hover:text-ink"
              >
                {chat.cta}
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <a
          href={chat.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Escribir por WhatsApp al ${chat.phone}`}
          className="relative flex size-[clamp(48px,3.75vw,72px)] items-center justify-center rounded-full bg-[#25d366] shadow-xl shadow-black/40 transition-transform duration-400 ease-wuality hover:scale-110"
        >
          <Image src="/media/ui/wa.svg" alt="" width={48} height={48} className="size-[55%]" />
          {!teaserOpen && (
            <span
              className="absolute inset-0 animate-ping rounded-full bg-[#25d366]/40 [animation-duration:2.6s]"
              aria-hidden
            />
          )}
        </a>
      </div>

      {/* Banner de cookies */}
      <AnimatePresence>
        {cookieOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Aviso de cookies"
            className="fixed bottom-[clamp(74px,6.5vw,110px)] left-[clamp(16px,1.67vw,32px)] z-50 w-[min(346px,calc(100vw-2rem))] rounded-[20px] bg-[#f7f7f7] p-6 text-left text-[#1a1a1a] shadow-2xl shadow-black/40"
          >
            <Image src="/media/ui/cookie.svg" alt="" width={48} height={48} className="size-10" />
            <p className="mt-5 text-[15px] leading-relaxed">{cookies.body}</p>
            <a href="#" className="mt-3 block text-[15px] text-[#0070ba] underline">
              {cookies.link}
            </a>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => decide("accepted")}
                className="flex-1 rounded-full border border-[#1a1a1a] py-3 text-[15px] transition-colors duration-300 hover:bg-[#1a1a1a] hover:text-white"
              >
                {cookies.accept}
              </button>
              <button
                type="button"
                onClick={() => decide("rejected")}
                className="flex-1 rounded-full border border-[#1a1a1a] py-3 text-[15px] transition-colors duration-300 hover:bg-[#1a1a1a] hover:text-white"
              >
                {cookies.reject}
              </button>
            </div>
            {consent && (
              <p className="mt-4 text-[12px] text-[#666]">
                Preferencia guardada: {consent === "accepted" ? "aceptadas" : "rechazadas"}.
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
