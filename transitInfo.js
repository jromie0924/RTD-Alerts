import { getAllUsers, getQueryParams } from './db.js';
import { Observable, forkJoin } from 'rxjs';
import { get } from 'request';
import { first } from 'rxjs/operators';

const twitterUrl = 'https://api.twitter.com';

export function watchTransit(bearer, callback) {
  update(bearer, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  })
}

/**
 * 
 * @param {function} callback 
 */
var update = (bearer, callback) => {
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
var getData = (bearer, screenName, count) => {
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
