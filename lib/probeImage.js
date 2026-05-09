/**
 * Probes a URL to determine whether it resolves to a usable image, then calls
 * onError if it doesn't.
 *
 * Why not just rely on the <img> element's onerror?  onerror fires on network
 * errors and 4xx responses, but NOT on 5xx responses (e.g. 504 Gateway
 * Timeout): the browser considers a 5xx a successful HTTP load, it just can't
 * decode the body as an image.  Checking naturalWidth === 0 in onload catches
 * that case — the image "loaded" but has no displayable pixels.
 */
// 1×1 transparent GIF — safe no-op src for cancelling in-flight image loads
// without triggering a document fetch (unlike img.src = "")
const BLANK_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const STATUS_PROBE_TIMEOUT_MS = 3000;

// Each broken URL is reported at most once per browser session.
// Persist in sessionStorage to check across navigation.
const STORAGE_KEY = "dpla_reported_thumbnail_urls";

// Checked once at module load; false in SSR or when storage is unavailable.
const storageAvailable = (() => {
  if (typeof window === "undefined") return false;
  try {
    sessionStorage.setItem("__dpla_test__", "1");
    sessionStorage.removeItem("__dpla_test__");
    return true;
  } catch {
    return false;
  }
})();

// Seed from sessionStorage so prior-session reports are not repeated.
const reportedUrls = new Set();
if (storageAvailable) {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) JSON.parse(stored).forEach((u) => reportedUrls.add(u));
  } catch {
    // Malformed storage value
  }
}

// Possible errorType values:
// * HTTP status codes as strings (e.g., "404", "500") when HEAD request succeeds
// * "decode" when image loads but has no displayable pixels (naturalWidth === 0)
// * "load" when image load fails (img.onerror)
// * "unknown" as fallback in API when errorType is missing
async function detectErrorType(url, fallbackType) {
  if (typeof window === "undefined" || typeof fetch !== "function") {
    return fallbackType;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), STATUS_PROBE_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: "HEAD",
      cache: "no-store",
      mode: "cors",
      signal: controller.signal,
    });
    if (Number.isInteger(response?.status) && response.status > 0) {
      return String(response.status);
    }
  } catch {
    // Ignore; fallbackType is returned below.
  } finally {
    clearTimeout(timeout);
  }

  return fallbackType;
}

function reportThumbnailError(url, provider, sourceUrl, errorType) {
  if (typeof window === "undefined") return;
  if (!url || reportedUrls.has(url)) return;
  reportedUrls.add(url);

  const pageUrl = window.location?.href || "";

  if (storageAvailable) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...reportedUrls]));
    } catch {
      // Quota exceeded or other storage error
    }
  }
  fetch("/api/thumbnail-error", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url, provider, sourceUrl, pageUrl, errorType }),
    keepalive: true,
  }).catch(() => {});
}

const probeImage = (url, onError, provider, sourceUrl) => {
  if (typeof url !== "string" || url.trim() === "") {
    onError();
    return () => {};
  }

  const img = document.createElement("img");
  let cancelled = false;

  const cleanup = () => {
    img.onload = null;
    img.onerror = null;
  };

  img.onload = () => {
    if (!cancelled && img.naturalWidth === 0) {
      void detectErrorType(url, "decode").then((errorType) => {
        reportThumbnailError(url, provider, sourceUrl, errorType);
      });
      onError();
    }
    cleanup();
  };
  img.onerror = () => {
    if (!cancelled) {
      void detectErrorType(url, "load").then((errorType) => {
        reportThumbnailError(url, provider, sourceUrl, errorType);
      });
      onError();
    }
    cleanup();
  };
  img.src = url;

  // Returns a disposer. Call it to cancel a pending probe — e.g. in
  // componentWillUnmount or when the URL changes before the probe finishes.
  return () => {
    cancelled = true;
    cleanup();
    img.src = BLANK_IMAGE;
  };
};

export { BLANK_IMAGE };
export default probeImage;
