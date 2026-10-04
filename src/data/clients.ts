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

// Trabajos sin página propia todavía: aparecen como lista en Trabajo. Con `url`, el nombre lleva a la web del cliente.
type Work = { client: string; what?: { es: string; en: string }; url?: string };
const rrss = { es: "Redes sociales", en: "Social media" };
export const moreWork: Work[] = [
  { client: "Flat-Pack Container", what: { es: "Sistema de lead scoring conectado a Meta", en: "Lead scoring system connected to Meta" } },
  { client: "Disergen" },
  { client: "Miel ApiAngostura", what: rrss },
  { client: "Offsite Advisory", what: { es: "Diseño web", en: "Web design" }, url: "https://www.offsiteadvisory.com" },
  { client: "Aremind", what: { es: "Identidad visual", en: "Visual identity" } },
  { client: "The Bridge", what: rrss },
  { client: "Worldwide Solutions", what: rrss },
  { client: "Decolux", what: rrss },
  { client: "Teraled", what: rrss },
];
