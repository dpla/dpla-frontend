import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { MAX_AUTO_RETRIES, retryDelaySeconds } from "lib/retryPolicy";

const STORAGE_PREFIX = "503-reload-attempts:";
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000; // Attempts older than this don't count

function readAttempts(raw) {
  try {
    const { n, at } = JSON.parse(raw);
    if (!Number.isInteger(n) || Date.now() - at > ATTEMPT_WINDOW_MS) return 0;
    return n;
  } catch {
    return 0;
  }
}

// Reloads page after a backed-off delay,
// at most MAX_AUTO_RETRIES times per path.
// Attempts live in sessionStorage.
function useAutoRetry(retryAfter) {
  const { asPath } = useRouter();

  useEffect(() => {
    const key = STORAGE_PREFIX + asPath;
    let attempts;
    try {
      attempts = readAttempts(sessionStorage.getItem(key));
    } catch {
      return undefined;
    }
    if (attempts >= MAX_AUTO_RETRIES) return undefined;
    const timer = setTimeout(() => {
      try {
        sessionStorage.setItem(
          key,
          JSON.stringify({ n: attempts + 1, at: Date.now() }),
        );
      } catch {
        return;
      }
      window.location.reload();
    }, retryDelaySeconds(attempts, retryAfter) * 1000);
    return () => clearTimeout(timer);
  }, [retryAfter, asPath]);
}

/** Auto-retries a 503 page */
export default function AutoRetryNotice({ retryAfter }) {
  useAutoRetry(retryAfter);
  return <p>This page may try again on its own a few times.</p>;
}
