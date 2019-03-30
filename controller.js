const http = require("http");
const EntityType = require("./enumerations/entityType.js");
const responseHelper = require("./responseHelper.js");

const entityType = EntityType.entityType();

exports.createServer = () => {
  const server = http.createServer((req, res) => {
    if (req.method === "POST") {
      var body = "";
      req.on("data", data => {
        body += data;
        var obj = JSON.parse(data);
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
