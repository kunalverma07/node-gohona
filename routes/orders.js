const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orders");

router.post("/create-orders", orderController.createOrder);
router.get("/get-orders", orderController.getAllOrders);

module.exports = router;

// serial no product name quantity price
