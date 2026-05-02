const MAX_URL_LENGTH = 2048;
const MAX_PROVIDER_LENGTH = 256;
const MAX_SOURCE_URL_LENGTH = 2048;
const WINDOW_MS = 60_000; // 1 minute window for rate limiting
const LIMIT = 60; // Rate limit: Max requests per window
const ipWindows = new Map(); // ip -> { count, windowStart }

// Rate limiting to prevent excessive logging
function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipWindows.get(ip);
  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    // Evict expired entries when opening a new window,
    // keeping the Map from growing unboundedly
    for (const [key, val] of ipWindows) {
      if (now - val.windowStart >= WINDOW_MS) ipWindows.delete(key);
    }
    ipWindows.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (entry.count >= LIMIT) return true;
  entry.count++;
  return false;
}

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }

  // Use the rightmost X-Forwarded-For value for remote address
  const ip =
    (req.headers["x-forwarded-for"] || "").split(",").at(-1)?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (isRateLimited(ip)) {
    return res.status(429).end();
  }

  const url =
    typeof req.body?.url === "string"
      ? req.body.url.slice(0, MAX_URL_LENGTH)
      : "";
  const provider =
    typeof req.body?.provider === "string"
      ? req.body.provider.slice(0, MAX_PROVIDER_LENGTH)
      : "";
  const sourceUrl =
    typeof req.body?.sourceUrl === "string"
      ? req.body.sourceUrl.slice(0, MAX_SOURCE_URL_LENGTH)
      : "";

  if (!url) {
    return res.status(400).end();
  }

  // Strip query strings and hashes before logging
  const redactedUrl = url.split(/[?#]/)[0];
  const redactedSourceUrl = sourceUrl ? sourceUrl.split(/[?#]/)[0] : "";

  console.log(JSON.stringify({ event: "thumbnail_error", url: redactedUrl, provider, sourceUrl: redactedSourceUrl }));
  return res.status(204).end();
}
