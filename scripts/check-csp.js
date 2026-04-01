#!/usr/bin/env node
/**
 * scripts/check-csp.js
 *
 * Scans the codebase for external URLs used in fetch() calls and Next.js
 * <Script src> tags, then verifies each hostname is covered by the Content
 * Security Policy defined in next.config.js.
 *
 * Run:  node scripts/check-csp.js
 * CI:   included in the "Node.js CI" GitHub Actions workflow
 *
 * Scanned directories: pages, components, lib, public/static
 * If external URLs are introduced in other directories, add them to the
 * `dirs` array in the scanFiles() function below.
 */

"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
let failed = false;

// ── 1. Extract and parse the CSP from next.config.js ───────────────────────

function extractCsp() {
  const src = fs.readFileSync(path.join(ROOT, "next.config.js"), "utf8");

  const cfMedia =
    src.match(/const CLOUDFRONT_MEDIA\s*=\s*"([^"]+)"/)?.[1] ?? "";

  const block = src.match(/const CSP\s*=\s*\[([\s\S]*?)\]\.join/)?.[1];
  if (!block) throw new Error("CSP array not found in next.config.js");

  const entries = [];
  for (const m of block.matchAll(/(?:`([^`]*)`|"([^"]*)")/g)) {
    const entry = (m[1] ?? m[2]).replace(/\$\{CLOUDFRONT_MEDIA\}/g, cfMedia);
    entries.push(entry.trim());
  }
  return entries.join("; ");
}

// Returns Map<directive, Set<pattern>>
function parseCsp(cspString) {
  const directives = new Map();
  for (const part of cspString
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean)) {
    const [name, ...tokens] = part.split(/\s+/);
    directives.set(name, new Set(tokens));
  }
  return directives;
}

// ── 2. Match a hostname against CSP source patterns ─────────────────────────

function hostnameAllowed(hostname, scheme, patterns) {
  for (const pat of patterns) {
    // Skip keyword tokens and hash/nonce values
    if (
      pat.startsWith("'") ||
      pat === "http:" ||
      pat === "https:" ||
      pat === "data:"
    )
      continue;

    // Detect explicit scheme in the pattern and split it off.
    let patternScheme = null;
    let hostPat = pat;
    if (pat.startsWith("https://")) {
      patternScheme = "https";
      hostPat = pat.slice(8);
    } else if (pat.startsWith("http://")) {
      patternScheme = "http";
      hostPat = pat.slice(7);
    }

    // When the pattern carries an explicit scheme, enforce it.
    // https:// patterns accept both https and http (upgrade-insecure-requests
    // environments); http:// patterns are strict and only match http.
    if (patternScheme !== null) {
      if (patternScheme === "http" && scheme !== "http") continue;
      // patternScheme === "https" accepts both — no continue needed
    }

    if (hostPat.startsWith("*.")) {
      // *.example.com matches only subdomains, not the apex domain itself.
      const base = hostPat.slice(2);
      if (hostname.endsWith("." + base)) return true;
    } else {
      if (hostname === hostPat) return true;
    }
  }
  return false;
}

// ── 3. Scan source files for literal external URLs ──────────────────────────

function scanFiles() {
  const results = [];
  const dirs = ["pages", "components", "lib", path.join("public", "static")];
  // `constants/` is intentionally excluded: its files contain navigation link
  // URLs (href values, externalLink, imageHref) that are not fetch/script
  // targets. Including it would produce false connect-src positives for URLs
  // like PayPal and Google Classroom that are only ever used as anchor hrefs.

  const patterns = [
    // fetch('https://...') — literal URL argument
    {
      re: /\bfetch\(\s*['"`](https?:\/\/[^'"`\s)]+)/g,
      directive: "connect-src",
    },
    // const FOO = 'https://...' — URL stored in a variable then passed to fetch.
    // Catches the common pattern of named API endpoint constants.
    // Heuristic: assumes connect-src. May produce false positives if the constant
    // is used for images, fonts, etc. rather than fetch() — add to the skip-list
    // or adjust the directive manually if that occurs.
    {
      re: /(?:const|let|var)\s+\w+\s*=\s*['"`](https?:\/\/[^'"`\s]+)/g,
      directive: "connect-src",
    },
    // <Script src="https://..." (Next.js Script component)
    {
      re: /<Script[^>]+\bsrc=["'{]+(https?:\/\/[^'"`}\s>]+)/g,
      directive: "script-src",
    },
    // <script src="https://..."
    {
      re: /<script[^>]+\bsrc=["'](https?:\/\/[^'"`\s>]+)/g,
      directive: "script-src",
    },
    // <iframe src="https://..."
    {
      re: /<iframe[^>]+\bsrc=["'](https?:\/\/[^'"`\s>]+)/g,
      directive: "frame-src",
    },
  ];

  function scanDir(dir) {
    const full = path.join(ROOT, dir);
    if (!fs.existsSync(full)) return;
    for (const entry of fs.readdirSync(full, { withFileTypes: true })) {
      // Skip node_modules and vendored third-party bundles
      if (entry.name === "node_modules" || entry.name === "pdfjs") continue;
      const sub = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(sub);
        continue;
      }
      if (!/\.(js|jsx|ts|tsx)$/.test(entry.name)) continue;

      const content = fs.readFileSync(path.join(ROOT, sub), "utf8");

      for (const { re, directive } of patterns) {
        re.lastIndex = 0;
        for (const m of content.matchAll(re)) {
          const lineNum = content.slice(0, m.index).split("\n").length;
          results.push({ file: sub, line: lineNum, url: m[1], directive });
        }
      }
    }
  }

  for (const dir of dirs) scanDir(dir);
  return results;
}

// ── 4. Main ──────────────────────────────────────────────────────────────────

let directives;
try {
  directives = parseCsp(extractCsp());
} catch (e) {
  console.error("✗ Failed to parse CSP from next.config.js:", e.message);
  process.exit(1);
}

const findings = scanFiles();

// Deduplicate by directive+hostname so each domain is reported once.
const seen = new Map();
for (const { file, line, url, directive } of findings) {
  let hostname, scheme;
  try {
    const parsed = new URL(url);
    hostname = parsed.hostname;
    scheme = parsed.protocol.replace(":", ""); // "https" or "http"
  } catch {
    continue;
  }

  const key = `${directive}:${hostname}`;
  if (seen.has(key)) continue;

  const allowed = hostnameAllowed(
    hostname,
    scheme,
    directives.get(directive) ?? new Set()
  );
  seen.set(key, allowed);

  if (allowed) {
    console.log(`✓ ${directive}: ${hostname}  (${file}:${line})`);
  } else {
    console.error(
      `✗ ${directive}: ${hostname} not in CSP  (${file}:${line})\n` +
        `  Add it to the "${directive}" directive in next.config.js`
    );
    failed = true;
  }
}

if (failed) {
  process.exit(1);
}
console.log("\nAll external URLs are covered by the CSP.");
