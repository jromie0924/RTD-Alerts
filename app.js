const auth = require("./auth.js");
const controller = require("./controller.js");
const transitInfo = require("./transitInfo");

controller.createServer();

auth.authenticate((err, token) => {
  if (err) {
    console.error("Error obtaining Twitter API bearer token.");
    console.error(`Error: ${err}`);
  } else {
    console.log("Bearer stored");
    // console.log(`${token}`);
  }
});
