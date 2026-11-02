import Link from "next/link";
import Image from "@/components/ui/Img";
import Reveal from "./ui/Reveal";
import CookieSettingsButton from "./CookieSettingsButton";
import { fill, getContent, localePath, privacyPath, type Lang } from "@/lib/i18n";

/**
 * Pie corporativo, en la línea de los grandes estudios: firma y eslogan, mapa
 * del sitio, contacto directo y la parte legal; cierra con una frase gigante de
 * la marca ("Built in Lima, Peru.", del Brand Manifesto 2026) cortada por el
 * borde, como los saludos de ciudades del pie de ustwo.
 *
 * Los anclajes del mapa van al home del idioma, así funcionan también desde un
 * caso, un artículo o la política de privacidad.
 */
export default function Footer({ lang }: { lang: Lang }) {
  const { footer, company, chat } = getContent(lang);
  const home = localePath(lang, "/");
  const heading = "text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-muted";
  const link = "text-[length:var(--fs-sm)] text-ash transition-colors duration-300 hover:text-bone";

  return (
    <footer className="relative overflow-hidden bg-ink text-bone">
      <div className="shell mx-auto grid max-w-[1760px] gap-[clamp(36px,4vw,72px)] pb-[clamp(36px,4vw,64px)] pt-[calc(var(--section-y)*1.5)] sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
        <Reveal className="flex flex-col items-start gap-[clamp(20px,1.875vw,32px)] sm:col-span-2 lg:col-span-1">
          <Image
            src="/media/brand/wuality-horizontal-red.png"
            alt="Wuality"
            width={1300}
            height={400}
            className="h-auto w-[clamp(132px,10vw,190px)]"
          />
          <p className="max-w-[18ch] text-[length:clamp(1.375rem,1rem_+_1.2vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.02em]">
            {footer.slogan}
          </p>
          <ul className="flex items-center gap-3">
            {footer.socials.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  aria-label={s.name}
                  {...(s.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  className="flex size-12 items-center justify-center rounded-full border border-line transition-colors duration-400 hover:border-bone hover:bg-card"
                >
                  <Image src={s.icon} alt="" width={32} height={32} className="size-[40%]" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {footer.columns.map((col, i) => (
          <Reveal key={col.title} delay={0.05 * (i + 1)}>
            <nav aria-label={col.title}>
              <h2 className={heading}>{col.title}</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={`${home}${l.href}`} className={link}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        ))}

        <Reveal delay={0.15}>
          <h2 className={heading}>{footer.contactTitle}</h2>
          <ul className="mt-5 flex flex-col gap-3">
            <li>
              <a href={`mailto:${footer.email}`} className={`${link} text-bone`}>
                {footer.email}
              </a>
            </li>
            <li>
              <a href={chat.href} target="_blank" rel="noopener noreferrer" className={link}>
                WhatsApp {chat.phone}
              </a>
            </li>
            <li className="text-[length:var(--fs-sm)] text-ash">{footer.city}</li>
          </ul>
        </Reveal>
      </div>

      <div className="shell mx-auto flex max-w-[1760px] flex-col-reverse gap-4 border-t border-line py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[length:var(--fs-xs)] text-muted">
          {fill(footer.legal, { year: new Date().getFullYear(), ruc: company.ruc })}
        </p>
        <div className="flex flex-wrap items-center gap-[clamp(16px,1.46vw,28px)] text-[length:var(--fs-xs)]">
          <CookieSettingsButton label={footer.cookies} className="text-muted transition-colors duration-300 hover:text-bone" />
          <Link href={privacyPath(lang)} className="text-muted transition-colors duration-300 hover:text-bone">
            {footer.privacy}
          </Link>
        </div>
      </div>

      {/* Firma gigante, decorativa: el texto ya está en el eslogan y en "Nuestra historia". */}
      <p
        aria-hidden
        className="select-none whitespace-nowrap px-[var(--gutter)] pb-[clamp(8px,1vw,20px)] text-[length:clamp(2.5rem,9.4vw,13.5rem)] font-bold leading-[0.9] tracking-[-0.045em] text-bone"
      >
        {footer.sign.replace(/\.$/, "")}
        <span className="ml-[0.06em] inline-block size-[0.2em] rounded-full bg-red align-baseline" />
      </p>
    </footer>
  );
}
