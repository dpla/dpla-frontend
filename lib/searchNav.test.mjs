import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

import {
  findSearchNav,
  keepSearchContext,
  saveSearchResults,
  setSearchContext,
} from "./searchNav.js";

const HOUR = 60 * 60 * 1000;
const SEARCH_A = "/search?q=city";
const SEARCH_B = "/search?q=town";

const storageMethods = {
  getItem(key) {
    return Object.hasOwn(this, key) ? this[key] : null;
  },
  setItem(key, value) {
    this[key] = String(value);
  },
  removeItem(key) {
    delete this[key];
  },
};

const brokenStorage = {
  getItem() {
    throw new Error("storage blocked");
  },
  setItem() {
    throw new Error("storage blocked");
  },
};

beforeEach(() => {
  globalThis.localStorage = Object.create(storageMethods);
  globalThis.sessionStorage = Object.create(storageMethods);
});

afterEach(() => {
  delete globalThis.localStorage;
  delete globalThis.sessionStorage;
});

test("no saved search: no nav", () => {
  assert.equal(findSearchNav("/item/a"), null);
});

test("item in the tab's search: back link and both neighbours", () => {
  setSearchContext(SEARCH_A, ["/item/a", "/item/b", "/item/c"]);
  assert.deepEqual(findSearchNav("/item/b"), {
    backUri: SEARCH_A,
    prev: "/item/a",
    next: "/item/c",
  });
});

test("first and last items have one neighbour", () => {
  setSearchContext(SEARCH_A, ["/item/a", "/item/b"]);
  assert.deepEqual(findSearchNav("/item/a"), {
    backUri: SEARCH_A,
    prev: null,
    next: "/item/b",
  });
  assert.deepEqual(findSearchNav("/item/b"), {
    backUri: SEARCH_A,
    prev: "/item/a",
    next: null,
  });
});

test("item outside every saved search: no nav", () => {
  setSearchContext(SEARCH_A, ["/item/a"]);
  saveSearchResults(SEARCH_A, ["/item/a"]);
  assert.equal(findSearchNav("/item/z"), null);
});

test("the tab's search wins over a newer saved search", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 0 });
  setSearchContext(SEARCH_A, ["/item/a", "/item/b"]);
  saveSearchResults(SEARCH_A, ["/item/a", "/item/b"]);
  t.mock.timers.tick(HOUR);
  saveSearchResults(SEARCH_B, ["/item/b", "/item/c"]);

  assert.equal(findSearchNav("/item/b").backUri, SEARCH_A);
});

test("new tab: the newest saved search with the item is used", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 0 });
  saveSearchResults(SEARCH_A, ["/item/a", "/item/b"]);
  t.mock.timers.tick(HOUR);
  saveSearchResults(SEARCH_B, ["/item/b", "/item/c"]);

  assert.deepEqual(findSearchNav("/item/b"), {
    backUri: SEARCH_B,
    prev: null,
    next: "/item/c",
  });
});

test("looking up nav leaves the tab's context alone", () => {
  saveSearchResults(SEARCH_A, ["/item/a"]);
  findSearchNav("/item/a");

  assert.deepEqual(Object.keys(sessionStorage), []);
});

test("a kept search stays the tab's context when a newer one lists the item", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 0 });
  saveSearchResults(SEARCH_B, ["/item/b", "/item/c"]);
  keepSearchContext("/item/b");

  t.mock.timers.tick(HOUR);
  saveSearchResults(SEARCH_A, ["/item/a", "/item/b"]);

  assert.equal(findSearchNav("/item/b").backUri, SEARCH_B);
});

test("keeping an item outside every saved search changes nothing", () => {
  setSearchContext(SEARCH_A, ["/item/a"]);
  keepSearchContext("/item/z");

  assert.equal(findSearchNav("/item/a").backUri, SEARCH_A);
});

test("a full sessionStorage still yields nav from the saved search", () => {
  saveSearchResults(SEARCH_A, ["/item/a", "/item/b"]);
  globalThis.sessionStorage = {
    getItem: () => null,
    setItem() {
      throw new Error("quota exceeded");
    },
  };

  assert.doesNotThrow(() => keepSearchContext("/item/a"));
  assert.equal(findSearchNav("/item/a").backUri, SEARCH_A);
});

test("saved searches older than 24 hours are ignored", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 0 });
  saveSearchResults(SEARCH_A, ["/item/a"]);
  t.mock.timers.tick(25 * HOUR);

  assert.equal(findSearchNav("/item/a"), null);
});

test("saving keeps the 10 newest searches", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 0 });
  for (let i = 0; i < 12; i++) {
    saveSearchResults(`/search?q=${i}`, [`/item/${i}`]);
    t.mock.timers.tick(1000);
  }

  assert.equal(Object.keys(localStorage).length, 10);
  assert.equal(findSearchNav("/item/1"), null);
  assert.equal(findSearchNav("/item/2").backUri, "/search?q=2");
});

test("re-saving a stored search at the cap evicts nothing", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 0 });
  for (let i = 0; i < 10; i++) {
    saveSearchResults(`/search?q=${i}`, [`/item/${i}`]);
    t.mock.timers.tick(1000);
  }
  saveSearchResults("/search?q=5", ["/item/5"]);

  assert.equal(Object.keys(localStorage).length, 10);
  assert.equal(findSearchNav("/item/0").backUri, "/search?q=0");
});

test("re-saving refreshes a search's 24 hours", (t) => {
  t.mock.timers.enable({ apis: ["Date"], now: 0 });
  saveSearchResults(SEARCH_A, ["/item/a"]);
  t.mock.timers.tick(23 * HOUR);
  saveSearchResults(SEARCH_A, ["/item/a"]);
  t.mock.timers.tick(2 * HOUR);

  assert.equal(findSearchNav("/item/a").backUri, SEARCH_A);
});

test("blocked storage: nothing throws and there is no nav", () => {
  globalThis.localStorage = brokenStorage;
  globalThis.sessionStorage = brokenStorage;

  assert.doesNotThrow(() => saveSearchResults(SEARCH_A, ["/item/a"]));
  assert.doesNotThrow(() => setSearchContext(SEARCH_A, ["/item/a"]));
  assert.equal(findSearchNav("/item/a"), null);
});

test("missing storage: nothing throws and there is no nav", () => {
  delete globalThis.localStorage;
  delete globalThis.sessionStorage;

  assert.doesNotThrow(() => saveSearchResults(SEARCH_A, ["/item/a"]));
  assert.equal(findSearchNav("/item/a"), null);
});
