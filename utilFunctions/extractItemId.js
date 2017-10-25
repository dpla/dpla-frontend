const extractItemId = url => {
  return /\/(?:api\/)?items?\/(\w+)/.exec(url)[1];
};

export default extractItemId;
