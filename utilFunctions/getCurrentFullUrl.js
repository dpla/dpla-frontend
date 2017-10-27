const getCurrentFullUrl = req =>
  req ? `//${req.get("host")}${req.url}` : window.location.href;

export default getCurrentFullUrl;
