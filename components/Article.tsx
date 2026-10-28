import Link from "next/link";
import Image from "@/components/ui/Img";
import Reveal from "./ui/Reveal";
import type { BlogItem } from "@/lib/content";
import type { ArticleBlock } from "@/lib/blog";
import { blogPath, fill, getContent, localePath, projectPath, type Content, type Lang } from "@/lib/i18n";
import { abs, articleProject, isoDate } from "@/lib/seo";
import { articleBody } from "@/lib/articles";

/**
 * Columna de lectura. El gutter va por fuera del ancho máximo —de ahí el
 * `calc`—: metiéndolo dentro, como hace `.shell`, el padding se comía parte de
 * los 768px del Figma y el texto salía bastante más estrecho de lo diseñado.
 *
 * El ancho va en estilo en línea y no en una clase: Tailwind sólo genera las
 * clases que encuentra escritas literalmente en el código, así que un
 * `max-w-[calc(...)]` compuesto en tiempo de ejecución no llega nunca al CSS.
 */
const COL = "mx-auto w-full px-[var(--gutter)]";
const colMax = (max: number) => ({ maxWidth: `calc(${max}px + 2 * var(--gutter))` });

/**
 * Las dos maquetas de artículo del Figma ("Single Article Text" y "Single
 * Article Video") comparten cabecera, así que sólo cambia el cuerpo.
 *
 * Escala pensada para leer, no la del frame del Figma (que llevaba el cuerpo a
 * 24px y la entradilla por debajo, a 18px): cuerpo de 17 a 20px con interlineado
 * amplio, que en la columna de 768px da unos 70 caracteres por línea, y la
 * entradilla siempre por encima del cuerpo. Cada `clamp` crece con la pantalla
 * de forma suave y se detiene en su tope; la columna no crece, así que la
 * tipografía tampoco debe seguir creciendo.
 */
const T = {
  crumb: "text-[length:clamp(0.875rem,0.8rem_+_0.2vw,1rem)]",
  title: "text-[length:clamp(1.875rem,1.2rem_+_2.4vw,3rem)]",
  meta: "text-[length:0.875rem]",
  lead: "text-[length:clamp(1.125rem,1rem_+_0.45vw,1.375rem)]",
  body: "text-[length:clamp(1.0625rem,0.95rem_+_0.35vw,1.25rem)]",
  h2: "text-[length:clamp(1.375rem,1.1rem_+_0.9vw,1.875rem)]",
};

/** Minutos de lectura a 200 palabras por minuto, redondeando hacia arriba. */
function readingMinutes(body: ArticleBlock[]) {
  const words = body.reduce((n, b) => n + b.text.split(/\s+/).filter(Boolean).length, 0);
  return Math.max(1, Math.ceil(words / 200));
}

/** Enlace de cada red para compartir la URL del artículo con su título. */
const SHARE = [
  {
    label: "WhatsApp",
    icon: "/media/ui/share-whatsapp.svg",
    accent: true,
    href: (url: string, title: string) => `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  },
  {
    label: "Facebook",
    icon: "/media/ui/share-facebook.svg",
    href: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    label: "X",
    icon: "/media/ui/share-x.svg",
    href: (url: string, title: string) =>
      `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    label: "LinkedIn",
    icon: "/media/ui/share-linkedin.svg",
    href: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
];

function Crumb({ category, lang, centered = false }: { category: string; lang: Lang; centered?: boolean }) {
  return (
    <Link
      href={`${localePath(lang, "/")}#blog`}
      className={`group inline-flex items-center gap-1 ${T.crumb} font-medium text-[#ffc107] transition-opacity duration-300 hover:opacity-80 ${
        centered ? "mx-auto" : ""
      }`}
    >
      {/* El icono del Figma es una flecha hacia arriba; el diseño la gira para que apunte a la izquierda. */}
      <Image
        src="/media/ui/arrow-up-yellow.svg"
        alt=""
        width={24}
        height={24}
        className="size-6 -rotate-90 transition-transform duration-400 ease-wuality group-hover:-translate-x-1"
      />
      {category}
    </Link>
  );
}

function Byline({ item, minutes, centered = false }: { item: BlogItem; minutes?: string; centered?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${centered ? "justify-center" : ""}`}>
      <span className="flex items-center gap-2">
        <Image
          src={item.author.avatar}
          alt=""
          width={24}
          height={24}
          className="size-6 rounded-full object-cover"
        />
        <span className={`${T.meta} font-medium text-[#ff8427]`}>{item.author.name}</span>
      </span>
      {/* La fecha escrita en el idioma de la página; el 26/08/2026 se leía al revés en inglés. */}
      <time dateTime={isoDate(item.publishedAt)} className={`${T.meta} font-medium text-[#f7fff7]`}>
        {item.date}
      </time>
      {minutes && <span className={`${T.meta} text-[rgba(247,255,247,0.7)]`}>{minutes}</span>}
    </div>
  );
}

/** Columna de compartir del Figma: vertical en desktop, en fila bajo la foto en móvil. */
function ShareRail({ t, url, title }: { t: Content; url: string; title: string }) {
  return (
    <aside className="flex shrink-0 flex-row items-center gap-4 lg:w-[66px] lg:flex-col">
      <p className="text-[0.875rem] text-[rgba(247,255,247,0.85)]">{t.blog.share}</p>
      <ul className="flex flex-row gap-3 lg:flex-col">
        {SHARE.map((s) => (
          <li key={s.label}>
            <a
              href={s.href(url, title)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={fill(t.ui.blog.shareOn, { red: s.label })}
              className={`flex size-[clamp(48px,4.2vw,64px)] items-center justify-center rounded-[32px] border transition-transform duration-400 ease-wuality hover:scale-105 ${
                s.accent
                  ? "border-[rgba(247,255,247,0.4)] bg-[#2f9442]"
                  : "border-[rgba(247,255,247,0.24)] bg-[#212b28]"
              }`}
            >
              <Image src={s.icon} alt="" width={32} height={32} className="size-[50%]" />
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default function Article({ item, next, lang }: { item: BlogItem; next: BlogItem; lang: Lang }) {
  const t = getContent(lang);
  const project = articleProject(item, lang);
  const url = abs(blogPath(lang, item.slug));
  if (item.type === "video") {
    return (
      <article className="pb-0 pt-[calc(var(--header-h)+clamp(32px,5.3vw,80px))]">
        <Reveal className={`${COL} flex flex-col items-center gap-1 text-center`} style={colMax(1080)}>
          <Crumb category={item.category} lang={lang} centered />
          <h1 className={`${T.title} font-extrabold leading-tight text-white`}>{item.title}</h1>
          <div className="mt-4">
            <Byline item={item} centered />
          </div>
        </Reveal>

        <div className={`${COL} mt-[clamp(24px,2.6vw,40px)]`} style={colMax(1080)}>
          {/**
           * La miniatura abre el vídeo en su plataforma: el Figma sólo define el
           * fotograma con el botón de play encima, no un reproductor embebido.
           */}
          <a
            href={item.video}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={fill(t.ui.blog.watch, { title: item.title })}
            className="group relative block aspect-[1024/580] w-full overflow-hidden rounded-[clamp(16px,2.1vw,32px)]"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 1080px) 100vw, 1024px"
              className="object-cover transition-transform duration-700 ease-wuality group-hover:scale-105"
              priority
            />
            <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[12px] border-[rgba(244,244,244,0.32)] bg-white transition-transform duration-400 ease-wuality group-hover:scale-110">
              <Image src="/media/ui/play.svg" alt="" width={24} height={24} className="size-6" />
            </span>
          </a>
        </div>
      </article>
    );
  }

  const body = articleBody(item.slug, lang);
  const minutes = fill(t.ui.blog.readingTime, { min: readingMinutes(body) });

  return (
    <article className="pb-0 pt-[calc(var(--header-h)+clamp(32px,5.3vw,80px))]">
      <Reveal className={`${COL} flex flex-col gap-4`} style={colMax(768)}>
        <Crumb category={item.category} lang={lang} />
        <h1 className={`${T.title} text-balance font-extrabold leading-[1.15] tracking-[-0.01em] text-white`}>
          {item.title}
        </h1>
        <Byline item={item} minutes={minutes} />
        <p className={`${T.lead} mt-1 leading-[1.6] text-[rgba(247,255,247,0.9)]`}>{item.lead}</p>
      </Reveal>

      <div className={`${COL} mt-[clamp(24px,2.6vw,40px)]`} style={colMax(768)}>
        <div className="relative aspect-[768/420] w-full overflow-hidden rounded-[clamp(16px,2.1vw,32px)]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div
        className={`${COL} mt-[clamp(24px,2.6vw,40px)] flex flex-col gap-[clamp(20px,2.6vw,40px)] lg:flex-row lg:items-start lg:gap-10`}
        style={colMax(768)}
      >
        <ShareRail t={t} url={url} title={item.title} />

        <div className="flex flex-1 flex-col items-end gap-[clamp(24px,2.6vw,40px)]">
          <div
            className={`flex w-full flex-col gap-[1.1em] ${T.body} leading-[1.75] text-[rgba(247,255,247,0.82)]`}
          >
            {body.map((block, i) =>
              block.type === "h2" ? (
                // Más aire encima que debajo: el subtítulo se lee con el párrafo que abre.
                <h2 key={i} className={`${T.h2} mt-[0.6em] text-balance font-bold leading-[1.25] text-[#f7fff7]`}>
                  {block.text}
                </h2>
              ) : (
                <p key={i}>{block.text}</p>
              ),
            )}
          </div>

          {/* En móvil ocupan el ancho, uno bajo otro; desde sm, en fila a la derecha. */}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-end">
            {/* El caso de la cartera del que habla el artículo. */}
            {project && (
              <Link
                href={projectPath(lang, project.slug)}
                className="flex h-12 items-center justify-center rounded-lg border border-bone/40 px-4 py-3 text-[0.875rem] font-bold text-bone transition-colors duration-400 hover:border-bone hover:bg-bone/10"
              >
                {fill(t.ui.projects.open, { name: project.name })}
              </Link>
            )}
            <Link
              href={blogPath(lang, next.slug)}
              className="group flex h-12 items-center justify-center gap-3 rounded-lg border border-bone px-4 py-3 text-[0.875rem] font-bold text-bone transition-colors duration-400 hover:bg-bone/10"
            >
              {t.blog.next}
              <Image
                src="/media/ui/next-line.svg"
                alt=""
                width={16}
                height={16}
                className="size-4 transition-transform duration-400 ease-wuality group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
