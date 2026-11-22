#!/usr/bin/env node
/**
 * scripts/check-wp-embeds.js
 *
 * Checks <iframe> and <script> embeds in WordPress posts and pages against the
 * CSP in next.config.js and reports blocked hosts not listed in KNOWN_BLOCKED.
 *
 * Run: node scripts/check-wp-embeds.js [--json <file>]
 * Schedule: weekly "Check WordPress Embeds" GitHub Actions workflow
 *
 * --json <file> also writes those hosts to <file> for the workflow.
 *
 * Exit codes:
 *   0  every blocked embed is in KNOWN_BLOCKED
 *   1  some blocked embeds are not in KNOWN_BLOCKED
 *   2  WordPress or the CSP could not be read
 */

"use strict";

const fs = require("fs");
const { extractCsp, parseCsp, hostnameAllowed } = require("./check-csp");

const WORDPRESS_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://dpla.wpengine.com";

const jsonFlagIndex = process.argv.indexOf("--json");
const jsonPath = jsonFlagIndex === -1 ? null : process.argv[jsonFlagIndex + 1];

// Embeds we expect the CSP to block
const KNOWN_BLOCKED = [
  // Shut down or unreachable (broken regardless of the CSP)
  { directive: "frame-src", url: "www.google.com/fusiontables/", reason: "Google Fusion Tables, shut down" },
  { directive: "frame-src", url: "storify.com/", reason: "Storify, shut down" },
  { directive: "script-src", url: "storify.com/", reason: "Storify, shut down" },
  { directive: "frame-src", url: "zeega.com/", reason: "Zeega, shut down" },
  { directive: "frame-src", url: "techtv.mit.edu/", reason: "MIT TechTV, shut down" },
  { directive: "frame-src", url: "iiif.archivelab.org/", reason: "archivelab.org IIIF viewer, unreachable" },
  { directive: "script-src", url: "wvir.images.worldnow.com/", reason: "2013 NBC29 video player, returns 404" },
  { directive: "frame-src", url: "docs.google.com/forms/d/1Fho6_pAGAbG6C2kUPSv0vB8fCOL-u0f_Ky28wgsAalA/", reason: "2014 committee call form, closed" },
  { directive: "frame-src", url: "imgur.com/", reason: "Imgur album embed, images never load" },

  // Blocked
  { directive: "script-src", url: "s.imgur.com/", reason: "Imgur embed script; falls back to links" },
  { directive: "script-src", url: "platform.twitter.com/", reason: "Twitter widget; tweets fall back to quoted text" },
  { directive: "script-src", url: "embedr.flickr.com/", reason: "Flickr embed script; falls back to a linked image" },
];

const EMBED_RE = /<(iframe|script)\b[^>]*?\ssrc\s*=\s*["']([^"']+)["']/gi;
const DIRECTIVE_FOR_TAG = { iframe: "frame-src", script: "script-src" };

async function fetchAll(type) {
  const items = [];
  let totalPages = 1;
  for (let page = 1; page <= totalPages; page++) {
    const url =
      `${WORDPRESS_URL}/wp-json/wp/v2/${type}` +
      `?per_page=100&page=${page}&_fields=link,content`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GET ${url} returned ${res.status}`);
    totalPages = Number(res.headers.get("x-wp-totalpages"));
    if (!totalPages) throw new Error(`GET ${url} returned no X-WP-TotalPages`);
    items.push(...(await res.json()));
  }
  return items;
}

function extractEmbeds(item) {
  const embeds = [];
  for (const m of item.content.rendered.matchAll(EMBED_RE)) {
    let url;
    try {
      url = new URL(m[2], item.link);
    } catch {
      continue;
    }
    if (url.protocol !== "https:" && url.protocol !== "http:") continue;
    embeds.push({
      directive: DIRECTIVE_FOR_TAG[m[1].toLowerCase()],
      hostname: url.hostname,
      pathname: url.pathname,
      scheme: url.protocol.replace(":", ""),
    });
  }
  return embeds;
}

async function main() {
  const directives = parseCsp(extractCsp());

  const items = [...(await fetchAll("posts")), ...(await fetchAll("pages"))];

  // Blocked embeds, grouped by KNOWN_BLOCKED entry or by directive + host.
  const blocked = new Map();
  for (const item of items) {
    for (const { directive, hostname, pathname, scheme } of extractEmbeds(item)) {
      const patterns = directives.get(directive) ?? new Set();
      if (hostnameAllowed(hostname, scheme, patterns)) continue;

      const exception = KNOWN_BLOCKED.find(
        (e) =>
          e.directive === directive && (hostname + pathname).startsWith(e.url)
      );
      const key = exception
        ? `${directive} ${exception.url}`
        : `${directive} ${hostname}`;
      if (!blocked.has(key)) {
        blocked.set(key, {
          directive,
          source: exception ? exception.url : hostname,
          reason: exception?.reason,
          count: 0,
          links: new Set(),
        });
      }
      const entry = blocked.get(key);
      entry.count++;
      entry.links.add(item.link);
    }
  }

  const sorted = [...blocked.values()].sort((a, b) => b.count - a.count);
  const known = sorted.filter((entry) => entry.reason);
  const unknown = sorted.filter((entry) => !entry.reason);

  if (jsonPath) {
    const json = unknown.map(({ directive, source, count, links }) => ({
      directive,
      source,
      count,
      links: [...links],
    }));
    fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2) + "\n");
  }

  console.log(`Checked ${items.length} posts and pages from ${WORDPRESS_URL}\n`);

  for (const entry of unknown) {
    console.error(
      `✗ ${entry.directive}: ${entry.source} not in CSP ` +
        `(${entry.count} embeds in ${entry.links.size} posts or pages)`
    );
    for (const link of entry.links) console.error(`    ${link}`);
  }
  for (const entry of known) {
    console.log(
      `- ${entry.directive}: ${entry.source} blocked, known exception: ` +
        `${entry.reason} (${entry.count} embeds in ${entry.links.size} posts or pages)`
    );
  }

  if (unknown.length > 0) {
    console.error(
      `\n${unknown.length} blocked host(s) match no KNOWN_BLOCKED entry. ` +
        `Either allow them in next.config.js or add them to KNOWN_BLOCKED ` +
        `in scripts/check-wp-embeds.js.`
    );
    process.exit(1);
  }
  console.log("\nEvery blocked embed matches a KNOWN_BLOCKED entry.");
}

main().catch((e) => {
  console.error("✗", e.message);
  process.exit(2);
});
