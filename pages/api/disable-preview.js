/**
 * Exits Next.js Draft Mode by clearing the draft-mode cookie and redirecting
 * the browser back to the home page (or to the `redirect` query param if
 * provided).
 *
 * Usage: navigate to /api/disable-preview  (or /api/disable-preview?redirect=/some/path)
 */
export default function handler(req, res) {
  res.setDraftMode({ enable: false });
  const redirect = req.query.redirect;
  res.redirect(
    typeof redirect === "string" && redirect.startsWith("/") ? redirect : "/",
  );
}
