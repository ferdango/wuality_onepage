/**
 * Detalle de los casos en español, por slug (ver lib/cases.ts). Alcance,
 * frases y paletas salen del Dossier Comercial 2026; las imágenes, de sus
 * capturas y de las webs publicadas (public/media/cases).
 */
import type { CaseDetail, Shot } from "./cases";

const shot = (slug: string, file: string, w: number, h: number, alt: string): Shot => ({
  src: `/media/cases/${slug}/${file}.jpg`,
  alt,
  w,
  h,
});

/** Las dos portadas del caso, compuestas con scripts/case-mockups. */
const hero = (slug: string) => ({ desktop: `/media/cases/${slug}/portada.jpg`, mobile: `/media/cases/${slug}/portada-movil.jpg` });

export const cases: Record<string, CaseDetail> = {
  "grupo-tinbet": {
    status: "Marca y web publicadas",
    intro:
      "Grupo Tinbet reúne empresas de entretenimiento, inversión y seguridad en el Perú. Le dimos una identidad común y un sitio corporativo que presenta las tres verticales con una sola voz.",
    challenge:
      "Tres negocios con públicos, ritmos y lenguajes distintos tenían que reconocerse como un solo grupo sin que ninguno perdiera su personalidad. Y el sitio tenía que hablarles a la vez a aliados, autoridades, talento y prensa.",
    approach:
      "Diseñamos un sistema antes que un logo: un símbolo de formas que se encuentran en un punto central, una familia de verdes corporativos y un color por vertical. En la web, ese código se vuelve navegación: cada vertical y cada público tiene su camino.",
    facts: [
      { value: "3", label: "verticales bajo una sola marca: entretenimiento, inversiones y seguridad" },
      { value: "5", label: "secciones del sitio: inicio, obras por impuestos, áreas de negocio, talento y noticias" },
      { value: "2026", label: "manual de marca, con sus aplicaciones corporativas" },
    ],
    scope: [
      ["Concepto", "Símbolo y logotipo", "Manual de marca", "Aplicaciones"],
      ["UX/UI", "Diseño web", "Desarrollo", "Responsive"],
    ],
    tagline: "Conectando industrias, creando valor.",
    palette: ["#062a1e", "#02b307", "#4ac809", "#95e819", "#ffb100", "#f741ee"],
    hero: hero("grupo-tinbet"),
    gallery: [
      { kind: "browser", layout: "full", shot: shot("grupo-tinbet", "obras", 1600, 1000, "La página Obras por impuestos de grupotinbet.pe") },
      { kind: "phone", layout: "half", shot: shot("grupo-tinbet", "movil", 780, 1688, "La sección Obras por impuestos en el móvil") },
      { kind: "photo", layout: "half", shot: shot("grupo-tinbet", "carpeta", 1317, 702, "Carpeta corporativa de Grupo Tinbet") },
      { kind: "photo", layout: "full", shot: shot("grupo-tinbet", "obra", 1317, 702, "Cartel de obra pública con la marca de Grupo Tinbet") },
    ],
  },

  "afiliados-tinbet": {
    status: "Landing publicada",
    intro:
      "El programa de afiliados de Tinbet necesitaba una página que explicara en segundos cuánto se gana, cómo se cobra y cómo empezar. Diseñamos y desarrollamos una landing pensada para creadores, comunidades y medios.",
    challenge:
      "Quien llega a un programa de afiliados viene a evaluar un negocio: quiere saber cuánto puede ganar, cómo le pagan y qué apoyo tendrá, sin leer un reglamento. Y al ser una marca de apuestas, todo tenía que comunicarse con responsabilidad.",
    approach:
      "Pusimos la propuesta de valor arriba —Rev Share de hasta 50% y CPA— y la explicamos con comisiones escalonadas y un indicador animado por tramo. Sumamos el panel de afiliados, el programa de influencers, las preguntas frecuentes y el aviso de juego responsable para mayores de 18.",
    facts: [
      { value: "50%", label: "de Rev Share como máximo, más un CPA de hasta S/ 600" },
      { value: "6", label: "tramos de comisión, del 20% al 50%" },
      { value: "77 KB", label: "pesa una imagen que antes pesaba 1 MB, gracias al formato AVIF" },
    ],
    scope: [["UX/UI", "Copy de conversión", "Desarrollo web", "Responsive"]],
    tagline: "Convierte tu audiencia en ingresos recurrentes.",
    hero: hero("afiliados-tinbet"),
    gallery: [
      { kind: "browser", layout: "full", shot: shot("afiliados-tinbet", "comisiones", 1600, 1000, "Curva de comisiones por tramo con el indicador del 20% del NGR") },
      { kind: "phone", layout: "half", shot: shot("afiliados-tinbet", "movil", 780, 1688, "Tabla de comisiones escalonadas en el móvil") },
      { kind: "browser", layout: "half", shot: shot("afiliados-tinbet", "panel", 1600, 1000, "El panel de afiliados: resumen del mes, tendencias y comisiones por canal") },
    ],
  },

  "peruana-en-rusia": {
    status: "Marca y web publicadas",
    intro:
      "Peruana en Rusia acompaña a estudiantes peruanos que quieren estudiar con beca en universidades rusas. Creamos su marca y un sitio que guía cada paso, de la primera duda al día del viaje.",
    challenge:
      "Postular a una beca en el extranjero mezcla ilusión y miedo: elegir universidad y ciudad, reunir documentos, firmar un contrato, tramitar el visado y organizar el viaje. La marca y la web tenían que transmitir la misma confianza que la asesoría.",
    approach:
      "El símbolo nace de las franjas de un paso de cebra: el cruce seguro hacia una nueva etapa. En la web ordenamos el contenido según las dudas reales del postulante —universidades, casos de éxito, charlas— y diseñamos un portal del estudiante con el proceso paso a paso.",
    facts: [
      { value: "9", label: "universidades asociadas, cada una con su ficha y su brochure" },
      { value: "6", label: "ciudades rusas donde estudiar" },
      { value: "5", label: "etapas guiadas en el portal: datos, documentos, contrato, visado y viaje" },
    ],
    scope: [
      ["Concepto", "Símbolo y logotipo", "Manual de marca", "Aplicaciones"],
      ["UX/UI", "Diseño y desarrollo web", "Piezas digitales"],
    ],
    tagline: "Tu futuro, sin fronteras.",
    palette: ["#127af6", "#f92335", "#19c3f4", "#f97213", "#12746d", "#f9b716"],
    hero: hero("peruana-en-rusia"),
    gallery: [
      { kind: "browser", layout: "full", shot: shot("peruana-en-rusia", "universidades", 1600, 1000, "Las universidades asociadas en peruanaenrusia.com, filtradas por ciudad") },
      { kind: "phone", layout: "half", shot: shot("peruana-en-rusia", "movil", 780, 1688, "Las universidades asociadas en el móvil") },
      { kind: "photo", layout: "half", shot: shot("peruana-en-rusia", "redes", 1317, 702, "Piezas para redes de Peruana en Rusia") },
      { kind: "photo", layout: "full", shot: shot("peruana-en-rusia", "evento", 1317, 702, "La marca en la pantalla de un evento") },
    ],
  },

  "sunqu-journeys": {
    status: "Marca creada · web en vista previa",
    intro:
      "Sunqu significa corazón en quechua. Es una agencia de viajes experienciales con anfitriones locales, y le dimos una marca y una web que proponen conocer el Perú desde la emoción.",
    challenge:
      "Las marcas de turismo suelen competir con la misma imagen: un paisaje y un precio. Sunqu quería contar otra cosa, resumida en su manifiesto: el Perú no es un destino, es una relación.",
    approach:
      "El símbolo fusiona un corazón, el pin de un GPS y un avión con trazos inspirados en la iconografía peruana; de esa geometría sale un patrón andino que viste la flota, el merchandising y las redes. En la web, los viajes se eligen por emoción y cada journey se cuenta antes de mostrar su ficha.",
    facts: [
      { value: "3", label: "emociones para elegir el viaje: la historia, el sabor y la gente" },
      { value: "8 a 10", label: "días por journey, con anfitriones locales" },
      { value: "AA", label: "nivel de accesibilidad WCAG 2.2 de la web" },
    ],
    scope: [
      ["Estrategia de marca", "Símbolo y logotipo", "Manual", "Aplicaciones"],
      ["Estrategia", "UX/UI", "Desarrollo web", "Contenidos"],
    ],
    tagline: "Viaja al corazón del Perú.",
    palette: ["#6f6a45", "#e05f0f", "#f5aa02", "#4a715b", "#88b012", "#1c1c1c"],
    hero: hero("sunqu-journeys"),
    gallery: [
      { kind: "browser", layout: "full", shot: shot("sunqu-journeys", "catalogo", 1600, 1000, "Journeys elegidos por emoción: «¿Cómo quieres sentir el Perú?»") },
      { kind: "phone", layout: "half", shot: shot("sunqu-journeys", "movil", 780, 1688, "Formas de viajar con Sunqu en el móvil") },
      { kind: "photo", layout: "half", shot: shot("sunqu-journeys", "polo", 1317, 702, "Polo con el patrón andino de Sunqu") },
    ],
  },

  "tuku-travel": {
    status: "E-commerce publicado",
    intro:
      "Tuku Travel vende tours por el Perú y el mundo. Diseñamos y desarrollamos su e-commerce en WordPress para que cada tour se descubra, se entienda y se reserve en línea.",
    challenge:
      "En turismo, la venta se decide en la ficha del tour: ahí el viajero compara, duda y, si encuentra lo que busca, reserva. Cada ficha tenía que responder lo básico sin obligar a nadie a escribir para preguntar.",
    approach:
      "Ordenamos cada tour de la emoción al detalle: galería, destacados, itinerario día a día y servicios incluidos en pestañas, con el precio por adulto, la fecha y los pasajeros siempre a la vista. El catálogo se recorre por destino o por tipo de experiencia, y una ruleta promocional activa las campañas.",
    facts: [
      { value: "3", label: "pestañas por tour: resumen, itinerario y servicios incluidos" },
      { value: "En línea", label: "reserva con fecha, pasajeros y total antes de pagar" },
      { value: "2", label: "formas de explorar el catálogo: por destino o por tipo de experiencia" },
    ],
    scope: [["UX/UI", "Diseño y desarrollo web", "E-commerce de tours"]],
    tagline: "Viaja y disfruta lo mejor del Perú y del mundo.",
    hero: hero("tuku-travel"),
    gallery: [
      { kind: "browser", layout: "full", shot: shot("tuku-travel", "web", 1600, 1000, "Ficha del tour Montaña de Colores en tukutravel.com") },
      { kind: "phone", layout: "half", shot: shot("tuku-travel", "movil", 780, 1688, "Ficha de tour con destacados y reserva en el móvil") },
      { kind: "browser", layout: "half", shot: shot("tuku-travel", "destinos", 1600, 900, "Ciudades destacadas del catálogo de Tuku Travel") },
    ],
  },

  kingbuilder: {
    status: "Marca creada · web diseñada, por lanzar",
    intro:
      "KingBuilder construye e implementa tecnología para la minería. Le dimos una identidad sobria y un sitio corporativo que presenta su oferta como un catálogo técnico.",
    challenge:
      "En construcción y minería la confianza se gana con hechos. La marca tenía que transmitir la misma solidez que sus obras, y la web tenía que ayudar a un área de operaciones o de compras a encontrar rápido lo que necesita.",
    approach:
      "Creamos una K de líneas paralelas que se lee como letra y como plano, con una paleta mineral: negro estructural, blanco arena, arena cobre y marrón monolito. En la web organizamos la oferta como los grandes fabricantes de maquinaria: líneas de solución, fichas técnicas, catálogo con filtros y una ruta clara de cotización.",
    facts: [
      { value: "6", label: "líneas de solución en el sitio" },
      { value: "4", label: "colores de marca, todos tomados del material" },
      { value: "2", label: "sistemas de medida en cada ficha técnica: métrico y EE. UU." },
    ],
    scope: [
      ["Concepto", "Logotipo", "Brand guidelines", "Papelería", "Digital"],
      ["UX/UI", "Desarrollo web", "Catálogo de soluciones", "Responsive"],
    ],
    tagline: "Sistemas inteligentes, obras indestructibles.",
    palette: ["#1c1c1c", "#ebe4d8", "#dfb17b", "#6e502e"],
    hero: hero("kingbuilder"),
    gallery: [
      { kind: "browser", layout: "full", shot: shot("kingbuilder", "catalogo", 1600, 1000, "Catálogo de soluciones con filtros por línea, aplicación y modalidad") },
      { kind: "phone", layout: "half", shot: shot("kingbuilder", "movil", 780, 1688, "Ficha técnica del camión cisterna KB-75K en el móvil") },
      { kind: "photo", layout: "half", shot: shot("kingbuilder", "tarjeta", 693, 692, "Tarjeta de presentación de KingBuilder") },
      { kind: "browser", layout: "full", shot: shot("kingbuilder", "soluciones", 1600, 1000, "Las seis líneas de solución: «Todo lo que tu operación necesita, de la obra a la red»") },
    ],
  },

  "tec-seg": {
    status: "Marca y look & feel web",
    intro:
      "TEC & SEG protege obras de construcción públicas y privadas. Diseñamos su marca y el sistema de aplicaciones con el que se presenta en la calle, en la obra y en digital.",
    challenge:
      "Una empresa de seguridad se presenta en la calle: su marca viaja en camionetas, uniformes y credenciales, y tiene que reconocerse de lejos, de día y de noche, en medio del polvo de una obra.",
    approach:
      "Un escudo con un felino vigilante resume protección, disciplina y atención permanente. El amarillo de alta visibilidad con negro garantiza contraste en cualquier entorno, y lo llevamos a la flota, los uniformes, la papelería, las credenciales y un look & feel web responsive.",
    facts: [
      { value: "4", label: "servicios: seguridad física, custodia, seguridad electrónica y consultoría" },
      { value: "5", label: "aplicaciones: flota, uniformes, papelería, credenciales y web" },
      { value: "2", label: "colores de marca: amarillo de alta visibilidad y negro" },
    ],
    scope: [
      ["Concepto", "Logotipo responsive", "Isotipo", "Tipografía", "Brand guidelines"],
      ["Papelería", "Flota y uniformes", "Look & feel web"],
    ],
    tagline: "Protegemos lo que más valoras.",
    palette: ["#fcb203", "#000000", "#ffffff"],
    hero: hero("tec-seg"),
    gallery: [
      { kind: "photo", layout: "full", contain: true, bg: "#171b24", shot: shot("tec-seg", "papeleria", 1400, 1400, "Papelería, credenciales y libreta con la marca") },
      { kind: "photo", layout: "half", shot: shot("tec-seg", "isotipo", 1400, 1400, "El isotipo: un escudo con un felino vigilante") },
      { kind: "photo", layout: "half", contain: true, bg: "#f4f0f1", shot: shot("tec-seg", "web", 580, 887, "Look & feel web en laptop y monitor") },
    ],
  },

  "iep-eusebio-arroniz": {
    status: "Diseño UX/UI en Figma",
    intro:
      "Para muchas familias, la web de un colegio es la primera visita al colegio. Diseñamos la experiencia del sitio institucional de la IEP Eusebio Arróniz, en desktop y mobile, alrededor de las preguntas que más se repiten.",
    challenge:
      "Antes de pedir una cita, las familias buscan desde el celular cómo enseña el colegio, qué niveles ofrece, cómo es la admisión y qué opinan otros padres. Si la web no responde, siguen buscando.",
    approach:
      "Ordenamos el contenido según quién llega, no según el organigrama: la admisión con un camino directo, las metodologías por nivel con sus edades, comunicados, testimonios, preguntas frecuentes y el libro de reclamaciones. Cada pantalla tiene su versión desktop y mobile.",
    facts: [
      { value: "3", label: "niveles con su propia metodología: inicial, primaria y secundaria" },
      { value: "2", label: "versiones de cada pantalla: desktop y mobile" },
      { value: "Figma", label: "prototipo navegable para validar el recorrido" },
    ],
    scope: [["Arquitectura de información", "UI desktop & mobile", "Prototipo"]],
    tagline: "Mens sana in corpore sano.",
    palette: ["#1b2b6b", "#ef3f5b", "#ffffff"],
    // El `bg` del proyecto es blanco (la placa de su logo); para portada y galería, su azul.
    stage: "#1b2b6b",
    hero: hero("iep-eusebio-arroniz"),
    gallery: [
      { kind: "browser", layout: "full", shot: shot("iep-eusebio-arroniz", "web", 1440, 900, "Metodologías de enseñanza por nivel en la web del colegio") },
      { kind: "browser", layout: "full", shot: shot("iep-eusebio-arroniz", "seccion", 1440, 600, "«Una ruta de aprendizaje»: la propuesta educativa del colegio") },
    ],
  },

  zenity: {
    status: "Prototipo de producto propio",
    intro:
      "Zenity es un concepto de producto fintech de Wuality: una app para que el dueño de un negocio vea sus finanzas en un solo lugar y las entienda con ayuda de la IA.",
    challenge:
      "Muchos dueños de pequeñas y medianas empresas tienen la información repartida en varios bancos, billeteras como Yape y Plin, pasarelas de pago y hojas de cálculo. Saber cuánto entró, cuánto salió y cuánto queda puede tomar horas.",
    approach:
      "Empezamos por las preguntas que la app debía responder en segundos y construimos el inicio alrededor de ellas. Diseñamos las conexiones a bancos, billeteras, APIs y archivos, la conciliación de movimientos repetidos y un asistente que explica el balance en lenguaje natural, en un prototipo navegable mobile first.",
    facts: [
      { value: "3", label: "preguntas que responde en segundos: cuánto entró, cuánto salió y cuánto queda" },
      { value: "4", label: "tipos de conexión: bancos, billeteras, APIs y archivos" },
      { value: "IA", label: "resúmenes y un asistente que explica el balance" },
    ],
    scope: [["Estrategia de producto", "Arquitectura de información", "UX/UI app", "Design system"]],
    palette: ["#0f1216", "#8e6cf0", "#4e8cff", "#26c27a", "#f05a3a"],
    hero: hero("zenity"),
    gallery: [
      // La portada ya junta las tres pantallas: aquí, dos de ellas en grande.
      { kind: "phone", layout: "half", shot: shot("zenity", "resumen", 720, 1559, "Resumen del balance con el asistente «Explícame este balance»") },
      { kind: "phone", layout: "half", shot: shot("zenity", "ingresos", 720, 1558, "Ingresos por cuenta, con balance, ingresos y egresos") },
    ],
  },
};
