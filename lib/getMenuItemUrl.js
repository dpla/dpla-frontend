import { PAGES_ENDPOINT } from "constants/content-pages";

// returns the breadcrumb structure for a given current item id (object_id, in the menu) and a list of items

const getMenuItemUrl = pageItem =>
  pageItem.url.indexOf("wp-json/wp/v2/pages") !== -1
    ? pageItem.url
    : `${PAGES_ENDPOINT}/${pageItem.object_id}`;

export default getMenuItemUrl;
