// Bluz Lab desde Notion: lee la base de datos "Bluz Lab" al construir la web.
// Solo entran las filas con la casilla "Publicado" marcada. Las imágenes y archivos de Notion
// caducan en una hora, así que se descargan a public/lab-media y la web usa esa copia.
// Variables de entorno (en Netlify): NOTION_TOKEN y NOTION_LAB_DB (id de la base de datos).
import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { extname } from "node:path";

const API = "https://api.notion.com/v1";
const MEDIA_DIR = new URL("../../public/lab-media/", import.meta.url);

type RichText = { plain_text: string; href: string | null; annotations: Record<string, boolean | string> };
type Block = { id: string; type: string; has_children: boolean; [k: string]: any };

const kinds: Record<string, string> = { "artículo": "articulo", articulo: "articulo", descargable: "descargable", experimento: "experimento", contraluz: "contraluz" };

async function notion(path: string, token: string, body?: unknown) {
  const res = await fetch(`${API}${path}`, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${token}`, "Notion-Version": "2022-06-28", "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`Notion ${path}: ${res.status} ${await res.text()}`);
  return res.json();
}

async function children(id: string, token: string): Promise<Block[]> {
  const out: Block[] = [];
  let cursor: string | undefined;
  do {
    const r = await notion(`/blocks/${id}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ""}`, token);
    out.push(...r.results);
    cursor = r.has_more ? r.next_cursor : undefined;
  } while (cursor);
  for (const b of out) if (b.has_children) b.children = await children(b.id, token);
  return out;
}

// Copia un archivo de Notion a public/lab-media y devuelve su ruta pública
async function localCopy(url: string): Promise<string> {
  const name = createHash("sha1").update(url.split("?")[0]).digest("hex").slice(0, 16) + (extname(new URL(url).pathname) || ".bin");
  await mkdir(MEDIA_DIR, { recursive: true });
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo descargar ${url}: ${res.status}`);
  await writeFile(new URL(name, MEDIA_DIR), Buffer.from(await res.arrayBuffer()));
  return `/lab-media/${name}`;
}

const fileUrl = (f: any) => (f?.type === "external" ? f.external.url : f?.file?.url) as string | undefined;
// Los archivos subidos a Notion se copian; los enlaces externos (Drive, Canva...) se usan tal cual
const keep = async (f: any) => (f?.type === "file" ? localCopy(f.file.url) : fileUrl(f));
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function text(rt: RichText[] = []) {
  return rt.map((r) => {
    let h = esc(r.plain_text).replace(/\n/g, "<br>");
    const a = r.annotations;
    if (a.code) h = `<code>${h}</code>`;
    if (a.bold) h = `<strong>${h}</strong>`;
    if (a.italic) h = `<em>${h}</em>`;
    if (a.strikethrough) h = `<s>${h}</s>`;
    if (r.href) h = `<a href="${esc(r.href)}"${/^https?:/.test(r.href) ? ' target="_blank" rel="noopener"' : ""}>${h}</a>`;
    return h;
  }).join("");
}

async function html(blocks: Block[]): Promise<string> {
  let out = "";
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const v = b[b.type] ?? {};
    const inner = b.children ? await html(b.children) : "";
    // Las viñetas y listas numeradas consecutivas se agrupan en una sola lista
    if (b.type === "bulleted_list_item" || b.type === "numbered_list_item") {
      const tag = b.type === "bulleted_list_item" ? "ul" : "ol";
      let items = "";
      while (i < blocks.length && blocks[i].type === b.type) {
        const it = blocks[i];
        items += `<li>${text(it[it.type].rich_text)}${it.children ? await html(it.children) : ""}</li>`;
        i++;
      }
      i--;
      out += `<${tag}>${items}</${tag}>`;
      continue;
    }
    switch (b.type) {
      case "paragraph": out += v.rich_text.length ? `<p>${text(v.rich_text)}</p>` : ""; break;
      case "heading_1": out += `<h2>${text(v.rich_text)}</h2>`; break;
      case "heading_2": out += `<h2>${text(v.rich_text)}</h2>`; break;
      case "heading_3": out += `<h3>${text(v.rich_text)}</h3>`; break;
      case "quote": out += `<blockquote>${text(v.rich_text)}${inner}</blockquote>`; break;
      case "callout": out += `<aside class="callout">${text(v.rich_text)}${inner}</aside>`; break;
      case "divider": out += "<hr>"; break;
      case "to_do": out += `<p>${v.checked ? "☑" : "☐"} ${text(v.rich_text)}</p>`; break;
      case "toggle": out += `<details><summary>${text(v.rich_text)}</summary>${inner}</details>`; break;
      case "code": out += `<pre><code>${esc(v.rich_text.map((r: RichText) => r.plain_text).join(""))}</code></pre>`; break;
      case "image": {
        const src = await keep(v);
        if (src) out += `<figure><img src="${src}" alt="${esc(v.caption?.map((r: RichText) => r.plain_text).join("") ?? "")}" loading="lazy">${v.caption?.length ? `<figcaption>${text(v.caption)}</figcaption>` : ""}</figure>`;
        break;
      }
      case "video": case "embed": case "bookmark": case "link_preview": {
        const url = v.url ?? fileUrl(v);
        if (url) out += `<p><a href="${esc(url)}" target="_blank" rel="noopener">${esc(url)}</a></p>`;
        break;
      }
      case "column_list": case "column": case "synced_block": out += inner; break;
      default: break; // Bloques que la web no muestra (tablas de base de datos, etc.)
    }
  }
  return out;
}

const slugify = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const prop = (p: any) => {
  if (!p) return undefined;
  switch (p.type) {
    case "title": case "rich_text": return p[p.type].map((r: RichText) => r.plain_text).join("").trim() || undefined;
    case "select": return p.select?.name;
    case "multi_select": return p.multi_select.map((o: any) => o.name);
    case "date": return p.date?.start;
    case "checkbox": return p.checkbox;
    case "number": return p.number ?? undefined;
    case "files": return p.files;
    default: return undefined;
  }
};

export type NotionLabEntry = { id: string; data: Record<string, unknown>; html: string };

export async function loadNotionLab(token: string, databaseId: string): Promise<NotionLabEntry[]> {
  const pages: any[] = [];
  let cursor: string | undefined;
  do {
    const r = await notion(`/databases/${databaseId}/query`, token, {
      filter: { property: "Publicado", checkbox: { equals: true } },
      sorts: [{ property: "Fecha", direction: "descending" }],
      start_cursor: cursor,
    });
    pages.push(...r.results);
    cursor = r.has_more ? r.next_cursor : undefined;
  } while (cursor);

  const entries: NotionLabEntry[] = [];
  for (const page of pages) {
    const p = page.properties;
    const title = prop(p["Título"]) ?? prop(p["Name"]);
    const kind = kinds[(prop(p["Tipo"]) ?? "").toLowerCase()];
    const lang = (prop(p["Idioma"]) ?? "ES").toLowerCase();
    if (!title || !kind) continue;
    const cover = (prop(p["Portada"]) as any[] | undefined)?.[0] ?? page.cover;
    const file = (prop(p["Archivo"]) as any[] | undefined)?.[0];
    entries.push({
      id: `notion/${lang}/${page.id}`,
      data: {
        kind, lang, title,
        slug: prop(p["Slug"]) ?? slugify(title),
        description: prop(p["Resumen"]) ?? "",
        date: prop(p["Fecha"]) ?? page.created_time,
        draft: false,
        translationKey: prop(p["Traducción"]),
        issue: prop(p["Edición"]),
        tags: prop(p["Etiquetas"]) ?? [],
        coverUrl: cover ? await keep(cover) : undefined,
        file: file ? await keep(file) : undefined,
      },
      html: await html(await children(page.id, token)),
    });
  }
  return entries;
}
