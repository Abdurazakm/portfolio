import { seo, siteUrl } from "../seo.config.mjs";
import { findService, services } from "../src/services.js";

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

export function pageMetadata(pathname = "/") {
  if (pathname === "/" || pathname === "/index.html") return { ...seo, path: "/" };
  return findService(pathname) || {
    title: "Page Not Found | Abdurazak Mohammed",
    description: "Explore Abdurazak Mohammed’s portfolio, projects, and services.",
    path: null,
  };
}

export function structuredData(url, pathname = "/") {
  const page = pageMetadata(pathname);
  const pageUrl = url && page.path ? new URL(page.path, url).href : null;
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
      ...(page.path === "/" ? [
        { "@type": "ProfilePage", "@id": url ? `${url}#profile` : "#profile", name: seo.title, description: seo.description, ...(url && { url }), inLanguage: "en", mainEntity: { "@id": person["@id"] }, isPartOf: { "@id": url ? `${url}#website` : "#website" } },
      ] : page.path ? [
        { "@type": "WebPage", "@id": `${pageUrl || page.path}#page`, name: page.title, description: page.description, ...(pageUrl && { url: pageUrl }), inLanguage: "en", mainEntity: { "@id": `${pageUrl || page.path}#service` }, isPartOf: { "@id": url ? `${url}#website` : "#website" } },
        { "@type": "Service", "@id": `${pageUrl || page.path}#service`, name: page.name, serviceType: page.name, description: page.intro, provider: { "@id": person["@id"] }, areaServed: { "@type": "Place", name: "Hawassa, Ethiopia" }, ...(pageUrl && { url: pageUrl }) },
      ] : []),
    ],
  };
}

export function renderSeoHead({ url, indexable }, pathname = "/") {
  const page = pageMetadata(pathname);
  const pageUrl = url && page.path ? new URL(page.path, url).href : null;
  const meta = (key, value, attribute = "name") => `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`;
  return [
    `<title>${escapeHtml(page.title)}</title>`,
    meta("description", page.description),
    meta("author", seo.name),
    meta("robots", indexable && page.path ? "index, follow, max-image-preview:large" : "noindex, follow"),
    ...(pageUrl ? [`<link rel="canonical" href="${escapeHtml(pageUrl)}" />`] : []),
    meta("og:type", "website", "property"),
    meta("og:site_name", `${seo.name} — Portfolio`, "property"),
    meta("og:title", page.title, "property"),
    meta("og:description", page.description, "property"),
    meta("twitter:card", "summary_large_image"),
    meta("twitter:title", page.title),
    meta("twitter:description", page.description),
    ...(pageUrl ? [meta("og:url", pageUrl, "property")] : []),
    ...(url ? [
      meta("og:image", new URL(seo.socialImage, url).href, "property"),
      meta("og:image:type", "image/jpeg", "property"),
      meta("og:image:width", "1200", "property"),
      meta("og:image:height", "630", "property"),
      meta("og:image:alt", seo.socialImageAlt, "property"),
      meta("twitter:image", new URL(seo.socialImage, url).href),
      meta("twitter:image:alt", seo.socialImageAlt),
    ] : []),
    `<script type="application/ld+json">${JSON.stringify(structuredData(url, pathname)).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}

export function robotsText({ url, indexable }) {
  // Allow crawlers to fetch preview pages so they can see the noindex directive.
  return `User-agent: *\nAllow: /\n${url && indexable ? `\nSitemap: ${url}sitemap.xml\n` : ""}`;
}

export function sitemapXml({ url, indexable }) {
  const paths = ["/", ...services.map((service) => service.path)];
  const entries = url && indexable ? paths.map((path) => `  <url><loc>${escapeHtml(new URL(path, url).href)}</loc></url>`).join("\n") : "";
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

export function seoPlugin(settings) {
  return {
    name: "portfolio-seo",
    transformIndexHtml(html, context) {
      const path = context.path === "/index.html" ? "/" : context.path;
      return html.replace("<!--seo-head-->", `<!--seo-start-->${renderSeoHead(settings, path)}<!--seo-end-->`);
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
