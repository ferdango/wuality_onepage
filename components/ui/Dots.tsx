"use client";

import { useContent } from "../LangProvider";
import { fill } from "@/lib/i18n";

/**
 * Indicador del diseño: puntos grises y una píldora blanca para el activo.
 *
 * El punto se ve de 8px, pero el botón mide 24px de alto y deja 8px a cada
 * lado: es el área táctil mínima de WCAG 2.2 (2.5.8). El gris de los inactivos
 * da 3,3:1 sobre la tinta, el mínimo para un control que hay que distinguir.
 */
export default function Dots({
  count,
  index,
  onSelect,
  className = "",
}: {
  count: number;
  index: number;
  onSelect?: (i: number) => void;
  className?: string;
}) {
  const { ui } = useContent();
  return (
    <div className={`flex items-center justify-center ${className}`} role="tablist">
      {Array.from({ length: count }).map((_, i) => {
        const active = i === index;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={fill(ui.carousel.goTo, { n: i + 1 })}
            onClick={() => onSelect?.(i)}
            className="group flex h-6 items-center px-2"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-500 ease-wuality ${
                active ? "w-10 bg-bone" : "w-2 bg-[#5b6466] group-hover:bg-ash"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
