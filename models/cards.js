const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  cardNumber: String,
  name:String,
  solde: String,
  cvv: Number,
  expiry: String,
});

const Card = mongoose.model("cards", cardSchema);

module.exports = Card;
