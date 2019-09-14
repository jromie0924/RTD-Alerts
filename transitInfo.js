import { getAllUsers, getQueryParams, getAPITokens } from './db.js';
import { Observable, forkJoin } from 'rxjs';
import { get } from 'request';
import { first } from 'rxjs/operators';
import { authenticate } from './auth.js';
import { errorTypes } from './enumerations/error-types';

// 1800000 ms = 30 minutes
const STANDARD_INTERVAL = 10000;

// 30000 ms = 30 seconds
const FAST_INTERVAL = 5000;

let interval = STANDARD_INTERVAL;

let resetInterval = false;

const twitterUrl = 'https://api.twitter.com';

export function watchTransit(callback) {
  setInterval(() => {
    if (resetInterval) {
      interval = STANDARD_INTERVAL;
      resetInterval = false;
    }
    getToken().then(token => {
      update(token, (err, dataArray) => {
        if (err) {
          callback(err);
        } else {
          // callback(null, data);
          dataArray.forEach(data => {
            if (data.errors) {
              const errors = dataArray.errors.filter(obj => obj.code === errorTypes().bearer);
              if (errors.length) {
                console.warn("Bearer token expired. Reacquiring.");
                resetInterval = true;
                interval = FAST_INTERVAL;
              }
            } else {
              // TODO: analyze data
              data.forEach(post => {
                console.log(post);
              });
            }
          });
        }
      });
    }).catch(err => {
      const message = `Error acquiring bearer token. Will reattempt next time around.\n${err}`;
      console.error(message);
    });
  }, interval);
}

async function getToken() {
  return new Promise((resolve, reject) => {
    authenticate((err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    })
  });
}

/**
 * 
 * @param {function} callback 
 */
function update(bearer, callback) {
  getAllUsers((err, users) => {
    if (err) {
      callback(JSON.parse(err));
    } else {
      const transitIds = [...new Set(users.map(user => user.transit))];
      console.log(transitIds);

      getQueryParams(transitIds, (err, data) => {
        if (err) {
          callback(JSON.parse(err));
        } else {
          const observablesToForkJoin = [];
          data.forEach(params => {
            const screenName = params.screen_name;
            const count = params.count;
            observablesToForkJoin.push(getData(bearer, screenName, count));
          });
          forkJoin(observablesToForkJoin).pipe(first()).subscribe(dataArray => {
            callback(null, dataArray);
          });
        }
      });
    }
  });
}

/**
 * 
 * @param {string} bearer 
 * @param {string} screenName 
 * @param {number} count 
 */
function getData(bearer, screenName, count) {
  const path = `/1.1/statuses/user_timeline.json?screen_name=${screenName}&count=${count}&exclude_replies=true&tweet_mode=extended`;
  const headers = {
    'auth': {
      'bearer': bearer
    }
  };
  return Observable.create(observer => {
    get(twitterUrl + path, headers, (err, res, body) => {
      if (err) {
        observer.error(err);
      } else {
        observer.next(JSON.parse(body));
      }
      observer.complete();
    });
  });
}
