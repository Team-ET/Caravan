const express = require('express');
const router = express.Router();
const app = express();
const { getInsights, groupAvg } = require('./watson');
const { mockData, mockTrips, mockUsers } = require('./data');

const {
  storeUser,
  storeGroup,
  getMessages,
  findAllGroups,
  findAllUsers,
  findUser,
  findGroup,
  findUserGroups,
  findGroupUsers,
  findGroups,
  findUsers,
  getUserValues,
  clientErrorHandler } = require('../server/helpers.js');

app.use(clientErrorHandler) // handles error for Angular client

// GET all groups
router.get('/groups', (req, res) => {
  findAllGroups()
    .then((group) => {
      res.send(group)
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

// Create group
router.post('/groups/signup', (req, res) => {
  const { name, destination, date_start, date_end } = req.body;
  storeGroup(name, destination, date_start, date_end)
    .then(result => res.sendStatus(201))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

// GET group by group id
router.get('/groups/:id', (req, res) => {
  const { id } = req.params;
  findGroup(id)
    .then(group => {
      res.send(group);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

// GET users by group id
router.get('/groups/:id/users', (req, res) => {
  findGroupUsers(req.params.id)
    .then(data => {
      const userArr = data.map(data => data.dataValues.userId);
      return findUsers(userArr);
    })
    .then(users => {
      console.log(users);
      res.send(users)
    })
    .catch(err => {
      console.error(err);
      res.send(500);
    });
});

// GET user groups by email
router.get('/trips', (req, res) => {
  findUser(req.body.email)
    .then(user => findUserGroups(user.id))
    .then(data => {
      const groupArr = data.map(data => data.dataValues.groupId);
      return findGroups(groupArr);
    })
    .then(groups => {
      console.log(groups);
      res.send(groups);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

// Create user
router.post('/users', (req, res) => {
  const { name, email, picture, pers_test, pers_percent } = req.body
  storeUser(name, email, picture, pers_test, pers_percent)
    .then(() => {
      res.send(201)
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

// GET a user's values by email
router.get('/users:values', (req, res) => {
  getUserValues()
    .then((value) => {
      res.send(value);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

// GET all users
router.get('/users', (req, res) => {
  findAllUsers()
    .then((user) => {
      res.send(user);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

// Duplicate???
// GET a user's groups
router.get('/users:groups', (req, res) => {
  findUser(req.body.email)
    .then(user => findUserGroups(user.id))
    .then(data => {
      const groupArr = data.map(data => data.dataValues.groupId);
      return findGroups(groupArr);
    })
    .then(groups => {
      res.send(groups);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

// Get Personality insights from Watson API
router.get('/watson', (req, res) => {
  console.log(req.body.text);
  getInsights(req.body.text, res);//maybe change this to query, so that we can input the queried text we are gathering from Facebook and Twitter
});

// get watson data stored in database by user email
router.get('/values', (req, res) => {
  getUserValues()
    .then((value) => {
      res.send(value);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

module.exports = router