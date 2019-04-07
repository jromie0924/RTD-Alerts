const http = require("http");
const EntityType = require("./enumerations/entityType.js");
const responseHelper = require("./responseHelper.js");
const dbUpdater = require("./db-updater.js");

const entityType = EntityType.entityType();

exports.createServer = () => {
  const server = http.createServer((req, res) => {
    if (req.method === "POST") {
      var body = "";
      req.on("data", data => {
        body += data;
        var obj = JSON.parse(data);

        // User Data
        if (obj.type === entityType.user) {
          try {
            var userData = obj.data;
            if (!(userData.name && userData.email && userData.transit)) {
              responseHelper.writeResponse(res, 500);
              res.end("Data must contain name, email, and transit.");
            } else {
              dbUpdater.addUser(userData.name, userData.email, userData.transit, (err, newDoc) => {
                if (err) {
                  console.error(err);
                  responseHelper.writeResponse(res, 500);
                  res.end(JSON.stringify(err));
                } else {
                  responseHelper.writeResponse(res, 200);
                  res.end(body);
                }
              });
            }
          } catch(e) {
            console.error(e);
          }

          // API Query information for different transit systems
        } else if (obj.type === entityType.queryInformation) {
          try {
            var data = obj.data;
            if (!(data.screen_name && data.count && data.name)) {
              responseHelper.writeResponse(res, 500);
              res.end("Data must contain a value for screen name and count.");
            } else {
              dbUpdater.addTransitParameters(data.screen_name.toLowerCase(), data.count, data.name.toLowerCase(), (err, newParams) => {
                if (err) {
                  console.error(err);
                  responseHelper.writeResponse(res, 500);
                  res.end(JSON.stringify(err));
                } else {
                  responseHelper.writeResponse(res, 200);
                  res.end(body);
                }
              });
            }
          } catch(e) {
            console.error(e);
          }
        } else if (obj.type === entityType.apiTokens) {
          var data = obj.data;
          if (!(data.consumer && data.secret)) {
            responseHelper.writeResponse(res, 500);
            res.end("Must contain a secret key as well as a consumer key.");
          } else {
            dbUpdater.addUserToken(data.consumer, data.secret, (err, newDoc) => {
              if (err) {
                responseHelper.writeResponse(res, 500);
                res.end(JSON.parse(err));
              } else {
                responseHelper.writeResponse(res, 200);
                res.end(body);
              }
            });
          }
        } else {
          responseHelper.writeResponse(res, 404);
          res.end("Not found");
        }
      });
    } else {
      responseHelper.writeResponse(res, 404);
      res.end("Not found");
    }
  });

  server.listen(8080, "127.0.0.1");
}
