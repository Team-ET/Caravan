require('dotenv').config();
// requiring watson personality-insights
const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3');

const personalityInsights = new PersonalityInsightsV3({
  iam_apikey: `${process.env.PERSONALITY_INSIGHTS_IAM_APIKEY}`,
  version: '2016-10-19',
  url: `${process.env.PERSONALITY_INSIGHTS_URL}`
});
const db = require('../database/index.js');
const express = require('express');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
// const cors = require('cors');
const app = express();
const axios = require('axios');

const path = require('path');

const bodyParser = require('body-parser');

// if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
//   throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file'
// }

const { storeUser, storeGroup, findAllGroups, findAllUsers } = require('../server/helpers.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, '../src')));
//get request to watson using getInsights function
app.get('/watson', (req, res) => {
  getInsights(req.body.text, res);//maybe change this to query, so that we can input the queried text we are gathering from Facebook and Twitter
});
//function to send to text to watson to retreive the value percentages that we need in order to compare the users
function getInsights(text, res) {
  personalityInsights.profile({
    content: 'The video game industry is constantly evolving I just needed to add a couple words to make the 100 count just like technology, and I have always been an avid gamer, which is what drew me to the software field.  Being able to work with multiple new technologies on a constant basis keeps the workflow from becoming stagnant.  I have always loved building computers and being able to design and create the software makes the whole experience more complete and rewarding. I feel a great sense of accomplishment in using new tech to solve old problems, and make ideas become even more viable in today’s ever-changing tech world.',
    content_type: 'text/plain',
    consumption_preferences: false
  })
  .then(result => {
    const values = {
      tradition: Math.trunc(result.values[0].percentile * 100),
      achievement: Math.trunc(result.values[1].percentile * 100),
      pleasure:  Math.trunc(result.values[2].percentile * 100),
      stimulation:  Math.trunc(result.values[3].percentile * 100),
      helpfulness:  Math.trunc(result.values[4].percentile * 100),
    }
    res.send(JSON.stringify(values, null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  })
}

app.post('/users', (req, res) => {
  const { name, email, picture, pers_test, pers_percent } = req.body
  storeUser(name, email, picture, pers_test, pers_percent)
  .then(() =>{
    res.send(201)
  })
  .catch((err) => console.error(err));
})

app.get('/groups', (req, res) => {
  findAllGroups()
  .then((group) => {
    console.log(group);
    res.send(group)
  })
  .catch((err) => console.error(err));
})

app.get('/users', (req, res) => {
  findAllUsers()
  .then((user) => {
    res.send(user);
  })
  .catch(err => console.error(err));
})

app.listen(3000, () => {
  console.log('listening on http://localhost:3000! The Angular app will be built and served at http://localhost:4200.');
});