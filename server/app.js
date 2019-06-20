require('dotenv').config();
const db = require('../database/index.js');
const express = require('express');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
// const cors = require('cors');
const app = express();
const path = require('path');

// const bodyparser = require('body-parser');

// if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
//   throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file'
// }

// app.use(cors());
// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../src')));

// const checkJwt = jwt({
//   // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint.
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
//   }),

//   // Validate the audience and the issuer.
//   audience: process.env.AUTH0_AUDIENCE,
//   issuer: `https://${process.env.AUTH0_DOMAIN}/`,
//   algorithms: ['RS256']
// });

// const checkScopes = jwtAuthz(['read:messages']);

// app.get('/api/private', checkJwt, checkScopes, function (req, res) {
//   res.json({ message: "Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this." });
// });

app.listen(3000, () => {
  console.log('listening on http://localhost:3000! The Angular app will be built and served at http://localhost:4200.');
});