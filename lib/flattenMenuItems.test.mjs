import test from 'node:test';
import assert from 'node:assert';
import flattenMenuItems from './flattenMenuItems.js';

test('flattenMenuItems lifts nested child_items into one list, parents first', () => {
  const items = [
    { ID: 1, child_items: [{ ID: 2, child_items: [{ ID: 3 }] }, { ID: 4 }] },
    { ID: 5 },
  ];
  const flat = flattenMenuItems(items);
  assert.deepStrictEqual(flat.map((i) => i.ID), [1, 2, 3, 4, 5]);
  assert.ok(flat.every((i) => !('child_items' in i)));
});

test('flattenMenuItems passes a flat list through unchanged', () => {
  const items = [{ ID: 1 }, { ID: 2, menu_item_parent: '1' }];
  assert.deepStrictEqual(flattenMenuItems(items), items);
});

test('flattenMenuItems handles undefined', () => {
  assert.deepStrictEqual(flattenMenuItems(undefined), []);
});
