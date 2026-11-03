"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "@/components/ui/Img";
import Logo from "./ui/Logo";
import { withBase } from "@/lib/href";
import { switchPath } from "@/lib/i18n";
import { useContent, useLang } from "./LangProvider";

/** Orden del menú, por ancla: el texto cambia con el idioma. */
const menuOrder = ["#services", "#work", "#metodo", "#nosotros", "#reviews", "#blog"];

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Menú a pantalla completa (sólo móvil y tablet: en desktop el menú va entero
 * en la barra). Como los de ustwo o Huge: la lista grande, alineada a la
 * izquierda y numerada, con la sección en curso marcada; una llamada a la
 * acción clara; y abajo lo que se busca en un menú móvil —contacto directo,
 * idioma y redes—, que antes obligaba a cerrarlo y bajar hasta el pie.
 *
 * Si la pantalla es baja, el contenido se desplaza dentro del menú en vez de
 * cortarse.
 */
export default function MenuOverlay({
  open,
  onClose,
  linkBase = "",
  active = "",
}: {
  open: boolean;
  onClose: () => void;
  /** Igual que en Header: desde una ruta interna los anclajes vuelven al home. */
  linkBase?: string;
  /** Ancla de la sección visible (el scroll spy del Header). */
  active?: string;
}) {
  const { nav, ui, footer, chat, languages } = useContent();
  const lang = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();
  // Sólo las secciones que se publican ("Reseñas" puede no estar, ver content.ts › nav).
  const items = menuOrder.flatMap((href) => nav.find((n) => n.href === href) ?? []);
  const socials = footer.socials.filter((s) => s.href.startsWith("http"));

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

  /** Entrada escalonada; con "reducir movimiento", todo aparece ya en su sitio. */
  const enter = (i: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.06 + i * 0.05, ease },
        };

  const heading = "text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-muted";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto overscroll-contain bg-ink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease }}
          role="dialog"
          aria-modal="true"
          aria-label={ui.menu.label}
        >
          <div className="shell flex h-[var(--header-h)] shrink-0 items-center justify-between pt-2">
            <Logo href={linkBase || "#top"} />
            <button
              type="button"
              onClick={onClose}
              aria-label={ui.menu.close}
              className="flex size-[clamp(40px,2.917vw,56px)] items-center justify-center rounded-full border border-bone/60 text-bone transition-colors duration-300 hover:border-red hover:bg-red hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="size-[45%]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>

          <div className="shell flex flex-1 flex-col pb-[max(24px,env(safe-area-inset-bottom))] pt-[clamp(16px,4vh,40px)]">
            <nav aria-label={ui.menu.label}>
              <ol className="border-t border-line">
                {items.map((item, i) => {
                  const current = active === item.href;
                  return (
                    <motion.li key={item.href} className="border-b border-line" {...enter(i)}>
                      <a
                        href={withBase(`${linkBase}${item.href}`)}
                        onClick={onClose}
                        aria-current={current ? "location" : undefined}
                        className="group flex items-center gap-4 py-[clamp(12px,2.2vh,20px)]"
                      >
                        <span className="w-7 text-[length:var(--fs-xs)] font-semibold tabular-nums text-muted">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1 text-[length:clamp(1.75rem,1.2rem_+_3vw,3rem)] font-bold leading-none tracking-[-0.02em] text-bone transition-colors duration-300 group-hover:text-ash">
                          {item.short}
                        </span>
                        {current ? (
                          <span className="flex items-center gap-2 text-[length:var(--fs-xs)] text-ash">
                            <span className="size-2.5 rounded-full bg-red" aria-hidden />
                            {ui.menu.current}
                          </span>
                        ) : (
                          <svg viewBox="0 0 24 24" aria-hidden className="size-5 text-muted transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 12h15M13 6l6 6-6 6" />
                          </svg>
                        )}
                      </a>
                    </motion.li>
                  );
                })}
              </ol>
            </nav>

            <motion.a
              href={withBase(`${linkBase}#contacto`)}
              onClick={onClose}
              className="mt-[clamp(20px,4vh,36px)] flex items-center justify-center gap-3 rounded-full bg-bone py-4 text-[length:var(--fs-body)] font-semibold text-ink transition-colors duration-300 hover:bg-white"
              {...enter(items.length)}
            >
              {ui.header.cta}
              <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h15M13 6l6 6-6 6" />
              </svg>
            </motion.a>

            <motion.div
              className="mt-auto grid grid-cols-2 gap-x-6 gap-y-6 pt-[clamp(28px,6vh,56px)] sm:grid-cols-3"
              {...enter(items.length + 1)}
            >
              <div className="col-span-2 sm:col-span-1">
                <p className={heading}>{ui.menu.contact}</p>
                <ul className="mt-3 flex flex-col gap-2 text-[length:var(--fs-sm)]">
                  <li>
                    <a href={`mailto:${footer.email}`} className="text-bone">
                      {footer.email}
                    </a>
                  </li>
                  <li>
                    <a href={chat.href} target="_blank" rel="noopener noreferrer" className="text-ash">
                      WhatsApp {chat.phone}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className={heading}>{ui.menu.language}</p>
                <ul className="mt-3 flex gap-2">
                  {languages.map((l) => {
                    const selected = l.lang === lang;
                    return (
                      <li key={l.code}>
                        <button
                          type="button"
                          aria-pressed={selected}
                          onClick={() => {
                            onClose();
                            // La misma página en el otro idioma, y en la misma sección si había ancla.
                            if (!selected) router.push(`${switchPath(pathname, l.lang)}${window.location.hash}`);
                          }}
                          className={`min-w-12 rounded-full border px-4 py-2 text-[length:var(--fs-xs)] font-semibold transition-colors duration-300 ${
                            selected ? "border-bone bg-bone text-ink" : "border-line text-ash hover:border-bone/50"
                          }`}
                        >
                          {l.code}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <p className={heading}>{ui.menu.follow}</p>
                <ul className="mt-3 flex gap-2">
                  {socials.map((s) => (
                    <li key={s.name}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.name}
                        className="flex size-10 items-center justify-center rounded-full border border-line transition-colors duration-300 hover:border-bone"
                      >
                        <Image src={s.icon} alt="" width={32} height={32} className="size-[42%]" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
