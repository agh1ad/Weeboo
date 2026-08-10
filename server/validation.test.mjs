import assert from "node:assert/strict";
import test from "node:test";
import { parseProjectRequest } from "./validation.mjs";

const validRequest = {
  name: "Jane Smith",
  email: "jane@example.com",
  client_type: "A small or growing business",
  service: "A complete new website",
  project_idea: "We need a clear website for our growing consulting company.",
  current_website: "https://example.com",
  timing: "Within 2–4 weeks",
  materials: "I have some materials",
  additional_details: "English first, with another language planned later.",
  consent: "yes",
  company_fax: "",
  form_started_at: Date.now() - 5_000,
};

test("accepts a complete project request", () => {
  const result = parseProjectRequest(validRequest);
  assert.equal(result.success, true);
  assert.equal(result.data.email, "jane@example.com");
});

test("rejects an invalid email address", () => {
  const result = parseProjectRequest({ ...validRequest, email: "not-an-email" });
  assert.equal(result.success, false);
  assert.ok(result.error.flatten().fieldErrors.email);
});

test("rejects non-http website addresses", () => {
  const result = parseProjectRequest({ ...validRequest, current_website: "javascript:alert(1)" });
  assert.equal(result.success, false);
  assert.ok(result.error.flatten().fieldErrors.current_website);
});

test("does not require optional project fields", () => {
  const request = { ...validRequest };
  delete request.current_website;
  delete request.timing;
  delete request.materials;
  delete request.additional_details;
  const result = parseProjectRequest(request);
  assert.equal(result.success, true);
  assert.equal(result.data.current_website, "");
});
