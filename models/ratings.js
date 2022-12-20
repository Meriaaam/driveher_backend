const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
  starRating: Number,
  commentRating: String,
});

const Rating = mongoose.model("ratings", ratingSchema);

module.exports = Rating;
