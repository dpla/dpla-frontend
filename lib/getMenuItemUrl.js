import { PAGES_ENDPOINT } from "constants/content-pages";

const getMenuItemUrl = pageItem =>
  pageItem?.url?.includes("wp-json/wp/v2/pages")
    ? pageItem.url
    : `${PAGES_ENDPOINT}/${pageItem?.object_id}`;

export default getMenuItemUrl;
