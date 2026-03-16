/**
 * Wraps fetch() in a try/catch to handle network-level failures (e.g. DNS
 * errors, connection timeouts). Returns the Response on success, or null if
 * the request could not be made at all. Callers should still check
 * response.ok for non-2xx HTTP status codes.
 *
 * Using optional chaining on the return value (`res?.ok`) covers both the
 * null (network failure) and non-ok (HTTP error) cases in a single check.
 */
export async function safeFetch(url, options) {
  try {
    return await fetch(url, options);
  } catch {
    return null;
  }
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
