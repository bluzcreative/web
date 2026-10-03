// Marcas con las que trabaja Bluz. Cuando estén los logos en SVG, agregar `logo` con la ruta
// (por ejemplo "/logos/rooties.svg") y el carrusel los muestra en lugar del nombre.
export type Client = { name: string; logo?: string };

export const clients: Client[] = [
  { name: "Rooties" },
  { name: "MioLunetto" },
  { name: "X-Build" },
  { name: "Compremos En China" },
  { name: "Disergen" },
  { name: "Prophone" },
  { name: "Flatpack Container" },
  { name: "Incon Container Wholesale" },
  { name: "Baggely Bakery" },
  { name: "Vibrant Architecture Studio" },
];

// Trabajos sin página propia todavía: aparecen como lista en Trabajo
export const moreWork = [
  { client: "Compremos En China", what: { es: "Redes sociales, guiones de reels, web y sistema automatizado de casilleros", en: "Social media, reel scripts, website and automated locker system" } },
  { client: "Flatpack Container", what: { es: "Sistema de lead scoring conectado a Meta", en: "Lead scoring system connected to Meta" } },
  { client: "Incon Container Wholesale", what: { es: "Identidad visual modular", en: "Modular visual identity" } },
  { client: "Baggely Bakery", what: { es: "Branding y diseño gráfico", en: "Branding and graphic design" } },
  { client: "Vibrant Architecture Studio", what: { es: "Identidad visual dinámica", en: "Dynamic visual identity" } },
];
