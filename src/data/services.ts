// Los cinco servicios de Bluz. Se usan en la landing (escena 2), en Servicios y en las etiquetas de proyectos.
export const services = [
  {
    slug: "paid-media",
    name: { es: "Paid media", en: "Paid media" },
    line: {
      es: "Campañas que se miden en ventas, no en likes.",
      en: "Campaigns measured in sales, not likes.",
    },
    body: {
      es: "Planificamos, lanzamos y optimizamos campañas en Meta y Google con un objetivo de negocio claro. Cada semana revisamos qué funciona, movemos presupuesto hacia ahí y te mostramos el porqué.",
      en: "We plan, launch and optimize Meta and Google campaigns around a clear business goal. Every week we check what's working, shift budget toward it and show you why.",
    },
    items: {
      es: ["Meta Ads", "Google Ads", "Estrategia de campañas", "Generación de leads", "Embudos de venta", "Píxel y eventos de conversión", "Reportes de rendimiento"],
      en: ["Meta Ads", "Google Ads", "Campaign strategy", "Lead generation", "Sales funnels", "Pixel and conversion events", "Performance reports"],
    },
  },
  {
    slug: "contenido",
    name: { es: "Estrategia de contenido", en: "Content strategy" },
    line: {
      es: "Contenido con intención: cada pieza tiene un trabajo que hacer.",
      en: "Content with intent: every piece has a job to do.",
    },
    body: {
      es: "Definimos qué decir, a quién y en qué formato. Planificamos el mes, producimos fotos, reels y diseño, y manejamos la comunidad para que la marca suene igual en cada canal.",
      en: "We define what to say, to whom and in which format. We plan the month, produce photos, reels and design, and manage the community so the brand sounds the same on every channel.",
    },
    items: {
      es: ["Estrategia de redes", "Planificación mensual", "Fotografía de producto", "Reels, Shorts y TikToks", "Diseño de feed", "Community management", "Motion graphics"],
      en: ["Social media strategy", "Monthly planning", "Product photography", "Reels, Shorts and TikToks", "Feed design", "Community management", "Motion graphics"],
    },
  },
  {
    slug: "branding",
    name: { es: "Branding", en: "Branding" },
    line: {
      es: "Identidades que se reconocen antes de leer el nombre.",
      en: "Identities people recognize before reading the name.",
    },
    body: {
      es: "Construimos marcas desde el porqué hasta el último detalle visual: posicionamiento, logo, paleta, tipografía y un manual para que todo el equipo las use bien.",
      en: "We build brands from the why down to the last visual detail: positioning, logo, palette, typography and a guide so the whole team uses them right.",
    },
    items: {
      es: ["Posicionamiento de marca", "Identidad visual", "Diseño de logo", "Manual de marca", "Packaging", "Material POP", "Presentaciones corporativas"],
      en: ["Brand positioning", "Visual identity", "Logo design", "Brand guidelines", "Packaging", "Point-of-sale materials", "Corporate presentations"],
    },
  },
  {
    slug: "web",
    name: { es: "Diseño web", en: "Web design" },
    line: {
      es: "Webs que se ven bien y convierten visitas en conversaciones.",
      en: "Websites that look great and turn visits into conversations.",
    },
    body: {
      es: "Diseñamos y construimos sitios corporativos y landing pages rápidos, bilingües cuando hace falta y conectados a tus herramientas, para que cada formulario llegue directo a tu equipo de ventas.",
      en: "We design and build fast corporate sites and landing pages, bilingual when needed and connected to your tools, so every form lands straight with your sales team.",
    },
    items: {
      es: ["Sitios corporativos", "Landing pages", "SEO técnico", "Formularios conectados al CRM", "Sitios bilingües", "Mantenimiento"],
      en: ["Corporate websites", "Landing pages", "Technical SEO", "CRM-connected forms", "Bilingual sites", "Maintenance"],
    },
  },
  {
    slug: "automatizaciones",
    name: { es: "Automatizaciones", en: "Automations" },
    line: {
      es: "Lo repetitivo, en piloto automático. Tu equipo, en lo importante.",
      en: "The repetitive stuff on autopilot. Your team on what matters.",
    },
    body: {
      es: "Conectamos tus herramientas para que los procesos corran solos: leads que se clasifican, documentos que se generan y mensajes que salen a tiempo. También probamos la IA donde de verdad ahorra horas.",
      en: "We connect your tools so processes run on their own: leads that get scored, documents that get generated and messages that go out on time. We also put AI to work where it actually saves hours.",
    },
    items: {
      es: ["Implementación de CRM", "Lead scoring", "Make, Zapier y Apps Script", "Integración con WhatsApp", "Secuencias de email", "Automatizaciones con IA", "Capacitación del equipo"],
      en: ["CRM implementation", "Lead scoring", "Make, Zapier and Apps Script", "WhatsApp integration", "Email sequences", "AI automations", "Team training"],
    },
  },
] as const;

// Etiquetas para los servicios que aparecen en los proyectos
export const serviceTags = {
  "paid-media": { es: "Paid media", en: "Paid media" },
  contenido: { es: "Contenido", en: "Content" },
  web: { es: "Web", en: "Web" },
  automatizaciones: { es: "Automatización", en: "Automation" },
  branding: { es: "Branding", en: "Branding" },
  fotografia: { es: "Fotografía", en: "Photography" },
  video: { es: "Video", en: "Video" },
} as const;
