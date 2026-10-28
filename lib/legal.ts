/**
 * Política de privacidad y cookies, en los dos idiomas.
 *
 * Describe lo que hace esta web de verdad: el formulario de reunión (FormSubmit
 * reenvía los datos al buzón y, con Google Meet, se abre Google Calendar con el
 * evento), el enlace a WhatsApp, la decisión sobre cookies guardada en el
 * navegador y los posts de TikTok e Instagram que sólo cargan si se aceptan. No
 * hay analítica ni publicidad: si se añaden (GA, píxeles…), hay que actualizarla.
 *
 * Sólo la usa la página de la política, que se genera en el servidor, así que
 * estos textos largos no viajan en el JS del cliente.
 */
import { company, footer } from "./content";
import type { Lang } from "./i18n";

export type LegalBlock = { type: "p"; text: string } | { type: "list"; items: string[] };
export type LegalSection = { id?: string; title: string; blocks: LegalBlock[] };
export type LegalPage = {
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

const p = (text: string): LegalBlock => ({ type: "p", text });
const list = (...items: string[]): LegalBlock => ({ type: "list", items });

const { legalName, tradeName, ruc } = company;
const email = footer.email;

const es: LegalPage = {
  title: "Política de privacidad y cookies",
  description:
    "Qué datos personales recoge la web de Wuality, para qué los usa, con quién los comparte, cómo ejercer tus derechos y qué cookies usa.",
  updated: "Última actualización: 28 de octubre de 2026",
  intro:
    "En Wuality cuidamos los datos que nos confías. Esta política explica qué datos personales recogemos en este sitio web, para qué los usamos, con quién los compartimos y cómo puedes ejercer tus derechos, conforme a la Ley N.º 29733, Ley de Protección de Datos Personales, y su reglamento.",
  sections: [
    {
      title: "Quién es responsable de tus datos",
      blocks: [
        p(
          `El responsable del tratamiento de tus datos es ${legalName} (${tradeName}), con RUC ${ruc}, con domicilio en Lima, Perú. Para cualquier consulta sobre tus datos puedes escribirnos a ${email}.`,
        ),
      ],
    },
    {
      title: "Qué datos recogemos",
      blocks: [
        list(
          "Al agendar una reunión: tus nombres y apellidos, tu número de celular, tu correo electrónico y la fecha, la hora, la zona horaria y la plataforma (Google Meet o Zoom) que elijas.",
          "Si nos escribes por WhatsApp o por correo: los datos que incluyas en tu mensaje.",
          "En tu navegador: tu decisión sobre las cookies (ver más abajo).",
        ),
        p(
          "No te pedimos datos sensibles y este sitio no está dirigido a menores de edad. Tampoco usamos herramientas de analítica ni de publicidad.",
        ),
      ],
    },
    {
      title: "Para qué los usamos",
      blocks: [
        list(
          "Coordinar y realizar la reunión que nos pediste.",
          "Responder tus consultas y, si nos lo pides, enviarte una propuesta de servicios.",
          "Dar seguimiento a la relación comercial que surja de esa conversación.",
        ),
        p("No usamos tus datos para enviarte publicidad sin tu consentimiento y no los vendemos a nadie."),
      ],
    },
    {
      title: "Por qué podemos tratarlos",
      blocks: [
        p(
          "Tratamos tus datos con tu consentimiento, que nos das al marcar la casilla del formulario de reunión, y porque son necesarios para atender la solicitud que nos haces. Puedes retirar tu consentimiento cuando quieras, sin que eso afecte lo que hicimos antes con él.",
        ),
      ],
    },
    {
      title: "Con quién los compartimos",
      blocks: [
        p(
          "Para que la web funcione usamos proveedores que tratan datos por encargo nuestro. Algunos están fuera del Perú, por lo que tus datos pueden transferirse a otros países:",
        ),
        list(
          "FormSubmit, que nos reenvía por correo los datos del formulario de reunión.",
          "Google (Google Calendar y Google Meet), si eliges una reunión por Meet: el evento se crea en tu propia cuenta de Google con los datos que ingresaste.",
          "Zoom, si eliges esa plataforma para la reunión.",
          "Meta (WhatsApp e Instagram) y TikTok, cuando nos escribes por WhatsApp o, si aceptas las cookies, cuando ves sus publicaciones en este sitio.",
          "GitHub, que aloja este sitio y puede registrar datos técnicos de la conexión, como la dirección IP, por seguridad.",
        ),
        p("Fuera de estos casos, sólo compartiremos tus datos si una autoridad lo exige conforme a ley."),
      ],
    },
    {
      title: "Cuánto tiempo los conservamos",
      blocks: [
        p(
          "Los conservamos mientras sean necesarios para atender tu solicitud y la relación comercial que surja de ella, y después durante los plazos que exijan las normas aplicables. Si nos pides suprimirlos antes, lo haremos, salvo que una obligación legal nos lo impida.",
        ),
      ],
    },
    {
      title: "Tus derechos",
      blocks: [
        p(
          `Puedes ejercer en cualquier momento tus derechos de información, acceso, rectificación, cancelación y oposición (derechos ARCO), y revocar tu consentimiento, escribiendo a ${email} con el asunto «Protección de datos», tu nombre y lo que solicitas. Te responderemos dentro de los plazos que fija la ley.`,
        ),
        p(
          "Si consideras que no atendimos tu solicitud, puedes presentar una reclamación ante la Autoridad Nacional de Protección de Datos Personales del Ministerio de Justicia y Derechos Humanos.",
        ),
      ],
    },
    {
      title: "Cómo los protegemos",
      blocks: [
        p(
          "El sitio funciona con conexión cifrada (HTTPS), así que los datos que envías viajan protegidos, y el acceso a las solicitudes se limita al equipo que las atiende.",
        ),
      ],
    },
    {
      id: "cookies",
      title: "Cookies y almacenamiento en tu navegador",
      blocks: [
        list(
          "Este sitio no usa cookies propias de analítica ni de publicidad.",
          "Guardamos tu decisión sobre las cookies en el almacenamiento de tu navegador (localStorage), para no volver a preguntarte en cada visita.",
          "Si aceptas, cargamos las publicaciones de TikTok e Instagram de la sección «Últimos posts». Esas plataformas pueden usar sus propias cookies, según sus políticas de privacidad. Si rechazas, no se cargan.",
        ),
        p("Puedes cambiar tu decisión cuando quieras desde «Cookies», en el pie de página."),
      ],
    },
    {
      title: "Cambios en esta política",
      blocks: [
        p("Si cambiamos esta política, publicaremos la nueva versión en esta página con su fecha de actualización."),
      ],
    },
  ],
};

const en: LegalPage = {
  title: "Privacy and cookie policy",
  description:
    "What personal data the Wuality website collects, what it is used for, who it is shared with, how to exercise your rights and which cookies it uses.",
  updated: "Last updated: October 28, 2026",
  intro:
    "At Wuality we take care of the data you entrust to us. This policy explains what personal data we collect on this website, what we use it for, who we share it with and how you can exercise your rights, in accordance with Peru's Personal Data Protection Law (Law No. 29733) and its regulations.",
  sections: [
    {
      title: "Who is responsible for your data",
      blocks: [
        p(
          `The data controller is ${legalName} (${tradeName}), taxpayer ID (RUC) ${ruc}, based in Lima, Peru. For any question about your data you can write to us at ${email}.`,
        ),
      ],
    },
    {
      title: "What data we collect",
      blocks: [
        list(
          "When you book a meeting: your full name, mobile number, email address and the date, time, time zone and platform (Google Meet or Zoom) you choose.",
          "If you write to us on WhatsApp or by email: the data you include in your message.",
          "In your browser: your cookie choice (see below).",
        ),
        p(
          "We don't ask for sensitive data and this site is not aimed at minors. We don't use any analytics or advertising tools either.",
        ),
      ],
    },
    {
      title: "What we use it for",
      blocks: [
        list(
          "To arrange and hold the meeting you asked for.",
          "To answer your questions and, if you ask us to, send you a service proposal.",
          "To follow up on the business relationship that comes out of that conversation.",
        ),
        p("We don't use your data to send you advertising without your consent and we don't sell it to anyone."),
      ],
    },
    {
      title: "Why we can process it",
      blocks: [
        p(
          "We process your data with your consent, which you give by ticking the box in the meeting form, and because it is needed to handle your request. You can withdraw your consent at any time, without affecting what we did with it before.",
        ),
      ],
    },
    {
      title: "Who we share it with",
      blocks: [
        p(
          "To run the website we use providers that process data on our behalf. Some of them are outside Peru, so your data may be transferred to other countries:",
        ),
        list(
          "FormSubmit, which forwards the meeting form data to our inbox by email.",
          "Google (Google Calendar and Google Meet), if you choose a Meet meeting: the event is created in your own Google account with the details you entered.",
          "Zoom, if you choose that platform for the meeting.",
          "Meta (WhatsApp and Instagram) and TikTok, when you message us on WhatsApp or, if you accept cookies, when you view their posts on this site.",
          "GitHub, which hosts this site and may log technical connection data, such as your IP address, for security.",
        ),
        p("Other than that, we will only share your data if an authority requires it by law."),
      ],
    },
    {
      title: "How long we keep it",
      blocks: [
        p(
          "We keep it for as long as it is needed to handle your request and the business relationship that comes out of it, and afterwards for the periods required by applicable law. If you ask us to delete it sooner, we will, unless a legal obligation prevents us.",
        ),
      ],
    },
    {
      title: "Your rights",
      blocks: [
        p(
          `You can exercise your rights of information, access, rectification, cancellation and objection (ARCO rights) and withdraw your consent at any time by writing to ${email} with the subject “Data protection”, your name and your request. We will reply within the time limits set by law.`,
        ),
        p(
          "If you feel we didn't handle your request properly, you can file a complaint with Peru's National Authority for Personal Data Protection, part of the Ministry of Justice and Human Rights.",
        ),
      ],
    },
    {
      title: "How we protect it",
      blocks: [
        p(
          "The site runs over an encrypted connection (HTTPS), so the data you send travels protected, and access to requests is limited to the team that handles them.",
        ),
      ],
    },
    {
      id: "cookies",
      title: "Cookies and browser storage",
      blocks: [
        list(
          "This site doesn't use its own analytics or advertising cookies.",
          "We store your cookie choice in your browser's storage (localStorage), so we don't ask you again on every visit.",
          "If you accept, we load the TikTok and Instagram posts in the “Latest posts” section. Those platforms may use their own cookies, under their privacy policies. If you reject, they aren't loaded.",
        ),
        p("You can change your choice at any time from “Cookies” in the footer."),
      ],
    },
    {
      title: "Changes to this policy",
      blocks: [p("If we change this policy, we will publish the new version on this page with its update date.")],
    },
  ],
};

export const privacyPolicy: Record<Lang, LegalPage> = { es, en };
