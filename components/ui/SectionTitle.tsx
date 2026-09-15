import Reveal from "./Reveal";

/** Título de sección con el punto rojo del diseño. */
export default function SectionTitle({
  children,
  className = "",
  align = "center",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "center" | "left";
}) {
  return (
    <Reveal>
      <h2
        className={`h-section dotted text-bone ${align === "center" ? "text-center" : "text-left"} ${className}`}
      >
        {children}
      </h2>
    </Reveal>
  );
}
