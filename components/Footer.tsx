import Image from "@/components/ui/Img";
import Reveal from "./ui/Reveal";
import { footer } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-surface pb-[clamp(2rem,7.3vw,8.75rem)] pt-[108px]">
      {/**
       * Franja superior con el elemento gráfico de marca: la esfera del
       * entregable asomando por el borde. Es mucho más ancha que los 108px de
       * la franja, así que lo que entra es sólo su casquete: un arco muy
       * abierto que hace de horizonte. Como el original va sobre negro,
       * `screen` deja pasar el fondo del footer y sólo suma el resplandor.
       */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[108px] overflow-hidden [mask-image:linear-gradient(to_bottom,black,black_50%,transparent)]">
        <Image
          src="/media/brand/esfera-roja.jpg"
          alt=""
          aria-hidden
          width={1000}
          height={1000}
          /**
           * La esfera se dibuja al doble del ancho de pantalla y se sube lo
           * justo para que su polo quede a 10px del borde: como en el archivo
           * la bola empieza al 15% de la altura, ese desplazamiento es
           * `10px - 0.15 * 200vw`. Así el vértice cae siempre en el mismo
           * sitio y lo único que cambia con el ancho es cuánto se abre el
           * arco, sin media queries.
           *
           * Va girada 180º porque en el original el polo norte es la zona
           * apagada y el sur el que tiene la luz; lo que asoma por el borde
           * tiene que ser la parte encendida.
           */
          className="absolute left-1/2 top-[calc(26px-30vw)] size-[200vw] max-w-none -translate-x-1/2 rotate-180 opacity-55 mix-blend-screen"
        />
      </div>

      <div className="shell relative flex flex-col items-center gap-[clamp(28px,2.5vw,48px)] text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
        <Reveal className="flex flex-col items-center gap-[clamp(20px,1.875vw,36px)] lg:items-start">
          {/**
           * Símbolo de la marca nueva (01. Logotipo / 03. Símbolo), la esfera
           * roja. La ficha es cuadrada porque el símbolo lo es: en el entregable
           * se entrega como imagen de perfil.
           */}
          <div className="flex size-[clamp(80px,6.46vw,124px)] items-center justify-center rounded-[clamp(16px,1.25vw,24px)] bg-card">
            <Image
              src="/media/brand/wuality-simbolo-red.png"
              alt="Wuality"
              width={600}
              height={600}
              className="size-[72%]"
            />
          </div>

          <div className="max-w-[529px]">
            <p className="text-[var(--fs-body)] font-bold tracking-[0.06em] text-bone">{footer.name}</p>
            <p className="mt-4 text-[var(--fs-sm)] tracking-[0.06em] text-ash">
              <span className="hidden lg:inline">
                {footer.claim.map((c, i) => (
                  <span key={i} style={c.color ? { color: c.color } : undefined}>
                    {c.text}
                  </span>
                ))}
              </span>
              <span className="lg:hidden">
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
        <p className="text-[var(--fs-xs)] text-muted">{footer.legal}</p>
        <div className="flex flex-wrap items-center justify-center gap-[clamp(16px,1.46vw,28px)] text-[var(--fs-xs)]">
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
