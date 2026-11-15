import assert from "node:assert/strict";
import test from "node:test";
import { normalizeSiteUrl, renderSeoHead, robotsText, seoSettings, sitemapXml, structuredData } from "./seo.mjs";
import { findService, services } from "../src/services.js";

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
  assert.equal((sitemapXml(production).match(/<loc>/g) || []).length, 4);
  const graph = structuredData(production.url)["@graph"];
  const person = graph.find(item => item["@type"] === "Person");
  assert.equal(graph.find(item => item["@type"] === "ProfilePage").mainEntity["@id"], person["@id"]);
  assert.equal(person.name, "Abdurazak Mohammed");
  assert.equal(person.sameAs.length, 2);
  assert.ok(!("aggregateRating" in person));
});

test("each service has a distinct canonical, page identity, and sitemap entry", () => {
  const titles = new Set();
  for (const service of services) {
    const expectedUrl = new URL(service.path, production.url).href;
    const head = renderSeoHead(production, service.path);
    assert.ok(head.includes(`rel="canonical" href="${expectedUrl}"`));
    assert.ok(head.includes(`property="og:url" content="${expectedUrl}"`));
    assert.ok(sitemapXml(production).includes(`<loc>${expectedUrl}</loc>`));
    const graph = structuredData(production.url, service.path)["@graph"];
    const page = graph.find((item) => item["@type"] === "WebPage");
    const offering = graph.find((item) => item["@type"] === "Service");
    assert.equal(page.url, expectedUrl);
    assert.equal(page.mainEntity["@id"], offering["@id"]);
    assert.equal(offering.provider["@id"], `${production.url}#person`);
    assert.ok(!graph.some((item) => item["@type"] === "ProfilePage"));
    assert.ok(!("aggregateRating" in offering) && !("offers" in offering));
    titles.add(page.name);
    assert.equal(findService(service.path.slice(0, -1)), service);
    assert.equal(findService(`${service.path}index.html`), service);
    assert.match(renderSeoHead({ ...production, indexable: false }, service.path), /content="noindex, follow"/);
  }
  assert.equal(titles.size, 3);
});

test("unknown routes never advertise the homepage as their canonical", () => {
  const head = renderSeoHead(production, "/services/not-a-service/");
  assert.equal(findService("/services/not-a-service/"), undefined);
  assert.match(head, /Page Not Found/);
  assert.match(head, /content="noindex, follow"/);
  assert.doesNotMatch(head, /rel="canonical"|property="og:url"/);
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
