import Link from "next/link";
import Image from "@/components/ui/Img";
import Reveal from "./ui/Reveal";
import { blog, type BlogItem } from "@/lib/content";

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
 * Los tamaños salen del frame del Figma, que mide 1512 y no 1920 como el resto
 * del sitio: el `vw` de cada `clamp` está calibrado para dar el valor del diseño
 * justo a 1512 y quedarse ahí. La columna de lectura es fija, que es lo que pide
 * un texto largo, así que la tipografía tampoco debe seguir creciendo.
 */
const T = {
  crumb: "text-[clamp(0.875rem,1.0582vw,1rem)]",
  title: "text-[clamp(1.75rem,3.1746vw,3rem)]",
  meta: "text-[clamp(0.8125rem,0.9259vw,0.875rem)]",
  lead: "text-[clamp(1rem,1.1905vw,1.125rem)]",
  body: "text-[clamp(1rem,1.5873vw,1.5rem)]",
  h2: "text-[clamp(1.375rem,2.1164vw,2rem)]",
};

const SHARE = [
  { label: "WhatsApp", icon: "/media/ui/share-whatsapp.svg", accent: true },
  { label: "Facebook", icon: "/media/ui/share-facebook.svg" },
  { label: "X", icon: "/media/ui/share-x.svg" },
  { label: "LinkedIn", icon: "/media/ui/share-linkedin.svg" },
];

function Crumb({ category, centered = false }: { category: string; centered?: boolean }) {
  return (
    <Link
      href="/#blog"
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

function Byline({ item, centered = false }: { item: BlogItem; centered?: boolean }) {
  return (
    <div className={`flex items-center gap-6 ${centered ? "justify-center" : ""}`}>
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
      <span className={`${T.meta} font-medium text-[#f7fff7]`}>{item.publishedAt}</span>
    </div>
  );
}

/** Columna de compartir del Figma: vertical en desktop, en fila bajo la foto en móvil. */
function ShareRail() {
  return (
    <aside className="flex shrink-0 flex-row items-center gap-4 lg:w-[66px] lg:flex-col">
      <p className="text-[0.875rem] text-[rgba(247,255,247,0.85)]">{blog.share}</p>
      <ul className="flex flex-row gap-3 lg:flex-col">
        {SHARE.map((s) => (
          <li key={s.label}>
            <a
              href="#"
              aria-label={`Compartir en ${s.label}`}
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

export default function Article({ item, next }: { item: BlogItem; next: BlogItem }) {
  if (item.type === "video") {
    return (
      <article className="pb-0 pt-[calc(var(--header-h)+clamp(32px,5.3vw,80px))]">
        <Reveal className={`${COL} flex flex-col items-center gap-1 text-center`} style={colMax(1080)}>
          <Crumb category={item.category} centered />
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
            aria-label={`Ver el vídeo: ${item.title}`}
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

  return (
    <article className="pb-0 pt-[calc(var(--header-h)+clamp(32px,5.3vw,80px))]">
      <Reveal className={`${COL} flex flex-col gap-3`} style={colMax(768)}>
        <Crumb category={item.category} />
        <h1 className={`${T.title} font-extrabold leading-tight text-white`}>{item.title}</h1>
        <Byline item={item} />
        <p className={`${T.lead} leading-[1.78] text-[rgba(247,255,247,0.9)]`}>{item.lead}</p>
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
        <ShareRail />

        <div className="flex flex-1 flex-col items-end gap-[clamp(24px,2.6vw,40px)]">
          <div
            className={`flex w-full flex-col gap-6 ${T.body} leading-[1.5] text-[rgba(247,255,247,0.8)]`}
          >
            {item.body?.map((block, i) =>
              block.type === "h2" ? (
                <h2 key={i} className={`${T.h2} font-bold leading-tight text-[#f7fff7]`}>
                  {block.text}
                </h2>
              ) : (
                <p key={i}>{block.text}</p>
              ),
            )}
          </div>

          <Link
            href={`/blog/${next.slug}/`}
            className="group flex h-12 items-center justify-center gap-3 rounded-lg border border-bone px-4 py-3 text-[0.875rem] font-bold text-bone transition-colors duration-400 hover:bg-bone/10"
          >
            {blog.next}
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
    </article>
  );
}
