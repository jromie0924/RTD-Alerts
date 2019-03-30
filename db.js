const Datastore = require("nedb");
const base64 = require("base-64");
const utf8 = require("utf8");

const userStoreConfig = {
  filename: "./db/users.db",
  autoload: true
};

const keyStoreConfig = {
  filename: "./db/keys.db",
  autoload: true
};

exports.getAPITokens = (callback) => {
  const db = new Datastore(keyStoreConfig);

  db.find({}, (err, docs) => {
    if (err) {
      callback(err);
    } else {
      const obj = docs[0];
      const secret = utf8.decode(base64.decode(obj.secret));
      const consumer = utf8.decode(base64.decode(obj.consumer));
      callback(null, {secret: secret, consumer: consumer});
    }
  });
}
