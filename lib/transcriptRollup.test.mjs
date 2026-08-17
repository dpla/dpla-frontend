import { test } from "node:test";
import assert from "node:assert/strict";

import {
  ITEM_ROLLUP_SORT_KEY,
  statusCountAttr,
  deriveStatusSet,
  rollupDelta,
} from "./transcriptRollup.js";

test("ITEM_ROLLUP_SORT_KEY is stable and cannot collide with a unit key", () => {
  assert.equal(ITEM_ROLLUP_SORT_KEY, "#item");
  assert.ok(!ITEM_ROLLUP_SORT_KEY.startsWith("canvas#"));
});

test("statusCountAttr namespaces the per-status counter attribute", () => {
  assert.equal(statusCountAttr("complete"), "n_complete");
  assert.equal(statusCountAttr("in_progress"), "n_in_progress");
  assert.equal(statusCountAttr("nothing_to_transcribe"), "n_nothing_to_transcribe");
});

test("deriveStatusSet keeps only positive counts, preserving order", () => {
  assert.deepEqual(
    deriveStatusSet({
      in_progress: 2,
      complete: 0,
      nothing_to_transcribe: 1,
      illegible: 0,
    }),
    ["in_progress", "nothing_to_transcribe"],
  );
  assert.deepEqual(deriveStatusSet({ in_progress: 0, complete: 0 }), []);
  assert.deepEqual(deriveStatusSet({}), []);
});

test("rollupDelta increments the new status", () => {
  assert.deepEqual(rollupDelta(null, "in_progress"), { in_progress: 1 });
});

test("rollupDelta moves a unit: +new, -old", () => {
  assert.deepEqual(rollupDelta("in_progress", "complete"), {
    complete: 1,
    in_progress: -1,
  });
});

test("rollupDelta is a no-op when the status is unchanged", () => {
  assert.deepEqual(rollupDelta("complete", "complete"), {});
});
