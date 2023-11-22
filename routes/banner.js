const express = require("express");
const router = express.Router();
const bannerController = require("../controllers/banner");
const upload = require("../functions/upload");

router.post(
  "/create-banner",
  upload.single("image"),
  bannerController.createBanner
);

router.get("/get-all-banners", bannerController.getAllBanners);
router.put(
  "/update-banner",
  upload.single("images"),
  bannerController.updateBanner
);

router.delete("/delete-banner/:id", bannerController.deleteBanner);

module.exports = router;
