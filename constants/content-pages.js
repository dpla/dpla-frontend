import { WORDPRESS_URL } from "./env";

export const ABOUT_MENU_ENDPOINT = `${WORDPRESS_URL}/wp-json/menus/v1/menus/about-us`;
export const PRO_MENU_ENDPOINT = `${WORDPRESS_URL}/wp-json/menus/v1/menus/pro-site`;
export const NEWS_ENDPOINT = `${WORDPRESS_URL}/wp-json/wp/v2/posts`;
export const PAGES_ENDPOINT = `${WORDPRESS_URL}/wp-json/wp/v2/pages`;
export const GUIDES_ENDPOINT = `${PAGES_ENDPOINT}/2394`;
export const NEWS_HOME_ENDPOINT = `${NEWS_ENDPOINT}?per_page=3`;
export const NEWS_HUB_ENDPOINT = `${NEWS_ENDPOINT}?per_page=3`;
export const GUIDES_PARENT_ID = 5325; // the post id of “How Can I Use DPLA?” (which is different from the page id above)
export const SEO_TYPE = "article";
