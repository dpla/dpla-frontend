const extractSourceId = url => {
  return /https?:\/\/dp\.la\/api\/items\/(\w+)/.exec(url)[1];
};

export default extractSourceId;
