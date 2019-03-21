import { LOCALS } from "constants/local";
import { SITE_ENV, LOCAL_ID } from "constants/env";

// Text for the <title> tag in <head>.

const getMetaPageTitle = title => {
  const pageTitle = title === undefined
    ? SITE_ENV !== "local"
      ? "Digital Public Library of America"
      : LOCALS[LOCAL_ID].name
    : `${title} | ${SITE_ENV !== "local" ? "DPLA" : LOCALS[LOCAL_ID].name}`;

  return pageTitle;
};

export default getMetaPageTitle;
