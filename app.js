const auth = require("./auth.js");
const controller = require("./controller.js");
const transitInfo = require("./transitInfo");
// const http = require("http");
const errors = require("./enumerations/error-types.js");

const errorTypes = errors.errorTypes();

controller.startServer();

auth.authenticate((err, token) => {
  if (err) {
    console.error("Error obtaining Twitter API bearer token.");
    console.error(`Error: ${err}`);
  } else {
    console.log("Bearer stored");
    transitInfo.watchTransit(token, (err, data) => {
      if (err) {
        console.err(JSON.parse(err));
      } else {
        data.forEach(dataArray => {
          if (dataArray.errors) {
            const errors = dataArray.errors.filter(obj => obj.code === errorTypes.bearer);
            if (errors.length) {
              // TODO: logic to reacquire a bearer token
              console.error("bad token");
            } else {
              console.error(errors)
            }
          } else {
            console.log(dataArray);
          }
        });
      }
    });
  }
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
