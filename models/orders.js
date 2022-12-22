const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    paymentAmount: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
});

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;