// Comportamiento común del layout nuevo: barra superior, menú, pop-up de contacto, formularios y cookies.
import { gsap } from "gsap";
import { initCookieBanner } from "./consent";

const root = document.documentElement;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const site = document.querySelector<HTMLElement>("[data-site]");

function safe(fn: () => void, name: string) {
  try { fn(); } catch (e) { console.warn(`[${name}]`, e); }
}

/* ---------------------------------------------------------------
   Diálogos a pantalla completa (menú y contacto)
   --------------------------------------------------------------- */
type Dialog = { open: (trigger?: Element | null, animate?: boolean) => void; close: (restoreFocus?: boolean) => Promise<void>; isOpen: () => boolean };
let current: Dialog | null = null;

function createDialog(el: HTMLElement, items: string): Dialog {
  let lastTrigger: HTMLElement | null = null;
  let open = !el.hidden;

  const lock = (on: boolean) => {
    root.style.overflow = on ? "hidden" : "";
    if (site) site.inert = on;
  };

  const dialog: Dialog = {
    isOpen: () => open,
    open(trigger, animate = true) {
      if (open && !el.hidden) { lock(true); current = dialog; return; }
      lastTrigger = (trigger as HTMLElement) ?? (document.activeElement as HTMLElement);
      el.hidden = false;
      open = true;
      current = dialog;
      lock(true);
      if (animate && !reduced) {
        gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "expo.out", clearProps: "clipPath" });
        gsap.fromTo(el.querySelectorAll(items), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", stagger: 0.05, delay: 0.15, clearProps: "transform,opacity" });
      }
      el.querySelector<HTMLElement>("[data-menu-close], [data-contact-close]")?.focus({ preventScroll: true });
      document.dispatchEvent(new CustomEvent("bluz:dialog", { detail: { id: el.id, open: true } }));
    },
    close(restoreFocus = true) {
      if (!open) return Promise.resolve();
      open = false;
      if (current === dialog) current = null;
      const finish = () => {
        el.hidden = true;
        lock(false);
        if (restoreFocus) lastTrigger?.focus({ preventScroll: true });
        document.dispatchEvent(new CustomEvent("bluz:dialog", { detail: { id: el.id, open: false } }));
      };
      if (reduced) { finish(); return Promise.resolve(); }
      return new Promise<void>((resolve) => {
        // El temporizador cierra igual si la animación no avanza (pestaña en segundo plano)
        let done = false;
        const end = () => { if (done) return; done = true; tween.kill(); gsap.set(el, { clearProps: "clipPath" }); finish(); resolve(); };
        const tween = gsap.to(el, { clipPath: "inset(0 0 100% 0)", duration: 0.5, ease: "expo.inOut", onComplete: end });
        setTimeout(end, 650);
      });
    },
  };
  return dialog;
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && current) current.close();
});

/* ---------------------------------------------------------------
   Menú
   --------------------------------------------------------------- */
let menu: Dialog | null = null;

function initMenu() {
  const el = document.querySelector<HTMLElement>("[data-menu]");
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-open]");
  if (!el || !toggle) return;
  menu = createDialog(el, "[data-menu-item]");

  toggle.addEventListener("click", () => menu!.open(toggle));
  el.querySelector("[data-menu-close]")?.addEventListener("click", () => menu!.close());
  document.addEventListener("bluz:dialog", (e) => {
    const { id, open } = (e as CustomEvent).detail;
    if (id === el.id) toggle.setAttribute("aria-expanded", String(open));
  });
}

/* ---------------------------------------------------------------
   Contacto
   --------------------------------------------------------------- */
let contact: Dialog | null = null;

function initContact() {
  const el = document.querySelector<HTMLElement>("[data-contact]");
  if (!el) return;
  contact = createDialog(el, "[data-contact-item]");

  // Página de origen del contacto: llega con el formulario a Netlify
  const pageField = el.querySelector<HTMLInputElement>("[data-page-field]");

  const openContact = async (trigger?: Element | null) => {
    if (pageField) pageField.value = location.pathname;
    const fromMenu = menu?.isOpen();
    if (fromMenu) await menu!.close(false);
    contact!.open(trigger, true);
  };

  document.addEventListener("click", (e) => {
    const trigger = (e.target as Element).closest("[data-contact-open]");
    if (!trigger) return;
    e.preventDefault();
    openContact(trigger);
  });
  el.querySelector("[data-contact-close]")?.addEventListener("click", () => contact!.close());

  // /contacto/ llega con el pop-up abierto desde el servidor; también se abre con #contacto
  if (!el.hidden) {
    if (pageField) pageField.value = document.referrer ? new URL(document.referrer).pathname : location.pathname;
    contact.open(null, false);
  } else if (location.hash === "#contacto" || location.hash === "#contact") {
    openContact(null);
  }
}

/* ---------------------------------------------------------------
   Formularios (Netlify Forms) enviados sin salir de la página
   --------------------------------------------------------------- */
function initForms() {
  document.querySelectorAll<HTMLFormElement>("[data-ajax-form]").forEach((form) => {
    const body = form.querySelector<HTMLElement>("[data-form-body]");
    const ok = form.querySelector<HTMLElement>("[data-form-ok]");
    const error = form.querySelector<HTMLElement>("[data-form-error]");
    const submit = form.querySelector<HTMLButtonElement>("button[type=submit]");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      if (error) error.hidden = true;
      if (submit) { submit.disabled = true; if (submit.dataset.sendingLabel) submit.textContent = submit.dataset.sendingLabel; }

      try {
        const data = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);
        const res = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: data.toString() });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        if (body) body.hidden = true;
        if (ok) { ok.hidden = false; ok.focus?.({ preventScroll: false }); }
        if (form.hasAttribute("data-lead-form")) {
          // Punto de enganche para el evento "Lead" del pixel de Meta (etapa 8, solo con consentimiento)
          document.dispatchEvent(new CustomEvent("bluz:lead", { detail: { form: form.getAttribute("name") } }));
        }
      } catch (err) {
        console.warn("[form]", err);
        if (error) error.hidden = false;
      } finally {
        if (submit) { submit.disabled = false; if (submit.dataset.submitLabel) submit.textContent = submit.dataset.submitLabel; }
      }
    });
  });
}

/* ---------------------------------------------------------------
   Barra superior: logo y menú en negro sobre secciones claras
   --------------------------------------------------------------- */
function initTopbar() {
  const bar = document.querySelector<HTMLElement>("[data-topbar]");
  if (!bar) return;
  const zones = Array.from(document.querySelectorAll<HTMLElement>("main > section, main > article, footer, [data-tone]"));
  const isLight = (el: HTMLElement) =>
    el.dataset.tone === "light" || el.classList.contains("tone-light") || el.classList.contains("tone-paper") ||
    (el.classList.contains("tone-base") && root.dataset.base === "light");
  const update = () => {
    const y = bar.offsetHeight / 2;
    // La zona más interna bajo la barra manda (por ejemplo, un panel claro dentro de una página oscura)
    const under = zones.filter((z) => { const r = z.getBoundingClientRect(); return r.top <= y && r.bottom > y && r.left <= 40 && r.right > 40; }).pop();
    bar.dataset.on = under && isLight(under) ? "light" : "dark";
  };
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update);
  update();
}

safe(initTopbar, "topbar");
safe(initMenu, "menu");
safe(initContact, "contact");
safe(initForms, "forms");
safe(initCookieBanner, "cookies");
root.classList.add("is-ready");
