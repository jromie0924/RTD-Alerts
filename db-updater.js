const Datastore = require("nedb");
const base64 = require("base-64");
const utf8 = require("utf8");

const emailIdRegex = /^.*(?=(\@))/g;

exports.addUser = (name, email, transit, callback) => {
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
};

exports.addUserToken = (consumerKey, consumerKeySecret, callback) => {
  const datastoreConfig = {
    filename: "./db/keys.db",
    autoload: true
  };

  var db = new Datastore(datastoreConfig);

  const consumerEncoded = base64.encode(utf8.encode(consumerKey));
  const consumerSecretEncoded = base64.encode(utf8.encode(consumerKeySecret));

  const id = base64.encode(utf8.encode(`${consumerKey}:${consumerKeySecret}`));

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
};

exports.addSenderCreds = (email, password, callback) => {
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
      passoword: base64.encode(utf8.encode(password)),
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

exports.addTransitParameters = (screenName, count, name, callback) => {
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
