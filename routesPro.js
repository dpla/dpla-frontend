const proxy = require("express-http-proxy");
const utilFunctions = require("./utilFunctions/serverFunctions");

module.exports = (app, server) => {
  server.get("/", (req, res) => {
    const actualPage = "/pro";
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query);
  });

  server.get(["/about", "/about-us"], (req, res) => {
    const actualPage = "/pro/wp";
    const params = {
      section: "about-us"
    }; // because WP has 'about-us'
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query, params);
  });

  server.get("/wp/:section", (req, res) => {
    const actualPage = "/pro/wp";
    const params = {
      section: req.params.section
    };
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query, params);
  });

  server.get("/wp/:section/:subsection", (req, res) => {
    const actualPage = "/pro/wp";
    const params = {
      section: req.params.section,
      subsection: req.params.subsection
    };
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query, params);
  });
};
