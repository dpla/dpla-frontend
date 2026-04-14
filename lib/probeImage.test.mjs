import test from 'node:test';
import assert from 'node:assert';
import probeImage from './probeImage.js';

// Blank GIF data URL used by the disposer to cancel in-flight loads
const BLANK_IMAGE =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function installMockDocument(naturalWidth) {
  let img;
  globalThis.document = {
    createElement(tag) {
      assert.equal(tag, 'img');
      img = { onload: null, onerror: null, naturalWidth, src: null };
      return img;
    },
  };
  return () => img;
}

// onload path

test('onload: naturalWidth === 0 calls onError', () => {
  const getImg = installMockDocument(0);
  let errorCalled = false;
  probeImage('https://example.com/image.jpg', () => { errorCalled = true; });
  getImg().onload();
  assert.equal(errorCalled, true);
});

test('onload: naturalWidth > 0 does not call onError', () => {
  const getImg = installMockDocument(50);
  let errorCalled = false;
  probeImage('https://example.com/image.jpg', () => { errorCalled = true; });
  getImg().onload();
  assert.equal(errorCalled, false);
});

// onerror path

test('onerror calls onError', () => {
  const getImg = installMockDocument(100);
  let errorCalled = false;
  probeImage('https://example.com/image.jpg', () => { errorCalled = true; });
  getImg().onerror();
  assert.equal(errorCalled, true);
});

// disposer

test('disposer: sets src to BLANK_IMAGE and clears handlers', () => {
  const getImg = installMockDocument(0);
  const dispose = probeImage('https://example.com/image.jpg', () => {});
  dispose();
  const img = getImg();
  assert.equal(img.src, BLANK_IMAGE);
  assert.equal(img.onload, null);
  assert.equal(img.onerror, null);
});

test('disposer: suppresses onError even if onload fires after disposal', () => {
  const getImg = installMockDocument(0);
  let errorCalled = false;
  const dispose = probeImage('https://example.com/image.jpg', () => { errorCalled = true; });
  const savedOnload = getImg().onload; // capture before disposal clears it
  dispose();
  savedOnload(); // simulate late-firing onload
  assert.equal(errorCalled, false);
});

test('disposer: suppresses onError even if onerror fires after disposal', () => {
  const getImg = installMockDocument(100);
  let errorCalled = false;
  const dispose = probeImage('https://example.com/image.jpg', () => { errorCalled = true; });
  const savedOnerror = getImg().onerror; // capture before disposal clears it
  dispose();
  savedOnerror(); // simulate late-firing onerror
  assert.equal(errorCalled, false);
});
