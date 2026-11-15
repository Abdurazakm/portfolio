import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { seoPlugin, seoSettings } from "./scripts/seo.mjs";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const settings = seoSettings({ ...env, ...process.env });
  if (!settings.url) console.warn("SEO: set siteUrl in seo.config.mjs or SITE_URL to enable the canonical URL, sitemap, and absolute social images.");
  return {
    plugins: [tailwindcss(), react(), seoPlugin(settings)],
    define: { "import.meta.env.VITE_BUILD_YEAR": JSON.stringify(new Date().getUTCFullYear()) },
  };
});
