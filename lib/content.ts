/**
 * Contenido de la one-page en español: es el diccionario que define la forma
 * de todos los textos. `content.en.ts` tiene la versión en inglés con la misma
 * forma (el tipo lo exige) y `lib/i18n.ts` elige uno u otro según la ruta.
 *
 * La base es el Figma "Wuality Web" (página "UI Desktop", frames 9:2 desktop y
 * 1573:153 mobile); servicios, modelos y casos salen del Dossier Comercial 2026.
 */
import { posts } from "./blog";

export type NavItem = { label: string; short: string; href: string };

export const nav: NavItem[] = [
  { label: "Sobre Wuality", short: "Nosotros", href: "#edu" },
  { label: "Proyectos", short: "Proyectos", href: "#work" },
  { label: "Servicios", short: "Servicios", href: "#services" },
  { label: "Reseñas", short: "Reseñas", href: "#reviews" },
  { label: "Blog", short: "Blog", href: "#blog" },
];

/** Idiomas del selector. `lang` es el de la ruta (ver lib/i18n.ts). */
export const languages: { lang: "es" | "en"; code: string; name: string; region: string; flag: string }[] = [
  { lang: "es", code: "ES", name: "Español - América Latina", region: "Perú", flag: "/media/ui/flag-es.png" },
  { lang: "en", code: "EN", name: "English", region: "USA", flag: "/media/ui/flag-us.svg" },
];

export const hero = {
  headline: "Somos Wuality, tu Partner en Transformación Digital",
  words: ["Innovamos", "Conectamos"],
};

/** Nombres de servicio en inglés también en español, como en el dossier; el detalle va traducido. */
export const services = [
  {
    title: "Brand Identity",
    items: "Cultura / Comunicación visual / Identidad / Propuesta de valor",
    image: "/media/work/services-brand.jpg",
    alt: "Identidades creadas por Wuality: símbolo de Grupo Tinbet, polo de Sunqu Journeys, emblema de KingBuilder, escudo y camioneta de TEC & SEG y marca de Peruana en Rusia",
  },
  {
    title: "Create Digital Products",
    items: "UX/UI / Product management / Front-end / Back-end / Apps",
    image: "/media/work/services-products.jpg",
    alt: "Webs móviles diseñadas por Wuality para Tuku Travel, Peruana en Rusia, Grupo Tinbet, Sunqu Journeys y KingBuilder",
  },
  {
    title: "Strategy & AI-Driven Insights",
    items: "Accesibilidad / Customer journey / Research / Tendencias",
    image: "/media/work/services-strategy.jpg",
    alt: "Pantallas de Zenity, el prototipo fintech de Wuality: balance consolidado, ingresos y egresos por cuenta y un asistente con IA que explica el balance",
  },
  {
    title: "Paid Media & SEO",
    items: "SEM / SEO / Paid social / Display / Video / Native",
    image: "/media/work/services-paid.jpg",
    alt: "Campañas de Wuality: panel publicitario y evento de Peruana en Rusia, evento de Grupo Tinbet y posts para redes de Grupo Tinbet, Sunqu Journeys y Peruana en Rusia",
  },
];

/**
 * Cartera: los nueve casos del Dossier Comercial 2026 (casos 01 a 09), en su
 * orden y con sus textos: titular, descripción, sector, alcance y web salen
 * tal cual del dossier. Cada uno alimenta su tarjeta en "Nuestros proyectos"
 * (`headline` y `accent` son la tarjeta de color que se revela sobre la foto)
 * y su página de caso.
 *
 * Imágenes: capturas de las webs en vivo (Grupo Tinbet, Sunqu, Tuku), del
 * Figma de Eusebio Arróniz o del propio dossier. El logotipo es la placa de
 * color de la página "Clientes" del dossier, así que `bg` es exactamente el
 * color de esa placa.
 */
export const projects = [
  {
    slug: "grupo-tinbet",
    headline: "Un sitio corporativo a la altura de un grupo multisector",
    accent: "#cdee8f",
    name: "Grupo Tinbet",
    logo: "/media/logos/grupo-tinbet.png",
    shot: "/media/work/proj-grupo-tinbet.jpg",
    bg: "#062a1e",
    sector: "Holding corporativo",
    site: "grupotinbet.pe",
    tags: ["Branding", "Diseño Web", "Desarrollo Web"],
    chapters: [
      {
        title: "Branding",
        body: "Sistema de identidad para un holding peruano que integra iGaming, construcción e inversión: símbolo, logotipo, paleta multisector y aplicaciones corporativas.",
      },
      {
        title: "Diseño y desarrollo web",
        body: "Un sitio que conecta las tres verticales del grupo —entretenimiento, inversiones y seguridad— con secciones de obras por impuestos, principios, personas y talento, y noticias.",
      },
    ],
  },
  {
    slug: "afiliados-tinbet",
    headline: "Una landing que convierte audiencias en socios comerciales",
    accent: "#a9e8c4",
    name: "Afiliados Tinbet",
    logo: "/media/logos/afiliados-tinbet.png",
    shot: "/media/work/proj-afiliados-tinbet.jpg",
    bg: "#151716",
    sector: "Gaming & entretenimiento",
    site: "afiliadostinbet.pe",
    tags: ["UX/UI", "Copy de conversión", "Desarrollo Web"],
    chapters: [
      {
        title: "UX/UI y desarrollo web",
        body: "Diseño y desarrollo del sitio del programa de afiliados: propuesta de valor clara (Rev Share hasta 50% y CPA hasta S/ 600), comisiones escalonadas, panel de afiliados y programa de influencers.",
      },
    ],
  },
  {
    slug: "peruana-en-rusia",
    headline: "Del sueño de estudiar afuera a una postulación guiada",
    accent: "#bcd8ff",
    name: "Peruana en Rusia",
    logo: "/media/logos/peruana-en-rusia.png",
    shot: "/media/work/proj-peruana-en-rusia.jpg",
    bg: "#007afc",
    sector: "Educación internacional",
    site: "peruanaenrusia.com",
    tags: ["Branding", "Diseño Web", "Piezas digitales"],
    chapters: [
      {
        title: "Branding",
        body: "Identidad para una asesoría de becas en Rusia. El símbolo nace de las líneas de cebra: el cruce seguro hacia una nueva etapa. Incluye versión compacta Pe·Ru, recursos 3D y aplicaciones.",
      },
      {
        title: "Diseño y desarrollo web",
        body: "Sitio para captar postulantes a becas: video de presentación, acompañamiento paso a paso, casos de éxito y universidades, más piezas digitales para campañas.",
      },
    ],
  },
  {
    slug: "sunqu-journeys",
    headline: "El Perú no es un destino. Es una relación",
    accent: "#e6e0b4",
    name: "Sunqu Journeys",
    logo: "/media/logos/sunqu-journeys.png",
    shot: "/media/work/proj-sunqu-journeys.jpg",
    bg: "#6f6a45",
    sector: "Turismo experiencial",
    // sunqujourneys.com (el del dossier) aún no responde: se enlaza la web publicada.
    site: "ferdango.github.io/sunqu_onepage",
    tags: ["Branding", "Estrategia", "Desarrollo Web"],
    chapters: [
      {
        title: "Branding",
        body: "Marca para una agencia de viajes experienciales. El símbolo fusiona corazón, GPS y avión con formas rectas inspiradas en la iconografía peruana; el patrón andino da vida a flota, merchandising y redes.",
      },
      {
        title: "Diseño y desarrollo web",
        body: "Experiencia web con storytelling de marca y un selector de journeys por emoción —la historia, el sabor, la gente— para viajes a medida con anfitriones locales.",
      },
    ],
  },
  {
    slug: "tuku-travel",
    headline: "Tours que se descubren, se entienden y se reservan",
    accent: "#f6c5d3",
    name: "Tuku Travel",
    logo: "/media/logos/tuku-travel.png",
    shot: "/media/work/proj-tuku-travel.jpg",
    bg: "#c62f5c",
    sector: "Turismo",
    site: "tukutravel.com",
    tags: ["Diseño Web", "Desarrollo Web", "E-commerce de tours"],
    chapters: [
      {
        title: "Diseño y desarrollo web",
        body: "Fichas de tour con galería, destacados, itinerario día a día, servicios incluidos y precio por adulto con reserva en línea; además, destinos e itinerarios por tipo de experiencia.",
      },
    ],
  },
  {
    slug: "kingbuilder",
    headline: "Catálogo técnico que vende autoridad",
    accent: "#e8dcc2",
    name: "KingBuilder",
    logo: "/media/logos/kingbuilder.png",
    shot: "/media/work/proj-kingbuilder.jpg",
    bg: "#1c1c1c",
    sector: "Construcción y minería",
    // kingbuilder.pe (el del dossier) aún no responde, así que el caso va sin enlace.
    tags: ["Branding", "Diseño Web", "Desarrollo Web"],
    chapters: [
      {
        title: "Branding",
        body: "Identidad para una constructora de tecnología minera: una K de líneas paralelas que expresa estructura e ingeniería, paleta de negro estructural, blanco arena, arena cobre y marrón monolito, y un sistema impreso y digital.",
      },
      {
        title: "Diseño y desarrollo web",
        body: "Sitio corporativo con seis líneas de solución, productos destacados con fichas técnicas, forma de trabajo de principio a fin, entornos de aplicación y una ruta clara de cotización.",
      },
    ],
  },
  {
    slug: "tec-seg",
    headline: "Una marca que se ve en la obra, en la calle y en digital",
    accent: "#ffe08a",
    name: "TEC & SEG",
    logo: "/media/logos/tec-seg.png",
    shot: "/media/work/proj-tec-seg.jpg",
    bg: "#fcb203",
    sector: "Seguridad para construcción",
    tags: ["Branding", "Aplicaciones", "Look & feel web"],
    chapters: [
      {
        title: "Branding",
        body: "Marca para una empresa de seguridad especializada en obras de construcción pública y privada. Un escudo con un felino vigilante resume protección, disciplina y confianza.",
      },
      {
        title: "Aplicaciones",
        body: "Sistema de aplicaciones: flota vehicular, uniformes, papelería corporativa, credenciales y un look & feel web responsive para presentar servicios de seguridad física, custodia, seguridad electrónica y consultoría.",
      },
    ],
  },
  {
    slug: "iep-eusebio-arroniz",
    headline: "Una web escolar pensada para las familias",
    accent: "#f9cdd8",
    name: "IEP Eusebio Arróniz",
    // En la lista del slider el nombre completo no cabe en una línea.
    short: "Eusebio Arróniz",
    logo: "/media/logos/iep-eusebio-arroniz.png",
    shot: "/media/work/proj-iep-eusebio-arroniz.jpg",
    bg: "#ffffff",
    sector: "Educación escolar",
    tags: ["UX/UI", "Arquitectura de información", "Prototipo"],
    chapters: [
      {
        title: "UX/UI web",
        body: "Diseño UX/UI del sitio institucional en Figma: admisión, metodologías por nivel —inicial, primaria y secundaria—, comunicados, testimonios, preguntas frecuentes y libro de reclamaciones, en versión desktop y mobile.",
      },
    ],
  },
  {
    slug: "zenity",
    headline: "Conecta tus finanzas en un solo lugar",
    accent: "#cdd6ff",
    name: "Zenity",
    logo: "/media/logos/zenity.png",
    shot: "/media/work/proj-zenity.jpg",
    bg: "#0f1216",
    sector: "Fintech",
    tags: ["Product Design", "UX/UI app", "Design system"],
    chapters: [
      {
        title: "Product design",
        body: "App para negocios que reúne cuentas, tarjetas y conexiones API en un balance consolidado, con ingresos y egresos por cuenta, resúmenes diarios generados con IA y un asistente conversacional.",
      },
    ],
  },
];

export const partners = [
  { name: "Atlassian", logo: "/media/logos/p-atlassian.png" },
  { name: "Meta Business Partner", logo: "/media/logos/p-meta.png" },
  { name: "WordPress VIP Silver Agency Partner", logo: "/media/logos/p-wpvip.png" },
  { name: "Google Cloud", logo: "/media/logos/p-googlecloud.png" },
  { name: "Spotify Advertising Certified Partner", logo: "/media/logos/p-spotify.png" },
];

export const methodology = [
  {
    tag: "Design Thinking",
    fig: "esfera-amarilla",
    tagColor: "#fbbd1d",
    tagText: "#05080a",
    title: "Diseño centrado en el usuario",
    titleColor: "#fbbd1d",
    body: "Ponemos a tus usuarios en el centro de todo lo que creamos",
    pos: { top: "15%", left: "13%" },
  },
  {
    tag: "Ceremonias, Reuniones",
    fig: "esfera-roja",
    tagColor: "#ff1a30",
    tagText: "#ffffff",
    title: "Feedback constante",
    titleColor: "#ff1a30",
    body: "Tu opinión es el motor de nuestra creación.",
    pos: { top: "15%", right: "13%" },
  },
  {
    tag: "Scrum & Lean UX",
    fig: "gota-azul",
    tagColor: "#2ea6ff",
    tagText: "#05080a",
    title: "Gestión ágil",
    titleColor: "#2ea6ff",
    body: "Con nuestra gestión ágil, transformamos la incertidumbre en resultados rápidos y visibles.",
    pos: { bottom: "7%", left: "13%" },
  },
  {
    tag: "Kaizen",
    fig: "cinta-magenta",
    // Magenta y no verde: la paleta de figuras de la marca no tiene verde, y el
    // nodo del diagrama tiene que coincidir con el color de su tarjeta.
    tagColor: "#a33099",
    tagText: "#ffffff",
    title: "Mejora continua",
    titleColor: "#d85fc9",
    body: "El mundo digital evoluciona, y tu producto también debería mantenerse a la vanguardia.",
    pos: { bottom: "11%", right: "13%" },
  },
];

export const reviews = {
  title: "Lo que dicen nuestros clientes",
  subtitle:
    "Escucha qué dicen las grandes organizaciones y las empresas emergentes que prefieren Wuality",
  avatars: ["/media/people/a1.jpg", "/media/people/a2.jpg", "/media/people/a3.jpg"],
  count: "+20 reviews",
  items: [
    {
      name: "Carlos Camura",
      role: "CEO, Deploya.io",
      avatar: "/media/people/a1.jpg",
      date: "20 Mar, 2025",
      quote:
        "“Antes, nuestro equipo consideraba que Atlassian era un conjunto de herramientas individuales... Ahora, Wuality ha sido fundamental para la colaboración, la productividad y la visibilidad.”",
    },
    {
      name: "Lucía Ferrer",
      role: "Head of Product, Civitatis",
      avatar: "/media/people/a2.jpg",
      date: "12 Feb, 2025",
      quote:
        "“Wuality entendió el negocio antes de tocar una sola pantalla. El rediseño se tradujo en menos fricción en el checkout y un equipo que por fin habla el mismo idioma.”",
    },
    {
      name: "Diego Salas",
      role: "CTO, Backus",
      avatar: "/media/people/a3.jpg",
      date: "03 Ene, 2025",
      quote:
        "“Pasamos de entregas trimestrales a despliegues semanales. La gestión ágil de Wuality convirtió la incertidumbre en resultados visibles desde el primer sprint.”",
    },
    {
      name: "Ana Quiroz",
      role: "Marketing Lead, Entel",
      avatar: "/media/people/a4.jpg",
      date: "28 Nov, 2024",
      quote:
        "“El acompañamiento no terminó en el lanzamiento. La mejora continua es real: cada mes medimos, aprendemos y ajustamos con ellos.”",
    },
  ],
};

export const clients = [
  { name: "Civitatis", logo: "/media/logos/c-civitatis.png" },
  { name: "Backus", logo: "/media/logos/c-backus.png" },
  { name: "Verisure", logo: "/media/logos/c-verisure.png" },
  { name: "Peruana en Rusia", logo: "/media/logos/c-peruanarusia.png" },
  { name: "Entel", logo: "/media/logos/c-entel.svg" },
  { name: "Fishbox", logo: "/media/logos/c-fishbox.svg" },
  { name: "Sodel", logo: "/media/logos/c-sodel.svg" },
  { name: "Chargy Power", logo: "/media/logos/c-chargy.svg" },
  { name: "Eusebio Arroniz", logo: "/media/logos/c-eusebio.svg" },
  { name: "Protein Food", logo: "/media/logos/c-proteinfood.svg" },
  { name: "Plan International", logo: "/media/logos/c-plan.svg" },
  { name: "Mifruta", logo: "/media/logos/c-mifruta.svg" },
  { name: "Artel", logo: "/media/logos/c-artel.svg" },
  { name: "Bialy", logo: "/media/logos/c-bialy.svg" },
];

/** Titular y textos del dossier (p. 6, "Dos modelos, un mismo compromiso"). */
export const models = {
  line1: "Dos modelos",
  line2: "un mismo compromiso",
  /**
   * Ancho de la línea más larga, en múltiplos del tamaño de letra: el titular
   * se acota a (ancho útil / fit) para que nunca se salga de la pantalla.
   */
  fit: 9,
  cards: [
    {
      title: "Partners Model",
      body: "Nos integramos como tu equipo digital extendido: un roadmap continuo con prioridades que se ajustan a tu negocio.",
      cta: "Descubre más",
      // Azul más profundo que el de marca: el texto blanco pasa de 3,6:1 a 5,4:1.
      bg: "#0066d6",
      image: "/media/work/models-team.jpg",
    },
    {
      title: "Project-based Model",
      body: "Un alcance definido, con cronograma, entregables e inversión cerrados desde el inicio.",
      cta: "Descubre más",
      bg: "#095c50",
      image: "/media/work/models-team.jpg",
    },
  ],
};

export type SocialNetwork = "tiktok" | "instagram";

/**
 * "Últimos posts": las cuentas de Wuality en TikTok e Instagram.
 *
 * Para enseñar una publicación basta con pegar su enlace en `posts`, la más
 * reciente primero; la sección la incrusta con el reproductor oficial de cada
 * red. Tienen que ser enlaces completos:
 *   TikTok     https://www.tiktok.com/@wualityagency/video/<id>
 *   Instagram  https://www.instagram.com/p/<código>/  (o /reel/<código>/)
 *
 * A 28/09/2026 ninguna de las dos cuentas ha publicado nada todavía, así que
 * `posts` va vacío y la sección presenta las cuentas con su botón de seguir.
 */
export const social = {
  title: "Últimos posts",
  lead: "Lo último de Wuality en TikTok e Instagram.",
  profiles: [
    {
      network: "tiktok" as SocialNetwork,
      name: "TikTok",
      handle: "@wualityagency",
      href: "https://www.tiktok.com/@wualityagency",
      icon: "/media/ui/tiktok.svg",
      // Bio de la propia cuenta.
      bio: "Somos un equipo con toda la energía para impulsar negocios ⚡⚡",
      cta: "Seguir en TikTok",
      soon: "Primeros videos, muy pronto",
    },
    {
      network: "instagram" as SocialNetwork,
      name: "Instagram",
      handle: "@wualityagency",
      href: "https://www.instagram.com/wualityagency/",
      icon: "/media/ui/instagram.svg",
      bio: "Creadores de caminos digitales hacia el éxito",
      cta: "Seguir en Instagram",
      soon: "Primeros posts, muy pronto",
    },
  ],
  posts: [] as string[],
  /** Aviso en lugar del post cuando no se han aceptado las cookies: los reproductores las ponen. */
  consent: {
    body: "Esta publicación se carga desde {red}, que usa sus propias cookies.",
    load: "Ver aquí",
    open: "Abrir en {red}",
  },
};

export const faq = {
  title: "Preguntas frecuentes",
  cta: { label: "Sigues con dudas?", button: "Agenda con nosotros" },
  items: [
    {
      q: "¿Qué tipo de proyectos desarrolla Wuality?",
      a: "Trabajamos en proyectos de transformación digital que combinan estrategia, diseño, tecnología y crecimiento. Podemos ayudarte desde la construcción de una marca o producto digital hasta el desarrollo de plataformas, aplicaciones, estrategias de SEO, paid media y soluciones impulsadas por IA.",
    },
    {
      q: "¿Cómo trabajan con nuevos clientes?",
      a: "Primero entendemos tu negocio, objetivos y necesidades. A partir de ese diagnóstico definimos el alcance, equipo y metodología más adecuados para el proyecto, con comunicación y feedback constante durante todo el proceso.",
    },
    {
      q: "¿Trabajan por proyecto o como partner a largo plazo?",
      a: "Ambas opciones. Podemos desarrollar un proyecto con un alcance y entregables definidos, o integrarnos como un partner estratégico para acompañar la evolución continua de tu producto, marca o negocio digital.",
    },
    {
      q: "¿Cómo puedo empezar un proyecto con Wuality?",
      a: "Cuéntanos qué quieres lograr, qué problema necesitas resolver y en qué etapa se encuentra tu proyecto. Agendamos una primera reunión para entender el reto y definir contigo el siguiente paso.",
    },
  ],
};

/**
 * Prefijos para el campo de celular. La bandera va como emoji: se dibuja con la
 * fuente del sistema, así que no hay que mantener un set de imágenes. En
 * Windows, que no trae glifos de bandera, se ve el código de dos letras.
 */
export const dialCodes = [
  { code: "PE", dial: "+51", flag: "🇵🇪", name: "Perú" },
  { code: "CL", dial: "+56", flag: "🇨🇱", name: "Chile" },
  { code: "CO", dial: "+57", flag: "🇨🇴", name: "Colombia" },
  { code: "EC", dial: "+593", flag: "🇪🇨", name: "Ecuador" },
  { code: "BO", dial: "+591", flag: "🇧🇴", name: "Bolivia" },
  { code: "AR", dial: "+54", flag: "🇦🇷", name: "Argentina" },
  { code: "MX", dial: "+52", flag: "🇲🇽", name: "México" },
  { code: "US", dial: "+1", flag: "🇺🇸", name: "Estados Unidos" },
  { code: "ES", dial: "+34", flag: "🇪🇸", name: "España" },
];

export const meeting = {
  title: "Agenda una reunión",
  subtitle: "Elige una de las plataformas para tener nuestra primera reunión",
  options: [
    { id: "meet", name: "Google Meet" },
    { id: "zoom", name: "Zoom" },
  ],
  /** Buzón que recibe todas las reuniones. */
  inbox: "hola@wuality.agency",
  /** Duración de la primera reunión, para el evento de Google Calendar. */
  durationMin: 30,
  /**
   * Agenda de citas de Google Calendar de hola@wuality.agency (Google Calendar →
   * Crear → Agenda de citas → Compartir → Sitio web → la URL del `src`).
   *
   * Vacía, Google Meet abre un evento ya rellenado en el Google Calendar del
   * visitante, con el buzón como invitado: al guardarlo, Google le envía la
   * invitación. Con la URL, la agenda se incrusta en el propio flujo y Google se
   * encarga de la disponibilidad, el enlace de Meet y las confirmaciones.
   */
  bookingUrl: "",
  /**
   * Servicio que reenvía por correo los datos del formulario: el sitio es
   * estático, sin servidor propio que pueda mandar correos. FormSubmit no pide
   * cuenta; el primer envío le llega al buzón como correo de activación y, una
   * vez confirmado, los siguientes llegan con los datos. Tras activarlo, FormSubmit
   * da un alias para no dejar la dirección a la vista en el código.
   */
  mailEndpoint: "https://formsubmit.co/ajax/hola@wuality.agency",
};

export type { ArticleBlock, BlogItem } from "./blog";

/** Un artículo por cada caso de la cartera: los textos están en lib/blog.ts. */
export const blog = {
  title: "Lo que necesitas saber para llegar más lejos",
  items: posts,
  share: "Compartir",
  next: "Siguiente artículo",
  related: "Más ideas para ti",
};

export const footer = {
  name: "Wuality: Agencia de Innovación & Tecnología",
  /**
   * Un color de marca por palabra, en el orden de la paleta del manual: azul,
   * amarillo, magenta y rojo. Los puntos van en gris para que no compitan y se
   * lean como separadores, no como parte de la palabra.
   *
   * El mismo en todos los tamaños: antes en desktop iba otra frase ("Creamos
   * experiencias digitales, impulsamos marcas.") con sólo dos palabras en color.
   */
  claim: [
    // El azul de texto (--color-sky), no el de marca: sobre el pie oscuro éste no llega a 4,5:1.
    { text: "Imagine", color: "#3d9bff" },
    { text: ".", color: "#7c8282" },
    { text: " " },
    { text: "Create", color: "#fbbd1d" },
    { text: ".", color: "#7c8282" },
    { text: " " },
    { text: "Develop", color: "#d85fc9" },
    { text: ".", color: "#7c8282" },
    { text: " " },
    { text: "Together", color: "#ff1a30" },
  ],
  email: "hola@wuality.agency",
  legal: "Wuality Agency © 2025 Todos los derechos reservados",
  links: ["Cookies", "Privacidad"],
  socials: [
    { name: "Instagram", icon: "/media/ui/instagram.svg", href: "https://www.instagram.com/wualityagency/" },
    { name: "Mail", icon: "/media/ui/mail.svg", href: "#" },
    { name: "TikTok", icon: "/media/ui/tiktok.svg", href: "https://www.tiktok.com/@wualityagency" },
  ],
};

export const chat = {
  question: "¿Tienes un proyecto en mente? Conversemos.",
  cta: "Iniciar chat",
  /** Número de atención. `href` se deriva de aquí: wa.me solo acepta dígitos. */
  phone: "+51 966 461 384",
  href: "https://wa.me/51966461384",
};

export const cookies = {
  /**
   * Describe lo que hace la web de verdad: guarda la decisión en el navegador
   * y, sólo si se acepta, carga los posts de TikTok e Instagram de "Últimos
   * posts", que traen sus propias cookies. No hay analítica ni publicidad.
   */
  body: "Usamos el almacenamiento de tu navegador para que la web funcione y recuerde tu elección. Si aceptas, también cargaremos las publicaciones de TikTok e Instagram, que pueden usar sus propias cookies.",
  link: "Administrar las cookies y obtener más información",
  accept: "Aceptar",
  reject: "Rechazar",
};

/**
 * Textos de interfaz: botones, etiquetas y avisos que no son contenido de una
 * sección. `{nombre}` se rellena con `fill()` (lib/i18n.ts).
 */
export const ui = {
  header: { home: "Wuality — inicio", openMenu: "Abrir menú", language: "Idioma y región" },
  menu: { label: "Menú principal", close: "Cerrar menú" },
  hero: { screen: "Pantalla de bloqueo con el fondo de marca de Wuality", date: "martes, 31 de julio" },
  services: { title: "Lo que hacemos", cta: "Consulta aquí" },
  projects: { title: "Nuestros proyectos", open: "Ver el caso de {name}" },
  partners: { title: "Partners digitales", label: "Partners digitales de Wuality" },
  methodology: {
    title: "¿Cómo lo logramos?",
    cycle: "Ciclo de trabajo iterativo de Wuality. Arrástralo o usa las flechas para girarlo.",
  },
  reviews: { label: "Opiniones de clientes" },
  blog: {
    label: "Artículos y episodios de Wuality",
    related: "Artículos relacionados",
    shareOn: "Compartir en {red}",
    watch: "Ver el vídeo: {title}",
    youtube: "YouTube",
  },
  social: {
    rail: "Últimas publicaciones en TikTok e Instagram",
    post: "Publicación de {handle} en {red}",
    prev: "Posts anteriores",
    next: "Posts siguientes",
  },
  carousel: { role: "carrusel", slide: "{n} de {total}", goTo: "Ir al slide {n}" },
  caseStudy: { services: "Servicios", client: "Cliente", sector: "Sector", web: "Web", next: "Siguiente caso" },
  meeting: {
    platform: "Plataforma para la reunión",
    continue: "Continuar",
    back: "volver",
    dial: "Prefijo del país",
    name: "Nombres y apellidos",
    phone: "Celular",
    email: "Correo electrónico",
    date: "Fecha de la reunión",
    time: "Hora de la reunión",
    hintMeet: "Te abriremos Google Calendar con la reunión lista para guardar.",
    hintZoom: "Te enviaremos el enlace de Zoom a tu correo.",
    hintZone: "Hora de tu zona horaria.",
    privacy: "He leído y acepto la Política de Privacidad y protección de datos*",
    privacyError: "Necesitamos que aceptes la Política de Privacidad para continuar.",
    sendError: "No pudimos enviar tu solicitud. Escríbenos a {inbox} y la agendamos contigo.",
    sending: "Enviando…",
    submitMeet: "Agendar en Google Calendar",
    submitZoom: "Quiero una reunión",
    bookingTitle: "Agenda una reunión con Wuality en Google Calendar",
    bookingOpen: "Abrir la agenda en Google Calendar",
    done: "¡Listo!",
    doneMeet: "Te abrimos Google Calendar con la reunión del {date} a las {time}. Guárdala para que nos llegue la invitación.",
    openCalendar: "Abrir Google Calendar",
    doneZoom: "Recibimos tu solicitud para el {date} a las {time}. Te enviaremos el enlace de Zoom a {email}.",
    again: "Agendar otra",
    eventTitle: "Reunión con Wuality — {name}",
    eventDetails: "Primera reunión solicitada desde la web de Wuality.",
    eventName: "Nombre",
    eventPhone: "Celular",
    eventEmail: "Correo",
    /** Idioma de las fechas legibles ("martes, 30 de septiembre de 2026"). */
    dateLocale: "es",
  },
  floating: {
    cookies: "Preferencias de cookies",
    banner: "Aviso de cookies",
    whatsapp: "Escribir por WhatsApp al {phone}",
    saved: "Preferencia guardada: {choice}.",
    accepted: "aceptadas",
    rejected: "rechazadas",
  },
};
