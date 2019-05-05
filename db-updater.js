import Datastore from "nedb";
import { encode } from "base-64";
import { encode as _encode } from "utf8";

const emailIdRegex = /^.*(?=(\@))/g;

export function addUser(name, email, transit, callback) {
  const datastoreConfig = {
    filename: "./db/users.db",
    autoload: true
  };

  const db = new Datastore(datastoreConfig);
  var id = "";

  var matches = email.match(emailIdRegex);
  if (matches.length && matches.length === 1) {
    id = matches[0];

    var doc = {
      name: name,
      email: email,
      transit: transit,
      _id: id
    };

    db.insert(doc, (err, newDoc) => {
      if (err) {
        callback(err);
      } else {
        callback(null, newDoc);
      }
    });
  } else callback("Invalid email provided.");
}

export function addUserToken(consumerKey, consumerKeySecret, callback) {
  const datastoreConfig = {
    filename: "./db/keys.db",
    autoload: true
  };

  var db = new Datastore(datastoreConfig);

  const consumerEncoded = encode(_encode(consumerKey));
  const consumerSecretEncoded = encode(_encode(consumerKeySecret));

  const id = encode(_encode(`${consumerKey}:${consumerKeySecret}`));

  const doc = {
    consumer: consumerEncoded,
    secret: consumerSecretEncoded,
    _id: id
  };

  db.insert(doc, (err, newDoc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, newDoc);
    }
  });
}

export function addSenderCreds(email, password, callback) {
  const datastoreConfig = {
    filename: "./db/senderCreds.db",
    autoload: true
  };

  var db = new Datastore(datastoreConfig);
  var id = "";

  const matches = email.match(emailIdRegex);
  if (matches && matches.length === 1) {
    id = matches[0];

    var doc = {
      email: email,
      passoword: encode(_encode(password)),
      _id: id
    };

    db.insert(doc, (err, newDoc) => {
      if (err) {
        callback(err);
      } else {
        callback(null, newDoc);
      }
    });

  } else {
    callback("Invalid email provided.");
  }
}

export function addTransitParameters(screenName, count, name, callback) {
  const datastoreConfig = {
    filename: "./db/transitParams.db",
    autoload: true
  };

  var db = new Datastore(datastoreConfig);

  var doc = {
    screen_name: screenName,
    count: count,
    _id: name
  };

  db.insert(doc, (err, newDoc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, newDoc);
    }
  });
}
