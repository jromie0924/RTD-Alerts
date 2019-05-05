import { OAuth2 as _OAuth2 } from "oauth";
import { get, put } from "memory-cache";
import { getAPITokens } from "./db.js";

var OAuth2 = _OAuth2;

 const postData = {
   "grant_type": "client_credentials"
 };

export function authenticate(callback) {
  getAPITokens((err, tokens) => {
    if (err) {
      callback(err);
    } else {
      const oauth2 = new OAuth2(
         tokens.consumer,
         tokens.secret,
         'https://api.twitter.com/',
         null,
         'oauth2/token',
         null
       );
       if (!get('bearer')) {
         oauth2.getOAuthAccessToken("", postData, (e, access_token, refresh_token, results) => {
           put('bearer', access_token, 600000, (k, v) => {
           });
           return callback(null, access_token);
         });
       } else {
         return callback(null, get('bearer'));
       }
    }
  });
}
