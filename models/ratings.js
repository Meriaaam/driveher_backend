const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
  starRating: Number,
  commentRating: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  driver: {type: mongoose.Schema.Types.ObjectId, ref: 'drivers'},
});

const Rating = mongoose.model("ratings", ratingSchema);

module.exports = Rating;
