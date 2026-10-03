// Consentimiento de cookies. Ninguna analítica ni pixel se carga antes de que la persona acepte.
// Para sumar Google Analytics o el pixel de Meta (etapa 8), escuchar el evento "bluz:consent"
// y revisar consent.analytics / consent.marketing.

export type Consent = { v: 1; analytics: boolean; marketing: boolean; at: string };
const KEY = "bluz-consent";

export function getConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && parsed.v === 1 ? parsed : null;
  } catch {
    return null;
  }
}

export function setConsent(accept: boolean): Consent {
  const consent: Consent = { v: 1, analytics: accept, marketing: accept, at: new Date().toISOString() };
  try { localStorage.setItem(KEY, JSON.stringify(consent)); } catch { /* modo privado: la elección dura esta visita */ }
  document.dispatchEvent(new CustomEvent("bluz:consent", { detail: consent }));
  return consent;
}

export function initCookieBanner() {
  const banner = document.querySelector<HTMLElement>("[data-cookies]");
  if (!banner) return;

  const show = () => { banner.hidden = false; };
  const hide = () => { banner.hidden = true; };

  if (!getConsent()) show();

  banner.querySelectorAll<HTMLButtonElement>("[data-cookies-choice]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setConsent(btn.dataset.cookiesChoice === "accept");
      hide();
    });
  });

  document.querySelectorAll("[data-cookies-open]").forEach((btn) => btn.addEventListener("click", show));

  // Si ya había una elección guardada, se avisa igual para que los scripts de medición puedan cargarse
  const saved = getConsent();
  if (saved) document.dispatchEvent(new CustomEvent("bluz:consent", { detail: saved }));
}
