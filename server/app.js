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

io.on('connection', (socket) => {
  // socket.join('some room');
  console.log('user connected', socket.id);
  // socket.on('new-message', (message, user) => {
  //   console.log(id, message);
  //   socket.broadcast.to(id).emit('new-message', message);
  // });
  // socket.on('new-message', (message) => {
  //   console.log(message, isGroupMember(message.user, message.groupId));
  //   // storeMessage(message);
  //   io.emit('new-message', message);
  // });
});

server.listen(3000, () => {
  console.log(`started on port 3000. The Angular app will be built and served at http://localhost:4200.`);
});
