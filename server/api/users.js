const express = require('express');
const router = express.Router();
const app = express();
const {
  storeUser,
  findAllUsers,
  findUser,
  findUserGroups,
  findGroups,
  getUserValues,
  clientErrorHandler } = require('../helpers.js');

app.use(clientErrorHandler) // handles error for Angular client

// Create user
router.post('/', (req, res) => {
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
router.get('/:values', (req, res) => {
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
router.get('/', (req, res) => {
  findAllUsers()
    .then((user) => {
      res.send(user);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

// GET user's groups
router.get('/:groups', (req, res) => {
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
})

module.exports = router;