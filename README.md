# Bluz Creative · web

Sitio de Bluz Creative hecho con [Astro](https://astro.build) y animaciones con GSAP + ScrollTrigger. Se publica en Netlify.

## Trabajar en local

```bash
npm install
npm run dev
```

Abre http://localhost:4321. Para revisar la versión final: `npm run build` y luego `npm run preview`.

## Dónde está cada cosa

- `src/pages/`: rutas. Español en la raíz, inglés en `src/pages/en/`.
- `src/views/`: el contenido de cada página, con los textos en español e inglés lado a lado.
- `src/components/`: piezas comunes (logo, header, footer).
- `src/layouts/Base.astro`: estructura común de todas las páginas.
- `src/i18n/ui.ts`: rutas de cada página en cada idioma y textos de la interfaz.
- `src/data/brand.ts`: datos de contacto y redes.
- `src/styles/global.css`: estilos.
- `src/scripts/main.js`: animaciones y menú.
- `netlify.toml`: configuración de publicación y redirecciones.

## Reglas de contenido

- No usar guion largo (em dash) en ningún texto de la web.
- Todo texto visible existe en español y en inglés.
