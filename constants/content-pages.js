import { WORDPRESS_URL } from "./env";
import { ANNOUNCEMENTS_TAG_ID, CONTENT_SHOWCASE_TAG_ID } from "./news.js";

export const ABOUT_MENU_ENDPOINT = `${WORDPRESS_URL}/wp-json/menus/v1/menus/about-us`;
export const PRO_MENU_ENDPOINT = `${WORDPRESS_URL}/wp-json/menus/v1/menus/pro-site`;
export const NEWS_ENDPOINT = `${WORDPRESS_URL}/wp-json/wp/v2/posts`;
export const TAGS_ENDPOINT = `${WORDPRESS_URL}/wp-json/wp/v2/tags?per_page=100`;
export const PAGES_ENDPOINT = `${WORDPRESS_URL}/wp-json/wp/v2/pages`;
export const NEWS_USER_ENDPOINT = `${NEWS_ENDPOINT}?per_page=3&tags=${ANNOUNCEMENTS_TAG_ID},${CONTENT_SHOWCASE_TAG_ID}`;
export const NEWS_PRO_ENDPOINT = `${NEWS_ENDPOINT}?per_page=3`;
export const GUIDES_PARENT_ID = 5325; // the post id of “How Can I Use DPLA?” (which is different from the page id above)
export const SEO_TYPE = "article";
