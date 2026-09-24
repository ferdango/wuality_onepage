/**
 * Contenido de la one-page, tal como está escrito en el Figma "Wuality Web"
 * (página "UI Desktop", frames 9:2 desktop y 1573:153 mobile).
 */

export const nav = [
  { label: "About Wuality", short: "About", href: "#edu" },
  { label: "Work", short: "Work", href: "#work" },
  { label: "Services", short: "Services", href: "#services" },
  { label: "Reviews", short: "Reviews", href: "#reviews" },
  { label: "Blog", short: "Blog", href: "#blog" },
] as const;

export const languages = [
  { code: "ES", name: "Español - América Latina", region: "Perú", flag: "/media/ui/flag-es.png" },
  { code: "EN", name: "English", region: "USA", flag: "/media/ui/flag-us.svg" },
  { code: "RU", name: "Ruso", region: "Russian", flag: "/media/ui/flag-ru.svg" },
];

export const hero = {
  headline: "Somos Wuality, tu Partner en Transformación Digital",
  media: "/media/work/hero-phones.jpg",
  words: ["Innovamos", "Conectamos"],
};

export const services = [
  {
    title: "Brand Identity",
    items: "Culture / Visual communication / Identity / Value proposition",
    image: "/media/work/services-nike.jpg",
  },
  {
    title: "Create Digital Products",
    items: "UX-UI / Product management / Front-End /Back-End / Apps",
    image: "/media/work/proj-nu.jpg",
  },
  {
    title: "Strategy & AI-Driven Insights",
    items: "Accesibility / Customer journey / Research / Trends",
    image: "/media/work/proj-backus.jpg",
  },
  {
    title: "Paid Media & SEO",
    items: "SEM / SEO / Paid social / Display / Video / Native",
    image: "/media/work/proj-civitatis.png",
  },
];

/**
 * Cada proyecto alimenta su tarjeta en "Nuestros proyectos" y el detalle que se
 * abre debajo al hacer clic.
 *
 * OJO: los textos de `chapters` son de relleno. El Figma solo trae un caso de
 * estudio (Meltwater en desktop, "Starbucks LLC" en mobile) y tampoco coincide
 * con estos cuatro clientes, así que hay que sustituirlos por los reales.
 */
/**
 * `headline` y `accent` son la tarjeta de color que se revela sobre la foto al
 * llegar cada proyecto en "Nuestros proyectos". Los titulares salen de los
 * propios capítulos de cada caso, no de métricas nuevas.
 */
export const projects = [
  {
    slug: "jockey-plaza",
    headline: "Tres toques hasta cualquier tienda del centro comercial",
    accent: "#f2cdb5",
    name: "Jockey Plaza",
    logo: "/media/logos/jockeyplaza.png",
    shot: "/media/work/proj-jockeyplaza.jpg",
    bg: "#7f756b",
    tags: ["Diseño Web", "Desarrollo Web", "Branding"],
    chapters: [
      {
        title: "Branding",
        body: "Trasladamos la experiencia del centro comercial a una identidad digital propia: un sistema visual cálido y editorial que funciona igual en una ficha de tienda que en una campaña de temporada.",
      },
      {
        title: "Desarrollo Web",
        body: "App y sitio comparten una misma capa de contenido, de modo que catálogo, horarios y promociones se publican una sola vez y llegan a todos los canales sin duplicar trabajo.",
      },
      {
        title: "Diseño Web",
        body: "Rediseñamos la navegación alrededor de lo que la gente realmente busca —qué hay cerca, qué está abierto, qué está en oferta— y redujimos a tres toques el camino hasta una tienda.",
      },
    ],
  },
  {
    slug: "civitatis",
    headline: "Una ficha de actividad que resuelve las dudas antes de reservar",
    // Menta y no el naranja de su fondo: con el mismo color la tarjeta no se distinguía de la foto.
    accent: "#b9f0d8",
    name: "Civitatis",
    logo: "/media/logos/civitatis.png",
    shot: "/media/work/proj-civitatis.png",
    bg: "#f78832",
    tags: ["Diseño Web", "Producto", "UX Research"],
    chapters: [
      {
        title: "UX Research",
        body: "Acompañamos a viajeros reales durante la reserva para entender dónde se caían. La fricción no estaba en el precio, sino en no saber qué incluía cada actividad.",
      },
      {
        title: "Producto",
        body: "Reordenamos la ficha de actividad para responder primero las dudas que frenaban la compra: qué incluye, cuánto dura y qué pasa si llueve.",
      },
      {
        title: "Diseño Web",
        body: "Un sistema de componentes que soporta miles de actividades en varios idiomas sin que la página pierda ritmo ni personalidad.",
      },
    ],
  },
  {
    slug: "nu",
    headline: "De semanas a días para lanzar una pantalla nueva",
    accent: "#c7b5f4",
    name: "Nu",
    logo: "/media/logos/nu.png",
    shot: "/media/work/proj-nu.jpg",
    bg: "#e0e0e0",
    tags: ["Producto", "UX-UI", "Design System"],
    chapters: [
      {
        title: "UX-UI",
        body: "Diseñamos el panel de finanzas para que la primera pantalla responda la pregunta que todos se hacen al abrir la app: cuánto tengo y en qué se me fue.",
      },
      {
        title: "Design System",
        body: "Una librería de componentes accesibles y tipada, compartida entre equipos, que bajó de semanas a días el tiempo de lanzar una pantalla nueva.",
      },
      {
        title: "Producto",
        body: "Iteramos sobre datos de uso real: cada cambio salió a un porcentaje de usuarios antes de convertirse en la experiencia por defecto.",
      },
    ],
  },
  {
    slug: "backus",
    headline: "Pedidos sin señal para el equipo de campo",
    accent: "#94c5f2",
    name: "Backus",
    logo: "/media/logos/backus.png",
    shot: "/media/work/proj-backus.jpg",
    bg: "#cdc8dc",
    tags: ["Desarrollo Web", "Estrategia", "Data"],
    chapters: [
      {
        title: "Estrategia",
        body: "Mapeamos el recorrido completo del punto de venta para decidir qué debía resolver la herramienta y qué no. Menos funciones, mejor ejecutadas.",
      },
      {
        title: "Desarrollo Web",
        body: "Una plataforma que funciona con conexión intermitente: el equipo de campo registra pedidos sin señal y todo se sincroniza al recuperarla.",
      },
      {
        title: "Data",
        body: "Tableros que muestran cobertura y rotación por zona, de modo que las decisiones comerciales dejan de depender de la hoja de cálculo de cada quien.",
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
    title: "User-centric design",
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
    tag: "Kayzen",
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

export const models = {
  line1: "Two models",
  line2: "only one effect",
  cards: [
    {
      title: "Partners Model",
      body: "Do you have specific project requirements? Try us on for size with a scope-based project built on a defined scope of work.",
      cta: "Descubre más",
      bg: "#007afc",
      image: "/media/work/models-team.jpg",
    },
    {
      title: "Project-based Model",
      body: "Do you have specific project requirements? Try us on for size with a scope-based project built on a defined scope of work.",
      cta: "Descubre más",
      bg: "#095c50",
      image: "/media/work/models-team.jpg",
    },
  ],
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
};

/**
 * Cuerpo del artículo tal cual viene en el Figma (frame "Single Article Text").
 * Es copia de maqueta, como el lorem ipsum del FAQ: los cinco posts comparten
 * el mismo cuerpo hasta que haya textos reales.
 */
const articleDemoBody = [
  {
    type: "p",
    text: "Sin lugar a dudas, el fraude financiero es una práctica que amenaza las organizaciones bancarias desde hace décadas y, sin embargo, evoluciona constantemente obligando a las empresas a desarrollarse con ellas para fortalecer las vulnerabilidades, procesos e, incluso la fuerza humana para sobrellevar estos riesgos.",
  },
  {
    type: "p",
    text: "Ahora bien, si no sabes a detalle qué es el fraude financiero, cómo funciona o cuáles son los principales tipos, ¡este es el post para ti!",
  },
  { type: "h2", text: "Autofraude" },
  {
    type: "p",
    text: "Ocurre cuando el propio cliente simula haber sido víctima de una estafa para obtener beneficios indebidos, como reembolsos o cancelaciones de deuda.",
  },
  {
    type: "p",
    text: "Es una práctica fraudulenta que perjudica a las instituciones financieras y suele ser difícil de detectar sin un sistema de monitoreo avanzado.",
  },
] as const;

const articleAuthor = { name: "José Quinteros", avatar: "/media/people/a1.jpg" } as const;

const articleLead =
  "Conoce cómo el fraude financiero impacta a personas y empresas y cómo un sistema tecnológico puede mitigar este riesgo efectivamente en tu negocio.";

export const blog = {
  title: "Lo que necesitas saber para llegar más lejos",
  /**
   * `type` decide qué maqueta del Figma se usa al abrir el post: los "video"
   * llevan el icono de YouTube en la tarjeta del home y abren "Single Article
   * Video"; el resto abre "Single Article Text".
   */
  items: [
    {
      slug: "lo-que-necesitas-saber-para-llegar-mas-lejos",
      type: "note",
      date: "7 de mayo del 2025",
      title: "Lo que necesitas saber para llegar más lejos",
      image: "/media/work/blog-office.jpg",
      cta: "Leer nota",
      category: "Transformación Digital",
      author: articleAuthor,
      publishedAt: "04/07/2023",
      lead: articleLead,
      body: articleDemoBody,
    },
    {
      slug: "ep1-conoce-a-tinbet",
      type: "video",
      date: "7 de mayo del 2025",
      title: "EP1: Conoce a Tinbet",
      image: "/media/work/blog-podcast.jpg",
      category: "VideoBlogs",
      author: articleAuthor,
      publishedAt: "04/07/2023",
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      slug: "diseno-de-producto-del-insight-al-release",
      type: "note",
      date: "7 de mayo del 2025",
      title: "Diseño de producto: del insight al release",
      image: "/media/work/blog-office.jpg",
      cta: "Leer nota",
      category: "Transformación Digital",
      author: articleAuthor,
      publishedAt: "04/07/2023",
      lead: articleLead,
      body: articleDemoBody,
    },
    {
      slug: "ep2-metricas-que-si-importan",
      type: "video",
      date: "7 de mayo del 2025",
      title: "EP2: Métricas que sí importan",
      image: "/media/work/blog-podcast.jpg",
      category: "VideoBlogs",
      author: articleAuthor,
      publishedAt: "04/07/2023",
      video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      slug: "como-medimos-el-impacto-de-un-rediseno",
      type: "note",
      date: "7 de mayo del 2025",
      title: "Cómo medimos el impacto de un rediseño",
      image: "/media/work/blog-office.jpg",
      cta: "Leer nota",
      category: "Transformación Digital",
      author: articleAuthor,
      publishedAt: "04/07/2023",
      lead: articleLead,
      body: articleDemoBody,
    },
  ],
  share: "Compartir",
  next: "Siguiente artículo",
};

export type BlogItem = (typeof blog.items)[number];

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
    { text: "Imagine", color: "#007afc" },
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
    { name: "Instagram", icon: "/media/ui/instagram.svg", href: "#" },
    { name: "Mail", icon: "/media/ui/mail.svg", href: "#" },
    { name: "TikTok", icon: "/media/ui/tiktok.svg", href: "#" },
  ],
};

export const chat = {
  question: "¿Alguna pregunta sobre Tinbet para empresas?",
  cta: "Iniciar chat",
  /** Número de atención. `href` se deriva de aquí: wa.me solo acepta dígitos. */
  phone: "+51 966 461 384",
  href: "https://wa.me/51966461384",
};

export const cookies = {
  body: "Si aceptas las cookies, las usaremos para mejorar y personalizar tu experiencia y para permitir que nuestros partners te muestren anuncios personalizados de PayPal cuando visites otros sitios web.",
  link: "Administrar las cookies y obtener más información",
  accept: "Aceptar",
  reject: "Rechazar",
};
