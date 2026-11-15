import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const html = await readFile("dist/index.html", "utf8");
assert.doesNotMatch(html, /<!--seo-head-->|<div id="root"><\/div>/);
assert.equal((html.match(/<title>/g) || []).length, 1);
assert.equal((html.match(/name="description"/g) || []).length, 1);
assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1);
for (const content of ["Fetan Delivery", "VoiceLocal", "Mayaye Eye Clinic", "Yaltopia Tech", "Software Engineering", "abdurazakm343@gmail.com"]) {
  assert.ok(html.includes(content), `${content} must be present before JavaScript executes.`);
}
for (const id of ["home", "projects", "about", "experience", "contact"]) {
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
console.log(`Built HTML SEO checks passed.${canonical ? ` Canonical: ${canonical}` : " Production URL still needs configuration."}`);
