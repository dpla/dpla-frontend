const extractSourceId = (url) => {
  return /\/primary-source-sets\/sources\/(\d+)/.exec(url)[1];
};

export default extractSourceId;
