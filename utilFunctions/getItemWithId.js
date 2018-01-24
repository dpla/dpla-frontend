// for sidebar/menu use
// returns a menu item given an id (object_id, the id in the menu) and a list of menu items
const getItemWithId = ({ items, id }) => {
  const found = items.filter(item => item.object_id === id);
  if (found) return found[0];
  return null;
};

export default getItemWithId;
