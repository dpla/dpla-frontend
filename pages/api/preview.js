/**
 * Next.js Draft Mode preview entry point.
 *
 * Called by the dpla-preview-redirect mu-plugin on dpla.wpengine.com when an
 * editor clicks the "Preview" button in the WP admin. The mu-plugin redirects
 * to this endpoint (on dp.la or pro.dp.la) with a shared secret and the
 * front-end path to render.
 *
 * On success this handler:
 *   1. Validates the shared secret.
 *   2. Enables Next.js Draft Mode (sets a signed cookie).
 *   3. Redirects the browser to the front-end URL so the page renders with
 *      draft-mode WP content.
 *
 * Query params (all required):
 *   secret        — must match WP_PREVIEW_SECRET env var
 *   post_id       — WP post ID (used only for logging/future use)
 *   post_type     — WP post type (e.g. "post", "page")
 *   redirect_path — front-end path to redirect to (e.g. "/news/my-draft")
 */
/** Returns true only for relative paths like "/news/foo" — rejects "//evil.com" etc. */
function isSafeRedirectPath(path) {
  return typeof path === "string" && path.startsWith("/") && !path.startsWith("//");
}

export default function handler(req, res) {
  const { secret, redirect_path } = req.query;

  if (!secret || secret !== process.env.WP_PREVIEW_SECRET) {
    return res.status(401).json({ message: "Invalid preview token" });
  }

  // Must be a relative path (starts with "/" but not "//") to prevent open-redirect
  if (!isSafeRedirectPath(redirect_path)) {
    return res.status(400).json({ message: "Invalid redirect_path" });
  }

  res.setDraftMode({ enable: true });
  res.redirect(redirect_path);
}
