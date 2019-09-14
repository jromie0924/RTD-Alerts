import { startServer } from "./controller.js";
import { watchTransit } from "./transitInfo";
// const http = require("http");
import { errorTypes as _errorTypes } from "./enumerations/error-types.js";

// TODO: see readme here for converting to ES6 import
// https://github.com/evanw/node-source-map-support
require('source-map-support').install();

const errorTypes = errors.errorTypes();

startServer();

debugger;
transitInfo.watchTransit(err => {
  console.error(`FATAL: ${err}`);
});

/**
 * Testing
 */
// http.createServer((req, res) => {
//   res.writeHead(200, {"contnet-type": "application/json"});
//   transitInfo.watchTransit((err, data) => {
//     data.forEach(post => {
//       res.write(post.full_text);
//     });
//     res.end();
//   });
// }).listen(8081);
