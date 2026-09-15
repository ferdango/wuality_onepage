import type { NextConfig } from "next";

/**
 * GitHub Pages sirve el sitio bajo /wuality_onepage y es hosting estático, así
 * que no hay optimizador de imágenes detrás: la exportación va con
 * `unoptimized` y los assets se sirven tal cual (por eso están reducidos a
 * tamaño web en /public/media).
 *
 * El basePath entra por variable de entorno para que `npm run dev` siga
 * atendiendo en la raíz; solo el workflow de despliegue lo define.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
