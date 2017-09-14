export const TITLE = "Exhibitions";
export const DESCRIPTION = `Stories of national significance drawn from
source materials in libraries, archives, and museums across the US.`;
const BASE_ENDPOINT = "http://omeka.internal.dp.la/api";
export const EXHIBITS_ENDPOINT = `${BASE_ENDPOINT}/exhibits`;
export const EXHIBIT_PAGES_ENDPOINT = `${BASE_ENDPOINT}/exhibit_pages`;
export const FILES_ENDPOINT = `${BASE_ENDPOINT}/files`;
export const ITEM_TYPES = {
  STILL_IMAGE: "Still Image",
  MOVING_IMAGE: "Moving Image",
  SOUND: "Sound"
};
