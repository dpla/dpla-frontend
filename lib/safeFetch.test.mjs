import test from 'node:test';
import assert from 'node:assert';
import { isUpstreamUnavailable, upstreamUnavailable } from './safeFetch.js';

// isUpstreamUnavailable

test('isUpstreamUnavailable returns true for null (network failure)', () => {
  assert.equal(isUpstreamUnavailable(null), true);
});

for (const status of [500, 502, 503, 504]) {
  test(`isUpstreamUnavailable returns true for ${status} response`, () => {
    assert.equal(isUpstreamUnavailable({ status }), true);
  });
}

test('isUpstreamUnavailable returns false for a successful response', () => {
  assert.equal(isUpstreamUnavailable({ status: 200, ok: true }), false);
});

test('isUpstreamUnavailable returns false for a 404 response', () => {
  assert.equal(isUpstreamUnavailable({ status: 404, ok: false }), false);
});

// upstreamUnavailable

function makeRes() {
  const headers = {};
  return {
    statusCode: 200,
    setHeader(name, value) { headers[name] = value; },
    getHeader(name) { return headers[name]; },
  };
}

test('upstreamUnavailable sets statusCode 503 and Retry-After: 10', async () => {
  const res = makeRes();
  await upstreamUnavailable(res);
  assert.equal(res.statusCode, 503);
  assert.equal(res.getHeader('Retry-After'), '10');
});

test('upstreamUnavailable returns { props: { temporarilyUnavailable: true } }', async () => {
  const res = makeRes();
  const result = await upstreamUnavailable(res);
  assert.deepEqual(result, { props: { temporarilyUnavailable: true } });
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
  assert.equal(res.getHeader('Retry-After'), '10');
});
