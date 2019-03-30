var http = require("http");
var url = require("url");
// var mailer = require('nodemailer');
const mail = require("./emailer.js")
const auth = require("./auth.js");
const dbUpdater = require("./db-updater.js");
const db = require("./db.js");

http.createServer((req, res) => {
  res.writeHead(200, {"contnet-type": "text/html"});
  // res.write(req.url);
  var q = url.parse(req.url, true).query;
  var txt = q.year + " " + q.month;
  res.end(txt);
}).listen(8080);

auth.authenticate(token => {
  if (token) {
    console.log(`bearer: ${token}`);
  }
});
