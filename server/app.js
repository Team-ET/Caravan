require('dotenv').config();
const express = require('express');
const app = express();
let http = require('http');
let server = http.Server(app);
let socketIO = require('socket.io');
let io = socketIO(server);

const path = require('path');
const bodyParser = require('body-parser');
const groups = require('./api/groups');
const users = require('./api/users');
const photos = require('./api/photos');
const twitter = require('./api/twitter');
const watson = require('./api/watson');
const { storeMessage } = require('./helpers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './src')));
app.use('/api/groups', groups) // routes to api groups file endpoints
app.use('/api/users', users) // routes to api users file endpoints
app.use('/api/photos', photos) // routes to api photos file endpoints
app.use('/api/twitter', twitter) // routes to api twitter file endpoints
app.use('/api/watson', watson) // routes to api watson file endpoints

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
    io.sockets.to(message.groupId).emit('new-message', message);
    storeMessage(message);
  });
});//test


server.listen(3000, () => {
  console.log(`started on port 3000. The Angular app will be built and served at http://localhost:4200.`);
});
