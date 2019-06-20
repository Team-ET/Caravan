require('dotenv').config();
const db = require('../database/index.js');
const express = require('express');
const axios = require('axios');

const path = require('path');

// const bodyparser = require('body-parser');

const app = express();

// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../src')));

//should be grabbing the whole object from watson, just for testing



app.listen(3000, () => {
  console.log('listening on port 3000!');
});