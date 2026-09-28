"use client";

import Image from "@/components/ui/Img";
import { useEffect, useRef, useState } from "react";
import BrandPattern, { type Piece } from "./ui/BrandPattern";
import Reveal from "./ui/Reveal";
import SectionTitle from "./ui/SectionTitle";
import useDragScroll from "./ui/useDragScroll";
import { CONSENT_EVENT, STORAGE_KEY } from "./FloatingActions";
import { social, type SocialNetwork } from "@/lib/content";

type Profile = (typeof social.profiles)[number];

type Post = {
  network: SocialNetwork;
  url: string;
  /** Página del reproductor oficial que va dentro del iframe. */
  embed: string;
};

/**
 * Del enlace público de un post a su reproductor oficial. TikTok tiene uno
 * pensado para incrustar sin su interfaz alrededor (player/v1); Instagram sólo
 * ofrece su tarjeta, que es la página `/embed/` del propio post.
 */
function toPost(url: string): Post | null {
  const tiktok = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
  if (tiktok)
    return {
      network: "tiktok",
      url,
      embed: `https://www.tiktok.com/player/v1/${tiktok[1]}?rel=0&music_info=0&description=0`,
    };

  const instagram = url.match(/instagram\.com\/(?:[\w.]+\/)?(p|reel|tv)\/([\w-]+)/);
  if (instagram)
    return {
      network: "instagram",
      url,
      embed: `https://www.instagram.com/${instagram[1]}/${instagram[2]}/embed/`,
    };

  return null;
}

const profileOf = (network: SocialNetwork) => social.profiles.find((p) => p.network === network)!;
const withNetwork = (text: string, network: SocialNetwork) => text.replace("{red}", profileOf(network).name);

/**
 * Figuras de cada cuenta: las de marca cuyos colores se acercan a los de cada
 * red. Van enteras dentro de la caja 16:10 y por encima de la franja de abajo,
 * que es la del aviso "Muy pronto"; la esquina de arriba a la izquierda queda
 * para el icono.
 */
const FIGURES: Record<SocialNetwork, Piece[]> = {
  // Cian y rojo, como el logotipo de TikTok.
  tiktok: [
    { fig: "cinta-fria", x: 40, y: 40, w: 40, cap: 56, rotate: -8, opacity: 0.95 },
    { fig: "esfera-roja", x: 80, y: 24, w: 17, cap: 30, opacity: 0.9 },
    { fig: "gota-azul", x: 75, y: 54, w: 20, cap: 32, rotate: 14, opacity: 0.85 },
  ],
  // Magenta y amarillo, como el degradado de Instagram.
  instagram: [
    { fig: "cinta-magenta", x: 64, y: 40, w: 40, cap: 56, rotate: 8, opacity: 0.95 },
    { fig: "esfera-amarilla", x: 30, y: 24, w: 17, cap: 30, opacity: 0.9 },
    { fig: "cinta-calida", x: 28, y: 54, w: 20, cap: 32, rotate: -14, opacity: 0.85 },
  ],
};

/** Vidrio de las tarjetas de metodología. */
const GLASS = "border border-bone/10 bg-[#141d21]/[0.68] backdrop-blur-[40px]";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

function FollowButton({ profile }: { profile: Profile }) {
  return (
    <a
      href={profile.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-fit items-center gap-4 rounded-full border border-bone/30 px-7 py-3.5 text-[length:var(--fs-sm)] font-semibold text-bone transition-colors duration-300 hover:border-blue hover:text-blue"
    >
      {profile.cta}
      <Arrow className="size-5 transition-transform duration-400 group-hover:translate-x-1" />
    </a>
  );
}

/**
 * Mientras las cuentas no tengan publicaciones: una tarjeta por red con sus
 * figuras de marca, la bio de la cuenta y el botón para seguirla.
 */
function ProfileCard({ profile }: { profile: Profile }) {
  return (
    <article className="isolate flex h-full flex-col overflow-hidden rounded-[clamp(16px,1.7vw,32px)] border border-line bg-surface">
      <div className="relative aspect-[16/10] overflow-hidden bg-card">
        <BrandPattern pieces={FIGURES[profile.network]} />

        <span className={`absolute left-[clamp(14px,1.25vw,24px)] top-[clamp(14px,1.25vw,24px)] grid size-[clamp(44px,3.33vw,64px)] place-items-center rounded-full ${GLASS}`}>
          <Image src={profile.icon} alt="" width={32} height={32} className="size-[46%]" />
        </span>

        <p className={`absolute bottom-[clamp(14px,1.25vw,24px)] left-[clamp(14px,1.25vw,24px)] right-[clamp(14px,1.25vw,24px)] w-fit rounded-full px-4 py-2 text-[length:var(--fs-xs)] font-semibold text-bone ${GLASS}`}>
          {profile.soon}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-[clamp(20px,2.1vw,40px)]">
        <p className="text-[clamp(11px,0.73vw,14px)] font-semibold uppercase tracking-[0.12em] text-muted">
          {profile.name}
        </p>
        <h3 className="mt-2 text-[length:var(--fs-h4)] font-bold leading-tight text-bone">{profile.handle}</h3>
        <p className="mt-3 text-[length:var(--fs-body)] leading-snug text-ash">{profile.bio}</p>
        {/* Abajo del todo, para que los botones de las dos tarjetas queden alineados. */}
        <div className="mt-auto pt-[clamp(20px,2.1vw,40px)]">
          <FollowButton profile={profile} />
        </div>
      </div>
    </article>
  );
}

/**
 * Los reproductores de TikTok e Instagram ponen sus propias cookies, así que
 * sólo se cargan solos si se aceptaron en el aviso; si no, cada post pide
 * permiso con un botón.
 */
function useCookiesAccepted() {
  const [accepted, setAccepted] = useState(false);
  useEffect(() => {
    try {
      setAccepted(localStorage.getItem(STORAGE_KEY) === "accepted");
    } catch {
      setAccepted(false);
    }
    const onDecide = (e: Event) => setAccepted((e as CustomEvent<string>).detail === "accepted");
    window.addEventListener(CONSENT_EVENT, onDecide);
    return () => window.removeEventListener(CONSENT_EVENT, onDecide);
  }, []);
  return accepted;
}

/** La tarjeta de Instagram avisa de su alto real con un mensaje "MEASURE". */
function useInstagramHeight(frame: HTMLIFrameElement | null) {
  const [height, setHeight] = useState<number | null>(null);
  useEffect(() => {
    if (!frame) return;
    const onMessage = (e: MessageEvent) => {
      if (e.source !== frame.contentWindow || !/^https:\/\/([\w-]+\.)*instagram\.com$/.test(e.origin)) return;
      try {
        const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (data?.type === "MEASURE" && data.details?.height) setHeight(Math.ceil(data.details.height));
      } catch {
        /* otros mensajes del iframe */
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [frame]);
  return height;
}

function PostCard({ post, accepted }: { post: Post; accepted: boolean }) {
  const profile = profileOf(post.network);
  const [asked, setAsked] = useState(false);
  const [frame, setFrame] = useState<HTMLIFrameElement | null>(null);
  const igHeight = useInstagramHeight(post.network === "instagram" ? frame : null);
  const load = accepted || asked;

  return (
    <article className="flex flex-col gap-3">
      <div className="flex h-9 items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-[length:var(--fs-xs)] font-semibold text-bone">
          <Image src={profile.icon} alt="" width={32} height={32} className="size-5" />
          {profile.name}
        </span>
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[length:var(--fs-xs)] text-muted transition-colors duration-300 hover:text-bone"
        >
          {withNetwork(social.consent.open, post.network)} ↗
        </a>
      </div>

      <div
        className={`relative w-full overflow-hidden rounded-[clamp(14px,1.25vw,24px)] bg-card ${
          post.network === "instagram" && igHeight ? "" : "aspect-[9/16]"
        }`}
        style={post.network === "instagram" && igHeight ? { height: igHeight } : undefined}
      >
        {load ? (
          <iframe
            ref={setFrame}
            src={post.embed}
            title={`Publicación de ${profile.handle} en ${profile.name}`}
            loading="lazy"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            scrolling="no"
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center">
            <BrandPattern pieces={FIGURES[post.network]} className="opacity-40" />
            <span className={`relative grid size-14 place-items-center rounded-full ${GLASS}`}>
              <Image src={profile.icon} alt="" width={32} height={32} className="size-[46%]" />
            </span>
            <p className="relative text-[length:var(--fs-xs)] leading-snug text-ash">
              {withNetwork(social.consent.body, post.network)}
            </p>
            <button
              type="button"
              onClick={() => setAsked(true)}
              className="relative rounded-full bg-bone px-6 py-2.5 text-[length:var(--fs-xs)] font-semibold text-ink transition-opacity duration-300 hover:opacity-85"
            >
              {social.consent.load}
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

function Header() {
  return (
    <>
      <SectionTitle>{social.title}</SectionTitle>
      {/* El gutter va por fuera del ancho máximo: dentro se comía el texto y partía la línea. */}
      <Reveal delay={0.08} className="shell">
        <p className="mx-auto mt-[clamp(12px,1.25vw,24px)] max-w-[48ch] text-balance text-center text-[length:var(--fs-lead)] leading-snug text-ash">
          {social.lead}
        </p>
      </Reveal>
    </>
  );
}

/**
 * Riel de posts. Va con scroll horizontal propio y no anclado al scroll de la
 * página como el del blog: los reproductores de TikTok e Instagram necesitan
 * un ancho mínimo para leerse, y encajarlos en el alto de pantalla los dejaba
 * diminutos en portátiles de 720px.
 */
function PostsRail({ posts, accepted }: { posts: Post[]; accepted: boolean }) {
  const rail = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: true });
  useDragScroll(rail);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const read = () =>
      setEdges({
        start: el.scrollLeft <= 4,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      });
    read();
    el.addEventListener("scroll", read, { passive: true });
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", read);
      ro.disconnect();
    };
  }, []);

  /** Las flechas avanzan una tarjeta, hueco incluido. */
  const step = (dir: 1 | -1) => {
    const el = rail.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <div className="mt-[clamp(2rem,3.3vw,4rem)]">
      <div role="region" aria-roledescription="carrusel" aria-label="Últimas publicaciones en TikTok e Instagram">
        <ul
          ref={rail}
          className="no-scrollbar flex cursor-grab snap-x snap-mandatory scroll-px-[var(--gutter)] items-start gap-4 overflow-x-auto overscroll-x-contain px-[var(--gutter)] active:cursor-grabbing lg:gap-6"
        >
          {posts.map((post) => (
            <li key={post.url} className="w-[76vw] shrink-0 snap-start sm:w-[44vw] lg:w-[320px]">
              <PostCard post={post} accepted={accepted} />
            </li>
          ))}
        </ul>
      </div>

      {!(edges.start && edges.end) && (
        <div className="shell mt-[clamp(20px,2vw,36px)] hidden justify-center gap-3 lg:flex">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => step(dir)}
              disabled={dir < 0 ? edges.start : edges.end}
              aria-label={dir < 0 ? "Posts anteriores" : "Posts siguientes"}
              className="grid size-12 place-items-center rounded-full border border-bone/30 text-bone transition-colors duration-300 hover:border-blue hover:text-blue disabled:pointer-events-none disabled:opacity-30"
            >
              <Arrow className={`size-5 ${dir < 0 ? "rotate-180" : ""}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SocialPosts() {
  const accepted = useCookiesAccepted();
  const posts = social.posts.map(toPost).filter((p): p is Post => p !== null);

  if (posts.length > 0)
    return (
      <section id="posts" className="bg-ink py-[calc(var(--section-y)*1.4)]">
        <Header />
        <Reveal delay={0.12}>
          <ul className="shell mt-[clamp(16px,1.7vw,32px)] flex flex-wrap justify-center gap-3">
            {social.profiles.map((p) => (
              <li key={p.network}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-bone/30 px-5 py-2.5 text-[length:var(--fs-xs)] font-semibold text-bone transition-colors duration-300 hover:border-blue hover:text-blue"
                >
                  <Image src={p.icon} alt="" width={32} height={32} className="size-5" />
                  {p.handle}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <PostsRail posts={posts} accepted={accepted} />
      </section>
    );

  return (
    <section id="posts" className="bg-ink py-[calc(var(--section-y)*1.4)]">
      <Header />
      <div className="mx-auto mt-[clamp(2rem,3.3vw,4rem)] grid w-full max-w-[calc(1080px_+_2*var(--gutter))] gap-[clamp(16px,1.7vw,32px)] px-[var(--gutter)] md:grid-cols-2">
        {social.profiles.map((profile, i) => (
          <Reveal key={profile.network} delay={i * 0.08} className="h-full">
            <ProfileCard profile={profile} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
