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

const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const sesClient = new SESClient({ region: "us-east-1" });

exports.sendEmail = async (from, to, subject, message) => {
  const params = {
    Destination: {
      ToAddresses: [to]
    },
    Message: {
      Body: {
        Text: { Data: message, Charset: "UTF-8" }
      },
      Subject: {
        Data: subject,
        Charset: "UTF-8"
      }
    },
    Source: from
  };
  try {
    const data = await sesClient.send(new SendEmailCommand(params));
    console.log("Email sent. Message ID " + data.MessageId);
  } catch (err) {
    console.log(params, err, err.stack);
    throw err;
  }
};
