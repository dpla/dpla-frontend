import { WORDPRESS_URL } from "./env.js";

export const API_SETTINGS_ENDPOINT = `${WORDPRESS_URL}/wp-json/acf/v3/options/dpla-api-settings`;

export const INSTAGRAM_URL = "https://www.instagram.com/digpublib/";
export const INSTAGRAM_LINK_TITLE = "Visit DPLA on Instagram";
export const TWITTER_URL = "https://twitter.com/dpla";
export const TWITTER_LINK_TITLE = "Visit DPLA on Instagram";

export const PAYPAL_DONATE_SINGLE =
  "https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=info%40dp%2ela&item_name=One%20time%20donation%20to%20DPLA&amount={amount}&currency_code=USD&no_note=1&return={returnUrl}";
export const PAYPAL_DONATE_MONTHLY =
  "https://www.paypal.com/cgi-bin/webscr?cmd=_xclick-subscriptions&business=info%40dp%2ela&item_name=Monthly%20donation%20to%20DPLA&a3={amount}&currency_code=USD&no_note=1&t3=M&p3=1&src=1&no_shipping=1&return={returnUrl}";

export const GOOGLE_CLASSROOMS_SHARE_URL =
  "https://classroom.google.com/u/0/share";
export const PSS_NHD_URL = "https://pro.dp.la/education/national-history-day";

export const MAILCHIMP_LIST_ID = "4c517f4bd0";
export const MAILCHIMP_GROUP_IDS = {
  NEWS: "65934fd87a",
  EBOOKS: "0a0565e000",
  EDUCATION: "c68a1c3448",
  GENEALOGY: "f1bce877cd"
};

export const UNTITLED_TEXT = "Untitled";

export const MESSAGE_DELAY = 5000;

export const MAX_LIST_ITEMS = 50;

export const resourceTypes = {
  TEXT: "text",
  IMAGE: "image",
  SOUND: "sound",
  VIDEO: "moving image"
};
