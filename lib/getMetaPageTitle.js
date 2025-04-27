import { LOCALS } from "constants/local";

// Text for the <title> tag in <head>.

const getMetaPageTitle = (title) => {
  const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
  const localId = process.env.NEXT_PUBLIC_LOCAL_ID;
  return title === undefined
    ? siteEnv !== "local"
      ? "Digital Public Library of America"
      : LOCALS[localId].name
    : `${title} | ${siteEnv !== "local" ? "DPLA" : LOCALS[localId].name}`;
};

export default getMetaPageTitle;
