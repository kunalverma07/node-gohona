const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  image: { type: mongoose.Schema.Types.ObjectId, ref: "ImageData" },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

// image and product name will there in be separete collection - ✔

// admin login/ jwt

// firebase image // multer setup - ✔

// send email order to client

// customer details

// name, email id, ph no, address => have to attach in orders data

// image limit 5

// tommorow ->

// order email ui
// delete product integration
// edit product integration
// get product integration
// small alert changes
