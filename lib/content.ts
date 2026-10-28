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
  related: "Más ideas para ti",
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
    { name: "Instagram", icon: "/media/ui/instagram.svg", href: "https://www.instagram.com/wualityagency/" },
    { name: "Mail", icon: "/media/ui/mail.svg", href: "#" },
    { name: "TikTok", icon: "/media/ui/tiktok.svg", href: "https://www.tiktok.com/@wualityagency" },
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
