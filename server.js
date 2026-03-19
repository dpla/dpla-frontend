// IMPORTANT: Sentry init must be first!
const Sentry = require("@sentry/node");
require("dotenv").config();
const { nodeProfilingIntegration } = require("@sentry/profiling-node");
Sentry.init({
  debug: process.env.SENTRY_DEBUG === "true",
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT ?? "development",
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});
const mailchimp = require("@mailchimp/mailchimp_marketing");
if (process.env.MAILCHIMP_KEY) {
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_KEY || "",
    server: process.env.MAILCHIMP_PREFIX || "us4",
  });
}

const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const cluster = require("node:cluster");
const crypto = require("crypto");
const numCPUs =
  Number(process.env.PS_COUNT) || require("node:os").availableParallelism();

const serverFunctions = require("./lib/serverFunctions");
const { MAILCHIMP_GROUP_IDS, MAILCHIMP_LIST_ID } = require("./constants/site");
const { LOCAL_SUBDOMAINS } = require("./constants/local");

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
    .on("online", (worker) => {
      console.log(`worker ${worker.process.pid} online`);
    });
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
}

function follower() {
  const nextApp = next({ dev });
  const handle = nextApp.getRequestHandler();

  nextApp.prepare().then(() => {
    const expressApp = express();
    Sentry.setupExpressErrorHandler(expressApp);
    expressApp.disable("x-powered-by");
    expressApp.use(bodyParser.urlencoded({ extended: true }));
    expressApp.use(bodyParser.json());
    expressApp.get("/healthcheck", healthcheck());
    expressApp.get("/robots.txt", robotsTxt());

    // routes that are common to user and pro sites
    if (
      process.env.NEXT_PUBLIC_SITE_ENV === "user" ||
      process.env.NEXT_PUBLIC_SITE_ENV === "pro"
    ) {
      expressApp.get("/wp-content/*", wpContent());
      expressApp.post("/mailchimp", doMailchimp());
      expressApp.post("/g/contact", doContact());
      expressApp.post("/g/feedback", feedback());
    }

    expressApp.get("*", catchall(handle));

    const server = expressApp.listen(PORT, (err) => {
      if (err) throw err;
      console.log("> Ready on http://localhost:" + PORT);
    });

    registerHandlers(server);
  });
}

const AI_BOT_RULES = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "CCBot",
  "Google-Extended",
  "Amazonbot",
  "Bytespider",
  "PerplexityBot",
  "meta-external-agent",
  "AhrefsBot",
  "SemrushBot",
  "MJ12bot",
  "DotBot",
].flatMap((bot) => [`User-agent: ${bot}`, "Disallow: /"]);

function robotsTxt() {
  return (req, res) => {
    const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV;
    const localId = process.env.NEXT_PUBLIC_LOCAL_ID;

    if (siteEnv === "local" && localId) {
      const subdomain = LOCAL_SUBDOMAINS[localId] || `${localId}.dp.la`;
      const base = `https://${subdomain}`;
      const content = [
        `Sitemap: https://sitemaps.dp.la/sitemap/${localId}/all_item_urls.xml`,
        `Sitemap: ${base}/sitemap-pages.xml`,
        "",
        "User-agent: *",
        "Disallow: /search",
        "Crawl-delay: 2",
        "",
        ...AI_BOT_RULES,
      ].join("\n");
      res.type("text/plain").send(content);
    } else if (siteEnv === "pro") {
      const content = [
        "Sitemap: https://pro.dp.la/sitemap-pages.xml",
        "",
        "User-agent: *",
        "Allow: /",
        "Crawl-delay: 2",
        "",
        ...AI_BOT_RULES,
      ].join("\n");
      res.type("text/plain").send(content);
    } else {
      // user site (dp.la) and any other environment
      const content = [
        "Sitemap: https://dp.la/sitemap/all_item_urls.xml",
        "Sitemap: https://dp.la/sitemap-pages.xml",
        "",
        "User-agent: *",
        "Disallow: /search",
        "Disallow: /qa",
        "Crawl-delay: 2",
        "",
        "User-agent: Screaming Frog SEO Spider",
        "Allow: /",
        "",
        ...AI_BOT_RULES,
      ].join("\n");
      res.type("text/plain").send(content);
    }
  };
}

function catchall(handle) {
  return (req, res) => {
    return handle(req, res);
  };
}

function uncaught() {
  return (err) => {
    console.error("Uncaught Exception: ", err.stack);
    process.exit(1);
  };
}

function healthcheck() {
  return (req, res) => {
    console.log("healthcheck");
    res.send("OK");
  };
}

function wpContent() {
  return (req, res) => {
    const contentStart = req.url.indexOf("/wp-content");
    const newPath =
      process.env.NEXT_ENV_WORDPRESS_URL + req.url.substring(contentStart);
    res.redirect(newPath);
  };
}

function doMailchimp() {
  return async (req, res) => {
    if (!req.body) {
      console.error("Mailchimp request body is empty");
      return res.sendStatus(400);
    }

    // bot captcha
    if (req.body?.i_prefer_usps_mail && req.body.i_prefer_usps_mail === "1") {
      console.error("Mailchimp request body has i_prefer_usps_mail set to 1");
      return res.sendStatus(400);
    }

    const email = req.body.email || "";
    const md5 = crypto.createHash("md5");
    const subscriberHash = md5.update(email.toLowerCase()).digest("hex");
    const interests = {
      [MAILCHIMP_GROUP_IDS.NEWS]: true,
    };

    let exists = false;

    try {
      await mailchimp.lists.getListMember(MAILCHIMP_LIST_ID, subscriberHash);
      exists = true;
    } catch {
      // assume user doesn't exist
    }

    if (exists) {
      try {
        await mailchimp.lists.updateListMember(
          MAILCHIMP_LIST_ID,
          subscriberHash,
          {
            email_address: email,
            status: "subscribed",
            interests,
          },
        );
        return res.status(200).json("OK");
      } catch (error) {
        console.error("Unable to modify existing user", error?.title);
        return res.status(400).json(error?.title);
      }
    } else {
      try {
        await mailchimp.lists.setListMember(MAILCHIMP_LIST_ID, subscriberHash, {
          email_address: email,
          status: "subscribed",
          interests,
        });
        return res.status(200).json("OK");
      } catch (error) {
        console.error("Unable to subscribe new user", error?.title);
        return res.status(400).json(error?.title);
      }
    }
  };
}

function doContact() {
  return async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    if (req.body?.i_prefer_usps_mail && req.body.i_prefer_usps_mail === "1")
      return res.sendStatus(400);

    const email = req.body.email || "";
    const name = req.body.name || "";
    const message = req.body.message || "";
    const subject = req.body.subject || "";

    try {
      const email_message = `Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}\n`;
      serverFunctions.sendEmail(
        "info@dp.la",
        "info@dp.la",
        `DPLA Site Contact: ${subject}`,
        email_message,
      );

      // send the response back
      res.sendStatus(200);
    } catch (error) {
      console.error("Contact submission failed", error);
      res.sendStatus(500);
    }
  };
}

function feedback() {
  return async (req, res) => {
    if (!req.body) return res.sendStatus(400);
    if (req.body.i_prefer_usps_mail && req.body.i_prefer_usps_mail === "1")
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
      timeZone: "America/New_York",
    };

    const date = Intl.DateTimeFormat("en-US", options).format(new Date());
    const browser = req.get("User-Agent");
    const emailFields = [
      `Email:\n${email}`,
      `Type:\n${type}`,
      `Message:\n${message}`,
      `URL:\n${url}`,
      `Date:\n${date}`,
      `Browser:\n${browser}`,
    ];

    const emailMessage = emailFields.join("\n\n");

    try {
      await serverFunctions.sendEmail(
        "info@dp.la",
        "info@dp.la",
        `DPLA Site Feedback: ${type}`,
        emailMessage,
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
      "uncaughtException: " + err.name + "(" + err.message + "): " + origin,
      server,
      1,
    );
  });

  process.on("unhandledRejection", (err, origin) => {
    handleExit("unhandledRejection: " + err + ": " + origin, server, 1);
  });
}
