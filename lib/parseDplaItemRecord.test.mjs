import { test } from "node:test";
import assert from "node:assert/strict";

import parseDplaItemRecord from "./parseDplaItemRecord.js";

test("parseDplaItemRecord maps a DPLA API response to event fields", () => {
  const json = {
    docs: [
      {
        provider: { name: "Hub" },
        dataProvider: { name: "Institution" },
        sourceResource: { title: ["Title"], collection: { title: "Set" } },
      },
    ],
  };
  assert.deepEqual(parseDplaItemRecord(json), {
    title: ["Title"],
    partner: "Hub",
    contributor: "Institution",
    collection: { title: "Set" },
  });
});

test("parseDplaItemRecord accepts a plain-string dataProvider", () => {
  const json = { docs: [{ dataProvider: "Institution", sourceResource: {} }] };
  assert.equal(parseDplaItemRecord(json).contributor, "Institution");
});

test("parseDplaItemRecord returns empty fields for a missing record", () => {
  for (const missing of [null, undefined, {}, { docs: [] }]) {
    assert.deepEqual(parseDplaItemRecord(missing), {
      title: undefined,
      partner: undefined,
      contributor: undefined,
      collection: undefined,
    });
  }
});
