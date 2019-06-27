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
const { storeUser, storeGroup, findAllGroups, findAllUsers, storePhoto, findUser, findGroup, findUserGroups, findGroupUsers, findGroups, findUsers, getUserValues, clientErrorHandler, findGroupPhoto, findUserPhoto, findAllPhotos, findPhotos } = require('../server/helpers.js');
const api = require('./api');
const { storeMessage } = require('./helpers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './src')));
app.use('/api', api) // routes to api file endpoints

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
// need to change this helper function to get a specific users values
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

app.post('/api/photos', (req, res) => {
  console.log("I MADE IT HERE") 
  const photo = req.body;
  storePhoto(photo)
  .then((photos) => {
    res.send(photos);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
    
  });
})

app.get('/api/photos', (req, res) => {
  const photo = req.body;
  findPhotos(photo)
  .then((photos)=> {
    res.send(photos);
  })
  .catch((err) => {
    console.error(err);
    res.sendStatus(500);
  })
})

app.listen(3000, () => {
  console.log('listening on http://localhost:3000! The Angular app will be built and served at http://localhost:4200.');
});
