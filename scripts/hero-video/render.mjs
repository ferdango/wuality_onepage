/**
 * Renderiza el vídeo de marca del hero cuadro a cuadro (ver README del
 * proyecto, "Vídeo del hero").
 *
 * La animación (index.html) es una función del tiempo, `render(t)`, periódica
 * en T = 8 s: cada cuadro se pinta en Chrome sin depender del reloj, así que el
 * resultado es exacto y el último cuadro empalma con el primero.
 *
 * Uso, con Chrome abierto con --remote-debugging-port=9222:
 *   node scripts/hero-video/render.mjs <carpeta de salida> [fps=30] [segundos=8] [encuadre]
 *
 * `encuadre` son los parámetros de index.html: vacío para el apaisado
 * (1920×1080) o "w=1080&h=1920&px=0.5&py=0.3&ps=560&sx=0.62&sy=1.15" para el
 * vertical de móvil.
 */
import fs from "node:fs";
import path from "node:path";

const [outDir, fps = "30", secs = "8", frame = ""] = process.argv.slice(2);
const size = Object.fromEntries(new URLSearchParams(frame));
const width = Number(size.w ?? 1920), height = Number(size.h ?? 1080);
if (!outDir) throw new Error("Falta la carpeta de salida.");
const html = path.resolve(path.dirname(new URL(import.meta.url).pathname), "index.html");

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
    pending.get(m.id)(m.result);
    pending.delete(m.id);
  }
};
await new Promise((r) => (ws.onopen = r));
const run = (expression) => send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: `file://${html}${frame ? `?${frame}` : ""}` });
await new Promise((r) => setTimeout(r, 1500));
await run("window.ready.then(() => 1)");

fs.mkdirSync(outDir, { recursive: true });
const total = Math.round(Number(fps) * Number(secs));
for (let i = 0; i < total; i++) {
  await run(`window.render(${i / Number(fps)}); new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))).then(() => 1)`);
  const { data } = await send("Page.captureScreenshot", { format: "png" });
  fs.writeFileSync(path.join(outDir, `f${String(i).padStart(4, "0")}.png`), Buffer.from(data, "base64"));
}
console.log(`${total} cuadros en ${outDir}`);
ws.close();
process.exit(0);
