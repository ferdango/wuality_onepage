"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import SectionTitle from "./ui/SectionTitle";
import { meeting } from "@/lib/content";

type Step = "platform" | "form" | "done";

type Field = {
  name: string;
  placeholder: string;
  icon: string;
  type: "text" | "tel" | "email";
  autoComplete: string;
  /** Prefijo fijo del país, como en el diseño del campo de celular. */
  prefix?: string;
};

const fields: Field[] = [
  { name: "nombre", placeholder: "Nombres y apellidos", icon: "/media/ui/user.svg", type: "text", autoComplete: "name" },
  { name: "celular", placeholder: "Celular", icon: "/media/ui/whatsapp.svg", type: "tel", autoComplete: "tel", prefix: "+51" },
  { name: "email", placeholder: "Correo electrónico", icon: "/media/ui/mail-field.svg", type: "email", autoComplete: "email" },
];

export default function Meeting() {
  const [step, setStep] = useState<Step>("platform");
  const [platform, setPlatform] = useState(meeting.options[0].id);
  const [accepted, setAccepted] = useState(true);
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
    <section id="contacto" className="bg-ink py-[calc(var(--section-y)*1.4)]">
      <div className="shell flex flex-col items-center text-center">
        <SectionTitle>{meeting.title}</SectionTitle>
        <p className="mt-[clamp(12px,1.25vw,24px)] max-w-[52ch] text-[var(--fs-sm)] text-ash">
          {meeting.subtitle}
        </p>
      </div>

      <div className="shell mx-auto mt-[clamp(24px,2.5vw,48px)] w-full max-w-[560px] overflow-hidden">
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
                aria-label="Continuar con la reunión"
                className="group flex items-center justify-center rounded-[32px] border border-[#616083] bg-surface py-4 transition-colors duration-300 hover:border-blue hover:bg-blue/10"
              >
                <Image
                  src="/media/ui/arrow-left.svg"
                  alt=""
                  width={36}
                  height={36}
                  className="size-9 rotate-180 transition-transform duration-500 ease-wuality group-hover:translate-x-1"
                />
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
                className="mx-auto flex items-center gap-2 text-[var(--fs-xs)] text-bone transition-opacity duration-300 hover:opacity-70"
              >
                <Image src="/media/ui/arrow-back.svg" alt="" width={24} height={24} className="size-6" />
                volver
              </button>

              <div className="flex flex-col gap-3">
                {fields.map((f) => (
                  <label key={f.name} className="relative block">
                    <span className="sr-only">{f.placeholder}</span>
                    {f.prefix && (
                      <span className="absolute inset-y-px left-px flex w-[108px] items-center justify-end rounded-l-[48px] bg-[#141d21] pr-3 text-[var(--fs-xs)] text-[#f7f7ff]">
                        {f.prefix}
                      </span>
                    )}
                    <Image
                      src={f.icon}
                      alt=""
                      width={32}
                      height={32}
                      className="pointer-events-none absolute left-4 top-1/2 z-10 size-8 -translate-y-1/2"
                    />
                    <input
                      name={f.name}
                      type={f.type}
                      required
                      autoComplete={f.autoComplete}
                      placeholder={f.placeholder}
                      className={`h-[70px] w-full rounded-[48px] border border-[#616083] bg-surface pr-5 text-[var(--fs-xs)] text-[#f7f7ff] outline-none transition-colors duration-300 placeholder:text-[#f7f7ff]/55 focus:border-blue ${
                        f.prefix ? "pl-[125px]" : "pl-[57px]"
                      }`}
                    />
                  </label>
                ))}
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
                <span className="text-[var(--fs-xs)] font-light text-[#f7f7ff]">
                  He leído y acepto la Política de Privacidad y protección de datos*
                </span>
              </label>

              {error && (
                <p role="alert" className="text-[var(--fs-xs)] text-red">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="h-[65px] w-full rounded-xl bg-blue/15 text-[var(--fs-xs)] font-bold text-blue transition-colors duration-300 hover:bg-blue/25"
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
              <p className="text-[var(--fs-h4)] font-bold text-bone">¡Listo!</p>
              <p className="mt-3 text-[var(--fs-xs)] text-ash">
                Te escribimos para coordinar la reunión por{" "}
                {meeting.options.find((o) => o.id === platform)?.name}.
              </p>
              <button
                type="button"
                onClick={() => setStep("platform")}
                className="mt-6 text-[var(--fs-xs)] font-bold text-blue hover:underline"
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
