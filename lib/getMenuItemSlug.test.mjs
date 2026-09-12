import test from 'node:test';
import assert from 'node:assert';
import getMenuItemSlug from './getMenuItemSlug.js';

test('getMenuItemSlug prefers slug over post_name', () => {
  assert.strictEqual(getMenuItemSlug({ slug: 'a-page', post_name: '27368' }), 'a-page');
});

test('getMenuItemSlug falls back to post_name for custom links', () => {
  assert.strictEqual(getMenuItemSlug({ post_name: 'about-us' }), 'about-us');
});

test('getMenuItemSlug tolerates a missing item', () => {
  assert.strictEqual(getMenuItemSlug(undefined), undefined);
});
