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

const senderCredsConfig = {
  filename: "./db/senderCreds.db",
  autoload: true
};

const transitParameters = {
  filename: "./db/transitParams.db",
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

exports.getEmailCreds = (callback) => {
  const db = new Datastore(senderCredsConfig);

  db.find({}, (err, docs) => {
    if (err) {
      callback(err);
    } else {
      const obj = docs[0];
      const password = utf8.decode(base64.decode(obj.password));
      callback(null, {email: obj.email, password: password});
    }
  });
}

exports.getAllUsers = (callback) => {
  const db = new Datastore(userStoreConfig);
  db.find({}, (err, docs) => {
    if (err) {
      callback(err);
    } else {
      callback(null, docs);
    }
  });
}

exports.getUserByTransit = (transit, callback) => {
  const db = new Datastore(userStoreConfig);
  db.find({'transit': transit}, (err, docs) => {
    if (err) {
      callback(err);
    } else {
      callback(null, docs);
    }
  });
}

exports.getQueryParams = (ids, callback) => {
  const db = new Datastore(transitParameters);
  db.find({_id: {$in: ids}}, (err, docs) => {
    if (err) {
      callback(err);
    } else {
      callback(null, docs);
    }
  });
}
