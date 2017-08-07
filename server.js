const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/browse-by-topic/:topic", (req, res) => {
      const actualPage = "/browse-by-topic/topic";
      const queryParams = { topic: req.params.topicId };
      app.render(req, res, actualPage, queryParams);
    });
    server.get("/browse-by-topic/:topic/:subtopic", (req, res) => {
      const actualPage = "/browse-by-topic/topic/subtopic";
      const queryParams = {
        topic: req.params.topic,
        subtopic: req.params.subtopic
      };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("/primary-source-sets/:set", (req, res) => {
      const actualPage = "/primary-source-sets/set";
      const queryParams = { set: req.params.set };
      app.render(req, res, actualPage, queryParams);
    });
    server.get("/primary-source-sets/:set/teaching-guide", (req, res) => {
      const actualPage = "/primary-source-sets/set/teaching-guide";
      const queryParams = {
        set: req.params.set
      };
      app.render(req, res, actualPage, queryParams);
    });
    server.get("/primary-source-sets/:set/sources/:source", (req, res) => {
      const actualPage = "/primary-source-sets/set/sources";
      const queryParams = {
        set: req.params.set,
        source: req.params.source
      };
      app.render(req, res, actualPage, queryParams);
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
