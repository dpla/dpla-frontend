#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { LOCALS } = require("../constants/local");

const root = path.resolve(__dirname, "..");
let failed = false;

for (const [localId, config] of Object.entries(LOCALS)) {
  const { favicon } = config;
  if (!favicon) continue;
  const filePath = path.join(root, "public", "static", "local", localId, favicon);
  if (!fs.existsSync(filePath)) {
    console.error(`✗ ${localId}: favicon "${favicon}" not found at ${filePath}`);
    failed = true;
  } else {
    console.log(`✓ ${localId}: ${favicon}`);
  }
}

if (failed) {
  process.exit(1);
}
console.log("\nAll favicon files verified.");
