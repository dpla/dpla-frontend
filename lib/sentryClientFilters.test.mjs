import test from "node:test";
import assert from "node:assert/strict";
import { filterClientEvent } from "./sentryClientFilters.js";

const OWN_CHUNK = "app:///_next/static/chunks/pages/search-abc123.js";
const FRAMEWORK_CHUNK = "app:///_next/static/chunks/framework-0123abcd.js";
const PAGE_URL = "app:///search";
const ITEM_URL = "app:///item/0a1b2c3d4e5f";
const USERSCRIPT = "app:///userscript.html";
const PUBLIC_SCRIPT = "app:///static/depictassist/depictassist.js";

function frames(...filenames) {
  return filenames.map((filename) => ({ filename, function: "fn", lineno: 1 }));
}

function errorEvent(type, value, stackFrames) {
  const exception = { type, value };
  if (stackFrames) exception.stacktrace = { frames: stackFrames };
  return { exception: { values: [exception] } };
}

function hintFor(error) {
  return { originalException: error };
}

test("keeps an error with a frame in our bundle", () => {
  const event = errorEvent("TypeError", "x is not a function", frames(OWN_CHUNK));
  assert.equal(filterClientEvent(event, hintFor(new TypeError("x is not a function"))), event);
});

test("keeps an error whose only own frame is deep in the stack", () => {
  const event = errorEvent("Error", "boom", frames(PAGE_URL, undefined, OWN_CHUNK, FRAMEWORK_CHUNK));
  assert.equal(filterClientEvent(event, hintFor(new Error("boom"))), event);
});

test("keeps an error from a script under public/static", () => {
  const event = errorEvent("Error", "Reconciliation API unavailable", frames(PUBLIC_SCRIPT));
  assert.equal(filterClientEvent(event, hintFor(new Error("Reconciliation API unavailable"))), event);
});

test("keeps an error when only the cause has our frame", () => {
  const event = {
    exception: {
      values: [
        { type: "Error", value: "inner", stacktrace: { frames: frames(OWN_CHUNK) } },
        { type: "Error", value: "outer", stacktrace: { frames: frames(PAGE_URL) } },
      ],
    },
  };
  assert.equal(filterClientEvent(event, hintFor(new Error("outer"))), event);
});

test("drops Google Translate 'Error: Aa' whose frames are the page URL", () => {
  const event = errorEvent("Error", "Aa", frames(ITEM_URL, ITEM_URL, ITEM_URL));
  assert.equal(filterClientEvent(event, hintFor(new Error("Aa"))), null);
});

test("drops a stack overflow whose frames are the page URL", () => {
  const event = errorEvent(
    "RangeError",
    "Maximum call stack size exceeded",
    frames(PAGE_URL, PAGE_URL, PAGE_URL)
  );
  assert.equal(filterClientEvent(event, hintFor(new RangeError("Maximum call stack size exceeded"))), null);
});

test("still drops the original iOS translation overflow: every frame has no filename", () => {
  const event = errorEvent(
    "RangeError",
    "Maximum call stack size exceeded",
    frames(undefined, "undefined", undefined)
  );
  assert.equal(filterClientEvent(event, hintFor(new RangeError("Maximum call stack size exceeded"))), null);
});

test("drops userscript manager errors", () => {
  const event = errorEvent("ReferenceError", "$ is not defined", frames(USERSCRIPT, undefined));
  assert.equal(filterClientEvent(event, hintFor(new ReferenceError("$ is not defined"))), null);
});

test("drops frames left as raw third-party origins", () => {
  const event = errorEvent(
    "Error",
    "ga",
    frames("chrome-extension://abcdef/content.js", "<anonymous>", "[native code]")
  );
  assert.equal(filterClientEvent(event, hintFor(new Error("ga"))), null);
});

test("keeps a plain error with no frames at all", () => {
  const event = errorEvent("Error", "no stack", []);
  assert.equal(filterClientEvent(event, hintFor(new Error("no stack"))), event);
  const noStacktrace = errorEvent("Error", "no stack");
  assert.equal(filterClientEvent(noStacktrace, hintFor(new Error("no stack"))), noStacktrace);
});

test("keeps a message event with no exception", () => {
  const event = { message: "hello", level: "info" };
  assert.equal(filterClientEvent(event, {}), event);
  assert.equal(filterClientEvent(event, undefined), event);
});

test("drops the stale-chunk navigation invariant by message", () => {
  const msg = "Invariant: attempted to hard navigate to the same URL /search";
  const event = errorEvent("Error", msg, frames(OWN_CHUNK));
  assert.equal(filterClientEvent(event, hintFor(new Error(msg))), null);
  assert.equal(filterClientEvent(event, hintFor(msg)), null);
});

test("drops the iOS WebKit SVG-to-canvas replay error by message", () => {
  const msg = "Unable to load image data:image/svg+xml;base64,AAAA";
  const event = errorEvent("Error", msg, frames(OWN_CHUNK));
  assert.equal(filterClientEvent(event, hintFor(new Error(msg))), null);
});

test("drops the thumbnail probe timeout: TimeoutError with no frames", () => {
  const timeout = { name: "TimeoutError", message: "signal timed out" };
  const event = errorEvent("TimeoutError", "signal timed out", []);
  assert.equal(filterClientEvent(event, hintFor(timeout)), null);

  const safariWording = { name: "TimeoutError", message: "The operation timed out." };
  assert.equal(filterClientEvent(event, hintFor(safariWording)), null);

  assert.equal(filterClientEvent(event, hintFor("signal timed out")), null);
});

test("keeps a TimeoutError that has frames in our bundle", () => {
  const timeout = { name: "TimeoutError", message: "signal timed out" };
  const event = errorEvent("TimeoutError", "signal timed out", frames(OWN_CHUNK));
  assert.equal(filterClientEvent(event, hintFor(timeout)), event);
});

test("drops a non-Error promise rejection with no frames", () => {
  const reason = "Request timeout appSettingsDistributor.getValue";
  const event = errorEvent(
    "UnhandledRejection",
    `Non-Error promise rejection captured with value: ${reason}`
  );
  assert.equal(filterClientEvent(event, hintFor(reason)), null);
});

test("keeps a non-Error promise rejection that has frames", () => {
  const reason = "rejected on purpose";
  const event = errorEvent(
    "UnhandledRejection",
    `Non-Error promise rejection captured with value: ${reason}`,
    frames(OWN_CHUNK)
  );
  assert.equal(filterClientEvent(event, hintFor(reason)), event);
});

test("keeps an ordinary error whose message merely mentions a timeout", () => {
  const event = errorEvent("Error", "Request timeout", frames(OWN_CHUNK));
  assert.equal(filterClientEvent(event, hintFor(new Error("Request timeout"))), event);
});
