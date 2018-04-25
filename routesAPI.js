const proxy = require("express-http-proxy");
const serverFunctions = require("./lib/serverFunctions");

module.exports = (app, server) => {
  // API proxy routes

  server.get(
    "/api/exhibitions",
    proxy(process.env.OMEKA_URL, {
      proxyReqPathResolver: function(req) {
        return req.url.replace("api/exhibitions", "api/exhibits");
      }
    })
  );
  server.get(
    "/api/exhibition_pages",
    proxy(process.env.OMEKA_URL, {
      proxyReqPathResolver: function(req) {
        return req.url.replace("api/exhibition_pages", "api/exhibit_pages");
      }
    })
  );

  server.get(
    "/api/files",
    proxy(process.env.OMEKA_URL, {
      userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
        const data = JSON.parse(proxyResData.toString("utf8"));
        const file_urls = data[0].file_urls;
        Object.keys(file_urls).forEach(key => {
          file_urls[key] = serverFunctions.replaceWithProxyEndpoint(
            file_urls[key],
            userReq
          );
        });
        return JSON.stringify(data);
      }
    })
  );

  server.get(
    [
      "/api/files/square_thumbnails/*",
      "/api/files/thumbnails/*",
      "/api/files/original/*",
      "/api/files/fullsize/*"
    ],
    proxy(process.env.OMEKA_URL, {
      proxyReqPathResolver: function(req) {
        return req.url.replace("/api/files", "/files");
      }
    })
  );

  server.get("/api/items/*", proxy(process.env.OMEKA_URL));

  server.get(
    [
      "/api/dpla/items",
      "/api/dpla/items*",
      "/api/dpla/items",
      "/api/dpla/items/*"
    ],
    proxy(process.env.API_URL, {
      proxyReqPathResolver: function(req) {
        var separator = req.url.indexOf("?") === -1 ? "?" : "&";
        var newPath = req.url.replace(
          /^\/api\/dpla(.*)$/,
          "$1" + separator + "api_key=" + process.env.API_KEY
        );

        return newPath;
      }
    })
  );

  server.get("/thumb/*", (req, res) => {
    const thumbp = require("./lib/thumbp.js");
    return new thumbp.Connection(req, res);
  });
};
