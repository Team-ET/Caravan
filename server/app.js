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
// const jwt = require('express-jwt');
// const jwtAuthz = require('express-jwt-authz');
// const jwksRsa = require('jwks-rsa');
// const cors = require('cors');
const app = express();
const axios = require('axios');

const path = require('path');

const bodyParser = require('body-parser');

const { storeUser, storeGroup, findAllGroups, findAllUsers, findUserGroups, getUserValues } = require('../server/helpers.js');

const mockData = [
  { id: 12, name: 'Voyagers', location: 'New York, New York', picUrl: 'https://amp.businessinsider.com/images/5ad8ae04cd862425008b4898-750-563.jpg' },
  { id: 13, name: 'Sparkers', location: 'Osaka, Japan', picUrl: 'https://photos.smugmug.com/Osaka/Osaka-Categories/i-J9MFjBv/0/XL/Osaka_Districts-XL.jpg' },
  { id: 14, name: 'Language Lovers', location: 'San Francisco, California', picUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/San_Francisco_from_the_Marin_Headlands_in_March_2019.jpg' },
  // { id: 15, name: 'Not a travel tinder app', location: 'Vancouver, Canada', picUrl: 'https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_463,q_50,w_800/v1/clients/vancouverbc/01014_201809_AlbertNormandin_False_CreekVancouverDowntownCityAerial_23dd1724-bfd7-4cc9-9d93-60faac3cb2fa.jpg' },
  // { id: 16, name: 'Ya Mama', location: 'Edinburgh, Scotland', picUrl: 'http://www.visitscotland.com/cms-images/attractions/edinburgh-skyline-calton-hill?view=Standard' }
];

const mockTrips = [
  { id: 20, name: 'The Hobbits', location: 'Queenstown, New Zealand', picUrl: 'https://www.noted.co.nz/media/13444/ls4611237_28_aspen_gi_84184157.jpg?width=501&height=374' },
  { id: 21, name: 'Partiers', location: 'Las Vegas, Nevada', picUrl: 'http://res.cloudinary.com/simpleview/image/upload/v1497480003/clients/lasvegas/strip_b86ddbea-3add-4995-b449-ac85d700b027.jpg' },
];

const mockUsers = [
  { id: 1, name: 'Harry Potter', email: 'look-at-my-cool-scar@wizards.com', picture: 'https://images.ctfassets.net/bxd3o8b291gf/3SQ3X2km8wkQIsQWa02yOY/25f258f21bdbe5f552a4419bb775f4f0/HarryPotter_WB_F4_HarryPotterMidshot_Promo_080615_Port.jpg?w=1200', groupIds: [12, 14]},
  { id: 2, name: 'Voldemort', email: 'noseless@wizards.com', picture: 'https://images.ctfassets.net/bxd3o8b291gf/3SQ3X2km8wkQIsQWa02yOY/25f258f21bdbe5f552a4419bb775f4f0/HarryPotter_WB_F4_HarryPotterMidshot_Promo_080615_Port.jpg?w=1200', groupIds: [12, 14, 15]},
  { id: 3, name: 'Ron Weasley', email: 'whiney@wizards.com', picture: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Ron_Weasley_poster.jpg/220px-Ron_Weasley_poster.jpg', groupIds: [13, 14, 16]},
  { id: 4, name: 'Hermione Granger', email: 'smarter-than-you@wizards.com', picture: 'https://images-na.ssl-images-amazon.com/images/I/81Z9f1Kos%2BL._SY679_.jpg', groupIds: [13, 14]},
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, '../src')));

app.get('/api/groups', (req, res) => {
  res.send(mockData);
});

app.get('/api/groups/:id', (req, res) => {
  console.log(req);
  // const item = mockData.find(f => f.id === req.params.id);
  const item = { id: 12, name: 'Voyagers', location: 'New York, New York', picUrl: 'https://amp.businessinsider.com/images/5ad8ae04cd862425008b4898-750-563.jpg' };
  console.log(item);
  res.send(item);
});

app.get('/api/groups/:id/users', (req, res) => {
  console.log(req);
  // const item = mockData.find(f => f.id === req.params.id);
  const items = mockUsers.filter(user => user.groupIds.includes(+req.params.id));
  console.log(items);
  res.send(items);
});

app.get('/api/trips', (req, res) => {
  res.send(mockTrips);
});

app.get('/watson', (req, res) => {
  console.log(req.body.text);
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