// Textos legales. BORRADOR: deben revisarse con asesoría legal antes de publicar
// (en especial el estado de constitución de la LLC y la ley aplicable en los Términos).
import { brand } from "./brand";

type Section = { h: string; p: string[] };
type Doc = { title: string; updated: string; intro: string; sections: Section[] };

const updated = { es: "Última actualización: octubre de 2026", en: "Last updated: October 2026" };

export const legal: Record<"privacy" | "terms" | "cookies", Record<"es" | "en", Doc>> = {
  privacy: {
    es: {
      title: "Política de privacidad",
      updated: updated.es,
      intro: `${brand.legalName} ("Bluz", "nosotros") respeta tu privacidad. Esta política explica qué datos recogemos en este sitio, para qué los usamos y qué derechos tienes.`,
      sections: [
        { h: "Qué datos recogemos", p: [
          "Datos que nos das: nombre, correo, marca o empresa, web o Instagram y el mensaje que escribes en el formulario de contacto; tu correo si te suscribes a Contraluz o pides un descargable.",
          "Datos de navegación: si aceptas las cookies de analítica y marketing, Google Analytics y el pixel de Meta recogen información sobre tu visita (páginas vistas, dispositivo, ubicación aproximada y origen de la visita).",
        ] },
        { h: "Para qué los usamos", p: [
          "Para responder tus consultas y preparar propuestas, enviarte Contraluz y los recursos que pidas, medir y mejorar el sitio y nuestras campañas publicitarias.",
          "No vendemos tus datos a terceros.",
        ] },
        { h: "Con quién los compartimos", p: [
          "Con proveedores que nos ayudan a operar el sitio: Netlify (alojamiento y formularios), Google (analítica) y Meta (medición de campañas) y Kit (envío de Contraluz y de los descargables). Cada uno trata los datos según sus propias políticas.",
        ] },
        { h: "Cuánto tiempo los guardamos", p: [
          "Los datos de contacto, mientras dure la relación comercial o hasta que nos pidas borrarlos. La suscripción a Contraluz, hasta que te des de baja.",
        ] },
        { h: "Tus derechos", p: [
          `Puedes pedirnos acceder, corregir o borrar tus datos, o dejar de recibir comunicaciones, escribiendo a ${brand.email}. Cada correo de Contraluz incluye un enlace para darte de baja.`,
        ] },
        { h: "Cambios", p: ["Si cambiamos esta política, publicaremos la nueva versión en esta página con su fecha de actualización."] },
      ],
    },
    en: {
      title: "Privacy policy",
      updated: updated.en,
      intro: `${brand.legalName} ("Bluz", "we") respects your privacy. This policy explains what data we collect on this site, what we use it for and what rights you have.`,
      sections: [
        { h: "What we collect", p: [
          "Data you give us: name, email, brand or company, website or Instagram and the message you write in the contact form; your email if you subscribe to Contraluz or request a download.",
          "Browsing data: if you accept analytics and marketing cookies, Google Analytics and the Meta pixel collect information about your visit (pages viewed, device, approximate location and traffic source).",
        ] },
        { h: "What we use it for", p: [
          "To answer your inquiries and prepare proposals, send you Contraluz and the resources you request, and measure and improve the site and our ad campaigns.",
          "We don't sell your data to third parties.",
        ] },
        { h: "Who we share it with", p: [
          "Providers that help us run the site: Netlify (hosting and forms), Google (analytics) and Meta (campaign measurement) and Kit (sending Contraluz and downloads). Each processes data under its own policies.",
        ] },
        { h: "How long we keep it", p: [
          "Contact data, for as long as the business relationship lasts or until you ask us to delete it. Contraluz subscriptions, until you unsubscribe.",
        ] },
        { h: "Your rights", p: [
          `You can ask us to access, correct or delete your data, or to stop contacting you, by writing to ${brand.email}. Every Contraluz email includes an unsubscribe link.`,
        ] },
        { h: "Changes", p: ["If we update this policy, we'll publish the new version on this page with its update date."] },
      ],
    },
  },
  terms: {
    es: {
      title: "Términos y condiciones",
      updated: updated.es,
      intro: `Estos términos regulan el uso de este sitio, operado por ${brand.legalName}, sociedad registrada en Estados Unidos. Al usarlo, los aceptas.`,
      sections: [
        { h: "Uso del sitio", p: ["Puedes navegar, leer y compartir el contenido para fines personales o informativos. No está permitido usar el sitio para actividades ilegales ni intentar afectar su funcionamiento."] },
        { h: "Propiedad intelectual", p: ["Los textos, diseños, marcas y recursos de Bluz Lab son de Bluz o de sus clientes, que autorizaron mostrarlos. Los descargables son para tu uso propio; no puedes revenderlos ni publicarlos como tuyos."] },
        { h: "Proyectos y servicios", p: ["La información del sitio es orientativa. Cada servicio se rige por la propuesta y el acuerdo que firmemos con el cliente."] },
        { h: "Enlaces externos", p: ["El sitio puede enlazar a webs de terceros. No somos responsables de su contenido ni de sus políticas."] },
        { h: "Responsabilidad", p: ["Hacemos lo posible para que el contenido sea correcto y esté disponible, pero no garantizamos que esté libre de errores ni que funcione sin interrupciones."] },
        { h: "Ley aplicable", p: ["Estos términos se rigen por las leyes del estado de Estados Unidos donde está registrada Bluz Creative LLC."] },
        { h: "Contacto", p: [`Para cualquier consulta sobre estos términos, escríbenos a ${brand.email}.`] },
      ],
    },
    en: {
      title: "Terms and conditions",
      updated: updated.en,
      intro: `These terms govern the use of this site, operated by ${brand.legalName}, a company registered in the United States. By using it, you accept them.`,
      sections: [
        { h: "Use of the site", p: ["You may browse, read and share the content for personal or informational purposes. You may not use the site for unlawful activities or try to disrupt how it works."] },
        { h: "Intellectual property", p: ["Texts, designs, trademarks and Bluz Lab resources belong to Bluz or to its clients, who authorized showing them. Downloads are for your own use; you may not resell them or publish them as your own."] },
        { h: "Projects and services", p: ["Information on this site is for guidance. Each service is governed by the proposal and agreement we sign with the client."] },
        { h: "External links", p: ["The site may link to third-party websites. We're not responsible for their content or policies."] },
        { h: "Liability", p: ["We do our best to keep content accurate and available, but we don't guarantee it's error-free or uninterrupted."] },
        { h: "Governing law", p: ["These terms are governed by the laws of the U.S. state where Bluz Creative LLC is registered."] },
        { h: "Contact", p: [`For any question about these terms, write to ${brand.email}.`] },
      ],
    },
  },
  cookies: {
    es: {
      title: "Política de cookies",
      updated: updated.es,
      intro: "Las cookies son pequeños archivos que el navegador guarda al visitar un sitio. Aquí te contamos cuáles usamos y cómo cambiar tu elección.",
      sections: [
        { h: "Necesarias", p: ["Guardan tu elección sobre las cookies (bluz-consent) y si ya viste la animación de inicio en esta visita. Funcionan siempre porque el sitio las necesita."] },
        { h: "Analítica (solo si aceptas)", p: ["Google Analytics (_ga, _ga_*) para entender cómo se usa el sitio, con la IP anonimizada."] },
        { h: "Marketing (solo si aceptas)", p: ["Pixel de Meta (_fbp) para medir y mejorar nuestras campañas en Facebook e Instagram."] },
        { h: "Cómo cambiar tu elección", p: ["Usa el enlace “Configurar cookies” al pie de cualquier página. También puedes borrar las cookies desde la configuración de tu navegador."] },
      ],
    },
    en: {
      title: "Cookie policy",
      updated: updated.en,
      intro: "Cookies are small files your browser stores when you visit a site. Here's which ones we use and how to change your choice.",
      sections: [
        { h: "Necessary", p: ["They store your cookie choice (bluz-consent) and whether you've already seen the intro animation during this visit. They're always on because the site needs them."] },
        { h: "Analytics (only if you accept)", p: ["Google Analytics (_ga, _ga_*) to understand how the site is used, with IP anonymization."] },
        { h: "Marketing (only if you accept)", p: ["Meta pixel (_fbp) to measure and improve our Facebook and Instagram campaigns."] },
        { h: "How to change your choice", p: ["Use the “Cookie settings” link at the bottom of any page. You can also delete cookies from your browser settings."] },
      ],
    },
  },
};
