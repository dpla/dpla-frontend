/**
 * Retry timing for 503 responses.
 */
export const RETRY_AFTER_MIN_SECONDS = 30;
export const RETRY_AFTER_MAX_SECONDS = 60;

export const MAX_AUTO_RETRIES = 3;
export const RETRY_CAP_SECONDS = 180;
const CLIENT_JITTER = 0.25;

/** Random whole seconds in the Retry-After band */
export function retryAfterSeconds(random = Math.random) {
  const span = RETRY_AFTER_MAX_SECONDS - RETRY_AFTER_MIN_SECONDS + 1;
  return RETRY_AFTER_MIN_SECONDS + Math.floor(random() * span);
}

/** Seconds before client retry `attempt` (0-based) */
export function retryDelaySeconds(attempt, retryAfter, random = Math.random) {
  const base = Math.min(RETRY_CAP_SECONDS, retryAfter * 2 ** attempt);
  return Math.round(base * (1 + random() * CLIENT_JITTER));
}
