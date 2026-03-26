/**
 * Exits Next.js Draft Mode by clearing the draft-mode cookie and redirecting
 * the browser back to the home page (or to the `redirect` query param if
 * provided).
 *
 * Usage: navigate to /api/disable-preview  (or /api/disable-preview?redirect=/some/path)
 */

/**
 * Parses a user-supplied redirect value into a safe relative path, or returns
 * null if the value is not a valid relative path.
 *
 * Using new URL() to reconstruct the path breaks the taint chain for static
 * analysis while also correctly rejecting protocol-relative ("//evil.com") and
 * absolute ("https://evil.com") values.
 *
 * @param {unknown} value
 * @returns {string|null}
 */
function parseSafeRedirectPath(value) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return null;
  }
  try {
    const url = new URL(value, "http://placeholder");
    return url.pathname + url.search + url.hash;
  } catch {
    return null;
  }
}

export default function handler(req, res) {
  res.setDraftMode({ enable: false });
  res.redirect(parseSafeRedirectPath(req.query.redirect) ?? "/");
}
