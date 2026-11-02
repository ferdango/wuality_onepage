"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { withBase } from "@/lib/href";
import { useContent } from "./LangProvider";

/**
 * Dos encuadres del mismo vídeo: apaisado (1920×1080) y vertical (1080×1920),
 * con el punto arriba para dejar sitio al titular. El vertical va a las
 * pantallas más altas que anchas. Los pósteres son el primer cuadro de cada uno.
 */
const PORTRAIT = "(max-aspect-ratio: 1/1)";
const MEDIA = {
  landscape: { video: "/media/video/wuality-hero.mp4", poster: "/media/video/wuality-hero.jpg" },
  portrait: { video: "/media/video/wuality-hero-vertical.mp4", poster: "/media/video/wuality-hero-vertical.jpg" },
};

/**
 * Hero con la estructura del de ustwo: la pieza de marca a sangre ocupando la
 * pantalla y un titular enorme anclado abajo a la izquierda, sin más.
 *
 * La pieza es un vídeo de marca de 8 s en bucle (fuente en scripts/hero-video):
 * las formas de color del manual giran en espiral hasta The Wuality Point, que
 * las absorbe y late. Es la gran idea visual del Brand Manifesto 2026,
 * Complejo → Simple, en movimiento.
 *
 * El vídeo arranca desde aquí y no con `autoplay` en el HTML: así se respeta
 * "reducir movimiento" (se queda en el póster) y se puede pausar con el botón
 * (WCAG 2.2.2: lo que se mueve solo más de 5 s tiene que poder pararse). React
 * no escribe `muted` en el HTML, así que también se fija aquí, antes de `play`.
 */
export default function Hero() {
  const { hero, ui } = useContent();
  const reduced = useReducedMotion();
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    if (reduced) {
      v.pause();
      return;
    }
    v.play().catch(() => setPlaying(false));
  }, [reduced]);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const words = hero.headline.split(" ");

  return (
    <section id="top" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-ink">
      {/**
       * Póster debajo del vídeo, con su encuadre por orientación (el atributo
       * `poster` no admite uno por pantalla). Se ve hasta que el vídeo pinta su
       * primer cuadro, que es el mismo, y es lo que queda con "reducir movimiento".
       */}
      <picture>
        <source media={PORTRAIT} srcSet={withBase(MEDIA.portrait.poster)} />
        <img
          src={withBase(MEDIA.landscape.poster)}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover object-[66%_50%] [@media(max-aspect-ratio:1/1)]:object-center"
        />
      </picture>
      <video
        ref={video}
        className="absolute inset-0 size-full object-cover object-[66%_50%] [@media(max-aspect-ratio:1/1)]:object-center"
        loop
        playsInline
        preload="auto"
        aria-hidden
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source media={PORTRAIT} src={withBase(MEDIA.portrait.video)} type="video/mp4" />
        <source src={withBase(MEDIA.landscape.video)} type="video/mp4" />
      </video>

      {/* Sombra abajo a la izquierda para que el titular se lea sobre cualquier cuadro. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,8,10,0.85)_0%,rgba(5,8,10,0.35)_38%,transparent_62%),linear-gradient(to_right,rgba(5,8,10,0.6)_0%,transparent_55%)]"
      />

      <div className="shell absolute inset-x-0 bottom-0 mx-auto max-w-[1760px] pb-[clamp(28px,4.2vw,80px)]">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ash sm:text-[0.8125rem]"
        >
          <span className="size-2.5 shrink-0 rounded-full bg-red" aria-hidden />
          {hero.eyebrow[0]}
          <span className="hidden sm:inline">· {hero.eyebrow[1]}</span>
        </motion.p>

        <h1 className="mt-[clamp(14px,1.6vw,28px)] max-w-[14ch] text-[length:clamp(2.75rem,0.6rem_+_8.4vw,11.5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.035em] text-bone">
          {words.map((w, i) => (
            <motion.span
              key={`${w}-${i}`}
              initial={reduced ? false : { opacity: 0, y: "0.35em", filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block whitespace-pre"
            >
              {w}{" "}
            </motion.span>
          ))}
        </h1>
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? ui.hero.pause : ui.hero.play}
        className="absolute right-[var(--gutter)] top-[calc(var(--header-h)+clamp(12px,1.6vw,28px))] z-10 grid size-10 place-items-center rounded-full border border-bone/30 bg-ink/40 text-bone backdrop-blur transition-colors duration-300 hover:border-bone"
      >
        <svg viewBox="0 0 16 16" aria-hidden className="size-3.5 fill-current">
          {playing ? <path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" /> : <path d="M4 2.5v11l9-5.5z" />}
        </svg>
      </button>
    </section>
  );
}
