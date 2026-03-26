/**
 * Build-time sitemap generator for non-item pages.
 * Runs after `next build` via the `postbuild` npm hook.
 *
 * Generates public/sitemap-pages.xml containing all editorial/CMS-driven URLs
 * for the current site environment (NEXT_PUBLIC_SITE_ENV).
 *
 * Environments:
 *   user  — dp.la exhibitions, PSS, topics, news, guides, about, static pages
 *   pro   — pro.dp.la pages from the WordPress pro-site menu
 *   local — local hub static pages (from constants/local.js)
 *   cqa   — skipped (empty sitemap)
 */

const fs = require("fs");
const path = require("path");

const SITE_ENV = process.env.NEXT_PUBLIC_SITE_ENV || "user";
const LOCAL_ID = process.env.NEXT_PUBLIC_LOCAL_ID || "";
const WP_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://dpla.wpengine.com";
const API_URL = process.env.API_URL || "";
const API_KEY = process.env.API_KEY || "";

const USER_BASE = "https://dp.la";
const PRO_BASE = "https://pro.dp.la";

function sanitizeUrl(url) {
  return url.replace(/([?&]api_key=)[^&]+/i, "$1[REDACTED]");
}

async function safeFetch(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) {
      console.warn(`  fetch ${sanitizeUrl(url)} → ${res.status}`);
      return null;
    }
    return res;
  } catch (err) {
    console.warn(`  fetch ${sanitizeUrl(url)} failed: ${err.message}`);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

// --- User site URL collectors ---

function userStaticUrls() {
  return [
    "/",
    "/exhibitions",
    "/primary-source-sets",
    "/browse-by-topic",
    "/news",
    "/guides",
    "/browse-by-partner",
    "/contact",
    "/donate",
  ].map((p) => USER_BASE + p);
}

async function exhibitionUrls() {
  const dataDir = path.join(process.cwd(), "exhibitions-data");
  const { exhibitions: index } = JSON.parse(
    fs.readFileSync(path.join(dataDir, "exhibitions.json"), "utf-8"),
  );

  const urls = [];
  for (const ex of index) {
    const slug = ex.slug;
    if (!slug || slug === "exhibitions") continue;
    urls.push(`${USER_BASE}/exhibitions/${slug}`);

    try {
      const data = JSON.parse(
        fs.readFileSync(path.join(dataDir, `${slug}.json`), "utf-8"),
      );
      const pages = data.pages || [];
      const topLevel = pages.filter((p) => !p.parent);
      for (const page of topLevel) {
        if (!page.slug) continue;
        urls.push(`${USER_BASE}/exhibitions/${slug}/${page.slug}`);
        const subpages = pages.filter(
          (p) => p.parent && p.parent.id === page.id,
        );
        for (const sub of subpages) {
          urls.push(
            `${USER_BASE}/exhibitions/${slug}/${page.slug}/${sub.slug}`,
          );
        }
      }
    } catch {
      // exhibition file missing — skip sections
    }
  }
  return urls;
}

async function pssUrls() {
  if (!API_URL || !API_KEY) return [];
  const urls = [];
  let page = 1;
  while (true) {
    const url = `${API_URL}/pss/sets?api_key=${API_KEY}&page=${page}&page_size=100`;
    const res = await safeFetch(url);
    if (!res) break;
    const data = await res.json();
    const sets = data.sets || data.response?.sets || [];
    if (!sets.length) break;
    for (const set of sets) {
      const slug = set.slug || set.id;
      if (!slug) continue;
      urls.push(`${USER_BASE}/primary-source-sets/${slug}`);
      urls.push(`${USER_BASE}/primary-source-sets/${slug}/teaching-guide`);
      urls.push(
        `${USER_BASE}/primary-source-sets/${slug}/additional-resources`,
      );
    }
    if (!data.next_page && !data.response?.next_page) break;
    page++;
  }
  return urls;
}

async function topicUrls() {
  const res = await safeFetch(`${WP_URL}/wp-json/dpla/v2/categories`);
  if (!res) return [];
  const categories = await res.json();
  const urls = [];
  for (const cat of categories) {
    if (!cat.slug) continue;
    urls.push(`${USER_BASE}/browse-by-topic/${cat.slug}`);
    for (const sub of cat.subcategories || []) {
      if (sub.slug) {
        urls.push(`${USER_BASE}/browse-by-topic/${cat.slug}/${sub.slug}`);
      }
    }
  }
  return urls;
}

async function wpPostUrls(base, categoryId = null) {
  const urls = [];
  let page = 1;
  while (true) {
    let endpoint = `${WP_URL}/wp-json/wp/v2/posts?per_page=100&status=publish&page=${page}`;
    if (categoryId) endpoint += `&categories=${categoryId}`;
    const res = await safeFetch(endpoint);
    if (!res) break;
    const posts = await res.json();
    if (!Array.isArray(posts) || !posts.length) break;
    for (const post of posts) {
      if (post.slug) urls.push(`${base}/news/${post.slug}`);
    }
    const total = parseInt(res.headers.get("X-WP-TotalPages") || "1");
    if (page >= total) break;
    page++;
  }
  return urls;
}

async function guideUrls() {
  const res = await safeFetch(
    `${WP_URL}/wp-json/menus/v1/menus/user-guides`,
  );
  if (!res) return [];
  const menu = await res.json();
  return (menu.items || [])
    .filter((item) => item.slug)
    .map((item) => `${USER_BASE}/guides/${item.slug}`);
}

async function aboutUrls() {
  const res = await safeFetch(
    `${WP_URL}/wp-json/wp/v2/pages?per_page=100&parent=0`,
  );
  if (!res) return [];
  const pages = await res.json();
  const aboutPage = pages.find(
    (p) => p.slug === "about" || p.slug === "about-us",
  );
  if (!aboutPage) return [`${USER_BASE}/about`];

  const childRes = await safeFetch(
    `${WP_URL}/wp-json/wp/v2/pages?per_page=100&parent=${aboutPage.id}`,
  );
  const urls = [`${USER_BASE}/about`];
  if (childRes) {
    const children = await childRes.json();
    for (const child of children) {
      if (child.slug) urls.push(`${USER_BASE}/about/${child.slug}`);
    }
  }
  return urls;
}

// --- Pro site URL collectors ---

async function proMenuUrls() {
  const { SECTIONS } = require("../constants/pro.js");
  const urls = [PRO_BASE];

  const res = await safeFetch(
    `${WP_URL}/wp-json/menus/v1/menus/pro-site`,
  );
  if (!res) {
    console.warn("generate-pages-sitemap: could not fetch pro-site menu, falling back to SECTIONS list");
    return [PRO_BASE, ...SECTIONS.map((s) => `${PRO_BASE}/${s.slug}`), `${PRO_BASE}/hubs`];
  }

  const menu = await res.json();
  const items = menu.items || [];

  // Build ID → item lookup for ancestor traversal, and collect all slugs in one pass
  const byId = {};
  const allMenuSlugs = new Set();
  for (const item of items) {
    byId[String(item.ID)] = item;
    if (item.post_name) allMenuSlugs.add(item.post_name);
  }

  // Walk up to find the top-level (root) ancestor's slug
  function topLevelSlug(item) {
    let cur = item;
    while (String(cur.menu_item_parent) !== "0") {
      const parent = byId[String(cur.menu_item_parent)];
      if (!parent) break;
      cur = parent;
    }
    return cur.post_name;
  }

  // Slugs with rewrites on pro: all SECTIONS + hubs (its own route)
  const routableSlugs = new Set([...SECTIONS.map((s) => s.slug), "hubs"]);

  const added = new Set([PRO_BASE]);

  for (const item of items) {
    const slug = item.post_name;
    if (!slug) continue;

    const topSlug = topLevelSlug(item);
    if (topSlug === "news") continue; // /news redirects to dp.la

    if (String(item.menu_item_parent) === "0") {
      // Top-level item
      if (!routableSlugs.has(slug)) continue;
      const url = `${PRO_BASE}/${slug}`;
      if (!added.has(url)) { urls.push(url); added.add(url); }
    } else {
      // Nested item at any depth — reachable as /<top-ancestor>/<slug>
      // (next.config.js rewrites /:section/:subsection → pro/wp, and
      //  getServerSideProps matches by post_name regardless of menu depth)
      if (!routableSlugs.has(topSlug)) continue;
      const url = `${PRO_BASE}/${topSlug}/${slug}`;
      if (!added.has(url)) { urls.push(url); added.add(url); }
    }
  }

  // Some SECTIONS slugs (e.g. "ebooks") are nested under "news" in the menu
  // but route correctly at /<slug> via next.config.js SECTIONS rewrites.
  // Include them if they appear anywhere in the menu but weren't added above.
  for (const section of SECTIONS) {
    const url = `${PRO_BASE}/${section.slug}`;
    if (allMenuSlugs.has(section.slug) && !added.has(url)) {
      urls.push(url);
    }
  }

  return urls;
}

// --- Local hub URL collector ---

function localUrls() {
  const { LOCALS, LOCAL_SUBDOMAINS } = require("../constants/local.js");
  if (!LOCAL_ID) throw new Error("NEXT_PUBLIC_LOCAL_ID is required for local site builds");
  const hub = LOCALS[LOCAL_ID];
  if (!hub) throw new Error(`Unknown local hub: ${LOCAL_ID}`);
  const base = `https://${LOCAL_SUBDOMAINS[LOCAL_ID] || LOCAL_ID + ".dp.la"}`;
  return [base, ...Object.keys(hub.routes || {}).map((route) => base + route)];
}

// --- XML builder ---

function buildSitemap(urls) {
  const now = new Date().toISOString();
  const entries = urls
    .map(
      (url) =>
        `  <url>\n    <loc>${escapeXml(url)}</loc>\n    <lastmod>${now}</lastmod>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
}

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// --- Main ---

async function main() {
  if (SITE_ENV === "cqa") {
    console.log("generate-pages-sitemap: skipping (cqa environment)");
    return;
  }

  console.log(`generate-pages-sitemap: generating for SITE_ENV=${SITE_ENV}`);
  let urls = [];

  if (SITE_ENV === "user") {
    const [static_, exhibitions, pss, topics, news, guides, about] =
      await Promise.all([
        Promise.resolve(userStaticUrls()),
        exhibitionUrls(),
        pssUrls(),
        topicUrls(),
        wpPostUrls(USER_BASE),
        guideUrls(),
        aboutUrls(),
      ]);
    urls = [...static_, ...exhibitions, ...pss, ...topics, ...news, ...guides, ...about];
  } else if (SITE_ENV === "pro") {
    urls = await proMenuUrls();
  } else if (SITE_ENV === "local") {
    urls = localUrls();
  }

  const xml = buildSitemap(urls);
  const outPath = path.join(process.cwd(), "public", "sitemap-pages.xml");
  fs.writeFileSync(outPath, xml, "utf-8");
  console.log(
    `generate-pages-sitemap: wrote ${urls.length} URLs to public/sitemap-pages.xml`,
  );
}

main().catch((err) => {
  console.error("generate-pages-sitemap failed:", err);
  process.exit(1);
});
