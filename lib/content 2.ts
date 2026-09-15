/**
 * Contenido de la one-page, tal como está escrito en el Figma "Wuality Web"
 * (página "UI Desktop", frames 9:2 desktop y 1573:153 mobile).
 */

export const nav = [
  { label: "About Wuality", short: "About", href: "#about" },
  { label: "Work", short: "Work", href: "#work" },
  { label: "Services", short: "Services", href: "#services" },
  { label: "Reviews", short: "Reviews", href: "#reviews" },
  { label: "Edu", short: "Edu", href: "#edu" },
] as const;

export const languages = [
  { code: "ES", name: "Español - América Latina", region: "Perú", flag: "/media/ui/flag-es.png" },
  { code: "EN", name: "English", region: "USA", flag: "" },
  { code: "RU", name: "Ruso", region: "Russian", flag: "" },
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
export const projects = [
  {
    slug: "jockey-plaza",
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
    tagColor: "#fbbd1d",
    tagText: "#05080a",
    title: "User-centric design",
    titleColor: "#fbbd1d",
    body: "Ponemos a tus usuarios en el centro de todo lo que creamos",
    pos: { top: "14%", left: "8%" },
  },
  {
    tag: "Ceremonias, Reuniones",
    tagColor: "#ff1a30",
    tagText: "#ffffff",
    title: "Feedback constante",
    titleColor: "#ff1a30",
    body: "Tu opinión es el motor de nuestra creación.",
    pos: { top: "14%", right: "8%" },
  },
  {
    tag: "Scrum & Lean UX",
    tagColor: "#2ea6ff",
    tagText: "#05080a",
    title: "Gestión ágil",
    titleColor: "#2ea6ff",
    body: "Con nuestra gestión ágil, transformamos la incertidumbre en resultados rápidos y visibles.",
    pos: { bottom: "4%", left: "3%" },
  },
  {
    tag: "Kayzen",
    tagColor: "#0f9d7a",
    tagText: "#ffffff",
    title: "Mejora continua",
    titleColor: "#4fe0a0",
    body: "El mundo digital evoluciona, y tu producto también debería mantenerse a la vanguardia.",
    pos: { bottom: "8%", right: "3%" },
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
      q: "What is a typical course schedule and structure?",
      a: "Lorem ipsum dolor sit amet consectetur. Diam massa sed iaculis donec vel. Vitae hendrerit aliquam amet egestas enim. Velit massa elementum magna risus. Aliquet nec mauris sed nulla nisl id quam ipsum tempus. Enim sit etiam pretium faucibus quam. Viverra semper in sed at mauris cursus est. Ac sagittis auctor condimentum vulputate aliquam interdum.",
    },
    {
      q: "What is a typical course schedule and structure?",
      a: "Lorem ipsum dolor sit amet consectetur. Diam massa sed iaculis donec vel. Vitae hendrerit aliquam amet egestas enim. Velit massa elementum magna risus. Aliquet nec mauris sed nulla nisl id quam ipsum tempus.",
    },
    {
      q: "What is a typical course schedule and structure?",
      a: "Lorem ipsum dolor sit amet consectetur. Diam massa sed iaculis donec vel. Vitae hendrerit aliquam amet egestas enim. Velit massa elementum magna risus.",
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

export const blog = {
  title: "Lo que necesitas saber para llegar más lejos",
  items: [
    { type: "note", date: "7 de mayo del 2025", title: "Lo que necesitas saber para llegar más lejos", image: "/media/work/blog-office.jpg", cta: "Leer nota" },
    { type: "video", date: "7 de mayo del 2025", title: "EP1: Conoce a Tinbet", image: "/media/work/blog-podcast.jpg" },
    { type: "note", date: "7 de mayo del 2025", title: "Diseño de producto: del insight al release", image: "/media/work/blog-office.jpg", cta: "Leer nota" },
    { type: "video", date: "7 de mayo del 2025", title: "EP2: Métricas que sí importan", image: "/media/work/blog-podcast.jpg" },
    { type: "note", date: "7 de mayo del 2025", title: "Cómo medimos el impacto de un rediseño", image: "/media/work/blog-office.jpg", cta: "Leer nota" },
  ],
};

export const footer = {
  name: "Wuality: Agencia de Innovación & Tecnología",
  claim: [
    { text: "Creamos " },
    { text: "experiencias digitales", color: "#007afc" },
    { text: ", " },
    { text: "impulsamos", color: "#ff1a30" },
    { text: " marcas." },
  ],
  claimMobile: [
    { text: "Imagine", color: "#007afc" },
    { text: ". " },
    { text: "Create", color: "#fbbd1d" },
    { text: ". " },
    { text: "Develop" },
    { text: ". " },
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
