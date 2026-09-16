// Client-side Sentry filter
// Used as beforeSend in instrumentation-client.js
// Drops errors we cannot act on / want to ignore
const OWN_CODE = /\/_next\/static\/|^app:\/\/\/static\//;
const NON_ERROR_REJECTION = "Non-Error promise rejection captured with value:";

function isOwnFrame(frame) {
  const file = frame?.filename ?? frame?.abs_path;
  return typeof file === "string" && OWN_CODE.test(file);
}

// Frames from the whole cause chain.
function allFrames(event) {
  const values = event?.exception?.values ?? [];
  return values.flatMap((v) => v?.stacktrace?.frames ?? []);
}

function messageOf(exception) {
  const raw = typeof exception === "string" ? exception : exception?.message;
  return typeof raw === "string" ? raw : "";
}

// Returns the event, or null to drop it
export function filterClientEvent(event, hint) {
  const ex = hint?.originalException;
  const msg = messageOf(ex);
  const frames = allFrames(event);

  // Stale chunk after a deploy
  // _app.js reloads the page
  if (msg.startsWith("Invariant: attempted to hard navigate to the same URL")) {
    return null;
  }

  // Sentry Replay on iOS WebKit, drawing SVG to canvas
  if (msg.startsWith("Unable to load image data:image/svg+xml")) {
    return null;
  }

  if (frames.length === 0) {
    // Thumbnail probe timeout (lib/probeImage.js)
    // No other client code uses AbortSignal.timeout
    if (ex?.name === "TimeoutError" || msg.startsWith("signal timed out")) {
      return null;
    }

    // Extension scripts rejecting with plain strings
    // e.g. "Request timeout fooDistributor.getValue"
    const value = event?.exception?.values?.[0]?.value;
    if (typeof value === "string" && value.startsWith(NON_ERROR_REJECTION)) {
      return null;
    }

    return event;
  }

  // No frame from our bundle: an injected script threw
  // Covers iOS translation ("Error: Aa", stack overflows) and userscript.html
  if (!frames.some(isOwnFrame)) {
    return null;
  }

  return event;
}
