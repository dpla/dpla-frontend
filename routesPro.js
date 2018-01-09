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

  // contact us routes

  server.get(["/contact", "/contact-us"], (req, res) => {
    app.render(req, res, "/contact-us", req.query);
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
};
