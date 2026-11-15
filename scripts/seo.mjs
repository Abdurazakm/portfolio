import { seo, siteUrl } from "../seo.config.mjs";

export function normalizeSiteUrl(value) {
  if (!value?.trim()) return null;
  const url = new URL(value.trim());
  if (url.protocol !== "https:" || url.username || url.password || url.port ||
      url.search || url.hash || url.pathname !== "/" ||
      !url.hostname.includes(".") || url.hostname.endsWith(".local") ||
      /^(localhost|127\.|0\.|192\.168\.|10\.)/.test(url.hostname)) {
    throw new Error("SITE_URL must be the public HTTPS origin, without a path, query, credentials, or port.");
  }
  return url.origin + "/";
}

export function seoSettings(env = {}) {
  return {
    url: normalizeSiteUrl(env.SITE_URL || siteUrl),
    indexable: env.VERCEL_ENV !== "preview" && env.SEO_NOINDEX !== "true",
  };
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
}

export function structuredData(url) {
  const person = {
    "@type": "Person",
    "@id": url ? `${url}#person` : "#person",
    name: seo.name,
    jobTitle: "Full-stack Developer",
    description: seo.description,
    sameAs: seo.sameAs,
    homeLocation: { "@type": "Place", name: "Hawassa, Ethiopia" },
    ...(url && { url, image: new URL("/abdurazak.png", url).href }),
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      person,
      { "@type": "WebSite", "@id": url ? `${url}#website` : "#website", name: `${seo.name} — Portfolio`, ...(url && { url }), inLanguage: "en", publisher: { "@id": person["@id"] } },
      { "@type": "ProfilePage", "@id": url ? `${url}#profile` : "#profile", name: seo.title, description: seo.description, ...(url && { url }), inLanguage: "en", mainEntity: { "@id": person["@id"] }, isPartOf: { "@id": url ? `${url}#website` : "#website" } },
    ],
  };
}

export function renderSeoHead({ url, indexable }) {
  const meta = (key, value, attribute = "name") => `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    meta("description", seo.description),
    meta("author", seo.name),
    meta("robots", indexable ? "index, follow, max-image-preview:large" : "noindex, follow"),
    ...(url ? [`<link rel="canonical" href="${escapeHtml(url)}" />`] : []),
    meta("og:type", "website", "property"),
    meta("og:site_name", `${seo.name} — Portfolio`, "property"),
    meta("og:title", seo.title, "property"),
    meta("og:description", seo.description, "property"),
    meta("twitter:card", "summary_large_image"),
    meta("twitter:title", seo.title),
    meta("twitter:description", seo.description),
    ...(url ? [
      meta("og:url", url, "property"),
      meta("og:image", new URL(seo.socialImage, url).href, "property"),
      meta("og:image:type", "image/jpeg", "property"),
      meta("og:image:width", "1200", "property"),
      meta("og:image:height", "630", "property"),
      meta("og:image:alt", seo.socialImageAlt, "property"),
      meta("twitter:image", new URL(seo.socialImage, url).href),
      meta("twitter:image:alt", seo.socialImageAlt),
    ] : []),
    `<script type="application/ld+json">${JSON.stringify(structuredData(url)).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}

export function robotsText({ url, indexable }) {
  // Allow crawlers to fetch preview pages so they can see the noindex directive.
  return `User-agent: *\nAllow: /\n${url && indexable ? `\nSitemap: ${url}sitemap.xml\n` : ""}`;
}

export function sitemapXml({ url, indexable }) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${url && indexable ? `\n  <url><loc>${escapeHtml(url)}</loc></url>\n` : ""}</urlset>\n`;
}

export function seoPlugin(settings) {
  return {
    name: "portfolio-seo",
    transformIndexHtml(html) {
      return html.replace("<!--seo-head-->", renderSeoHead(settings));
    },
    generateBundle(_options, _bundle, isWrite) {
      if (!isWrite) return;
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robotsText(settings) });
      if (settings.url && settings.indexable) {
        this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemapXml(settings) });
      }
    },
  };
}
