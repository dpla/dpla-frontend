const fs = require("fs");
const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const fetch = require("isomorphic-fetch");

const serverFunctions = require("./utilFunctions/serverFunctions");

const dev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
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
    server.get("/news", (req, res) => {
      app.render(req, res, "/news", req.query);
    });

    server.get("/news/:post", (req, res) => {
      const actualPage = "/news/post";
      const params = { slug: req.params.post };
      serverFunctions.renderAndCache(
        app,
        req,
        res,
        actualPage,
        req.query,
        params
      );
    });

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

      let newRow = JSON.stringify({
        majorDimension: "ROWS",
        values: [[date, name, email, message, subject, addressed]]
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

        // send email
        const email_message = `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}\n\n\nThis message has also been recorded in the spreadsheet:\nhttps://docs.google.com/spreadsheets/d/${process
          .env.GOOGLE_CONTACT_SHEET_ID}/edit#gid=327438098`;
        await serverFunctions.sendEmail(
          "info@dp.la",
          "info@dp.la",
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
      return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:" + PORT);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
