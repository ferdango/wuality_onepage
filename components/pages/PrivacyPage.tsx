import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import LangProvider from "@/components/LangProvider";
import Reveal from "@/components/ui/Reveal";
import { localePath, type Lang } from "@/lib/i18n";
import { privacyPolicy } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export function privacyMetadata(lang: Lang): Metadata {
  const page = privacyPolicy[lang];
  return pageMeta({ lang, title: page.title, description: page.description, path: "/privacidad/" });
}

/**
 * Política de privacidad y cookies (/privacidad/ y /en/privacy/). Misma columna
 * y escala de lectura que los artículos del blog.
 */
export default function PrivacyPage({ lang }: { lang: Lang }) {
  const page = privacyPolicy[lang];
  return (
    <LangProvider lang={lang}>
      <Header linkBase={localePath(lang, "/")} />
      <main id="main" tabIndex={-1} className="outline-none">
        <article
          className="mx-auto w-full px-[var(--gutter)] pb-[var(--section-y)] pt-[calc(var(--header-h)+clamp(32px,5.3vw,80px))]"
          style={{ maxWidth: "calc(768px + 2 * var(--gutter))" }}
        >
          <Reveal className="flex flex-col gap-4">
            <h1 className="text-balance text-[length:clamp(1.875rem,1.2rem_+_2.4vw,3rem)] font-extrabold leading-[1.15] tracking-[-0.01em] text-white">
              {page.title}
            </h1>
            <p className="text-[0.875rem] text-muted">{page.updated}</p>
            <p className="text-[length:clamp(1.125rem,1rem_+_0.45vw,1.375rem)] leading-[1.6] text-[rgba(247,255,247,0.9)]">
              {page.intro}
            </p>
          </Reveal>

          <div className="mt-[clamp(32px,3.5vw,56px)] flex flex-col gap-[clamp(28px,3vw,44px)] text-[length:clamp(1.0625rem,0.95rem_+_0.35vw,1.25rem)] leading-[1.75] text-[rgba(247,255,247,0.82)]">
            {page.sections.map((section) => (
              // scroll-mt: el ancla #cookies no queda bajo el header fijo.
              <section key={section.title} id={section.id} className="flex scroll-mt-[calc(var(--header-h)+24px)] flex-col gap-4">
                <h2 className="text-balance text-[length:clamp(1.375rem,1.1rem_+_0.9vw,1.875rem)] font-bold leading-[1.25] text-[#f7fff7]">
                  {section.title}
                </h2>
                {section.blocks.map((block, i) =>
                  block.type === "p" ? (
                    <p key={i}>{block.text}</p>
                  ) : (
                    <ul key={i} className="flex list-disc flex-col gap-2 pl-6 marker:text-sky">
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ),
                )}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer lang={lang} />
      <FloatingActions />
    </LangProvider>
  );
}
