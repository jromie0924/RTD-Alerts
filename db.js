import Datastore from "nedb";
import { decode } from "base-64";
import { decode as _decode } from "utf8";

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

export function getAPITokens(callback) {
  const db = new Datastore(keyStoreConfig);

  db.find({}, (err, docs) => {
    if (err) {
      callback(err);
    } else {
      const obj = docs[0];
      const secret = _decode(decode(obj.secret));
      const consumer = _decode(decode(obj.consumer));
      callback(null, {secret: secret, consumer: consumer});
    }
  });
}

export function getEmailCreds(callback) {
  const db = new Datastore(senderCredsConfig);

  db.find({}, (err, docs) => {
    if (err) {
      callback(err);
    } else {
      const obj = docs[0];
      const password = _decode(decode(obj.password));
      callback(null, {email: obj.email, password: password});
    }
  });
}

export function getAllUsers(callback) {
  const db = new Datastore(userStoreConfig);
  db.find({}, (err, docs) => {
    if (err) {
      callback(err);
    } else {
      callback(null, docs);
    }
  });
}

export function getUserByTransit(transit, callback) {
  const db = new Datastore(userStoreConfig);
  db.find({'transit': transit}, (err, docs) => {
    if (err) {
      callback(err);
    } else {
      callback(null, docs);
    }
  });
}

export function getQueryParams(ids, callback) {
  const db = new Datastore(transitParameters);
  db.find({_id: {$in: ids}}, (err, docs) => {
    if (err) {
      callback(err);
    } else {
      callback(null, docs);
    }
  });
}
