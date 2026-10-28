import Image from "@/components/ui/Img";

/**
 * Pantalla del iPhone del hero: el mockup de fondo de pantalla del manual de
 * marca (Identidad de marca, p. 36). Fondo negro, tres esferas rojas con el
 * borde nítido mirando al logotipo y "Wuality®" en blanco, con la interfaz de
 * bloqueo de iOS por encima.
 *
 * Está montada en capas y no como una foto. La del manual es un mockup con
 * manos y la pantalla mide ahí unos 340 px de ancho, así que se vería borrosa;
 * además, cuando el teléfono se expande a pantalla completa el fondo tiene
 * que reencuadrarse, cosa que una imagen fija no puede hacer. Las piezas salen
 * del Keynote del manual en alta resolución: la esfera (898 px) y el logotipo
 * (1386 px de ancho, en blanco y sin el punto de color).
 *
 * El fondo se mide en unidades del contenedor: en vertical cada pieza mide lo
 * mismo que en el mockup (en % del ancho) y, al abrirse en apaisado, el tope
 * por alto (`cqh`) las deja grandes pero enteras. La interfaz (hora, candado,
 * botones) va en unidades del teléfono y se apaga con `--chrome` al empezar la
 * expansión, como la isla y el indicador de inicio.
 */

/** Centro (% del contenedor), diámetro (% del ancho en vertical) y giro. */
const SPHERES = [
  // Arriba a la derecha; el borde nítido abajo a la izquierda.
  { x: 78, y: 27.5, d: 74, rotate: 28 },
  // A media altura, cortada por la izquierda; borde nítido abajo a la derecha.
  { x: 13.5, y: 53.5, d: 72, rotate: -32 },
  // Abajo a la derecha; borde nítido arriba a la izquierda, junto al logotipo.
  { x: 85.5, y: 71.5, d: 78, rotate: 132 },
];

/**
 * En vertical `cqh` = 2,17 `cqw`, así que con este factor manda el ancho y se
 * reproduce el mockup; en apaisado manda el alto.
 */
const BY_HEIGHT = 0.68;
const size = (d: number) => `min(${d}cqw, ${(d * BY_HEIGHT).toFixed(2)}cqh)`;

/** Medida relativa al teléfono (no a la pantalla, que crece al expandirse). */
const dw = (k: number) => `calc(var(--dev-w) * ${k})`;
const dh = (k: number) => `calc(var(--dev-h) * ${k})`;

function StatusIcons() {
  return (
    <span className="flex items-center" style={{ gap: dw(0.014), height: dw(0.03) }}>
      {/* Cobertura */}
      <svg viewBox="0 0 17 11" className="h-full w-auto" fill="white">
        <rect x="0" y="7" width="3" height="4" rx="0.8" />
        <rect x="4.6" y="5" width="3" height="6" rx="0.8" />
        <rect x="9.2" y="2.6" width="3" height="8.4" rx="0.8" />
        <rect x="13.8" y="0" width="3" height="11" rx="0.8" />
      </svg>
      {/* Wi-Fi */}
      <svg viewBox="0 0 16 11.5" className="h-full w-auto" fill="white">
        <path d="M8 2.4c2.2 0 4.2.8 5.8 2.2.2.2.5.2.7 0l1-1c.2-.2.2-.6 0-.8C13.5.9 10.8 0 8 0S2.5.9.5 2.8c-.2.2-.2.6 0 .8l1 1c.2.2.5.2.7 0C3.8 3.2 5.8 2.4 8 2.4Z" />
        <path d="M8 6.1c1.2 0 2.3.4 3.2 1.2.2.2.5.2.7 0l1-1c.2-.2.2-.6 0-.8C11.6 4.3 9.9 3.7 8 3.7s-3.6.6-4.9 1.8c-.2.2-.2.6 0 .8l1 1c.2.2.5.2.7 0 .9-.8 2-1.2 3.2-1.2Z" />
        <path d="M10.3 8.8c.2-.2.2-.6 0-.8C9.7 7.4 8.9 7.1 8 7.1s-1.7.3-2.3.9c-.2.2-.2.6 0 .8l1.9 1.9c.2.2.6.2.8 0l1.9-1.9Z" />
      </svg>
      {/* Batería */}
      <svg viewBox="0 0 26 12" className="h-full w-auto" fill="none">
        <rect x="0.5" y="0.5" width="22" height="11" rx="3.4" stroke="white" strokeOpacity="0.4" />
        <rect x="2" y="2" width="15" height="8" rx="2" fill="white" />
        <path d="M24 4v4c.8-.3 1.4-1.1 1.4-2S24.8 4.3 24 4Z" fill="white" fillOpacity="0.45" />
      </svg>
    </span>
  );
}

export default function LockScreen() {
  return (
    <div
      role="img"
      aria-label="Pantalla de bloqueo con el fondo de marca de Wuality"
      className="absolute inset-0 overflow-hidden bg-black [container-type:size]"
    >
      {/* Fondo de pantalla */}
      {SPHERES.map((s, i) => (
        <Image
          key={i}
          src="/media/brand/pantalla/esfera-roja.png"
          alt=""
          width={898}
          height={865}
          priority
          className="absolute h-auto max-w-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: size(s.d), translate: "-50% -50%", rotate: `${s.rotate}deg` }}
        />
      ))}

      {/* "Wuality®": el registro va fuera del ancho para que el bloque quede centrado como en el mockup. */}
      <div className="absolute left-[48%] top-[48.5%]" style={{ width: size(66), translate: "-50% -50%" }}>
        <Image
          src="/media/brand/pantalla/wuality-blanco.png"
          alt=""
          width={1386}
          height={396}
          priority
          className="h-auto w-full"
        />
        <span
          className="absolute left-full top-[-6%] font-medium leading-none text-white"
          style={{ fontSize: size(5.6), marginLeft: "1.5%" }}
        >
          ®
        </span>
      </div>

      {/* Interfaz de bloqueo */}
      <div className="absolute inset-0 text-white opacity-[var(--chrome)]">
        {/* Barra de estado, a la altura de la isla */}
        <div
          className="absolute inset-x-0 flex items-center justify-between"
          style={{ top: dh(0.022), height: dh(0.023), paddingInline: dw(0.1) }}
        >
          <span className="font-semibold tabular-nums leading-none" style={{ fontSize: dw(0.041) }}>
            22:30
          </span>
          <StatusIcons />
        </div>

        {/* Candado, hora y fecha */}
        <div className="absolute inset-x-0 flex flex-col items-center" style={{ top: dh(0.088) }}>
          <svg viewBox="0 0 14 18" fill="white" style={{ width: dw(0.042) }}>
            <path d="M7 0a5 5 0 0 0-5 5v2.5h-.3C.8 7.5 0 8.3 0 9.2v7C0 17.2.8 18 1.7 18h10.6c.9 0 1.7-.8 1.7-1.8v-7c0-.9-.8-1.7-1.7-1.7H12V5a5 5 0 0 0-5-5Zm-3 7.5V5a3 3 0 0 1 6 0v2.5H4Z" />
          </svg>
          <span
            className="font-normal tabular-nums leading-none tracking-[-0.02em]"
            style={{ fontSize: dw(0.215), marginTop: dh(0.014) }}
          >
            22:30
          </span>
          <span className="leading-none text-white/75" style={{ fontSize: dw(0.04), marginTop: dh(0.012) }}>
            martes, 31 de julio
          </span>
        </div>

        {/* Linterna y cámara */}
        {(["left", "right"] as const).map((side) => (
          <span
            key={side}
            className="absolute grid place-items-center rounded-full bg-white/[0.12]"
            style={{ bottom: dh(0.085), [side]: dw(0.1), width: dw(0.125), height: dw(0.125) }}
          >
            {side === "left" ? (
              <svg viewBox="0 0 12 22" fill="white" style={{ width: dw(0.024) }}>
                <path d="M0 1.2C0 .5.5 0 1.2 0h9.6c.7 0 1.2.5 1.2 1.2v2.3c0 .5-.2 1-.5 1.4L9 7.6V20.6c0 .8-.6 1.4-1.4 1.4H4.4c-.8 0-1.4-.6-1.4-1.4V7.6L.5 4.9C.2 4.5 0 4 0 3.5V1.2Zm6 10a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z" />
              </svg>
            ) : (
              <svg viewBox="0 0 22 17" fill="white" style={{ width: dw(0.046) }}>
                <path d="M7.6 0c-.6 0-1.1.3-1.4.8L5.1 2.6H2.6A2.6 2.6 0 0 0 0 5.2v9.2A2.6 2.6 0 0 0 2.6 17h16.8a2.6 2.6 0 0 0 2.6-2.6V5.2a2.6 2.6 0 0 0-2.6-2.6h-2.5L15.8.8c-.3-.5-.8-.8-1.4-.8H7.6ZM11 5.3a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8Z" />
              </svg>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
