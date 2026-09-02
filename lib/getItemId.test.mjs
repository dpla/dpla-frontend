import { test } from "node:test";
import assert from "node:assert/strict";

import getItemId from "./getItemId.js";

const id = "00004e3dddc3c26b03e1e69063e3e1f8";

const withReferences = {
  mainEntity: [
    {
      "dct:references": [
        { "@type": "WebPage", "@id": "https://example.org/item" },
        { "@type": "ore:Aggregation", "@id": `http://dp.la/api/items/${id}` },
      ],
    },
  ],
};

const withCitation = {
  mainEntity: [
    {
      citation: [
        {
          disabmiguationDescription: "credits",
          text: "Courtesy of somewhere.",
        },
        {
          disabmiguationDescription: "citation",
          text: `"A title," Digital Public Library of America. https://dp.la/item/${id}.`,
        },
      ],
    },
  ],
};

test("reads the id from the ore:Aggregation reference", () => {
  assert.equal(getItemId(withReferences), id);
});

test("falls back to a dp.la item URL in the citation text", () => {
  assert.equal(getItemId(withCitation), id);
});

test("prefers the reference over the citation", () => {
  const both = {
    mainEntity: [
      {
        ...withReferences.mainEntity[0],
        ...withCitation.mainEntity[0],
      },
    ],
  };
  const merged = {
    mainEntity: [
      {
        "dct:references": withReferences.mainEntity[0]["dct:references"],
        citation: [
          { text: "https://dp.la/item/ffffffffffffffffffffffffffffffff." },
        ],
      },
    ],
  };
  assert.equal(getItemId(both), id);
  assert.equal(getItemId(merged), id);
});

test("falls through to the citation when the reference is not an item URL", () => {
  const unsupportedReference = {
    mainEntity: [
      {
        "dct:references": [
          {
            "@type": "ore:Aggregation",
            "@id": "https://catalog.archives.gov/id/1633485",
          },
        ],
        citation: withCitation.mainEntity[0].citation,
      },
    ],
  };
  assert.equal(getItemId(unsupportedReference), id);
});

test("rejects a reference id that is not a DPLA item id", () => {
  const foreignItemUrl = {
    mainEntity: [
      {
        "dct:references": [
          {
            "@type": "ore:Aggregation",
            "@id": "https://www.loc.gov/item/2004631775/",
          },
        ],
      },
    ],
  };
  assert.equal(getItemId(foreignItemUrl), "");
});

test("returns an empty string when nothing holds an id", () => {
  assert.equal(getItemId(undefined), "");
  assert.equal(getItemId({}), "");
  assert.equal(getItemId({ mainEntity: [{}] }), "");
  assert.equal(
    getItemId({ mainEntity: [{ citation: [{ text: "no url here" }] }] }),
    "",
  );
});
