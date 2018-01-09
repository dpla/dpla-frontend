const proxy = require("express-http-proxy");
const utilFunctions = require("./utilFunctions/serverFunctions");

module.exports = (app, server) => {
  const handle = app.getRequestHandler();

  server.get("/donate", (req, res) => {
    const actualPage = "/donate";
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query);
  });

  server.get("/donate/thank-you", (req, res) => {
    const actualPage = "/donate/thank-you";
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query);
  });

  // browse by topic routes

  server.get("/browse-by-topic/:topic/:subtopic", (req, res) => {
    const actualPage = "/browse-by-topic/topic/subtopic";
    const params = {
      topic: req.params.topic,
      subtopic: req.params.subtopic
    };

    utilFunctions.renderAndCache(app, req, res, actualPage, params);
  });

  server.get("/browse-by-topic/:topic", (req, res) => {
    const actualPage = "/browse-by-topic/topic";
    const params = { topic: req.params.topic };
    utilFunctions.renderAndCache(app, req, res, actualPage, params);
  });

  server.get("/browse-by-topic", (req, res) => {
    const actualPage = "/browse-by-topic";
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query);
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
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query, params);
  });

  server.get("/primary-source-sets/:set/teaching-guide", (req, res) => {
    if (req.query.studentMode) {
      res.redirect(req.url.replace(/\/teaching-guide?/, ""));
    }
    const actualPage = "/primary-source-sets/set/teaching-guide";
    const params = {
      set: req.params.set
    };
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query, params);
  });

  server.get("/primary-source-sets/:set/additional-resources", (req, res) => {
    const actualPage = "/primary-source-sets/set/additional-resources";
    const params = {
      set: req.params.set
    };
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query, params);
  });

  server.get("/primary-source-sets/:set/sources/:source", (req, res) => {
    const actualPage = "/primary-source-sets/set/sources";
    const params = {
      set: req.params.set,
      source: req.params.source
    };
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query, params);
  });

  // exhibitions routes

  server.get(["/exhibitions", "/exhibitions"], (req, res) => {
    const actualPage = "/exhibitions";
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query);
  });

  server.get("/exhibitions/:exhibition", (req, res) => {
    const actualPage = "/exhibitions/exhibition";
    const params = {
      exhibition: req.params.exhibition
    };
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query, params);
  });

  server.get("/exhibitions/:exhibition/:section/:subsection", (req, res) => {
    const actualPage = "/exhibitions/exhibition/section/subsection";
    const params = {
      exhibition: req.params.exhibition,
      section: req.params.section,
      subsection: req.params.subsection
    };
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query, params);
  });

  // empty subsection signals that the Introduction subsection should be used
  server.get("/exhibitions/:exhibition/:section", (req, res) => {
    const actualPage = "/exhibitions/exhibition/section/subsection";
    const params = {
      exhibition: req.params.exhibition,
      section: req.params.section,
      subsection: ""
    };
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query, params);
  });

  // contact us routes

  server.get(["/contact", "/contact-us"], (req, res) => {
    app.render(req, res, "/contact-us", req.query);
  });

  // search routes

  server.get(["/search", "/search"], (req, res) => {
    // need this because the search API doesn't recognize "all" but we need
    // to pass some value in through the select on the homepage
    if (req.query["type"] && req.query["type"] === "all") {
      delete req.query["type"];
    }
    const actualPage = "/search";

    utilFunctions.renderAndCache(app, req, res, actualPage, req.query);
  });

  // item routes

  server.get("/item/:itemId", (req, res) => {
    const actualPage = "/item";
    const params = {
      itemId: req.params.itemId
    };
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query, params);
  });

  // guides routes

  server.get("/guides/:guide", (req, res) => {
    const actualPage = "/guides/guide";
    const params = {
      guide: req.params.guide
    };
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query, params);
  });

  server.get("/guides", (req, res) => {
    const actualPage = "/guides";
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query);
  });

  server.get(["/about", "/about-us"], (req, res) => {
    const actualPage = process.env.SITE_ENV === "user" ? "/about" : "/pro";
    const params = { section: "about-us" }; // because WP has 'about-us'
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query, params);
  });

  server.get("/about/:section", (req, res) => {
    const actualPage = "/about";
    const params = {
      section: req.params.section
    };
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query, params);
  });

  server.get("/about/:section/:subsection", (req, res) => {
    const actualPage = "/about";
    const params = {
      section: req.params.section,
      subsection: req.params.subsection
    };
    utilFunctions.renderAndCache(app, req, res, actualPage, req.query, params);
  });

  server.post("/g/contact", async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    if (req.body.i_prefer_usps_mail && req.body.i_prefer_usps_mail === "1")
      return res.sendStatus(400);

    const email = req.body.email || "";
    const name = req.body.name || "";
    const message = req.body.message || "";
    const subject = req.body.subject || "";
    const addressed = "no";
    const options = {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
      timeZone: "America/New_York"
    };
    const date = Intl.DateTimeFormat("en-US", options).format(new Date());

    let newRow = JSON.stringify({
      majorDimension: "ROWS",
      values: [[date, name, email, message, subject, addressed]]
    });

    try {
      const response_json = await utilFunctions.getGoogleAccessToken();
      const access_token = response_json.access_token;
      const url = "https://sheets.googleapis.com/v4/spreadsheets/{ID}/values/A1%3AE1:append?valueInputOption=RAW".replace(
        "{ID}",
        process.env.GOOGLE_CONTACT_SHEET_ID
      );

      const gRes = await fetch(url, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + access_token
        }),
        body: newRow
      });
      const data = await gRes.json();

      // send email
      const email_message = `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}\n\n\nThis message has also been recorded in the spreadsheet:\nhttps://docs.google.com/spreadsheets/d/${process
        .env.GOOGLE_CONTACT_SHEET_ID}/edit#gid=327438098`;
      await utilFunctions.sendEmail(
        "info@dp.la",
        "info@dp.la",
        `DPLA Site Contact: ${subject}`,
        email_message
      );

      // send the response back
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(404);
    }
  });

  server.post("/g/feedback", async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    if (req.body.i_prefer_usps_mail && req.body.i_prefer_usps_mail === "1")
      return res.sendStatus(400);

    const type = req.body.type || "";
    const message = req.body.message || "";
    const url = req.body.url || "";
    const addressed = "no";
    const options = {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
      timeZone: "America/New_York"
    };
    const date = Intl.DateTimeFormat("en-US", options).format(new Date());

    let newRow = JSON.stringify({
      majorDimension: "ROWS",
      values: [[date, type, url, message, addressed]]
    });

    try {
      const response_json = await utilFunctions.getGoogleAccessToken();
      const access_token = response_json.access_token;
      const url = "https://sheets.googleapis.com/v4/spreadsheets/{ID}/values/A1%3AE1:append?valueInputOption=RAW".replace(
        "{ID}",
        process.env.GOOGLE_FEEDBACK_SHEET_ID
      );

      const gRes = await fetch(url, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + access_token
        }),
        body: newRow
      });
      const data = await gRes.json();

      // send email
      // const email_message = `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}\n\n\nThis message has also been recorded in the spreadsheet:\nhttps://docs.google.com/spreadsheets/d/1_lJwAIukEXYautmhUDyU6CdMlbZZKiFdzZdvMTeSZfI/edit#gid=327438098`;
      // await utilFunctions.sendEmail(
      //   "info@dp.la",
      //   "info@dp.la",
      //   `DPLA Site Contact: ${subject}`,
      //   email_message
      // );

      // send the response back
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(404);
    }
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
          file_urls[key] = utilFunctions.replaceWithProxyEndpoint(
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

  server.get(
    "/thumb/*",
    proxy(process.env.THUMB_SERVER, {
      proxyReqPathResolver: function(req) {
        return req.url;
      }
    })
  );
};
