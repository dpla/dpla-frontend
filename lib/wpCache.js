import { safeFetch } from "lib/safeFetch";

/**
 * In-memory cache: url → { data: any, ts: number }
 *
 * Module-scoped singleton — persists for the lifetime of the Node.js process.
 * Each ECS task has its own independent cache; there is no cross-task sharing,
 * which is fine for the use-case (softening brief WP Engine maintenance windows).
 */
const _cache = new Map();

/** Re-fetch from WP Engine after this interval. */
const FRESH_TTL_MS = 90_000; // 90 seconds

/**
 * Returns a minimal Response-compatible object backed by in-memory JSON data.
 * Satisfies the interface expected by checkResponseForSSR() and callers that
 * call .json() exactly once.
 */
function cacheHit(data) {
  return {
    ok: true,
    status: 200,
    statusText: "OK (cached)",
    json: () => Promise.resolve(data),
  };
}

/**
 * Like safeFetch(), but caches parsed JSON responses in memory for FRESH_TTL_MS.
 *
 * On a network failure (safeFetch returns null), serves the last known-good
 * cached response — if one exists — and logs a warning. This prevents the
 * brief WP Engine hourly maintenance windows (~63-65 min cycle) from surfacing
 * as 500 errors to users.
 *
 * Caching is skipped for:
 *  - Non-GET requests
 *  - Requests with a body
 *  - Requests with an Authorization header (draft-mode previews)
 *
 * @param {string} url
 * @param {RequestInit} [options]
 * @returns {Promise<{ok:boolean,status:number,json:()=>Promise<any>}|null>}
 */
export async function cachedSafeFetch(url, options) {
  const method = (options?.method ?? "GET").toUpperCase();
  // Use the Headers API so all valid header forms (plain object, Headers
  // instance, lowercase keys) are normalised before checking for Authorization.
  const headers = new Headers(options?.headers ?? undefined);
  const isDraftMode = headers.has("authorization");
  const isCacheable =
    method === "GET" && options?.body == null && !isDraftMode;

  if (!isCacheable) {
    return safeFetch(url, options);
  }

  const now = Date.now();
  const cached = _cache.get(url);

  // Fresh cache hit — skip network entirely
  if (cached && now - cached.ts < FRESH_TTL_MS) {
    return cacheHit(cached.data);
  }

  const res = await safeFetch(url, options);

  if (res?.ok) {
    const data = await res.json();
    _cache.set(url, { data, ts: now });
    return cacheHit(data);
  }

  // Network failure (res === null) — serve stale data if available, rather
  // than propagating the error and showing users a 500 page during WP Engine
  // maintenance. HTTP 4xx/5xx responses are not masked: only null (no
  // connection) triggers the fallback.
  if (!res && cached) {
    const ageS = Math.round((now - cached.ts) / 1000);
    console.warn(
      `[wpCache] WP Engine unreachable; serving ${ageS}s-old cached response for ${url}`,
    );
    return cacheHit(cached.data);
  }

  // No cache and no network — let the caller handle it (404 or 500)
  return res;
}
