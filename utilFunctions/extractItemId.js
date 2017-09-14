const extractItemId = url => {
  return /https?:\/\/dp\.la\/(?:api\/)?items?\/(\w+)/.exec(url)[1];
};

export default extractItemId;
