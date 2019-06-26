require('dotenv').config();
const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3'); // watson personality-insights
const db = require('../database/index.js');
const express = require('express');
const app = express();
let http = require('http');
let server = http.Server(app);
let socketIO = require('socket.io');
let io = socketIO(server);
// const jwt = require('express-jwt');
// const jwtAuthz = require('express-jwt-authz');
// const jwksRsa = require('jwks-rsa');
// const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const { mockData, mockTrips, mockUsers } = require('./data');
const { getInsights, groupAvg } = require('./watson');
const { storeUser, storeGroup, storeMessage, getMessages, findAllGroups, findAllUsers, findUser, findGroup, findUserGroups, findGroupUsers, findGroups, findUsers, getUserValues, clientErrorHandler } = require('../server/helpers.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './src')));
app.use(clientErrorHandler) // handles error for Angular client

// GET all groups
app.get('/api/groups', (req, res) => {
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
app.post('/api/groups/signup', (req, res) => {
  const { name, destination, date_start, date_end } = req.body;
  storeGroup(name, destination, date_start, date_end)
    .then(result => res.sendStatus(201))
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    })
});

// GET group by group id
app.get('/api/groups/:id', (req, res) => {
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
app.get('/api/groups/:id/users', (req, res) => {
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
app.get('/api/trips', (req, res) => {
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
  .catch(err => {
    console.error(err);
    res.sendStatus(500);
  })
})

// GET a user's values by email
app.get('users:values', (req, res) => {
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
app.get('/users', (req, res) => {
  findAllUsers()
  .then((user) => {
    res.send(user);
  })
  .catch(err => {
    console.error(err);
    res.sendStatus(500);
  })
})

// GET a user's groups
app.get('/users:groups', (req, res) => {
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

// get watson data stored in database by user email
app.get('/values', (req, res) => {
  getUserValues()
  .then((value) => {
    res.send(value);
  })
  .catch(err => {
    console.error(err);
    res.sendStatus(500);
  })
})

// app.listen(3000, () => {
//   console.log('listening on http://localhost:3000! The Angular app will be built and served at http://localhost:4200.');
// });

io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('new-message', (message) => {
    console.log(message);
    storeMessage(message);
    io.emit('new-message', message);
  });
});


server.listen(3000, () => {
  console.log(`started on port:. The Angular app will be built and served at http://localhost:4200.`);
});
