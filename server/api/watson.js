const express = require('express');
const router = express.Router();
const app = express();
const { getInsights, groupAvg } = require('../watson');
const { clientErrorHandler } = require('../helpers.js');

app.use(clientErrorHandler) // handles error for Angular client

// Get Personality insights from Watson API
router.get('/', (req, res) => {
  console.log(req.body.text);
  getInsights(req.body.text, res);//maybe change this to query, so that we can input the queried text we are gathering from Facebook and Twitter
});

module.exports = router;