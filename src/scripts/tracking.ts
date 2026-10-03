// Medición con consentimiento. Nada se carga hasta que la persona acepta en el aviso de cookies.
// Los identificadores se configuran como variables de entorno en Netlify:
//   PUBLIC_GA_ID          → Google Analytics 4 (por ejemplo G-XXXXXXX)
//   PUBLIC_META_PIXEL_ID  → Pixel de Meta (solo números)
// Sin variables, este archivo no hace nada.
import type { Consent } from "./consent";

const GA_ID = import.meta.env.PUBLIC_GA_ID as string | undefined;
const PIXEL_ID = import.meta.env.PUBLIC_META_PIXEL_ID as string | undefined;

type Fn = (...args: unknown[]) => void;
declare global { interface Window { dataLayer?: unknown[]; gtag?: Fn; fbq?: Fn & { callMethod?: Fn; queue?: unknown[]; loaded?: boolean; version?: string; push?: Fn }; _fbq?: unknown } }

let gaLoaded = false;
let pixelLoaded = false;

function loadScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadGA() {
  if (gaLoaded || !GA_ID) return;
  gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer!.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`);
}

function loadPixel() {
  if (pixelLoaded || !PIXEL_ID) return;
  pixelLoaded = true;
  // Fragmento oficial del pixel de Meta, sin el <noscript>
  const fbq: any = function (...args: unknown[]) { fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args); };
  fbq.push = fbq; fbq.loaded = true; fbq.version = "2.0"; fbq.queue = [];
  window.fbq = fbq; window._fbq = fbq;
  loadScript("https://connect.facebook.net/en_US/fbevents.js");
  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
}

document.addEventListener("bluz:consent", (e) => {
  const c = (e as CustomEvent<Consent>).detail;
  if (c.analytics) loadGA();
  if (c.marketing) loadPixel();
});

// Envío del formulario de contacto o llegada a la página de gracias: conversión "Lead"
function lead(form: string) {
  window.gtag?.("event", "generate_lead", { form_name: form });
  window.fbq?.("track", "Lead", { content_name: form });
}
document.addEventListener("bluz:lead", (e) => lead((e as CustomEvent).detail?.form ?? "contacto"));
if (document.querySelector("[data-thanks]")) {
  // La página de gracias solo se ve si el formulario se envió sin JavaScript
  document.addEventListener("bluz:consent", () => setTimeout(() => lead("contacto"), 0), { once: true });
}
