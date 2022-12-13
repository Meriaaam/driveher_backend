const mongoose = require('mongoose');

const driverSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  latitude: Number,
  longitude: Number,
  cabModel: String,
  babySeat: Boolean,
  acceptAnimals: Boolean,
  rating: Number,
});

const Driver = mongoose.model('drivers', driverSchema);

module.exports = Driver;
