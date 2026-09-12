// The menus plugin nests children under `child_items`
const flattenMenuItems = (items = []) =>
  items.flatMap(({ child_items: children, ...item }) => [
    item,
    ...flattenMenuItems(children),
  ]);

export default flattenMenuItems;
