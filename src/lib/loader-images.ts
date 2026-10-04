// Imágenes de la pantalla de carga: portadas y galerías de todos los proyectos, intercaladas
// (una de cada proyecto por turno) para que se sucedan marcas distintas. Se dejan fuera las portadas
// que son solo un logo sobre color y las capturas de webs, que no se leen en un recuadro tan chico.
import { getCollection } from "astro:content";
import type { ImageMetadata } from "astro";
import type { Lang } from "../i18n/ui";

const skipGallery = new Set(["compremos-en-china"]);

export async function loaderImages(lang: Lang) {
  const projects = (await getCollection("projects", (p) => !p.data.draft)).sort((a, b) => a.data.order - b.data.order);
  const perProject = projects.map((p) => {
    const list: { src: ImageMetadata; alt: string }[] = [];
    if (!p.data.coverFill) list.push({ src: p.data.cover, alt: p.data.coverAlt[lang] });
    if (!skipGallery.has(p.id)) list.push(...p.data.gallery.map((g) => ({ src: g.src, alt: g.alt[lang] })));
    return list;
  });
  const out: { src: ImageMetadata; alt: string }[] = [];
  for (let round = 0; perProject.some((l) => l[round]); round++) {
    for (const l of perProject) if (l[round]) out.push(l[round]);
  }
  return out;
}
