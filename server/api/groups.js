const express = require('express');
const router = express.Router();
const app = express();
const {
  storeUser,
  storeGroup,
  getMessages,
  findAllGroups,
  findUser,
  findUsers,
  findGroup,
  findUserGroups,
  findGroupUsers,
  findGroups,
  clientErrorHandler } = require('../helpers.js');

app.use(clientErrorHandler) // handles error for Angular client
// GET all groups
router.get('/', (req, res) => {
  findAllGroups()
    .then((group) => {
      // res.send(group)
      const groups = [group[0], group[1], group[2]];
      res.send(groups);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

// Create group
router.post('/signup', (req, res) => {
  const { name, destination, date_start, date_end } = req.body;
  storeGroup(name, destination, date_start, date_end)
    .then(result => res.sendStatus(201))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

// GET group by group id
router.get('/:id', (req, res) => {
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

// GET group messages by group id
router.get('/:id/messages', (req, res) => {
  const { id } = req.params;
  return getMessages(id)
    .then(messages => {
      console.log(messages);
      res.send(messages);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

// GET a group's users by group id
router.get('/:id/users', (req, res) => {
  const groupId = req.params.id;
  findGroupUsers(groupId)
    .then(data => {
      const userArr = data.map(data => data.dataValues.userId);
      return findUsers(userArr);
    })
    .then(users => {
      res.send(users)
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
});

// GET user groups by email
router.get('/mytrips', (req, res) => {
  findAllGroups()
    .then((group) => {
      // res.send(group)
      const groups = [group[0], group[1], group[2]];
      res.send(groups);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
  // findUser(req.body.email)
  //   .then(user => findUserGroups(user.id))
  //   .then(data => {
  //     const groupArr = data.map(data => data.dataValues.groupId);
  //     return findGroups(groupArr);
  //   })
  //   .then(groups => {
  //     console.log(groups);
  //     res.send(groups);
  //   })
  //   .catch(err => {
  //     console.error(err);
  //     res.sendStatus(500);
  //   })
});

module.exports = router;