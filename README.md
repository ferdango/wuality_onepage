# Wuality — One Page

Implementación en código de la one-page de Wuality diseñada en Figma
(`Wuality Web`, página **UI Desktop**: frame `9:2` desktop 1920 y frame `1573:153` mobile 360).

## Stack

- **Next.js 15** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — los tokens del diseño viven en `@theme` dentro de `app/globals.css`
- **Motion** (`motion/react`) para las animaciones

```bash
npm run dev    # http://localhost:3000
npm run build
npm start
```

## Estructura

```
app/
  layout.tsx        fuentes, metadata, viewport
  page.tsx          composición de secciones
  globals.css       tokens de marca + escala tipográfica fluida
components/         una sección por archivo + ui/ con primitivos
lib/content.ts      todo el copy y las rutas de assets (single source of truth)
public/media/       assets exportados del Figma (brand, ui, work, logos, people)
```

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

La línea "only one effect" usa **Chau Philomene One**, que sí está en Google Fonts
y se carga tal cual. Su métrica difiere un poco de la del archivo, así que el
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
| Idioma | Dropdown "Idioma y región" con las tres opciones del diseño, cierre por clic fuera y Escape |
| Menú | Overlay a pantalla completa, entrada escalonada, hover blanco/gris, cierre con Escape y bloqueo de scroll |
| Hero | Titular que entra palabra por palabra; el mockup de iPhone se expande a full-bleed con el scroll —perdiendo marco, isla dinámica y botones— y revela "Innovamos" / "Conectamos" desde lados opuestos |
| Lo que hacemos | Lista sincronizada con la imagen (hover/clic/foco), botón circular animado con `layoutId`; en mobile, carrusel con dots y CTA |
| Nuestros proyectos | Carrusel con swipe, arrastre, teclado y dots; cada tarjeta abre su caso en la sección de abajo |
| Todos los carruseles | Arrastre con mouse vía `useDragScroll`: desactiva el snap durante el gesto, lo restaura al soltar y suprime el click posterior para que soltar sobre una tarjeta no la active |
| Caso de estudio | Muestra el proyecto elegido arriba: al hacer clic en una tarjeta se ancla aquí y el contenido cambia con una transición. Acordeón de capítulos con altura animada |
| Partners | Carrusel con autoplay que se pausa al interactuar o si la pestaña no está visible |
| Metodología | Diagrama con tarjetas que entran escalonadas; en mobile, carrusel |
| Reviews | Carrusel de testimonios con stack de avatares |
| Clientes | Retícula 5×3 con hover que enciende el logo; en mobile, 3 filas con sangrado lateral |
| Two models | Las dos líneas entran desde lados opuestos con el scroll, al tamaño del Figma (220px sobre el lienzo de 1920) |
| Modelos | Las dos tarjetas se apilan al bajar: cada una queda fija un poco más abajo que la anterior y la de atrás se encoge y se oscurece |
| FAQ | Acordeón de apertura única con icono +/− y altura animada |
| Agenda una reunión | Flujo de 2 pasos: elección de plataforma (Meet/Zoom) → formulario con validación y estado de confirmación |
| Blog | Carrusel con tarjetas de nota y de video |
| Flotantes | El botón de WhatsApp enlaza directo al chat de `+51 966 461 384` (número en `lib/content.ts`); el globo del diseño aparece al pasar el cursor, solo donde hay hover real. Botón de cookies con banner; la decisión se guarda en `localStorage` |

Todo respeta `prefers-reduced-motion`: las animaciones de entrada y las ligadas al
scroll se desactivan y el contenido se muestra en su estado final.

## Detalles de implementación que conviene conocer

**El mockup del iPhone es CSS, no una imagen.** Está construido con las
proporciones reales del dispositivo (402 × 874 pt, radio 55, isla 125 × 36),
parametrizadas en `components/Hero.tsx` con las variables `--dev-h`, `--dev-w`,
`--bezel`, `--radius` y `--btn-w`. Escala a cualquier tamaño sin perder nitidez
y el chasis se desvanece cuando el video pasa a pantalla completa.

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

**Los controles de carrusel aparecen solo si el riel desborda.** Con el contenido
actual, algunos rieles caben enteros en desktop (los 4 proyectos llenan la fila
exacta) y unos dots que no llevan a ninguna parte serían ruido. Un
`ResizeObserver` los muestra en cuanto hay algo que desplazar, así que basta con
añadir items en `lib/content.ts` para que reaparezcan.

## Pendientes de contenido

Cosas que el Figma deja como placeholder y conviene reemplazar antes de publicar:

- **FAQ**: las tres preguntas y respuestas son *lorem ipsum* en el diseño.
- **Blog**: las imágenes de los episodios son capturas de terceros usadas como
  referencia visual. Sustituir por material propio.
- **Reviews**: en el Figma las cuatro tarjetas repiten el mismo testimonio; aquí se
  completaron con variantes coherentes. Reemplazar por los reales.
- **Chat**: el texto del modal dice "Tinbet" en el diseño; se respetó literal.
- **Casos de estudio**: el Figma trae un solo caso ("Meltwater" en desktop,
  "Starbucks LLC" en mobile) y no corresponde a ninguno de los cuatro proyectos
  del carrusel. Como cada tarjeta ahora abre su propio caso, escribí un texto de
  relleno por proyecto en `lib/content.ts`. Hay que reemplazarlos por los reales.
- **Proyectos y partners en desktop**: el Figma dibuja dots bajo filas que ya
  están completas (4 proyectos, 5 partners). Con ese contenido no hay nada que
  desplazar y los controles quedan ocultos en desktop; en mobile y tablet sí
  aparecen. Añadir un proyecto o un partner más los activa en todos los tamaños.
- **Modelos en móvil**: el Figma los muestra como carrusel con dots. Aquí se
  apilan igual que en desktop, por pedido explícito; si prefieres el carrusel del
  diseño, es volver a la versión anterior del componente.
- **Tablet**: el Figma solo define 1920 y 360. El rango 768–1023 se derivó de forma
  responsive a partir de ambos.
