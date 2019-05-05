import express from "express";
import { writeResponse } from "./responseHelper.js";
import { addUser, addTransitParameters, addUserToken } from "./db-updater.js";

const app = express();

const PORT = 8080;

const endpoint = '/api/v1';

export function startServer() {
  app.post(`${endpoint}/test`, function (req, res) {
  var body = "";
  req.on("data", data => {
    body += data;
    res.send(200, data);
  })
});

app.post(`${endpoint}/users`, (req, res) => {
  var body = "";
  req.on("data", data => {
    body += data;
    try {
      var userData = JSON.parse(data);
      if (!(userData.name && userData.email && userData.transit)) {
        writeResponse(res, 500);
        res.end("Data must contain name, email, and transit.");
      } else {
        addUser(userData.name, userData.email, userData.transit, (err, newDoc) => {
          if (err) {
            console.error(err);
            writeResponse(res, 500);
            res.end(JSON.stringify(err));
          } else {
            writeResponse(res, 200);
            res.end(body);
          }
        });
      }
    } catch(e) {
      res.send(500, "Invalid data format.");
    }
  })
});

app.post(`${endpoint}/queryInfo`, (req, res) => {
  var body = "";
  req.on("data", data => {
    body += data;
    var obj = JSON.parse(data);
    try {
      if (!(obj.screen_name && obj.count && obj.name)) {
        writeResponse(res, 500);
        res.end("Data must contain a value for screen name and count.");
      } else {
        addTransitParameters(obj.screen_name.toLowerCase(), obj.count, obj.name.toLowerCase()
        ,(err, newParams) => {
          if (err) {
            console.error(err);
            writeResponse(res, 500);
            res.end(JSON.stringify(err));
          } else {
            writeResponse(res, 200);
            res.end(body);
          }
        });
      }
    } catch (e) {
      res.send(500, JSON.stringify(e));
    }
  });
});

app.post(`${endpoint}/apiTokens`, (req, res) => {
  var body = "";
  req.on("data", _data => {
    body += _data;
    const data = JSON.parse(_data);
    if (!(data.consumer && data.secret)) {
      writeResponse(res, 500);
      res.end("Must contain a secret key as well as a consumer key.");
    } else {
      addUserToken(data.consumer, data.secret, (err, newDoc) => {
        if (err) {
          writeResponse(res, 500);
          res.end(JSON.parse(err));
        } else {
          res.send(204);
        }
      });
    }
  });
});

  app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
  });
}
