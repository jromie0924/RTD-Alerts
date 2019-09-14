import Datastore from "nedb";
import { encode as base64Encode } from "base-64";
import { encode as utf8Encode } from "utf8";

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

<<<<<<< HEAD
  const consumerEncoded = base64Encode(utf8Encode(consumerKey));
  const consumerSecretEncoded = base64Encode(utf8Encode(consumerKeySecret));

  const id = base64Encode(utf8Encode(`${consumerKey}:${consumerKeySecret}`));
=======
  const consumerEncoded = encode(_encode(consumerKey));
  const consumerSecretEncoded = encode(_encode(consumerKeySecret));

  const id = encode(_encode(`${consumerKey}:${consumerKeySecret}`));
>>>>>>> 2cc4902f83d9b82c1a5c2935829d04e01b3659c2

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
<<<<<<< HEAD
      passoword: base64Encode(utf8Encode(password)),
=======
      passoword: encode(_encode(password)),
>>>>>>> 2cc4902f83d9b82c1a5c2935829d04e01b3659c2
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

export function addToHistory(ids, callback) {
  const ID = "tweet_history";
  if (!ids.length) {
    callback("No IDs to add");
  } else {
    const datastoreConfig = {
      filename: "./db/history.db",
      autoload: true
    };

    const db = new Datastore(datastoreConfig);
    db.find({}, (err, docs) => {
      if (err) {
        callback(JSON.parse(err));
      } else {
        if (!docs.length) {
          console.log("inserting...");
          const doc = {
            ids: ids,
            _id: ID
          };
          db.insert(doc, (err, doc) => {
            if (err) {
              callback(JSON.parse(err));
            } else {
              callback(doc);
            }
          });
        } else {
          console.log("updating...");
          // console.log(docs);
          const concatenatedIds = docs[0].ids.concat(ids);
          db.update({_id: ID}, {$push: {ids: {$each: concatenatedIds}}}, {}, (err, numUpdated) => {
            if (err) {
              callback(JSON.parse(err));
            } else {
              callback(null, `Num updated: ${numUpdated}`);
            }
          });
        }
      }
    });
  }
}
