"use client";

import Image from "@/components/ui/Img";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type FormEvent } from "react";
import BrandPattern, { type Piece } from "./ui/BrandPattern";
import SectionTitle from "./ui/SectionTitle";
import { dialCodes, meeting } from "@/lib/content";

type Step = "platform" | "form" | "calendar" | "done";

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

const pad = (n: number) => String(n).padStart(2, "0");

/** Fecha de hoy en hora local, en el formato de `<input type="date">`. */
function localToday() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** "2026-09-30" → "martes, 30 de septiembre de 2026", para el correo y la confirmación. */
function readableDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type Request = {
  platform: string;
  nombre: string;
  celular: string;
  email: string;
  fecha: string;
  hora: string;
  zona: string;
};

/**
 * Evento de Google Calendar ya rellenado, con el buzón de Wuality como
 * invitado. Se abre en el Google Calendar del visitante; al guardarlo, Google
 * le envía la invitación a hola@wuality.agency. Las horas van sin "Z" y con
 * `ctz`: así Google las lee en la zona horaria del visitante, que es en la que
 * las eligió.
 */
function calendarUrl(r: Request) {
  const [y, m, d] = r.fecha.split("-").map(Number);
  const [hh, mm] = r.hora.split(":").map(Number);
  const start = new Date(y, m - 1, d, hh, mm);
  const end = new Date(start.getTime() + meeting.durationMin * 60_000);
  const stamp = (t: Date) =>
    `${t.getFullYear()}${pad(t.getMonth() + 1)}${pad(t.getDate())}T${pad(t.getHours())}${pad(t.getMinutes())}00`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Reunión con Wuality — ${r.nombre}`,
    dates: `${stamp(start)}/${stamp(end)}`,
    ctz: r.zona,
    location: "Google Meet",
    add: meeting.inbox,
    details: [
      "Primera reunión solicitada desde la web de Wuality.",
      "",
      `Nombre: ${r.nombre}`,
      `Celular: ${r.celular}`,
      `Correo: ${r.email}`,
    ].join("\n"),
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

/**
 * Manda los datos al buzón a través de FormSubmit. FormSubmit contesta 200
 * también cuando el buzón aún no está activado; eso lo dice en `success`, así
 * que se comprueba el cuerpo y no sólo el código.
 */
async function sendToInbox(r: Request) {
  const res = await fetch(meeting.mailEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: `Nueva reunión por ${r.platform} — ${r.nombre}`,
      _template: "table",
      _replyto: r.email,
      _captcha: "false",
      Plataforma: r.platform,
      Nombre: r.nombre,
      Celular: r.celular,
      Correo: r.email,
      Fecha: readableDate(r.fecha),
      Hora: `${r.hora} (${r.zona})`,
      Origen: window.location.href,
    }),
  });
  const body = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
  if (!res.ok || body.success === false || body.success === "false") {
    throw new Error(body.message || `HTTP ${res.status}`);
  }
}

export default function Meeting() {
  const [step, setStep] = useState<Step>("platform");
  const [platform, setPlatform] = useState(meeting.options[0].id);
  const [accepted, setAccepted] = useState(true);
  const [dial, setDial] = useState(dialCodes[0].code);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<{ request: Request; calendar?: string } | null>(null);
  // Se fija al montar, no al compilar: el sitio se exporta estático y la fecha de hoy es la del visitante.
  const [today, setToday] = useState<string>();
  useEffect(() => setToday(localToday()), []);

  const isMeet = platform === "meet";
  const platformName = meeting.options.find((o) => o.id === platform)?.name ?? platform;

  /**
   * Con la agenda de citas configurada, Google Meet va directo a ella: pide
   * sus propios datos, así que el formulario de aquí sobraría.
   */
  const onContinue = () => setStep(isMeet && meeting.bookingUrl ? "calendar" : "form");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!accepted) {
      setError("Necesitamos que aceptes la Política de Privacidad para continuar.");
      return;
    }
    setError("");

    const data = new FormData(e.currentTarget);
    const code = dialCodes.find((c) => c.code === dial) ?? dialCodes[0];
    const request: Request = {
      platform: platformName,
      nombre: String(data.get("nombre") ?? "").trim(),
      celular: `${code.dial} ${String(data.get("celular") ?? "").trim()}`,
      email: String(data.get("email") ?? "").trim(),
      fecha: String(data.get("fecha") ?? ""),
      hora: String(data.get("hora") ?? ""),
      zona: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    if (isMeet) {
      /**
       * Google Calendar se abre aquí mismo, sin esperar a nada: dentro del
       * evento de envío el navegador lo deja pasar; después de un `await` ya no
       * sería un gesto del usuario y lo bloquearía como ventana emergente.
       */
      const calendar = calendarUrl(request);
      window.open(calendar, "_blank", "noopener");
      // Copia por correo, para que la solicitud no se pierda si el visitante no llega a guardar el evento.
      sendToInbox(request).catch(() => {});
      setSent({ request, calendar });
      setStep("done");
      return;
    }

    setSending(true);
    try {
      await sendToInbox(request);
      setSent({ request });
      setStep("done");
    } catch {
      setError(`No pudimos enviar tu solicitud. Escríbenos a ${meeting.inbox} y la agendamos contigo.`);
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contacto"
      className="relative flex min-h-[90svh] flex-col justify-center overflow-hidden bg-ink py-[calc(var(--section-y)*1.4)]"
    >
      {/**
       * En 90svh de alto la elección de plataforma deja mucho aire arriba y
       * abajo, y ahí se siembran figuras del entregable. En el formulario el
       * bloque crece hasta ocupar ese aire y las figuras quedaban detrás de los
       * controles, así que mientras se rellena se atenúan.
       */}
      <BrandPattern
        pieces={MEETING_PATTERN}
        className={`transition-opacity duration-700 ${step === "platform" ? "" : "opacity-15"}`}
      />

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
                onClick={onContinue}
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

                {/* Cuándo: de aquí sale el evento de Google Calendar y la hora que llega en el correo */}
                <div className="grid grid-cols-2 gap-3">
                  <label className="relative block">
                    <span className="sr-only">Fecha de la reunión</span>
                    <input
                      name="fecha"
                      type="date"
                      required
                      min={today}
                      className="h-[70px] w-full rounded-[48px] border border-[#616083] bg-surface px-6 text-[length:var(--fs-xs)] text-[#f7f7ff] outline-none transition-colors duration-300 [color-scheme:dark] focus:border-blue"
                    />
                  </label>
                  <label className="relative block">
                    <span className="sr-only">Hora de la reunión</span>
                    <input
                      name="hora"
                      type="time"
                      required
                      step={900}
                      className="h-[70px] w-full rounded-[48px] border border-[#616083] bg-surface px-6 text-[length:var(--fs-xs)] text-[#f7f7ff] outline-none transition-colors duration-300 [color-scheme:dark] focus:border-blue"
                    />
                  </label>
                </div>
                <p className="px-6 text-left text-[clamp(11px,0.73vw,13px)] text-muted">
                  {isMeet
                    ? "Te abriremos Google Calendar con la reunión lista para guardar."
                    : "Te enviaremos el enlace de Zoom a tu correo."}{" "}
                  Hora de tu zona horaria.
                </p>
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
                  {error.includes(meeting.inbox) ? (
                    <>
                      {error.split(meeting.inbox)[0]}
                      <a href={`mailto:${meeting.inbox}`} className="underline">
                        {meeting.inbox}
                      </a>
                      {error.split(meeting.inbox)[1]}
                    </>
                  ) : (
                    error
                  )}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="h-[65px] w-full rounded-xl bg-blue/15 text-[length:var(--fs-xs)] font-bold text-blue transition-colors duration-300 hover:bg-blue/25 disabled:cursor-wait disabled:opacity-60"
              >
                {sending ? "Enviando…" : isMeet ? "Agendar en Google Calendar" : "Quiero una reunión"}
              </button>
            </motion.form>
          )}

          {step === "calendar" && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4"
            >
              <button
                type="button"
                onClick={() => setStep("platform")}
                className="mx-auto flex items-center gap-2 text-[length:var(--fs-xs)] text-bone transition-opacity duration-300 hover:opacity-70"
              >
                <Image src="/media/ui/arrow-back.svg" alt="" width={24} height={24} className="size-6" />
                volver
              </button>
              {/* La agenda de citas de hola@wuality.agency: Google gestiona huecos, enlace de Meet y confirmaciones. */}
              <iframe
                src={meeting.bookingUrl}
                title="Agenda una reunión con Wuality en Google Calendar"
                className="h-[640px] w-full rounded-[24px] border-0 bg-white"
              />
              <a
                href={meeting.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[length:var(--fs-xs)] font-bold text-blue hover:underline"
              >
                Abrir la agenda en Google Calendar
              </a>
            </motion.div>
          )}

          {step === "done" && sent && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-[32px] border border-[#616083] bg-surface p-10 text-center"
            >
              <p className="text-[length:var(--fs-h4)] font-bold text-bone">¡Listo!</p>
              {sent.calendar ? (
                <>
                  <p className="mt-3 text-[length:var(--fs-xs)] text-ash">
                    Te abrimos Google Calendar con la reunión del {readableDate(sent.request.fecha)} a las{" "}
                    {sent.request.hora}. Guárdala para que nos llegue la invitación.
                  </p>
                  <a
                    href={sent.calendar}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex rounded-xl bg-blue/15 px-6 py-3 text-[length:var(--fs-xs)] font-bold text-blue transition-colors duration-300 hover:bg-blue/25"
                  >
                    Abrir Google Calendar
                  </a>
                </>
              ) : (
                <p className="mt-3 text-[length:var(--fs-xs)] text-ash">
                  Recibimos tu solicitud para el {readableDate(sent.request.fecha)} a las {sent.request.hora}. Te
                  enviaremos el enlace de Zoom a {sent.request.email}.
                </p>
              )}
              <button
                type="button"
                onClick={() => {
                  setSent(null);
                  setStep("platform");
                }}
                className="mt-6 block w-full text-[length:var(--fs-xs)] font-bold text-blue hover:underline"
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
