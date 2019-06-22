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

const { storeUser, storeGroup, findAllGroups, findAllUsers, findUserGroups, getUserValues } = require('../server/helpers.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, '../src')));
//get request to watson using getInsights function
<<<<<<< HEAD
<<<<<<< HEAD
app.get('/api/watson', (req, res) => {
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

app.get('/api/groups', (req, res) => {
  const mockData = [
    { id: 12, name: 'Voyagers', location: 'New York, New York', picUrl: 'https://amp.businessinsider.com/images/5ad8ae04cd862425008b4898-750-563.jpg' },
    { id: 13, name: 'Sparkers', location: 'Osaka, Japan', picUrl: 'https://photos.smugmug.com/Osaka/Osaka-Categories/i-J9MFjBv/0/XL/Osaka_Districts-XL.jpg' },
    { id: 14, name: 'Language Lovers', location: 'San Francisco, California', picUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/San_Francisco_from_the_Marin_Headlands_in_March_2019.jpg' },
    { id: 15, name: 'Not a travel tinder app', location: 'Vancouver, Canada', picUrl: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_463,q_50,w_800/v1/clients/vancouverbc/01014_201809_AlbertNormandin_False_CreekVancouverDowntownCityAerial_23dd1724-bfd7-4cc9-9d93-60faac3cb2fa.jpg' },
    { id: 16, name: 'Ya Mama', location: 'Edinburgh, Scotland', picUrl: 'http://www.visitscotland.com/cms-images/attractions/edinburgh-skyline-calton-hill?view=Standard' }
  ];

  console.log(mockData);
  res.send(mockData);
=======
app.get('/watson', (req, res) => {
  getInsights(req.body.text, res);//maybe change this to query, so that we can input the queried text we are gathering from Facebook and Twitter
>>>>>>> b667013e6c7a9363d83b4f84bb2c4cbfc0317c11
=======
app.get('/watson', (req, res) => {
  getInsights(req.body.text, res);//maybe change this to query, so that we can input the queried text we are gathering from Facebook and Twitter
>>>>>>> b667013e6c7a9363d83b4f84bb2c4cbfc0317c11
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
<<<<<<< HEAD

<<<<<<< HEAD
app.get('/api/trips', (req, res) => {
  const mockTrips = [
    { id: 20, name: 'The Hobbits', location: 'Queenstown, New Zealand', picUrl: 'https://www.noted.co.nz/media/13444/ls4611237_28_aspen_gi_84184157.jpg?width=501&height=374'},
    { id: 21, name: 'Partiers', location: 'Las Vegas, Nevada', picUrl: 'http://res.cloudinary.com/simpleview/image/upload/v1497480003/clients/lasvegas/strip_b86ddbea-3add-4995-b449-ac85d700b027.jpg'},
  ]

  console.log(mockTrips);
  res.send(mockTrips);
})

=======
app.post('/users', (req, res) => {
  const { name, email, picture, pers_test, pers_percent } = req.body
  storeUser(name, email, picture, pers_test, pers_percent)
  .then(() =>{
    res.send(201)
  })
  .catch((err) => console.error(err));
})
>>>>>>> b667013e6c7a9363d83b4f84bb2c4cbfc0317c11

=======

app.post('/users', (req, res) => {
  const { name, email, picture, pers_test, pers_percent } = req.body
  storeUser(name, email, picture, pers_test, pers_percent)
  .then(() =>{
    res.send(201)
  })
  .catch((err) => console.error(err));
})

>>>>>>> b667013e6c7a9363d83b4f84bb2c4cbfc0317c11
app.get('/groups', (req, res) => {
  findAllGroups()
  .then((group) => {
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

app.get('/users:groups', (req, res) => {
  findUserGroups()
  .then((userGroups) => {
    res.send(userGroups);
  })
  .catch(err => console.error(err));
})

app.get('users:values', (req, res) => {
  getUserValues()
  .then((value) => {
    res.send(value);
  })
  .catch(err => console.error(err));
})
app.listen(3000, () => {
  console.log('listening on http://localhost:3000! The Angular app will be built and served at http://localhost:4200.');
});