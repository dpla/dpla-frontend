import { test } from "node:test";
import assert from "node:assert/strict";

import isValidFacetQuery from "./isValidFacetQuery.js";

const quoted = (length) => `"${"a".repeat(length)}"`;

test("isValidFacetQuery counts the quotes toward the 200 character limit", () => {
  assert.equal(isValidFacetQuery(quoted(198)), true);
  assert.equal(isValidFacetQuery(quoted(199)), false);
});

test("isValidFacetQuery measures multiple values joined with AND", () => {
  assert.equal(isValidFacetQuery(`${quoted(95)}|${quoted(96)}`), true);
  assert.equal(isValidFacetQuery(`${quoted(96)}|${quoted(96)}`), false);
});

test("isValidFacetQuery requires at least 2 characters", () => {
  assert.equal(isValidFacetQuery('"a"'), true);
  assert.equal(isValidFacetQuery('""'), true);
  assert.equal(isValidFacetQuery("a"), false);
});
