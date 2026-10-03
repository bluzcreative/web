// Idiomas, rutas de cada página y textos de la interfaz (menú, footer, botones, formularios).
// El español es el idioma principal y vive en la raíz; el inglés vive en /en/.

export const languages = { es: "Español", en: "English" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "es";

// Cada página tiene una clave y su ruta en cada idioma.
// Para sumar una página nueva: agregar la clave aquí y crear el archivo en src/pages y src/pages/en.
export const routes = {
  home:     { es: "/",            en: "/en/" },
  services: { es: "/servicios/",  en: "/en/services/" },
  work:     { es: "/trabajo/",    en: "/en/work/" },
  about:    { es: "/nosotros/",   en: "/en/about/" },
  lab:      { es: "/lab/",        en: "/en/lab/" },
  contact:  { es: "/contacto/",   en: "/en/contact/" },
  thanks:   { es: "/gracias/",    en: "/en/thanks/" },
  privacy:  { es: "/privacidad/", en: "/en/privacy/" },
  terms:    { es: "/terminos/",   en: "/en/terms/" },
  cookies:  { es: "/cookies/",    en: "/en/cookies/" },
} as const;
export type PageKey = keyof typeof routes;

// Menú a pantalla completa
export const menuOrder = ["work", "services", "about", "lab"] as const satisfies readonly PageKey[];
export const legalOrder = ["privacy", "terms", "cookies"] as const satisfies readonly PageKey[];

// Funciones que se activan más adelante
export const features = {
  clientPortal: false, // Fase 2: acceso al portal de clientes en el menú
};

export const ui = {
  es: {
    "skip": "Saltar al contenido",
    "nav.home": "Inicio",
    "nav.services": "Servicios",
    "nav.work": "Trabajo",
    "nav.about": "Nosotros",
    "nav.lab": "Bluz Lab",
    "nav.lab.sub": "Recursos y newsletter",
    "nav.contact": "Contacto",
    "nav.privacy": "Privacidad",
    "nav.terms": "Términos y condiciones",
    "nav.cookies": "Política de cookies",
    "nav.portal": "Portal de clientes",
    "nav.main": "Principal",
    "nav.mobile": "Menú móvil",
    "nav.open": "Abrir menú",
    "nav.close": "Cerrar menú",
    "menu": "Menú",
    "close": "Cerrar",
    "cta.start": "Empieza tu proyecto",
    "cta.start.short": "Empieza",
    "cta.talk": "Hablemos",
    "cta.whatsapp": "Escríbenos por WhatsApp",
    "lang.switch": "Read in English",
    "lang.label": "English",
    "home.aria": "Bluz Creative, inicio",
    "footer.tagline": "Estrategia, creatividad y tecnología para marcas listas para crecer.",
    "footer.site": "Sitio",
    "footer.contact": "Contacto",
    "footer.legal": "Legales",
    "footer.location": "Caracas, Venezuela",
    "footer.cookies": "Configurar cookies",
    "social": "Redes",

    "contraluz.sub": "Comunicación y tecnología, vistas desde otro ángulo.",
    "contraluz.cta": "Suscribirme",
    "contraluz.placeholder": "tu@correo.com",
    "contraluz.label": "Tu correo para recibir Contraluz",
    "contraluz.ok": "Listo. La próxima edición llega a tu correo.",

    "contact.title": "¿Hablamos?",
    "contact.dialog": "Contacto",
    "contact.form.kicker": "Tengo un proyecto concreto",
    "contact.form.title": "Cuéntanos qué necesitas",
    "contact.chat.kicker": "Prefiero conversar",
    "contact.chat.title": "Let's talk por WhatsApp",
    "contact.chat.note": "Escríbenos y seguimos la conversación por ahí.",
    "contact.chat.message": "Hola Bluz, me gustaría hablar sobre un proyecto.",
    "contact.or": "o",
    "form.name": "Nombre",
    "form.name.ph": "Tu nombre",
    "form.email": "Correo",
    "form.email.ph": "tu@correo.com",
    "form.company": "Marca o empresa",
    "form.company.ph": "Nombre de tu marca",
    "form.site": "Web o Instagram",
    "form.site.ph": "tumarca.com o @tumarca",
    "form.services": "¿Qué necesitas?",
    "form.message": "Cuéntanos sobre el proyecto",
    "form.message.ph": "Qué quieres lograr, para cuándo y cualquier detalle que nos ayude a entenderlo.",
    "form.optional": "opcional",
    "form.send": "Enviar",
    "form.sending": "Enviando…",
    "form.legal": "Al enviar aceptas nuestra",
    "form.legal.link": "política de privacidad",
    "form.ok.title": "Recibido.",
    "form.ok.text": "Gracias por escribirnos. Revisamos tu mensaje y te respondemos por correo.",
    "form.error": "No pudimos enviar el formulario. Inténtalo de nuevo o escríbenos por WhatsApp.",

    "cookies.title": "Cookies",
    "cookies.text": "Usamos cookies propias para que la web funcione y, si aceptas, cookies de analítica y de Meta para medir y mejorar nuestras campañas.",
    "cookies.accept": "Aceptar",
    "cookies.reject": "Solo necesarias",
    "cookies.more": "Más información",
  },
  en: {
    "skip": "Skip to content",
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.work": "Work",
    "nav.about": "About",
    "nav.lab": "Bluz Lab",
    "nav.lab.sub": "Resources and newsletter",
    "nav.contact": "Contact",
    "nav.privacy": "Privacy",
    "nav.terms": "Terms and conditions",
    "nav.cookies": "Cookie policy",
    "nav.portal": "Client portal",
    "nav.main": "Main",
    "nav.mobile": "Mobile",
    "nav.open": "Open menu",
    "nav.close": "Close menu",
    "menu": "Menu",
    "close": "Close",
    "cta.start": "Start your project",
    "cta.start.short": "Start",
    "cta.talk": "Let's talk",
    "cta.whatsapp": "Message us on WhatsApp",
    "lang.switch": "Leer en español",
    "lang.label": "Español",
    "home.aria": "Bluz Creative, home",
    "footer.tagline": "Strategy, creativity and technology for brands ready to grow.",
    "footer.site": "Site",
    "footer.contact": "Contact",
    "footer.legal": "Legal",
    "footer.location": "Caracas, Venezuela",
    "footer.cookies": "Cookie settings",
    "social": "Social",

    "contraluz.sub": "Communication and technology, seen from another angle.",
    "contraluz.cta": "Subscribe",
    "contraluz.placeholder": "you@email.com",
    "contraluz.label": "Your email to get Contraluz",
    "contraluz.ok": "Done. The next issue is heading to your inbox.",

    "contact.title": "Let's talk.",
    "contact.dialog": "Contact",
    "contact.form.kicker": "I have a specific project",
    "contact.form.title": "Tell us what you need",
    "contact.chat.kicker": "I'd rather chat",
    "contact.chat.title": "Let's talk on WhatsApp",
    "contact.chat.note": "Send us a message and we'll keep the conversation going there.",
    "contact.chat.message": "Hi Bluz, I'd like to talk about a project.",
    "contact.or": "or",
    "form.name": "Name",
    "form.name.ph": "Your name",
    "form.email": "Email",
    "form.email.ph": "you@email.com",
    "form.company": "Brand or company",
    "form.company.ph": "Your brand name",
    "form.site": "Website or Instagram",
    "form.site.ph": "yourbrand.com or @yourbrand",
    "form.services": "What do you need?",
    "form.message": "Tell us about the project",
    "form.message.ph": "What you want to achieve, your timeline and any detail that helps us understand it.",
    "form.optional": "optional",
    "form.send": "Send",
    "form.sending": "Sending…",
    "form.legal": "By sending this you accept our",
    "form.legal.link": "privacy policy",
    "form.ok.title": "Got it.",
    "form.ok.text": "Thanks for reaching out. We'll review your message and reply by email.",
    "form.error": "We couldn't send the form. Please try again or message us on WhatsApp.",

    "cookies.title": "Cookies",
    "cookies.text": "We use our own cookies to make the site work and, if you accept, analytics and Meta cookies to measure and improve our campaigns.",
    "cookies.accept": "Accept",
    "cookies.reject": "Necessary only",
    "cookies.more": "Learn more",
  },
} as const;

export type UiKey = keyof (typeof ui)["es"];

export const t = (lang: Lang) => (key: UiKey) => ui[lang][key];
export const otherLang = (lang: Lang): Lang => (lang === "es" ? "en" : "es");

// Servicios del formulario de contacto. La clave es el nombre del campo que llega a Netlify.
export const contactServices = [
  { key: "paid_media", es: "Paid media", en: "Paid media" },
  { key: "contenido", es: "Estrategia de contenido", en: "Content strategy" },
  { key: "branding", es: "Branding", en: "Branding" },
  { key: "web", es: "Diseño web", en: "Web design" },
  { key: "automatizaciones", es: "Automatizaciones", en: "Automations" },
  { key: "otro", es: "Otro", en: "Other" },
] as const;

// Rutas dinámicas: páginas de proyecto y entradas de Bluz Lab
export const projectUrl = (lang: Lang, id: string) => `${routes.work[lang]}${id}/`;

export const labKinds = {
  articulo:    { es: "articulos",    en: "articles",    label: { es: "Artículos",    en: "Articles" } },
  descargable: { es: "descargables", en: "downloads",   label: { es: "Descargables", en: "Downloads" } },
  experimento: { es: "experimentos", en: "experiments", label: { es: "Experimentos", en: "Experiments" } },
  contraluz:   { es: "contraluz",    en: "contraluz",   label: { es: "Contraluz",    en: "Contraluz" } },
} as const;
export type LabKind = keyof typeof labKinds;
export const labUrl = (lang: Lang, kind: LabKind, slug: string) => `${routes.lab[lang]}${labKinds[kind][lang]}/${slug}/`;
