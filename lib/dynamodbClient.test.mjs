import { test } from "node:test";
import assert from "node:assert/strict";

import { deriveSigningKey } from "./dynamodbClient.js";

// AWS's published SigV4 signing-key derivation example:
// https://docs.aws.amazon.com/general/latest/gr/sigv4-calculate-signature.html
test("deriveSigningKey matches AWS's documented test vector", () => {
  const key = deriveSigningKey(
    "wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY",
    "20120215",
    "us-east-1",
    "iam",
  );
  assert.equal(
    key.toString("hex"),
    "f4780e2d9f65fa895f9c67b32ce1baf0b0d8a43505a000a1a9e090d414db404d",
  );
});
