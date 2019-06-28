const express = require('express');
const router = express.Router();
const app = express();
const {
  findGroupPhoto,
  findUserPhoto,
  findAllPhotos,
  findPhotos,
  clientErrorHandler
} = require('../helpers');

app.use(clientErrorHandler) // handles error for Angular client

router.post('/', (req, res) => {
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

router.get('/', (req, res) => {
  const photo = req.body;
  findPhotos(photo)
    .then((photos) => {
      res.send(photos);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    })
})

module.exports = router;