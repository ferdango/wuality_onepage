import Link from "next/link";
import Image from "@/components/ui/Img";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";
import type { BlogItem } from "@/lib/content";
import type { ArticleBlock } from "@/lib/blog";
import { blogPath, fill, getContent, localePath, projectPath, type Content, type Lang } from "@/lib/i18n";
import { abs, articleProject, isoDate } from "@/lib/seo";
import { articleBody } from "@/lib/articles";

/**
 * Página de artículo, con la estructura de los de ustwo (Insights), IDEO o
 * frog: cabecera amplia con la categoría, el titular, la entradilla y la
 * firma; portada a lo ancho; el texto en una columna de lectura con el índice
 * y el compartir fijos a su lado; la conclusión destacada; y al cierre las
 * etiquetas, el proyecto del que habla, el autor y una llamada a la acción.
 *
 * Tipografía pensada para leer: cuerpo de 17 a 20px con interlineado amplio,
 * unos 70 caracteres por línea en la columna de 720px, y la entradilla siempre
 * por encima del cuerpo. Cada `clamp` crece con la pantalla y se detiene en su
 * tope: la columna no crece, así que la letra tampoco debe seguir creciendo.
 */
const WRAP = "mx-auto w-full max-w-[1280px] px-[var(--gutter)]";
const RADIUS = "rounded-[clamp(16px,1.7vw,32px)]";

const T = {
  crumb: "text-[length:clamp(0.875rem,0.8rem_+_0.2vw,1rem)]",
  title: "text-[length:clamp(2rem,1.1rem_+_3.4vw,4.25rem)]",
  meta: "text-[length:0.875rem]",
  lead: "text-[length:clamp(1.125rem,1rem_+_0.55vw,1.5rem)]",
  body: "text-[length:clamp(1.0625rem,0.95rem_+_0.35vw,1.25rem)]",
  h2: "text-[length:clamp(1.375rem,1.1rem_+_0.9vw,1.875rem)]",
};

/** Minutos de lectura a 200 palabras por minuto, redondeando hacia arriba. */
function readingMinutes(body: ArticleBlock[]) {
  const words = body.reduce((n, b) => n + b.text.split(/\s+/).filter(Boolean).length, 0);
  return Math.max(1, Math.ceil(words / 200));
}

/** "Lo que nos llevamos" → "lo-que-nos-llevamos": ancla de cada sección para el índice. */
const anchor = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

type Section = { title: string; id: string; blocks: ArticleBlock[] };

/** Separa la introducción (lo que va antes del primer subtítulo) de las secciones. */
function sectionsOf(body: ArticleBlock[]) {
  const intro: ArticleBlock[] = [];
  const sections: Section[] = [];
  for (const block of body) {
    if (block.type === "h2") sections.push({ title: block.text, id: anchor(block.text), blocks: [] });
    else (sections.at(-1)?.blocks ?? intro).push(block);
  }
  return { intro, sections };
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
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 ${centered ? "justify-center" : ""}`}>
      <span className="flex items-center gap-2.5">
        <Image src={item.author.avatar} alt="" width={32} height={32} className="size-8 rounded-full object-cover" />
        <span className={`${T.meta} font-semibold text-bone`}>{item.author.name}</span>
      </span>
      <span aria-hidden className="h-4 w-px bg-line max-sm:hidden" />
      {/* Fecha y lectura van juntas: si no caben, bajan de renglón las dos, sin dejar un separador suelto. */}
      <span className={`${T.meta} text-ash`}>
        {/* La fecha escrita en el idioma de la página; el 26/08/2026 se leía al revés en inglés. */}
        <time dateTime={isoDate(item.publishedAt)}>{item.date}</time>
        {minutes && <> · {minutes}</>}
      </span>
    </div>
  );
}

/** Botones de compartir: en columna junto al texto en desktop, en fila al final en móvil. */
function Share({ t, url, title, className = "" }: { t: Content; url: string; title: string; className?: string }) {
  return (
    <div className={className}>
      <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-muted">{t.blog.share}</p>
      <ul className="mt-3 flex gap-2.5">
        {SHARE.map((s) => (
          <li key={s.label}>
            <a
              href={s.href(url, title)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={fill(t.ui.blog.shareOn, { red: s.label })}
              className={`flex size-11 items-center justify-center rounded-full border transition-transform duration-400 ease-wuality hover:scale-105 ${
                s.accent ? "border-white/30 bg-[#2f9442]" : "border-line bg-surface hover:border-bone/40"
              }`}
            >
              <Image src={s.icon} alt="" width={32} height={32} className="size-[46%]" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Paragraphs({ blocks, className }: { blocks: ArticleBlock[]; className?: string }) {
  return (
    <>
      {blocks.map((b, i) => (
        <p key={i} className={className}>
          {b.text}
        </p>
      ))}
    </>
  );
}

export default function Article({ item, next, lang }: { item: BlogItem; next: BlogItem; lang: Lang }) {
  const t = getContent(lang);
  const project = articleProject(item, lang);
  const url = abs(blogPath(lang, item.slug));
  if (item.type === "video") {
    const COL = "mx-auto w-full max-w-[calc(1080px+2*var(--gutter))] px-[var(--gutter)]";
    return (
      <article className="pb-0 pt-[calc(var(--header-h)+clamp(32px,5.3vw,80px))]">
        <Reveal className={`${COL} flex flex-col items-center gap-1 text-center`}>
          <Crumb category={item.category} lang={lang} centered />
          <h1 className={`${T.title} font-extrabold leading-tight text-white`}>{item.title}</h1>
          <div className="mt-4">
            <Byline item={item} centered />
          </div>
        </Reveal>

        <div className={`${COL} mt-[clamp(24px,2.6vw,40px)]`}>
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
  const { intro, sections } = sectionsOf(body);
  // La última sección es la conclusión ("Lo que nos llevamos"): va destacada.
  const closing = sections.length > 1 ? sections.at(-1) : undefined;
  const middle = closing ? sections.slice(0, -1) : sections;
  const tags = [...new Set([item.category, ...(project?.tags ?? [])])];
  const text = `${T.body} leading-[1.75] text-bone/80`;

  return (
    <article className="pb-[clamp(40px,5vw,96px)] pt-[calc(var(--header-h)+clamp(32px,5.3vw,80px))]">
      {/* Cabecera */}
      <Reveal className={`${WRAP} flex flex-col gap-[clamp(16px,1.6vw,28px)]`}>
        <Crumb category={item.category} lang={lang} />
        <h1 className={`${T.title} max-w-[22ch] text-balance font-extrabold leading-[1.06] tracking-[-0.025em] text-white`}>
          {item.title}
        </h1>
        <p className={`${T.lead} max-w-[60ch] leading-[1.55] text-bone/85`}>{item.lead}</p>
        <div className="mt-2 border-t border-line pt-[clamp(16px,1.6vw,24px)]">
          <Byline item={item} minutes={minutes} />
        </div>
      </Reveal>

      {/* Portada a lo ancho */}
      <Reveal className="mx-auto mt-[clamp(28px,3.4vw,64px)] w-full max-w-[1440px] px-[clamp(12px,2.5vw,48px)]">
        <div className={`relative aspect-[16/9] w-full overflow-hidden ${RADIUS} max-md:aspect-[4/3]`}>
          <Image src={item.image} alt={item.title} fill priority sizes="(max-width: 1440px) 100vw, 1400px" className="object-cover" />
        </div>
      </Reveal>

      {/* Texto, con el índice y el compartir fijos a su lado */}
      <div className={`${WRAP} mt-[clamp(40px,4.6vw,88px)] grid gap-[clamp(28px,4vw,80px)] lg:grid-cols-[minmax(180px,240px)_minmax(0,720px)] lg:justify-between`}>
        <aside className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+32px)] flex flex-col gap-10">
            {sections.length > 1 && (
              <nav aria-label={t.ui.blog.toc}>
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-muted">{t.ui.blog.toc}</p>
                <ol className="mt-4 flex flex-col gap-3 border-l border-line">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="-ml-px block border-l border-transparent pl-4 text-[0.9375rem] leading-snug text-ash transition-colors duration-300 hover:border-red hover:text-bone"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <Share t={t} url={url} title={item.title} />
          </div>
        </aside>

        <div className="min-w-0">
          {/* En móvil el índice va plegado al principio del texto. */}
          {sections.length > 1 && (
            <details className="group mb-8 rounded-2xl border border-line px-5 py-4 lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-ash">
                {t.ui.blog.toc}
                <span aria-hidden className="text-lg leading-none transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <ol className="mt-4 flex flex-col gap-3">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="flex gap-3 text-[0.9375rem] leading-snug text-bone">
                      <span className="tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          )}

          <div className="flex flex-col gap-[1.1em]">
            {/* El primer párrafo, algo más grande: abre la lectura. */}
            {intro.map((b, i) => (
              <p key={i} className={i === 0 ? `${T.lead} leading-[1.65] text-bone` : text}>
                {b.text}
              </p>
            ))}

            {middle.map((s) => (
              <section key={s.id} aria-labelledby={s.id} className="flex flex-col gap-[1.1em]">
                <h2 id={s.id} className={`${T.h2} mt-[0.8em] scroll-mt-[calc(var(--header-h)+24px)] text-balance font-bold leading-[1.25] text-bone`}>
                  {s.title}
                </h2>
                <Paragraphs blocks={s.blocks} className={text} />
              </section>
            ))}
          </div>

          {/* Conclusión destacada, como los "Key takeaways" de IDEO o Huge */}
          {closing && (
            <section
              aria-labelledby={closing.id}
              className="relative mt-[clamp(32px,3.4vw,56px)] overflow-hidden rounded-[clamp(16px,1.6vw,28px)] border border-line bg-surface p-[clamp(22px,2.6vw,44px)]"
            >
              <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[radial-gradient(circle,rgba(244,37,48,0.35),transparent_70%)] blur-2xl" />
              <h2 id={closing.id} className={`${T.h2} relative flex scroll-mt-[calc(var(--header-h)+24px)] items-center gap-3 font-bold leading-[1.25] text-bone`}>
                <span aria-hidden className="size-3 shrink-0 rounded-full bg-red" />
                {closing.title}
              </h2>
              <div className="relative mt-4 flex flex-col gap-[1.1em]">
                <Paragraphs blocks={closing.blocks} className={`${T.body} leading-[1.7] text-bone/90`} />
              </div>
            </section>
          )}

          {/* Etiquetas */}
          <ul className="mt-[clamp(28px,3vw,48px)] flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag} className="rounded-full border border-bone/20 px-4 py-1.5 text-[length:var(--fs-xs)] text-ash">
                {tag}
              </li>
            ))}
          </ul>

          <Share t={t} url={url} title={item.title} className="mt-8 lg:hidden" />

          {/* Autor */}
          <div className="mt-[clamp(28px,3vw,48px)] flex items-start gap-4 border-t border-line pt-[clamp(20px,2vw,32px)]">
            <Image src={item.author.avatar} alt="" width={56} height={56} className="size-14 shrink-0 rounded-full object-cover" />
            <div>
              <p className="text-[length:var(--fs-sm)] font-semibold text-bone">{item.author.name}</p>
              <p className="mt-0.5 text-[0.8125rem] uppercase tracking-[0.14em] text-muted">{t.hero.eyebrow[0]}</p>
              <p className="mt-2 max-w-[52ch] text-[length:var(--fs-sm)] leading-relaxed text-ash">{t.ui.blog.authorBio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* El caso del que habla el artículo */}
      {project && (
        <Reveal className={`${WRAP} mt-[clamp(48px,5.2vw,100px)]`}>
          <Link
            href={projectPath(lang, project.slug)}
            className={`group grid overflow-hidden ${RADIUS} border border-line bg-surface transition-colors duration-500 hover:border-bone/30 md:grid-cols-[1.1fr_1fr]`}
          >
            <span className="relative block aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[340px]" style={{ backgroundColor: project.bg }}>
              <Image
                src={project.shot}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 640px"
                className="object-cover transition-transform duration-700 ease-wuality group-hover:scale-105"
              />
            </span>
            <span className="flex flex-col justify-center gap-4 p-[clamp(24px,3vw,56px)]">
              <span className="text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-muted">
                {t.ui.blog.project} · {project.sector}
              </span>
              <span className="text-[clamp(1.75rem,2.6vw,3rem)] font-bold leading-none tracking-[-0.02em] text-bone">{project.name}</span>
              <span className="text-[length:var(--fs-body)] leading-snug text-ash">{project.headline}.</span>
              <span className="mt-2 inline-flex items-center gap-2 text-[length:var(--fs-sm)] font-semibold text-sky">
                {t.ui.blog.seeCase}
                <span aria-hidden className="transition-transform duration-400 ease-wuality group-hover:translate-x-1">→</span>
              </span>
            </span>
          </Link>
        </Reveal>
      )}

      {/* Llamada a la acción y siguiente artículo */}
      <Reveal className={`${WRAP} mt-[clamp(14px,1.5vw,28px)]`}>
        <div className={`flex flex-col gap-6 ${RADIUS} bg-bone p-[clamp(24px,3vw,56px)] text-ink md:flex-row md:items-end md:justify-between`}>
          <div>
            <Eyebrow tone="dark">{t.ui.blog.ctaTitle}</Eyebrow>
            <p className="mt-3 max-w-[36ch] text-balance text-[clamp(1.5rem,2.2vw,2.5rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
              {t.ui.blog.ctaBody}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href={`${localePath(lang, "/")}#contacto`}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[length:var(--fs-sm)] font-semibold text-bone transition-colors duration-300 hover:bg-card"
            >
              {t.ui.header.cta}
              <span aria-hidden>→</span>
            </Link>
            <Link
              href={blogPath(lang, next.slug)}
              className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-6 py-3.5 text-[length:var(--fs-sm)] font-semibold transition-colors duration-300 hover:border-ink"
            >
              {t.blog.next}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </Reveal>
    </article>
  );
}
