import Image from "@/components/ui/Img";
import BrandPattern, { type Piece } from "./ui/BrandPattern";
import Reveal from "./ui/Reveal";
import { footer } from "@/lib/content";

/**
 * Las figuras viven sólo en los 108px del padding inferior, no por todo el
 * footer. Es una franja muy ancha y muy baja, así que van pequeñas y el tope de
 * alto (`cap`, en % del alto de la franja) es lo que manda sobre el ancho.
 */
const FOOTER_PATTERN: Piece[] = [
  { fig: "cinta-calida", x: 8, y: 50, w: 9, cap: 72, rotate: -14, opacity: 0.5 },
  { fig: "esfera-amarilla", x: 20, y: 42, w: 5, cap: 52, opacity: 0.45 },
  { fig: "gota-azul", x: 32, y: 58, w: 7, cap: 60, rotate: 12, opacity: 0.4 },
  { fig: "esfera-roja", x: 45, y: 44, w: 5, cap: 50, opacity: 0.45 },
  { fig: "cinta-magenta", x: 57, y: 56, w: 8, cap: 66, rotate: 16, opacity: 0.4 },
  { fig: "gota-azul", x: 70, y: 42, w: 6, cap: 54, rotate: -10, opacity: 0.4 },
  { fig: "esfera-amarilla", x: 81, y: 58, w: 5, cap: 52, opacity: 0.45 },
  { fig: "cinta-fria", x: 92, y: 48, w: 9, cap: 72, rotate: 10, opacity: 0.5 },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-surface pb-[108px]">
      <BrandPattern className="top-auto h-[108px]" pieces={FOOTER_PATTERN} />

      <div className="shell relative flex flex-col items-center gap-[clamp(28px,2.5vw,48px)] text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
        <Reveal className="flex flex-col items-center gap-[clamp(20px,1.875vw,36px)] lg:items-start">
          {/**
           * Bloqueo vertical de la marca (01. Logotipo / 02. Vertical), sin
           * ficha detrás: el símbolo suelto se confundía con las esferas rojas
           * del patrón, y con el logotipo debajo se lee como firma.
           */}
          <Image
            src="/media/brand/wuality-vertical.png"
            alt="Wuality"
            width={460}
            height={400}
            className="h-auto w-[clamp(104px,8.4vw,164px)]"
          />

          <div className="max-w-[529px]">
            <p className="text-[length:var(--fs-body)] font-bold tracking-[0.06em] text-bone">{footer.name}</p>
            <p className="mt-4 text-[length:var(--fs-sm)] tracking-[0.06em] text-ash">
              <span className="hidden lg:inline">
                {footer.claim.map((c, i) => (
                  <span key={i} style={c.color ? { color: c.color } : undefined}>
                    {c.text}
                  </span>
                ))}
              </span>
              {/* En negrita: son cuatro palabras sueltas y a peso normal el color se diluía. */}
              <span className="font-bold lg:hidden">
                {footer.claimMobile.map((c, i) => (
                  <span key={i} style={c.color ? { color: c.color } : undefined}>
                    {c.text}
                  </span>
                ))}
              </span>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="flex items-center gap-[clamp(16px,1.46vw,28px)]">
            {footer.socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  aria-label={s.name}
                  className="flex size-[clamp(48px,4.17vw,80px)] items-center justify-center rounded-full border border-muted transition-colors duration-400 hover:border-bone hover:bg-card"
                >
                  <Image src={s.icon} alt="" width={32} height={32} className="size-[40%]" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="shell relative mt-[clamp(28px,2.1vw,40px)] flex flex-col-reverse items-center gap-4 text-center lg:flex-row lg:justify-between lg:text-left">
        <p className="text-[length:var(--fs-xs)] text-muted">{footer.legal}</p>
        <div className="flex flex-wrap items-center justify-center gap-[clamp(16px,1.46vw,28px)] text-[length:var(--fs-xs)]">
          <a href={`mailto:${footer.email}`} className="text-bone transition-opacity duration-300 hover:opacity-70">
            {footer.email}
          </a>
          {footer.links.map((l) => (
            <a key={l} href="#" className="text-muted transition-colors duration-300 hover:text-bone">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
