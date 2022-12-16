const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  password: String,
  token: String,
  favoriteLocation: [
    { type: mongoose.Schema.Types.ObjectId, ref: "favoritelocation" },
  ],
});

const User = mongoose.model("users", userSchema);

module.exports = User;
