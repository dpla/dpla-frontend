const getCurrentFullUrl = req =>
  req ? `${req.protocol}://${req.get("host")}${req.url}` : "";

export default getCurrentFullUrl;
