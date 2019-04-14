const auth = require("./auth.js");
const controller = require("./controller.js");
const transitInfo = require("./transitInfo");
// const http = require("http");
const errors = require("./enumerations/error-types.js");

const errorTypes = errors.errorTypes();

controller.startServer();

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
