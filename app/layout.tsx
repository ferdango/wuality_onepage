import type { Metadata, Viewport } from "next";
import { Chau_Philomene_One, Figtree } from "next/font/google";
import "./globals.css";

/**
 * El diseño usa Charlie Display (tipografía licenciada de Atlassian, no disponible
 * como webfont pública). Se declara primero en la cascada para que, si la licencia
 * está instalada, se use la original; Figtree es el sustituto de proporciones y
 * peso más cercanos.
 */
const wuality = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-wuality",
  display: "swap",
});

/** "only one effect" usa esta tipografía en el Figma; sí está en Google Fonts. */
const chau = Chau_Philomene_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-chau-raw",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wuality — Tu Partner en Transformación Digital",
  description:
    "Wuality: Agencia de Innovación & Tecnología. Creamos experiencias digitales, impulsamos marcas.",
  openGraph: {
    title: "Wuality — Tu Partner en Transformación Digital",
    description: "Creamos experiencias digitales, impulsamos marcas.",
    type: "website",
    locale: "es_PE",
  },
};

export const viewport: Viewport = {
  themeColor: "#05080a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${wuality.variable} ${chau.variable}`}>
      <body>{children}</body>
    </html>
  );
}
