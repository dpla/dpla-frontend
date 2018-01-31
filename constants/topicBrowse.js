import { WORDPRESS_URL } from "./env";

export const TITLE = "Browse by Topic";
export const DESCRIPTION = `Highlights of collections from libraries, archives and museums across the United States, organized into easy-to-navigate topics.`;

export const API_ENDPOINT_ALL_TOPICS = `${WORDPRESS_URL}/wp-json/dpla/v2/categories`;
export const API_ENDPOINT_ALL_TOPICS_100_PER_PAGE = `${API_ENDPOINT_ALL_TOPICS}?per_page=100`;
export const API_ENDPOINT_ALL_ITEMS = `${WORDPRESS_URL}/wp-json/wp/v2/topic_browse_item`;
export const API_ENDPOINT_ALL_ITEMS_100_PER_PAGE = `${API_ENDPOINT_ALL_ITEMS}?per_page=100`;
