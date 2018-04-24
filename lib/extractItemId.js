const extractItemId = url => {
  const item = /\/(?:api\/)?items?\/(\w+)/.exec(url);
  return item ? item[1] : url;
};

export default extractItemId;
