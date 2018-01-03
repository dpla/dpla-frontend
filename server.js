const express = require("express");
const next = require("next");
const LRUCache = require("lru-cache");
const proxy = require("express-http-proxy");
const bodyParser = require("body-parser");
const gauth = require("google-auth-library");
const aws = require("aws-sdk");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const replaceWithProxyEndpoint = (endpoint, req) => {
  if (endpoint) {
    const protocol = req.hostname.includes("localhost") ? "http" : "https";
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

// if (process.env.NODE_ENV !== "production") {
//   // require environment variables from .env file
//   require("dotenv").config();
// }

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());

    server.get("/healthcheck", (req, res) => {
      res.send("OK");
    });

    server.get("/site_env", (req, res) => {
      res.send(
        "var process = { env: { SITE_ENV: '" + process.env.SITE_ENV + "' }}"
      );
    });

    server.get("/donate", (req, res) => {
      const actualPage = "/donate";
      renderAndCache(req, res, actualPage, req.query);
    });

    server.get("/donate/thank-you", (req, res) => {
      const actualPage = "/donate/thank-you";
      renderAndCache(req, res, actualPage, req.query);
    });

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

    server.get(["/exhibitions", "/exhibitions"], (req, res) => {
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
    server.get("/exhibitions/:exhibition/:section", (req, res) => {
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

    server.get(["/donate", "/donate"], (req, res) => {
      app.render(req, res, "/donate", req.query);
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

      renderAndCache(req, res, actualPage, req.query);
    });

    // item routes

    server.get("/item/:itemId", (req, res) => {
      const actualPage = "/item";
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

    server.get(["/about", "/about-us"], (req, res) => {
      const actualPage = "/about";
      const params = { section: "about-us" }; // because WP has 'about-us'
      renderAndCache(
        req,
        res,
        actualPage,
        mergeQueryAndParams(params, req.query)
      );
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

    server.get("/about/:section/:subsection", (req, res) => {
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
        const response_json = await get_google_access_token();
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
        await send_email(
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
      const email = req.body.email || "";
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
        values: [[date, type, url, message, addressed, email]]
      });

      try {
        const response_json = await get_google_access_token();
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
        // await send_email(
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
      "/thumb/*",
      proxy(process.env.THUMB_SERVER, {
        proxyReqPathResolver: function(req) {
          return req.url;
        }
      })
    );

    // dynamic About Menu routes

    // this is necessary to get the next parts to work
    server.get("/robots.txt", (req, res) => {
      return handle(req, res);
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

function send_email(from, to, subject, message) {
  console.log("sending email to: ", to);
  aws.config.update({ region: "us-east-1" });
  const ses = new aws.SES();
  var params = {
    Destination: {
      /* required */
      // BccAddresses: ["STRING_VALUE"],
      // CcAddresses: ["STRING_VALUE"],
      ToAddresses: [to]
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Data: message.replace(/(?:\r\n|\r|\n)/g, "<br>") /* required */,
          Charset: "UTF-8"
        },
        Text: { Data: message /* required */, Charset: "UTF-8" }
      },
      Subject: {
        /* required */
        Data: subject /* required */,
        Charset: "UTF-8"
      }
    },
    Source: from /* required */
  };
  ses.sendEmail(params, (err, data) => {
    if (err)
      console.log(err, err.stack); // an error occurred
    else console.log("email sent!"); // successful response
  });
}

function get_google_access_token() {
  // via https://stackoverflow.com/questions/19766912/how-do-i-authorise-an-app-web-or-installed-without-user-intervention-canonic
  const refresh_token = process.env.GOOGLE_TOKEN;
  const client_id = process.env.GOOGLE_CLIENT;
  const client_secret = process.env.GOOGLE_SECRET;
  // from https://developers.google.com/identity/protocols/OAuth2WebServer#offline
  const refresh_url = "https://www.googleapis.com/oauth2/v4/token";

  const post_body = `grant_type=refresh_token&client_id=${encodeURIComponent(
    client_id
  )}&client_secret=${encodeURIComponent(
    client_secret
  )}&refresh_token=${encodeURIComponent(refresh_token)}`;

  let refresh_request = {
    body: post_body,
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    })
  };

  // post to the refresh endpoint, parse the json response and use the access token to call files.list
  return fetch(refresh_url, refresh_request).then(response => {
    return response.json();
  });
}

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey(req) {
  return `${req.url}`;
}

function renderAndCache(req, res, pagePath, queryParams) {
  const key = getCacheKey(req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    console.log(`CACHE HIT: ${key}`);
    res.send(ssrCache.get(key));
    return;
  }

  // If not let's render the page into HTML
  app
    .renderToHTML(req, res, pagePath, queryParams)
    .then(html => {
      // Let's cache this page
      console.log(`CACHE MISS: ${key}`);
      ssrCache.set(key, html);

      res.send(html);
    })
    .catch(err => {
      app.renderError(err, req, res, pagePath, queryParams);
    });
}
