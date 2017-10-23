const express = require("express");
const next = require("next");
const LRUCache = require("lru-cache");
const proxy = require("express-http-proxy");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const replaceWithProxyEndpoint = (endpoint, req) => {
  if (endpoint) {
    const protocol = req.host.includes("localhost") ? "http" : "https";
    return endpoint.replace(
      process.env.OMEKA_URL,
      `${protocol}://${req.get("host")}/api`
    );
  } else {
    return null;
  }
};
const mergeQueryAndParams = (query, params) => Object.assign({}, query, params);

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
});

if (process.env.NODE_ENV !== "production") {
  // require environment variables from .env file
  require("dotenv").config();
}

app
  .prepare()
  .then(() => {
    const server = express();

    // browse by topic routes

    server.get("/browse-by-topic/:topic/:subtopic", (req, res) => {
      const actualPage = "/browse-by-topic/topic/subtopic";
      const params = {
        topic: req.params.topic,
        subtopic: req.params.subtopic
      };

      renderAndCache(req, res, actualPage, params);
    });

    server.get("/browse-by-topic/:topic", (req, res) => {
      const actualPage = "/browse-by-topic/topic";
      const params = { topic: req.params.topic };
      renderAndCache(req, res, actualPage, params);
    });

    server.get("/browse-by-topic", (req, res) => {
      const actualPage = "/browse-by-topic";
      renderAndCache(req, res, actualPage, req.query);
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
      renderAndCache(
        req,
        res,
        actualPage,
        mergeQueryAndParams(params, req.query)
      );
    });

    server.get("/primary-source-sets/:set/teaching-guide", (req, res) => {
      if (req.query.studentMode) {
        res.redirect(req.url.replace(/\/teaching-guide?/, ""));
      }
      const actualPage = "/primary-source-sets/set/teaching-guide";
      const params = {
        set: req.params.set
      };
      renderAndCache(
        req,
        res,
        actualPage,
        mergeQueryAndParams(params, req.query)
      );
    });

    server.get("/primary-source-sets/:set/additional-resources", (req, res) => {
      const actualPage = "/primary-source-sets/set/additional-resources";
      const params = {
        set: req.params.set
      };
      renderAndCache(
        req,
        res,
        actualPage,
        mergeQueryAndParams(params, req.query)
      );
    });

    server.get("/primary-source-sets/:set/sources/:source", (req, res) => {
      const actualPage = "/primary-source-sets/set/sources";
      const params = {
        set: req.params.set,
        source: req.params.source
      };
      renderAndCache(
        req,
        res,
        actualPage,
        mergeQueryAndParams(params, req.query)
      );
    });

    // exhibitions routes

    server.get(["/exhibitions/", "/exhibitions"], (req, res) => {
      const actualPage = "/exhibitions";
      renderAndCache(req, res, actualPage, req.query);
    });

    server.get("/exhibitions/:exhibition", (req, res) => {
      const actualPage = "/exhibitions/exhibition";
      const params = {
        exhibition: req.params.exhibition
      };
      renderAndCache(
        req,
        res,
        actualPage,
        mergeQueryAndParams(params, req.query)
      );
    });

    server.get("/exhibitions/:exhibition/:section/:subsection", (req, res) => {
      const actualPage = "/exhibitions/exhibition/section/subsection";
      const params = {
        exhibition: req.params.exhibition,
        section: req.params.section,
        subsection: req.params.subsection
      };
      renderAndCache(
        req,
        res,
        actualPage,
        mergeQueryAndParams(params, req.query)
      );
    });

    // empty subsection signals that the Introduction subsection should be used
    server.get("/exhibitions/:exhibition/:section/", (req, res) => {
      const actualPage = "/exhibitions/exhibition/section/subsection";
      const params = {
        exhibition: req.params.exhibition,
        section: req.params.section,
        subsection: ""
      };
      renderAndCache(
        req,
        res,
        actualPage,
        mergeQueryAndParams(params, req.query)
      );
    });

    // donate routes

    server.get(["/donate", "/donate/"], (req, res) => {
      app.render(req, res, "/donate", req.query);
    });

    // contact us routes

    server.get(["/contact-us", "/contact-us/"], (req, res) => {
      app.render(req, res, "/contact-us", req.query);
    });

    // search routes

    server.get(["/search", "/search/"], (req, res) => {
      // need this because the search API doesn't recognize "all" but we need
      // to pass some value in through the select on the homepage
      if (req.query["type"] && req.query["type"] === "all") {
        delete req.query["type"];
      }
      const actualPage = "/search";

      renderAndCache(req, res, actualPage, req.query);
    });

    // item routes

    server.get("/item/:itemId", (req, res) => {
      const actualPage = "/item/";
      const params = {
        itemId: req.params.itemId
      };
      renderAndCache(
        req,
        res,
        actualPage,
        mergeQueryAndParams(params, req.query)
      );
    });

    // guides routes

    server.get("/guides/:guide", (req, res) => {
      const actualPage = "/guides/guide";
      const params = {
        guide: req.params.guide
      };
      renderAndCache(
        req,
        res,
        actualPage,
        mergeQueryAndParams(params, req.query)
      );
    });

    server.get("/guides", (req, res) => {
      const actualPage = "/guides";
      renderAndCache(req, res, actualPage, req.query);
    });

    server.get("/about/:section", (req, res) => {
      const actualPage = "/about";
      const params = {
        section: req.params.section
      };
      renderAndCache(
        req,
        res,
        actualPage,
        mergeQueryAndParams(params, req.query)
      );
    });

    // API proxy routes

    server.get(
      "/api/exhibitions/",
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
      "/api/files/",
      proxy(process.env.OMEKA_URL, {
        userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
          const data = JSON.parse(proxyResData.toString("utf8"));
          const file_urls = data[0].file_urls;
          Object.keys(file_urls).forEach(key => {
            file_urls[key] = replaceWithProxyEndpoint(file_urls[key], userReq);
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
      "/api/assets/*",
      proxy(process.env.THUMB_SERVER, {
        proxyReqPathResolver: function(req) {
          return req.url.replace("/api/assets", "/thumb");
        }
      })
    );

    // dynamic About Menu routes

    // this is necessary to get the next parts to work
    server.get("/robots.txt", (req, res) => {
      return handle(req, res);
    });

    server.get("/:section/:subsection", (req, res) => {
      const actualPage = "/about";
      const params = {
        section: req.params.section,
        subsection: req.params.subsection
      };
      renderAndCache(
        req,
        res,
        actualPage,
        mergeQueryAndParams(params, req.query)
      );
    });

    server.get(["/:section/", "/:section"], (req, res) => {
      const actualPage = "/about";
      const params = {
        section: req.params.section
      };

      renderAndCache(
        req,
        res,
        actualPage,
        mergeQueryAndParams(params, req.query)
      );
    });

    // handle all other requests

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

function renderAndCache(req, res, pagePath, queryParams) {
  if (dev) {
    app.render(req, res, pagePath, queryParams);
    return;
  }
  // If we have a page in the cache, let's serve it
  if (ssrCache.has(req.url)) {
    console.log(`CACHE HIT: ${req.url}`);
    res.send(ssrCache.get(req.url));
    return;
  }
  // If not let's render the page into HTML
  app
    .renderToHTML(req, res, pagePath, queryParams)
    .then(html => {
      // Let's cache this page
      console.log(`CACHE MISS: ${req.url}`);
      ssrCache.set(req.url, html);
      res.send(html);
    })
    .catch(err => {
      console.error(err.stack);
      res.status(500).send("Internal Error");
    });
}
