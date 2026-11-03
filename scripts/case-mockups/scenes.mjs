/**
 * Escenas de las portadas de los casos (ver index.html y render.mjs).
 *
 * Cada escena pone la web del proyecto en su navegador y su versión móvil en
 * un teléfono, sobre el color de la marca. En las marcas cuyo branding hicimos,
 * alrededor van sus figuras recurrentes, sacadas de su manual (brand/<slug>/).
 *
 * Medidas en px del encuadre: desktop 1600×750 y móvil 400×500. Una figura
 * con `color` usa su PNG como máscara y se pinta de ese color (o degradado);
 * sin `color`, se ve tal cual. `front` la pone delante de los dispositivos.
 */

export const frames = {
  desktop: { w: 1600, h: 750, dpr: 1.5 },
  mobile: { w: 400, h: 500, dpr: 2.25 },
};

/** Posición de los dispositivos, salvo que la escena diga otra cosa. */
export const placement = {
  desktop: { browser: { x: 235, y: 62, w: 940 }, phones: [{ x: 1062, y: 132, w: 280 }] },
  mobile: { phones: [{ x: 82, y: 58, w: 236 }] },
};

const gold = "linear-gradient(160deg, #e2bd7c 0%, #b88a4c 45%, #7c5a2b 100%)";

export const scenes = {
  "grupo-tinbet": {
    stage: "#062a1e",
    glow: "rgba(2, 179, 7, 0.28)",
    web: "src/grupo-tinbet/web.jpg",
    phones: ["src/grupo-tinbet/movil.jpg"],
    // Las formas del manual: la franja que cruza, el triángulo blanco y el verde chico.
    shapes: {
      desktop: [
        { src: "brand/grupo-tinbet/franja.png", color: "#2f7d23", x: 800, y: -70, w: 1080, rot: -4 },
        { src: "brand/grupo-tinbet/triangulo.png", color: "#f4f6f4", x: 40, y: -190, w: 470, rot: 8 },
        { src: "brand/grupo-tinbet/triangulo-chico.png", color: "#02b307", x: 96, y: 520, w: 210, rot: -14, front: true },
      ],
      mobile: [
        { src: "brand/grupo-tinbet/franja.png", color: "#2f7d23", x: -40, y: 190, w: 640 },
        { src: "brand/grupo-tinbet/triangulo.png", color: "#f4f6f4", x: -96, y: -64, w: 220, rot: 8 },
        { src: "brand/grupo-tinbet/triangulo-chico.png", color: "#02b307", x: 286, y: 318, w: 120, rot: -14, front: true },
      ],
    },
  },

  "afiliados-tinbet": {
    stage: "#151716",
    glow: "rgba(74, 200, 9, 0.22)",
    web: "src/afiliados-tinbet/web.jpg",
    url: "afiliadostinbet.pe",
    phones: ["src/afiliados-tinbet/movil.jpg"],
  },

  "peruana-en-rusia": {
    stage: "#007afc",
    glow: "rgba(255, 255, 255, 0.16)",
    web: "src/peruana-en-rusia/web.jpg",
    url: "peruanaenrusia.com",
    phones: ["src/peruana-en-rusia/movil.jpg"],
    // Las cintas en degradé y las estrellas del manual.
    shapes: {
      desktop: [
        { src: "brand/peruana-en-rusia/cinta-3.png", x: 1170, y: 6, w: 430, rot: -8 },
        { src: "brand/peruana-en-rusia/estrella-9.png", x: 150, y: 96, w: 56 },
        { src: "brand/peruana-en-rusia/estrella-2.png", x: 1010, y: 22, w: 44 },
        { src: "brand/peruana-en-rusia/cinta-2.png", x: 62, y: 448, w: 340, rot: -6, front: true },
        { src: "brand/peruana-en-rusia/estrella-7.png", x: 1398, y: 520, w: 78, front: true },
        { src: "brand/peruana-en-rusia/estrella-11.png", x: 1440, y: 410, w: 34, front: true },
      ],
      mobile: [
        { src: "brand/peruana-en-rusia/cinta-3.png", x: 214, y: -6, w: 230, rot: -8 },
        { src: "brand/peruana-en-rusia/estrella-9.png", x: 34, y: 64, w: 34 },
        { src: "brand/peruana-en-rusia/cinta-2.png", x: -34, y: 318, w: 210, rot: -6, front: true },
        { src: "brand/peruana-en-rusia/estrella-7.png", x: 318, y: 300, w: 50, front: true },
      ],
    },
  },

  "sunqu-journeys": {
    stage: "#6f6a45",
    glow: "rgba(245, 170, 2, 0.2)",
    web: "src/sunqu-journeys/web.jpg",
    phones: ["src/sunqu-journeys/movil.jpg"],
    // Los diamantes y los patrones del manual.
    shapes: {
      desktop: [
        { src: "brand/sunqu-journeys/patron-flower.png", x: -150, y: 380, w: 520 },
        { src: "brand/sunqu-journeys/patron-steps.png", x: 1270, y: -170, w: 470 },
        { src: "brand/sunqu-journeys/diamante-lime.png", x: 1030, y: 14, w: 64 },
        { src: "brand/sunqu-journeys/diamante-yellow.png", x: 150, y: 104, w: 84, front: true },
        { src: "brand/sunqu-journeys/diamante-orange.png", x: 1352, y: 500, w: 116, front: true },
      ],
      mobile: [
        { src: "brand/sunqu-journeys/patron-flower.png", x: -120, y: 300, w: 290 },
        { src: "brand/sunqu-journeys/patron-steps.png", x: 250, y: -90, w: 240 },
        { src: "brand/sunqu-journeys/diamante-yellow.png", x: 30, y: 44, w: 48, front: true },
        { src: "brand/sunqu-journeys/diamante-orange.png", x: 306, y: 318, w: 72, front: true },
      ],
    },
  },

  "tuku-travel": {
    stage: "#c62f5c",
    glow: "rgba(255, 255, 255, 0.16)",
    web: "src/tuku-travel/web.jpg",
    url: "tukutravel.com",
    phones: ["src/tuku-travel/movil.jpg"],
  },

  kingbuilder: {
    stage: "#1c1c1c",
    glow: "rgba(223, 177, 123, 0.14)",
    web: "src/kingbuilder/web.jpg",
    phones: ["src/kingbuilder/movil.jpg"],
    // La K del isotipo, en grande y tenue, y las líneas de construcción del manual.
    shapes: {
      desktop: [{ src: "brand/kingbuilder/k.png", color: gold, x: 1150, y: -90, w: 640, opacity: 0.2 }],
      mobile: [{ src: "brand/kingbuilder/k.png", color: gold, x: -150, y: -130, w: 380, opacity: 0.2 }],
    },
    guides: {
      color: "rgba(223, 177, 123, 0.28)",
      desktop: { xs: [235, 1342], ys: [62, 711] },
      mobile: { xs: [82, 318], ys: [58] },
    },
  },

  "tec-seg": {
    stage: "#fcb203",
    glow: "rgba(255, 255, 255, 0.22)",
    // Sin web publicada: la marca en la calle, enmarcada, y el escudo en grande.
    photo: "src/tec-seg/foto.jpg",
    phones: [],
    layout: {
      desktop: { photo: { x: 200, y: 70, w: 820 } },
      mobile: { photo: { x: 24, y: 34, w: 352 } },
    },
    shapes: {
      desktop: [{ src: "brand/tec-seg/escudo.png", x: 1060, y: 150, w: 600, rot: 8 }],
      mobile: [{ src: "brand/tec-seg/escudo.png", x: 190, y: 250, w: 300, rot: 8, front: true }],
    },
  },

  "iep-eusebio-arroniz": {
    stage: "#1b2b6b",
    glow: "rgba(239, 63, 91, 0.24)",
    web: "src/iep-eusebio-arroniz/web.jpg",
    // La pantalla del prototipo ya trae su barra de estado.
    phones: ["../../public/media/cases/iep-eusebio-arroniz/movil.jpg"],
    bar: false,
  },

  zenity: {
    stage: "#0f1216",
    glow: "rgba(142, 108, 240, 0.3)",
    // App: tres pantallas en desktop (el inicio al frente) y el inicio en móvil.
    phones: ["src/zenity/inicio.jpg", "../../public/media/cases/zenity/resumen.jpg", "../../public/media/cases/zenity/ingresos.jpg"],
    bar: false,
    layout: {
      desktop: {
        phones: [
          { x: 652, y: 58, w: 296 },
          { x: 380, y: 128, w: 262, z: -1 },
          { x: 958, y: 128, w: 262, z: -1 },
        ],
      },
    },
  },
};
