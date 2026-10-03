// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Netlify define URL con el dominio principal del sitio (bluz-web.netlify.app hoy, el dominio propio
// cuando se conecte), así las URL canónicas, el sitemap y hreflang siempre apuntan al dominio correcto.
const site = process.env.URL || "http://localhost:4321";

export default defineConfig({
  site,
  trailingSlash: "always",
  devToolbar: { enabled: false },
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/(gracias|thanks)\/$/.test(page),
      i18n: { defaultLocale: "es", locales: { es: "es", en: "en" } },
    }),
  ],
});
