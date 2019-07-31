const express = require('express');
const router = express.Router();
const app = express();
const _ = require('lodash');
const {
  addUserToGroup,
  storeGroup,
  getMessages,
  findAllGroups,
  findUser,
  findUserById,
  findUsers,
  findGroup,
  findUserGroups,
  findGroupUsers,
  findPendingUsers,
  findGroups,
  updateGroup,
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

router.get('/all', (req, res) => {
  findAllGroups()
    .then((groups) => {
      res.send(groups);
    })
    .catch(err => {

      console.error(err);
      res.sendStatus(500);
    })
});

// Create group and add group creator as member
router.post('/signup', (req, res) => {
  console.log(req.body);
  const {group, sub, pending} = req.body;
  const { name, destination, date_start, date_end, picture } = group;
  const makeGroup = storeGroup(name, destination, date_start, date_end, picture);
  const getUser = findUser(sub);
  Promise.all([makeGroup, getUser])
  .then((ids) => {
    const groupId = ids[0][0].dataValues.id;
    const userId = ids[1].dataValues.id;
    console.log('GROUP ID and USER ID', groupId, userId);
    return addUserToGroup(userId, groupId, pending);
  })
  .then((result => {
    res.sendStatus(201);
  }))
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

      res.send(messages);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

// GET a group's users by group id
router.get('/:id/users', (req, res, next) => {
  const groupId = req.params.id;
  findGroupUsers(groupId)
    .then(data => {
      if (data.length === 0) {
        return [];
      }
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

// GET a user's group join requests
router.get('/:sub/requests', (req, res) => {
  findUser(req.params.sub)
    .then(user => findUserGroups(user.id))
    .then(data => {
      const groups = data.map(data => data.dataValues.groupId);
      return findPendingUsers(groups);
    })
    .then(data => {
      const requests = data.map(data => {
        return [data.dataValues.userId, data.dataValues.groupId];
      }).flat();
      return Promise.all(requests.map((id, i) => {
        if (i % 2 === 0) {
          return findUserById(id);
        } else {
          return findGroup(id);
        }
      }))
    })
    .then((results) => {
      const requests = [];
      for(let i = 0; i < results.length; i+=2) {
        requests.push({ 
          id: results[i].dataValues.id,
          sub: results[i].dataValues.id_api,
          name: results[i].dataValues.name,
          picture: results[i].dataValues.picture,
          group: results[i + 1].dataValues.name,
          groupId: results[i + 1].dataValues.id
        });
      }
      console.log('REQUESTS', requests);
      res.send(requests);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

// UPDATE user's group join request from pending to not pending
router.put('/add-user', (req, res) => {
  console.log(req.body);
  const { sub, groupId } = req.body;
  findUser(sub)
    .then(user => {
      console.log(user);
      updateGroup(user.dataValues.id, groupId)
    })
    .then(result => {
      console.log(result);
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(409);
    })
});

// GET user groups by sub
router.get('/:id/trips', (req, res) => {
  findUser(req.params.id)
    .then(user => findUserGroups(user.id))
    .then(data => {
      if (data.length === 0) {
        return [];
      } else {
        const groupArr = data.map(data => data.dataValues.groupId);
        return findGroups(groupArr);
      }
    })
    .then(groups => {

      const tripsArr = groups.map(group => group.dataValues);
      res.send(tripsArr);
    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

module.exports = router;