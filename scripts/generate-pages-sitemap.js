/**
 * Build-time sitemap generator for non-item pages.
 * Runs after `next build` via the `postbuild` npm hook.
 *
 * Generates public/sitemap-pages.xml containing all editorial/CMS-driven URLs
 * for the current site environment (NEXT_PUBLIC_SITE_ENV).
 *
 * Environments:
 *   user  — dp.la exhibitions, PSS, topics, news, guides, about, static pages
 *   pro   — pro.dp.la sections and news
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

function proStaticUrls() {
  const { SECTIONS } = require("../constants/pro.js");
  return [PRO_BASE, ...SECTIONS.map((s) => `${PRO_BASE}/${s.slug}`)];
}

async function proNewsUrls() {
  // Fetch the pro category ID from WP then get its posts
  const catRes = await safeFetch(
    `${WP_URL}/wp-json/wp/v2/categories?slug=pro`,
  );
  let categoryId = null;
  if (catRes) {
    const cats = await catRes.json();
    if (cats.length) categoryId = cats[0].id;
  }
  if (!categoryId) {
    console.warn("generate-pages-sitemap: could not resolve WordPress 'pro' category");
    return [];
  }
  return wpPostUrls(PRO_BASE, categoryId);
}

// --- Local hub URL collector ---

function localUrls() {
  const { LOCALS, LOCAL_SUBDOMAINS } = require("../constants/local.js");
  const hub = LOCALS[LOCAL_ID];
  if (!hub) return [];
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
    const [static_, news] = await Promise.all([
      Promise.resolve(proStaticUrls()),
      proNewsUrls(),
    ]);
    urls = [...static_, ...news];
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
