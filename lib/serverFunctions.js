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
          Data: message.replace(/\r\n|\r|\n/g, "<br>") /* required */,
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
  ses.sendEmail(params, (err) => {
    if (err)
      console.log(err, err.stack); // an error occurred
    else console.log("email sent!"); // successful response
  });
};
