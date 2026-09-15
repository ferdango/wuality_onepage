"use client";

import Image from "@/components/ui/Img";
import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import BrandPattern, { type Piece } from "./ui/BrandPattern";
import SectionTitle from "./ui/SectionTitle";
import { dialCodes, meeting } from "@/lib/content";

type Step = "platform" | "form" | "done";

/**
 * Figuras repartidas por el aire de arriba y de abajo, esquivando la columna
 * central donde vive el formulario. Cada una entera y dentro de la caja.
 */
const MEETING_PATTERN: Piece[] = [
  { fig: "cinta-calida", x: 22, y: 9, w: 36, cap: 17, rotate: -12, opacity: 0.6 },
  { fig: "esfera-roja", x: 73, y: 6, w: 24, cap: 12, opacity: 0.62 },
  { fig: "gota-azul", x: 83, y: 19, w: 21, cap: 10, rotate: 18, opacity: 0.55 },
  { fig: "esfera-amarilla", x: 46, y: 17, w: 22, cap: 11, opacity: 0.55 },
  { fig: "cinta-fria", x: 76, y: 89, w: 38, cap: 18, rotate: 8, opacity: 0.6 },
  { fig: "cinta-magenta", x: 24, y: 90, w: 29, cap: 13, rotate: -20, opacity: 0.45 },
  { fig: "esfera-amarilla", x: 48, y: 81, w: 24, cap: 12, opacity: 0.55 },
  { fig: "esfera-roja", x: 11, y: 77, w: 16, cap: 9, opacity: 0.55 },
];

type Field = {
  name: string;
  placeholder: string;
  icon: string;
  type: "text" | "tel" | "email";
  autoComplete: string;
  /** El campo de celular antepone el selector de prefijo internacional. */
  hasDialCode?: boolean;
};

const fields: Field[] = [
  { name: "nombre", placeholder: "Nombres y apellidos", icon: "/media/ui/user.svg", type: "text", autoComplete: "name" },
  { name: "celular", placeholder: "Celular", icon: "/media/ui/whatsapp.svg", type: "tel", autoComplete: "tel", hasDialCode: true },
  { name: "email", placeholder: "Correo electrónico", icon: "/media/ui/mail-field.svg", type: "email", autoComplete: "email" },
];

export default function Meeting() {
  const [step, setStep] = useState<Step>("platform");
  const [platform, setPlatform] = useState(meeting.options[0].id);
  const [accepted, setAccepted] = useState(true);
  const [dial, setDial] = useState(dialCodes[0].code);
  const [error, setError] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!accepted) {
      setError("Necesitamos que aceptes la Política de Privacidad para continuar.");
      return;
    }
    setError("");
    setStep("done");
  };

  return (
    <section
      id="contacto"
      className="relative flex min-h-[90svh] flex-col justify-center overflow-hidden bg-ink py-[calc(var(--section-y)*1.4)]"
    >
      {/**
       * En 90svh de alto el formulario deja mucho aire arriba y abajo, y ahí se
       * siembran figuras del entregable. Mismo reparto en todos los tamaños.
       */}
      <BrandPattern pieces={MEETING_PATTERN} />

      <div className="shell relative flex flex-col items-center text-center">
        <SectionTitle>{meeting.title}</SectionTitle>
        <p className="mt-[clamp(12px,1.25vw,24px)] max-w-[52ch] text-[length:var(--fs-sm)] text-ash">
          {meeting.subtitle}
        </p>
      </div>

      <div className="shell relative mx-auto mt-[clamp(24px,2.5vw,48px)] w-full max-w-[560px] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {step === "platform" && (
            <motion.div
              key="platform"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-3"
            >
              <div role="radiogroup" aria-label="Plataforma para la reunión" className="flex gap-3">
                {meeting.options.map((opt) => {
                  const selected = platform === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setPlatform(opt.id)}
                      className={`relative flex h-[120px] flex-1 items-center justify-center rounded-[32px] border transition-colors duration-300 ${
                        selected ? "border-[#616083] bg-[#141d21]" : "border-[#616083]/70 bg-surface hover:bg-[#0d1417]"
                      }`}
                    >
                      <span className="sr-only">{opt.name}</span>
                      <Image
                        src={opt.id === "meet" ? "/media/ui/google-meet.svg" : "/media/ui/zoom.png"}
                        alt=""
                        width={58}
                        height={48}
                        className="h-12 w-auto object-contain"
                      />
                      <Image
                        src={selected ? "/media/ui/check-fill.svg" : "/media/ui/radio-empty.svg"}
                        alt=""
                        width={36}
                        height={36}
                        className="absolute right-3 top-3 size-8"
                      />
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setStep("form")}
                className="flex items-center justify-center rounded-[32px] border border-[#616083] bg-surface py-5 text-[length:var(--fs-xs)] font-bold text-bone transition-colors duration-300 hover:border-blue hover:bg-blue/10 hover:text-blue"
              >
                Continuar
              </button>
            </motion.div>
          )}

          {step === "form" && (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-6"
            >
              <button
                type="button"
                onClick={() => setStep("platform")}
                className="mx-auto flex items-center gap-2 text-[length:var(--fs-xs)] text-bone transition-opacity duration-300 hover:opacity-70"
              >
                <Image src="/media/ui/arrow-back.svg" alt="" width={24} height={24} className="size-6" />
                volver
              </button>

              <div className="flex flex-col gap-3">
                {fields.map((f) => {
                  const selected = dialCodes.find((c) => c.code === dial) ?? dialCodes[0];
                  return (
                    <label key={f.name} className="relative block">
                      <span className="sr-only">{f.placeholder}</span>

                      {f.hasDialCode && (
                        /**
                         * Un `select` nativo y no un menú propio: en móvil abre
                         * el selector del sistema, que se maneja mucho mejor con
                         * el pulgar y ya viene resuelto para lectores de pantalla.
                         */
                        <span className="absolute inset-y-px left-px z-10 flex w-[142px] items-center gap-1 rounded-l-[48px] bg-[#141d21] pl-[52px] pr-2">
                          <select
                            aria-label="Prefijo del país"
                            value={dial}
                            onChange={(e) => setDial(e.target.value)}
                            /**
                             * El texto del propio `select` va en transparente:
                             * el estado cerrado lo pinta la etiqueta de al lado,
                             * que cabe en el ancho del campo. Las opciones sí
                             * llevan color, que es lo que se ve al desplegarlo.
                             */
                            className="w-full cursor-pointer appearance-none bg-transparent text-[length:var(--fs-xs)] text-transparent outline-none"
                          >
                            {dialCodes.map((c) => (
                              <option key={c.code} value={c.code} className="bg-card text-[#f7f7ff]">
                                {c.flag} {c.dial} · {c.name}
                              </option>
                            ))}
                          </select>
                          <span
                            aria-hidden
                            className="pointer-events-none absolute left-[52px] flex items-center gap-1.5 text-[length:var(--fs-xs)] text-[#f7f7ff]"
                          >
                            <span className="text-[1.15em] leading-none">{selected.flag}</span>
                            {selected.dial}
                          </span>
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden
                            className="pointer-events-none ml-auto size-4 shrink-0 text-[#f7f7ff]/70"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      )}

                      <Image
                        src={f.icon}
                        alt=""
                        width={32}
                        height={32}
                        className="pointer-events-none absolute left-4 top-1/2 z-20 size-8 -translate-y-1/2"
                      />
                      <input
                        name={f.name}
                        type={f.type}
                        required
                        autoComplete={f.autoComplete}
                        placeholder={f.placeholder}
                        className={`h-[70px] w-full rounded-[48px] border border-[#616083] bg-surface pr-5 text-[length:var(--fs-xs)] text-[#f7f7ff] outline-none transition-colors duration-300 placeholder:text-[#f7f7ff]/55 focus:border-blue ${
                          f.hasDialCode ? "pl-[158px]" : "pl-[57px]"
                        }`}
                      />
                    </label>
                  );
                })}
              </div>

              <label className="flex cursor-pointer items-center gap-4 text-left">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="peer sr-only"
                />
                <span
                  className={`grid size-8 shrink-0 place-items-center rounded-md transition-colors duration-300 ${
                    accepted ? "bg-blue" : "border border-[#616083] bg-surface"
                  }`}
                >
                  {accepted && (
                    <Image src="/media/ui/check-bold.svg" alt="" width={30} height={30} className="size-[22px]" />
                  )}
                </span>
                <span className="text-[length:var(--fs-xs)] font-light text-[#f7f7ff]">
                  He leído y acepto la Política de Privacidad y protección de datos*
                </span>
              </label>

              {error && (
                <p role="alert" className="text-[length:var(--fs-xs)] text-red">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="h-[65px] w-full rounded-xl bg-blue/15 text-[length:var(--fs-xs)] font-bold text-blue transition-colors duration-300 hover:bg-blue/25"
              >
                Quiero una reunión
              </button>
            </motion.form>
          )}

          {step === "done" && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[32px] border border-[#616083] bg-surface p-10 text-center"
            >
              <p className="text-[length:var(--fs-h4)] font-bold text-bone">¡Listo!</p>
              <p className="mt-3 text-[length:var(--fs-xs)] text-ash">
                Te escribimos para coordinar la reunión por{" "}
                {meeting.options.find((o) => o.id === platform)?.name}.
              </p>
              <button
                type="button"
                onClick={() => setStep("platform")}
                className="mt-6 text-[length:var(--fs-xs)] font-bold text-blue hover:underline"
              >
                Agendar otra
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
