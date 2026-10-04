// Marcas con las que trabaja Bluz. Los logos van en public/logos, en blanco sobre fondo transparente;
// las marcas sin `logo` se muestran con su nombre.
export type Client = { name: string; logo?: string };

export const clients: Client[] = [
  { name: "Rooties", logo: "/logos/rooties.png" },
  { name: "MioLunetto", logo: "/logos/miolunetto.png" },
  { name: "X-Build", logo: "/logos/x-build.png" },
  { name: "Compremos En China", logo: "/logos/compremos-en-china.png" },
  { name: "Prophone", logo: "/logos/prophone.png" },
  { name: "Flatpack Container", logo: "/logos/flatpack-container.png" },
  { name: "The Bridge", logo: "/logos/the-bridge.png" },
]

// Trabajos sin página propia todavía: aparecen como lista en Trabajo
export const moreWork = [
  { client: "Compremos En China", what: { es: "Redes sociales, guiones de reels, web y sistema automatizado de casilleros", en: "Social media, reel scripts, website and automated locker system" } },
  { client: "Flatpack Container", what: { es: "Sistema de lead scoring conectado a Meta", en: "Lead scoring system connected to Meta" } },
  { client: "Incon Container Wholesale", what: { es: "Identidad visual modular", en: "Modular visual identity" } },
  { client: "Baggely Bakery", what: { es: "Branding y diseño gráfico", en: "Branding and graphic design" } },
  { client: "Vibrant Architecture Studio", what: { es: "Identidad visual dinámica", en: "Dynamic visual identity" } },
];
