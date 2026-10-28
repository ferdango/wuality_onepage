import type { Metadata, Viewport } from "next";
import { Chau_Philomene_One, Figtree } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/seo";

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

/**
 * Metadatos comunes. Cada página define los suyos con `pageMeta` (canonical,
 * descripción, Open Graph y Twitter); aquí van la base de las URL absolutas, la
 * plantilla de título y lo que no cambia entre páginas.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s | Wuality" },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  // Que iOS no convierta en enlaces números y correos que no lo son.
  formatDetection: { telephone: false, email: false, address: false },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
  }),
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
