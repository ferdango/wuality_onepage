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
| Títulos | El punto rojo rebota en bucle como una pelota, con achatamiento al tocar suelo (`.dotted::after`) |
| Idioma | Dropdown "Idioma y región" con las tres opciones del diseño, cierre por clic fuera y Escape |
| Menú | Overlay a pantalla completa, entrada escalonada, hover blanco/gris, cierre con Escape y bloqueo de scroll |
| Hero | Titular que entra palabra por palabra y se desvanece mientras el iPhone sube. El teléfono arranca con su base un 30% fuera de pantalla y sube entero; ya arriba, se expande a full-bleed —perdiendo marco, isla dinámica y botones— y revela "Innovamos" / "Conectamos" desde lados opuestos |
| Lo que hacemos | Lista sincronizada con la imagen (hover/clic/foco), botón circular animado con `layoutId`; en mobile, carrusel con dots y CTA |
| Nuestros proyectos | Carrusel con swipe, arrastre, teclado y dots. Avanza solo cada 5s y el detalle de abajo sigue al proyecto en curso; al hacer clic, además, lleva la vista hasta él |
| Todos los carruseles | Bucle infinito con avance automático, que se pausa al pasar el cursor, al enfocar, al tocar o si la pestaña no está visible. Arrastre con mouse vía `useDragScroll`: desactiva el snap durante el gesto, lo restaura al soltar y suprime el click posterior para que soltar sobre una tarjeta no la active |
| Caso de estudio | Muestra el proyecto elegido arriba: al hacer clic en una tarjeta se ancla aquí y el contenido cambia con una transición. Acordeón de capítulos con altura animada |
| Partners | Carrusel con autoplay que se pausa al interactuar o si la pestaña no está visible |
| Metodología | El diagrama se dibuja con el scroll: los contornos se trazan de izquierda a derecha siguiendo el ciclo y detrás entra el relleno. Tarjetas escalonadas; en mobile, carrusel |
| Reviews | Carrusel de testimonios con stack de avatares; el emoji de la tarjeta activa da un pulso al entrar |
| Clientes | Retícula de 2 columnas en móvil y 5 en desktop, sin scroll lateral. Los logos van en escala de grises y recuperan su color al pasar el cursor o al mantener pulsado |
| Two models | Las dos líneas entran desde lados opuestos con el scroll, al tamaño del Figma (220px sobre el lienzo de 1920) |
| Modelos | Las dos tarjetas se apilan al bajar: cada una queda fija un poco más abajo que la anterior y la de atrás se encoge y se oscurece |
| FAQ | Acordeón de apertura única con icono +/− y altura animada |
| Agenda una reunión | Sección de 90vh. Flujo de 2 pasos: elección de plataforma (Meet/Zoom) → "Continuar" → formulario con selector de prefijo internacional, validación y estado de confirmación |
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

**El diagrama se incrusta, no se sirve como imagen.** El export son ocho figuras
rellenas sin trazo, y un `<img>` no deja tocar sus paths. `lib/svg.ts` lo lee de
`/public` en el servidor —en build, porque la página es estática— y el
componente lo inyecta para poder animarlo. El "dibujado" usa el contorno de cada
figura como línea: `pathLength="1"` normaliza su longitud y basta con animar
`stroke-dashoffset` de 1 a 0, sin inventar ninguna geometría. El orden sale de la
primera coordenada X de cada path, así que no depende del layout y también es
correcto en la copia que está oculta al montar.

Un detalle que cuesta ver: el export trae ids fijos y el diagrama se monta dos
veces (desktop y mobile), así que sin renombrarlos la copia visible referencia
los degradados de la copia oculta y algunos tramos no llegan a pintarse. El
componente les añade un sufijo único por instancia.

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
- **Modelos en móvil**: el Figma los muestra como carrusel con dots. Aquí se
  apilan igual que en desktop, por pedido explícito; si prefieres el carrusel del
  diseño, es volver a la versión anterior del componente.
- **Tablet**: el Figma solo define 1920 y 360. El rango 768–1023 se derivó de forma
  responsive a partir de ambos.
