import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { services } from "../src/services.js";
import { projects } from "../src/projects.js";

const html = await readFile("dist/index.html", "utf8");
assert.doesNotMatch(html, /<!--seo-head-->|<div id="root"><\/div>/);
assert.equal((html.match(/<title>/g) || []).length, 1);
assert.equal((html.match(/name="description"/g) || []).length, 1);
assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
for (const content of ["Fetan Delivery", "VoiceLocal", "Mayaye Eye Clinic", "Yaltopia Tech", "Software Engineering", "abdurazakm343@gmail.com"]) {
  assert.ok(html.includes(content), `${content} must be present before JavaScript executes.`);
}
for (const id of ["home", "projects", "services", "about", "experience", "contact"]) {
  assert.ok(html.includes(`id="${id}"`), `Missing section: ${id}`);
}
const schema = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
assert.ok(schema["@graph"].some(item => item["@type"] === "Person"));
const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
const robots = await readFile("dist/robots.txt", "utf8");
if (canonical) {
  assert.ok(html.includes(`property="og:url" content="${canonical}"`));
  assert.ok(html.includes(`content="${canonical}social-preview.jpg"`));
  if (!html.includes('content="noindex, follow"')) {
    assert.ok(robots.includes(`Sitemap: ${canonical}sitemap.xml`));
    const sitemap = await readFile("dist/sitemap.xml", "utf8");
    assert.ok(sitemap.includes(`<loc>${canonical}</loc>`));
  }
}
await access("dist/social-preview.jpg");
await access("dist/abdurazak.png");
const pages = new Map([["/", html]]);
for (const project of projects) {
  assert.ok(html.includes(project.userExplanation), `Plain-language explanation: ${project.title}`);
  assert.ok(html.includes(project.implementation), `Technical explanation: ${project.title}`);
}
for (const service of services) {
  const page = await readFile(`dist${service.path}index.html`, "utf8");
  pages.set(service.path, page);
  assert.doesNotMatch(page, /<!--seo-(?:head|start|end)-->|<div id="root"><\/div>/);
  assert.equal((page.match(/<title>/g) || []).length, 1, `One title on ${service.path}`);
  assert.equal((page.match(/name="description"/g) || []).length, 1, `One description on ${service.path}`);
  assert.equal((page.match(/<h1(?:\s|>)/g) || []).length, 1, `One h1 on ${service.path}`);
  assert.ok(page.includes(service.headline.replaceAll("&", "&amp;")) && page.includes(service.accent), `Service heading: ${service.path}`);
  assert.ok(page.includes(service.intro), `Service content before JavaScript: ${service.path}`);
  assert.ok(page.includes("FOR YOUR BUSINESS") && page.includes("FOR TECHNICAL READERS"));
  const graph = JSON.parse(page.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])["@graph"];
  assert.ok(graph.some((item) => item["@type"] === "Service"));
  assert.ok(!graph.some((item) => item["@type"] === "ProfilePage"));
  if (canonical) {
    const pageUrl = new URL(service.path, canonical).href;
    assert.ok(page.includes(`rel="canonical" href="${pageUrl}"`));
    assert.ok(page.includes(`property="og:url" content="${pageUrl}"`));
    assert.ok(page.includes(`content="${canonical}social-preview.jpg"`));
  }
}
// Check every internal page and anchor, including links back from services.
for (const [path, page] of pages) {
  for (const [, href] of page.matchAll(/href="([^"?]+)"/g)) {
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    const link = new URL(href, `https://portfolio.example${path}`);
    if (pages.has(link.pathname)) {
      if (link.hash) assert.ok(pages.get(link.pathname).includes(`id="${link.hash.slice(1)}"`), `${path}: unresolved ${href}`);
    } else {
      assert.ok(/\.[a-z0-9]+$/i.test(link.pathname), `${path}: missing page ${href}`);
      await access(`dist${link.pathname}`);
    }
  }
}
if (canonical && !html.includes('content="noindex, follow"')) {
  const sitemap = await readFile("dist/sitemap.xml", "utf8");
  assert.equal((sitemap.match(/<loc>/g) || []).length, pages.size);
  for (const path of pages.keys()) assert.ok(sitemap.includes(`<loc>${new URL(path, canonical).href}</loc>`));
}
const notFound = await readFile("dist/404.html", "utf8");
assert.match(notFound, /noindex, follow/);
assert.doesNotMatch(notFound, /rel="canonical"/);
assert.equal((notFound.match(/<h1(?:\s|>)/g) || []).length, 1);
console.log(`Built HTML checks passed for ${pages.size} pages, project explanations, internal links, sitemap, and 404.`);
