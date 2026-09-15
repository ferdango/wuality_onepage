import NextImage, { type ImageProps } from "next/image";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * `next/image` antepone el basePath a sus propios assets, pero no al `src` de
 * las imágenes cuando van sin optimizar, que es como se exportan para GitHub
 * Pages. Este envoltorio lo añade a las rutas absolutas del proyecto; las
 * externas y las importadas se quedan como están.
 */
export default function Img({ src, ...props }: ImageProps) {
  const resolved = typeof src === "string" && src.startsWith("/") ? `${BASE}${src}` : src;
  return <NextImage src={resolved} {...props} />;
}
