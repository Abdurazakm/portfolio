import test from "node:test";
import assert from "node:assert/strict";
import { analyticsAllowed, analyticsPageContext, createInquiryTracker, initializeInquiryTracking, trackEmailClick } from "./inquiryTracking.js";
import { submitContact } from "./contactSubmission.js";

test("form and email actions have separate events with fixed, non-personal parameters", () => {
  const events = [];
  const tracker = createInquiryTracker((name, parameters) => events.push({ name, parameters }));
  tracker.contactSubmitted();
  for (const location of ["hero_connect", "contact_section", "contact_form_fallback"]) tracker.emailClicked(location);
  tracker.emailClicked("mailto:private@example.com?body=Private message");
  assert.deepEqual(events, [
    { name: "generate_lead", parameters: { lead_source: "portfolio_contact_form" } },
    { name: "email_link_click", parameters: { link_location: "hero_connect" } },
    { name: "email_link_click", parameters: { link_location: "contact_section" } },
    { name: "email_link_click", parameters: { link_location: "contact_form_fallback" } },
  ]);
});

test("an unavailable analytics transport cannot interrupt a contact action", () => {
  const tracker = createInquiryTracker(() => { throw new Error("Tracking blocked"); });
  assert.doesNotThrow(() => tracker.contactSubmitted());
  assert.doesNotThrow(() => tracker.emailClicked("contact_section"));
});

test("tracking requires a real-format ID, production build, and the canonical origin", () => {
  assert.equal(analyticsAllowed("G-TEST123456", "https://www.abdurazak.dev", true), true);
  for (const id of ["", "G-...", "G-TEST123456\"", "UA-123456", "https://example.com"]) {
    assert.equal(analyticsAllowed(id, "https://www.abdurazak.dev", true), false);
  }
  assert.equal(analyticsAllowed("G-TEST123456", "https://www.abdurazak.dev", false), false);
  for (const origin of ["http://localhost:4179", "https://preview.vercel.app", "https://www.abdurazak.dev.example.com"]) {
    assert.equal(analyticsAllowed("G-TEST123456", origin, true), false);
  }
});

test("page context removes queries, fragments, and potentially personal unknown paths", () => {
  assert.deepEqual(analyticsPageContext(
    "https://www.abdurazak.dev/services/business-websites/?email=private@example.com#message",
    "https://referrer.example/private/person?email=private@example.com",
  ), {
    page_location: "https://www.abdurazak.dev/services/business-websites/",
    page_referrer: "https://referrer.example/",
  });
  assert.deepEqual(analyticsPageContext("https://www.abdurazak.dev/private@example.com", "invalid"), {
    page_location: "https://www.abdurazak.dev/404/", page_referrer: "",
  });
});

test("the initialized tag queues one page view and confirmed inquiries without exposing the draft", async () => {
  const scripts = [];
  const previousWindow = globalThis.window;
  const previousDocument = globalThis.document;
  globalThis.window = { location: { origin: "https://www.abdurazak.dev", href: "https://www.abdurazak.dev/?private=secret" } };
  globalThis.document = {
    referrer: "https://search.example/?private=secret",
    createElement: () => ({}),
    head: { appendChild: (script) => scripts.push(script) },
  };
  try {
    assert.equal(initializeInquiryTracking("", true), false);
    assert.equal(initializeInquiryTracking("G-TEST123456", false), false);
    assert.equal(initializeInquiryTracking("G-TEST123456", true), true);
    assert.equal(initializeInquiryTracking("G-TEST123456", true), false);
    const data = new FormData();
    data.set("email", "private@example.com");
    data.set("message", "Private message");
    await submitContact(data, async () => new Response(JSON.stringify({ ok: false })));
    await submitContact(data, async () => new Response(JSON.stringify({ ok: true })));
    trackEmailClick("contact_form_fallback");
    const commands = window.dataLayer.map((args) => Array.from(args));
    assert.equal(scripts.length, 1);
    assert.equal(scripts[0].src, "https://www.googletagmanager.com/gtag/js?id=G-TEST123456");
    assert.equal(scripts[0].async, true);
    assert.equal(commands.filter(([command]) => command === "config").length, 1);
    assert.deepEqual(commands.filter(([command]) => command === "event").map(([, event]) => event), ["page_view", "generate_lead", "email_link_click"]);
    assert.doesNotMatch(JSON.stringify(commands), /private|secret|Private message|mailto:/);
    assert.equal(commands.find(([command]) => command === "config")[2].allow_google_signals, false);
  } finally {
    if (previousWindow === undefined) delete globalThis.window; else globalThis.window = previousWindow;
    if (previousDocument === undefined) delete globalThis.document; else globalThis.document = previousDocument;
  }
});
