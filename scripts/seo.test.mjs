import assert from "node:assert/strict";
import test from "node:test";
import { normalizeSiteUrl, renderSeoHead, robotsText, seoSettings, sitemapXml, structuredData } from "./seo.mjs";

const production = { url: "https://portfolio.example/", indexable: true };

test("canonical origin is normalized and rejects local, insecure, or ambiguous URLs", () => {
  assert.equal(normalizeSiteUrl(" https://portfolio.example "), production.url);
  assert.equal(normalizeSiteUrl(""), null);
  for (const value of ["http://portfolio.example", "https://localhost", "https://127.0.0.1", "https://portfolio.example/project", "https://portfolio.example/?preview=1", "https://portfolio.example/#home", "https://name:password@portfolio.example", "https://portfolio.example:5173"]) {
    assert.throws(() => normalizeSiteUrl(value), undefined, value);
  }
});

test("canonical, social images, schema IDs, robots, and sitemap share the same origin", () => {
  const head = renderSeoHead(production);
  assert.match(head, /rel="canonical" href="https:\/\/portfolio\.example\/"/);
  assert.match(head, /property="og:url" content="https:\/\/portfolio\.example\/"/);
  assert.match(head, /property="og:image" content="https:\/\/portfolio\.example\/social-preview.jpg"/);
  assert.match(head, /name="twitter:image" content="https:\/\/portfolio\.example\/social-preview.jpg"/);
  assert.match(robotsText(production), /Sitemap: https:\/\/portfolio\.example\/sitemap.xml/);
  assert.match(sitemapXml(production), /<loc>https:\/\/portfolio\.example\/<\/loc>/);
  assert.equal((sitemapXml(production).match(/<loc>/g) || []).length, 1);
  const graph = structuredData(production.url)["@graph"];
  const person = graph.find(item => item["@type"] === "Person");
  assert.equal(graph.find(item => item["@type"] === "ProfilePage").mainEntity["@id"], person["@id"]);
  assert.equal(person.name, "Abdurazak Mohammed");
  assert.equal(person.sameAs.length, 2);
  assert.ok(!("aggregateRating" in person));
});

test("preview builds are noindex but crawlable, without advertising a sitemap", () => {
  for (const env of [{ VERCEL_ENV: "preview" }, { SEO_NOINDEX: "true" }]) {
    const settings = seoSettings({ SITE_URL: production.url, ...env });
    assert.equal(settings.indexable, false);
    assert.match(renderSeoHead(settings), /content="noindex, follow"/);
    assert.match(robotsText(settings), /Allow: \//);
    assert.doesNotMatch(robotsText(settings), /Sitemap:/);
    assert.doesNotMatch(sitemapXml(settings), /<loc>/);
  }
});

test("an unset domain never invents a canonical or a relative social image URL", () => {
  const settings = { url: null, indexable: true };
  const head = renderSeoHead(settings);
  assert.doesNotMatch(head, /rel="canonical"|property="og:image"|name="twitter:image"/);
  assert.doesNotMatch(robotsText(settings), /Sitemap:/);
  assert.doesNotThrow(() => JSON.parse(head.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]));
});
