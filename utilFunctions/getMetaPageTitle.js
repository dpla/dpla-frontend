// Text for the <title> tag in <head>.

const getMetaPageTitle = title => {
  const pageTitle = title === undefined
    ? "Digital Public Library of America"
    : `${title} | DPLA`;

  return pageTitle;
};

export default getMetaPageTitle;
