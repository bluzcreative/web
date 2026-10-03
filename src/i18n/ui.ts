// Idiomas, rutas de cada página y textos de la interfaz (menú, footer, botones).
// El español es el idioma principal y vive en la raíz; el inglés vive en /en/.

export const languages = { es: "Español", en: "English" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "es";

// Cada página tiene una clave y su ruta en cada idioma.
// Para sumar una página nueva: agregar la clave aquí y crear el archivo en src/pages y src/pages/en.
export const routes = {
  home:     { es: "/",           en: "/en/" },
  services: { es: "/servicios/", en: "/en/services/" },
  work:     { es: "/trabajo/",   en: "/en/work/" },
  about:    { es: "/nosotros/",  en: "/en/about/" },
} as const;
export type PageKey = keyof typeof routes;

export const navOrder: PageKey[] = ["home", "services", "work", "about"];

export const ui = {
  es: {
    "skip": "Saltar al contenido",
    "nav.home": "Inicio",
    "nav.services": "Servicios",
    "nav.work": "Trabajo",
    "nav.about": "Nosotros",
    "nav.main": "Principal",
    "nav.mobile": "Menú móvil",
    "nav.open": "Abrir menú",
    "cta.talk": "Hablemos",
    "cta.whatsapp": "Escríbenos por WhatsApp",
    "lang.switch": "Read in English",
    "footer.tagline": "Estrategia, creatividad y tecnología para marcas listas para crecer.",
    "footer.site": "Sitio",
    "footer.contact": "Contacto",
    "footer.location": "Caracas, Venezuela",
  },
  en: {
    "skip": "Skip to content",
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.work": "Work",
    "nav.about": "About",
    "nav.main": "Main",
    "nav.mobile": "Mobile",
    "nav.open": "Open menu",
    "cta.talk": "Let's talk",
    "cta.whatsapp": "Message us on WhatsApp",
    "lang.switch": "Leer en español",
    "footer.tagline": "Strategy, creativity and technology for brands ready to grow.",
    "footer.site": "Site",
    "footer.contact": "Contact",
    "footer.location": "Caracas, Venezuela",
  },
} as const;

export type UiKey = keyof (typeof ui)["es"];

export const t = (lang: Lang) => (key: UiKey) => ui[lang][key];
export const otherLang = (lang: Lang): Lang => (lang === "es" ? "en" : "es");
