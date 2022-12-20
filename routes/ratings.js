var express = require("express");
var router = express.Router();

require('../models/connection');
const Rating = require("../models/ratings");


// ADD RATING ROOTS 
router.post("/addRating", (req, res) => {
  const rating = new Rating({
    starRating: req.body.starRating,
    commentRating: req.body.commentRating,
  });
  rating.save((error) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.send(rating);
    }
  });
});

// FIND ALL RATINGS
router.get("/getRating", (req, res) => {
  Rating.find((error, ratings) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.send(ratings);
    }
  });
});

// FIND RATINGS BY ID
router.get("/getRating/:id", (req, res) => {
  Rating.findOne({ _id: req.params.id }, (error, rating) => {
    if (error) {
      res.status(400).send(error);
    } else {
      res.send(rating);
    }
  });
});


module.exports = router;
