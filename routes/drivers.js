var express = require('express');
var router = express.Router();

require('../models/connection');
const Driver = require('../models/drivers');

router.post('/createAccount', (req, res) => {
  const {
    firstName,
    lastName,
    latitude,
    longitude,
    cabModel,
    babySeat,
    acceptAnimals,
    rating,
  } = req.body;
  Driver.findOne({ lastName: lastName }).then((data) => {
    if (data === null) {
      const newDriver = new Driver({
        firstName: firstName,
        lastName: lastName,
        latitude: latitude,
        longitude: longitude,
        latitude: latitude,
        cabModel: cabModel,
        babySeat: babySeat,
        acceptAnimals: acceptAnimals,
        rating: rating,
      });
      newDriver.save().then((newAccount) => {
        res.json({ result: true, driver: newAccount });
      });
    }
  });
});

router.get('/displayDrivers', (req, res) =>
  Driver.find().then((data) => {
    res.json({ result: true, drivers: data });
  })
);

module.exports = router;
