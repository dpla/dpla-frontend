const proxy = require("express-http-proxy");
const serverFunctions = require("./lib/serverFunctions");

module.exports = (app, server) => {
  server.get("/", (req, res) => {
    const actualPage = "/local";
    serverFunctions.renderAndCache(app, req, res, actualPage, req.query);
  });

  server.get(["/about"], (req, res) => {
    const actualPage = "/local/about";
    serverFunctions.renderAndCache(app, req, res, actualPage, req.query);
  });

  // lists routes

  server.get("/lists/:list", (req, res) => {
    const actualPage = "/lists/list";
    const params = {
      list: req.params.list
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

  server.get("/lists", (req, res) => {
    const actualPage = "/lists";
    serverFunctions.renderAndCache(app, req, res, actualPage, req.query);
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
};
