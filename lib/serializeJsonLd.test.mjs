import { test } from "node:test";
import assert from "node:assert/strict";

import serializeJsonLd from "./serializeJsonLd.js";

test("escapes < so a value can't close the script tag", () => {
  const out = serializeJsonLd({ name: "a</script><b>" });
  assert.ok(!out.includes("<"));
  assert.deepEqual(JSON.parse(out), { name: "a</script><b>" });
});

test("leaves ordinary JSON unchanged", () => {
  const data = { "@type": "WebSite", url: "https://dp.la" };
  assert.equal(serializeJsonLd(data), JSON.stringify(data));
});
