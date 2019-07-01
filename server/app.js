require('dotenv').config();
const PersonalityInsightsV3 = require('ibm-watson/personality-insights/v3'); // watson personality-insights
const db = require('../database/index.js');
const axios = require('axios');
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
const groups = require('./api/groups');
const users = require('./api/users');
const photos = require('./api/photos');
const watson = require('./api/watson');
const { storeMessage, isGroupMember } = require('./helpers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './src')));
app.use('/api/groups', groups) // routes to api groups file endpoints
app.use('/api/users', users) // routes to api users file endpoints
app.use('/api/photos', photos) // routes to api photos file endpoints
app.use('/api/watson', watson) // routes to api watson file endpoints
// app.use(cors());

app.get('/twitter', (req, res) => {
  axios.get('https://api.twitter.com/1.1/account/verify_credentials.json', (req, res) => {
    
  });
});

const groupChats = {};

io.on('connection', (socket) => {
  console.log('user connected');
  // user joins a group chat created from groupId
  socket.on('join-chat', groupId => {
    console.log(groupId);
    socket.join(groupId);
    console.log('SOCKET ROOMS', io.sockets.adapter.rooms);
    if (groupChats[groupId]) {
      groupChats[groupId].push(socket.id);
    } else {
      groupChats[groupId] = [socket.id];
    }
    console.log(groupChats);
  });
  // const { query } = socket.handshake;
  socket.on('new-message', (message) => {
    // storeMessage(message);
    io.sockets.to(message.groupId).emit('new-message', message);
  });
});//test


server.listen(3000, () => {
<<<<<<< HEAD
  console.log(`started on port 3000. The Angular app will be built and served at http://localhost:4200.`);
});
=======
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

// app.listen(3000, () => {
//   console.log('listening on http://localhost:3000! The Angular app will be built and served at http://localhost:4200.');
// });
>>>>>>> c33f8f55ebecaee055b762c85d839e568ac5bfa8
