require('dotenv').config();
const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3'); // watson personality-insights
const db = require('../database/index.js');
const express = require('express');
// const jwt = require('express-jwt');
// const jwtAuthz = require('express-jwt-authz');
// const jwksRsa = require('jwks-rsa');
// const cors = require('cors');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const { mockData, mockTrips, mockUsers } = require('./data');
const { getInsights, groupAvg } = require('./watson');
const { storeUser, storeGroup, findAllGroups, findAllUsers, findUserGroups, getUserValues, clientErrorHandler } = require('../server/helpers.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, './src')));
app.use(clientErrorHandler) // handles error for Angular client

// GET all groups
app.get('/api/groups', (req, res) => {
  findAllGroups()
    .then((group) => {
      res.send(group)
    })
    .catch((err) => console.error(err));
});

// Create group
app.post('/api/groups/signup', (req, res) => {
  const { name, destination, date_start, date_end } = req.body;
  storeGroup(name, destination, date_start, date_end)
    .then(result => res.sendStatus(201))
    .catch(err => {
      console.error(err);
    });
});

// GET group by group id
app.get('/api/groups/:id', (req, res) => {
  console.log(req);
  // const item = mockData.find(f => f.id === req.params.id);
  const item = { id: 12, name: 'Voyagers', location: 'New York, New York', picUrl: 'https://amp.businessinsider.com/images/5ad8ae04cd862425008b4898-750-563.jpg' };
  console.log(item);
  res.send(item);
});

// app.get('/group/test', (req, res) => {
//   console.log(findUserGroups(req.body.email));
// });

// GET users by group id
app.get('/api/groups/:id/users', (req, res) => {
  console.log(req);
  // const item = mockData.find(f => f.id === req.params.id);
  const items = mockUsers.filter(user => user.groupIds.includes(+req.params.id));
  console.log(items);
  res.send(items);
});

// GET user groups by email
app.get('/api/trips', (req, res) => {
  res.send(mockTrips);
});

// Get Personality insights from Watson API
app.get('/watson', (req, res) => {
  console.log(req.body.text);
  getInsights(req.body.text, res);//maybe change this to query, so that we can input the queried text we are gathering from Facebook and Twitter
});

// Create user
app.post('/users', (req, res) => {
  const { name, email, picture, pers_test, pers_percent } = req.body
  storeUser(name, email, picture, pers_test, pers_percent)
  .then(() =>{
    res.send(201)
  })
  .catch((err) => console.error(err));
})

// GET a user's values by email
app.get('users:values', (req, res) => {
  getUserValues()
  .then((value) => {
    res.send(value);
  })
  .catch(err => console.error(err));
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
// need to change this helper function to get a specific users values
app.get('/values', (req, res) => {
  getUserValues()
  .then((value) => {
    res.send(value);
  })
  .catch(err => console.error(err));
})

app.listen(3000, () => {
  console.log('listening on http://localhost:3000! The Angular app will be built and served at http://localhost:4200.');
});