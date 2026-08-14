import { test } from "node:test";
import assert from "node:assert/strict";

import { parseIiifManifest } from "./parseIiifManifest.js";

test("returns empty result for null/invalid input", () => {
  assert.deepEqual(parseIiifManifest(null), { count: 0, canvases: [] });
  assert.deepEqual(parseIiifManifest(undefined), { count: 0, canvases: [] });
  assert.deepEqual(parseIiifManifest("not an object"), { count: 0, canvases: [] });
  assert.deepEqual(parseIiifManifest({}), { count: 0, canvases: [] });
});

test("v2: derives a bounded IIIF Image API url from the canvas image service", () => {
  const manifest = {
    "@context": "http://iiif.io/api/presentation/2/context.json",
    sequences: [
      {
        canvases: [
          {
            "@id": "https://example.org/canvas/1",
            label: "Front",
            images: [
              {
                resource: {
                  "@id": "https://example.org/iiif/img1/full/full/0/default.jpg",
                  service: { "@id": "https://example.org/iiif/img1" },
                },
              },
            ],
          },
          {
            "@id": "https://example.org/canvas/2",
            images: [
              {
                resource: {
                  "@id": "https://example.org/iiif/img2/full/full/0/default.jpg",
                  // trailing slash on the service id must not double up
                  service: { "@id": "https://example.org/iiif/img2/" },
                },
              },
            ],
          },
        ],
      },
    ],
  };
  const { count, canvases } = parseIiifManifest(manifest, { width: 1000 });
  assert.equal(count, 2);
  assert.equal(canvases[0].label, "Front");
  assert.equal(
    canvases[0].imageUrl,
    "https://example.org/iiif/img1/full/1000,/0/default.jpg",
  );
  // no label -> stable 1-based fallback; trailing slash collapsed
  assert.equal(canvases[1].label, "Page 2");
  assert.equal(
    canvases[1].imageUrl,
    "https://example.org/iiif/img2/full/1000,/0/default.jpg",
  );
});

test("v2: falls back to the static resource @id when there is no image service", () => {
  const manifest = {
    sequences: [
      {
        canvases: [
          {
            "@id": "c1",
            label: [{ "@value": "Plate I" }],
            images: [{ resource: { "@id": "https://example.org/static/1.jpg" } }],
          },
        ],
      },
    ],
  };
  const { count, canvases } = parseIiifManifest(manifest);
  assert.equal(count, 1);
  assert.equal(canvases[0].label, "Plate I");
  assert.equal(canvases[0].imageUrl, "https://example.org/static/1.jpg");
});

test("v3: derives image url from service and reads language-map labels", () => {
  const manifest = {
    "@context": "http://iiif.io/api/presentation/3/context.json",
    items: [
      {
        id: "https://example.org/canvas/1",
        label: { en: ["Recto"], none: ["1"] },
        items: [
          {
            items: [
              {
                body: {
                  id: "https://example.org/iiif/p1/full/max/0/default.jpg",
                  service: [{ id: "https://example.org/iiif/p1" }],
                },
              },
            ],
          },
        ],
      },
    ],
  };
  const { count, canvases } = parseIiifManifest(manifest, { width: 1600 });
  assert.equal(count, 1);
  assert.equal(canvases[0].label, "Recto");
  assert.equal(
    canvases[0].imageUrl,
    "https://example.org/iiif/p1/full/1600,/0/default.jpg",
  );
});

test("v3: falls back to body.id and handles an array body", () => {
  const manifest = {
    items: [
      {
        id: "c1",
        items: [{ items: [{ body: [{ id: "https://example.org/plain.jpg" }] }] }],
      },
    ],
  };
  const { canvases } = parseIiifManifest(manifest);
  assert.equal(canvases[0].imageUrl, "https://example.org/plain.jpg");
  assert.equal(canvases[0].label, "Page 1");
});

test("skips canvases with no resolvable image", () => {
  const manifest = {
    items: [
      { id: "c1", items: [{ items: [{ body: {} }] }] }, // no id/service -> dropped
      {
        id: "c2",
        items: [{ items: [{ body: { id: "https://example.org/ok.jpg" } }] }],
      },
    ],
  };
  const { count, canvases } = parseIiifManifest(manifest);
  assert.equal(count, 1);
  assert.equal(canvases[0].imageUrl, "https://example.org/ok.jpg");
});

test("ignores a non-string service id and falls back to the direct image", () => {
  const manifest = {
    items: [
      {
        id: "c1",
        items: [
          {
            items: [
              {
                body: {
                  id: "https://example.org/ok.jpg",
                  service: [{ id: 123 }], // non-string id must not throw
                },
              },
            ],
          },
        ],
      },
    ],
  };
  const { canvases } = parseIiifManifest(manifest);
  assert.equal(canvases[0].imageUrl, "https://example.org/ok.jpg");
});

test("v2: uses a later image candidate when the first is unusable", () => {
  const manifest = {
    sequences: [
      {
        canvases: [
          {
            "@id": "c1",
            images: [
              { resource: {} }, // no @id, no service -> unusable
              { resource: { "@id": "https://example.org/second.jpg" } },
            ],
          },
        ],
      },
    ],
  };
  const { count, canvases } = parseIiifManifest(manifest);
  assert.equal(count, 1);
  assert.equal(canvases[0].imageUrl, "https://example.org/second.jpg");
});

test("v3: uses a later annotation when the first is unusable", () => {
  const manifest = {
    items: [
      {
        id: "c1",
        items: [
          {
            items: [
              { body: { type: "TextualBody" } }, // no id/service -> unusable
              { body: { id: "https://example.org/second.jpg" } },
            ],
          },
        ],
      },
    ],
  };
  const { canvases } = parseIiifManifest(manifest);
  assert.equal(canvases[0].imageUrl, "https://example.org/second.jpg");
});
