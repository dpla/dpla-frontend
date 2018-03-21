const fs = require("fs");
const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const fetch = require("isomorphic-fetch");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

const serverFunctions = require("./utilFunctions/serverFunctions");

const dev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3000;

if (require.main === module) {
  process.on("uncaughtException", err => {
    console.error("Uncaught Exception: ", err.stack);
    process.exit(1);
  });

  if (cluster.isMaster) {
    // Fork workers, 1 for each CPU.
    cluster
      .on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
      })
      .on("online", worker => {
        console.log(`worker ${worker.process.pid} online`);
      });
    for (var i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
  } else {
    // Worker

    const app = next({ dev });
    const handle = app.getRequestHandler();

    app.prepare().then(() => {
      const server = express();
      server.use(
        bodyParser.urlencoded({
          extended: true
        })
      );
      server.use(bodyParser.json());

      server.get("/healthcheck", (req, res) => {
        res.send("OK");
      });

      server.get("/robots.txt", (req, res) => {
        return handle(req, res);
      });

      // decide which routing to use depending on the site environment
      if (process.env.SITE_ENV === "user") {
        const router = require("./routesUser")(app, server);
      } else {
        const router = require("./routesPro")(app, server);
      }

      // routes that are common to both sites
      server.get("/donate", (req, res) => {
        const actualPage = "/donate";
        serverFunctions.renderAndCache(app, req, res, actualPage, req.query);
      });

      server.get("/donate/thank-you", (req, res) => {
        const actualPage = "/donate/thank-you";
        serverFunctions.renderAndCache(app, req, res, actualPage, req.query);
      });

      server.get(["/contact", "/contact-us"], (req, res) => {
        app.render(req, res, "/contact-us", req.query);
      });

      // rerouting wp-content links
      server.get("/wp-content/*", (req, res) => {
        var contentStart = req.url.indexOf("/wp-content");
        var newPath = process.env.WORDPRESS_URL + req.url.substr(contentStart);
        res.redirect(newPath);
      });

      // mailchimp lists endpoint
      server.post("/m", async (req, res) => {
        if (!req.body) return res.sendStatus(400);
        if (req.body.i_prefer_usps_mail && req.body.i_prefer_usps_mail === "1")
          return res.sendStatus(400);

        const email = req.body.email || "";
        const list_id = req.body.id || "";

        if (list_id === "") return res.sendStatus(400);

        try {
          const url = `https://us4.api.mailchimp.com/3.0/lists/${list_id}/members`;

          const body = JSON.stringify({
            email_address: email,
            status: "pending"
          });

          const mRes = await fetch(url, {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: "apikey " + process.env.MAILCHIMP_KEY
            }),
            body: body
          });
          const data = await mRes.json();

          // send the response back
          res.sendStatus(200);
        } catch (error) {
          res.sendStatus(500);
        }
      });

      // contact/feedback page endpoints
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
        const browser = req.get("User-Agent");

        let newRow = JSON.stringify({
          majorDimension: "ROWS",
          values: [[date, name, email, message, subject, addressed, browser]]
        });

        try {
          const response_json = await serverFunctions.getGoogleAccessToken();
          const access_token = response_json.access_token;
          const sheetUrl = "https://sheets.googleapis.com/v4/spreadsheets/{ID}/values/A1%3AE1:append?valueInputOption=RAW".replace(
            "{ID}",
            process.env.GOOGLE_CONTACT_SHEET_ID
          );

          const gRes = await fetch(sheetUrl, {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json; charset=utf-8",
              Authorization: "Bearer " + access_token
            }),
            body: newRow
          });
          const data = await gRes.json();

          // email
          const to_email = subject !== "Ebooks" ? "info@dp.la" : "ebooks@dp.la";
          const from_email = "info@dp.la";

          // send email
          const email_message = `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}\n\n\nThis message has also been recorded in the spreadsheet:\nhttps://docs.google.com/spreadsheets/d/${process
            .env.GOOGLE_CONTACT_SHEET_ID}/edit#gid=327438098`;
          await serverFunctions.sendEmail(
            from_email,
            to_email,
            `DPLA Site Contact: ${subject}`,
            email_message
          );

          // send the response back
          res.sendStatus(200);
        } catch (error) {
          res.sendStatus(500);
        }
      });

      server.post("/g/feedback", async (req, res) => {
        if (!req.body) return res.sendStatus(400);
        if (req.body.i_prefer_usps_mail && req.body.i_prefer_usps_mail === "1")
          return res.sendStatus(400);

        const email = req.body.email || "";
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
        const browser = req.get("User-Agent");

        let newRow = JSON.stringify({
          majorDimension: "ROWS",
          values: [[date, type, url, message, addressed, email, browser]]
        });

        try {
          const response_json = await serverFunctions.getGoogleAccessToken();
          const access_token = response_json.access_token;
          const sheetUrl = "https://sheets.googleapis.com/v4/spreadsheets/{ID}/values/A1%3AE1:append?valueInputOption=RAW".replace(
            "{ID}",
            process.env.GOOGLE_FEEDBACK_SHEET_ID
          );

          const gRes = await fetch(sheetUrl, {
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
          // await serverFunctions.sendEmail(
          //   "info@dp.la",
          //   "info@dp.la",
          //   `DPLA Site Contact: ${subject}`,
          //   email_message
          // );

          // send the response back
          res.sendStatus(200);
        } catch (error) {
          res.sendStatus(500);
        }
      });

      server.get("*", (req, res) => {
        console.log(`PID ${process.pid} request`);
        return handle(req, res);
      });

      server.listen(PORT, err => {
        if (err) throw err;
        console.log("> Ready on http://localhost:" + PORT);
      });
    });
  } // if (cluster.isMaster)
} // if (require.main === module)
