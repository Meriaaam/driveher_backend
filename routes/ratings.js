var express = require("express");
var router = express.Router();

require('../models/connection');
const Rating = require("../models/ratings");
const User = require('../models/users');



// ADD RATING ROOTS 
router.post("/addRating", (req, res) => {
  User.findOne({token: req.body.token}).then(data => {
    const newRating = new Rating({
      starRating: req.body.starRating,
      commentRating: req.body.commentRating,
      user: data._id,
      driver: req.body.id
    });
    newRating.save().then(newDoc => {
      res.json({result: true, newRating: newDoc});
    });

  })
});



// FIND RATINGS BY ID
router.get("/getRating/:driver", (req, res) => {
  Rating.find({ driver: req.params.driver }).then(data => {
    res.json({result: true, comments: data})
  })  
    
});


module.exports = router;
