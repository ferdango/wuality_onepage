import { preload } from "react-dom";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Props = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "width" | "height"> & {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** Cubre su contenedor, que tiene que ser `relative` (el `fill` de next/image). */
  fill?: boolean;
  /** Imagen de la primera pantalla: se precarga y no espera a la carga diferida. */
  priority?: boolean;
  /** Se acepta para no tocar las llamadas: sin optimizador no hay `srcset` al que aplicarlo. */
  sizes?: string;
};

/**
 * Imagen del sitio.
 *
 * Sustituye a next/image. En una exportación estática, sin optimizador detrás,
 * next/image ya servía el archivo tal cual, pero escribía su CSS en línea en
 * cada etiqueta (`position:absolute;height:100%;…;color:transparent`). Aquí ese
 * CSS sale de clases y vive en la hoja de estilos: `fill` son las utilidades
 * `absolute inset-0 size-full`, y el `color: transparent`, que oculta el texto
 * alternativo mientras la imagen carga, es una regla de globals.css.
 *
 * También antepone el basePath a las rutas absolutas del proyecto, porque
 * GitHub Pages sirve el sitio bajo /wuality_onepage. Las externas se quedan
 * como están.
 */
export default function Img({
  src,
  alt,
  fill,
  priority,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- se descarta a propósito (ver el tipo).
  sizes,
  className = "",
  loading,
  decoding = "async",
  ...props
}: Props) {
  const resolved = src.startsWith("/") ? `${BASE}${src}` : src;

  // Lo mismo que hacía next/image con `priority`: <link rel="preload"> en el <head>.
  if (priority) preload(resolved, { as: "image", fetchPriority: "high" });

  return (
    // eslint-disable-next-line @next/next/no-img-element -- next/image no aporta nada sin optimizador (ver arriba).
    <img
      src={resolved}
      alt={alt}
      className={fill ? `absolute inset-0 size-full ${className}` : className}
      loading={priority ? undefined : (loading ?? "lazy")}
      fetchPriority={priority ? "high" : undefined}
      decoding={decoding}
      {...props}
    />
  );
}
