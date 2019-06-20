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
const axios = require('axios');

const path = require('path');

const bodyParser = require('body-parser');

const app = express();

const { storeUser, storeGroup } = require('../server/helpers.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, '../src')));
//get request to watson using getInsights function
app.get('/', (req, res) => {
  getInsights(req.body.text, res);
});
//function to send to text to watson to retreive the value percentages that we need in order to compare the users
function getInsights(text, res) {
  personalityInsights.profile({
    content: 'The video game industry is constantly evolving I just needed to add a couple words to make the 100 count just like technology, and I have always been an avid gamer, which is what drew me to the software field.  Being able to work with multiple new technologies on a constant basis keeps the workflow from becoming stagnant.  I have always loved building computers and being able to design and create the software makes the whole experience more complete and rewarding. I feel a great sense of accomplishment in using new tech to solve old problems, and make ideas become even more viable in today’s ever-changing tech world.',
    content_type: 'text/plain',
    consumption_preferences: false
  })
  .then(result => {
    res.send(JSON.stringify(result.values.map((value) => {
      return {
        name: value.name,
        percentile: Math.trunc(value.percentile * 100)
      }
    }), null, 2));
  })
  .catch(err => {
    console.log('error:', err);
  })
}



app.listen(3000, () => {
  console.log('listening on port 3000!');
});