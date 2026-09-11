import test from 'node:test';
import assert from 'node:assert';
import {
  RETRY_AFTER_MIN_SECONDS,
  RETRY_AFTER_MAX_SECONDS,
  RETRY_CAP_SECONDS,
  retryAfterSeconds,
  retryDelaySeconds,
} from './retryPolicy.js';

// retryAfterSeconds

test('retryAfterSeconds covers the whole band inclusive', () => {
  assert.equal(retryAfterSeconds(() => 0), RETRY_AFTER_MIN_SECONDS);
  assert.equal(retryAfterSeconds(() => 0.999999), RETRY_AFTER_MAX_SECONDS);
});

test('retryAfterSeconds returns whole seconds inside the band', () => {
  for (let i = 0; i < 1000; i++) {
    const n = retryAfterSeconds();
    assert.ok(Number.isInteger(n));
    assert.ok(n >= RETRY_AFTER_MIN_SECONDS && n <= RETRY_AFTER_MAX_SECONDS);
  }
});

test('the band starts above the API circuit breaker reset window (20s)', () => {
  assert.ok(RETRY_AFTER_MIN_SECONDS > 20);
});

// retryDelaySeconds

test('retryDelaySeconds uses the server Retry-After as the floor for the first attempt', () => {
  assert.equal(retryDelaySeconds(0, 45, () => 0), 45);
});

test('retryDelaySeconds doubles per attempt', () => {
  assert.equal(retryDelaySeconds(1, 45, () => 0), 90);
  assert.equal(retryDelaySeconds(2, 40, () => 0), 160);
});

test('retryDelaySeconds caps the base delay', () => {
  assert.equal(retryDelaySeconds(2, 45, () => 0), RETRY_CAP_SECONDS);
  assert.equal(retryDelaySeconds(10, 45, () => 0), RETRY_CAP_SECONDS);
});

test('retryDelaySeconds adds up to 25% jitter on top of the base', () => {
  assert.equal(retryDelaySeconds(0, 40, () => 0.999999), 50);
  const n = retryDelaySeconds(0, 40);
  assert.ok(n >= 40 && n <= 50, `got ${n}`);
});

