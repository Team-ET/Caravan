const express = require('express');
const router = express.Router();

const OAuth = require('oauth').OAuth;
const qs = require('qs');
const request = require("request");

const { getInsights } = require('../watson');

const error = function (err, response, body) {
  console.log('ERROR [%s]', err);
};

const success = function (data) {
  console.log('Data [%s]', data);
  var tweets = JSON.parse(data);
  console.log(tweets);
  var tweetTexts = tweets.map(m=>m.text).join('. ');
//   getInsights(tweetTexts);
  console.log(tweetTexts);
};

function buildQS(params) {
  if (params && Object.keys(params).length > 0) {
      return '?' + qs.stringify(params);
  }
  return '';
};

oauth = new OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.TWITTER_APIKEY,
  process.env.TWITTER_APISECRET,
  '1.0',
  'http://localhost:4200/auth/twitter/main',
  'HMAC-SHA1'
);

function doRequest(url, access, access_secret, error, success) {
  url = url.replace(/\!/g, "%21")
           .replace(/\'/g, "%27")
           .replace(/\(/g, "%28")
           .replace(/\)/g, "%29")
           .replace(/\*/g, "%2A");
  this.oauth.get(url, access, access_secret, function (err, body, response) {
      console.log('URL [%s]', url);
      if (!err && response.statusCode == 200) {
          success(body);
      } else {
          error(err, response, body);
      }
  });
};

function getUserTimeline(params, access, access_secret, error, success) {
  var path = '/statuses/user_timeline.json' + buildQS(params);
  var url = 'https://api.twitter.com/1.1' + path;
  doRequest(url, access, access_secret, error, success);
};

function getAuthToken(userId){
  var options = { method: 'GET',
    url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users`,
    headers: { authorization: process.env.AUTH0_BEARER }
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var users = JSON.parse(body);
    var user = users.find(f=>f.user_id === userId);
    var twitterCon = user.identities.find(f=>f.connection ==='twitter');
    var userToken = twitterCon.access_token;
    var userTokenSecret = twitterCon.access_token_secret;
    getUserTimeline({ screen_name: user.screen_name, count: '10'}, userToken, userTokenSecret, error, success);
  });
}

router.get('/', (req, res) => {
  getAuthToken('twitter|1139571862462181376');
});

module.exports = router;