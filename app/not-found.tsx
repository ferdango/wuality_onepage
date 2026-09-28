import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Página no encontrada — Wuality",
};

/**
 * 404 propio. El de Next venía en inglés, en blanco y negro y con su CSS en un
 * <style> dentro del HTML; éste usa las clases del sitio, así que su CSS va en
 * la hoja minificada como el resto. GitHub Pages lo sirve (out/404.html) para
 * cualquier ruta que no exista.
 *
 * Sin Header ni Footer a propósito: el 404 raíz se carga con todas las páginas
 * y, con ellos dentro, Turbopack duplicaba el chunk de Motion y del contenido
 * en cada una (+180 kB en la home).
 */
export default function NotFound() {
  return (
    <main className="relative grid min-h-[100svh] place-items-center px-[var(--gutter)] py-[calc(var(--header-h)+var(--section-y))] text-center">
      <div className="absolute left-[var(--gutter)] top-[3px] flex h-[var(--header-h)] items-center">
        <Logo href="/" />
      </div>

      <div>
        <p className="text-[length:var(--fs-sm)] font-semibold uppercase tracking-[0.12em] text-muted">Error 404</p>
        <h1 className="h-section dotted mt-4 text-bone">Esta página no existe</h1>
        <p className="mx-auto mt-5 max-w-[40ch] text-balance text-[length:var(--fs-lead)] leading-snug text-ash">
          Puede que el enlace esté mal escrito o que la página ya no esté aquí.
        </p>
        <Link
          href="/"
          className="group mx-auto mt-[clamp(28px,2.9vw,56px)] flex w-fit items-center gap-4 rounded-full border border-bone/30 px-8 py-4 text-[length:var(--fs-sm)] font-semibold text-bone transition-colors duration-300 hover:border-blue hover:text-blue"
        >
          Volver al inicio
          <svg viewBox="0 0 24 24" className="size-5 transition-transform duration-400 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 12h15M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </main>
  );
}
