"use strict";

const libRequest = require("request");
const aws = require("aws-sdk");
const path_pat = /^\/thumb\/([a-f0-9]{32})$/;
const ELASTIC_URL =
  process.env.ELASTIC_URL || "http://localhost:9200/dpla_alias";

/***
 * thumbp:  DPLA Thumbnail Image Proxy
 * -----------------------------------
 *
 * Example invocation:
 * $ http://localhost:3000/thumb/ff6662ec14a3b23193375dee55c03fdb
 *
 */

/*
 * Connection
 * ---
 * The connection between `thumbp' server and its client, with a request and
 * a response.
 */
function Connection(request, response) {
  this.request = request;
  this.response = response;
  this.response.setHeader("Server", "DPLA thumbp");

  this.request
    .on("data", () => {
      return; // noop
    })
    .on("error", e => {
      console.error(e);
      this.returnError(500);
    })
    .on("end", () => {
      this.handleReqEnd();
    });
  this.imageURL = null;
  this.itemID = null;
}

exports.Connection = Connection; // Exported for use in routesUser.js and our tests

/*
 * Handle the /thumb request 'end' event, when the request is complete.
 */
Connection.prototype.handleReqEnd = function() {
  if (this.request.method === "GET") {
    var match_result = path_pat.exec(this.request.url);
    if (match_result !== null) {
      this.itemID = match_result[1];
      this.lookUpImage();
    } else {
      this.returnError(400);
    }
  } else {
    this.returnError(405);
  }
};

/*
 * Given an item ID, look up the image URL and proxy it.
 */
Connection.prototype.lookUpImage = function() {
  // first try the S3 bucket
  var s3 = new aws.S3();
  var prefix = this.itemID.substr(0, 4).split("").join("/");
  var s3_name = prefix + "/" + this.itemID + ".jpg";
  var params = {
    Bucket: "dpla-thumbnails",
    Key: s3_name
  };
  var conn = this;
  s3.headObject(params, function(error, metadata) {
    if (error) {
      // Not found so go ahead and get info from ES.

      // First set short cache-expiration headers so that the client gets an
      // optimized image if it checks back soon.
      conn.response.setHeader("Cache-Control", "public, max-age=60");
      conn.response.setHeader("Expires", "");

      var q_url =
        ELASTIC_URL + `/item/_search?q=id:${conn.itemID}&fields=id,object`;
      libRequest(q_url, (error, response, body) => {
        conn.checkSearchResponse(error, response, body);
      });
    } else {
      // Set longer cache-expiration headers for the nice optimized image
      var maxAgeSec = 60 * 60 * 24 * 30; // 30 days
      var gmtExpDate = new Date(
        new Date().getTime() + 1000 * maxAgeSec // as milliseconds
      ).toUTCString();
      conn.response.setHeader("Cache-Control", `public, max-age=${maxAgeSec}`);
      conn.response.setHeader("Expires", gmtExpDate);

      conn.imageURL = s3.getSignedUrl("getObject", params);
      conn.proxyImage();
    }
  });
};

/*
 * Create a message in SQS from the imageURL.
 */
Connection.prototype.createS3Derivative = async function() {
  var sqs = new aws.SQS({ region: "us-east-1" });
  var msg = { id: this.itemID, url: this.imageURL };
  sqs.sendMessage(
    {
      MessageBody: JSON.stringify(msg),
      QueueUrl: `${process.env.SQS_URL}/thumbp-image`
    },
    function(error, data) {
      if (error) {
        console.log("SQS error: ", error);
      }
    }
  );
};

/*
 * Check the response from the Elasticsearch query request, and proceed
 * to proxying the image if it's OK.
 */
Connection.prototype.checkSearchResponse = function(error, response, body) {
  var item_data, // Parsed Elasticsearch response
    obj, // The 'object' property in the ES response
    url; // Thumbnail image URL
  if (!error && response.statusCode == 200) {
    try {
      item_data = JSON.parse(body);
      if (item_data["hits"]["total"] == 0) {
        this.returnError(404);
        return;
      }
      obj = item_data["hits"]["hits"][0]["fields"]["object"];
      if (Array.isArray(obj)) {
        url = obj[0]; // [0] could be undefined (== false)
      } else if (typeof obj == "string") {
        url = obj;
      } else {
        url = false;
      }
      if (url) {
        this.imageURL = url;
        this.createS3Derivative();
        this.proxyImage();
      } else {
        // Empty string or empty array, or incorrect 'object' type
        console.error(
          `empty / invalid object property for item ${this.itemID}`
        );
        this.returnError(404);
      }
    } catch (e) {
      console.error(e.stack);
      this.returnError(500);
    }
  } else {
    console.error(error);
    this.returnError(500);
  }
};

/*
 * Given an image URL, pipe the image to the client response.
 *
 * The `request' response (i.e. the response of what we're namespacing as
 * `libRequest', which is the response from the provider's image resource)
 * is piped into the response we're sending to our client.
 */
Connection.prototype.proxyImage = function() {
  try {
    libRequest({
      method: "GET",
      uri: this.imageURL,
      headers: {
        "User-Agent": "DPLA frontend (https://github.com/dpla/dpla-frontend)"
      },
      timeout: 10000 // ms
    })
      .on("response", response => {
        this.handleImageResponse(response);
      })
      .on("error", error => {
        this.handleImageConnectionError(error);
      })
      .pipe(this.response);
  } catch (e) {
    console.error(e.stack);
    this.returnError(500);
  }
};

/*
 * Handle the image request's 'response' event, which allows us to manipulate
 * the response object before it gets piped to the response we send to our
 * client in proxyImage().
 *
 * We customize the return code and response headers.
 */
Connection.prototype.handleImageResponse = function(imgResponse) {
  // Reduce headers to just those that we want to pass through
  var cl = imgResponse.headers["content-length"] || false;
  var ct = imgResponse.headers["content-type"] || false;
  var lm = imgResponse.headers["last-modified"] || false;
  imgResponse.headers = {
    Date: imgResponse.headers["date"]
  };
  cl && (imgResponse.headers["Content-Length"] = cl);
  ct && (imgResponse.headers["Content-Type"] = ct);
  lm && (imgResponse.headers["Last-Modified"] = lm);

  // We have our own ideas of which response codes are appropriate for our
  // client.
  switch (imgResponse.statusCode) {
    case 200:
      break;
    case 404:
    case 410:
      // We treat a 410 as a 404, because our provider could correct
      // the `object' property in the item's metadata, meaning the
      // resource doesn't have to be "410 Gone".
      console.error(`${this.imageURL} not found`);
      imgResponse.statusCode = 404;
      break;
    default:
      // Other kinds of errors are just considered "bad gateway" errors
      // because we don't want to own them.
      console.error(`${this.imageURL} status ${imgResponse.statusCode}`);
      imgResponse.statusCode = 502;
      break;
  }
};

/*
 * Handle errors with the HTTP connection to the image webserver.
 */
Connection.prototype.handleImageConnectionError = function(error) {
  console.error(`Error (${error.code}) for ${this.imageURL}`);
  if (error.code === "ETIMEDOUT") {
    this.returnError(504);
  } else {
    this.returnError(502);
  }
};

Connection.prototype.returnError = function(code) {
  this.response.statusCode = code;
  this.response.end();
};
