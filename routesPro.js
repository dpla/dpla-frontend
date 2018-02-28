const proxy = require("express-http-proxy");
const serverFunctions = require("./utilFunctions/serverFunctions");
const SECTIONS = require("./constants/pro").SECTIONS;

module.exports = (app, server) => {
  server.get("/", (req, res) => {
    const actualPage = "/pro";
    serverFunctions.renderAndCache(app, req, res, actualPage, req.query);
  });

  server.get(["/about", "/about-dpla-pro"], (req, res) => {
    const actualPage = "/pro/wp";
    const params = {
      section: "about-dpla-pro"
    }; // because WP has 'about-dpla-pro'
    serverFunctions.renderAndCache(
      app,
      req,
      res,
      actualPage,
      req.query,
      params
    );
  });

  // for top-level sections
  SECTIONS.forEach(section => {
    server.get("/" + section.slug, (req, res) => {
      const actualPage = "/pro/wp";
      const params = { section: section.slug };
      serverFunctions.renderAndCache(
        app,
        req,
        res,
        actualPage,
        req.query,
        params
      );
    });

    // when a top level section has subsections
    server.get("/" + section.slug + "/:subsection", (req, res) => {
      const actualPage = "/pro/wp";
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
  });
};
