// menu_item_parent holds the parent's menu item ID
const isMenuChildOf = (item, parent) =>
  String(item?.menu_item_parent) === String(parent?.ID);

export default isMenuChildOf;
