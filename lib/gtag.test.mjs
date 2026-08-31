import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";

import buildGaEvent, { GA_EVENTS } from "./buildGaEvent.js";
import joinIfArray from "./joinIfArray.js";
import { event, pageview, trackingIds } from "./gtag.js";

const ENV_KEYS = [
  "NEXT_PUBLIC_GA_TRACKING_ID",
  "NEXT_PUBLIC_GA_NETWORK_ID",
  "NEXT_PUBLIC_SITE_ENV",
  "NEXT_PUBLIC_LOCAL_ID",
  "NEXT_PUBLIC_GA_LEGACY_EVENTS",
];

let savedEnv;
let calls;

const setEnv = (values) => {
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
};

beforeEach(() => {
  savedEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));
  calls = [];
  globalThis.window = { gtag: (...args) => calls.push(args) };
  setEnv({
    NEXT_PUBLIC_GA_TRACKING_ID: "G-TEST",
    NEXT_PUBLIC_GA_NETWORK_ID: undefined,
    NEXT_PUBLIC_SITE_ENV: "user",
    NEXT_PUBLIC_LOCAL_ID: undefined,
    NEXT_PUBLIC_GA_LEGACY_EVENTS: undefined,
  });
});

afterEach(() => {
  delete globalThis.window;
  setEnv(savedEnv);
});

const fields = {
  itemId: "00004e3dddc3c26b03e1e69063e3e1f8",
  title: ["A title", "Another"],
  partner: "Digital Commonwealth",
  contributor: "Boston Public Library",
};

// The legacy call as it shipped before the GA4 event existed.
// See git show 5af744d:lib/gtag.js.
// The tests use it to prove the new code still sends the same thing.
const legacyAtHead = (label, { itemId, title, partner, contributor }) => {
  const joinedTitle = joinIfArray(title, ", ");
  const joinedPartner = joinIfArray(partner, ", ");
  const joinedContributor = joinIfArray(contributor, ", ");
  return [
    "event",
    joinedContributor || "Unknown contributor",
    {
      event_category: `${label} : ${joinedPartner || "Unknown partner"}`,
      event_label: `${itemId || "unknown"} : ${joinedTitle || "untitled"}`,
      transport_type: "beacon",
    },
  ];
};

const legacyInputs = {
  strings: fields,
  "array title and partner": {
    ...fields,
    title: ["A", "B"],
    partner: ["X", "Y"],
  },
  "array contributor": { ...fields, contributor: ["One", "Two"] },
  "object contributor with a name": {
    ...fields,
    contributor: { name: "Named" },
  },
  "object partner without a name": { ...fields, partner: { foo: 1 } },
  "empty strings": { itemId: "", title: "", partner: "", contributor: "" },
  "empty arrays": { itemId: "x", title: [], partner: [], contributor: [] },
  nulls: { itemId: null, title: null, partner: null, contributor: null },
  "all missing": {},
  "150-character title": { ...fields, title: "x".repeat(150) },
  "numeric id": { ...fields, itemId: 12345 },
};

for (const [name, input] of Object.entries(legacyInputs)) {
  test(`legacy call matches what shipped before, for every event: ${name}`, () => {
    for (const gaEvent of Object.values(GA_EVENTS)) {
      calls = [];
      event(buildGaEvent(gaEvent, input));
      assert.equal(calls.length, 2);
      assert.deepEqual(calls[1], legacyAtHead(gaEvent.label, input));
    }
  });
}

test("GA4 event names follow the naming rules", () => {
  for (const { name } of Object.values(GA_EVENTS)) {
    assert.match(name, /^[a-z][a-z0-9_]{0,39}$/);
  }
});

test("GA4 call has a fixed name, one parameter per field, and no legacy fields", () => {
  event(
    buildGaEvent(GA_EVENTS.ITEM_VIEW, {
      ...fields,
      collection: [{ title: "Postcards" }],
    }),
  );
  assert.deepEqual(calls[0], [
    "event",
    "item_view",
    {
      dpla_id: fields.itemId,
      item_title: "A title, Another",
      partner: "Digital Commonwealth",
      contributor: "Boston Public Library",
      collection: "Postcards",
      site: "user",
    },
  ]);
});

// partner, contributor and collection share their input and output names,
// so they cannot be passed as extras.
// dpla_id, item_title and site can.
test("extras go out under their own names and cannot replace core fields", () => {
  event(
    buildGaEvent(GA_EVENTS.EXHIBITION_ITEM_VIEW, {
      ...fields,
      collection: "Real",
      exhibition: "gold-rush",
      exhibition_section: "home",
      dpla_id: "no",
      item_title: "no",
      site: "no",
    }),
  );
  const [, name, params] = calls[0];
  assert.equal(name, "exhibition_item_view");
  assert.equal(params.exhibition, "gold-rush");
  assert.equal(params.exhibition_section, "home");
  assert.equal(params.dpla_id, fields.itemId);
  assert.equal(params.item_title, "A title, Another");
  assert.equal(params.partner, "Digital Commonwealth");
  assert.equal(params.contributor, "Boston Public Library");
  assert.equal(params.collection, "Real");
  assert.equal(params.site, "user");
  assert.equal(
    calls[1][2].event_category,
    "View Exhibition Item : Digital Commonwealth",
  );
});

test("site is the local hub id on hub builds and absent when unknown", () => {
  setEnv({ NEXT_PUBLIC_SITE_ENV: "local", NEXT_PUBLIC_LOCAL_ID: "nwdh" });
  event(buildGaEvent(GA_EVENTS.ITEM_VIEW, fields));
  assert.equal(calls[0][2].site, "nwdh");

  calls = [];
  setEnv({ NEXT_PUBLIC_SITE_ENV: undefined, NEXT_PUBLIC_LOCAL_ID: undefined });
  event(buildGaEvent(GA_EVENTS.ITEM_VIEW, fields));
  assert.equal("site" in calls[0][2], false);
});

test("blank fields are left out of the GA4 call", () => {
  event(
    buildGaEvent(GA_EVENTS.CLICK_THROUGH, {
      itemId: null,
      title: "",
      partner: undefined,
      contributor: [],
    }),
  );
  assert.deepEqual(calls[0][2], { site: "user" });
});

test("GA4 values are cut to 100 characters without splitting a surrogate pair", () => {
  event(
    buildGaEvent(GA_EVENTS.ITEM_VIEW, { ...fields, title: "x".repeat(150) }),
  );
  assert.equal(calls[0][2].item_title.length, 100);

  calls = [];
  const emojiAt100 = `${"x".repeat(99)}😀`;
  event(buildGaEvent(GA_EVENTS.ITEM_VIEW, { ...fields, title: emojiAt100 }));
  assert.equal(calls[0][2].item_title, "x".repeat(99));
  assert.equal(calls[1][2].event_label, `${fields.itemId} : ${emojiAt100}`);
});

test("NEXT_PUBLIC_GA_LEGACY_EVENTS turns the legacy call off only for false", () => {
  for (const value of ["false", "False", " FALSE "]) {
    calls = [];
    setEnv({ NEXT_PUBLIC_GA_LEGACY_EVENTS: value });
    event(buildGaEvent(GA_EVENTS.ITEM_VIEW, fields));
    assert.equal(calls.length, 1, `value ${JSON.stringify(value)}`);
    assert.equal(calls[0][1], "item_view");
  }
  for (const value of [undefined, "", "true", "0", "no"]) {
    calls = [];
    setEnv({ NEXT_PUBLIC_GA_LEGACY_EVENTS: value });
    event(buildGaEvent(GA_EVENTS.ITEM_VIEW, fields));
    assert.equal(calls.length, 2, `value ${JSON.stringify(value)}`);
  }
});

test("pageview sends one page_view event, to every configured property", () => {
  pageview({ url: "https://dp.la/item/abc", title: "An item" });
  assert.deepEqual(calls, [
    [
      "event",
      "page_view",
      { page_title: "An item", page_location: "https://dp.la/item/abc" },
    ],
  ]);
});

test("trackingIds lists the site property and the network property", () => {
  assert.deepEqual(trackingIds(), ["G-TEST"]);
  setEnv({ NEXT_PUBLIC_GA_NETWORK_ID: "G-NET" });
  assert.deepEqual(trackingIds(), ["G-TEST", "G-NET"]);
  setEnv({ NEXT_PUBLIC_GA_TRACKING_ID: "" });
  assert.deepEqual(trackingIds(), ["G-NET"]);
});

test("a site with only the network property still sends", () => {
  setEnv({
    NEXT_PUBLIC_GA_TRACKING_ID: "",
    NEXT_PUBLIC_GA_NETWORK_ID: "G-NET",
  });
  event(buildGaEvent(GA_EVENTS.ITEM_VIEW, fields));
  assert.equal(calls.length, 2);
});

test("an old-shape caller does not throw inside a click handler", () => {
  assert.doesNotThrow(() => event({ type: "Click Through", itemId: "x" }));
  assert.doesNotThrow(() => event());
});

test("nothing is sent, and nothing logged, without a tracking id or window.gtag", () => {
  const errors = [];
  const originalError = console.error;
  console.error = (...args) => errors.push(args);
  try {
    setEnv({ NEXT_PUBLIC_GA_TRACKING_ID: "", NEXT_PUBLIC_GA_NETWORK_ID: "" });
    event(buildGaEvent(GA_EVENTS.ITEM_VIEW, fields));
    pageview({ url: "https://dp.la/", title: "DPLA" });

    setEnv({ NEXT_PUBLIC_GA_TRACKING_ID: "G-TEST" });
    globalThis.window = {};
    event(buildGaEvent(GA_EVENTS.ITEM_VIEW, fields));

    delete globalThis.window;
    event(buildGaEvent(GA_EVENTS.ITEM_VIEW, fields));
  } finally {
    console.error = originalError;
  }
  assert.equal(calls.length, 0);
  assert.deepEqual(errors, []);
});
