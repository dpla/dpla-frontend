import { test } from "node:test";
import assert from "node:assert/strict";

import collectionTitles from "./collectionTitles.js";

test("collectionTitles flattens one or many collection objects", () => {
  assert.equal(collectionTitles(undefined), "");
  assert.equal(collectionTitles(null), "");
  assert.equal(collectionTitles({ title: "Postcards" }), "Postcards");
  assert.equal(collectionTitles({ id: "x" }), "");
  assert.equal(
    collectionTitles([
      { title: "Postcards" },
      { id: "x" },
      null,
      { title: ["Maps", "Atlases"] },
    ]),
    "Postcards, Maps, Atlases",
  );
});

test("collectionTitles passes strings through", () => {
  assert.equal(collectionTitles("Postcards"), "Postcards");
  assert.equal(collectionTitles(""), "");
  assert.equal(collectionTitles(["Postcards", "Maps"]), "Postcards, Maps");
});
