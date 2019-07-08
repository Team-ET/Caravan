const express = require('express');
const router = express.Router();
const app = express();
const {
  storeUser,
  addUserToGroup,
  updateGroup,
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

// UPDATE user's group join request from pending to not pending
router.put('/:sub/:groupId', (req, res) => {
  console.log(req.params);
  const { sub, groupId } = req.params;
  findUser(sub)
  .then(user => {
    console.log(user);
    updateGroup(user.dataValues.id, groupId)
  })
    .then(result => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(409);
    })
});

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
router.get('/values', (req, res) => {
  getUserValues()
    .then((value) => {
      res.send(value);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

module.exports = router;