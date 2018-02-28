import getItemWithId from "./getItemWithId";

// returns the breadcrumb structure for a given current item id (object_id, in the menu) and a list of items

const getBreadcrumbs = ({ items, leafId, breadcrumbs }) => {
  breadcrumbs = breadcrumbs ? breadcrumbs : {};
  // go upwards from the activeItemId
  items.forEach(element => {
    if (element.object_id === leafId) {
      if (element.menu_item_parent !== "0") {
        const post_name = getItemWithId({
          items: items,
          id: element.menu_item_parent
        }).post_name;
        breadcrumbs[element.menu_item_parent] = post_name;
        getBreadcrumbs({
          items: items,
          leafId: element.menu_item_parent,
          breadcrumbs: breadcrumbs
        });
      }
    }
  });
  return breadcrumbs;
};

export default getBreadcrumbs;
