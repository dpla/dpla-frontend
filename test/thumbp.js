const assert = require("chai").assert;
const expect = require("expect.js");
const sinon = require("sinon");
const http = require("http");
const libRequest = require("request");
const thumbp = require("../lib/thumbp.js");

describe("Connection", function() {
  var c, request, response, returnErrorStub, consoleErrorStub, libRequestStub;

  before(function() {
    consoleErrorStub = sinon.stub(console, "error");
    libRequestStub = sinon.stub(libRequest, "Request");
    libRequestStub.on = function() {
      return libRequestStub;
    };
    libRequestStub.pipe = function() {
      return true;
    };
  });

  beforeEach(function() {
    request = {
      method: "GET",
      on: function() {
        return request;
      }
    };
    response = {
      setHeader: function() {}
    };
    c = new thumbp.Connection(request, response);
    returnErrorStub = sinon.stub(c, "returnError");
    createS3DerivativeStub = sinon.stub(c, "createS3Derivative");
    consoleErrorStub.reset();
    libRequestStub.reset();
    createS3DerivativeStub.reset();
  });

  describe("Connection()", function() {
    it("can be instantiated", function() {
      expect(new thumbp.Connection(request, response)).to.be.ok;
    });

    it("assigns request and response", function() {
      var c = new thumbp.Connection(request, response);
      expect(c.request).to.equal(request);
      expect(c.response).to.equal(response);
    });
  });

  describe("handleReqEnd()", function() {
    var lookUpImageStub;

    beforeEach(function() {
      lookUpImageStub = sinon.stub(c, "lookUpImage");
    });

    it("returns a 400 error if the URL path is no good", function() {
      request.url = "/bad/path";
      c.handleReqEnd();
      assert(returnErrorStub.calledWith(400));
    });

    it("returns a 400 error if given an invalid ID", function() {
      request.url = "/thumb/1";
      c.handleReqEnd();
      assert(returnErrorStub.calledWith(400));
    });

    it("proceeds if given a valid ID", function() {
      itemID = "223ea5040640813b6c8204d1e0778d30";
      request.url = `/thumb/${itemID}`;
      c.handleReqEnd();
      assert(lookUpImageStub.called);
      expect(c.itemID).to.equal(itemID);
    });

    it("returns a 405 error if the method is not GET", function() {
      request.method = "PUT";
      c.handleReqEnd();
      assert(returnErrorStub.calledWith(405));
    });
  });

  // describe("lookUpImage()", function() {
  //   it("makes an Elasticsearch request with the correct URL", function() {
  //     var itemID = "223ea5040640813b6c8204d1e0778d30";
  //     var goodURL =
  //       "http://localhost:9200/dpla_alias/item" +
  //       `/_search?q=id:${itemID}&_source=id,object`;
  //     c.itemID = itemID;
  //     c.lookUpImage();
  //     expect(libRequestStub.args[0][0].uri).to.equal(goodURL);
  //   });
  // });

  describe("checkSearchResponse()", function() {
    var error, response, itemID, imageURL, okBody, proxyImageStub;

    beforeEach(function() {
      error = false;
      response = {
        statusCode: 200
      };
      itemID = "f8f8a58a5a5ef34ffd4f8e399eaeb740";
      imageURL = "http://example.org/image1.jpg";
      okBody = JSON.stringify({
        hits: {
          total: 1,
          hits: [
            {
              _source: {
                id: itemID,
                object: imageURL
              }
            }
          ]
        }
      });
      proxyImageStub = sinon.stub(c, "proxyImage");
    });

    it("calls proxyImage() with a successful query result", function() {
      c.itemID = itemID;
      c.checkSearchResponse(error, response, okBody);
      assert(proxyImageStub.called);
      expect(c.imageURL).to.equal(imageURL);
    });

    it("gives a 404 if the ID could not be found", function() {
      var notFoundBody = JSON.stringify({
        hits: {
          total: 0,
          hits: []
        }
      });
      c.itemID = itemID;
      c.checkSearchResponse(error, response, notFoundBody);
      assert(returnErrorStub.calledWith(404));
    });

    it("gives a 500 and logs if there is a parsing problem", function() {
      var badBody = JSON.stringify({});
      c.checkSearchResponse(error, response, badBody, itemID);
      assert(returnErrorStub.calledWith(500));
      assert(consoleErrorStub.called);
    });

    it("gives a 500 and logs if there was a connection error", function() {
      c.checkSearchResponse("the error", {}, {}, itemID);
      assert(returnErrorStub.calledWith(500));
      assert(consoleErrorStub.called);
    });

    it('takes 1st element of "object" field that is an array', function() {
      bodyWithObjArray = JSON.stringify({
        hits: {
          total: 1,
          hits: [
            {
              _source: {
                id: itemID,
                object: [imageURL, "x"]
              }
            }
          ]
        }
      });
      c.itemID = itemID;
      c.checkSearchResponse(error, response, bodyWithObjArray);
      expect(c.imageURL).to.equal(imageURL);
    });

    describe("... with no object property", function() {
      var noObjectData, errMsg;

      beforeEach(function() {
        noObjectData = {
          hits: {
            total: 1,
            hits: [
              {
                _source: {
                  id: itemID
                }
              }
            ]
          }
        };
        errMsg = `empty / invalid object property for item ${itemID}`;
        c.itemID = itemID;
      });

      it("returns 404 & logs if no object property", function() {
        var noObjectBody = JSON.stringify(noObjectData);
        c.checkSearchResponse(error, response, noObjectBody);
        assert(returnErrorStub.calledWith(404));
        assert(consoleErrorStub.calledWith(errMsg));
      });

      it("returns 404 & logs if object is empty / wrong", function() {
        empties = [[], "", { x: "is wrong type" }];
        for (var i = 0; i < empties.length; i++) {
          var obj = empties[i];
          noObjectData["hits"]["hits"][0]["_source"]["object"] = obj;
          var noObjectBody = JSON.stringify(noObjectData);
          c.checkSearchResponse(error, response, noObjectBody);
          assert(returnErrorStub.calledWith(404));
          assert(consoleErrorStub.calledWith(errMsg));
          consoleErrorStub.reset();
        }
      });
    });
  }); // checkSearchResponse

  describe("proxyImage()", function() {
    it("issues the request with the correct options", function() {
      var url = "http://example.org/image1.jpg";
      var ua = "";
      c.imageURL = url;
      c.proxyImage();
      var opts = libRequestStub.args[0][0];

      expect(opts["uri"]).to.equal(url);
      expect(opts["method"]).to.equal("GET");
      expect(opts["timeout"]).to.equal(10000); // currently hardcoded
      expect(opts["headers"]["User-Agent"]).to.be.a("string");
    });
  });

  describe("handleImageResponse() with success status", function() {
    var imgResponse;

    beforeEach(function() {
      imgResponse = {
        headers: {
          date: "Tue, 19 Apr 2016 18:58:52 GMT",
          "content-type": "image/jpeg",
          "content-length": "4833",
          server: "Apache",
          connection: "keep-alive",
          "last-modified": "Mon, 18 Apr 2016 12:00:00 GMT"
        },
        statusCode: 200
      };
    });

    it("cleans up the response headers", function() {
      var goodKeys = [
        "Content-Length",
        "Content-Type",
        "Date",
        "Last-Modified"
      ];
      c.handleImageResponse(imgResponse);
      expect(imgResponse.headers).to.only.have.keys(goodKeys);
    });

    it("leaves a 200 response code alone", function() {
      c.handleImageResponse(imgResponse);
      expect(imgResponse.statusCode).to.equal(200);
    });
  }); // handleImageResponse with success

  describe("handleImageResponse() with error status", function() {
    var imgResponse;

    beforeEach(function() {
      imgResponse = {
        headers: {
          date: "Tue, 19 Apr 2016 18:58:52 GMT",
          server: "Apache"
        },
        statusCode: 404
      };
    });

    it("leaves Content-Length out if it is not given", function() {
      c.handleImageResponse(imgResponse);
      expect(imgResponse.headers["Content-Length"]).to.be.undefined;
    });

    it("leaves Content-Type out if it is not given", function() {
      c.handleImageResponse(imgResponse);
      expect(imgResponse.headers["Content-Type"]).to.be.undefined;
    });

    it("logs 404s for images", function() {
      c.imageURL = "http://example.org/bad.jpg";
      var msg = `${c.imageURL} not found`;
      c.handleImageResponse(imgResponse);
      assert(consoleErrorStub.calledWith(msg));
    });

    it("leaves a 404 response code alone", function() {
      c.handleImageResponse(imgResponse);
      expect(imgResponse.statusCode).to.equal(404);
    });

    it("changes a 410 to a 404", function() {
      imgResponse.statusCode = 410;
      c.handleImageResponse(imgResponse);
      expect(imgResponse.statusCode).to.equal(404);
    });

    it("turns other errors into 502s", function() {
      imgResponse.statusCode = 503;
      c.handleImageResponse(imgResponse);
      expect(imgResponse.statusCode).to.equal(502);
    });
  }); // handleImageResponse() with 4xx status

  describe("handleImageConnectionError()", function() {
    var error;

    beforeEach(function() {
      c.imageURL = "http://example.org/img.jpg";
      error = {
        code: "ECONNREFUSED"
      };
    });

    it("logs errors", function() {
      c.handleImageConnectionError(error);
      msg = "Error (ECONNREFUSED) for http://example.org/img.jpg";
      assert(consoleErrorStub.calledWith(msg));
    });

    it("returns a 504 Gateway Timeout for a timeout", function() {
      error.code = "ETIMEDOUT";
      c.handleImageConnectionError(error);
      assert(returnErrorStub.calledWith(504));
    });

    it("returns a 502 Bad Gateway for any other error", function() {
      c.handleImageConnectionError(error);
      assert(returnErrorStub.calledWith(502));
    });
  });
});
