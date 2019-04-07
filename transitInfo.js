const https = require('https');
const auth = require('./auth.js');
const db = require('./db.js');

exports.watchTransit = (callback) => {
  db.getAllUsers((err, users) => {
    if (err) {
      callback(JSON.parse(err));
    } else {
      users.forEach(user => {
        const transit = user.transit;
        db.getQueryParams(transit, (err, docs) => {
          if (err) {
            callback(JSON.parse(err));
          } else {
            console.log(docs);
          }
        });
      });
    }
  });
}
