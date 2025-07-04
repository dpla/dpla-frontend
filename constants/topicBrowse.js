const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export const TITLE = "Browse by Topic";
export const DESCRIPTION = `Highlights of collections from libraries, archives and museums across the United States, organized into easy-to-navigate topics.`;

export const API_ENDPOINT_ALL_TOPICS = `${wordpressUrl}/wp-json/dpla/v2/categories`;
// TODO: this 100_per_page thing might not work in the future since it is a custom endpoint now
export const API_ENDPOINT_ALL_TOPICS_100_PER_PAGE = `${API_ENDPOINT_ALL_TOPICS}?per_page=100`;
export const API_ENDPOINT_SUBTOPICS_FOR_TOPIC = `${wordpressUrl}/wp-json/dpla/v2/subcategories`;
export const API_ENDPOINT_ALL_ITEMS = `${wordpressUrl}/wp-json/wp/v2/topic_browse_item`;
export const API_ENDPOINT_ALL_ITEMS_100_PER_PAGE = `${API_ENDPOINT_ALL_ITEMS}?per_page=100`;
