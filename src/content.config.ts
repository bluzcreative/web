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
      services: z.array(z.enum(["paid-media", "contenido", "web", "automatizaciones", "branding", "fotografia", "video"])),
      summary: t, // una línea para la tarjeta
      cover: image(),
      coverAlt: t,
      // Imágenes que se despliegan en la tarjeta al pasar el cursor y que llenan la página del proyecto
      gallery: z.array(z.object({ src: image(), alt: t, wide: z.boolean().default(false) })).default([]),
      challenge: t,
      approach: t,
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
