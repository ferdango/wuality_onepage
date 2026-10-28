/**
 * Medidas reales de las figuras de marca (/media/brand/figuras). Van en el
 * width/height del <img> para que el navegador reserve su proporción antes de
 * cargarlas: con un 420×420 genérico cada figura cambiaba de forma al llegar
 * (Lighthouse lo marca como "image-aspect-ratio").
 */
export const FIGURE_SIZE: Record<string, { width: number; height: number }> = {
  "cinta-calida": { width: 380, height: 335 },
  "cinta-fria": { width: 380, height: 335 },
  "cinta-magenta": { width: 380, height: 335 },
  "esfera-amarilla": { width: 380, height: 380 },
  "esfera-roja": { width: 380, height: 384 },
  "gota-azul": { width: 380, height: 332 },
};
