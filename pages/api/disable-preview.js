/**
 * Exits Next.js Draft Mode by clearing the draft-mode cookie and redirecting
 * the browser back to the home page (or to the `redirect` query param if
 * provided).
 *
 * Usage: navigate to /api/disable-preview  (or /api/disable-preview?redirect=/some/path)
 */
/** Returns true only for relative paths like "/news/foo" — rejects "//evil.com" etc. */
function isSafeRedirectPath(path) {
  return typeof path === "string" && path.startsWith("/") && !path.startsWith("//");
}

export default function handler(req, res) {
  res.setDraftMode({ enable: false });
  const redirect = req.query.redirect;
  res.redirect(isSafeRedirectPath(redirect) ? redirect : "/");
}
