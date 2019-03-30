const OAuth = require("oauth");
const cache = require("memory-cache");
const db = require("./db.js");

var OAuth2 = OAuth.OAuth2;

const DEBUG = false;

 const postData = {
   "grant_type": "client_credentials"
 };

exports.authenticate = (callback) => {
  db.getAPITokens((err, tokens) => {
    const oauth2 = new OAuth2(
       tokens.consumer,
       tokens.secret,
       'https://api.twitter.com/',
       null,
       'oauth2/token',
       null
     );
     if (!cache.get('bearer')) {
       oauth2.getOAuthAccessToken("", postData, (e, access_token, refresh_token, results) => {
         cache.put('bearer', access_token, 600000, (k, v) => {
         });
         return callback(access_token);
       });
     } else {
       return callback(cache.get('bearer'));
     }
  });
}
