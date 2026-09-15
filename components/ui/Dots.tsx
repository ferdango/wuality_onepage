"use client";

/** Indicador del diseño: puntos grises y una píldora blanca para el activo. */
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
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`} role="tablist">
      {Array.from({ length: count }).map((_, i) => {
        const active = i === index;
        return (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={`Ir al slide ${i + 1}`}
            onClick={() => onSelect?.(i)}
            className={`h-2 rounded-full transition-all duration-500 ease-wuality ${
              active ? "w-10 bg-bone" : "w-2 bg-muted/60 hover:bg-muted"
            }`}
          />
        );
      })}
    </div>
  );
}
