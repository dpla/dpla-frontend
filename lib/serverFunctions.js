// route related stuff

exports.replaceWithProxyEndpoint = (endpoint, req) => {
  if (endpoint) {
    const protocol = req.protocol;
    return endpoint.replace(
      process.env.OMEKA_URL,
      `${protocol}://${req.get("host")}/api`
    );
  } else {
    return null;
  }
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

  if (extraParams) {
    queryParams = this.mergeQueryAndParams(extraParams, queryParams);
  }

  // let's render the page into HTML
  // (err: Error, html: string) => void
  app
    .render(
        req,
        res,
        pagePath,
        queryParams,
        (err, html) => {
          console.log("Caught error in render.", err);
          app.renderError(err, req, res, pagePath, queryParams)
        }
    );

};

// google and email sending stuff

exports.sendEmail = (from, to, subject, message) => {
  const aws = require("aws-sdk");
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
