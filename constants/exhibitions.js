export const TITLE = "Exhibitions";
export const DESCRIPTION = `Stories of national significance drawn from
source materials in libraries, archives, and museums across the United States.`;
const BASE_ENDPOINT = process.env.NODE_ENV === "production"
  ? "http://dp.la/api"
  : "http://localhost:3000/api";
export const EXHIBITS_ENDPOINT = `${BASE_ENDPOINT}/exhibitions`;
export const EXHIBIT_PAGES_ENDPOINT = `${BASE_ENDPOINT}/exhibition_pages`;
export const FILES_ENDPOINT = `${BASE_ENDPOINT}/files`;
export const ITEM_TYPES = {
  STILL_IMAGE: "Still Image",
  MOVING_IMAGE: "Moving Image",
  SOUND: "Sound"
};
