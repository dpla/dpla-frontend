export const INSTAGRAM_URL = "https://www.instagram.com/digpublib/";
export const INSTAGRAM_LINK_TITLE = "Visit DPLA on Instagram";
export const TWITTER_URL = "https://twitter.com/dpla";
export const TWITTER_LINK_TITLE = "Visit DPLA on Instagram";
export const PSS_BASE_URL = "https://dplabeta.org/pssapi";

export const PAYPAL_DONATE_SINGLE =
  "https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=info%40dp%2ela&item_name=One%20time%20donation%20to%20DPLA&amount={amount}&currency_code=USD&no_note=1&return={returnUrl}";
export const PAYPAL_DONATE_MONTHLY =
  "https://www.paypal.com/cgi-bin/webscr?cmd=_xclick-subscriptions&business=info%40dp%2ela&item_name=Monthly%20donation%20to%20DPLA&a3={amount}&currency_code=USD&no_note=1&t3=M&p3=1&src=1&no_shipping=1&return={returnUrl}";

export const GOOGLE_CLASSROOMS_SHARE_URL =
  "https://classroom.google.com/u/0/share";
export const DPLA_CONTACT_EMAIL = "education@dp.la";
export const PSS_SUGGESTION_URL =
  "https://docs.google.com/a/dp.la/forms/d/e/1FAIpQLSfOGifC4Z591F_8hMrI8YiHX1BhXEGNPZqIq7LRFEYwiNYF9w/viewform";

export const resourceTypes = {
  TEXT: "text",
  IMAGE: "image",
  SOUND: "sound",
  VIDEO: "moving image"
};

export const rightsURLs = {
  "http://rightsstatements.org/vocab/noc-us/1.0/": {
    url: "http://rightsstatements.org/vocab/NoC-US/1.0/",
    description:
      "The organization that has made the Item available believes that the Item is in the Public Domain under the laws of the United States, but a determination was not made as to its copyright status under the copyright laws of other countries. The Item may not be in the Public Domain under the laws of other countries. Please refer to the organization that has made the Item available for more information.",
    image: "/static/images/rightsstatements/NoC-US.dark-white-interior.svg"
  },
  "http://rightsstatements.org/vocab/noc-cr/1.0/": {
    url: "http://rightsstatements.org/vocab/NoC-CR/1.0/",
    description:
      "Use of this Item is not restricted by copyright and/or related rights. As part of the acquisition or digitization of this Item, the organization that has made the Item available is contractually required to limit the use of this Item. Limitations may include, but are not limited to, privacy issues, cultural protections, digitization agreements or donor agreements. Please refer to the organization that has made the Item available for more information.",
    image: "/static/images/rightsstatements/NoC-CR.dark-white-interior.svg"
  },
  "http://rightsstatements.org/vocab/noc-nc/1.0/": {
    url: "http://rightsstatements.org/vocab/NoC-NC/1.0/",
    description:
      "This object has been digitized in a public-private partnership. As part of this partnership, the partners have agreed to limit commercial uses of this digital representation of the object by third parties. You can, without permission, copy, modify, distribute, display, or perform the digital object, for non-commercial uses. For any other permissible uses, please review the terms and conditions of the organization that has made the item available.",
    image: "/static/images/rightsstatements/NoC-NC.dark-white-interior.svg"
  },
  "http://rightsstatements.org/vocab/noc-oklr/1.0/": {
    url: "http://rightsstatements.org/vocab/NoC-OKLR/1.0/",
    description:
      "Use of this Item is not restricted by copyright and/or related rights. In one or more jurisdictions, laws other than copyright are known to impose restrictions on the use of this Item. Please refer to the organization that has made the Item available for more information.",
    image: "/static/images/rightsstatements/NoC-OKLR.dark-white-interior.svg"
  },

  "http://rightsstatements.org/vocab/nkc/1.0/": {
    url: "http://rightsstatements.org/vocab/NKC/1.0/",
    description:
      "The organization that has made the Item available reasonably believes that the Item is not restricted by copyright or related rights, but a conclusive determination could not be made. Please refer to the organization that has made the Item available for more information. You are free to use this Item in any way that is permitted by the copyright and related rights legislation that applies to your use.",
    image: "/static/images/rightsstatements/NKC.dark-white-interior.svg"
  },
  "http://rightsstatements.org/vocab/inc/1.0/": {
    url: "http://rightsstatements.org/vocab/InC/1.0/",
    description:
      "This Item is protected by copyright and/or related rights. You are free to use this Item in any way that is permitted by the copyright and related rights legislation that applies to your use. For other uses you need to obtain permission from the rights-holder(s).a",
    image: "/static/images/rightsstatements/InC.dark-white-interior.svg"
  },
  "http://rightsstatements.org/vocab/inc-ow-eu/1.0/": {
    url: "http://rightsstatements.org/vocab/InC-OW-EU/1.0/",
    description:
      "This Item has been identified as an orphan work in the country of first publication and in line with Directive 2012/28/EU of the European Parliament and of the Council of 25 October 2012 on certain permitted uses of orphan works. For this Item, either (a) no rights-holder(s) have been identified or (b) one or more rights-holder(s) have been identified but none have been located even though a diligent search for the rights-holder(s) has been conducted. The results of the diligent search are available in the EU Orphan Works Database. You are free to use this Item in any way that is permitted by the copyright and related rights legislation that applies to your use.",
    image: "/static/images/rightsstatements/InC-OW-EU.dark-white-interior.svg"
  },
  "http://rightsstatements.org/vocab/inc-edu/1.0/": {
    url: "http://rightsstatements.org/vocab/InC-EDU/1.0/",
    description:
      "This Item is protected by copyright and/or related rights. You are free to use this Item in any way that is permitted by the copyright and related rights legislation that applies to your use. In addition, no permission is required from the rights-holder(s) for educational uses. For other uses, you need to obtain permission from the rights-holder(s).",
    image: "/static/images/rightsstatements/InC-EDU.dark-white-interior.svg"
  },
  "http://rightsstatements.org/vocab/inc-nc/1.0/": {
    url: "http://rightsstatements.org/vocab/InC-NC/1.0/",
    description:
      "This Item is protected by copyright and/or related rights. You are free to use this Item in any way that is permitted by the copyright and related rights legislation that applies to your use. In addition, no permission is required from the rights-holder(s) for non-commercial uses. For other uses you need to obtain permission from the rights-holder(s).",
    image: "/static/images/rightsstatements/InC-NC.dark-white-interior.svg"
  },
  "http://rightsstatements.org/vocab/inc-ruu/1.0/": {
    url: "http://rightsstatements.org/vocab/InC-RUU/1.0/",
    description:
      "This Item is protected by copyright and/or related rights. However, for this Item, either (a) no rights-holder(s) have been identified or (b) one or more rights-holder(s) have been identified but none have been located. You are free to use this Item in any way that is permitted by the copyright and related rights legislation that applies to your use.",
    image: "/static/images/rightsstatements/InC-RUU.dark-white-interior.svg"
  },
  "http://rightsstatements.org/vocab/cne/1.0/": {
    url: "http://rightsstatements.org/vocab/CNE/1.0/",
    description:
      "This Rights Statement should be used for Items for which the copyright status is unknown and for which the data provider has not undertaken an effort to determine the copyright status of the work.",
    image: "/static/images/rightsstatements/CNE.dark-white-interior.svg"
  },
  "http://rightsstatements.org/vocab/und/1.0/": {
    url: "http://rightsstatements.org/vocab/UND/1.0/",
    description:
      "This Rights Statement should be used for Items for which the copyright status is unknown and for which the organization that has made the Item available has undertaken an effort to determine the copyright status of the Work. Typically, this Rights Statement is used when the organization is missing key facts essential to making an accurate copyright status determination.",
    image: "/static/images/rightsstatements/UND.dark-white-interior.svg"
  },
  "https://creativecommons.org/licenses/by/4.0/": {
    url: "https://creativecommons.org/licenses/by/4.0/",
    description:
      "The CC BY license lets users distribute, remix, tweak, and build upon an author's work, even commercially, as long as they credit the author for the original creation.",
    image: "/static/images/rightsstatements/cc-by.svg"
  },
  "https://creativecommons.org/licenses/by-nc-nd/4.0/": {
    url: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
    description:
      "The CC BY-NC-ND license only allows users to download an author's works and share them with others as long as they credit the author, but they can’t change them in any way or use them commercially.",
    image: "/static/images/rightsstatements/cc-by-nc-nd.svg"
  },
  "https://creativecommons.org/licenses/by-sa/4.0/": {
    url: "https://creativecommons.org/licenses/by-sa/4.0/",
    description:
      "The CC BY-SA license lets users remix, tweak, and build upon an author's work even for commercial purposes, as long as they credit the author and license their new creations under the identical terms.",
    image: "/static/images/rightsstatements/cc-by-sa.svg"
  },
  "https://creativecommons.org/licenses/by-nd/4.0/": {
    url: "https://creativecommons.org/licenses/by-nd/4.0/",
    description:
      "The CC BY-ND license allows for redistribution, commercial and non-commercial, as long as it is passed along unchanged and in whole, with credit to the author.",
    image: "/static/images/rightsstatements/cc-by-nd.svg"
  },
  "https://creativecommons.org/licenses/by-nc/4.0/": {
    url: "https://creativecommons.org/licenses/by-nc/4.0/",
    description:
      "The CC BY-NC license lets users remix, tweak, and build upon an author's work non-commercially, and although their new works must also acknowledge the author and be non-commercial, they don’t have to license their derivative works on the same terms.",
    image: "/static/images/rightsstatements/cc-by-nc.svg"
  },
  "https://creativecommons.org/licenses/by-nc-sa/4.0/": {
    url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    description:
      "The CC NC-SA license lets users remix, tweak, and build upon an author's work non-commercially, as long as they credit the author and license their new creations under the identical terms.",
    image: "/static/images/rightsstatements/cc-by-nc-sa.svg"
  },
  "https://creativecommons.org/publicdomain/zero/1.0/": {
    url: "https://creativecommons.org/publicdomain/zero/1.0/",
    description:
      "CC0 indicates that a copyright holder has waived rights to works and thereby placed them as completely as possible in the public domain, so that others may freely build upon, enhance and reuse the works for any purposes without restriction.",
    image: "/static/images/rightsstatements/cc-zero.svg"
  },
  "https://creativecommons.org/licenses/by-nc-sa/3.0/us/": {
    url: "https://creativecommons.org/licenses/by-nc-sa/3.0/us/",
    description:
      "The CC NC-SA license lets users remix, tweak, and build upon an author's work non-commercially, as long as they credit the author and license their new creations under the identical terms.",
    image: "/static/images/rightsstatements/cc-by-nc-sa.svg"
  }
};
