/**
 * Returns fetch options that include a WP Basic-Auth header when draftMode is
 * enabled. Pass the result as the second argument to safeFetch().
 *
 * When draftMode is false the function returns undefined so callers can safely
 * spread or pass it without changing existing behaviour.
 *
 * @param {boolean} draftMode - value of context.draftMode from getServerSideProps
 * @returns {RequestInit|undefined}
 */
// Computed once at startup — credentials are static env vars and never change.
const _wpAuthToken = (() => {
  const user = process.env.WP_PREVIEW_USER;
  const pass = process.env.WP_PREVIEW_APP_PASSWORD;
  if (!user || !pass) return null;
  return Buffer.from(`${user}:${pass}`).toString("base64");
})();

export function wpAuthFetchOptions(draftMode) {
  if (!draftMode || !_wpAuthToken) return undefined;
  return { headers: { Authorization: `Basic ${_wpAuthToken}` } };
}

/**
 * Appends `context=edit` to a URL for WP REST API draft-mode fetches.
 * Uses `?` or `&` correctly depending on whether the URL already has a query string.
 *
 * @param {string} url
 * @returns {string}
 */
export function wpDraftUrl(url) {
  return url.includes("?") ? `${url}&context=edit` : `${url}?context=edit`;
}

const SENSITIVE_PARAMS = new Set([
  "api_key", "access_token", "token", "password", "secret",
  "auth", "client_secret", "key",
]);

function sanitizeUrl(url) {
  try {
    const parsed = new URL(url);
    for (const key of parsed.searchParams.keys()) {
      if (SENSITIVE_PARAMS.has(key.toLowerCase())) {
        parsed.searchParams.set(key, "[REDACTED]");
      }
    }
    return parsed.toString();
  } catch {
    return "[unparseable URL]";
  }
}

/**
 * Wraps fetch() in a try/catch to handle network-level failures (e.g. DNS
 * errors, connection timeouts). Returns the Response on success, or null if
 * the request could not be made at all. Callers should still check
 * response.ok for non-2xx HTTP status codes.
 *
 * Using optional chaining on the return value (`res?.ok`) covers both the
 * null (network failure) and non-ok (HTTP error) cases in a single check.
 */
// Transient undici error codes that are worth retrying once (e.g. WP Engine
// briefly refusing new connections during hourly maintenance tasks).
const RETRYABLE_CODES = new Set(["UND_ERR_CONNECT_TIMEOUT", "UND_ERR_SOCKET"]);

export async function safeFetch(url, options) {
  const method = (options?.method ?? "GET").toUpperCase();
  const canRetry = (method === "GET" || method === "HEAD") && options?.body == null;

  for (let attempt = 0; attempt < 2; attempt++) {
    let res;
    try {
      res = await fetch(url, options);
    } catch (err) {
      if (canRetry && attempt === 0 && RETRYABLE_CODES.has(err.cause?.code)) {
        console.warn(
          `[safeFetch] Retrying after ${err.cause?.code} fetching ${sanitizeUrl(url)}`,
        );
        await new Promise((r) => setTimeout(r, 500));
        continue;
      }
      // Log the original network-level error so it appears in Sentry/CloudWatch.
      console.error(
        `[safeFetch] Network error fetching ${sanitizeUrl(url)}:`,
        err,
      );
      return null;
    }
    // Retry once on 503 — transient upstream unavailability during deploys.
    // 1500ms is intentional: it aligns with the ALB slow-start ramp so the
    // second attempt lands after new tasks have begun warming up. Applies to
    // all SSR GET/HEAD fetches site-wide (search, news, PSS, etc.).
    if (canRetry && attempt === 0 && res.status === 503) {
      console.warn(`[safeFetch] Retrying after 503 from ${sanitizeUrl(url)}`);
      // Consume the body so the underlying connection is released back to the
      // Undici pool before we wait and retry.
      await res.body?.cancel();
      await new Promise((r) => setTimeout(r, 1500));
      continue;
    }
    return res;
  }
  // Defensive fallback — unreachable: every loop iteration either returns or
  // continues, so the loop always exits via return.
  return null;
}

/**
 * Like checkResponseForSSR, but catches upstream 5xx/network errors and
 * returns { notFound: true } instead of throwing. Use this for any SSR
 * endpoint where a network error or 5xx should render a 404 page rather
 * than an unhandled 500.
 *
 * @param {Response|null} res - Response from safeFetch
 * @param {string} label - Human-readable label for error logging (e.g. 'set "foo"')
 */
export function checkResponseForSSRSafe(res, label) {
  try {
    return checkResponseForSSR(res);
  } catch (err) {
    console.error(`[SSR] Upstream error for ${label}:`, err.message);
    return { notFound: true };
  }
}

/**
 * Sets a 503 status code + Retry-After header on the SSR response object and
 * returns { props: { temporarilyUnavailable: true } } for use in
 * getServerSideProps when an upstream fetch returns null (network failure).
 *
 * Callers should pass `context.res` (full context) or the destructured `res`.
 * The component must handle the `temporarilyUnavailable` prop by rendering
 * a ServiceUnavailable page rather than trying to use missing data.
 *
 * @param {import('http').ServerResponse} res - Next.js SSR response object
 * @returns {{ props: { temporarilyUnavailable: true } }}
 */
export function upstreamUnavailable(res) {
  res.statusCode = 503;
  res.setHeader("Retry-After", "10");
  return { props: { temporarilyUnavailable: true } };
}

/**
 * Checks a safeFetch response and returns { notFound: true } for 4xx errors,
 * or throws for 5xx/network errors so Next.js renders the 500 page.
 *
 * Returns null if the response is OK (caller should continue processing).
 * Returns { notFound: true } for 4xx status codes.
 * Throws an error for null responses (network failure) or 5xx status codes.
 */
export function checkResponseForSSR(res) {
  if (res?.ok) return null;
  if (!res) {
    throw new Error("Upstream fetch failed: network error");
  }
  if (res.status >= 400 && res.status < 500) {
    return { notFound: true };
  }
  throw new Error(
    `Upstream fetch failed: ${res.status} ${res.statusText} (${res.url})`,
  );
}
