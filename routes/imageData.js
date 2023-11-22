const express = require("express");
const router = express.Router();
const upload = require("../functions/upload");

const imageController = require("../controllers/imageData");

router.post("/upload", upload.array("images", 5), imageController.uploadImages);

router.get("/get-images", imageController.getUploadImages);

module.exports = router;
