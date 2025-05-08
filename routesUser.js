const serverFunctions = require("./lib/serverFunctions");

module.exports = (app, server) => {
  // browse by topic routes
  // server.get("/primary-source-sets/:set", (req, res) => {
  //   const actualPage = "/primary-source-sets/set";
  //   const params = {
  //     set: req.params.set,
  //   };
  //   //app.render(req, res)
  //
  //   serverFunctions.renderAndCache(
  //     app,
  //     req,
  //     res,
  //     actualPage,
  //     req.query,
  //     params,
  //   );
  // });
  // server.get("/primary-source-sets/:set/teaching-guide", (req, res) => {
  //   const actualPage = "/primary-source-sets/set/teaching-guide";
  //   const params = {
  //     set: req.params.set,
  //   };
  //   serverFunctions.renderAndCache(
  //     app,
  //     req,
  //     res,
  //     actualPage,
  //     req.query,
  //     params,
  //   );
  // });
  // server.get("/primary-source-sets/:set/teaching-guide-print", (req, res) => {
  //   const actualPage = "/primary-source-sets/set/teaching-guide-print";
  //   const params = { set: req.params.set };
  //   serverFunctions.renderAndCache(
  //     app,
  //     req,
  //     res,
  //     actualPage,
  //     req.query,
  //     params,
  //   );
  // });
  // server.get("/primary-source-sets/:set/additional-resources", (req, res) => {
  //   const actualPage = "/primary-source-sets/set/additional-resources";
  //   const params = {
  //     set: req.params.set,
  //   };
  //   serverFunctions.renderAndCache(
  //     app,
  //     req,
  //     res,
  //     actualPage,
  //     req.query,
  //     params,
  //   );
  // });
  // server.get("/primary-source-sets/:set/sources/:source", (req, res) => {
  //   const actualPage = "/primary-source-sets/set/sources";
  //   const params = {
  //     set: req.params.set,
  //     source: req.params.source,
  //   };
  //   serverFunctions.renderAndCache(
  //     app,
  //     req,
  //     res,
  //     actualPage,
  //     req.query,
  //     params,
  //   );
  //});
};
