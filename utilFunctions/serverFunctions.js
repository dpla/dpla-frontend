const LRUCache = require("lru-cache");

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
});

// route and cache related stuff

exports.replaceWithProxyEndpoint = (endpoint, req) => {
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

/*
* NB: make sure to modify this to take into account anything that should trigger
* an immediate page change (e.g a locale stored in req.session)
*/
exports.getCacheKey = req => {
  return `${req.url}`;
};

exports.mergeQueryAndParams = (query, params) =>
  Object.assign({}, query, params);

exports.renderAndCache = (
  app,
  req,
  res,
  pagePath,
  queryParams,
  extraParams
) => {
  const key = this.getCacheKey(req);

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    console.log(`CACHE HIT: ${key}`);
    res.send(ssrCache.get(key));
    return;
  }

  if (extraParams) {
    queryParams = this.mergeQueryAndParams(extraParams, queryParams);
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
};

// google and email sending stuff

exports.sendEmail = (from, to, subject, message) => {
  const aws = require("aws-sdk");
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
};

exports.getGoogleAccessToken = () => {
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
};
