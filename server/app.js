require('dotenv').config();
const db = require('../database/index.js');
const express = require('express');

const path = require('path');

// const bodyparser = require('body-parser');

const app = express();

// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../src')));


app.listen(3000, () => {
  console.log('listening on port 3000!');
});