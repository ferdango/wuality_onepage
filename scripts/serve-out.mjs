/**
 * Sirve la exportación (out/) como la sirve GitHub Pages, para revisarla en
 * local tal cual se publica: /ruta/ responde con /ruta/index.html, /ruta sin
 * barra redirige a /ruta/ y lo que no existe devuelve 404.html.
 *
 * Uso: npm run build && npm run preview  →  http://localhost:4173
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve("out");
const PORT = Number(process.env.PORT ?? 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".mp4": "video/mp4",
};

createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url ?? "/", "http://localhost").pathname);
  let file = path.join(ROOT, url);
  if (!file.startsWith(ROOT)) return res.writeHead(403).end();

  try {
    if ((await stat(file)).isDirectory()) {
      if (!url.endsWith("/")) return res.writeHead(301, { location: `${url}/` }).end();
      file = path.join(file, "index.html");
    }
    const body = await readFile(file);
    res.writeHead(200, { "content-type": TYPES[path.extname(file)] ?? "application/octet-stream" }).end(body);
  } catch {
    const body = await readFile(path.join(ROOT, "404.html")).catch(() => "404");
    res.writeHead(404, { "content-type": TYPES[".html"] }).end(body);
  }
}).listen(PORT, () => console.log(`out/ en http://localhost:${PORT}`));
