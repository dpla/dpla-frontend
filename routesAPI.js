const proxy = require("express-http-proxy");
const serverFunctions = require("./lib/serverFunctions");
const locals = require("./constants/local");

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

  server.get(
    "/api/dpla/local_about",
    proxy(process.env.API_URL, {
      proxyReqPathResolver: function(req) {
        console.log("aboutttt");
        if (process.env.SITE_ENV !== "local") {
          console.log("Got local about request, but site not a local.");
          return "";
        }
        const localId = process.env.LOCAL_ID;
        const local = locals["LOCALS"][localId];
        const provider = local["provider"];
        const location = local["locationFacet"];
        const subject = local["subjectFacet"];
        const apiKey = process.env.API_KEY;
        const apiUrl = process.env.API_URL;
        const query =
          `${req.query.q}%20AND%20` +
          `(sourceResource.spatial.name:${location}` +
          `%20OR%20sourceResource.subject.name:${subject})` +
          `%20AND%20NOT%20provider.name:${provider}`;
        console.log(query);
        return (
          `${apiUrl}/items?api_key=${apiKey}` +
          `&exact_field_match=true?q=${query}`
        );
      }
    })
  );

  server.get("/thumb/*", (req, res) => {
    const thumbp = require("./lib/thumbp.js");
    return new thumbp.Connection(req, res);
  });
};
