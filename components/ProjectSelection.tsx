"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** Id de la sección de detalle; es también el ancla de la nav ("About Wuality"). */
export const PROJECT_DETAIL_ID = "about";

type Selection = { selected: number; select: (index: number) => void };

const Context = createContext<Selection | null>(null);

/**
 * "Nuestros proyectos" y el detalle de abajo son secciones hermanas, así que la
 * selección vive aquí arriba. Al elegir una tarjeta se actualiza el detalle y se
 * ancla a él.
 */
export function ProjectSelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState(0);

  const select = useCallback((index: number) => {
    setSelected(index);

    /**
     * El clic enfoca la tarjeta y el navegador desplaza el riel horizontal para
     * hacerla visible; ese desplazamiento cancela el nuestro si salen a la vez.
     * Esperamos dos frames para ir después del foco, y calculamos el destino a
     * mano —restando el header fijo— en vez de depender de scrollIntoView, que
     * se quedaba corto al competir con el riel.
     */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const target = document.getElementById(PROJECT_DETAIL_ID);
        if (!target) return;
        const header = document.querySelector("header");
        const offset = (header?.offsetHeight ?? 0) + 16;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
      });
    });
  }, []);

  const value = useMemo(() => ({ selected, select }), [selected, select]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useProjectSelection() {
  const value = useContext(Context);
  if (!value) {
    throw new Error("useProjectSelection debe usarse dentro de ProjectSelectionProvider");
  }
  return value;
}
