const proxy = require("express-http-proxy");
const serverFunctions = require("./lib/serverFunctions");
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

  // allow relative /news links in pro site
  server.get(["/news/*", "/news"], (req, res) => {
    var contentStart = req.url.indexOf("/news");
    var newPath = process.env.USER_BASE_URL + req.url.substr(contentStart);
    res.redirect(newPath);
  });

  // allow relative /search links in pro site
  server.get("/search", (req, res) => {
    var contentStart = req.url.indexOf("/search");
    var newPath = process.env.USER_BASE_URL + req.url.substr(contentStart);
    res.redirect(newPath);
  });

  // for ebooks
  server.get("/ebooks", (req, res) => {
    const actualPage = "/pro/wp/ebooks";
    serverFunctions.renderAndCache(app, req, res, actualPage, req.query);
  });

  // ebooks subsections have regular page
  server.get("/ebooks/:subsection", (req, res) => {
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

  // for hubs
  server.get("/hubs", (req, res) => {
    const actualPage = "/pro/wp/hubs";
    serverFunctions.renderAndCache(app, req, res, actualPage, req.query);
  });

  // hubs subsections have regular page
  server.get("/hubs/:subsection", (req, res) => {
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

  // for non-hub top-level sections
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
