const mongoose = require("mongoose");

// serial no product name quantity price

const orderSchema = new mongoose.Schema({
  ProductData: [
    {
      productName: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],

  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);

// have to generate random number for Id for order Id
// Date Format

// Overall app

// date format
// swal alert
// loading
// realtime alert
