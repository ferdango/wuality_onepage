/**
 * Posproceso de la exportación estática (`out/`), después de `next build`.
 *
 * Deja cada página HTML tabulada, con una etiqueta de bloque por línea e
 * indentada con tabuladores. Comprueba además que el CSS no viaja dentro del
 * HTML: tiene que ir en su hoja minificada aparte (`<link rel="stylesheet">`).
 *
 * El formato no puede ser un simple "beautify". React compara el HTML
 * exportado con lo que él mismo renderiza al hidratar, nodo a nodo, y un salto
 * de línea entre dos etiquetas es un nodo de texto que no espera: al toparse
 * con él tira la página y la vuelve a pintar entera en el cliente. Por eso:
 *
 *   1. Sólo se inserta "\n" + tabuladores en huecos entre dos etiquetas. El
 *      texto que ya había, espacios incluidos, no se toca nunca.
 *   2. Un script de una línea, el primero del <head>, retira esos nodos de
 *      formato mientras el navegador lee el documento y antes de que corra
 *      ningún otro script. Son los únicos formados sólo por saltos de línea y
 *      tabuladores; React no genera ninguno así (se comprueba abajo).
 *
 * El código fuente queda tabulado y el DOM que hidrata React es el mismo que
 * sin formatear. Se verifica en cada build: parse5 (el parser del estándar
 * HTML) lee la página original y la formateada, se quitan de la formateada los
 * nodos de formato y las dos tienen que serializar igual carácter por
 * carácter. Si algo no cuadra, el build falla.
 *
 * Los saltos se ponen alrededor de las etiquetas de bloque y se evitan entre
 * dos elementos en línea (<a>, <span>, <img>...): ahí un espacio sí se vería
 * si alguien abriera la página sin JavaScript.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parse, serialize } from "parse5";

const OUT = path.resolve(process.argv[2] ?? "out");

/** Nodos de formato: sólo saltos de línea y tabuladores. */
const FORMAT_WS = /^[\n\t]+$/;

/** Guardián (ver cabecera). Recorre lo ya leído, vigila lo que llega y se retira al acabar. */
const GUARD =
  "(function(){var d=document,e=d.documentElement,r=/^[\\n\\t]+$/;" +
  "function c(n){n.nodeType===3&&r.test(n.data)&&n.remove()}" +
  "function k(m){m.forEach(function(x){x.addedNodes.forEach(c)})}" +
  "for(var w=d.createTreeWalker(e,4),n,a=[];n=w.nextNode();)a.push(n);a.forEach(c);" +
  "var o=new MutationObserver(k);o.observe(e,{childList:!0,subtree:!0});" +
  'd.addEventListener("DOMContentLoaded",function(){k(o.takeRecords());o.disconnect()})})()';

const INLINE = new Set(
  "a abbr audio b bdi bdo br button canvas cite code data dfn em embed i iframe img input kbd label map mark math meter object output picture progress q ruby s samp select slot small span strong sub sup svg textarea time u var video wbr".split(
    " ",
  ),
);

/** Dentro de estos no se inserta nada: su contenido es texto o el espacio cuenta. */
const LITERAL = new Set(["pre", "textarea", "listing", "plaintext", "script", "style", "title", "xmp", "noscript", "noembed", "noframes", "iframe", "template"]);

const SVG_NS = "http://www.w3.org/2000/svg";
const SVG_TEXT = new Set(["text", "tspan", "textPath"]);

const isText = (n) => n.nodeName === "#text";
const isElement = (n) => typeof n.tagName === "string";
const inSvg = (n) => isElement(n) && n.namespaceURI === SVG_NS;

/** Elemento cuyo entorno admite saltos: los de bloque y los hijos de un SVG (salvo los de texto). */
function isBlockish(n) {
  if (!isElement(n)) return false;
  if (inSvg(n) && n.tagName !== "svg") return !SVG_TEXT.has(n.tagName);
  return !INLINE.has(n.tagName);
}

/** Contenedor en el que los huecos entre hijos nunca se ven (un SVG, salvo sus textos). */
const isSvgContainer = (n) => inSvg(n) && !SVG_TEXT.has(n.tagName);

const DISPLAY = /^(?:[\w-]+:)*(flex|inline-flex|grid|inline-grid|hidden|block|inline-block|inline|contents|table|flow-root|list-item)$/;
const GAPLESS = new Set(["flex", "inline-flex", "grid", "inline-grid", "hidden"]);

/**
 * Flex o grid en todos sus tamaños (clases de Tailwind): entre sus hijos un
 * hueco nunca se pinta, así que ahí también se puede partir entre elementos
 * en línea, como los enlaces del menú.
 */
function isGapless(n) {
  const cls = n.attrs?.find((a) => a.name === "class")?.value;
  if (!cls) return false;
  const displays = cls.split(/\s+/).map((c) => c.match(DISPLAY)?.[1]).filter(Boolean);
  return displays.some((d) => d !== "hidden") && displays.every((d) => GAPLESS.has(d));
}

/**
 * Puntos donde insertar formato, como { offset, depth }. Sólo en huecos entre
 * dos etiquetas contiguas en el código fuente: nunca pegados a un texto.
 */
function collectBreaks(doc) {
  const breaks = [];
  const loc = (n) => n.sourceCodeLocation;

  // `startsLine`: el elemento empieza su propia línea. Si va a media línea (en
  // línea con lo de antes) se deja entero en esa línea: partir su interior
  // daba cosas como `<button><span>…</span><svg>` con el <path> abajo.
  const visit = (parent, depth, startsLine) => {
    const kids = parent.childNodes ?? [];
    if (!kids.length) return;
    if (isElement(parent) && LITERAL.has(parent.tagName)) return;
    const pl = loc(parent);
    const isDoc = parent.nodeName === "#document";
    const canBreakInside = isDoc || startsLine;
    const svgBox = isSvgContainer(parent) || (isElement(parent) && isGapless(parent));
    const lineStarts = new Set();

    const tryBreak = (offset, childDepth, left, right) => {
      if (!canBreakInside) return false;
      const edgeOk = (edge) => isDoc || svgBox || isBlockish(parent) || isBlockish(edge);
      if (left === null) {
        if (!edgeOk(right)) return false;
      } else if (right === null) {
        if (!edgeOk(left)) return false;
      } else if (!(isDoc || svgBox || isBlockish(left) || isBlockish(right))) {
        return false;
      }
      breaks.push({ offset, depth: childDepth });
      return true;
    };

    // Apertura -> primer hijo
    const first = kids[0];
    const openEnd = isDoc ? 0 : pl?.startTag?.endOffset;
    if (!isText(first) && loc(first) && openEnd === loc(first).startOffset && !isDoc) {
      if (tryBreak(loc(first).startOffset, depth, null, first)) lineStarts.add(first);
    } else if (isDoc) {
      lineStarts.add(first);
    }

    // Entre hermanos
    for (let i = 0; i + 1 < kids.length; i++) {
      const a = kids[i];
      const b = kids[i + 1];
      if (isText(a) || isText(b) || !loc(a) || !loc(b)) continue;
      if (loc(a).endOffset !== loc(b).startOffset) continue;
      if (tryBreak(loc(b).startOffset, depth, a, b)) lineStarts.add(b);
    }

    // Último hijo -> cierre
    const last = kids[kids.length - 1];
    if (!isDoc && !isText(last) && loc(last) && pl?.endTag && loc(last).endOffset === pl.endTag.startOffset) {
      tryBreak(pl.endTag.startOffset, depth - 1, last, null);
    }

    for (const k of kids) if (isElement(k)) visit(k, depth + 1, lineStarts.has(k));
  };

  visit(doc, 0, true);
  return breaks;
}

function stripFormat(node) {
  if (!node.childNodes) return;
  node.childNodes = node.childNodes.filter((n) => !(isText(n) && FORMAT_WS.test(n.value)));
  node.childNodes.forEach(stripFormat);
  if (node.content) stripFormat(node.content);
}

function assertNoFormatLikeText(node, file) {
  for (const n of node.childNodes ?? []) {
    if (isText(n) && FORMAT_WS.test(n.value))
      throw new Error(`${file}: ya trae un nodo de texto sólo de saltos/tabuladores; el guardián lo borraría.`);
    assertNoFormatLikeText(n, file);
  }
  if (node.content) assertNoFormatLikeText(node.content, file);
}

function findHead(doc) {
  const html = doc.childNodes.find((n) => n.tagName === "html");
  return html?.childNodes.find((n) => n.tagName === "head");
}

async function formatFile(file) {
  const rel = path.relative(OUT, file);
  let html = await readFile(file, "utf8");
  if (html.includes("data-formatted")) return null; // ya procesado

  // El CSS tiene que ir aparte y minificado, nunca en un <style> dentro del HTML.
  if (/<style[\s>]/i.test(html)) throw new Error(`${rel}: hay CSS en un <style> dentro del HTML.`);
  const sheets = [...html.matchAll(/<link[^>]+rel="stylesheet"[^>]*href="([^"]+)"/g)].map((m) => m[1]);

  // 1. Guardián, justo detrás del <meta charset> para que éste siga siendo lo primero.
  const original = parse(html, { sourceCodeLocationInfo: true });
  assertNoFormatLikeText(original, rel);
  const head = findHead(original);
  const charset = head?.childNodes.find((n) => n.tagName === "meta" && n.attrs.some((a) => a.name === "charset"));
  const at = (charset ?? head)?.sourceCodeLocation?.[charset ? "endOffset" : "startTag"];
  const insertAt = typeof at === "number" ? at : at?.endOffset;
  if (typeof insertAt !== "number") throw new Error(`${rel}: no encuentro el <head>.`);
  html = html.slice(0, insertAt) + `<script data-formatted="">${GUARD}</script>` + html.slice(insertAt);

  // 2. Formato
  const doc = parse(html, { sourceCodeLocationInfo: true });
  const breaks = collectBreaks(doc).sort((a, b) => a.offset - b.offset);
  let out = "";
  let cursor = 0;
  for (const { offset, depth } of breaks) {
    out += html.slice(cursor, offset) + "\n" + "\t".repeat(Math.max(0, depth));
    cursor = offset;
  }
  out += html.slice(cursor) + "\n";

  // 3. Verificación: mismo árbol que sin formatear, quitando los nodos de formato.
  const expected = serialize(parse(html));
  const formatted = parse(out);
  stripFormat(formatted);
  if (serialize(formatted) !== expected) {
    const got = serialize(formatted);
    let i = 0;
    while (i < got.length && got[i] === expected[i]) i++;
    throw new Error(`${rel}: el formato cambia el documento cerca de …${expected.slice(Math.max(0, i - 80), i + 80)}…`);
  }

  await writeFile(file, out);
  return { rel, lines: out.split("\n").length, sheets };
}

async function htmlFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await htmlFiles(p)));
    else if (entry.name.endsWith(".html")) found.push(p);
  }
  return found;
}

const files = await htmlFiles(OUT);
let done = 0;
const sheets = new Set();
for (const file of files) {
  const r = await formatFile(file);
  if (!r) continue;
  done++;
  r.sheets.forEach((s) => sheets.add(s));
}
console.log(`HTML tabulado: ${done} de ${files.length} páginas, verificadas contra el original.`);
console.log(`CSS aparte y minificado: ${[...sheets].join(", ") || "(ninguna hoja enlazada)"}`);
