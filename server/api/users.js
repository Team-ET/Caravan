const express = require('express');
const router = express.Router();
const app = express();
const {
  storeUser,
  addUserToGroup,
  findAllUsers,
  findUser,
  findUserGroups,
  findGroups,
  getUserValues,
  clientErrorHandler } = require('../helpers.js');

app.use(clientErrorHandler) // handles error for Angular client

// Create user
router.post('/', (req, res) => {
  const { sub, name, picture } = req.body
  storeUser(sub, name, picture)
    .then(() => {
      res.send(201)
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
})

// Add a user to a group by associating userid with groupid in User_group table
router.post('/join-group', (req, res) => {
  console.log(req.body);
  const { id, sub, pending } = req.body;
  findUser(sub)
    .then((user) => {
      return addUserToGroup(user.id, id, pending);
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    })
})

// GET a user's values by sub
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

// GET user's groups - TODO DELETE
router.get('/:groups', (req, res) => {
  findUser(req.body.email)
    .then(user => findUserGroups(user.id))
    .then(data => {
      if (data.length === 0) {
        return [];
      }
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
});

//GET watson data stored in database by sub
router.get('/values/:id', (req, res) => {
  const { id } = req.params;
  findUser(id)
    .then(user => {
      console.log(user);
      return getUserValues(user.dataValues.id)
    })
    .then((data) => {
      console.log('VALUES', data)
      const values  = data.dataValues;
      res.send(values);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

module.exports = router;