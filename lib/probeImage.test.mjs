import test from 'node:test';
import assert from 'node:assert';
import probeImage, { BLANK_IMAGE } from './probeImage.js';

function installMockDocument(t, naturalWidth) {
  const previousDocument = globalThis.document;
  let img;
  globalThis.document = {
    createElement(tag) {
      assert.equal(tag, 'img');
      img = { onload: null, onerror: null, naturalWidth, src: null };
      return img;
    },
  };
  t.after(() => { globalThis.document = previousDocument; });
  return () => img;
}

for (const [label, url] of [['undefined', undefined], ['empty string', ''], ['whitespace', '   ']]) {
  test(`invalid url: ${label} calls onError immediately and returns safe disposer`, () => {
    let errorCalled = false;
    const dispose = probeImage(url, () => { errorCalled = true; });
    assert.equal(errorCalled, true);
    assert.doesNotThrow(() => dispose());
  });
}

test('onload: naturalWidth === 0 calls onError', (t) => {
  const getImg = installMockDocument(t, 0);
  let errorCalled = false;
  probeImage('https://example.com/image.jpg', () => { errorCalled = true; });
  getImg().onload();
  assert.equal(errorCalled, true);
});

test('onload: naturalWidth > 0 does not call onError', (t) => {
  const getImg = installMockDocument(t, 50);
  let errorCalled = false;
  probeImage('https://example.com/image.jpg', () => { errorCalled = true; });
  getImg().onload();
  assert.equal(errorCalled, false);
});

test('onerror calls onError', (t) => {
  const getImg = installMockDocument(t, 100);
  let errorCalled = false;
  probeImage('https://example.com/image.jpg', () => { errorCalled = true; });
  getImg().onerror();
  assert.equal(errorCalled, true);
});

test('disposer: sets src to BLANK_IMAGE and clears handlers', (t) => {
  const getImg = installMockDocument(t, 0);
  const dispose = probeImage('https://example.com/image.jpg', () => {});
  dispose();
  const img = getImg();
  assert.equal(img.src, BLANK_IMAGE);
  assert.equal(img.onload, null);
  assert.equal(img.onerror, null);
});

test('disposer: suppresses onError even if onload fires after disposal', (t) => {
  const getImg = installMockDocument(t, 0);
  let errorCalled = false;
  const dispose = probeImage('https://example.com/image.jpg', () => { errorCalled = true; });
  const savedOnload = getImg().onload; // capture before disposal clears it
  dispose();
  savedOnload(); // simulate late-firing onload
  assert.equal(errorCalled, false);
});

test('disposer: suppresses onError even if onerror fires after disposal', (t) => {
  const getImg = installMockDocument(t, 100);
  let errorCalled = false;
  const dispose = probeImage('https://example.com/image.jpg', () => { errorCalled = true; });
  const savedOnerror = getImg().onerror; // capture before disposal clears it
  dispose();
  savedOnerror(); // simulate late-firing onerror
  assert.equal(errorCalled, false);
});
