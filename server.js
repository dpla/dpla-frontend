const fs = require("fs");
const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

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

    // decide which routing to use depending on the site environment
    if (process.env.SITE_ENV === "user") {
      const router = require("./routesUser")(app, server);
    } else {
      const router = require("./routesPro")(app, server);
    }

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
