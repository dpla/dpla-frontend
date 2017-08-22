const extractSourceId = url => {
  return /https:\/\/dp\.la\/primary-source-sets\/sources\/(\d+)/.exec(url)[1];
};

export default extractSourceId;
