import test from 'node:test';
import assert from 'node:assert';
import isMenuChildOf from './isMenuChildOf.js';

test('isMenuChildOf matches on the parent menu item ID, not object_id', () => {
  const parent = { ID: 27368, object_id: '27217' };
  assert.ok(isMenuChildOf({ menu_item_parent: '27368' }, parent));
  assert.ok(!isMenuChildOf({ menu_item_parent: '27217' }, parent));
});

test('isMenuChildOf is false for top-level or missing items', () => {
  assert.ok(!isMenuChildOf({ menu_item_parent: '0' }, { ID: 1 }));
  assert.ok(!isMenuChildOf(undefined, { ID: 1 }));
  assert.ok(!isMenuChildOf({ menu_item_parent: '1' }, undefined));
});

test('isMenuChildOf is false when both identifiers are missing', () => {
  assert.ok(!isMenuChildOf({}, {}));
  assert.ok(!isMenuChildOf({ menu_item_parent: null }, { ID: null }));
});
