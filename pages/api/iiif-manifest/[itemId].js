// Server-side IIIF manifest resolver for the Transcribe viewer.
//
// The client calls /api/iiif-manifest/<itemId> (its own origin), and this route:
//   1. looks the DPLA item up in the API to find its trusted `iiifManifest` URL,
//   2. fetches that manifest server-side, and
//   3. returns a small, parsed list of canvases (page count + one image URL each).
//
// Keying on itemId — rather than a client-supplied URL — means the fetched URL is
// always one DPLA's own index vouches for, so this is not an open proxy. The client
// fetching same-origin also sidesteps CORS and the app's CSP `connect-src` policy.

import { parseIiifManifest } from "lib/parseIiifManifest";
import { DPLA_ITEM_ID_REGEX } from "constants/items";

const FETCH_TIMEOUT_MS = 10000;
// Cap how many bytes we buffer from an upstream response. `.json()` reads the whole
// body into memory, so a large or slow-chunked response could exhaust memory/CPU; this
// bounds the size (the timeout only bounds duration). Generous for IIIF manifests,
// which are JSON documents, not media.
const MAX_UPSTREAM_BODY_BYTES = 5 * 1024 * 1024;

function getErrorMessage(err) {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Unknown error";
}

class UpstreamHttpError extends Error {
  constructor(status) {
    super(`Upstream responded ${status}`);
    this.name = "UpstreamHttpError";
    this.status = status;
  }
}

// First-layer SSRF guard: block manifest URLs whose host is an internal DPLA
// endpoint or a private / loopback / link-local IP literal. This checks the literal
// host only; hostnames that *resolve* into private space (DNS rebinding) and
// redirect hops are a documented follow-up hardening item.
function isBlockedManifestHost(hostname) {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost") || host === "::1") {
    return true;
  }
  if (
    host === "api-internal.dp.la" ||
    host.endsWith("-internal.dp.la") ||
    host.endsWith(".internal.dp.la")
  ) {
    return true;
  }
  const ipv4 = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    const a = Number(ipv4[1]);
    const b = Number(ipv4[2]);
    if (a === 0 || a === 10 || a === 127) return true; // this-host, private, loopback
    if (a === 169 && b === 254) return true; // link-local + cloud metadata
    if (a === 192 && b === 168) return true; // private
    if (a === 172 && b >= 16 && b <= 31) return true; // private
    if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
  }
  return false;
}

// Read a JSON response body while enforcing a maximum byte size, so a large or
// slow-chunked upstream can't buffer unbounded data into memory. Streams and counts
// bytes rather than trusting a (possibly absent or wrong) Content-Length; the fetch
// AbortSignal still bounds total time.
async function readJsonWithLimit(response, maxBytes) {
  const declaredLength = Number(response.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    response.body?.cancel?.().catch(() => {});
    throw new Error(`Upstream body exceeds ${maxBytes} bytes`);
  }
  const reader = response.body?.getReader?.();
  if (!reader) return response.json(); // no readable stream; let fetch parse
  const chunks = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) throw new Error(`Upstream body exceeds ${maxBytes} bytes`);
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString("utf-8"));
  } finally {
    reader.cancel?.().catch(() => {});
  }
}

// Fetch JSON under a single deadline covering BOTH the response headers and the body
// read: fetch() resolves once headers arrive, so decoding the body outside the timeout
// would leave a stalled body with no deadline. Throws UpstreamHttpError on non-OK, or
// the fetch AbortError on timeout.
async function fetchJsonWithTimeout(input, init) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(input, { ...init, signal: controller.signal });
    if (!response.ok) {
      response.body?.cancel?.().catch(() => {});
      throw new UpstreamHttpError(response.status);
    }
    return await readJsonWithLimit(response, MAX_UPSTREAM_BODY_BYTES);
  } finally {
    clearTimeout(timeout);
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { itemId } = req.query;
  if (typeof itemId !== "string" || !DPLA_ITEM_ID_REGEX.test(itemId)) {
    res.status(404).json({ error: "Not found." });
    return;
  }

  const apiUrl = process.env.API_URL;
  const apiKey = process.env.API_KEY;
  if (!apiUrl || !apiKey) {
    console.error("API configuration missing: API_URL or API_KEY not set");
    res.status(500).json({ error: "Server configuration error." });
    return;
  }

  // 1. Resolve the item's manifest URL from the DPLA record.
  let manifestUrl;
  try {
    const itemUrl = new URL(apiUrl);
    itemUrl.pathname = itemUrl.pathname.replace(/\/$/, "") + `/items/${itemId}`;
    itemUrl.searchParams.set("api_key", apiKey);
    const data = await fetchJsonWithTimeout(itemUrl);
    manifestUrl = data?.docs?.[0]?.iiifManifest;
  } catch (err) {
    if (err instanceof UpstreamHttpError && err.status === 404) {
      res.status(404).json({ error: "Not found." });
      return;
    }
    const aborted = err?.name === "AbortError";
    console.error("Error resolving item for IIIF manifest.", {
      message: getErrorMessage(err),
      aborted,
    });
    res.status(aborted ? 504 : 502).json({ error: "Upstream service error." });
    return;
  }

  if (!manifestUrl || typeof manifestUrl !== "string") {
    res.status(404).json({ error: "This item has no IIIF manifest." });
    return;
  }

  // Validate the (index-supplied) manifest URL: web schemes only, non-internal host.
  let parsedUrl;
  try {
    parsedUrl = new URL(manifestUrl);
  } catch {
    res.status(502).json({ error: "Malformed manifest URL." });
    return;
  }
  if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") {
    res.status(502).json({ error: "Unsupported manifest URL scheme." });
    return;
  }
  if (isBlockedManifestHost(parsedUrl.hostname)) {
    console.error("Blocked IIIF manifest host.", { host: parsedUrl.hostname });
    res.status(502).json({ error: "Manifest host not allowed." });
    return;
  }

  // 2. Fetch the manifest server-side (timeout covers headers + body decode).
  let manifest;
  try {
    manifest = await fetchJsonWithTimeout(parsedUrl, {
      // Request broadly rather than a JSON-specific Accept: some IIIF hosts (e.g.
      // Digital Commonwealth's ARK resolver) content-negotiate and 404 an
      // `application/json` Accept, only redirecting to the real manifest for */*.
      // A descriptive User-Agent also avoids library-UA blocks on some providers.
      headers: {
        Accept: "*/*",
        "User-Agent": "DPLA-Transcribe/1.0 (+https://dp.la)",
      },
    });
  } catch (err) {
    const aborted = err?.name === "AbortError";
    console.error("Error fetching IIIF manifest.", {
      message: getErrorMessage(err),
      aborted,
    });
    res.status(aborted ? 504 : 502).json({ error: "Could not load IIIF manifest." });
    return;
  }

  // 3. Parse to a small canvas list. Guard so one malformed manifest can't 500 the route.
  let result;
  try {
    result = parseIiifManifest(manifest);
  } catch (err) {
    console.error("Error parsing IIIF manifest.", { message: getErrorMessage(err) });
    res.status(502).json({ error: "Could not parse IIIF manifest." });
    return;
  }

  res.setHeader("Cache-Control", "public, max-age=3600");
  res.status(200).json(result);
}
