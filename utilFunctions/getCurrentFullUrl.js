const getCurrentFullUrl = req =>
  req ? `${req.protocol}://${req.get("host")}${req.url}` : window.location.href;

export default getCurrentFullUrl;
