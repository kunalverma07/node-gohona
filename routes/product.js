const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");

router.post("/create", productController.createProduct);
router.get("/get-all", productController.getAllProducts);
router.get("/get-product/:id", productController.getProductById);
router.post("/get-product-byCategory", productController.getProductByCategory);
router.put("/update-product/:id", productController.updateProductById);
router.delete("/delete-product/:id", productController.deleteProductById);

module.exports = router;
