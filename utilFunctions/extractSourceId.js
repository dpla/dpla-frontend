const extractSourceId = url => {
  console.log(url);
  return /https:\/\/dp\.la\/primary-source-sets\/sources\/(\d+)/.exec(url)[1];
};

export default extractSourceId;
