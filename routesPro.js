const proxy = require("express-http-proxy");
const utilFunctions = require("./utilFunctions/serverFunctions");

module.exports = (app, server) => {
  server.get("/", (req, res) => {
    const actualPage = "/pro";
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query);
  });

  server.get(["/about", "/about-dpla-pro"], (req, res) => {
    const actualPage = "/pro/wp";
    const params = {
      section: "about-dpla-pro"
    }; // because WP has 'about-dpla-pro'
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query, params);
  });

  // for top-level sections
  [
    "about-dpla-pro",
    "projects",
    "hubs",
    "education",
    "events",
    "developers",
    "news",
    "community-reps",
    "ebooks"
  ].forEach(section => {
    server.get("/" + section, (req, res) => {
      const actualPage = "/pro/wp";
      const params = { section: section };
      utilFunctions.renderAndCache(
        app,
        req,
        res,
        actualPage,
        req.query,
        params
      );
    });

    server.get("/" + section + "/:subsection", (req, res) => {
      const actualPage = "/pro/wp";
      const params = {
        section: req.params.section,
        subsection: req.params.subsection
      };
      utilFunctions.renderAndCache(
        app,
        req,
        res,
        actualPage,
        req.query,
        params
      );
    });
  });

  server.get("/wp", (req, res) => {
    console.log("wp-", req.params.section, "+", req.params.subsection);
    const actualPage = "/pro/wp";
    const params = { section: req.params.section };
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query, params);
  });

  server.get("/wp/:section", (req, res) => {
    console.log("wp:section-", req.params.section);
    const actualPage = "/pro/wp";
    const params = {
      section: req.params.section
    };
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query, params);
  });

  server.get("/wp/:section/:subsection", (req, res) => {
    console.log(
      "wp:section:subsection-",
      req.params.section,
      "+",
      req.params.subsection
    );
    const actualPage = "/pro/wp";
    const params = {
      section: req.params.section,
      subsection: req.params.subsection
    };
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query, params);
  });
};
