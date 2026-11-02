/**
 * Rótulo pequeño que abre las secciones corporativas ("Qué hacemos", "The
 * Wuality Way"...), precedido por The Wuality Point: el punto rojo del símbolo,
 * que en el Brand Manifesto 2026 es donde todo empieza.
 */
export default function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: React.ReactNode;
  /**
   * "dark": gris grafito sobre el blanco hielo. "ink": tinta, para fondos de
   * color (sobre el celeste el grafito no llega a 4,5:1). "light": sobre oscuro.
   */
  tone?: "dark" | "ink" | "light";
  className?: string;
}) {
  return (
    <p
      className={`flex items-center gap-3 text-[0.8125rem] font-semibold uppercase tracking-[0.16em] ${
        { dark: "text-graphite", ink: "text-ink", light: "text-ash" }[tone]
      } ${className}`}
    >
      <span className="size-2.5 shrink-0 rounded-full bg-red" aria-hidden />
      {children}
    </p>
  );
}
