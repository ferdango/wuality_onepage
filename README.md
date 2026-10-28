# Wuality — One Page

Implementación en código de la one-page de Wuality diseñada en Figma
(`Wuality Web`, página **UI Desktop**: frame `9:2` desktop 1920 y frame `1573:153` mobile 360).

## Stack

- **Next.js 15** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — los tokens del diseño viven en `@theme` dentro de `app/globals.css`
- **Motion** (`motion/react`) para las animaciones

```bash
npm run dev      # http://localhost:3000
npm run build    # exporta el sitio estático a ./out, con el HTML tabulado
npm run preview  # sirve ./out como GitHub Pages: http://localhost:4173
```

## Publicación

El sitio está en <https://ferdango.github.io/wuality_onepage/>. Cada push a
`main` dispara `.github/workflows/deploy.yml`, que exporta y publica en GitHub
Pages; no hay que hacer nada más.

Pages es hosting estático, y eso condiciona dos cosas:

- **El sitio no cuelga de la raíz del dominio.** El basePath entra por
  `NEXT_PUBLIC_BASE_PATH`, que solo define el workflow, así que `npm run dev`
  sigue atendiendo en `/`. Las imágenes pasan todas por `components/ui/Img.tsx`,
  un `<img>` propio que antepone el basePath al `src`. Sustituye a `next/image`,
  que sin optimizador no aportaba nada y escribía su CSS en línea en cada
  etiqueta — si añades una imagen, usa ese componente.
- **Los archivos de `public/media` se sirven tal cual**, sin redimensionar. Están
  guardados ya a tamaño web; si incorporas un asset nuevo, redúcelo antes.

### HTML tabulado y CSS aparte

`npm run build` termina con `scripts/format-html.mjs`, que deja cada página de
`out/` tabulada (una etiqueta de bloque por línea, indentada con tabuladores).
El CSS no va dentro del HTML: Tailwind lo compila a una sola hoja minificada
que la página enlaza con `<link rel="stylesheet">`, y el script hace fallar el
build si aparece un `<style>`. Los `style="…"` que quedan en las etiquetas son
valores que calcula el JavaScript (animaciones, progreso del scroll, posición de
las figuras), no hojas de estilo.

El formato no es un simple *beautify*: React compara el HTML con lo que
renderiza al hidratar, y un salto de línea de más entre dos etiquetas le hace
repintar la página entera en el cliente. Por eso el script sólo mete saltos
entre etiquetas y añade al `<head>` una línea que los retira mientras el
navegador lee la página. En cada build comprueba con `parse5` que el documento
resultante es idéntico al original sin formato.

## Idiomas (español e inglés)

- **Rutas:** el español vive en la raíz (`/`, `/proyectos/…`, `/blog/…`) y el
  inglés bajo `/en` (`/en/`, `/en/projects/…`, `/en/blog/…`). Las páginas de
  ambos idiomas usan los mismos componentes (`components/pages/`), que reciben
  el idioma.
- **Textos:** `lib/content.ts` es el diccionario español y define la forma;
  `lib/content.en.ts` es el inglés y TypeScript obliga a que tenga los mismos
  campos. Imágenes, colores y enlaces se heredan del español. Los textos de
  interfaz (botones, etiquetas, avisos) están en `ui`. Los artículos del blog
  van aparte, en `lib/blog.ts` y `lib/blog.en.ts` (ver más abajo).
- **Componentes:** los de cliente leen el idioma con `useContent()`
  (`components/LangProvider.tsx`); los de servidor reciben `lang`.
- **Selector:** lleva a la misma página en el otro idioma (y a la misma
  sección, si hay ancla). Para añadir un texto nuevo, ponlo en los dos
  diccionarios.
- **SEO:** cada idioma tiene su canonical, sus `hreflang` (con `x-default` al
  español), su `og:locale` y sus datos estructurados; el sitemap lista las dos
  versiones de cada página.

## SEO

Todo sale de `lib/seo.ts`:

- **URL pública:** `site.url` (por defecto GitHub Pages). Para publicar en otro
  dominio, por ejemplo wuality.agency, basta con definir `NEXT_PUBLIC_SITE_URL`
  en el build: canonicals, `og:url`, sitemap y datos estructurados se rehacen
  solos.
- **Metadatos por página** con `pageMeta()`: título (plantilla `%s | Wuality`),
  descripción, canonical, Open Graph y Twitter. Las imágenes para compartir
  (1200×630) están en `public/og/`.
- **Datos estructurados** (JSON-LD): organización, sitio, cartera y preguntas
  frecuentes en la home; ficha del caso y migas en cada proyecto; artículo y
  migas en cada post.
- `sitemap.xml`, `robots.txt` y `manifest.webmanifest` se generan en el build
  (`app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`). En GitHub Pages el
  sitio cuelga de `/wuality_onepage` y los buscadores sólo leen el robots.txt de
  la raíz del dominio, así que el sitemap hay que darlo de alta a mano en Search
  Console. Para verificar la propiedad, define
  `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` con el código que da Search Console.

## Estructura

```
app/
  layout.tsx        fuentes, metadata, viewport
  page.tsx          composición de secciones
  globals.css       tokens de marca + escala tipográfica fluida
components/         una sección por archivo + ui/ con primitivos
lib/content.ts      todo el copy y las rutas de assets (single source of truth)
public/media/       assets exportados del Figma (brand, ui, work, logos, people)
scripts/            posproceso del build (HTML tabulado) y servidor de ./out
lib/seo.ts          URL pública, metadatos por página y datos estructurados
```

"Últimos posts" (`components/SocialPosts.tsx`) muestra las publicaciones de
TikTok e Instagram que se listen en `social.posts` de `lib/content.ts`: basta
con pegar el enlace de cada post. Mientras la lista esté vacía, la sección
presenta las dos cuentas con su botón de seguir.

## Sistema de diseño

Todo sale del Figma, no hay valores inventados:

| Token | Valor | Uso |
|---|---|---|
| `--color-ink` | `#05080A` | fondo de página |
| `--color-surface` | `#060B0D` | fondo de tarjetas y footer |
| `--color-card` | `#1B1E1E` | tiles (logo del footer) |
| `--color-red` | `#FF1A30` | marca, punto de los títulos, barra de progreso |
| `--color-blue` | `#007AFC` | acentos, botones, "Partners Model" |
| `--color-yellow` | `#FBBD1D` | servicio activo, nombre en reviews |
| `--color-bone` | `#F4F4F4` | texto principal |
| `--color-ash` | `#C6CACA` | texto secundario |
| `--color-muted` | `#7C8282` | texto desactivado, bordes |

### Escala fluida

El diseño está hecho a 1920 px. En vez de tres juegos de medidas, cada tamaño se
expresa como `clamp(mobile, Xvw, desktop)` donde `Xvw = valor_desktop / 1920`.
Así el layout escala de forma continua entre breakpoints y coincide exactamente
con el Figma a 1920 y a 360.

Breakpoints reales: **< 768** mobile · **768–1023** tablet · **≥ 1024** desktop.

### Tipografía

El diseño usa **Charlie Display** (licencia Atlassian, sin webfont pública). La web
carga **Figtree** vía `next/font`, que es la sustituta de proporciones más cercanas
y garantiza el mismo render en todos los equipos.

La línea "only one effect" usa **Chau Philomene One**, la misma del Figma.

Las dos van en el repo (`app/fonts/`, subconjunto latino, con sus licencias OFL) y
se cargan con `next/font/local`. No se piden a Google Fonts al compilar: Google
empezó a servir Figtree con URLs que Turbopack no resuelve y el build fallaba.

La métrica de Chau Philomene One difiere un poco de la del archivo, así que el
tamaño del claim se acota además al ancho disponible (`--claim` en `Models.tsx`):
en desktop da los 220px del Figma y en móvil llena el ancho sin recortarse.

Para usar la original: deja los `.woff2` en `public/fonts/`, descomenta el bloque
`@font-face` al final de `app/globals.css` y antepón `"Charlie Display"` en la
`font-family` de `body`. No se referencia la fuente instalada del sistema a
propósito: en algunas máquinas la familia resuelve a su variante oblicua.

## Animaciones y funcionalidades

| Sección | Comportamiento |
|---|---|
| Header | Barra de progreso de scroll (roja), fondo con blur al bajar, scroll-spy que subraya la sección visible |
| Títulos | El punto rojo rebota en bucle como una pelota, con achatamiento al tocar suelo (`.dotted::after`) |
| Idioma | Dropdown "Idioma y región" con las tres opciones del diseño, cierre por clic fuera y Escape |
| Menú | Overlay a pantalla completa, entrada escalonada, hover blanco/gris, cierre con Escape y bloqueo de scroll |
| Hero | Titular que entra palabra por palabra y se desvanece mientras el iPhone sube. El teléfono arranca con su base un 30% fuera de pantalla y sube entero; ya arriba, se expande a full-bleed —perdiendo marco, isla dinámica y botones— y revela "Innovamos" / "Conectamos" desde lados opuestos |
| Lo que hacemos | Lista sincronizada con la imagen (hover/clic/foco), botón circular animado con `layoutId`; en mobile, carrusel con dots y CTA |
| Nuestros proyectos | Carrusel con swipe, arrastre, teclado y dots. Avanza solo cada 5s y el detalle de abajo sigue al proyecto en curso; al hacer clic, además, lleva la vista hasta él |
| Todos los carruseles | Bucle infinito con avance automático, que se pausa al pasar el cursor, al enfocar, al tocar o si la pestaña no está visible. Arrastre con mouse vía `useDragScroll`: desactiva el snap durante el gesto, lo restaura al soltar y suprime el click posterior para que soltar sobre una tarjeta no la active |
| Caso de estudio | Muestra el proyecto elegido arriba: al hacer clic en una tarjeta se ancla aquí y el contenido cambia con una transición. Acordeón de capítulos con altura animada |
| Partners | Slider en bucle que avanza solo, de uno en uno (`components/ui/LoopSlider.tsx`, con `transform`: igual en todos los navegadores). Se pausa con el cursor, con el foco, con la pestaña oculta y con su botón de pausa; con "reducir movimiento" no avanza solo |
| Metodología | Diagrama con tarjetas que entran escalonadas; en mobile, carrusel |
| Reviews | Riel de testimonios de quienes dirigen las marcas de la cartera: ficha de la marca (logo sobre su color) y cita en amarillo. Sólo se publican los aprobados (ver abajo) |
| Clientes | Retícula de 2 columnas en móvil y 5 en desktop, sin scroll lateral, con las marcas de la cartera primero. Los logos van en escala de grises y recuperan su color al pasar el cursor o al mantener pulsado |
| Two models | Las dos líneas entran desde lados opuestos con el scroll, al tamaño del Figma (220px sobre el lienzo de 1920) |
| Modelos | Las dos tarjetas se apilan al bajar: cada una queda fija un poco más abajo que la anterior y la de atrás se encoge y se oscurece |
| FAQ | Acordeón de apertura única con icono +/− y altura animada |
| Agenda una reunión | Sección de 90vh. Flujo de 2 pasos: elección de plataforma (Meet/Zoom) → "Continuar" → formulario con selector de prefijo internacional, validación y estado de confirmación |
| Blog | Carrusel con un artículo por caso de la cartera; admite también tarjetas de video |
| Flotantes | El botón de WhatsApp enlaza directo al chat de `+51 966 461 384` (número en `lib/content.ts`); el globo del diseño aparece al pasar el cursor, solo donde hay hover real. Botón de cookies con banner mientras no hay decisión; después se oculta y "Cookies" en el pie reabre el aviso. La decisión se guarda en `localStorage` |

Todo respeta `prefers-reduced-motion`: las animaciones de entrada y las ligadas al
scroll se desactivan y el contenido se muestra en su estado final.

Contraste y áreas táctiles (WCAG 2.2 AA): el azul de marca (`--color-blue`) da
4,3:1 sobre la tinta, así que el texto azul usa `--color-sky` (`#3d9bff`, 6,1:1)
y el de marca queda para fondos y bordes. La tarjeta "Partners Model" va en
`#0066d6` para que el texto blanco llegue a 5,4:1. Los puntos de los carruseles
se ven de 8px pero responden en 24px, y los inactivos van en `#5b6466` (3,3:1).

## Blog

Hay un artículo por cada caso de la cartera, firmado por "Equipo Wuality". Se
muestran del más reciente al más antiguo según su fecha (`publishedAt`).

- **Textos:** título, entradilla y categoría en `lib/blog.ts` (español) y
  `lib/blog.en.ts` (inglés, indexado por el mismo slug); el cuerpo, en
  `lib/articles.es.ts` y `lib/articles.en.ts`. El cuerpo va aparte porque el
  diccionario viaja al navegador en todas las páginas y sólo la página del
  artículo (de servidor) lo necesita. Si a un post le falta la traducción o el
  cuerpo, el build falla. Sólo cuentan lo que es público de cada caso: nada de
  cifras internas ni de contenido que en el propio proyecto aún es de ejemplo.
- **Imágenes:** `public/media/blog/<slug>.jpg` (se ve a 16:11 en la tarjeta y a
  768:420 en el artículo, así que lo importante va al centro) y su recorte de
  1200×630 para redes en `public/og/<slug>.jpg`.
- **Enlaces:** el campo `project` une el artículo con su caso: el artículo
  termina con "Ver el caso de…" y sus datos estructurados apuntan al caso.
- **Nuevo artículo:** añade el post y su cuerpo en los dos idiomas, su imagen y
  su recorte para redes. La fecha (`publishedAt`, día/mes/año) genera la de la
  tarjeta en cada idioma.

## Detalles de implementación que conviene conocer

**El mockup del iPhone es CSS, no una imagen.** Está construido con las
proporciones reales del dispositivo (402 × 874 pt, radio 55, isla 125 × 36),
parametrizadas en `components/Hero.tsx` con las variables `--dev-h`, `--dev-w`,
`--bezel`, `--radius` y `--btn-w`. Escala a cualquier tamaño sin perder nitidez
y el chasis se desvanece cuando el video pasa a pantalla completa.

Su altura lleva un tope del 82% del viewport (`min(clamp(...), 82svh)`): el
ancho por sí solo pediría un teléfono que no cabe entero en pantallas bajas.
Y el titular se desvanece durante la subida, no después, porque a este tamaño el
teléfono llega a ocupar el sitio donde estaba.

**Los valores ligados al scroll viajan como variables CSS.** Motion acelera por
hardware los valores de `useScroll` aplicados a propiedades acelerables
(`opacity`, transforms) atándolos a un `ViewTimeline` nativo. Su rango se deriva
del `offset`: `["start start", "end end"]` se mapea a `contain`, que queda
degenerado cuando el objetivo es más alto que el viewport —como el hero, de
320svh— y el progreso se congela. Por eso Hero y Models publican esos valores
como custom properties en el contenedor y los hijos las consumen con CSS plano.
Las propiedades no acelerables (ancho, alto, padding, radio, `top`) sí pueden ir
enlazadas directamente.

**La selección de proyecto vive en un contexto.** "Nuestros proyectos" y el
detalle son secciones hermanas, así que `ProjectSelection.tsx` las coordina. El
desplazamiento hasta el detalle se lanza tras dos `requestAnimationFrame`: el
clic enfoca la tarjeta y el navegador desplaza el riel horizontal para hacerla
visible, y ese movimiento cancela el nuestro si salen a la vez.

**El bucle del carrusel es por repetición, no por reordenado.** Los slides se
renderizan tres veces y el riel arranca en la copia central. Cuando el scroll se
detiene fuera de ella, se salta un set entero de golpe; como el salto equivale
exactamente al ancho de un set, lo que hay bajo el cursor no cambia y el corte
es invisible. El salto se hace al detenerse, no durante el scroll, para no
cancelar un desplazamiento suave en curso. Los puntos usan el índice módulo el
número real de slides.

**El carrusel marca su slide activo.** El riel pone `data-active` en el slide en
curso, así que el contenido puede reaccionar solo con CSS —el pulso del emoji en
las reseñas es `.pop-on-active`— sin que el carrusel sepa nada de lo que lleva
dentro. Para lo que necesita lógica está `onActiveChange`: es lo que mantiene el
detalle de proyecto sincronizado con el carrusel.

**Seleccionar un proyecto y desplazarse hasta él son dos cosas.** `select` acepta
`{ scroll: false }` justamente para eso: el clic lleva la vista al detalle, pero
el avance automático cada 5s solo cambia el contenido, sin arrastrar la página
mientras el usuario está leyendo otra sección.

**El centrado del iPhone va en el estilo en línea, no en clases.** Tailwind v4
implementa `-translate-x-1/2` con la propiedad `translate`, que el `translate`
en línea de la subida pisaría por completo, dejando el teléfono descentrado.

**Las banderas del prefijo son emoji, no imágenes.** Las dibuja la fuente del
sistema, así que no hay un set de banderas que mantener ni peticiones extra.
En Windows, que no trae glifos de bandera, se ve el código de dos letras en su
lugar. El control es un `select` nativo —en móvil abre el selector del sistema—
con el texto en transparente: el estado cerrado lo pinta una etiqueta propia que
cabe en el ancho del campo, y las opciones sí llevan color.

## Pendientes de contenido

Cosas que el Figma deja como placeholder y conviene reemplazar antes de publicar:

- **Testimonios**: hay un borrador por marca de la cartera en `lib/content.ts`
  (`reviews`), redactado por Wuality a partir de cada proyecto. Antes de
  publicarlo, quien firma tiene que aprobar el texto: entonces se pone su nombre
  y `approved: true`. En producción sólo salen los aprobados (sin ninguno, la
  sección y "Reseñas" en el menú no se publican); en `npm run dev` se ven todos,
  marcados como borrador.
- **Privacidad**: el enlace "Privacidad" del pie y la casilla del formulario de
  reunión remiten a una política de privacidad que aún no existe.
- **Modelos en móvil**: el Figma los muestra como carrusel con dots. Aquí se
  apilan igual que en desktop, por pedido explícito; si prefieres el carrusel del
  diseño, es volver a la versión anterior del componente.
- **Tablet**: el Figma solo define 1920 y 360. El rango 768–1023 se derivó de forma
  responsive a partir de ambos.
