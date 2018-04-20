import getItemWithId from "./getItemWithId";
import endsWith from "./endsWith";

// returns the breadcrumb structure for a given current item id (object_id, in the menu) and a list of items

const getBreadcrumbs = ({ items, leafId, breadcrumbs }) => {
  breadcrumbs = breadcrumbs ? breadcrumbs : {};
  // go upwards from the activeItemId
  items.forEach(element => {
    if (
      element.object_id === leafId ||
      endsWith(element.guid, "?p=" + leafId)
    ) {
      if (element.menu_item_parent !== "0") {
        const post = getItemWithId({
          items: items,
          id: element.menu_item_parent
        });
        breadcrumbs[element.menu_item_parent] = post;
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
