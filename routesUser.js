const proxy = require("express-http-proxy");
const serverFunctions = require("./utilFunctions/serverFunctions");

module.exports = (app, server) => {
  server.get("/", (req, res) => {
    const actualPage = "/";
    serverFunctions.renderAndCache(app, req, res, actualPage, req.query);
  });

  // news routes

  server.get("/news", (req, res) => {
    app.render(req, res, "/news", req.query);
  });

  server.get("/news/:slug", (req, res) => {
    const actualPage = "/news/post";
    const params = { slug: req.params.slug };
    serverFunctions.renderAndCache(
      app,
      req,
      res,
      actualPage,
      req.query,
      params
    );
  });

  // browse by topic routes

  server.get("/browse-by-topic/:topic/:subtopic", (req, res) => {
    const actualPage = "/browse-by-topic/topic/subtopic";
    const params = {
      topic: req.params.topic,
      subtopic: req.params.subtopic
    };

    serverFunctions.renderAndCache(app, req, res, actualPage, params);
  });

  server.get("/browse-by-topic/:topic", (req, res) => {
    const actualPage = "/browse-by-topic/topic";
    const params = { topic: req.params.topic };
    serverFunctions.renderAndCache(app, req, res, actualPage, params);
  });

  server.get("/browse-by-topic", (req, res) => {
    const actualPage = "/browse-by-topic";
    serverFunctions.renderAndCache(app, req, res, actualPage, req.query);
  });

  // partner browse routes

  server.get("/browse-by-partner", (req, res) => {
    app.render(req, res, "/browse-by-partner", req.query);
  });

  // primary source sets routes

  server.get("/primary-source-sets", (req, res) => {
    app.render(req, res, "/primary-source-sets", req.query);
  });

  server.get("/primary-source-sets/:set", (req, res) => {
    const actualPage = "/primary-source-sets/set";
    const params = {
      set: req.params.set
    };
    serverFunctions.renderAndCache(
      app,
      req,
      res,
      actualPage,
      req.query,
      params
    );
  });

  server.get("/primary-source-sets/:set/teaching-guide", (req, res) => {
    const actualPage = "/primary-source-sets/set/teaching-guide";
    const params = {
      set: req.params.set
    };
    serverFunctions.renderAndCache(
      app,
      req,
      res,
      actualPage,
      req.query,
      params
    );
  });

  server.get("/primary-source-sets/:set/teaching-guide-print", (req, res) => {
    const actualPage = "/primary-source-sets/set/teaching-guide-print";
    const params = { set: req.params.set };
    serverFunctions.renderAndCache(
      app,
      req,
      res,
      actualPage,
      req.query,
      params
    );
  });

  server.get("/primary-source-sets/:set/additional-resources", (req, res) => {
    const actualPage = "/primary-source-sets/set/additional-resources";
    const params = {
      set: req.params.set
    };
    serverFunctions.renderAndCache(
      app,
      req,
      res,
      actualPage,
      req.query,
      params
    );
  });

  server.get("/primary-source-sets/:set/sources/:source", (req, res) => {
    const actualPage = "/primary-source-sets/set/sources";
    const params = {
      set: req.params.set,
      source: req.params.source
    };
    serverFunctions.renderAndCache(
      app,
      req,
      res,
      actualPage,
      req.query,
      params
    );
  });

  // exhibitions routes

  server.get(["/exhibitions", "/exhibitions"], (req, res) => {
    const actualPage = "/exhibitions";
    serverFunctions.renderAndCache(app, req, res, actualPage, req.query);
  });

  server.get("/exhibitions/:exhibition", (req, res) => {
    const actualPage = "/exhibitions/exhibition";
    const params = {
      exhibition: req.params.exhibition
    };
    serverFunctions.renderAndCache(
      app,
      req,
      res,
      actualPage,
      req.query,
      params
    );
  });

  server.get("/exhibitions/:exhibition/:section/:subsection", (req, res) => {
    const actualPage = "/exhibitions/exhibition/section/subsection";
    const params = {
      exhibition: req.params.exhibition,
      section: req.params.section,
      subsection: req.params.subsection
    };
    serverFunctions.renderAndCache(
      app,
      req,
      res,
      actualPage,
      req.query,
      params
    );
  });

  // empty subsection signals that the Introduction subsection should be used
  server.get("/exhibitions/:exhibition/:section", (req, res) => {
    const actualPage = "/exhibitions/exhibition/section/subsection";
    const params = {
      exhibition: req.params.exhibition,
      section: req.params.section,
      subsection: ""
    };
    serverFunctions.renderAndCache(
      app,
      req,
      res,
      actualPage,
      req.query,
      params
    );
  });

  // search routes

  server.get(["/search", "/search"], (req, res) => {
    // need this because the search API doesn't recognize "all" but we need
    // to pass some value in through the select on the homepage
    if (req.query["type"] && req.query["type"] === "all") {
      delete req.query["type"];
    }
    const actualPage = "/search";

    serverFunctions.renderAndCache(app, req, res, actualPage, req.query);
  });

  // item routes

  server.get("/item/:itemId", (req, res) => {
    const actualPage = "/item";
    const params = {
      itemId: req.params.itemId
    };
    serverFunctions.renderAndCache(
      app,
      req,
      res,
      actualPage,
      req.query,
      params
    );
  });

  // guides routes

  server.get("/guides/:guide", (req, res) => {
    const actualPage = "/guides/guide";
    const params = {
      guide: req.params.guide
    };
    serverFunctions.renderAndCache(
      app,
      req,
      res,
      actualPage,
      req.query,
      params
    );
  });

  server.get("/guides", (req, res) => {
    const actualPage = "/guides";
    serverFunctions.renderAndCache(app, req, res, actualPage, req.query);
  });

  server.get(["/about", "/about-us"], (req, res) => {
    const actualPage = "/about";
    const params = { section: "about-us" }; // because WP has 'about-us'
    serverFunctions.renderAndCache(
      app,
      req,
      res,
      actualPage,
      req.query,
      params
    );
  });

  server.get("/about/:section", (req, res) => {
    const actualPage = "/about";
    const params = {
      section: req.params.section
    };
    serverFunctions.renderAndCache(
      app,
      req,
      res,
      actualPage,
      req.query,
      params
    );
  });

  server.get("/about/:section/:subsection", (req, res) => {
    const actualPage = "/about";
    const params = {
      section: req.params.section,
      subsection: req.params.subsection
    };
    serverFunctions.renderAndCache(
      app,
      req,
      res,
      actualPage,
      req.query,
      params
    );
  });

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
    const thumbp = require("./utilFunctions/thumbp.js");
    return new thumbp.Connection(req, res);
  });
};
