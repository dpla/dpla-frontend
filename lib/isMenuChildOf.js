// menu_item_parent holds the parent's menu item ID
const isMenuChildOf = (item, parent) => {
  const parentId = item?.menu_item_parent;
  const id = parent?.ID;
  if (parentId == null || id == null) return false;
  return String(parentId) === String(id);
};

export default isMenuChildOf;
