// Colecciones de contenido.
// - projects: un archivo JSON por proyecto del portafolio (src/content/projects).
// - lab: artículos, descargables, experimentos y ediciones de Contraluz en Markdown (src/content/lab).
import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const t = z.object({ es: z.string(), en: z.string() });

const projects = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      client: z.string(),
      order: z.number().default(100),
      featured: z.boolean().default(false), // aparece en la landing
      draft: z.boolean().default(false),
      year: z.number().optional(),
      country: t.optional(),
      industry: t,
      services: z.array(z.enum(["paid-media", "contenido", "web", "automatizaciones", "branding", "audiovisual", "fotografia", "video", "diseno", "redes"])),
      summary: t, // una línea para la tarjeta
      cover: image(),
      coverAlt: t,
      coverFocus: z.string().optional(), // punto de la portada que se mantiene al recortar, ej. "50% 65%"
      coverVideo: z.string().optional(), // video propio que se mueve en la portada, sin audio (la imagen de portada queda como póster)
      coverFill: z.string().optional(), // color de fondo para mostrar la portada completa, sin recortar (ej. un logo)
      // Imagen de presentación de la empresa: queda fija detrás del reto y el enfoque
      presentation: image().optional(),
      presentationAlt: t.optional(),
      // Imágenes que se despliegan en la tarjeta al pasar el cursor y que llenan la página del proyecto
      // phone: captura de móvil, se muestra como pantalla de teléfono; wide: pieza a todo lo ancho
      gallery: z.array(z.object({ src: image(), alt: t, wide: z.boolean().default(false), phone: z.boolean().default(false) })).default([]),
      challenge: t.optional(),
      approach: t.optional(),
      // Bloques de la página del proyecto, en orden. Si no hay bloques, se usan reto y enfoque.
      blocks: z.array(z.discriminatedUnion("type", [
        // Frase grande + párrafo
        z.object({ type: z.literal("statement"), title: t, body: t.optional() }),
        // Lista de lo que hizo Bluz, en tipografía grande
        z.object({ type: z.literal("list"), items: z.array(t) }),
        // Video propio, sin audio, en bucle (archivo en /public)
        z.object({ type: z.literal("video"), src: z.string().optional(), youtube: z.string().optional(), poster: z.string().optional(), vertical: z.boolean().default(false), alt: t }),
        // Mosaico de imágenes
        // small: imágenes de contexto (no hechas por Bluz) en una grilla más chica, con márgenes
        // focus: punto de la imagen que se mantiene al recortar (por ejemplo "50% 70%")
        z.object({ type: z.literal("mosaic"), small: z.boolean().default(false),
          images: z.array(z.object({ src: image(), alt: t, wide: z.boolean().default(false), focus: z.string().optional() })) }),
        // Sitio web: capturas de escritorio en una ventana de navegador que enlaza al sitio
        z.object({ type: z.literal("site"), url: z.string().url(), shots: z.array(z.object({ src: image(), alt: t })) }),
        // Grilla de piezas cuadradas (logos, íconos) sobre un fondo propio
        z.object({ type: z.literal("tiles"), columns: z.number().default(3), background: z.string().optional(),
          images: z.array(z.object({ src: image(), alt: t })) }),
        // Paleta de colores que se desliza en horizontal; main: color principal (panel más ancho)
        z.object({ type: z.literal("palette"), intro: t.optional(), colors: z.array(z.object({
          name: t.optional(), hex: z.string(), cmyk: z.string().optional(), rgb: z.string().optional(), main: z.boolean().default(false) })) }),
        // Tipografías: muestra en vivo (font + file en /public) o como imagen
        z.object({ type: z.literal("typography"), fonts: z.array(z.object({
          name: z.string(), role: t.optional(), text: t.optional(), background: z.string(), color: z.string(),
          family: z.string().optional(), file: z.string().optional(), image: image().optional(), imageEn: image().optional(), alt: t.optional() })) }),
        // Flujo: una automatización explicada en pasos simples, que se van encendiendo con el scroll
        z.object({ type: z.literal("flow"), title: t, intro: t.optional(),
          steps: z.array(z.object({ icon: z.enum(["form", "sheet", "box", "folder", "mail", "whatsapp", "calc", "check"]), title: t, body: t })) }),
        // Íconos con un texto que explica la marca, en filas alternadas
        z.object({ type: z.literal("icons"), background: z.string(), color: z.string(), family: z.string().optional(), file: z.string().optional(),
          items: z.array(z.object({ src: image(), alt: t, title: t, body: t })) }),
        // Video destacado: un video vertical grande junto a su historia (reverse: video a la derecha)
        z.object({ type: z.literal("feature"), src: z.string(), poster: z.string().optional(), alt: t,
          kicker: t.optional(), title: t, body: t, reverse: z.boolean().default(false), ratio: z.string().optional() }),
        // Carrusel: diapositivas de un post que se deslizan solas, con flechas y gesto de deslizar
        z.object({ type: z.literal("carousel"), title: t, body: t.optional(), reverse: z.boolean().default(false),
          slides: z.array(z.object({ src: image().optional(), video: z.string().optional(), poster: z.string().optional(), alt: t })) }),
        // Reels: varios videos verticales propios en fila, sin audio
        z.object({ type: z.literal("reels"), videos: z.array(z.object({ src: z.string(), poster: z.string().optional(), alt: t })) }),
        // Brochures: vista previa breve de algunas páginas, sin descarga
        z.object({ type: z.literal("brochures"), items: z.array(z.object({ title: t, pages: z.array(image()) })) }),
        // Redes: texto, enlaces y un video opcional
        z.object({ type: z.literal("social"), text: t, links: z.array(z.object({ label: z.string(), url: z.string().url() })),
          video: z.string().optional(), poster: z.string().optional(), videoAlt: t.optional() }),
      ])).default([]),
      results: z.array(z.object({ value: z.string(), label: t })).default([]),
      testimonial: z.object({ quote: t, author: z.string(), role: t.optional() }).optional(),
      accent: z.string().optional(), // color de apoyo del proyecto para marcadores
    }),
});

const lab = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/lab" }),
  schema: ({ image }) =>
    z.object({
      kind: z.enum(["articulo", "descargable", "experimento", "contraluz"]),
      lang: z.enum(["es", "en"]),
      slug: z.string(),
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      draft: z.boolean().default(false),
      translationKey: z.string().optional(), // une la versión en español con la versión en inglés
      cover: image().optional(),
      issue: z.number().optional(), // número de edición de Contraluz
      file: z.string().optional(), // ruta del descargable dentro de /public
      tags: z.array(z.string()).default([]),
    }),
});

export const collections = { projects, lab };
