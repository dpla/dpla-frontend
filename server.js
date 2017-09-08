const express = require("express");
const next = require("next");
const LRUCache = require("lru-cache");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const mergeQueryAndParams = (query, params) => Object.assign({}, query, params);

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
});

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/browse-by-topic/:topic", (req, res) => {
      const actualPage = "/browse-by-topic/topic";
      const params = { topic: req.params.topicId };
      renderAndCache(req, res, actualPage, params);
    });
    server.get("/browse-by-topic/:topic/:subtopic", (req, res) => {
      const actualPage = "/browse-by-topic/topic/subtopic";
      const params = {
        topic: req.params.topic,
        subtopic: req.params.subtopic
      };

      renderAndCache(req, res, actualPage, params);
    });

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
        section: req.params.source,
        subsection: req.params.source
      };
      renderAndCache(
        req,
        res,
        actualPage,
        mergeQueryAndParams(params, req.query)
      );
    });

    server.get("/search", (req, res) => {
      // need this because the search API doesn't recognize "all" but we need
      // to pass some value in through the select on the homepage
      if (req.query["type"] && req.query["type"] === "all") {
        delete req.query["type"];
      }
      const actualPage = "/search";

      renderAndCache(req, res, actualPage, req.query);
    });

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
