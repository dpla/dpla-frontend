import test from 'node:test';
import assert from 'node:assert';
import {
  isUpstreamUnavailable,
  upstreamUnavailable,
  markUpstreamUnavailable,
  cancelBodies,
  isNetworkError,
  safeJson,
  wpDraftUrl,
  wpAcfUrl,
} from './safeFetch.js';
import { RETRY_AFTER_MIN_SECONDS, RETRY_AFTER_MAX_SECONDS } from './retryPolicy.js';

const warnings = [];
console.warn = (line) => warnings.push(line);

// isUpstreamUnavailable

test('isUpstreamUnavailable returns true for null (network failure)', () => {
  assert.equal(isUpstreamUnavailable(null), true);
});

test('isUpstreamUnavailable returns true for 500 response', () => {
  assert.equal(isUpstreamUnavailable({ status: 500 }), true);
});

test('isUpstreamUnavailable returns true for 503 response', () => {
  assert.equal(isUpstreamUnavailable({ status: 503 }), true);
});

test('isUpstreamUnavailable returns true for 504 response', () => {
  assert.equal(isUpstreamUnavailable({ status: 504 }), true);
});

test('isUpstreamUnavailable returns false for 499 response', () => {
  assert.equal(isUpstreamUnavailable({ status: 499, ok: false }), false);
});

test('isUpstreamUnavailable returns false for a successful response', () => {
  assert.equal(isUpstreamUnavailable({ status: 200, ok: true }), false);
});

test('isUpstreamUnavailable returns false for a 404 response', () => {
  assert.equal(isUpstreamUnavailable({ status: 404, ok: false }), false);
});

// upstreamUnavailable

function makeRes(url = '/') {
  const headers = {};
  return {
    statusCode: 200,
    req: { method: 'GET', url },
    setHeader(name, value) { headers[name] = value; },
    getHeader(name) { return headers[name]; },
  };
}

function assertRetryAfterInBand(header) {
  assert.match(header, /^\d+$/);
  const n = Number(header);
  assert.ok(
    n >= RETRY_AFTER_MIN_SECONDS && n <= RETRY_AFTER_MAX_SECONDS,
    `Retry-After ${n} outside ${RETRY_AFTER_MIN_SECONDS}-${RETRY_AFTER_MAX_SECONDS}`,
  );
  return n;
}

test('upstreamUnavailable sets statusCode 503 and a jittered Retry-After', async () => {
  const res = makeRes();
  await upstreamUnavailable(res);
  assert.equal(res.statusCode, 503);
  assertRetryAfterInBand(res.getHeader('Retry-After'));
});

test('upstreamUnavailable returns temporarilyUnavailable plus the Retry-After it sent', async () => {
  const res = makeRes();
  const result = await upstreamUnavailable(res);
  const sent = assertRetryAfterInBand(res.getHeader('Retry-After'));
  assert.deepEqual(result, { props: { temporarilyUnavailable: true, retryAfter: sent } });
});

test('upstreamUnavailable varies Retry-After across calls', async () => {
  const seen = new Set();
  for (let i = 0; i < 200; i++) {
    const res = makeRes();
    await upstreamUnavailable(res);
    seen.add(res.getHeader('Retry-After'));
  }
  assert.ok(seen.size > 1, 'expected jitter, got a constant Retry-After');
});

test('upstreamUnavailable calls body.cancel on supplied fetch responses', async () => {
  const res = makeRes();
  let cancelCalled = 0;
  const mockResponse = { body: { cancel: () => { cancelCalled++; return Promise.resolve(); } } };
  await upstreamUnavailable(res, mockResponse, mockResponse);
  assert.equal(cancelCalled, 2);
});

test('upstreamUnavailable ignores null and undefined fetch responses', async () => {
  const res = makeRes();
  // Should not throw when null/undefined are passed
  await assert.doesNotReject(() => upstreamUnavailable(res, null, undefined));
});

test('upstreamUnavailable tolerates rejected body.cancel()', async () => {
  const res = makeRes();
  const rejectingResponse = {
    body: { cancel: () => Promise.reject(new Error('cancel failed')) },
  };
  await assert.doesNotReject(() => upstreamUnavailable(res, rejectingResponse));
  assert.equal(res.statusCode, 503);
  assertRetryAfterInBand(res.getHeader('Retry-After'));
});

// markUpstreamUnavailable

test('markUpstreamUnavailable sets 503 + Retry-After and returns the seconds it sent', async () => {
  const res = makeRes();
  const retryAfter = await markUpstreamUnavailable(res);
  assert.equal(res.statusCode, 503);
  assert.equal(assertRetryAfterInBand(res.getHeader('Retry-After')), retryAfter);
});

test('markUpstreamUnavailable cancels supplied fetch bodies', async () => {
  const res = makeRes();
  let cancelCalled = 0;
  const mockResponse = { body: { cancel: () => { cancelCalled++; return Promise.resolve(); } } };
  await markUpstreamUnavailable(res, mockResponse, null, mockResponse);
  assert.equal(cancelCalled, 2);
});

test('markUpstreamUnavailable logs one [load-shed] line with method, path and upstream status', async () => {
  warnings.length = 0;
  const retryAfter = await markUpstreamUnavailable(makeRes('/search?q=secret+terms'), { status: 500 });
  assert.deepEqual(warnings, [`[load-shed] 503 GET /search upstream=500 retry-after=${retryAfter}`]);
});

test('markUpstreamUnavailable logs upstream=network for a null response and "-" for none', async () => {
  warnings.length = 0;
  await markUpstreamUnavailable(makeRes(), null);
  await markUpstreamUnavailable(makeRes());
  assert.match(warnings[0], / upstream=network /);
  assert.match(warnings[1], / upstream=- /);
});

// isNetworkError

test('isNetworkError is true for abort and undici connection errors', () => {
  assert.equal(isNetworkError(Object.assign(new Error('aborted'), { name: 'AbortError' })), true);
  assert.equal(isNetworkError(new TypeError('fetch failed', { cause: { code: 'ECONNREFUSED' } })), true);
});

test('isNetworkError is false for other errors', () => {
  assert.equal(isNetworkError(new TypeError('x is not a function')), false);
  assert.equal(isNetworkError(new SyntaxError('Unexpected token <')), false);
});

// cancelBodies

test('cancelBodies ignores null, undefined, bodiless and rejecting responses', async () => {
  let cancelCalled = 0;
  const ok = { body: { cancel: () => { cancelCalled++; return Promise.resolve(); } } };
  const rejecting = { body: { cancel: () => Promise.reject(new Error('nope')) } };
  await assert.doesNotReject(() => cancelBodies(ok, null, undefined, {}, rejecting));
  assert.equal(cancelCalled, 1);
});

// safeJson

test('safeJson returns parsed JSON on success', async () => {
  const mockRes = {
    json: () => Promise.resolve({ key: 'value' }),
    headers: { get: () => 'application/json' },
    status: 200,
  };
  assert.deepEqual(await safeJson(mockRes), { key: 'value' });
});

test('safeJson returns null when body is not valid JSON', async () => {
  const mockRes = {
    json: () => Promise.reject(new SyntaxError("Unexpected token '<'")),
    headers: { get: () => 'text/html' },
    status: 200,
  };
  assert.equal(await safeJson(mockRes), null);
});

test('safeJson returns null for malformed JSON with unknown content-type', async () => {
  const mockRes = {
    json: () => Promise.reject(new SyntaxError('Unexpected token')),
    headers: { get: () => null },
    status: 503,
  };
  assert.equal(await safeJson(mockRes), null);
});

test('wpDraftUrl appends context=edit with ? or & as needed', () => {
  assert.strictEqual(wpDraftUrl('https://wp/x'), 'https://wp/x?context=edit');
  assert.strictEqual(wpDraftUrl('https://wp/x?a=1'), 'https://wp/x?a=1&context=edit');
});

test('wpAcfUrl appends acf_format=standard with ? or & as needed', () => {
  assert.strictEqual(wpAcfUrl('https://wp/x'), 'https://wp/x?acf_format=standard');
  assert.strictEqual(wpAcfUrl('https://wp/x?a=1'), 'https://wp/x?a=1&acf_format=standard');
  assert.strictEqual(
    wpAcfUrl(wpDraftUrl('https://wp/x')),
    'https://wp/x?context=edit&acf_format=standard',
  );
});
