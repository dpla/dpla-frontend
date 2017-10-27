const getCurrentUrl = req =>
  req ? `//${req.get("host")}` : `//${window.location.host}`;

export default getCurrentUrl;
