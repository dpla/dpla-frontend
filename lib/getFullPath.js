const getFullPath = () => {
  const path = window.location.pathname;
  const search = window.location.search;
  return path + search;
};

export default getFullPath;
