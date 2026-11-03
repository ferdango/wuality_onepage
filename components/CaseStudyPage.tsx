import Link from "next/link";
import Image from "@/components/ui/Img";
import Eyebrow from "./ui/Eyebrow";
import Reveal from "./ui/Reveal";
import type { projects } from "@/lib/content";
import { caseDetail, type GalleryItem, type Shot } from "@/lib/cases";
import { blogPath, getContent, projectPath, type Lang } from "@/lib/i18n";

type Project = (typeof projects)[number];

/**
 * Página de caso, con la estructura de los casos de ustwo, Huge o Clay:
 *
 *   portada → nombre, titular y ficha → claves del proyecto → el reto y cómo
 *   lo resolvimos → galería (las webs en su navegador o su teléfono, sobre el
 *   color de la marca) intercalada con los capítulos y su alcance → la frase
 *   de la marca → paleta → cita (si está aprobada) → el artículo del blog
 *   sobre el caso → siguiente caso.
 *
 * Sólo se pinta lo que hay: sin paleta, frase o cita, esos bloques no salen.
 * El contenido ampliado vive en lib/cases.ts.
 */

/** Contenedor de lectura y ancho de los bloques visuales (casi a sangre). */
const WRAP = "mx-auto w-full max-w-[1600px] px-[var(--gutter)]";
const WIDE = "mx-auto w-full max-w-[1600px] px-[clamp(12px,2.5vw,48px)]";
const RADIUS = "rounded-[clamp(16px,1.7vw,32px)]";

const number = (i: number) => String(i + 1).padStart(2, "0");

/** Cuántas piezas llenan la primera fila de la galería (una a lo ancho o dos medias). */
function firstRow(items: GalleryItem[]) {
  let cols = 0;
  let n = 0;
  for (const item of items) {
    cols += item.layout === "full" ? 2 : 1;
    n++;
    if (cols >= 2) break;
  }
  return n;
}

/** Etiqueta de dato. `span` cuando va dentro de un enlace o de otro texto. */
function Label({ children, as: Tag = "p" }: { children: React.ReactNode; as?: "p" | "span" }) {
  return (
    <Tag className="block text-[clamp(11px,0.73vw,14px)] font-semibold uppercase tracking-[0.12em] text-muted">{children}</Tag>
  );
}

/* ------------------------------------------------------------------------ */
/* Galería                                                                   */
/* ------------------------------------------------------------------------ */

/** Ventana de navegador alrededor de una captura de escritorio. */
function Browser({ shot }: { shot: Shot }) {
  return (
    <div className="overflow-hidden rounded-[clamp(8px,0.8vw,14px)] bg-[#1b1e1e] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.75)] ring-1 ring-white/10">
      <div aria-hidden className="flex h-[clamp(18px,1.6vw,28px)] items-center gap-[5px] px-[clamp(8px,0.8vw,14px)]">
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} className="size-[clamp(6px,0.5vw,9px)] rounded-full" style={{ backgroundColor: c }} />
        ))}
      </div>
      <Image src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} sizes="(max-width: 1024px) 92vw, 70vw" className="block h-auto w-full" />
    </div>
  );
}

/** Teléfono alrededor de una captura de móvil; mide lo que le dé su contenedor de alto. */
function Phone({ shot, className = "" }: { shot: Shot; className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-[clamp(18px,2vw,40px)] border-[clamp(4px,0.45vw,8px)] border-[#0d0f10] bg-black shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] ${className}`}
      style={{ aspectRatio: `${shot.w} / ${shot.h}` }}
    >
      <Image src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} sizes="(max-width: 1024px) 40vw, 22vw" className="block size-full object-cover object-top" />
    </div>
  );
}

function GalleryBlock({ item, stage }: { item: GalleryItem; stage: string }) {
  const span = item.layout === "full" ? "lg:col-span-2" : "";

  if (item.kind === "photo") {
    return (
      <Reveal className={span}>
        <figure
          className={`relative w-full overflow-hidden ${RADIUS} ${item.layout === "full" ? "aspect-[16/9] max-md:aspect-[4/3]" : "aspect-square"}`}
          style={{ backgroundColor: item.bg ?? stage }}
        >
          <Image
            src={item.shot.src}
            alt={item.shot.alt}
            fill
            sizes={item.layout === "full" ? "(max-width: 1024px) 100vw, 1500px" : "(max-width: 1024px) 100vw, 50vw"}
            className={item.contain ? "object-contain p-[6%]" : "object-cover"}
          />
        </figure>
      </Reveal>
    );
  }

  if (item.kind === "phone") {
    return (
      <Reveal className={span}>
        <div className={`relative aspect-square w-full overflow-hidden ${RADIUS}`} style={{ backgroundColor: stage }}>
          <div className="absolute inset-y-[7%] left-1/2 -translate-x-1/2">
            <Phone shot={item.shot} className="h-full" />
          </div>
        </div>
      </Reveal>
    );
  }

  // Navegador: a lo ancho con aire alrededor, o centrado en un cuadrado si va en media columna.
  return (
    <Reveal className={span}>
      <div
        className={`w-full overflow-hidden ${RADIUS} ${
          item.layout === "full"
            ? "px-[clamp(16px,8%,160px)] py-[clamp(20px,6%,110px)]"
            : "flex aspect-square items-center px-[7%]"
        }`}
        style={{ backgroundColor: stage }}
      >
        <div className="mx-auto w-full max-w-[1180px]">
          <Browser shot={item.shot} />
        </div>
      </div>
    </Reveal>
  );
}

/** Varios bloques seguidos: a dos columnas en desktop, los `full` ocupan las dos. */
function Gallery({ items, stage }: { items: GalleryItem[]; stage: string }) {
  if (!items.length) return null;
  return (
    <div className={`${WIDE} grid gap-[clamp(12px,1.25vw,24px)] lg:grid-cols-2`}>
      {items.map((item, i) => (
        <GalleryBlock key={i} item={item} stage={stage} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Página                                                                    */
/* ------------------------------------------------------------------------ */

export default function CaseStudyPage({ project, next, lang }: { project: Project; next: Project; lang: Lang }) {
  const { reviews, blog, ui } = getContent(lang);
  const t = ui.caseStudy;
  const detail = caseDetail(project.slug, lang);
  const stage = detail.stage ?? project.bg;
  // El testimonio de quien dirige la marca, si se publica (ver content.ts › reviews).
  const quote = reviews.items.find((r) => r.project === project.slug);
  // El artículo del blog que cuenta este caso.
  const article = blog.items.find((b) => b.project === project.slug);
  // La primera fila de la galería va justo después del reto; el resto, después de los capítulos.
  const split = firstRow(detail.gallery);
  const lead = detail.gallery.slice(0, split);
  const rest = detail.gallery.slice(split);

  return (
    <article className="pb-[clamp(40px,5vw,96px)] pt-[calc(var(--header-h)+clamp(8px,1vw,16px))]">
      {/* Portada */}
      <Reveal className={WIDE} y={16}>
        <div className={`relative h-[min(72svh,56vw)] w-full overflow-hidden ${RADIUS} max-md:h-[62svh]`} style={{ backgroundColor: stage }}>
          {/**
           * La captura es 4:3 y la portada mucho más apaisada, así que va en su
           * caja centrada y sus bordes se funden. Detrás, la misma captura muy
           * desenfocada: el fundido continúa los colores reales de cada borde,
           * como pasa sola en las webs de fondo liso (Grupo Tinbet), y ya no se
           * ve una banda lavada cuando el borde es una foto (Eusebio Arróniz).
           */}
          <Image src={project.shot} alt="" aria-hidden fill sizes="40vw" className="scale-125 object-cover blur-3xl" />
          <div className="absolute inset-y-0 left-1/2 aspect-[4/3] h-full -translate-x-1/2 [mask-image:linear-gradient(to_right,transparent,black_16%,black_84%,transparent)]">
            <Image src={project.shot} alt={project.name} fill priority sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" />
          </div>
        </div>
      </Reveal>

      {/* Nombre, titular, entradilla y ficha */}
      <div className={`${WRAP} mt-[clamp(48px,6vw,120px)] grid gap-[clamp(28px,4vw,80px)] lg:grid-cols-[1.15fr_1fr]`}>
        <Reveal>
          <Eyebrow tone="light">{project.sector}</Eyebrow>
          <h1 className="mt-[clamp(14px,1.4vw,24px)] text-balance text-[clamp(2.25rem,4.2vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.025em]">
            <span className="block text-muted">{project.name}.</span>
            <span className="block text-bone">{project.headline}.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col justify-end">
          <p className="text-[length:var(--fs-lead)] leading-relaxed text-bone/90">{detail.intro}</p>
          <dl className="mt-[clamp(24px,2.6vw,44px)] grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-[clamp(20px,2vw,32px)]">
            <div>
              <dt><Label>{t.client}</Label></dt>
              {/* La placa del dossier ya es el logotipo sobre su color. */}
              <dd className="mt-3">
                <Image src={project.logo} alt={project.name} className="h-[clamp(40px,3.2vw,56px)] w-auto rounded-xl" />
              </dd>
            </div>
            <div>
              <dt><Label>{t.status}</Label></dt>
              <dd className="mt-3 flex items-start gap-2 text-[clamp(1rem,1.05vw,1.25rem)] text-bone">
                <span aria-hidden className="mt-[0.45em] size-2 shrink-0 rounded-full bg-red" />
                {detail.status}
              </dd>
            </div>
            <div>
              <dt><Label>{t.sector}</Label></dt>
              <dd className="mt-3 text-[clamp(1rem,1.05vw,1.25rem)] text-bone">{project.sector}</dd>
            </div>
            {project.site && (
              <div>
                <dt><Label>{t.web}</Label></dt>
                <dd className="mt-3">
                  <a
                    href={`https://${project.site}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all text-[clamp(1rem,1.05vw,1.25rem)] text-bone underline decoration-bone/30 underline-offset-4 transition-colors duration-300 hover:text-sky hover:decoration-sky"
                  >
                    {project.site} ↗
                  </a>
                </dd>
              </div>
            )}
            <div className="col-span-2">
              <dt><Label>{t.services}</Label></dt>
              <dd className="mt-3">
                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-bone/20 px-4 py-1.5 text-[length:var(--fs-xs)] text-ash">
                      {tag}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>

      {/* Claves del proyecto: tres datos grandes, como la cifra de cliente de ustwo */}
      <div className={`${WRAP} mt-[clamp(56px,6.5vw,128px)]`}>
        <Reveal>
          <Eyebrow tone="light">{t.facts}</Eyebrow>
        </Reveal>
        <ul className="mt-[clamp(16px,1.6vw,28px)] grid gap-[clamp(20px,2.4vw,48px)] md:grid-cols-3">
          {detail.facts.map((f, i) => (
            <li key={f.label} className="border-t border-line pt-[clamp(16px,1.6vw,28px)]">
              <Reveal delay={0.06 * i}>
                <p className="text-[length:clamp(2.75rem,1.6rem_+_3.6vw,5.5rem)] font-bold leading-none tracking-[-0.035em] text-bone">
                  {f.value}
                </p>
                <p className="mt-[clamp(10px,1vw,16px)] max-w-[34ch] text-[length:var(--fs-sm)] leading-relaxed text-ash">{f.label}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {/* El reto y cómo lo resolvimos */}
      <div className={`${WRAP} mt-[clamp(56px,6.5vw,128px)] grid gap-[clamp(28px,4vw,80px)] md:grid-cols-2`}>
        {[
          { label: t.challenge, body: detail.challenge },
          { label: t.approach, body: detail.approach },
        ].map((block, i) => (
          <Reveal key={block.label} delay={0.08 * i}>
            <Eyebrow tone="light">{block.label}</Eyebrow>
            <p className="mt-[clamp(14px,1.4vw,24px)] text-[length:clamp(1.0625rem,0.95rem_+_0.45vw,1.375rem)] leading-[1.6] text-bone/85">
              {block.body}
            </p>
          </Reveal>
        ))}
      </div>

      {lead.length > 0 && (
        <div className="mt-[clamp(48px,5.2vw,100px)]">
          <Gallery items={lead} stage={stage} />
        </div>
      )}

      {/* Capítulos, numerados, con su alcance (del dossier) */}
      <div className={`${WRAP} mt-[clamp(56px,6.5vw,128px)]`}>
        {project.chapters.map((chapter, i) => (
          <Reveal key={chapter.title}>
            <section className="grid gap-[clamp(14px,2vw,40px)] border-t border-line py-[clamp(28px,3.2vw,56px)] lg:grid-cols-[1fr_1.35fr]">
              <h2 className="flex items-baseline gap-4 text-[clamp(1.5rem,2.1vw,2.5rem)] font-bold leading-tight tracking-[-0.01em] text-bone">
                <span className="text-[length:var(--fs-xs)] font-semibold tabular-nums text-red">{number(i)}</span>
                {chapter.title}
              </h2>
              <div>
                <p className="text-[length:clamp(1.0625rem,0.95rem_+_0.45vw,1.375rem)] leading-[1.6] text-bone/85">{chapter.body}</p>
                {(detail.scope[i]?.length ?? 0) > 0 && (
                  <>
                    <div className="mt-[clamp(18px,1.8vw,28px)]">
                      <Label>{t.scope}</Label>
                    </div>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {detail.scope[i].map((s) => (
                        <li key={s} className="rounded-full bg-card px-4 py-1.5 text-[length:var(--fs-xs)] text-bone">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </section>
          </Reveal>
        ))}
      </div>

      {/* La frase de la marca (o el titular del caso), sobre su color de acento */}
      <Reveal className={`${WIDE} mt-[clamp(24px,3vw,56px)]`}>
        <div
          className={`flex min-h-[clamp(320px,34vw,620px)] w-full flex-col justify-between gap-10 ${RADIUS} p-[clamp(24px,4vw,80px)] text-ink`}
          style={{ backgroundColor: project.accent }}
        >
          <p className="max-w-[18ch] text-balance text-[clamp(2rem,5vw,6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
            {detail.tagline ? `“${detail.tagline.replace(/\.$/, "")}.”` : project.headline}
          </p>
          <Image src={project.logo} alt={project.name} className="h-[clamp(40px,4vw,76px)] w-fit rounded-[clamp(8px,0.7vw,14px)]" />
        </div>
      </Reveal>

      {rest.length > 0 && (
        <div className="mt-[clamp(12px,1.25vw,24px)]">
          <Gallery items={rest} stage={stage} />
        </div>
      )}

      {/* Paleta de la marca, tal como viene en el dossier */}
      {detail.palette && (
        <div className={`${WRAP} mt-[clamp(56px,6.5vw,128px)]`}>
          <Reveal>
            <Eyebrow tone="light">{t.palette}</Eyebrow>
          </Reveal>
          <ul className="mt-[clamp(16px,1.6vw,28px)] grid grid-cols-3 gap-[clamp(10px,1vw,20px)] sm:grid-cols-6">
            {detail.palette.map((hex, i) => (
              <li key={hex}>
                <Reveal delay={0.04 * i}>
                  <span
                    aria-hidden
                    className="block aspect-[4/5] w-full rounded-[clamp(12px,1.2vw,22px)] ring-1 ring-inset ring-white/10"
                    style={{ backgroundColor: hex }}
                  />
                  <span className="mt-2 block font-mono text-[length:var(--fs-xs)] uppercase text-ash">{hex}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cita del cliente, si está aprobada (en desarrollo se ven los borradores) */}
      {quote && (
        <Reveal className={`${WRAP} mt-[clamp(56px,6.5vw,128px)]`}>
          <figure className="max-w-[880px]">
            <blockquote className="text-[clamp(1.375rem,1.9vw,2.25rem)] font-semibold leading-[1.3] tracking-[-0.01em] text-bone">
              {quote.quote}
            </blockquote>
            <figcaption className="mt-[clamp(18px,1.7vw,32px)] flex items-center gap-4">
              {/* La ficha de la marca en lugar de una foto: el logo sobre su color. */}
              <span className="relative block size-[clamp(44px,3vw,56px)] shrink-0 overflow-hidden rounded-xl" style={{ backgroundColor: project.bg }}>
                <Image src={project.logo} alt="" fill sizes="56px" className="object-contain p-1" />
              </span>
              <span>
                <span className="block text-[clamp(1rem,1vw,1.125rem)] font-semibold text-bone">{quote.name || reviews.pendingName}</span>
                <span className="block text-[clamp(0.9375rem,0.95vw,1.0625rem)] text-muted">{quote.role}</span>
                {!quote.approved && <span className="mt-1 block text-[0.8125rem] font-semibold text-yellow">{reviews.draft}</span>}
              </span>
            </figcaption>
          </figure>
        </Reveal>
      )}

      {/* El artículo del blog sobre este caso */}
      {article && (
        <Reveal className={`${WRAP} mt-[clamp(56px,6.5vw,128px)]`}>
          <Link
            href={blogPath(lang, article.slug)}
            className={`group grid overflow-hidden ${RADIUS} border border-line bg-surface transition-colors duration-500 hover:border-bone/30 md:grid-cols-[1fr_1.1fr]`}
          >
            <span className="relative block aspect-[16/11] overflow-hidden md:aspect-auto md:min-h-[320px]">
              <Image
                src={article.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover transition-transform duration-700 ease-wuality group-hover:scale-105"
              />
            </span>
            <span className="flex flex-col justify-center gap-4 p-[clamp(24px,3vw,56px)]">
              <Label as="span">{t.related} · {article.category}</Label>
              <span className="text-balance text-[clamp(1.375rem,1.9vw,2.25rem)] font-bold leading-tight tracking-[-0.015em] text-bone">
                {article.title}
              </span>
              {article.lead && <span className="text-[length:var(--fs-sm)] leading-relaxed text-ash">{article.lead}</span>}
              <span className="mt-2 inline-flex items-center gap-2 text-[length:var(--fs-sm)] font-semibold text-sky">
                {t.read}
                <span aria-hidden className="transition-transform duration-400 ease-wuality group-hover:translate-x-1">→</span>
              </span>
            </span>
          </Link>
        </Reveal>
      )}

      {/* Siguiente caso, con su portada */}
      <Reveal className={`${WIDE} mt-[clamp(56px,6.5vw,128px)]`}>
        <Link
          href={projectPath(lang, next.slug)}
          className={`group relative flex min-h-[clamp(260px,30vw,520px)] items-end overflow-hidden ${RADIUS}`}
          style={{ backgroundColor: next.bg }}
        >
          <Image
            src={next.shot}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1500px"
            className="object-cover opacity-70 transition-[opacity,scale] duration-700 ease-wuality group-hover:scale-105 group-hover:opacity-90"
          />
          <span aria-hidden className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,8,10,0.9),rgba(5,8,10,0.2)_60%,transparent)]" />
          <span className="relative flex w-full items-end justify-between gap-6 p-[clamp(24px,3vw,56px)]">
            <span>
              <Label as="span">{t.next}</Label>
              <span className="mt-3 block text-[clamp(2rem,4.2vw,5rem)] font-bold leading-none tracking-[-0.025em] text-bone">{next.name}</span>
              <span className="mt-3 block max-w-[40ch] text-[length:var(--fs-sm)] text-ash">{next.headline}</span>
            </span>
            <span className="flex size-[clamp(56px,4.4vw,84px)] shrink-0 items-center justify-center rounded-full bg-bone text-ink transition-transform duration-500 ease-wuality group-hover:rotate-45">
              <svg viewBox="0 0 24 24" className="size-[38%]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
          </span>
        </Link>
      </Reveal>
    </article>
  );
}
