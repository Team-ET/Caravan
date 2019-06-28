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
const api = require('./api');
const { storeMessage } = require('./helpers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './src')));
app.use('/api', api) // routes to api file endpoints
// app.use(cors());

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
