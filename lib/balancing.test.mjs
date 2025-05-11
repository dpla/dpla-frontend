import test from "node:test";
import assert from "node:assert";
import { isBalanced } from "./balancing.mjs";

test("Parameterized Test", (t) => {
  const testData = [
    { expr: "([{}])", result: true },
    { expr: "", result: true },
    { expr: "", result: true },
    { expr: "([{]})", result: false },
    { expr: "([{", result: false },
    { expr: '("["{]})', result: false },
    { expr: '""")', result: false },
    { expr: '")', result: false },
    { expr: '""', result: true },
    { expr: '("back-to-school")', result: true },
    { expr: '"(back-to-school)"', result: true },
    { expr: '("back-to-school)"', result: false },
    { expr: '("back-to-school)', result: false },
    { expr: '"["["["[]"]"]"]"', result: true },
    { expr: '"["]""', result: false },
    { expr: '"[]"""', result: true },
    { expr: '""""', result: true },
    { expr: '""', result: true },
    { expr: '"', result: false },
    { expr: '""[("")]""', result: true },
    { expr: '""[("")]', result: true },
    { expr: '"["["["[]"]"[""]]"]', result: false },
    { expr: '"[]"[({})]""', result: true },
    { expr: '"[{}"]', result: false },
  ];

  for (const testEntry of testData) {
    assert.equal(isBalanced(testEntry.expr), testEntry.result, testEntry.expr);
  }
});
