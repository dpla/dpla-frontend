// IMPORTANT: Sentry init must be first!
const Sentry = require('@sentry/node');
const { nodeProfilingIntegration } = require("@sentry/profiling-node");
Sentry.init({
  debug: process.env.SENTRY_DEBUG === "true",
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT ?? "development",
  integrations: [
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});
const express = require("express");
const cookieParser = require("cookie-parser");
const next = require("next");
const bodyParser = require("body-parser");
const fetch = require("isomorphic-fetch");
const cluster = require("node:cluster");
const numCPUs = require("node:os").availableParallelism ;

const serverFunctions = require("./lib/serverFunctions");
const {MAILCHIMP_GROUP_IDS} = require("constants/site");

const dev = process.env.NODE_ENV !== "production";
const production = !dev;
const mustFork = process.env.MUST_FORK === "true" || production;
const PORT = process.env.PORT || 3000;

if (require.main === module) {
  process.on("uncaughtException", uncaught());
  if (cluster.isPrimary && mustFork) {
    leader();
  } else {
    follower();
  }
}

function leader() {
  // Fork workers, 1 for each CPU.
  cluster
      .on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`, code, signal);
        console.log("Initiating replacement worker.");
        cluster.fork();
      })
      .on("online", worker => {
        console.log(`worker ${worker.process.pid} online`);
      });
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
}

function follower() {
  const nextApp = next({dev});
  const handle = nextApp.getRequestHandler();

  nextApp.prepare().then(() => {
    const expressApp = express();
    Sentry.setupExpressErrorHandler(expressApp);
    expressApp.disable("x-powered-by")
    expressApp.use(cookieParser());
    expressApp.use(bodyParser.urlencoded({extended: true}));
    expressApp.use(bodyParser.json());
    expressApp.get("/qa", qa());
    expressApp.get("/healthcheck", healthcheck());


    // decide which routing to use depending on the site environment
    if (process.env.SITE_ENV === "user") {
      require("./routesUser")(nextApp, expressApp);
    } else if (process.env.SITE_ENV === "pro") {
      require("./routesPro")(nextApp, expressApp);
    } else if (process.env.SITE_ENV === "local") {
      require("./routesLocal").static(nextApp, expressApp);
      require("./routesLocal").dynamic(nextApp, expressApp);
    }

    // routes that are common to user and pro sites
    if (process.env.SITE_ENV === "user" || process.env.SITE_ENV === "pro") {
      expressApp.get("/donate", donate(nextApp));
      expressApp.get("/donate/thank-you", thankYou(nextApp));
      expressApp.get(["/contact", "/contact-us"], contact(nextApp));
      expressApp.get("/wp-content/*", wpContent());
      expressApp.post("/mailchimp", mailchimp());
      expressApp.post("/g/contact", doContact());
      expressApp.post("/g/feedback", feedback());
    }

    expressApp.get("*", catchall(handle));

    const server = expressApp.listen(PORT, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:" + PORT);
    });

    registerHandlers(server);
  });
}

function catchall(handle) {
  return (req, res) => {
    return handle(req, res);
  };
}

function qa() {
  return (req, res) => {
    const cookies = req.cookies;
    if ("qa" in cookies) {
      res.clearCookie("qa").send("QA mode disabled");
    } else {
      res.cookie("qa", "qa").send("QA mode enabled");
    }
  };
}

function uncaught() {
  return err => {
    console.error("Uncaught Exception: ", err.stack);
    process.exit(1);
  };
}

function healthcheck() {
  return (req, res) => {
    res.send("OK");
  };
}

function donate(app) {
  return (req, res) => {
    const actualPage = "/donate";
    serverFunctions.renderAndCache(app, req, res, actualPage, req.query);
  };
}

function thankYou(app) {
  return (req, res) => {
    const actualPage = "/donate/thank-you";
    serverFunctions.renderAndCache(app, req, res, actualPage, req.query);
  };
}

function contact(app) {
  return (req, res) => {
    app.render(req, res, "/contact-us", req.query);
  };
}

function wpContent() {
  return (req, res) => {
    const contentStart = req.url.indexOf("/wp-content");
    const newPath =
        process.env.WORDPRESS_URL + req.url.substring(contentStart);
    res.redirect(newPath);
  };
}

function mailchimp() {
  return async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    if (
        req.body?.i_prefer_usps_mail &&
        req.body.i_prefer_usps_mail === "1"
    )
      return res.sendStatus(400);

    const email = req.body.email || "";
    const list_id = req.body.id || "";
    const interests = req.body.interests || [];

    if (list_id === "") return res.sendStatus(400);

    const availableListIds = [];
    for (let key in MAILCHIMP_GROUP_IDS) {
      if (MAILCHIMP_GROUP_IDS.hasOwnProperty(key)) {
        availableListIds.push(MAILCHIMP_GROUP_IDS[key]);
      }
    }

    if (!availableListIds.contains(list_id) ) {
      // don't know that list
      return res.sendStatus(400);
    }

    const url = `https://us4.api.mailchimp.com/3.0/lists/${list_id}/members`;

    const body = JSON.stringify({
      email_address: email,
      status: "subscribed",
      interests: {
        [interests.news.group_id]: interests.news.value,
        [interests.ebooks.group_id]: interests.ebooks.value,
        [interests.education.group_id]: interests.education.value,
        [interests.genealogy.group_id]: interests.genealogy.value
      }
    });

    const mRes = await fetch(url, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "apikey " + process.env.MAILCHIMP_KEY
      }),
      body: body
    });

    await mRes.json();

    // send the response back
    res.sendStatus(200);

  };
}

function doContact() {
  return async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    if (
        req.body?.i_prefer_usps_mail &&
        req.body.i_prefer_usps_mail === "1"
    )
      return res.sendStatus(400);

    const email = req.body.email || "";
    const name = req.body.name || "";
    const message = req.body.message || "";
    const subject = req.body.subject || "";

    try {
      // email
      const to_email = subject !== "Ebooks"
          ? "info@dp.la"
          : "ebooks@dp.la";
      const from_email = "info@dp.la";

      // send email
      const email_message = `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}\n`;
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
  };
}

function feedback() {
  return async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    if (
        req.body.i_prefer_usps_mail &&
        req.body.i_prefer_usps_mail === "1"
    )
      return res.sendStatus(400);

    const email = req.body.email || "";
    const type = req.body.type || ""; // comment | correction | bug
    const message = req.body.message || ""; // body
    const url = req.body.url || ""; // url of page
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
    const emailFields = [
      `Email:\n${email}`,
      `Type:\n${type}`,
      `Message:\n${message}`,
      `URL:\n${url}`,
      `Date:\n${date}`,
      `Browser:\n${browser}`
    ];

    const emailMessage = emailFields.join("\n\n");

    try {
      await serverFunctions.sendEmail(
          "info@dp.la",
          "info@dp.la",
          `DPLA Site Feedback: ${type}`,
          emailMessage
      );

      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  };
}

function exit(retVal) {
  process.exit(retVal);
}

function handleExit(reason, server, retVal) {
  console.log("Received %s. Shutting down.", reason);
  server.close(() => {
    exit(retVal);
  });
}

function registerHandlers(server) {
  process.on("SIGINT", () => {
    handleExit("SIGINT", server, 0);
  });

  process.on("SIGQUIT", () => {
    handleExit("SIGQUIT", server, 0);
  });

  process.on("SIGTERM", () => {
    handleExit("SIGTERM", server, 0);
  });

  process.on("uncaughtException", (err, origin) => {
    handleExit(
        "uncaughtException: " + String(err) + ": " + origin,
        server,
        1,
    );
  });

  process.on("unhandledRejection", (err, origin) => {
    handleExit(
        "unhandledRejection: " + String(err) + ": " + origin,
        server,
        1,
    );
  });
}

