// for sidebar/menu use
// returns a menu item given a slug in the menu and a list of menu items
const getItemWithName = ({ items, name }) => {
  const found = items.filter(item => item.post_name === name);
  if (found) return found[0];
  return null;
};

export default getItemWithName;
