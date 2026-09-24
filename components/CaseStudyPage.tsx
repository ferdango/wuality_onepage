import Link from "next/link";
import Image from "@/components/ui/Img";
import Reveal from "./ui/Reveal";
import { projects, reviews } from "@/lib/content";

type Project = (typeof projects)[number];

/**
 * Página de caso con la estructura de la referencia (el caso de Dia en
 * Significa): portada a sangre, nombre y titular, ficha de servicios y
 * cliente, capítulos de texto intercalados con bloques visuales grandes, cita
 * del cliente y contacto al final.
 *
 * Sólo se pinta lo que hay. La referencia trae además premios, equipo y
 * galerías con varias capturas por caso; aquí no hay ese material, así que
 * esos bloques no aparecen en vez de rellenarse con algo inventado.
 */

/** Columna de lectura, con el gutter por fuera del ancho (ver Article). */
const COL = "mx-auto w-full px-[var(--gutter)]";
const colMax = (max: number) => ({ maxWidth: `calc(${max}px + 2 * var(--gutter))` });

/** Contenedor de los bloques visuales: casi a sangre, como en la referencia. */
const WIDE = "mx-auto w-full px-[clamp(12px,2.5vw,48px)]";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[clamp(11px,0.73vw,14px)] font-semibold uppercase tracking-[0.12em] text-muted">
      {children}
    </p>
  );
}

function Dots() {
  return (
    <div aria-hidden className="flex justify-center gap-[10px] py-[clamp(40px,5.2vw,100px)]">
      {[0, 1, 2].map((i) => (
        <span key={i} className="size-[7px] rounded-full bg-bone" />
      ))}
    </div>
  );
}

function Chapter({ title, body }: { title: string; body: string }) {
  return (
    <Reveal className={COL} style={colMax(768)}>
      <h2 className="text-[clamp(1.5rem,2.1vw,2.5rem)] font-bold leading-tight tracking-[-0.01em] text-bone">
        {title}.
      </h2>
      <p className="mt-[clamp(14px,1.25vw,24px)] text-[clamp(1.0625rem,1.25vw,1.5rem)] leading-[1.6] text-bone/85">
        {body}
      </p>
    </Reveal>
  );
}

/** Bloque de color del caso: la misma tarjeta que se revela en "Nuestros proyectos". */
function HeadlineBlock({ project }: { project: Project }) {
  return (
    <Reveal className={WIDE} style={{ maxWidth: 1600 }}>
      <div
        className="flex aspect-[16/9] w-full flex-col justify-between rounded-[clamp(16px,1.7vw,32px)] p-[clamp(24px,4vw,80px)] text-ink max-md:aspect-[4/5]"
        style={{ backgroundColor: project.accent }}
      >
        <p className="max-w-[16ch] text-[clamp(2rem,5vw,6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          {project.headline}
        </p>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="relative h-[clamp(28px,3vw,56px)] w-[clamp(120px,14vw,260px)]">
            <Image src={project.logo} alt={project.name} fill sizes="260px" className="object-contain object-left" />
          </div>
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li key={t} className="rounded-full bg-ink/10 px-4 py-1.5 text-[clamp(12px,0.83vw,16px)] font-medium">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

/** Bloque de marca: el logotipo del cliente a gran tamaño sobre su color. */
function BrandBlock({ project }: { project: Project }) {
  return (
    <Reveal className={WIDE} style={{ maxWidth: 1600 }}>
      <div
        className="grid aspect-[21/9] w-full place-items-center rounded-[clamp(16px,1.7vw,32px)] max-md:aspect-square"
        style={{ backgroundColor: project.bg }}
      >
        <div className="relative h-[clamp(56px,8vw,160px)] w-[min(60%,560px)]">
          <Image src={project.logo} alt={project.name} fill sizes="560px" className="object-contain" />
        </div>
      </div>
    </Reveal>
  );
}

export default function CaseStudyPage({ project, next }: { project: Project; next: Project }) {
  // La cita sólo aparece si hay una reseña real de alguien de ese cliente.
  const quote = reviews.items.find((r) => r.role.includes(project.name));
  const [first, second, third] = project.chapters;

  return (
    <article className="pb-[clamp(40px,5vw,96px)] pt-[calc(var(--header-h)+clamp(8px,1vw,16px))]">
      {/* Portada */}
      <Reveal className={WIDE} style={{ maxWidth: 1600 }} y={16}>
        <div
          className="relative h-[min(72svh,56vw)] w-full overflow-hidden rounded-[clamp(16px,1.7vw,32px)] max-md:h-[62svh]"
          style={{ backgroundColor: project.bg }}
        >
          {/**
           * La captura es 4:3 y la portada mucho más apaisada: va en su propia
           * caja centrada, a todo el alto, y sus bordes laterales se funden en
           * el color del proyecto, que es el de fondo de la propia captura. Sin
           * el fundido se veía la costura donde terminaba la imagen.
           */}
          <div className="absolute inset-y-0 left-1/2 aspect-[4/3] h-full -translate-x-1/2 [mask-image:linear-gradient(to_right,transparent,black_16%,black_84%,transparent)]">
            <Image src={project.shot} alt={project.name} fill priority sizes="(max-width: 768px) 100vw, 60vw" className="object-cover" />
          </div>
        </div>
      </Reveal>

      {/* Nombre y titular */}
      <Reveal className={`${COL} mt-[clamp(48px,6vw,120px)]`} style={colMax(768)}>
        <h1 className="text-[clamp(2.25rem,4.2vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.025em]">
          <span className="block text-muted">{project.name}.</span>
          <span className="block text-bone">{project.headline}.</span>
        </h1>
      </Reveal>

      {/* Ficha */}
      <Reveal
        className={`${COL} mt-[clamp(32px,3.3vw,64px)]`}
        style={colMax(768)}
      >
        <div className="grid gap-8 border-t border-line pt-[clamp(24px,2.1vw,40px)] sm:grid-cols-2">
          <div>
            <Label>Servicios</Label>
            <ul className="mt-4 space-y-2">
              {project.tags.map((t) => (
                <li key={t} className="text-[clamp(1rem,1.05vw,1.25rem)] text-bone">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Label>Cliente</Label>
            {/* Sobre el color del proyecto: tres de los cuatro logotipos son oscuros y no se leían sobre la página. */}
            <div
              className="mt-4 inline-flex rounded-xl px-4 py-3"
              style={{ backgroundColor: project.bg }}
            >
              <div className="relative h-[clamp(22px,1.9vw,32px)] w-[clamp(100px,9vw,160px)]">
                <Image src={project.logo} alt={project.name} fill sizes="160px" className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Capítulos intercalados con bloques visuales */}
      <div className="mt-[clamp(48px,6vw,120px)]">
        {first && <Chapter title={first.title} body={first.body} />}
      </div>

      <div className="mt-[clamp(40px,5.2vw,100px)]">
        <HeadlineBlock project={project} />
      </div>

      {second && (
        <>
          <Dots />
          <Chapter title={second.title} body={second.body} />
        </>
      )}

      {quote && (
        <>
          <Dots />
          <Reveal className={COL} style={colMax(640)}>
            <figure>
              <blockquote className="text-[clamp(1.375rem,1.9vw,2.25rem)] font-semibold leading-[1.3] tracking-[-0.01em] text-bone">
                {quote.quote}
              </blockquote>
              <figcaption className="mt-[clamp(18px,1.7vw,32px)] flex items-center gap-4">
                <Image
                  src={quote.avatar}
                  alt=""
                  width={52}
                  height={52}
                  className="size-[clamp(40px,2.7vw,52px)] rounded-full object-cover"
                />
                <span>
                  <span className="block text-[clamp(1rem,1vw,1.125rem)] font-semibold text-bone">{quote.name}</span>
                  <span className="block text-[clamp(0.9375rem,0.95vw,1.0625rem)] text-muted">{quote.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </>
      )}

      {third && (
        <>
          <Dots />
          <Chapter title={third.title} body={third.body} />
        </>
      )}

      <div className="mt-[clamp(40px,5.2vw,100px)]">
        <BrandBlock project={project} />
      </div>

      {/* Siguiente caso */}
      <Reveal className={`${WIDE} mt-[clamp(40px,5.2vw,100px)]`} style={{ maxWidth: 1600 }}>
        <Link
          href={`/proyectos/${next.slug}/`}
          className="group relative flex items-end justify-between gap-6 overflow-hidden rounded-[clamp(16px,1.7vw,32px)] border border-line bg-surface p-[clamp(24px,3vw,56px)] transition-colors duration-500 hover:border-bone/30"
        >
          <span>
            <Label>Siguiente caso</Label>
            <span className="mt-3 block text-[clamp(2rem,4.2vw,5rem)] font-bold leading-none tracking-[-0.025em] text-bone">
              {next.name}
            </span>
          </span>
          <span className="flex size-[clamp(56px,4.4vw,84px)] shrink-0 items-center justify-center rounded-full bg-mint text-ink transition-transform duration-500 ease-wuality group-hover:rotate-45">
            <svg viewBox="0 0 24 24" className="size-[38%]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </span>
        </Link>
      </Reveal>
    </article>
  );
}
