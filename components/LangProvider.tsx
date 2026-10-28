"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { getContent, type Lang } from "@/lib/i18n";

const LangContext = createContext<Lang>("es");

/**
 * Idioma de la página. Lo fija la ruta (la raíz es español; /en, inglés) y lo
 * leen los componentes de cliente con `useContent()`.
 *
 * El `lang` del <html> lo escribe el build en el HTML de /en (ver
 * scripts/format-html.mjs) para los buscadores; esto lo mantiene al día cuando
 * se cambia de idioma navegando sin recargar.
 */
export default function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
export const useContent = () => getContent(useLang());
