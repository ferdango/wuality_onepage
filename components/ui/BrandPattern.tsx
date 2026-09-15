import Image from "@/components/ui/Img";

export type Piece = {
  /** Nombre del archivo en /media/brand/figuras, sin extensión. */
  fig: string;
  /** Centro de la figura, en % de la caja. */
  x: number;
  y: number;
  /** Ancho de la figura, en % del ancho de la caja. */
  w: number;
  /**
   * Tope de alto, en % del alto de la caja. Hace falta en cajas anchas y bajas
   * como el footer: ahí un ancho del 26% se traduce en un alto mayor que la
   * propia sección y la figura acabaría cortada.
   */
  cap?: number;
  rotate?: number;
  opacity?: number;
};

/**
 * Siembra figuras del entregable por el fondo de una sección.
 *
 * Cada figura va entera —recortada a su propio contorno y colocada por su
 * centro—, nunca sangrando fuera de la caja. Llevan alfa recto, recuperado de
 * las láminas del entregable (que vienen compuestas sobre negro), así que se
 * componen de forma normal: con `mix-blend-screen` se veía el recuadro del
 * original, porque su negro no es exacto y la mezcla lo sumaba como un
 * rectángulo más claro que el fondo.
 *
 * La caja debe ser `relative`; el patrón no captura eventos ni se anuncia a
 * lectores de pantalla.
 */
export default function BrandPattern({
  pieces,
  className = "",
}: {
  pieces: Piece[];
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      // `size` habilita cqw/cqh, que es lo que permite acotar por las dos
      // dimensiones a la vez sin media queries.
      style={{ containerType: "size" }}
    >
      {pieces.map((p, i) => (
        <Image
          key={i}
          src={`/media/brand/figuras/${p.fig}.png`}
          alt=""
          width={420}
          height={420}
          className="absolute max-w-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.cap ? `min(${p.w}cqw, ${p.cap}cqh)` : `${p.w}cqw`,
            height: "auto",
            opacity: p.opacity ?? 0.55,
            translate: "-50% -50%",
            rotate: p.rotate ? `${p.rotate}deg` : undefined,
          }}
        />
      ))}
    </div>
  );
}
