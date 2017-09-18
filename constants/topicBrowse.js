export const TITLE = "Browse By Topic";
export const DESCRIPTION = `Materials from libraries, archives and museums
across the United States, organized by DPLA's content curation staff into easy
to navigate sub-topics.`;

export const API_ENDPOINT_ALL_TOPICS =
  "http://dpla.wpengine.com/wp-json/wp/v2/categories";
export const API_ENDPOINT_ALL_TOPICS_100_PER_PAGE = `${API_ENDPOINT_ALL_TOPICS}?per_page=100`;
export const API_ENDPOINT_ALL_ITEMS =
  "https://dpla.wpengine.com/wp-json/wp/v2/topic_browse_item";
export const API_ENDPOINT_ALL_ITEMS_100_PER_PAGE = `${API_ENDPOINT_ALL_ITEMS}?per_page=100`;
