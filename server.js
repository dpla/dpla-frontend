const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const mergeQueryAndParams = (query, params) => Object.assign({}, query, params);

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/browse-by-topic/:topic", (req, res) => {
      const actualPage = "/browse-by-topic/topic";
      const params = { topic: req.params.topicId };
      app.render(req, res, actualPage, params);
    });
    server.get("/browse-by-topic/:topic/:subtopic", (req, res) => {
      const actualPage = "/browse-by-topic/topic/subtopic";
      const params = {
        topic: req.params.topic,
        subtopic: req.params.subtopic
      };

      app.render(req, res, actualPage, params);
    });

    server.get("/primary-source-sets/:set", (req, res) => {
      const actualPage = "/primary-source-sets/set";
      const params = {
        set: req.params.set
      };
      app.render(req, res, actualPage, mergeQueryAndParams(params, req.query));
    });
    server.get("/primary-source-sets/:set/teaching-guide", (req, res) => {
      if (req.query.studentMode) {
        res.redirect(req.url.replace(/\/teaching-guide?/, ""));
      }
      const actualPage = "/primary-source-sets/set/teaching-guide";
      const params = {
        set: req.params.set
      };
      app.render(req, res, actualPage, mergeQueryAndParams(params, req.query));
    });
    server.get("/primary-source-sets/:set/sources/:source", (req, res) => {
      const actualPage = "/primary-source-sets/set/sources";
      const params = {
        set: req.params.set,
        source: req.params.source
      };
      app.render(req, res, actualPage, mergeQueryAndParams(params, req.query));
    });

    server.get("/exhibitions/:exhibition", (req, res) => {
      const actualPage = "/exhibitions/exhibition";
      const params = {
        exhibition: req.params.exhibition
      };
      app.render(req, res, actualPage, mergeQueryAndParams(params, req.query));
    });
    server.get("/exhibitions/:exhibition/:section/:subsection", (req, res) => {
      const actualPage = "/exhibitions/exhibition/section/subsection";
      const params = {
        exhibition: req.params.exhibition,
        section: req.params.source,
        subsection: req.params.source
      };
      app.render(req, res, actualPage, mergeQueryAndParams(params, req.query));
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
