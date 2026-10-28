"use client";

import Link from "next/link";
import Image from "./Img";
import { useContent } from "../LangProvider";

/**
 * Logotipo horizontal de marca, versión roja sobre fondo oscuro. Sale del
 * entregable de marca (01. Logotipo / 01. Horizontal), extraído con alfa recto
 * para que el degradado de la esfera se apoye limpio sobre cualquier fondo.
 */
export default function Logo({ href = "#top" }: { href?: string }) {
  const { ui } = useContent();
  return (
    <Link href={href} className="group flex items-center" aria-label={ui.header.home}>
      <Image
        src="/media/brand/wuality-horizontal-red.png"
        alt="Wuality"
        width={1300}
        height={400}
        priority
        className="h-[clamp(34px,2.9vw,56px)] w-auto transition-transform duration-500 ease-wuality group-hover:scale-105"
      />
    </Link>
  );
}
