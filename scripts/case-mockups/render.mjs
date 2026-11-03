/**
 * Fotografía las portadas de los casos (ver README del proyecto, "Portadas
 * de los casos"): para cada escena de scenes.mjs, el encuadre de desktop y el
 * de móvil, en public/media/cases/<slug>/portada.jpg y portada-movil.jpg.
 *
 * Sirve el repo por HTTP en un puerto libre (así index.html puede leer el
 * color de cada captura en un canvas) y usa el Chrome abierto con
 * --remote-debugging-port=9222.
 *
 * Uso: node scripts/case-mockups/render.mjs [slug…]   (sin slugs, todas)
 */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { frames, scenes } from "./scenes.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const slugs = process.argv.length > 2 ? process.argv.slice(2) : Object.keys(scenes);
const types = { ".html": "text/html", ".mjs": "text/javascript", ".jpg": "image/jpeg", ".png": "image/png" };

const server = http.createServer((req, res) => {
  const file = path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname));
  if (!file.startsWith(root) || !fs.existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { "Content-Type": types[path.extname(file)] ?? "application/octet-stream" });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}/scripts/case-mockups/index.html`;

const page = (await (await fetch("http://127.0.0.1:9222/json/list")).json()).find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pending = new Map();
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const i = ++id;
    pending.set(i, resolve);
    ws.send(JSON.stringify({ id: i, method, params }));
  });
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
};
await new Promise((r) => (ws.onopen = r));
await send("Page.enable");

for (const slug of slugs) {
  if (!scenes[slug]) throw new Error(`No hay escena para ${slug}`);
  for (const [name, F] of Object.entries(frames)) {
    await send("Emulation.setDeviceMetricsOverride", { width: F.w, height: F.h, deviceScaleFactor: F.dpr, mobile: false });
    await send("Page.navigate", { url: `${base}?slug=${slug}&frame=${name}` });
    // Espera a que el módulo de la página exponga `ready` y a que termine de componer.
    const wait = "new Promise((ok, ko) => { const t = Date.now(); (function poll() { if (window.ready) window.ready.then(ok, (e) => ko(String(e))); else if (Date.now() - t > 15000) ko('sin window.ready'); else setTimeout(poll, 100); })(); })";
    const { result } = await send("Runtime.evaluate", { expression: wait, awaitPromise: true, returnByValue: true });
    if (result?.exceptionDetails || result?.result?.value !== true) throw new Error(`${slug} (${name}): ${JSON.stringify(result?.exceptionDetails ?? result)}`);
    const { result: shot } = await send("Page.captureScreenshot", { format: "jpeg", quality: 84, clip: { x: 0, y: 0, width: F.w, height: F.h, scale: 1 } });
    const out = path.join(root, "public/media/cases", slug, name === "desktop" ? "portada.jpg" : "portada-movil.jpg");
    fs.writeFileSync(out, Buffer.from(shot.data, "base64"));
    console.log(path.relative(root, out));
  }
}
ws.close();
server.close();
process.exit(0);
