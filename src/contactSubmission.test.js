import test from "node:test";
import assert from "node:assert/strict";
import { createEmailDraft, submitContact } from "./contactSubmission.js";

const data = new FormData();
data.set("name", "Test Visitor");
data.set("email", "visitor@example.com");
data.set("subject", "Project & collaboration");
data.set("message", "Hello,\nI’d like to discuss a project.");
const reply = (body, status = 200) => async () => new Response(JSON.stringify(body), { status });

test("accepts only an explicit successful service response", async () => {
  assert.equal((await submitContact(data, reply({ ok: true }))).accepted, true);
});
test("does not mistake HTTP 200 error payloads for success", async () => {
  for (const body of [{ ok: false }, {}, { ok: true, errors: [{ message: "Email is invalid" }] }]) {
    assert.equal((await submitContact(data, reply(body))).accepted, false);
  }
});
test("rejects redirects or HTML pages masquerading as HTTP success", async () => {
  const result = await submitContact(data, async () => new Response("<html>Sign in</html>"));
  assert.equal(result.accepted, false);
});
test("surfaces service validation errors and rejects non-success status", async () => {
  const result = await submitContact(data, reply({ errors: [{ message: "Email is invalid" }] }, 422));
  assert.equal(result.accepted, false);
  assert.equal(result.message, "Email is invalid");
  assert.equal((await submitContact(data, reply({ ok: true }, 429))).accepted, false);
});
test("network failures preserve the original message", async () => {
  const result = await submitContact(data, async () => { throw new Error("Connection lost"); });
  assert.equal(result.accepted, false);
  assert.equal(data.get("message"), "Hello,\nI’d like to discuss a project.");
});
test("email fallback preserves the visitor's text and safely encodes the subject", () => {
  const draft = new URL(createEmailDraft(data));
  assert.equal(draft.pathname, "abdurazakm343@gmail.com");
  assert.equal(draft.searchParams.get("subject"), data.get("subject"));
  assert.ok(draft.searchParams.get("body").includes(data.get("message")));
  assert.ok(draft.searchParams.get("body").includes(data.get("email")));
});
