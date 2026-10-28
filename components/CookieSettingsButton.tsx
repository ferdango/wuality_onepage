"use client";

import { OPEN_COOKIES_EVENT } from "./FloatingActions";

/** Reabre el aviso de cookies para cambiar la decisión (lo escucha FloatingActions). */
export default function CookieSettingsButton({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_COOKIES_EVENT))} className={className}>
      {label}
    </button>
  );
}
