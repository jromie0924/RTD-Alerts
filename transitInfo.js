const https = require('https');
const auth = require('./auth.js');
const db = require('./db.js');

const twitterUrl = 'https://api.twitter.com';

exports.watchTransit = (callback) => {
  db.getAllUsers((err, users) => {
    if (err) {
      callback(JSON.parse(err));
    } else {
      users.forEach(user => {
        const transit = user.transit;
        db.getQueryParams(transit, (err, data) => {
          if (err) {
            callback(JSON.parse(err));
          } else {
            const params = data[0];
            const screenName = params.screen_name;
            const count = params.count;
            getData(screenName, count, (err, res) => {
              if (err) {
                console.error(err);
              } else {
                console.log(JSON.parse(res));
              }
            })
          }
        });
      });
    }
  });
}

var getData = (screenName, count, callback) => {
  auth.authenticate((err, token) => {
    if (err) {
      callback(JSON.parse(err));
    } else {
      const options = {
        path: `/1.1/statuses/user_timeline.json?screen_name=${screenName}&count=${count}&exclude_replies=true&tweet_mode=extended`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      https.get(twitterUrl, options, res => {
        if (res.statusCode === 200) {
          res.on('data', data => {
            const posts = JSON.parse(data);
            posts.forEach(post => {
              const text = post.full_text;
              // TODO: Look for keywords in text
            });
          });
        }
      });
    }
  });
}
