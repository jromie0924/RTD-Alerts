const http = require("http");
const mail = require("./emailer.js")
const auth = require("./auth.js");
const dbUpdater = require("./db-updater.js");
const db = require("./db.js");
const controller = require("./controller.js");

controller.createServer();

auth.authenticate((err, token) => {
  if (err) {
    console.error("Error obtaining Twitter API bearer token.");
    console.error(`Error: ${err}`);
  } else {
    console.log("Bearer stored");
  }
});
