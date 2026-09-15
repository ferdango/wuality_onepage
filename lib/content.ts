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
    image: "/media/work/proj-nu.png",
  },
  {
    title: "Strategy & AI-Driven Insights",
    items: "Accesibility / Customer journey / Research / Trends",
    image: "/media/work/proj-backus.png",
  },
  {
    title: "Paid Media & SEO",
    items: "SEM / SEO / Paid social / Display / Video / Native",
    image: "/media/work/proj-civitatis.png",
  },
];

export const projects = [
  { name: "Jockey Plaza", logo: "/media/logos/jockeyplaza.png", shot: "/media/work/proj-jockeyplaza.png", bg: "#7f756b" },
  { name: "Civitatis", logo: "/media/logos/civitatis.png", shot: "/media/work/proj-civitatis.png", bg: "#f78832" },
  { name: "Nu", logo: "/media/logos/nu.png", shot: "/media/work/proj-nu.png", bg: "#e0e0e0" },
  { name: "Backus", logo: "/media/logos/backus.png", shot: "/media/work/proj-backus.png", bg: "#cdc8dc" },
];

export const caseStudy = {
  tags: ["Diseño Web", "Desarrollo Web", "Branding"],
  client: "Meltwater",
  image: "/media/work/case-starbucks.jpg",
  chapters: [
    {
      title: "Branding",
      body: "Queríamos crear una primera impresión impactante que mostrara la gama de productos Meltwater desde los primeros segundos de llegar a su página de inicio. Un video animado de sus productos rediseñados crea una experiencia moderna y atractiva en la parte superior de la página, y se adapta a los gráficos incorporados en el sitio web personalizado.",
    },
    {
      title: "Desarrollo Web",
      body: "Construimos el sitio sobre una base headless para que el equipo de marketing pueda publicar sin depender de desarrollo, con componentes reutilizables y métricas de performance medidas en cada despliegue.",
    },
    {
      title: "Diseño Web",
      body: "Un sistema de diseño consistente en desktop, tablet y mobile: retícula flexible, tipografía escalable y componentes accesibles que mantienen la identidad de marca en cada punto de contacto.",
    },
  ],
};

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
    { type: "video", date: "7 de mayo del 2025", title: "EP1: Conoce a Tinbet", image: "/media/work/blog-podcast.png" },
    { type: "note", date: "7 de mayo del 2025", title: "Diseño de producto: del insight al release", image: "/media/work/blog-office.jpg", cta: "Leer nota" },
    { type: "video", date: "7 de mayo del 2025", title: "EP2: Métricas que sí importan", image: "/media/work/blog-podcast.png" },
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
};

export const cookies = {
  body: "Si aceptas las cookies, las usaremos para mejorar y personalizar tu experiencia y para permitir que nuestros partners te muestren anuncios personalizados de PayPal cuando visites otros sitios web.",
  link: "Administrar las cookies y obtener más información",
  accept: "Aceptar",
  reject: "Rechazar",
};
