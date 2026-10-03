// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  // TODO: poner el dominio definitivo cuando esté conectado en Netlify (necesario para el sitemap y las etiquetas hreflang absolutas).
  // site: "https://bluzcreative.com",
  trailingSlash: "always",
  devToolbar: { enabled: false },
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: { prefixDefaultLocale: false },
  },
});
